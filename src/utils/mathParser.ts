/**
 * STEMCalculate - Safe Mathematical Input Parser
 *
 * Designed to parse scientific notation, standard form, powers, and basic
 * arithmetic expressions entered by users into physics & STEM calculators.
 *
 * SAFETY GUARANTEE:
 * - NEVER uses eval() or new Function().
 * - Uses a strict, deterministic recursive-descent parser.
 * - Validates the complete input expression.
 * - Rejects malformed or unsupported expressions with clear error messages.
 */

export type MathParseSuccess = {
  success: true;
  value: number;
};

export type MathParseFailure = {
  success: false;
  error: string;
};

export type MathParseResult = MathParseSuccess | MathParseFailure;

type TokenType =
  | "NUMBER"
  | "PLUS"
  | "MINUS"
  | "MUL"
  | "DIV"
  | "POW"
  | "LPAREN"
  | "RPAREN"
  | "EOF";

interface Token {
  type: TokenType;
  value: string;
  pos: number;
}

const SUPERSCRIPT_MAP: Record<string, string> = {
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
  "⁻": "-",
  "⁺": "+",
};

/**
 * Pre-processes user input by normalizing unicode symbols, dashes,
 * LaTeX fragments, and converting unicode superscripts (e.g. 10⁻³ -> 10^(-3)).
 */
export function preprocessMathString(raw: string): string {
  let s = raw.trim();

  // Normalize unicode minuses and dashes (\u2212, \u2013, \u2014) to standard ASCII '-'
  s = s.replace(/[\u2212\u2013\u2014]/g, "-");

  // Normalize non-breaking spaces (\u00A0) and other weird spaces to regular space
  s = s.replace(/[\u00A0\u2000-\u200B\u202F\u205F]/g, " ");

  // Normalize LaTeX multiplication if pasted from math expressions
  s = s.replace(/\\times/g, " * ").replace(/\\cdot/g, " * ");

  // Normalize middle dot
  s = s.replace(/[·]/g, "*");

  // Convert contiguous unicode superscripts: e.g. 10⁻³ -> 10^(-3), 10²³ -> 10^(23)
  let result = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (SUPERSCRIPT_MAP[ch] !== undefined) {
      let superStr = "";
      while (i < s.length && SUPERSCRIPT_MAP[s[i]] !== undefined) {
        superStr += SUPERSCRIPT_MAP[s[i]];
        i++;
      }
      i--; // rewind one step
      result += `^(${superStr})`;
    } else {
      result += ch;
    }
  }

  return result;
}

/**
 * Tokenizes the pre-processed mathematical input string.
 */
function tokenize(input: string): { tokens: Token[] } | { error: string } {
  const tokens: Token[] = [];
  let i = 0;
  const n = input.length;

  while (i < n) {
    const ch = input[i];

    // Skip whitespace
    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    if (ch === "+") {
      tokens.push({ type: "PLUS", value: "+", pos: i });
      i++;
    } else if (ch === "-") {
      tokens.push({ type: "MINUS", value: "-", pos: i });
      i++;
    } else if (ch === "*" || ch === "×") {
      tokens.push({ type: "MUL", value: "*", pos: i });
      i++;
    } else if (ch === "/" || ch === "÷") {
      tokens.push({ type: "DIV", value: "/", pos: i });
      i++;
    } else if (ch === "^") {
      tokens.push({ type: "POW", value: "^", pos: i });
      i++;
    } else if (ch === "(") {
      tokens.push({ type: "LPAREN", value: "(", pos: i });
      i++;
    } else if (ch === ")") {
      tokens.push({ type: "RPAREN", value: ")", pos: i });
      i++;
    } else if (ch === "x" || ch === "X") {
      // Treat 'x' or 'X' as multiplication in user expressions (e.g. "1.5 x 10^3" or "2x3")
      tokens.push({ type: "MUL", value: "*", pos: i });
      i++;
    } else if (/[0-9.]/.test(ch)) {
      const start = i;
      let hasDot = false;

      while (i < n && /[0-9.]/.test(input[i])) {
        if (input[i] === ".") {
          if (hasDot) {
            return { error: `Invalid number format with multiple decimal points at position ${i + 1}.` };
          }
          hasDot = true;
        }
        i++;
      }

      // Check for scientific notation exponent: e or E (e.g. 1e-2, 6.02E23, 1.60e-19)
      if (i < n && (input[i] === "e" || input[i] === "E")) {
        const nextChar = input[i + 1];
        if (
          nextChar &&
          (/[0-9]/.test(nextChar) ||
            ((nextChar === "+" || nextChar === "-") && /[0-9]/.test(input[i + 2] ?? "")))
        ) {
          i++; // consume 'e' or 'E'
          if (input[i] === "+" || input[i] === "-") {
            i++; // consume sign
          }
          while (i < n && /[0-9]/.test(input[i])) {
            i++;
          }
        }
      }

      const numStr = input.slice(start, i);
      if (numStr === ".") {
        return { error: `Unexpected standalone decimal point at position ${start + 1}.` };
      }

      tokens.push({ type: "NUMBER", value: numStr, pos: start });
    } else {
      return { error: `Unexpected character '${ch}' at position ${i + 1}.` };
    }
  }

  tokens.push({ type: "EOF", value: "", pos: n });
  return { tokens };
}

