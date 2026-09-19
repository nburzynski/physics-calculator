import type { Formula } from "../types/formula";

export type CalculationSuccess = {
  success: true;
  answer: number;
  formattedAnswer: string;
  variableSymbol: string;
  unit: string;
  steps: string[];
};

export type CalculationFailure = {
  success: false;
  error: string;
};

export type CalculationOutcome = CalculationSuccess | CalculationFailure;

/**
 * Format a number cleanly for display in physics calculations.
 * Supports standard scientific notation for very large/small numbers.
 */
export function formatPhysicsNumber(num: number): string {
  if (!Number.isFinite(num)) {
    return "Invalid result";
  }

  if (num === 0) return "0";

  const abs = Math.abs(num);

  // If extremely small (< 1e-3) or large (>= 1e5), use scientific notation
  if (abs < 0.001 || abs >= 100000) {
    const expStr = num.toExponential(4);
    const [coeff, exp] = expStr.split("e");
    const cleanCoeff = Number(coeff).toString();
    const expNum = parseInt(exp, 10);
    return `${cleanCoeff} × 10^${expNum}`;
  }

  // Otherwise, use 5 significant figures and remove trailing zeros
  return Number(num.toPrecision(5)).toString();
}

/**
 * Format step-by-step working steps cleanly.
 */
function makeSteps(
  equation: string,
  symbol: string,
  unit: string,
  rearrangedFormula: string,
  substitution: string,
  answer: number
): CalculationSuccess {
  const formattedAnswer = formatPhysicsNumber(answer);
  const unitStr = unit ? ` ${unit}` : "";

  const steps = [
    `1. Formula: ${equation}`,
    `2. Rearrange: ${rearrangedFormula}`,
    `3. Substitute: ${substitution}`,
    `4. Answer: ${symbol} = ${formattedAnswer}${unitStr}`,
  ];

  return {
    success: true,
    answer,
    formattedAnswer,
    variableSymbol: symbol,
    unit,
    steps,
  };
}

const degToRad = (deg: number) => (deg * Math.PI) / 180;
const radToDeg = (rad: number) => (rad * 180) / Math.PI;

/**
 * Main calculation dispatcher for all 92 OCR Physics formulas.
 */
