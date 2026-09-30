export type MathNode =
  | {
      type: "variable";
      varId: string;
      symbol: string;
      name: string;
      unit: string;
      isConstant?: boolean;
      defaultValue?: string;
    }
  | {
      type: "target";
      varId: string;
      symbol: string;
      name: string;
      unit: string;
    }
  | {
      type: "number" | "constant";
      value: string | number;
    }
  | {
      type: "symbol" | "operator";
      text: string;
      ariaLabel?: string;
    }
  | {
      type: "fraction";
      numerator: MathNode | MathNode[];
      denominator: MathNode | MathNode[];
    }
  | {
      type: "power";
      base: MathNode | MathNode[];
      exponent: MathNode | MathNode[];
    }
  | {
      type: "subscript";
      base: MathNode | MathNode[];
      sub: MathNode | MathNode[];
    }
  | {
      type: "sqrt";
      radicand: MathNode | MathNode[];
      index?: string | number;
    }
  | {
      type: "brackets";
      content: MathNode | MathNode[];
      bracketType?: "round" | "square" | "curly" | "abs";
    }
  | {
      type: "function";
      name: string; // e.g. "sin", "cos", "tan", "ln", "log"
      argument: MathNode | MathNode[];
    }
  | {
      type: "row";
      items: MathNode[];
    };

// Helper factory functions
export const v = (
  varId: string,
  symbol: string,
  name: string,
  unit: string,
  isConstant?: boolean,
  defaultValue?: string
): MathNode => ({
  type: "variable",
  varId,
  symbol,
  name,
  unit,
  isConstant,
  defaultValue,
});

export const target = (
  varId: string,
  symbol: string,
  name: string,
  unit: string
): MathNode => ({
  type: "target",
  varId,
  symbol,
  name,
  unit,
});

export const num = (value: string | number): MathNode => ({
  type: "number",
  value,
});

export const sym = (text: string, ariaLabel?: string): MathNode => ({
  type: "symbol",
  text,
  ariaLabel,
});

export const frac = (
  numerator: MathNode | MathNode[],
  denominator: MathNode | MathNode[]
): MathNode => ({
  type: "fraction",
  numerator,
  denominator,
});

export const pow = (
  base: MathNode | MathNode[],
  exponent: MathNode | MathNode[]
): MathNode => ({
  type: "power",
  base,
  exponent,
});

export const sub = (
  base: MathNode | MathNode[],
  subVal: MathNode | MathNode[]
): MathNode => ({
  type: "subscript",
  base,
  sub: subVal,
});

export const sqrt = (
  radicand: MathNode | MathNode[],
  index?: string | number
): MathNode => ({
  type: "sqrt",
  radicand,
  index,
});

export const brackets = (
  content: MathNode | MathNode[],
  bracketType: "round" | "square" | "curly" | "abs" = "round"
): MathNode => ({
  type: "brackets",
  content,
  bracketType,
});

export const fn = (
  name: string,
  argument: MathNode | MathNode[]
): MathNode => ({
  type: "function",
  name,
  argument,
});

export const row = (...items: MathNode[]): MathNode => ({
  type: "row",
  items,
});