/**
 * Recursive descent parser enforcing standard mathematical grammar and operator precedence:
 *
 * Expression      := Additive
 * Additive        := Multiplicative (('+' | '-') Multiplicative)*
 * Multiplicative  := Unary (('*' | '/') Unary | '(' Expression ')')*
 * Unary           := ('+' | '-') Unary | Power
 * Power           := Primary ('^' Unary)*
 * Primary         := NUMBER | '(' Expression ')'
 */
class MathParser {
  private tokens: Token[];
  private current = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private isAtEnd(): boolean {
    return this.peek().type === "EOF";
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.tokens[this.current - 1];
  }

  private check(type: TokenType): boolean {
    return this.peek().type === type;
  }

  private match(...types: TokenType[]): boolean {
    for (const t of types) {
      if (this.check(t)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  public parse(): MathParseResult {
    if (this.tokens.length <= 1) {
      return { success: false, error: "Please enter a value." };
    }

    try {
      const val = this.expression();

      if (!this.isAtEnd()) {
        const remaining = this.peek();
        return {
          success: false,
          error: `Unexpected token '${remaining.value}' at position ${remaining.pos + 1}.`,
        };
      }

      if (!Number.isFinite(val)) {
        return { success: false, error: "Calculation result is infinite or undefined." };
      }

      // Eliminate minute IEEE 754 precision artifacts while preserving full scientific precision
      const cleanedVal = cleanPrecision(val);
      return { success: true, value: cleanedVal };
    } catch (err: unknown) {
      return { success: false, error: (err as Error).message };
    }
  }

  private expression(): number {
    return this.additive();
  }

  private additive(): number {
    let expr = this.multiplicative();

    while (this.match("PLUS", "MINUS")) {
      const op = this.tokens[this.current - 1].type;
      const right = this.multiplicative();
      if (op === "PLUS") {
        expr += right;
      } else {
        expr -= right;
      }
    }

    return expr;
  }

  private multiplicative(): number {
    let expr = this.unary();

    while (true) {
      if (this.match("MUL", "DIV")) {
        const op = this.tokens[this.current - 1].type;
        const right = this.unary();
        if (op === "MUL") {
          expr *= right;
        } else {
          if (right === 0) {
            throw new Error("Cannot divide by zero.");
          }
          expr /= right;
        }
      } else if (this.check("LPAREN")) {
        // Implicit multiplication: e.g. 2(3) or (2)(3)
        const right = this.unary();
        expr *= right;
      } else {
        break;
      }
    }

    return expr;
  }

  private unary(): number {
    if (this.match("PLUS")) {
      return this.unary();
    }
    if (this.match("MINUS")) {
      return -this.unary();
    }
    return this.power();
  }

  private power(): number {
    const left = this.primary();

    if (this.match("POW")) {
      // Right-associative: 2^3^2 = 2^(3^2) = 512
      // Supports negative exponent directly: 10^-3 or 2^-3
      const exponent = this.unary();

      if (left === 0 && exponent < 0) {
        throw new Error("Cannot divide by zero (0 raised to a negative power).");
      }
      if (left < 0 && !Number.isInteger(exponent)) {
        throw new Error("Complex number result: negative base cannot be raised to a non-integer power.");
      }

      return Math.pow(left, exponent);
    }

    return left;
  }

  private primary(): number {
    if (this.match("NUMBER")) {
      const tok = this.tokens[this.current - 1];
      const val = Number(tok.value);
      if (Number.isNaN(val)) {
        throw new Error(`Invalid number '${tok.value}' at position ${tok.pos + 1}.`);
      }
      return val;
    }

    if (this.match("LPAREN")) {
      const expr = this.expression();
      if (!this.match("RPAREN")) {
        throw new Error("Missing closing parenthesis ')'.");
      }
      return expr;
    }

    if (this.isAtEnd()) {
      throw new Error("Unexpected end of expression.");
    }

    const tok = this.peek();
    throw new Error(`Unexpected token '${tok.value}' at position ${tok.pos + 1}.`);
  }
}

/**
 * Eliminates tiny floating-point rounding errors (e.g. 0.30000000000000004 -> 0.3)
 * without sacrificing genuine precision for scientific numbers.
 */
function cleanPrecision(num: number): number {
  if (!Number.isFinite(num) || num === 0) return num;

  const p14 = Number(num.toPrecision(14));
  const diff = Math.abs(p14 - num);
  const threshold = 1e-14 * Math.abs(num);

  if (diff <= threshold) {
    return p14;
  }

  return num;
}

/**
 * Safely parses any mathematical input string (standard form, scientific notation,
 * powers, fractions, and arithmetic) into a JavaScript number.
 *
 * @param input Raw user input string
 * @returns MathParseResult
 */
export function parseMathExpression(input: string | undefined | null): MathParseResult {
  if (input === undefined || input === null) {
    return { success: false, error: "Input is empty. Please enter a value." };
  }

  const trimmed = input.trim();
  if (trimmed === "") {
    return { success: false, error: "Input is empty. Please enter a value." };
  }

  const preprocessed = preprocessMathString(trimmed);
  const tokenResult = tokenize(preprocessed);

  if ("error" in tokenResult) {
    return { success: false, error: tokenResult.error };
  }

  const parser = new MathParser(tokenResult.tokens);
  return parser.parse();
}

/**
 * Quick boolean checker whether a given string is a valid mathematical expression.
 */
export function isValidMathExpression(input: string): boolean {
  return parseMathExpression(input).success;
}