export function calculateFormula(
  formula: Formula,
  rawValues: Record<string, string>
): CalculationOutcome {
  const emptyVars = formula.variables.filter(
    (v) => (rawValues[v.id] ?? "").trim() === ""
  );

  if (emptyVars.length !== 1) {
    return {
      success: false,
      error: "Please enter all known values and leave exactly one box blank to calculate.",
    };
  }

  const missingVar = emptyVars[0];
  const missing = missingVar.id;
  const symbol = missingVar.symbol;
  const unit = missingVar.unit;
  const eq = formula.equation;

  const vals: Record<string, number> = {};
  for (const v of formula.variables) {
    if (v.id !== missing) {
      const parsed = Number(rawValues[v.id]);
      if (Number.isNaN(parsed)) {
        return {
          success: false,
          error: `Invalid number entered for ${v.name} (${v.symbol}).`,
        };
      }
      vals[v.id] = parsed;
    }
  }

  const val = (id: string) => vals[id];
  const fNum = (n: number) => formatPhysicsNumber(n);

  // ============================================================
  // 1. SIMPLE MULTIPLICATION: A = B * C
  // ============================================================
  if (
    formula.calculatorType === "multiply" ||
    formula.id === "charge" ||
    formula.id === "latent-heat" ||
    formula.id === "circular-velocity" ||
    formula.id === "time-constant" ||
    formula.id === "acoustic-impedance" ||
    formula.id === "photon-energy-frequency"
  ) {
    const [first, second, third] = formula.variables;
    const v1 = val(first.id);
    const v2 = val(second.id);
    const v3 = val(third.id);

    if (missing === first.id) {
      const ans = v2 * v3;
      return makeSteps(
        eq,
        symbol,
        unit,
        `${first.symbol} = ${second.symbol} × ${third.symbol}`,
        `${first.symbol} = ${fNum(v2)} × ${fNum(v3)}`,
        ans
      );
    }
    if (missing === second.id) {
      if (v3 === 0) return { success: false, error: "Cannot divide by zero." };
      const ans = v1 / v3;
      return makeSteps(
        eq,
        symbol,
        unit,
        `${second.symbol} = ${first.symbol} ÷ ${third.symbol}`,
        `${second.symbol} = ${fNum(v1)} ÷ ${fNum(v3)}`,
        ans
      );
    }
    if (missing === third.id) {
      if (v2 === 0) return { success: false, error: "Cannot divide by zero." };
      const ans = v1 / v2;
      return makeSteps(
        eq,
        symbol,
        unit,
        `${third.symbol} = ${first.symbol} ÷ ${second.symbol}`,
        `${third.symbol} = ${fNum(v1)} ÷ ${fNum(v2)}`,
        ans
      );
    }
  }

  // ============================================================
  // 2. SIMPLE DIVISION: A = B / C
  // ============================================================
  if (
    formula.calculatorType === "divide" ||
    formula.id === "capacitance" ||
    formula.id === "gravitational-field-strength" ||
    formula.id === "electric-field-strength" ||
    formula.id === "electric-field-uniform" ||
    formula.id === "de-broglie-wavelength" ||
    formula.id === "refractive-index"
  ) {
    const [first, second, third] = formula.variables;
    const v1 = val(first.id);
    const v2 = val(second.id);
    const v3 = val(third.id);

    if (missing === first.id) {
      if (v3 === 0) return { success: false, error: "Cannot divide by zero." };
      const ans = v2 / v3;
      return makeSteps(
        eq,
        symbol,
        unit,
        `${first.symbol} = ${second.symbol} ÷ ${third.symbol}`,
        `${first.symbol} = ${fNum(v2)} ÷ ${fNum(v3)}`,
        ans
      );
    }
    if (missing === second.id) {
      const ans = v1 * v3;
      return makeSteps(
        eq,
        symbol,
        unit,
        `${second.symbol} = ${first.symbol} × ${third.symbol}`,
        `${second.symbol} = ${fNum(v1)} × ${fNum(v3)}`,
        ans
      );
    }
    if (missing === third.id) {
      if (v1 === 0) return { success: false, error: "Cannot divide by zero." };
      const ans = v2 / v1;
      return makeSteps(
        eq,
        symbol,
        unit,
        `${third.symbol} = ${second.symbol} ÷ ${first.symbol}`,
        `${third.symbol} = ${fNum(v2)} ÷ ${fNum(v1)}`,
        ans
      );
    }
  }

  // ============================================================
  // 3. TWO VARIABLE INVERSES & RELATIONS
  // ============================================================
  if (formula.id === "frequency-period") {
    const f = val("frequency");
    const T = val("period");
    if (missing === "frequency") {
      if (T === 0) return { success: false, error: "Period cannot be zero." };
      return makeSteps(eq, symbol, unit, "f = 1 ÷ T", `f = 1 ÷ ${fNum(T)}`, 1 / T);
    }
    if (f === 0) return { success: false, error: "Frequency cannot be zero." };
    return makeSteps(eq, symbol, unit, "T = 1 ÷ f", `T = 1 ÷ ${fNum(f)}`, 1 / f);
  }

  if (formula.id === "critical-angle") {
    // sin(C) = 1/n
    const C = val("critical-angle");
    const n = val("refractive-index");
    if (missing === "critical-angle") {
      if (n < 1) return { success: false, error: "Refractive index must be >= 1 for total internal reflection." };
      const sinC = 1 / n;
      const angleDeg = radToDeg(Math.asin(sinC));
      return makeSteps(
        eq,
        symbol,
        unit,
        "C = arcsin(1 ÷ n)",
        `C = arcsin(1 ÷ ${fNum(n)}) = arcsin(${fNum(sinC)})`,
        angleDeg
      );
    }
    if (missing === "refractive-index") {
      const sinC = Math.sin(degToRad(C));
      if (sinC <= 0) return { success: false, error: "Critical angle must have a positive sine." };
      return makeSteps(
        eq,
        symbol,
        unit,
        "n = 1 ÷ sin(C)",
        `n = 1 ÷ sin(${fNum(C)}°) = 1 ÷ ${fNum(sinC)}`,
        1 / sinC
      );
    }
  }

  if (formula.id === "angular-velocity-period") {
    // ω = 2π / T
    const omega = val("angular-velocity");
    const T = val("period");
    if (missing === "angular-velocity") {
      if (T === 0) return { success: false, error: "Period cannot be zero." };
      return makeSteps(eq, symbol, unit, "ω = 2π ÷ T", `ω = 2π ÷ ${fNum(T)}`, (2 * Math.PI) / T);
    }
    if (omega === 0) return { success: false, error: "Angular velocity cannot be zero." };
    return makeSteps(eq, symbol, unit, "T = 2π ÷ ω", `T = 2π ÷ ${fNum(omega)}`, (2 * Math.PI) / omega);
  }

  if (formula.id === "angular-velocity-frequency") {
    // ω = 2π f
    const omega = val("angular-velocity");
    const f = val("frequency");
    if (missing === "angular-velocity") {
      return makeSteps(eq, symbol, unit, "ω = 2π × f", `ω = 2π × ${fNum(f)}`, 2 * Math.PI * f);
    }
    return makeSteps(eq, symbol, unit, "f = ω ÷ (2π)", `f = ${fNum(omega)} ÷ (2π)`, omega / (2 * Math.PI));
  }

  if (formula.id === "half-life") {
    // λ * t_half = ln(2)
    const lambda = val("decay-constant");
    const tHalf = val("half-life");
    const ln2 = Math.LN2;
    if (missing === "half-life") {
      if (lambda <= 0) return { success: false, error: "Decay constant must be positive." };
      return makeSteps(
        eq,
        symbol,
        unit,
        "t½ = ln(2) ÷ λ",
        `t½ = ln(2) ÷ ${fNum(lambda)} = 0.693 ÷ ${fNum(lambda)}`,
        ln2 / lambda
      );
    }
    if (tHalf <= 0) return { success: false, error: "Half-life must be positive." };
    return makeSteps(
      eq,
      symbol,
      unit,
      "λ = ln(2) ÷ t½",
      `λ = ln(2) ÷ ${fNum(tHalf)} = 0.693 ÷ ${fNum(tHalf)}`,
      ln2 / tHalf
    );
  }

  if (formula.id === "radioactive-activity") {
    // A = λ N
    const A = val("activity");
    const lambda = val("decay-constant");
    const N = val("nuclei");
    if (missing === "activity") {
      return makeSteps(eq, symbol, unit, "A = λ × N", `A = ${fNum(lambda)} × ${fNum(N)}`, lambda * N);
    }
    if (missing === "decay-constant") {
      if (N === 0) return { success: false, error: "Number of nuclei cannot be zero." };
      return makeSteps(eq, symbol, unit, "λ = A ÷ N", `λ = ${fNum(A)} ÷ ${fNum(N)}`, A / N);
    }
    if (lambda === 0) return { success: false, error: "Decay constant cannot be zero." };
    return makeSteps(eq, symbol, unit, "N = A ÷ λ", `N = ${fNum(A)} ÷ ${fNum(lambda)}`, A / lambda);
  }

  // ============================================================
  // 4. SUVAT EQUATIONS
  // ============================================================
  if (formula.id === "suvat-velocity") {
    // v = u + at
    const u = val("initial-velocity");
    const v = val("final-velocity");
    const a = val("acceleration");
    const t = val("time");
    if (missing === "final-velocity") {
      return makeSteps(eq, symbol, unit, "v = u + at", `v = ${fNum(u)} + (${fNum(a)} × ${fNum(t)})`, u + a * t);
    }
    if (missing === "initial-velocity") {
      return makeSteps(eq, symbol, unit, "u = v - at", `u = ${fNum(v)} - (${fNum(a)} × ${fNum(t)})`, v - a * t);
    }
    if (missing === "acceleration") {
      if (t === 0) return { success: false, error: "Time cannot be zero." };
      return makeSteps(eq, symbol, unit, "a = (v - u) ÷ t", `a = (${fNum(v)} - ${fNum(u)}) ÷ ${fNum(t)}`, (v - u) / t);
    }
    if (missing === "time") {
      if (a === 0) return { success: false, error: "Acceleration cannot be zero when calculating time." };
      return makeSteps(eq, symbol, unit, "t = (v - u) ÷ a", `t = (${fNum(v)} - ${fNum(u)}) ÷ ${fNum(a)}`, (v - u) / a);
    }
  }

  if (formula.id === "suvat-average-velocity" || formula.calculatorType === "suvat-average-velocity") {
    // s = 0.5(u + v)t
    const s = val("displacement");
    const u = val("initial-velocity");
    const v = val("final-velocity");
    const t = val("time");
    if (missing === "displacement") {
      return makeSteps(eq, symbol, unit, "s = ½(u + v)t", `s = ½(${fNum(u)} + ${fNum(v)}) × ${fNum(t)}`, 0.5 * (u + v) * t);
    }
    if (missing === "initial-velocity") {
      if (t === 0) return { success: false, error: "Time cannot be zero." };
      return makeSteps(eq, symbol, unit, "u = (2s ÷ t) - v", `u = (2 × ${fNum(s)} ÷ ${fNum(t)}) - ${fNum(v)}`, (2 * s) / t - v);
    }
    if (missing === "final-velocity") {
      if (t === 0) return { success: false, error: "Time cannot be zero." };
      return makeSteps(eq, symbol, unit, "v = (2s ÷ t) - u", `v = (2 × ${fNum(s)} ÷ ${fNum(t)}) - ${fNum(u)}`, (2 * s) / t - u);
    }
    if (missing === "time") {
      if (u + v === 0) return { success: false, error: "(u + v) equals zero; cannot divide by zero." };
      return makeSteps(eq, symbol, unit, "t = 2s ÷ (u + v)", `t = 2 × ${fNum(s)} ÷ (${fNum(u)} + ${fNum(v)})`, (2 * s) / (u + v));
    }
  }

  if (formula.id === "suvat-displacement") {
    // s = ut + 0.5 a t^2
    const s = val("displacement");
    const u = val("initial-velocity");
    const a = val("acceleration");
    const t = val("time");
    if (missing === "displacement") {
      const ans = u * t + 0.5 * a * t * t;
      return makeSteps(
        eq,
        symbol,
        unit,
        "s = ut + ½at²",
        `s = (${fNum(u)} × ${fNum(t)}) + ½ × ${fNum(a)} × (${fNum(t)})²`,
        ans
      );
    }
    if (missing === "initial-velocity") {
      if (t === 0) return { success: false, error: "Time cannot be zero." };
      const ans = (s - 0.5 * a * t * t) / t;
      return makeSteps(
        eq,
        symbol,
        unit,
        "u = (s - ½at²) ÷ t",
        `u = (${fNum(s)} - ½ × ${fNum(a)} × ${fNum(t)}²) ÷ ${fNum(t)}`,
        ans
      );
    }
    if (missing === "acceleration") {
      if (t === 0) return { success: false, error: "Time cannot be zero." };
      const ans = (2 * (s - u * t)) / (t * t);
      return makeSteps(
        eq,
        symbol,
        unit,
        "a = 2(s - ut) ÷ t²",
        `a = 2(${fNum(s)} - ${fNum(u)} × ${fNum(t)}) ÷ (${fNum(t)})²`,
        ans
      );
    }
    if (missing === "time") {
      // 0.5 a t^2 + u t - s = 0
      if (a === 0) {
        if (u === 0) return { success: false, error: "Velocity and acceleration cannot both be zero." };
        const ans = s / u;
        return makeSteps(eq, symbol, unit, "t = s ÷ u (when a = 0)", `t = ${fNum(s)} ÷ ${fNum(u)}`, ans);
      }
      const disc = u * u + 2 * a * s;
      if (disc < 0) return { success: false, error: "No real solution (object never reaches displacement under this acceleration)." };
      const sqrtDisc = Math.sqrt(disc);
      const t1 = (-u + sqrtDisc) / a;
      const t2 = (-u - sqrtDisc) / a;
      // Pick positive time
      let chosenT = t1;
      if (t1 < 0 && t2 >= 0) chosenT = t2;
      else if (t1 >= 0 && t2 >= 0) chosenT = Math.min(t1, t2) > 0 ? Math.min(t1, t2) : Math.max(t1, t2);

      return makeSteps(
        eq,
        symbol,
        unit,
        "t = (-u ± √(u² + 2as)) ÷ a",
        `t = (-${fNum(u)} + √(${fNum(u)}² + 2 × ${fNum(a)} × ${fNum(s)})) ÷ ${fNum(a)}`,
        chosenT
      );
    }
  }

  if (formula.id === "suvat-no-time") {
    // v^2 = u^2 + 2as
    const v = val("final-velocity");
    const u = val("initial-velocity");
    const a = val("acceleration");
    const s = val("displacement");
    if (missing === "final-velocity") {
      const vSq = u * u + 2 * a * s;
      if (vSq < 0) return { success: false, error: "v² is negative; no real velocity exists." };
      const ans = Math.sqrt(vSq);
      return makeSteps(
        eq,
        symbol,
        unit,
        "v = √(u² + 2as)",
        `v = √(${fNum(u)}² + 2 × ${fNum(a)} × ${fNum(s)}) = √(${fNum(vSq)})`,
        ans
      );
    }
    if (missing === "initial-velocity") {
      const uSq = v * v - 2 * a * s;
      if (uSq < 0) return { success: false, error: "u² is negative; no real initial velocity exists." };
      const ans = Math.sqrt(uSq);
      return makeSteps(
        eq,
        symbol,
        unit,
        "u = √(v² - 2as)",
        `u = √(${fNum(v)}² - 2 × ${fNum(a)} × ${fNum(s)}) = √(${fNum(uSq)})`,
        ans
      );
    }
    if (missing === "acceleration") {
      if (s === 0) return { success: false, error: "Displacement cannot be zero." };
      const ans = (v * v - u * u) / (2 * s);
      return makeSteps(
        eq,
        symbol,
        unit,
        "a = (v² - u²) ÷ (2s)",
        `a = (${fNum(v)}² - ${fNum(u)}²) ÷ (2 × ${fNum(s)})`,
        ans
      );
    }
    if (missing === "displacement") {
      if (a === 0) return { success: false, error: "Acceleration cannot be zero." };
      const ans = (v * v - u * u) / (2 * a);
      return makeSteps(
        eq,
        symbol,
        unit,
        "s = (v² - u²) ÷ (2a)",
        `s = (${fNum(v)}² - ${fNum(u)}²) ÷ (2 × ${fNum(a)})`,
        ans
      );
    }
  }

  // ============================================================
  // 5. VECTOR COMPONENTS & TRIGONOMETRY (DEGREES)
  // ============================================================
  if (formula.id === "vector-horizontal-component") {
    // F_x = F cos(θ)
    const Fx = val("horizontal-component");
    const F = val("force");
    const theta = val("angle");
    if (missing === "horizontal-component") {
      const ans = F * Math.cos(degToRad(theta));
      return makeSteps(eq, symbol, unit, "Fx = F × cos(θ)", `Fx = ${fNum(F)} × cos(${fNum(theta)}°)`, ans);
    }
    if (missing === "force") {
      const cosVal = Math.cos(degToRad(theta));
      if (Math.abs(cosVal) < 1e-7) return { success: false, error: "cos(θ) is zero; cannot divide by zero." };
      return makeSteps(eq, symbol, unit, "F = Fx ÷ cos(θ)", `F = ${fNum(Fx)} ÷ cos(${fNum(theta)}°)`, Fx / cosVal);
    }
    if (missing === "angle") {
      if (F === 0) return { success: false, error: "Force cannot be zero." };
      const ratio = Fx / F;
      if (ratio < -1 || ratio > 1) return { success: false, error: "Fx / F must be between -1 and 1." };
      const ans = radToDeg(Math.acos(ratio));
      return makeSteps(eq, symbol, unit, "θ = arccos(Fx ÷ F)", `θ = arccos(${fNum(Fx)} ÷ ${fNum(F)})`, ans);
    }
  }

  if (formula.id === "vector-vertical-component") {
    // F_y = F sin(θ)
    const Fy = val("vertical-component");
    const F = val("force");
    const theta = val("angle");
    if (missing === "vertical-component") {
      const ans = F * Math.sin(degToRad(theta));
      return makeSteps(eq, symbol, unit, "Fy = F × sin(θ)", `Fy = ${fNum(F)} × sin(${fNum(theta)}°)`, ans);
    }
    if (missing === "force") {
      const sinVal = Math.sin(degToRad(theta));
      if (Math.abs(sinVal) < 1e-7) return { success: false, error: "sin(θ) is zero; cannot divide by zero." };
      return makeSteps(eq, symbol, unit, "F = Fy ÷ sin(θ)", `F = ${fNum(Fy)} ÷ sin(${fNum(theta)}°)`, Fy / sinVal);
    }
    if (missing === "angle") {
      if (F === 0) return { success: false, error: "Force cannot be zero." };
      const ratio = Fy / F;
      if (ratio < -1 || ratio > 1) return { success: false, error: "Fy / F must be between -1 and 1." };
      const ans = radToDeg(Math.asin(ratio));
      return makeSteps(eq, symbol, unit, "θ = arcsin(Fy ÷ F)", `θ = arcsin(${fNum(Fy)} ÷ ${fNum(F)})`, ans);
    }
  }

  if (formula.id === "work-done") {
    // W = F x cos(θ)
    const W = val("work");
    const F = val("force");
    const x = val("displacement");
    const theta = val("angle");
    if (missing === "work") {
      const ans = F * x * Math.cos(degToRad(theta));
      return makeSteps(eq, symbol, unit, "W = F × x × cos(θ)", `W = ${fNum(F)} × ${fNum(x)} × cos(${fNum(theta)}°)`, ans);
    }
    if (missing === "force") {
      const denom = x * Math.cos(degToRad(theta));
      if (Math.abs(denom) < 1e-7) return { success: false, error: "Denominator (x cos θ) is zero." };
      return makeSteps(eq, symbol, unit, "F = W ÷ (x × cos(θ))", `F = ${fNum(W)} ÷ (${fNum(x)} × cos(${fNum(theta)}°))`, W / denom);
    }
    if (missing === "displacement") {
      const denom = F * Math.cos(degToRad(theta));
      if (Math.abs(denom) < 1e-7) return { success: false, error: "Denominator (F cos θ) is zero." };
      return makeSteps(eq, symbol, unit, "x = W ÷ (F × cos(θ))", `x = ${fNum(W)} ÷ (${fNum(F)} × cos(${fNum(theta)}°))`, W / denom);
    }
    if (missing === "angle") {
      const denom = F * x;
      if (denom === 0) return { success: false, error: "Force and displacement cannot be zero." };
      const ratio = W / denom;
      if (ratio < -1 || ratio > 1) return { success: false, error: "W / (Fx) must be between -1 and 1." };
      const ans = radToDeg(Math.acos(ratio));
      return makeSteps(eq, symbol, unit, "θ = arccos(W ÷ (F × x))", `θ = arccos(${fNum(W)} ÷ (${fNum(F)} × ${fNum(x)}))`, ans);
    }
  }

  if (formula.id === "magnetic-force-current") {
    // F = B I l sin(θ)
    const F = val("force");
    const B = val("magnetic-field");
    const I = val("current");
    const l = val("length");
    const theta = val("angle");
    if (missing === "force") {
      const ans = B * I * l * Math.sin(degToRad(theta));
      return makeSteps(eq, symbol, unit, "F = B × I × l × sin(θ)", `F = ${fNum(B)} × ${fNum(I)} × ${fNum(l)} × sin(${fNum(theta)}°)`, ans);
    }
    const sinVal = Math.sin(degToRad(theta));
    if (missing === "magnetic-field") {
      const denom = I * l * sinVal;
      if (Math.abs(denom) < 1e-12) return { success: false, error: "Denominator cannot be zero." };
      return makeSteps(eq, symbol, unit, "B = F ÷ (I × l × sin(θ))", `B = ${fNum(F)} ÷ (${fNum(I)} × ${fNum(l)} × sin(${fNum(theta)}°))`, F / denom);
    }
    if (missing === "current") {
      const denom = B * l * sinVal;
      if (Math.abs(denom) < 1e-12) return { success: false, error: "Denominator cannot be zero." };
      return makeSteps(eq, symbol, unit, "I = F ÷ (B × l × sin(θ))", `I = ${fNum(F)} ÷ (${fNum(B)} × ${fNum(l)} × sin(${fNum(theta)}°))`, F / denom);
    }
    if (missing === "length") {
      const denom = B * I * sinVal;
      if (Math.abs(denom) < 1e-12) return { success: false, error: "Denominator cannot be zero." };
      return makeSteps(eq, symbol, unit, "l = F ÷ (B × I × sin(θ))", `l = ${fNum(F)} ÷ (${fNum(B)} × ${fNum(I)} × sin(${fNum(theta)}°))`, F / denom);
    }
    if (missing === "angle") {
      const denom = B * I * l;
      if (denom === 0) return { success: false, error: "Denominator cannot be zero." };
      const ratio = F / denom;
      if (ratio < -1 || ratio > 1) return { success: false, error: "F / (BIl) must be between -1 and 1." };
      const ans = radToDeg(Math.asin(ratio));
      return makeSteps(eq, symbol, unit, "θ = arcsin(F ÷ (B × I × l))", `θ = arcsin(${fNum(F)} ÷ (${fNum(B)} × ${fNum(I)} × ${fNum(l)}))`, ans);
    }
  }

  if (formula.id === "magnetic-flux") {
    // Φ = B A cos(θ)
    const phi = val("flux");
    const B = val("magnetic-field");
    const A = val("area");
    const theta = val("angle");
    if (missing === "flux") {
      const ans = B * A * Math.cos(degToRad(theta));
      return makeSteps(eq, symbol, unit, "Φ = B × A × cos(θ)", `Φ = ${fNum(B)} × ${fNum(A)} × cos(${fNum(theta)}°)`, ans);
    }
    const cosVal = Math.cos(degToRad(theta));
    if (missing === "magnetic-field") {
      const denom = A * cosVal;
      if (Math.abs(denom) < 1e-12) return { success: false, error: "Denominator cannot be zero." };
      return makeSteps(eq, symbol, unit, "B = Φ ÷ (A × cos(θ))", `B = ${fNum(phi)} ÷ (${fNum(A)} × cos(${fNum(theta)}°))`, phi / denom);
    }
    if (missing === "area") {
      const denom = B * cosVal;
      if (Math.abs(denom) < 1e-12) return { success: false, error: "Denominator cannot be zero." };
      return makeSteps(eq, symbol, unit, "A = Φ ÷ (B × cos(θ))", `A = ${fNum(phi)} ÷ (${fNum(B)} × cos(${fNum(theta)}°))`, phi / denom);
    }
    if (missing === "angle") {
      const denom = B * A;
      if (denom === 0) return { success: false, error: "Denominator cannot be zero." };
      const ratio = phi / denom;
      if (ratio < -1 || ratio > 1) return { success: false, error: "Φ / (BA) must be between -1 and 1." };
      const ans = radToDeg(Math.acos(ratio));
      return makeSteps(eq, symbol, unit, "θ = arccos(Φ ÷ (B × A))", `θ = arccos(${fNum(phi)} ÷ (${fNum(B)} × ${fNum(A)}))`, ans);
    }
  }

  if (formula.id === "snells-law") {
    // n1 sin(θ1) = n2 sin(θ2)
    const n1 = val("refractive-index-one");
    const t1 = val("angle-one");
    const n2 = val("refractive-index-two");
    const t2 = val("angle-two");
    if (missing === "refractive-index-one") {
      const sin1 = Math.sin(degToRad(t1));
      if (Math.abs(sin1) < 1e-7) return { success: false, error: "sin(θ₁) is zero." };
      const ans = (n2 * Math.sin(degToRad(t2))) / sin1;
      return makeSteps(eq, symbol, unit, "n₁ = (n₂ × sin(θ₂)) ÷ sin(θ₁)", `n₁ = (${fNum(n2)} × sin(${fNum(t2)}°)) ÷ sin(${fNum(t1)}°)`, ans);
    }
    if (missing === "refractive-index-two") {
      const sin2 = Math.sin(degToRad(t2));
      if (Math.abs(sin2) < 1e-7) return { success: false, error: "sin(θ₂) is zero." };
      const ans = (n1 * Math.sin(degToRad(t1))) / sin2;
      return makeSteps(eq, symbol, unit, "n₂ = (n₁ × sin(θ₁)) ÷ sin(θ₂)", `n₂ = (${fNum(n1)} × sin(${fNum(t1)}°)) ÷ sin(${fNum(t2)}°)`, ans);
    }
    if (missing === "angle-one") {
      if (n1 === 0) return { success: false, error: "n₁ cannot be zero." };
      const ratio = (n2 * Math.sin(degToRad(t2))) / n1;
      if (ratio < -1 || ratio > 1) return { success: false, error: "Total internal reflection (no real angle exists)." };
      const ans = radToDeg(Math.asin(ratio));
      return makeSteps(eq, symbol, unit, "θ₁ = arcsin((n₂ × sin(θ₂)) ÷ n₁)", `θ₁ = arcsin((${fNum(n2)} × sin(${fNum(t2)}°)) ÷ ${fNum(n1)})`, ans);
    }
    if (missing === "angle-two") {
      if (n2 === 0) return { success: false, error: "n₂ cannot be zero." };
      const ratio = (n1 * Math.sin(degToRad(t1))) / n2;
      if (ratio < -1 || ratio > 1) return { success: false, error: "Total internal reflection (no real angle exists)." };
      const ans = radToDeg(Math.asin(ratio));
      return makeSteps(eq, symbol, unit, "θ₂ = arcsin((n₁ × sin(θ₁)) ÷ n₂)", `θ₂ = arcsin((${fNum(n1)} × sin(${fNum(t1)}°)) ÷ ${fNum(n2)})`, ans);
    }
  }

  if (formula.id === "diffraction-grating") {
    // d sin(θ) = n λ
    const d = val("spacing");
    const theta = val("angle");
    const n = val("order");
    const lambda = val("wavelength");
    if (missing === "spacing") {
      const sinVal = Math.sin(degToRad(theta));
      if (Math.abs(sinVal) < 1e-7) return { success: false, error: "sin(θ) cannot be zero." };
      const ans = (n * lambda) / sinVal;
      return makeSteps(eq, symbol, unit, "d = (n × λ) ÷ sin(θ)", `d = (${fNum(n)} × ${fNum(lambda)}) ÷ sin(${fNum(theta)}°)`, ans);
    }
    if (missing === "angle") {
      if (d === 0) return { success: false, error: "Grating spacing d cannot be zero." };
      const ratio = (n * lambda) / d;
      if (ratio < -1 || ratio > 1) return { success: false, error: "Order does not exist (sin θ > 1)." };
      const ans = radToDeg(Math.asin(ratio));
      return makeSteps(eq, symbol, unit, "θ = arcsin((n × λ) ÷ d)", `θ = arcsin((${fNum(n)} × ${fNum(lambda)}) ÷ ${fNum(d)})`, ans);
    }
    if (missing === "order") {
      if (lambda === 0) return { success: false, error: "Wavelength cannot be zero." };
      const ans = (d * Math.sin(degToRad(theta))) / lambda;
      return makeSteps(eq, symbol, unit, "n = (d × sin(θ)) ÷ λ", `n = (${fNum(d)} × sin(${fNum(theta)}°)) ÷ ${fNum(lambda)}`, ans);
    }
    if (missing === "wavelength") {
      if (n === 0) return { success: false, error: "Order n cannot be zero." };
      const ans = (d * Math.sin(degToRad(theta))) / n;
      return makeSteps(eq, symbol, unit, "λ = (d × sin(θ)) ÷ n", `λ = (${fNum(d)} × sin(${fNum(theta)}°)) ÷ ${fNum(n)}`, ans);
    }
  }

  if (formula.id === "doppler-ultrasound") {
    // Δf / f = (2v cos θ) / c
    const deltaF = val("frequency-change");
    const f = val("frequency");
    const v = val("velocity");
    const theta = val("angle");
    const c = val("wave-speed");
    const cosVal = Math.cos(degToRad(theta));

    if (missing === "frequency-change") {
      if (c === 0) return { success: false, error: "Speed of sound c cannot be zero." };
      const ans = (2 * v * f * cosVal) / c;
      return makeSteps(eq, symbol, unit, "Δf = (2 × v × f × cos(θ)) ÷ c", `Δf = (2 × ${fNum(v)} × ${fNum(f)} × cos(${fNum(theta)}°)) ÷ ${fNum(c)}`, ans);
    }
    if (missing === "frequency") {
      const denom = 2 * v * cosVal;
      if (Math.abs(denom) < 1e-10) return { success: false, error: "Denominator cannot be zero." };
      const ans = (deltaF * c) / denom;
      return makeSteps(eq, symbol, unit, "f = (Δf × c) ÷ (2 × v × cos(θ))", `f = (${fNum(deltaF)} × ${fNum(c)}) ÷ (2 × ${fNum(v)} × cos(${fNum(theta)}°))`, ans);
    }
    if (missing === "velocity") {
      const denom = 2 * f * cosVal;
      if (Math.abs(denom) < 1e-10) return { success: false, error: "Denominator cannot be zero." };
      const ans = (deltaF * c) / denom;
      return makeSteps(eq, symbol, unit, "v = (Δf × c) ÷ (2 × f × cos(θ))", `v = (${fNum(deltaF)} × ${fNum(c)}) ÷ (2 × ${fNum(f)} × cos(${fNum(theta)}°))`, ans);
    }
    if (missing === "angle") {
      const denom = 2 * v * f;
      if (denom === 0) return { success: false, error: "Velocity and frequency cannot be zero." };
      const ratio = (deltaF * c) / denom;
      if (ratio < -1 || ratio > 1) return { success: false, error: "cos(θ) ratio must be between -1 and 1." };
      const ans = radToDeg(Math.acos(ratio));
      return makeSteps(eq, symbol, unit, "θ = arccos((Δf × c) ÷ (2 × v × f))", `θ = arccos((${fNum(deltaF)} × ${fNum(c)}) ÷ (2 × ${fNum(v)} × ${fNum(f)}))`, ans);
    }
    if (missing === "wave-speed") {
      if (deltaF === 0) return { success: false, error: "Δf cannot be zero." };
      const ans = (2 * v * f * cosVal) / deltaF;
      return makeSteps(eq, symbol, unit, "c = (2 × v × f × cos(θ)) ÷ Δf", `c = (2 × ${fNum(v)} × ${fNum(f)} × cos(${fNum(theta)}°)) ÷ ${fNum(deltaF)}`, ans);
    }
  }

  // ============================================================
  // 6. SHM IN RADIANS
  // ============================================================
  if (formula.id === "shm-displacement-cos") {
    // x = A cos(ωt)
    const x = val("displacement");
    const A = val("amplitude");
    const omega = val("angular-velocity");
    const t = val("time");
    if (missing === "displacement") {
      const ans = A * Math.cos(omega * t);
      return makeSteps(eq, symbol, unit, "x = A × cos(ωt)", `x = ${fNum(A)} × cos(${fNum(omega)} × ${fNum(t)} rad)`, ans);
    }
    if (missing === "amplitude") {
      const cosVal = Math.cos(omega * t);
      if (Math.abs(cosVal) < 1e-7) return { success: false, error: "cos(ωt) is zero." };
      return makeSteps(eq, symbol, unit, "A = x ÷ cos(ωt)", `A = ${fNum(x)} ÷ cos(${fNum(omega * t)} rad)`, x / cosVal);
    }
    if (missing === "angular-velocity") {
      if (A === 0 || t === 0) return { success: false, error: "Amplitude and time cannot be zero." };
      const ratio = x / A;
      if (ratio < -1 || ratio > 1) return { success: false, error: "x/A must be between -1 and 1." };
      const ans = Math.acos(ratio) / t;
      return makeSteps(eq, symbol, unit, "ω = arccos(x ÷ A) ÷ t", `ω = arccos(${fNum(x)} ÷ ${fNum(A)}) ÷ ${fNum(t)}`, ans);
    }
    if (missing === "time") {
      if (A === 0 || omega === 0) return { success: false, error: "Amplitude and angular velocity cannot be zero." };
      const ratio = x / A;
      if (ratio < -1 || ratio > 1) return { success: false, error: "x/A must be between -1 and 1." };
      const ans = Math.acos(ratio) / omega;
      return makeSteps(eq, symbol, unit, "t = arccos(x ÷ A) ÷ ω", `t = arccos(${fNum(x)} ÷ ${fNum(A)}) ÷ ${fNum(omega)}`, ans);
    }
  }

  if (formula.id === "shm-displacement-sin") {
    // x = A sin(ωt)
    const x = val("displacement");
    const A = val("amplitude");
    const omega = val("angular-velocity");
    const t = val("time");
    if (missing === "displacement") {
      const ans = A * Math.sin(omega * t);
      return makeSteps(eq, symbol, unit, "x = A × sin(ωt)", `x = ${fNum(A)} × sin(${fNum(omega)} × ${fNum(t)} rad)`, ans);
    }
    if (missing === "amplitude") {
      const sinVal = Math.sin(omega * t);
      if (Math.abs(sinVal) < 1e-7) return { success: false, error: "sin(ωt) is zero." };
      return makeSteps(eq, symbol, unit, "A = x ÷ sin(ωt)", `A = ${fNum(x)} ÷ sin(${fNum(omega * t)} rad)`, x / sinVal);
    }
    if (missing === "angular-velocity") {
      if (A === 0 || t === 0) return { success: false, error: "Amplitude and time cannot be zero." };
      const ratio = x / A;
      if (ratio < -1 || ratio > 1) return { success: false, error: "x/A must be between -1 and 1." };
      const ans = Math.asin(ratio) / t;
      return makeSteps(eq, symbol, unit, "ω = arcsin(x ÷ A) ÷ t", `ω = arcsin(${fNum(x)} ÷ ${fNum(A)}) ÷ ${fNum(t)}`, ans);
    }
    if (missing === "time") {
      if (A === 0 || omega === 0) return { success: false, error: "Amplitude and angular velocity cannot be zero." };
      const ratio = x / A;
      if (ratio < -1 || ratio > 1) return { success: false, error: "x/A must be between -1 and 1." };
      const ans = Math.asin(ratio) / omega;
      return makeSteps(eq, symbol, unit, "t = arcsin(x ÷ A) ÷ ω", `t = arcsin(${fNum(x)} ÷ ${fNum(A)}) ÷ ${fNum(omega)}`, ans);
    }
  }

  if (formula.id === "simple-harmonic-acceleration") {
    // a = -ω^2 x
    const a = val("acceleration");
    const omega = val("angular-velocity");
    const x = val("displacement");
    if (missing === "acceleration") {
      const ans = -omega * omega * x;
      return makeSteps(eq, symbol, unit, "a = -ω²x", `a = -(${fNum(omega)})² × ${fNum(x)}`, ans);
    }
    if (missing === "angular-velocity") {
      if (x === 0) return { success: false, error: "Displacement cannot be zero." };
      const valRatio = -a / x;
      if (valRatio < 0) return { success: false, error: "Acceleration and displacement must have opposite signs in SHM." };
      const ans = Math.sqrt(valRatio);
      return makeSteps(eq, symbol, unit, "ω = √(-a ÷ x)", `ω = √(-${fNum(a)} ÷ ${fNum(x)}) = √(${fNum(valRatio)})`, ans);
    }
    if (missing === "displacement") {
      if (omega === 0) return { success: false, error: "Angular velocity cannot be zero." };
      const ans = -a / (omega * omega);
      return makeSteps(eq, symbol, unit, "x = -a ÷ ω²", `x = -${fNum(a)} ÷ (${fNum(omega)})²`, ans);
    }
  }

  // ============================================================
  // 7. ENERGIES, CAPACITOR ENERGIES & POWERS WITH FACTOR ½ OR SQUARES
  // ============================================================
  if (formula.id === "elastic-energy-force-extension" || formula.id === "capacitor-energy-charge-voltage") {
    // E = 0.5 * v2 * v3
    const [first, second, third] = formula.variables;
    const v1 = val(first.id);
    const v2 = val(second.id);
    const v3 = val(third.id);
    if (missing === first.id) {
      const ans = 0.5 * v2 * v3;
      return makeSteps(eq, symbol, unit, `${first.symbol} = ½ × ${second.symbol} × ${third.symbol}`, `${first.symbol} = ½ × ${fNum(v2)} × ${fNum(v3)}`, ans);
    }
    if (missing === second.id) {
      if (v3 === 0) return { success: false, error: "Cannot divide by zero." };
      const ans = (2 * v1) / v3;
      return makeSteps(eq, symbol, unit, `${second.symbol} = 2${first.symbol} ÷ ${third.symbol}`, `${second.symbol} = (2 × ${fNum(v1)}) ÷ ${fNum(v3)}`, ans);
    }
    if (missing === third.id) {
      if (v2 === 0) return { success: false, error: "Cannot divide by zero." };
      const ans = (2 * v1) / v2;
      return makeSteps(eq, symbol, unit, `${third.symbol} = 2${first.symbol} ÷ ${second.symbol}`, `${third.symbol} = (2 × ${fNum(v1)}) ÷ ${fNum(v2)}`, ans);
    }
  }

  if (formula.id === "elastic-energy-spring") {
    // E = 0.5 * k * x^2
    const E = val("energy");
    const k = val("spring-constant");
    const x = val("extension");
    if (missing === "energy") {
      const ans = 0.5 * k * x * x;
      return makeSteps(eq, symbol, unit, "E = ½kx²", `E = ½ × ${fNum(k)} × (${fNum(x)})²`, ans);
    }
    if (missing === "spring-constant") {
      if (x === 0) return { success: false, error: "Extension cannot be zero." };
      const ans = (2 * E) / (x * x);
      return makeSteps(eq, symbol, unit, "k = 2E ÷ x²", `k = (2 × ${fNum(E)}) ÷ (${fNum(x)})²`, ans);
    }
    if (missing === "extension") {
      if (k === 0) return { success: false, error: "Spring constant cannot be zero." };
      const valRatio = (2 * E) / k;
      if (valRatio < 0) return { success: false, error: "Negative value under square root." };
      const ans = Math.sqrt(valRatio);
      return makeSteps(eq, symbol, unit, "x = √(2E ÷ k)", `x = √(2 × ${fNum(E)} ÷ ${fNum(k)}) = √(${fNum(valRatio)})`, ans);
    }
  }

  if (formula.id === "capacitor-energy-charge-capacitance") {
    // W = 0.5 * Q^2 / C
    const W = val("energy");
    const Q = val("charge");
    const C = val("capacitance");
    if (missing === "energy") {
      if (C === 0) return { success: false, error: "Capacitance cannot be zero." };
      const ans = (0.5 * Q * Q) / C;
      return makeSteps(eq, symbol, unit, "W = ½(Q² ÷ C)", `W = ½ × (${fNum(Q)})² ÷ ${fNum(C)}`, ans);
    }
    if (missing === "charge") {
      const valProd = 2 * W * C;
      if (valProd < 0) return { success: false, error: "Negative value under square root." };
      const ans = Math.sqrt(valProd);
      return makeSteps(eq, symbol, unit, "Q = √(2WC)", `Q = √(2 × ${fNum(W)} × ${fNum(C)}) = √(${fNum(valProd)})`, ans);
    }
    if (missing === "capacitance") {
      if (W === 0) return { success: false, error: "Energy cannot be zero." };
      const ans = (0.5 * Q * Q) / W;
      return makeSteps(eq, symbol, unit, "C = ½Q² ÷ W", `C = ½ × (${fNum(Q)})² ÷ ${fNum(W)}`, ans);
    }
  }

  if (formula.id === "capacitor-energy-voltage-capacitance") {
    // W = 0.5 * V^2 * C
    const W = val("energy");
    const V = val("voltage");
    const C = val("capacitance");
    if (missing === "energy") {
      const ans = 0.5 * V * V * C;
      return makeSteps(eq, symbol, unit, "W = ½V²C", `W = ½ × (${fNum(V)})² × ${fNum(C)}`, ans);
    }
    if (missing === "voltage") {
      if (C === 0) return { success: false, error: "Capacitance cannot be zero." };
      const valRatio = (2 * W) / C;
      if (valRatio < 0) return { success: false, error: "Negative value under square root." };
      const ans = Math.sqrt(valRatio);
      return makeSteps(eq, symbol, unit, "V = √(2W ÷ C)", `V = √(2 × ${fNum(W)} ÷ ${fNum(C)}) = √(${fNum(valRatio)})`, ans);
    }
    if (missing === "capacitance") {
      if (V === 0) return { success: false, error: "Voltage cannot be zero." };
      const ans = (2 * W) / (V * V);
      return makeSteps(eq, symbol, unit, "C = 2W ÷ V²", `C = (2 × ${fNum(W)}) ÷ (${fNum(V)})²`, ans);
    }
  }

  if (formula.id === "electrical-power-current-resistance") {
    // P = I^2 * R
    const P = val("power");
    const I = val("current");
    const R = val("resistance");
    if (missing === "power") {
      const ans = I * I * R;
      return makeSteps(eq, symbol, unit, "P = I²R", `P = (${fNum(I)})² × ${fNum(R)}`, ans);
    }
    if (missing === "current") {
      if (R === 0) return { success: false, error: "Resistance cannot be zero." };
      const ratio = P / R;
      if (ratio < 0) return { success: false, error: "P/R is negative; cannot take square root." };
      const ans = Math.sqrt(ratio);
      return makeSteps(eq, symbol, unit, "I = √(P ÷ R)", `I = √(${fNum(P)} ÷ ${fNum(R)}) = √(${fNum(ratio)})`, ans);
    }
    if (missing === "resistance") {
      if (I === 0) return { success: false, error: "Current cannot be zero." };
      const ans = P / (I * I);
      return makeSteps(eq, symbol, unit, "R = P ÷ I²", `R = ${fNum(P)} ÷ (${fNum(I)})²`, ans);
    }
  }

  if (formula.id === "electrical-power-voltage-resistance") {
    // P = V^2 / R
    const P = val("power");
    const V = val("voltage");
    const R = val("resistance");
    if (missing === "power") {
      if (R === 0) return { success: false, error: "Resistance cannot be zero." };
      const ans = (V * V) / R;
      return makeSteps(eq, symbol, unit, "P = V² ÷ R", `P = (${fNum(V)})² ÷ ${fNum(R)}`, ans);
    }
    if (missing === "voltage") {
      const prod = P * R;
      if (prod < 0) return { success: false, error: "P*R is negative; cannot take square root." };
      const ans = Math.sqrt(prod);
      return makeSteps(eq, symbol, unit, "V = √(P × R)", `V = √(${fNum(P)} × ${fNum(R)}) = √(${fNum(prod)})`, ans);
    }
    if (missing === "resistance") {
      if (P === 0) return { success: false, error: "Power cannot be zero." };
      const ans = (V * V) / P;
      return makeSteps(eq, symbol, unit, "R = V² ÷ P", `R = (${fNum(V)})² ÷ ${fNum(P)}`, ans);
    }
  }

  if (formula.id === "mass-energy") {
    // ΔE = Δm * c^2
    const deltaE = val("energy");
    const deltaM = val("mass");
    const c = val("light-speed");
    if (missing === "energy") {
      const ans = deltaM * c * c;
      return makeSteps(eq, symbol, unit, "ΔE = Δm × c²", `ΔE = ${fNum(deltaM)} × (${fNum(c)})²`, ans);
    }
    if (missing === "mass") {
      if (c === 0) return { success: false, error: "Speed of light cannot be zero." };
      const ans = deltaE / (c * c);
      return makeSteps(eq, symbol, unit, "Δm = ΔE ÷ c²", `Δm = ${fNum(deltaE)} ÷ (${fNum(c)})²`, ans);
    }
    if (missing === "light-speed") {
      if (deltaM === 0) return { success: false, error: "Mass change cannot be zero." };
      const ratio = deltaE / deltaM;
      if (ratio < 0) return { success: false, error: "ΔE/Δm is negative." };
      const ans = Math.sqrt(ratio);
      return makeSteps(eq, symbol, unit, "c = √(ΔE ÷ Δm)", `c = √(${fNum(deltaE)} ÷ ${fNum(deltaM)})`, ans);
    }
  }

  // ============================================================
  // 8. CENTRIPETAL MOTION
  // ============================================================
  if (formula.id === "centripetal-acceleration") {
    // a = v^2 / r
    const a = val("acceleration");
    const v = val("velocity");
    const r = val("radius");
    if (missing === "acceleration") {
      if (r === 0) return { success: false, error: "Radius cannot be zero." };
      const ans = (v * v) / r;
      return makeSteps(eq, symbol, unit, "a = v² ÷ r", `a = (${fNum(v)})² ÷ ${fNum(r)}`, ans);
    }
    if (missing === "velocity") {
      const prod = a * r;
      if (prod < 0) return { success: false, error: "Negative value under square root." };
      const ans = Math.sqrt(prod);
      return makeSteps(eq, symbol, unit, "v = √(a × r)", `v = √(${fNum(a)} × ${fNum(r)}) = √(${fNum(prod)})`, ans);
    }
    if (missing === "radius") {
      if (a === 0) return { success: false, error: "Acceleration cannot be zero." };
      const ans = (v * v) / a;
      return makeSteps(eq, symbol, unit, "r = v² ÷ a", `r = (${fNum(v)})² ÷ ${fNum(a)}`, ans);
    }
  }

  if (formula.id === "centripetal-acceleration-angular") {
    // a = ω^2 * r
    const a = val("acceleration");
    const omega = val("angular-velocity");
    const r = val("radius");
    if (missing === "acceleration") {
      const ans = omega * omega * r;
      return makeSteps(eq, symbol, unit, "a = ω²r", `a = (${fNum(omega)})² × ${fNum(r)}`, ans);
    }
    if (missing === "angular-velocity") {
      if (r === 0) return { success: false, error: "Radius cannot be zero." };
      const ratio = a / r;
      if (ratio < 0) return { success: false, error: "Negative value under square root." };
      const ans = Math.sqrt(ratio);
      return makeSteps(eq, symbol, unit, "ω = √(a ÷ r)", `ω = √(${fNum(a)} ÷ ${fNum(r)}) = √(${fNum(ratio)})`, ans);
    }
    if (missing === "radius") {
      if (omega === 0) return { success: false, error: "Angular velocity cannot be zero." };
      const ans = a / (omega * omega);
      return makeSteps(eq, symbol, unit, "r = a ÷ ω²", `r = ${fNum(a)} ÷ (${fNum(omega)})²`, ans);
    }
  }

  if (formula.id === "centripetal-force") {
    // F = m v^2 / r
    const F = val("force");
    const m = val("mass");
    const v = val("velocity");
    const r = val("radius");
    if (missing === "force") {
      if (r === 0) return { success: false, error: "Radius cannot be zero." };
      const ans = (m * v * v) / r;
      return makeSteps(eq, symbol, unit, "F = mv² ÷ r", `F = (${fNum(m)} × ${fNum(v)}²) ÷ ${fNum(r)}`, ans);
    }
    if (missing === "mass") {
      if (v === 0) return { success: false, error: "Velocity cannot be zero." };
      const ans = (F * r) / (v * v);
      return makeSteps(eq, symbol, unit, "m = (F × r) ÷ v²", `m = (${fNum(F)} × ${fNum(r)}) ÷ (${fNum(v)})²`, ans);
    }
    if (missing === "velocity") {
      if (m === 0) return { success: false, error: "Mass cannot be zero." };
      const valRatio = (F * r) / m;
      if (valRatio < 0) return { success: false, error: "Negative value under square root." };
      const ans = Math.sqrt(valRatio);
      return makeSteps(eq, symbol, unit, "v = √(Fr ÷ m)", `v = √(${fNum(F)} × ${fNum(r)} ÷ ${fNum(m)})`, ans);
    }
    if (missing === "radius") {
      if (F === 0) return { success: false, error: "Force cannot be zero." };
      const ans = (m * v * v) / F;
      return makeSteps(eq, symbol, unit, "r = mv² ÷ F", `r = (${fNum(m)} × (${fNum(v)})²) ÷ ${fNum(F)}`, ans);
    }
  }

  if (formula.id === "centripetal-force-angular") {
    // F = m ω^2 r
    const F = val("force");
    const m = val("mass");
    const omega = val("angular-velocity");
    const r = val("radius");
    if (missing === "force") {
      const ans = m * omega * omega * r;
      return makeSteps(eq, symbol, unit, "F = mω²r", `F = ${fNum(m)} × (${fNum(omega)})² × ${fNum(r)}`, ans);
    }
    if (missing === "mass") {
      const denom = omega * omega * r;
      if (denom === 0) return { success: false, error: "Denominator cannot be zero." };
      const ans = F / denom;
      return makeSteps(eq, symbol, unit, "m = F ÷ (ω²r)", `m = ${fNum(F)} ÷ (${fNum(omega)}² × ${fNum(r)})`, ans);
    }
    if (missing === "angular-velocity") {
      const denom = m * r;
      if (denom === 0) return { success: false, error: "Denominator cannot be zero." };
      const ratio = F / denom;
      if (ratio < 0) return { success: false, error: "Negative value under square root." };
      const ans = Math.sqrt(ratio);
      return makeSteps(eq, symbol, unit, "ω = √(F ÷ (mr))", `ω = √(${fNum(F)} ÷ (${fNum(m)} × ${fNum(r)}))`, ans);
    }
    if (missing === "radius") {
      const denom = m * omega * omega;
      if (denom === 0) return { success: false, error: "Denominator cannot be zero." };
      const ans = F / denom;
      return makeSteps(eq, symbol, unit, "r = F ÷ (mω²)", `r = ${fNum(F)} ÷ (${fNum(m)} × (${fNum(omega)})²)`, ans);
    }
  }

  // ============================================================
  // 9. GRAVITATION & ASTRONOMY
  // ============================================================
  if (formula.id === "gravitational-force") {
    // F = G M m / r^2
    const F = Math.abs(val("force"));
    const G = val("gravitational-constant");
    const M = val("mass-one");
    const m = val("mass-two");
    const r = val("radius");
    if (missing === "force") {
      if (r === 0) return { success: false, error: "Radius cannot be zero." };
      const ans = (G * M * m) / (r * r);
      return makeSteps(eq, symbol, unit, "F = GMm ÷ r²", `F = (${fNum(G)} × ${fNum(M)} × ${fNum(m)}) ÷ (${fNum(r)})²`, ans);
    }
    if (missing === "gravitational-constant") {
      if (M * m === 0) return { success: false, error: "Masses cannot be zero." };
      const ans = (F * r * r) / (M * m);
      return makeSteps(eq, symbol, unit, "G = Fr² ÷ (Mm)", `G = (${fNum(F)} × ${fNum(r)}²) ÷ (${fNum(M)} × ${fNum(m)})`, ans);
    }
    if (missing === "mass-one") {
      if (G * m === 0) return { success: false, error: "Denominator cannot be zero." };
      const ans = (F * r * r) / (G * m);
      return makeSteps(eq, symbol, unit, "M = Fr² ÷ (Gm)", `M = (${fNum(F)} × ${fNum(r)}²) ÷ (${fNum(G)} × ${fNum(m)})`, ans);
    }
    if (missing === "mass-two") {
      if (G * M === 0) return { success: false, error: "Denominator cannot be zero." };
      const ans = (F * r * r) / (G * M);
      return makeSteps(eq, symbol, unit, "m = Fr² ÷ (GM)", `m = (${fNum(F)} × ${fNum(r)}²) ÷ (${fNum(G)} × ${fNum(M)})`, ans);
    }
    if (missing === "radius") {
      if (F === 0) return { success: false, error: "Force cannot be zero." };
      const valRatio = (G * M * m) / F;
      if (valRatio < 0) return { success: false, error: "Negative value under square root." };
      const ans = Math.sqrt(valRatio);
      return makeSteps(eq, symbol, unit, "r = √(GMm ÷ F)", `r = √(${fNum(G)} × ${fNum(M)} × ${fNum(m)} ÷ ${fNum(F)})`, ans);
    }
  }

  if (formula.id === "gravitational-field-equation") {
    // g = GM / r^2
    const g = Math.abs(val("field-strength"));
    const G = val("gravitational-constant");
    const M = val("mass");
    const r = val("radius");
    if (missing === "field-strength") {
      if (r === 0) return { success: false, error: "Radius cannot be zero." };
      const ans = (G * M) / (r * r);
      return makeSteps(eq, symbol, unit, "g = GM ÷ r²", `g = (${fNum(G)} × ${fNum(M)}) ÷ (${fNum(r)})²`, ans);
    }
    if (missing === "gravitational-constant") {
      if (M === 0) return { success: false, error: "Mass cannot be zero." };
      const ans = (g * r * r) / M;
      return makeSteps(eq, symbol, unit, "G = gr² ÷ M", `G = (${fNum(g)} × ${fNum(r)}²) ÷ ${fNum(M)}`, ans);
    }
    if (missing === "mass") {
      if (G === 0) return { success: false, error: "G cannot be zero." };
      const ans = (g * r * r) / G;
      return makeSteps(eq, symbol, unit, "M = gr² ÷ G", `M = (${fNum(g)} × ${fNum(r)}²) ÷ ${fNum(G)}`, ans);
    }
    if (missing === "radius") {
      if (g === 0) return { success: false, error: "Field strength cannot be zero." };
      const valRatio = (G * M) / g;
      if (valRatio < 0) return { success: false, error: "Negative value under square root." };
      const ans = Math.sqrt(valRatio);
      return makeSteps(eq, symbol, unit, "r = √(GM ÷ g)", `r = √(${fNum(G)} × ${fNum(M)} ÷ ${fNum(g)})`, ans);
    }
  }

  if (formula.id === "stefan-law") {
    // L = 4 π r^2 σ T^4
    const L = val("luminosity");
    const r = val("radius");
    const sigma = val("stefan-constant");
    const T = val("temperature");
    const fourPi = 4 * Math.PI;

    if (missing === "luminosity") {
      const ans = fourPi * r * r * sigma * Math.pow(T, 4);
      return makeSteps(eq, symbol, unit, "L = 4πr²σT⁴", `L = 4π × (${fNum(r)})² × ${fNum(sigma)} × (${fNum(T)})⁴`, ans);
    }
    if (missing === "radius") {
      const denom = fourPi * sigma * Math.pow(T, 4);
      if (denom === 0) return { success: false, error: "Denominator cannot be zero." };
      const rSq = L / denom;
      if (rSq < 0) return { success: false, error: "Negative value under square root." };
      const ans = Math.sqrt(rSq);
      return makeSteps(eq, symbol, unit, "r = √(L ÷ (4πσT⁴))", `r = √(${fNum(L)} ÷ (4π × ${fNum(sigma)} × ${fNum(T)}⁴))`, ans);
    }
    if (missing === "stefan-constant") {
      const denom = fourPi * r * r * Math.pow(T, 4);
      if (denom === 0) return { success: false, error: "Denominator cannot be zero." };
      const ans = L / denom;
      return makeSteps(eq, symbol, unit, "σ = L ÷ (4πr²T⁴)", `σ = ${fNum(L)} ÷ (4π × ${fNum(r)}² × ${fNum(T)}⁴)`, ans);
    }
    if (missing === "temperature") {
      const denom = fourPi * r * r * sigma;
      if (denom === 0) return { success: false, error: "Denominator cannot be zero." };
      const t4 = L / denom;
      if (t4 < 0) return { success: false, error: "Negative value under fourth root." };
      const ans = Math.pow(t4, 0.25);
      return makeSteps(eq, symbol, unit, "T = (L ÷ (4πr²σ))^(¼)", `T = (${fNum(L)} ÷ (4π × ${fNum(r)}² × ${fNum(sigma)}))^(¼)`, ans);
    }
  }

  // ============================================================
  // 10. CIRCUITS, RESISTORS, CAPACITORS & DIVIDERS
  // ============================================================
  if (formula.id === "electrical-work-current-time") {
    // W = V I t
    const W = val("work");
    const V = val("voltage");
    const I = val("current");
    const t = val("time");
    if (missing === "work") {
      return makeSteps(eq, symbol, unit, "W = V × I × t", `W = ${fNum(V)} × ${fNum(I)} × ${fNum(t)}`, V * I * t);
    }
    if (missing === "voltage") {
      if (I * t === 0) return { success: false, error: "Denominator cannot be zero." };
      return makeSteps(eq, symbol, unit, "V = W ÷ (I × t)", `V = ${fNum(W)} ÷ (${fNum(I)} × ${fNum(t)})`, W / (I * t));
    }
    if (missing === "current") {
      if (V * t === 0) return { success: false, error: "Denominator cannot be zero." };
      return makeSteps(eq, symbol, unit, "I = W ÷ (V × t)", `I = ${fNum(W)} ÷ (${fNum(V)} × ${fNum(t)})`, W / (V * t));
    }
    if (missing === "time") {
      if (V * I === 0) return { success: false, error: "Denominator cannot be zero." };
      return makeSteps(eq, symbol, unit, "t = W ÷ (V × I)", `t = ${fNum(W)} ÷ (${fNum(V)} × ${fNum(I)})`, W / (V * I));
    }
  }

  if (formula.id === "resistivity") {
    // R = ρ L / A
    const R = val("resistance");
    const rho = val("resistivity");
    const L = val("length");
    const A = val("area");
    if (missing === "resistance") {
      if (A === 0) return { success: false, error: "Area cannot be zero." };
      const ans = (rho * L) / A;
      return makeSteps(eq, symbol, unit, "R = (ρ × L) ÷ A", `R = (${fNum(rho)} × ${fNum(L)}) ÷ ${fNum(A)}`, ans);
    }
    if (missing === "resistivity") {
      if (L === 0) return { success: false, error: "Length cannot be zero." };
      const ans = (R * A) / L;
      return makeSteps(eq, symbol, unit, "ρ = (R × A) ÷ L", `ρ = (${fNum(R)} × ${fNum(A)}) ÷ ${fNum(L)}`, ans);
    }
    if (missing === "length") {
      if (rho === 0) return { success: false, error: "Resistivity cannot be zero." };
      const ans = (R * A) / rho;
      return makeSteps(eq, symbol, unit, "L = (R × A) ÷ ρ", `L = (${fNum(R)} × ${fNum(A)}) ÷ ${fNum(rho)}`, ans);
    }
    if (missing === "area") {
      if (R === 0) return { success: false, error: "Resistance cannot be zero." };
      const ans = (rho * L) / R;
      return makeSteps(eq, symbol, unit, "A = (ρ × L) ÷ R", `A = (${fNum(rho)} × ${fNum(L)}) ÷ ${fNum(R)}`, ans);
    }
  }

  if (formula.id === "current-drift-velocity") {
    // I = A n e v
    const I = val("current");
    const A = val("area");
    const n = val("number-density");
    const e = val("charge");
    const v = val("drift-velocity");
    if (missing === "current") {
      const ans = A * n * e * v;
      return makeSteps(eq, symbol, unit, "I = A × n × e × v", `I = ${fNum(A)} × ${fNum(n)} × ${fNum(e)} × ${fNum(v)}`, ans);
    }
    if (missing === "area") {
      const denom = n * e * v;
      if (denom === 0) return { success: false, error: "Denominator cannot be zero." };
      return makeSteps(eq, symbol, unit, "A = I ÷ (n × e × v)", `A = ${fNum(I)} ÷ (${fNum(n)} × ${fNum(e)} × ${fNum(v)})`, I / denom);
    }
    if (missing === "number-density") {
      const denom = A * e * v;
      if (denom === 0) return { success: false, error: "Denominator cannot be zero." };
      return makeSteps(eq, symbol, unit, "n = I ÷ (A × e × v)", `n = ${fNum(I)} ÷ (${fNum(A)} × ${fNum(e)} × ${fNum(v)})`, I / denom);
    }
    if (missing === "charge") {
      const denom = A * n * v;
      if (denom === 0) return { success: false, error: "Denominator cannot be zero." };
      return makeSteps(eq, symbol, unit, "e = I ÷ (A × n × v)", `e = ${fNum(I)} ÷ (${fNum(A)} × ${fNum(n)} × ${fNum(v)})`, I / denom);
    }
    if (missing === "drift-velocity") {
      const denom = A * n * e;
      if (denom === 0) return { success: false, error: "Denominator cannot be zero." };
      return makeSteps(eq, symbol, unit, "v = I ÷ (A × n × e)", `v = ${fNum(I)} ÷ (${fNum(A)} × ${fNum(n)} × ${fNum(e)})`, I / denom);
    }
  }

  if (formula.id === "internal-resistance") {
    // E = I(R + r)
    const E = val("emf");
    const I = val("current");
    const R = val("resistance");
    const r = val("internal-resistance");
    if (missing === "emf") {
      const ans = I * (R + r);
      return makeSteps(eq, symbol, unit, "E = I(R + r)", `E = ${fNum(I)} × (${fNum(R)} + ${fNum(r)})`, ans);
    }
    if (missing === "current") {
      if (R + r === 0) return { success: false, error: "Total resistance (R + r) cannot be zero." };
      const ans = E / (R + r);
      return makeSteps(eq, symbol, unit, "I = E ÷ (R + r)", `I = ${fNum(E)} ÷ (${fNum(R)} + ${fNum(r)})`, ans);
    }
    if (missing === "resistance") {
      if (I === 0) return { success: false, error: "Current cannot be zero." };
      const ans = E / I - r;
      return makeSteps(eq, symbol, unit, "R = (E ÷ I) - r", `R = (${fNum(E)} ÷ ${fNum(I)}) - ${fNum(r)}`, ans);
    }
    if (missing === "internal-resistance") {
      if (I === 0) return { success: false, error: "Current cannot be zero." };
      const ans = E / I - R;
      return makeSteps(eq, symbol, unit, "r = (E ÷ I) - R", `r = (${fNum(E)} ÷ ${fNum(I)}) - ${fNum(R)}`, ans);
    }
  }

  if (formula.id === "terminal-potential-difference") {
    // E = V + Ir
    const E = val("emf");
    const V = val("voltage");
    const I = val("current");
    const r = val("internal-resistance");
    if (missing === "emf") {
      const ans = V + I * r;
      return makeSteps(eq, symbol, unit, "E = V + Ir", `E = ${fNum(V)} + (${fNum(I)} × ${fNum(r)})`, ans);
    }
    if (missing === "voltage") {
      const ans = E - I * r;
      return makeSteps(eq, symbol, unit, "V = E - Ir", `V = ${fNum(E)} - (${fNum(I)} × ${fNum(r)})`, ans);
    }
    if (missing === "current") {
      if (r === 0) return { success: false, error: "Internal resistance cannot be zero." };
      const ans = (E - V) / r;
      return makeSteps(eq, symbol, unit, "I = (E - V) ÷ r", `I = (${fNum(E)} - ${fNum(V)}) ÷ ${fNum(r)}`, ans);
    }
    if (missing === "internal-resistance") {
      if (I === 0) return { success: false, error: "Current cannot be zero." };
      const ans = (E - V) / I;
      return makeSteps(eq, symbol, unit, "r = (E - V) ÷ I", `r = (${fNum(E)} - ${fNum(V)}) ÷ ${fNum(I)}`, ans);
    }
  }

  if (formula.id === "potential-divider") {
    // Vout = (R2 / (R1 + R2)) * Vin
    const Vout = val("output-voltage");
    const R1 = val("resistance-one");
    const R2 = val("resistance-two");
    const Vin = val("input-voltage");
    if (missing === "output-voltage") {
      if (R1 + R2 === 0) return { success: false, error: "R1 + R2 cannot be zero." };
      const ans = (R2 / (R1 + R2)) * Vin;
      return makeSteps(eq, symbol, unit, "Vout = (R₂ ÷ (R₁ + R₂)) × Vin", `Vout = (${fNum(R2)} ÷ (${fNum(R1)} + ${fNum(R2)})) × ${fNum(Vin)}`, ans);
    }
    if (missing === "input-voltage") {
      if (R2 === 0) return { success: false, error: "R2 cannot be zero." };
      const ans = Vout * ((R1 + R2) / R2);
      return makeSteps(eq, symbol, unit, "Vin = Vout × ((R₁ + R₂) ÷ R₂)", `Vin = ${fNum(Vout)} × ((${fNum(R1)} + ${fNum(R2)}) ÷ ${fNum(R2)})`, ans);
    }
    if (missing === "resistance-two") {
      if (Vin === Vout) return { success: false, error: "Vin cannot equal Vout." };
      const ans = (R1 * Vout) / (Vin - Vout);
      return makeSteps(eq, symbol, unit, "R₂ = (R₁ × Vout) ÷ (Vin - Vout)", `R₂ = (${fNum(R1)} × ${fNum(Vout)}) ÷ (${fNum(Vin)} - ${fNum(Vout)})`, ans);
    }
    if (missing === "resistance-one") {
      if (Vout === 0) return { success: false, error: "Vout cannot be zero." };
      const ans = R2 * (Vin / Vout - 1);
      return makeSteps(eq, symbol, unit, "R₁ = R₂ × (Vin ÷ Vout - 1)", `R₁ = ${fNum(R2)} × (${fNum(Vin)} ÷ ${fNum(Vout)} - 1)`, ans);
    }
  }

  if (formula.id === "potential-divider-ratio") {
    // V1 / V2 = R1 / R2
    const V1 = val("voltage-one");
    const V2 = val("voltage-two");
    const R1 = val("resistance-one");
    const R2 = val("resistance-two");
    if (missing === "voltage-one") {
      if (R2 === 0) return { success: false, error: "R2 cannot be zero." };
      const ans = (V2 * R1) / R2;
      return makeSteps(eq, symbol, unit, "V₁ = (V₂ × R₁) ÷ R₂", `V₁ = (${fNum(V2)} × ${fNum(R1)}) ÷ ${fNum(R2)}`, ans);
    }
    if (missing === "voltage-two") {
      if (R1 === 0) return { success: false, error: "R1 cannot be zero." };
      const ans = (V1 * R2) / R1;
      return makeSteps(eq, symbol, unit, "V₂ = (V₁ × R₂) ÷ R₁", `V₂ = (${fNum(V1)} × ${fNum(R2)}) ÷ ${fNum(R1)}`, ans);
    }
    if (missing === "resistance-one") {
      if (V2 === 0) return { success: false, error: "V2 cannot be zero." };
      const ans = (V1 * R2) / V2;
      return makeSteps(eq, symbol, unit, "R₁ = (V₁ × R₂) ÷ V₂", `R₁ = (${fNum(V1)} × ${fNum(R2)}) ÷ ${fNum(V2)}`, ans);
    }
    if (missing === "resistance-two") {
      if (V1 === 0) return { success: false, error: "V1 cannot be zero." };
      const ans = (V2 * R1) / V1;
      return makeSteps(eq, symbol, unit, "R₂ = (V₂ × R₁) ÷ V₁", `R₂ = (${fNum(V2)} × ${fNum(R1)}) ÷ ${fNum(V1)}`, ans);
    }
  }

  if (formula.id === "transformer-equation") {
    // Ns / Np = Vs / Vp
    const Ns = val("secondary-turns");
    const Np = val("primary-turns");
    const Vs = val("secondary-voltage");
    const Vp = val("primary-voltage");
    if (missing === "secondary-turns") {
      if (Vp === 0) return { success: false, error: "Vp cannot be zero." };
      const ans = (Np * Vs) / Vp;
      return makeSteps(eq, symbol, unit, "Ns = (Np × Vs) ÷ Vp", `Ns = (${fNum(Np)} × ${fNum(Vs)}) ÷ ${fNum(Vp)}`, ans);
    }
    if (missing === "primary-turns") {
      if (Vs === 0) return { success: false, error: "Vs cannot be zero." };
      const ans = (Ns * Vp) / Vs;
      return makeSteps(eq, symbol, unit, "Np = (Ns × Vp) ÷ Vs", `Np = (${fNum(Ns)} × ${fNum(Vp)}) ÷ ${fNum(Vs)}`, ans);
    }
    if (missing === "secondary-voltage") {
      if (Np === 0) return { success: false, error: "Np cannot be zero." };
      const ans = (Vp * Ns) / Np;
      return makeSteps(eq, symbol, unit, "Vs = (Vp × Ns) ÷ Np", `Vs = (${fNum(Vp)} × ${fNum(Ns)}) ÷ ${fNum(Np)}`, ans);
    }
    if (missing === "primary-voltage") {
      if (Ns === 0) return { success: false, error: "Ns cannot be zero." };
      const ans = (Vs * Np) / Ns;
      return makeSteps(eq, symbol, unit, "Vp = (Vs × Np) ÷ Ns", `Vp = (${fNum(Vs)} × ${fNum(Np)}) ÷ ${fNum(Ns)}`, ans);
    }
  }

  if (formula.id === "series-resistors" || formula.id === "parallel-capacitors") {
    // R = R1 + R2 (or C = C1 + C2)
    const [total, c1, c2] = formula.variables;
    const vTotal = val(total.id);
    const v1 = val(c1.id);
    const v2 = val(c2.id);
    if (missing === total.id) {
      const ans = v1 + v2;
      return makeSteps(eq, symbol, unit, `${total.symbol} = ${c1.symbol} + ${c2.symbol}`, `${total.symbol} = ${fNum(v1)} + ${fNum(v2)}`, ans);
    }
    if (missing === c1.id) {
      const ans = vTotal - v2;
      return makeSteps(eq, symbol, unit, `${c1.symbol} = ${total.symbol} - ${c2.symbol}`, `${c1.symbol} = ${fNum(vTotal)} - ${fNum(v2)}`, ans);
    }
    if (missing === c2.id) {
      const ans = vTotal - v1;
      return makeSteps(eq, symbol, unit, `${c2.symbol} = ${total.symbol} - ${c1.symbol}`, `${c2.symbol} = ${fNum(vTotal)} - ${fNum(v1)}`, ans);
    }
  }

  if (formula.id === "parallel-resistors" || formula.id === "series-capacitors") {
    // 1/R = 1/R1 + 1/R2 => R = (R1 * R2) / (R1 + R2)
    const [total, c1, c2] = formula.variables;
    const vTotal = val(total.id);
    const v1 = val(c1.id);
    const v2 = val(c2.id);
    if (missing === total.id) {
      if (v1 + v2 === 0) return { success: false, error: "Denominator cannot be zero." };
      const ans = (v1 * v2) / (v1 + v2);
      return makeSteps(eq, symbol, unit, `${total.symbol} = (${c1.symbol} × ${c2.symbol}) ÷ (${c1.symbol} + ${c2.symbol})`, `${total.symbol} = (${fNum(v1)} × ${fNum(v2)}) ÷ (${fNum(v1)} + ${fNum(v2)})`, ans);
    }
    if (missing === c1.id) {
      if (v2 === vTotal) return { success: false, error: "Component cannot equal total." };
      const ans = (vTotal * v2) / (v2 - vTotal);
      return makeSteps(eq, symbol, unit, `${c1.symbol} = (${total.symbol} × ${c2.symbol}) ÷ (${c2.symbol} - ${total.symbol})`, `${c1.symbol} = (${fNum(vTotal)} × ${fNum(v2)}) ÷ (${fNum(v2)} - ${fNum(vTotal)})`, ans);
    }
    if (missing === c2.id) {
      if (v1 === vTotal) return { success: false, error: "Component cannot equal total." };
      const ans = (vTotal * v1) / (v1 - vTotal);
      return makeSteps(eq, symbol, unit, `${c2.symbol} = (${total.symbol} × ${c1.symbol}) ÷ (${c1.symbol} - ${total.symbol})`, `${c2.symbol} = (${fNum(vTotal)} × ${fNum(v1)}) ÷ (${fNum(v1)} - ${fNum(vTotal)})`, ans);
    }
  }

  // ============================================================
  // 11. THERMAL PHYSICS & IDEAL GASES
  // ============================================================
  if (formula.id === "thermal-energy-temperature") {
    // E = m c Δθ
    const E = val("energy");
    const m = val("mass");
    const c = val("specific-heat");
    const deltaTheta = val("temperature-change");
    if (missing === "energy") {
      const ans = m * c * deltaTheta;
      return makeSteps(eq, symbol, unit, "E = mcΔθ", `E = ${fNum(m)} × ${fNum(c)} × ${fNum(deltaTheta)}`, ans);
    }
    if (missing === "mass") {
      if (c * deltaTheta === 0) return { success: false, error: "Denominator cannot be zero." };
      const ans = E / (c * deltaTheta);
      return makeSteps(eq, symbol, unit, "m = E ÷ (cΔθ)", `m = ${fNum(E)} ÷ (${fNum(c)} × ${fNum(deltaTheta)})`, ans);
    }
    if (missing === "specific-heat") {
      if (m * deltaTheta === 0) return { success: false, error: "Denominator cannot be zero." };
      const ans = E / (m * deltaTheta);
      return makeSteps(eq, symbol, unit, "c = E ÷ (mΔθ)", `c = ${fNum(E)} ÷ (${fNum(m)} × ${fNum(deltaTheta)})`, ans);
    }
    if (missing === "temperature-change") {
      if (m * c === 0) return { success: false, error: "Denominator cannot be zero." };
      const ans = E / (m * c);
      return makeSteps(eq, symbol, unit, "Δθ = E ÷ (mc)", `Δθ = ${fNum(E)} ÷ (${fNum(m)} × ${fNum(c)})`, ans);
    }
  }

  if (formula.id === "ideal-gas-particle") {
    // pV = NkT
    const p = val("pressure");
    const V = val("volume");
    const N = val("particles");
    const k = val("boltzmann");
    const T = val("temperature");
    if (missing === "pressure") {
      if (V === 0) return { success: false, error: "Volume cannot be zero." };
      const ans = (N * k * T) / V;
      return makeSteps(eq, symbol, unit, "p = (N × k × T) ÷ V", `p = (${fNum(N)} × ${fNum(k)} × ${fNum(T)}) ÷ ${fNum(V)}`, ans);
    }
    if (missing === "volume") {
      if (p === 0) return { success: false, error: "Pressure cannot be zero." };
      const ans = (N * k * T) / p;
      return makeSteps(eq, symbol, unit, "V = (N × k × T) ÷ p", `V = (${fNum(N)} × ${fNum(k)} × ${fNum(T)}) ÷ ${fNum(p)}`, ans);
    }
    if (missing === "particles") {
      if (k * T === 0) return { success: false, error: "Denominator cannot be zero." };
      const ans = (p * V) / (k * T);
      return makeSteps(eq, symbol, unit, "N = (p × V) ÷ (k × T)", `N = (${fNum(p)} × ${fNum(V)}) ÷ (${fNum(k)} × ${fNum(T)})`, ans);
    }
    if (missing === "boltzmann") {
      if (N * T === 0) return { success: false, error: "Denominator cannot be zero." };
      const ans = (p * V) / (N * T);
      return makeSteps(eq, symbol, unit, "k = (p × V) ÷ (N × T)", `k = (${fNum(p)} × ${fNum(V)}) ÷ (${fNum(N)} × ${fNum(T)})`, ans);
    }
    if (missing === "temperature") {
      if (N * k === 0) return { success: false, error: "Denominator cannot be zero." };
      const ans = (p * V) / (N * k);
      return makeSteps(eq, symbol, unit, "T = (p × V) ÷ (N × k)", `T = (${fNum(p)} × ${fNum(V)}) ÷ (${fNum(N)} × ${fNum(k)})`, ans);
    }
  }

  if (formula.id === "ideal-gas-moles") {
    // pV = nRT
    const p = val("pressure");
    const V = val("volume");
    const n = val("moles");
    const R = val("gas-constant");
    const T = val("temperature");
    if (missing === "pressure") {
      if (V === 0) return { success: false, error: "Volume cannot be zero." };
      const ans = (n * R * T) / V;
      return makeSteps(eq, symbol, unit, "p = (n × R × T) ÷ V", `p = (${fNum(n)} × ${fNum(R)} × ${fNum(T)}) ÷ ${fNum(V)}`, ans);
    }
    if (missing === "volume") {
      if (p === 0) return { success: false, error: "Pressure cannot be zero." };
      const ans = (n * R * T) / p;
      return makeSteps(eq, symbol, unit, "V = (n × R × T) ÷ p", `V = (${fNum(n)} × ${fNum(R)} × ${fNum(T)}) ÷ ${fNum(p)}`, ans);
    }
    if (missing === "moles") {
      if (R * T === 0) return { success: false, error: "Denominator cannot be zero." };
      const ans = (p * V) / (R * T);
      return makeSteps(eq, symbol, unit, "n = (p × V) ÷ (R × T)", `n = (${fNum(p)} × ${fNum(V)}) ÷ (${fNum(R)} × ${fNum(T)})`, ans);
    }
    if (missing === "gas-constant") {
      if (n * T === 0) return { success: false, error: "Denominator cannot be zero." };
      const ans = (p * V) / (n * T);
      return makeSteps(eq, symbol, unit, "R = (p × V) ÷ (n × T)", `R = (${fNum(p)} × ${fNum(V)}) ÷ (${fNum(n)} × ${fNum(T)})`, ans);
    }
    if (missing === "temperature") {
      if (n * R === 0) return { success: false, error: "Denominator cannot be zero." };
      const ans = (p * V) / (n * R);
      return makeSteps(eq, symbol, unit, "T = (p × V) ÷ (n × R)", `T = (${fNum(p)} × ${fNum(V)}) ÷ (${fNum(n)} × ${fNum(R)})`, ans);
    }
  }

  // ============================================================
  // 12. QUANTUM & NUCLEAR
  // ============================================================
  if (formula.id === "photon-energy-wavelength") {
    // E = hc / λ
    const E = val("energy");
    const h = val("planck");
    const c = val("light-speed");
    const lambda = val("wavelength");
    if (missing === "energy") {
      if (lambda === 0) return { success: false, error: "Wavelength cannot be zero." };
      const ans = (h * c) / lambda;
      return makeSteps(eq, symbol, unit, "E = (h × c) ÷ λ", `E = (${fNum(h)} × ${fNum(c)}) ÷ ${fNum(lambda)}`, ans);
    }
    if (missing === "planck") {
      if (c === 0) return { success: false, error: "Speed of light cannot be zero." };
      const ans = (E * lambda) / c;
      return makeSteps(eq, symbol, unit, "h = (E × λ) ÷ c", `h = (${fNum(E)} × ${fNum(lambda)}) ÷ ${fNum(c)}`, ans);
    }
    if (missing === "light-speed") {
      if (h === 0) return { success: false, error: "Planck constant cannot be zero." };
      const ans = (E * lambda) / h;
      return makeSteps(eq, symbol, unit, "c = (E × λ) ÷ h", `c = (${fNum(E)} × ${fNum(lambda)}) ÷ ${fNum(h)}`, ans);
    }
    if (missing === "wavelength") {
      if (E === 0) return { success: false, error: "Energy cannot be zero." };
      const ans = (h * c) / E;
      return makeSteps(eq, symbol, unit, "λ = (h × c) ÷ E", `λ = (${fNum(h)} × ${fNum(c)}) ÷ ${fNum(E)}`, ans);
    }
  }

  if (formula.id === "photoelectric-equation") {
    // hf = φ + KEmax
    const f = val("frequency");
    const h = val("planck");
    const phi = val("work-function");
    const ke = val("kinetic-energy");
    if (missing === "frequency") {
      if (h === 0) return { success: false, error: "Planck constant cannot be zero." };
      const ans = (phi + ke) / h;
      return makeSteps(eq, symbol, unit, "f = (φ + KEmax) ÷ h", `f = (${fNum(phi)} + ${fNum(ke)}) ÷ ${fNum(h)}`, ans);
    }
    if (missing === "planck") {
      if (f === 0) return { success: false, error: "Frequency cannot be zero." };
      const ans = (phi + ke) / f;
      return makeSteps(eq, symbol, unit, "h = (φ + KEmax) ÷ f", `h = (${fNum(phi)} + ${fNum(ke)}) ÷ ${fNum(f)}`, ans);
    }
    if (missing === "work-function") {
      const ans = h * f - ke;
      return makeSteps(eq, symbol, unit, "φ = hf - KEmax", `φ = (${fNum(h)} × ${fNum(f)}) - ${fNum(ke)}`, ans);
    }
    if (missing === "kinetic-energy") {
      const ans = h * f - phi;
      return makeSteps(eq, symbol, unit, "KEmax = hf - φ", `KEmax = (${fNum(h)} × ${fNum(f)}) - ${fNum(phi)}`, ans);
    }
  }

  if (formula.id === "photon-energy-transition") {
    // hf = ΔE
    const h = val("planck");
    const f = val("frequency");
    const deltaE = val("energy-change");
    if (missing === "energy-change") {
      const ans = h * f;
      return makeSteps(eq, symbol, unit, "ΔE = h × f", `ΔE = ${fNum(h)} × ${fNum(f)}`, ans);
    }
    if (missing === "frequency") {
      if (h === 0) return { success: false, error: "Planck constant cannot be zero." };
      const ans = deltaE / h;
      return makeSteps(eq, symbol, unit, "f = ΔE ÷ h", `f = ${fNum(deltaE)} ÷ ${fNum(h)}`, ans);
    }
    if (missing === "planck") {
      if (f === 0) return { success: false, error: "Frequency cannot be zero." };
      const ans = deltaE / f;
      return makeSteps(eq, symbol, unit, "h = ΔE ÷ f", `h = ${fNum(deltaE)} ÷ ${fNum(f)}`, ans);
    }
  }

  if (formula.id === "nuclear-radius") {
    // R = r0 * A^(1/3)
    const R = val("radius");
    const r0 = val("constant");
    const A = val("mass-number");
    if (missing === "radius") {
      const ans = r0 * Math.cbrt(A);
      return makeSteps(eq, symbol, unit, "R = r₀ × A^(⅓)", `R = ${fNum(r0)} × (${fNum(A)})^(⅓)`, ans);
    }
    if (missing === "constant") {
      const cbrtA = Math.cbrt(A);
      if (cbrtA === 0) return { success: false, error: "Mass number cannot be zero." };
      const ans = R / cbrtA;
      return makeSteps(eq, symbol, unit, "r₀ = R ÷ A^(⅓)", `r₀ = ${fNum(R)} ÷ (${fNum(A)})^(⅓)`, ans);
    }
    if (missing === "mass-number") {
      if (r0 === 0) return { success: false, error: "r₀ cannot be zero." };
      const ans = Math.pow(R / r0, 3);
      return makeSteps(eq, symbol, unit, "A = (R ÷ r₀)³", `A = (${fNum(R)} ÷ ${fNum(r0)})³`, ans);
    }
  }

  if (
    formula.id === "radioactive-activity-decay" ||
    formula.id === "radioactive-nuclei-decay" ||
    formula.id === "xray-attenuation"
  ) {
    // Y = Y0 * e^(-k * x)
    const [finalVar, initVar, rateVar, timeVar] = formula.variables;
    const Y = val(finalVar.id);
    const Y0 = val(initVar.id);
    const k = val(rateVar.id);
    const x = val(timeVar.id);

    if (missing === finalVar.id) {
      const ans = Y0 * Math.exp(-k * x);
      return makeSteps(
        eq,
        symbol,
        unit,
        `${finalVar.symbol} = ${initVar.symbol} × e^(-${rateVar.symbol} × ${timeVar.symbol})`,
        `${finalVar.symbol} = ${fNum(Y0)} × e^(-${fNum(k)} × ${fNum(x)})`,
        ans
      );
    }
    if (missing === initVar.id) {
      const ans = Y * Math.exp(k * x);
      return makeSteps(
        eq,
        symbol,
        unit,
        `${initVar.symbol} = ${finalVar.symbol} × e^(${rateVar.symbol} × ${timeVar.symbol})`,
        `${initVar.symbol} = ${fNum(Y)} × e^(${fNum(k)} × ${fNum(x)})`,
        ans
      );
    }
    if (missing === rateVar.id) {
      if (x === 0) return { success: false, error: "Time / thickness cannot be zero." };
      if (Y <= 0 || Y0 <= 0) return { success: false, error: "Initial and final values must be positive." };
      const ans = -Math.log(Y / Y0) / x;
      return makeSteps(
        eq,
        symbol,
        unit,
        `${rateVar.symbol} = -ln(${finalVar.symbol} ÷ ${initVar.symbol}) ÷ ${timeVar.symbol}`,
        `${rateVar.symbol} = -ln(${fNum(Y)} ÷ ${fNum(Y0)}) ÷ ${fNum(x)}`,
        ans
      );
    }
    if (missing === timeVar.id) {
      if (k === 0) return { success: false, error: "Decay / attenuation constant cannot be zero." };
      if (Y <= 0 || Y0 <= 0) return { success: false, error: "Initial and final values must be positive." };
      const ans = -Math.log(Y / Y0) / k;
      return makeSteps(
        eq,
        symbol,
        unit,
        `${timeVar.symbol} = -ln(${finalVar.symbol} ÷ ${initVar.symbol}) ÷ ${rateVar.symbol}`,
        `${timeVar.symbol} = -ln(${fNum(Y)} ÷ ${fNum(Y0)}) ÷ ${fNum(k)}`,
        ans
      );
    }
  }

  // ============================================================
  // 13. WAVES, FLUIDS & ADDITIONAL FORMULAS
  // ============================================================
  if (formula.id === "force-rate-of-change-momentum") {
    // F = Δp / Δt
    const F = val("force");
    const deltaP = val("change-momentum");
    const deltaT = val("time");

    if (missing === "force") {
      if (deltaT === 0) return { success: false, error: "Time interval cannot be zero." };
      const ans = deltaP / deltaT;
      return makeSteps(eq, symbol, unit, "F = Δp ÷ Δt", `F = ${fNum(deltaP)} ÷ ${fNum(deltaT)}`, ans);
    }
    if (missing === "change-momentum") {
      const ans = F * deltaT;
      return makeSteps(eq, symbol, unit, "Δp = F × Δt", `Δp = ${fNum(F)} × ${fNum(deltaT)}`, ans);
    }
    if (missing === "time") {
      if (F === 0) return { success: false, error: "Force cannot be zero." };
      const ans = deltaP / F;
      return makeSteps(eq, symbol, unit, "Δt = Δp ÷ F", `Δt = ${fNum(deltaP)} ÷ ${fNum(F)}`, ans);
    }
  }

  if (formula.id === "decay-rate") {
    // ΔN / Δt = λN  (magnitude of decay rate)
    const deltaN = Math.abs(val("change-nuclei"));
    const deltaT = val("time");
    const lambda = val("decay-constant");
    const N = val("nuclei");

    if (missing === "change-nuclei") {
      const ans = lambda * N * deltaT;
      return makeSteps(eq, symbol, unit, "ΔN = λ × N × Δt", `ΔN = ${fNum(lambda)} × ${fNum(N)} × ${fNum(deltaT)}`, ans);
    }
    if (missing === "time") {
      const denom = lambda * N;
      if (denom === 0) return { success: false, error: "Denominator (λN) cannot be zero." };
      const ans = deltaN / denom;
      return makeSteps(eq, symbol, unit, "Δt = ΔN ÷ (λ × N)", `Δt = ${fNum(deltaN)} ÷ (${fNum(lambda)} × ${fNum(N)})`, ans);
    }
    if (missing === "decay-constant") {
      const denom = N * deltaT;
      if (denom === 0) return { success: false, error: "Denominator (NΔt) cannot be zero." };
      const ans = deltaN / denom;
      return makeSteps(eq, symbol, unit, "λ = ΔN ÷ (N × Δt)", `λ = ${fNum(deltaN)} ÷ (${fNum(N)} × ${fNum(deltaT)})`, ans);
    }
    if (missing === "nuclei") {
      const denom = lambda * deltaT;
      if (denom === 0) return { success: false, error: "Denominator (λΔt) cannot be zero." };
      const ans = deltaN / denom;
      return makeSteps(eq, symbol, unit, "N = ΔN ÷ (λ × Δt)", `N = ${fNum(deltaN)} ÷ (${fNum(lambda)} × ${fNum(deltaT)})`, ans);
    }
  }

  if (formula.id === "pressure-depth") {
    // p = h * ρ * g
    const p = val("pressure");
    const h = val("height");
    const rho = val("density");
    const g = val("gravity");
    if (missing === "pressure") {
      const ans = h * rho * g;
      return makeSteps(eq, symbol, unit, "p = h × ρ × g", `p = ${fNum(h)} × ${fNum(rho)} × ${fNum(g)}`, ans);
    }
    if (missing === "height") {
      const denom = rho * g;
      if (denom === 0) return { success: false, error: "Denominator cannot be zero." };
      return makeSteps(eq, symbol, unit, "h = p ÷ (ρ × g)", `h = ${fNum(p)} ÷ (${fNum(rho)} × ${fNum(g)})`, p / denom);
    }
    if (missing === "density") {
      const denom = h * g;
      if (denom === 0) return { success: false, error: "Denominator cannot be zero." };
      return makeSteps(eq, symbol, unit, "ρ = p ÷ (h × g)", `ρ = ${fNum(p)} ÷ (${fNum(h)} × ${fNum(g)})`, p / denom);
    }
    if (missing === "gravity") {
      const denom = h * rho;
      if (denom === 0) return { success: false, error: "Denominator cannot be zero." };
      return makeSteps(eq, symbol, unit, "g = p ÷ (h × ρ)", `g = ${fNum(p)} ÷ (${fNum(h)} × ${fNum(rho)})`, p / denom);
    }
  }

  if (formula.id === "young-double-slit") {
    // λ = ax / D
    const lambda = val("wavelength");
    const a = val("slit-separation");
    const x = val("fringe-separation");
    const D = val("distance");
    if (missing === "wavelength") {
      if (D === 0) return { success: false, error: "Distance D cannot be zero." };
      const ans = (a * x) / D;
      return makeSteps(eq, symbol, unit, "λ = (a × x) ÷ D", `λ = (${fNum(a)} × ${fNum(x)}) ÷ ${fNum(D)}`, ans);
    }
    if (missing === "slit-separation") {
      if (x === 0) return { success: false, error: "Fringe separation x cannot be zero." };
      const ans = (lambda * D) / x;
      return makeSteps(eq, symbol, unit, "a = (λ × D) ÷ x", `a = (${fNum(lambda)} × ${fNum(D)}) ÷ ${fNum(x)}`, ans);
    }
    if (missing === "fringe-separation") {
      if (a === 0) return { success: false, error: "Slit separation a cannot be zero." };
      const ans = (lambda * D) / a;
      return makeSteps(eq, symbol, unit, "x = (λ × D) ÷ a", `x = (${fNum(lambda)} × ${fNum(D)}) ÷ ${fNum(a)}`, ans);
    }
    if (missing === "distance") {
      if (lambda === 0) return { success: false, error: "Wavelength cannot be zero." };
      const ans = (a * x) / lambda;
      return makeSteps(eq, symbol, unit, "D = (a × x) ÷ λ", `D = (${fNum(a)} × ${fNum(x)}) ÷ ${fNum(lambda)}`, ans);
    }
  }

  if (formula.id === "magnetic-force-charge") {
    // F = B Q v
    const F = val("force");
    const B = val("magnetic-field");
    const Q = val("charge");
    const v = val("velocity");
    if (missing === "force") {
      const ans = B * Q * v;
      return makeSteps(eq, symbol, unit, "F = B × Q × v", `F = ${fNum(B)} × ${fNum(Q)} × ${fNum(v)}`, ans);
    }
    if (missing === "magnetic-field") {
      const denom = Q * v;
      if (denom === 0) return { success: false, error: "Denominator cannot be zero." };
      return makeSteps(eq, symbol, unit, "B = F ÷ (Q × v)", `B = ${fNum(F)} ÷ (${fNum(Q)} × ${fNum(v)})`, F / denom);
    }
    if (missing === "charge") {
      const denom = B * v;
      if (denom === 0) return { success: false, error: "Denominator cannot be zero." };
      return makeSteps(eq, symbol, unit, "Q = F ÷ (B × v)", `Q = ${fNum(F)} ÷ (${fNum(B)} × ${fNum(v)})`, F / denom);
    }
    if (missing === "velocity") {
      const denom = B * Q;
      if (denom === 0) return { success: false, error: "Denominator cannot be zero." };
      return makeSteps(eq, symbol, unit, "v = F ÷ (B × Q)", `v = ${fNum(F)} ÷ (${fNum(B)} × ${fNum(Q)})`, F / denom);
    }
  }

  if (formula.id === "efficiency") {
    // η = (Euseful / Etotal) * 100
    const eta = val("efficiency");
    const useful = val("useful-energy");
    const total = val("total-energy");
    if (missing === "efficiency") {
      if (total === 0) return { success: false, error: "Total energy cannot be zero." };
      const ans = (useful / total) * 100;
      return makeSteps(eq, symbol, unit, "η = (Euseful ÷ Etotal) × 100", `η = (${fNum(useful)} ÷ ${fNum(total)}) × 100`, ans);
    }
    if (missing === "useful-energy") {
      const ans = (eta * total) / 100;
      return makeSteps(eq, symbol, unit, "Euseful = (η × Etotal) ÷ 100", `Euseful = (${fNum(eta)} × ${fNum(total)}) ÷ 100`, ans);
    }
    if (missing === "total-energy") {
      if (eta === 0) return { success: false, error: "Efficiency cannot be zero." };
      const ans = (useful * 100) / eta;
      return makeSteps(eq, symbol, unit, "Etotal = (Euseful × 100) ÷ η", `Etotal = (${fNum(useful)} × 100) ÷ ${fNum(eta)}`, ans);
    }
  }

  // ============================================================
  // STEM PLATFORM STARTER SOLVERS
  // ============================================================
  if (formula.id === "quadratic-formula") {
    const a = val("a");
    const b = val("b");
    const c = val("c");
    if (a === 0) return { success: false, error: "Coefficient 'a' cannot be zero for a quadratic equation (must be non-zero)." };
    const disc = b * b - 4 * a * c;

    if (disc > 0) {
      const sqrtDisc = Math.sqrt(disc);
      const r1 = (-b + sqrtDisc) / (2 * a);
      const r2 = (-b - sqrtDisc) / (2 * a);
      return {
        success: true,
        answer: r1,
        formattedAnswer: `x₁ = ${fNum(r1)}, x₂ = ${fNum(r2)}`,
        variableSymbol: "x",
        unit: "",
        steps: [
          `1. Formula: ${eq}`,
          `2. Discriminant: \\Delta = b^2 - 4ac = (${fNum(b)})^2 - 4(${fNum(a)})(${fNum(c)}) = ${fNum(disc)}`,
          `3. Substitute: x = \\frac{-(${fNum(b)}) \\pm \\sqrt{${fNum(disc)}}}{2(${fNum(a)})}`,
          `4. Answer: x_1 = ${fNum(r1)}, \\quad x_2 = ${fNum(r2)} \\quad (\\text{Two real roots})`,
        ],
      };
    } else if (disc === 0) {
      const r = -b / (2 * a);
      return {
        success: true,
        answer: r,
        formattedAnswer: `x = ${fNum(r)} (repeated root)`,
        variableSymbol: "x",
        unit: "",
        steps: [
          `1. Formula: ${eq}`,
          `2. Discriminant: \\Delta = b^2 - 4ac = 0`,
          `3. Substitute: x = \\frac{-(${fNum(b)})}{2(${fNum(a)})}`,
          `4. Answer: x = ${fNum(r)} \\quad (\\text{One repeated real root})`,
        ],
      };
    } else {
      const realPart = -b / (2 * a);
      const imagPart = Math.sqrt(-disc) / (2 * a);
      return {
        success: true,
        answer: realPart,
        formattedAnswer: `${fNum(realPart)} ± ${fNum(imagPart)}i`,
        variableSymbol: "x",
        unit: "",
        steps: [
          `1. Formula: ${eq}`,
          `2. Discriminant: \\Delta = b^2 - 4ac = ${fNum(disc)} < 0`,
          `3. Substitute: x = \\frac{-(${fNum(b)}) \\pm i\\sqrt{${fNum(-disc)}}}{2(${fNum(a)})}`,
          `4. Answer: x = ${fNum(realPart)} \\pm ${fNum(imagPart)}i \\quad (\\text{Complex conjugate roots})`,
        ],
      };
    }
  }

  if (formula.id === "pythagorean-theorem") {
    const c = val("c");
    const a = val("a");
    const b = val("b");
    if (missing === "c") {
      const ans = Math.sqrt(a * a + b * b);
      return makeSteps(eq, symbol, unit, "c = \\sqrt{a^2 + b^2}", `c = \\sqrt{(${fNum(a)})^2 + (${fNum(b)})^2}`, ans);
    }
    if (missing === "a") {
      if (c <= b) return { success: false, error: "Hypotenuse c must be strictly greater than leg b." };
      const ans = Math.sqrt(c * c - b * b);
      return makeSteps(eq, symbol, unit, "a = \\sqrt{c^2 - b^2}", `a = \\sqrt{(${fNum(c)})^2 - (${fNum(b)})^2}`, ans);
    }
    if (missing === "b") {
      if (c <= a) return { success: false, error: "Hypotenuse c must be strictly greater than leg a." };
      const ans = Math.sqrt(c * c - a * a);
      return makeSteps(eq, symbol, unit, "b = \\sqrt{c^2 - a^2}", `b = \\sqrt{(${fNum(c)})^2 - (${fNum(a)})^2}`, ans);
    }
  }

  if (formula.id === "vector-2d-dot-product") {
    const ax = val("ax");
    const ay = val("ay");
    const bx = val("bx");
    const by = val("by");
    const dot = ax * bx + ay * by;
    const magA = Math.sqrt(ax * ax + ay * ay);
    const magB = Math.sqrt(bx * bx + by * by);
    let angleStr = "";
    if (magA > 0 && magB > 0) {
      const cosTheta = Math.max(-1, Math.min(1, dot / (magA * magB)));
      const thetaDeg = (Math.acos(cosTheta) * 180) / Math.PI;
      angleStr = ` (Angle \\theta = ${fNum(thetaDeg)}^\\circ)`;
    }
    return {
      success: true,
      answer: dot,
      formattedAnswer: `${fNum(dot)}${angleStr}`,
      variableSymbol: "a · b",
      unit: "",
      steps: [
        `1. Formula: ${eq}`,
        `2. Substitute: \\mathbf{a} \\cdot \\mathbf{b} = (${fNum(ax)})(${fNum(bx)}) + (${fNum(ay)})(${fNum(by)})`,
        `3. Magnitudes: |\\mathbf{a}| = ${fNum(magA)}, \\quad |\\mathbf{b}| = ${fNum(magB)}`,
        `4. Answer: \\mathbf{a} \\cdot \\mathbf{b} = ${fNum(dot)}${angleStr}`,
      ],
    };
  }

  if (formula.id === "solution-dilution") {
    const c1 = val("c1");
    const v1 = val("v1");
    const c2 = val("c2");
    const v2 = val("v2");
    if (missing === "c2") {
      if (v2 === 0) return { success: false, error: "Final volume V2 cannot be zero." };
      const ans = (c1 * v1) / v2;
      return makeSteps(eq, symbol, unit, "C_2 = (C_1 \\times V_1) \\div V_2", `C_2 = (${fNum(c1)} \\times ${fNum(v1)}) \\div ${fNum(v2)}`, ans);
    }
    if (missing === "v2") {
      if (c2 === 0) return { success: false, error: "Final concentration C2 cannot be zero." };
      const ans = (c1 * v1) / c2;
      return makeSteps(eq, symbol, unit, "V_2 = (C_1 \\times V_1) \\div C_2", `V_2 = (${fNum(c1)} \\times ${fNum(v1)}) \\div ${fNum(c2)}`, ans);
    }
    if (missing === "c1") {
      if (v1 === 0) return { success: false, error: "Initial volume V1 cannot be zero." };
      const ans = (c2 * v2) / v1;
      return makeSteps(eq, symbol, unit, "C_1 = (C_2 \\times V_2) \\div V_1", `C_1 = (${fNum(c2)} \\times ${fNum(v2)}) \\div ${fNum(v1)}`, ans);
    }
    if (missing === "v1") {
      if (c1 === 0) return { success: false, error: "Initial concentration C1 cannot be zero." };
      const ans = (c2 * v2) / c1;
      return makeSteps(eq, symbol, unit, "V_1 = (C_2 \\times V_2) \\div C_1", `V_1 = (${fNum(c2)} \\times ${fNum(v2)}) \\div ${fNum(c1)}`, ans);
    }
  }

  if (formula.id === "ph-concentration") {
    const ph = val("ph");
    const hConc = val("h-conc");
    if (missing === "ph") {
      if (hConc <= 0) return { success: false, error: "Hydrogen ion concentration must be strictly positive (> 0)." };
      const ans = -Math.log10(hConc);
      return makeSteps(eq, symbol, unit, "\\text{pH} = -\\log_{10}[\\text{H}^+]", `\\text{pH} = -\\log_{10}(${fNum(hConc)})`, ans);
    }
    if (missing === "h-conc") {
      const ans = Math.pow(10, -ph);
      return makeSteps(eq, symbol, unit, "[\\text{H}^+] = 10^{-\\text{pH}}", `[\\text{H}^+] = 10^{-${fNum(ph)}}`, ans);
    }
  }

  if (formula.id === "calorimetry-heat-energy") {
    const q = val("heat");
    const m = val("mass");
    const c = val("specific-heat");
    const deltaT = val("temp-change");
    if (missing === "heat") {
      const ans = m * c * deltaT;
      return makeSteps(eq, symbol, unit, "q = m \\times c \\times \\Delta T", `q = ${fNum(m)} \\times ${fNum(c)} \\times ${fNum(deltaT)}`, ans);
    }
    if (missing === "mass") {
      const denom = c * deltaT;
      if (denom === 0) return { success: false, error: "Denominator (c × ΔT) cannot be zero." };
      const ans = q / denom;
      return makeSteps(eq, symbol, unit, "m = q \\div (c \\times \\Delta T)", `m = ${fNum(q)} \\div (${fNum(c)} \\times ${fNum(deltaT)})`, ans);
    }
    if (missing === "specific-heat") {
      const denom = m * deltaT;
      if (denom === 0) return { success: false, error: "Denominator (m × ΔT) cannot be zero." };
      const ans = q / denom;
      return makeSteps(eq, symbol, unit, "c = q \\div (m \\times \\Delta T)", `c = ${fNum(q)} \\div (${fNum(m)} \\times ${fNum(deltaT)})`, ans);
    }
    if (missing === "temp-change") {
      const denom = m * c;
      if (denom === 0) return { success: false, error: "Denominator (m × c) cannot be zero." };
      const ans = q / denom;
      return makeSteps(eq, symbol, unit, "\\Delta T = q \\div (m \\times c)", `\\Delta T = ${fNum(q)} \\div (${fNum(m)} \\times ${fNum(c)})`, ans);
    }
  }

  if (formula.id === "data-transfer-time") {
    const t = val("time");
    const D = val("size");
    const R = val("speed");
    if (missing === "time") {
      if (R <= 0) return { success: false, error: "Network speed must be greater than 0 Mbps." };
      const ans = (D * 8) / R;
      return makeSteps(eq, symbol, unit, "t = (D \\text{ MB} \\times 8) \\div R \\text{ Mbps}", `t = (${fNum(D)} \\times 8) \\div ${fNum(R)}`, ans);
    }
    if (missing === "size") {
      const ans = (t * R) / 8;
      return makeSteps(eq, symbol, unit, "D = (t \\times R) \\div 8", `D = (${fNum(t)} \\times ${fNum(R)}) \\div 8`, ans);
    }
    if (missing === "speed") {
      if (t <= 0) return { success: false, error: "Time must be greater than 0 seconds." };
      const ans = (D * 8) / t;
      return makeSteps(eq, symbol, unit, "R = (D \\times 8) \\div t", `R = (${fNum(D)} \\times 8) \\div ${fNum(t)}`, ans);
    }
  }

  return {
    success: false,
    error: "Calculation not available for this formula configuration.",
  };
}

