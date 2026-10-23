import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parseMathExpression, isValidMathExpression } from "../src/utils/mathParser";
import { calculateFormula } from "../src/utils/calculator";
import { formulas } from "../src/data/formulas";

describe("Priority 1: Standard-Form and Mathematical Input Parser", () => {
  describe("Required input formats & numerical values", () => {
    const testCases: [string, number][] = [
      ["1*10^-2", 0.01],
      ["1 × 10^-2", 0.01],
      ["1e-2", 0.01],
      ["1E-2", 0.01],
      ["6.02*10^23", 6.02e23],
      ["3.5*10^6", 3500000],
      ["1.60e-19", 1.6e-19],
      ["10^-3", 0.001],
      ["10^3", 1000],
      ["2^3", 8],
      ["2^-3", 0.125],
      // Decimals and integers
      ["42", 42],
      ["-7", -7],
      ["0", 0],
      ["0.05", 0.05],
      [".5", 0.5],
      // Decimal coefficients with powers
      ["1.25 * 10^3", 1250],
      ["-2.5 * 10^-3", -0.0025],
      ["0.004 * 10^5", 400],
      // Multiplication variants
      ["1 x 10^-2", 0.01],
      ["1X10^-2", 0.01],
      ["1.5 × 10^4", 15000],
      ["2.0 · 10^3", 2000],
      // Unicode superscripts
      ["10⁻³", 0.001],
      ["10²³", 1e23],
      ["6.02 × 10²³", 6.02e23],
      // Unicode minus
      ["−0.05", -0.05],
      ["1*10^−2", 0.01],
      // Whitespace
      ["   1*10^-2   ", 0.01],
      [" 3.5 * 10^6 ", 3500000],
      // Expressions with parentheses and arithmetic
      ["(1 + 2) * 10^3", 3000],
      ["-(2^3)", -8],
      ["2 * (3 + 4)", 14],
      ["(1.60e-19) * (10^18)", 0.16],
      ["10(2)", 20],
      ["(2)(3)", 6],
    ];

    for (const [input, expected] of testCases) {
      it(`correctly parses '${input}' to ${expected}`, () => {
        const result = parseMathExpression(input);
        assert.equal(result.success, true, `Failed to parse '${input}': ${!result.success ? result.error : ""}`);
        if (result.success) {
          const relDiff = Math.abs(result.value - expected) / (Math.abs(expected) || 1);
          assert.ok(
            relDiff < 1e-12 || Math.abs(result.value - expected) < 1e-14,
            `Expected ${expected}, got ${result.value} for '${input}'`
          );
        }
      });
    }
  });

  describe("Invalid, incomplete and malformed expressions", () => {
    const invalidCases: [string, string][] = [
      ["", "empty"],
      ["   ", "empty"],
      ["1*10^", "Unexpected end of expression"],
      ["1**10", "Unexpected token"],
      ["1/0", "Cannot divide by zero"],
      ["1.2.3", "multiple decimal points"],
      ["(1+2", "Missing closing parenthesis"],
      ["1+2)", "Unexpected token"],
      ["abc", "Unexpected character"],
      ["10^^2", "Unexpected token"],
      ["0^-2", "Cannot divide by zero"],
      ["(-4)^0.5", "Complex number result"],
    ];

    for (const [input, expectedSubstring] of invalidCases) {
      it(`rejects malformed input '${input}'`, () => {
        const result = parseMathExpression(input);
        assert.equal(result.success, false, `Expected '${input}' to fail, but succeeded with value ${result.success ? result.value : ""}`);
        if (!result.success) {
          assert.ok(
            result.error.toLowerCase().includes(expectedSubstring.toLowerCase()),
            `Expected error to contain '${expectedSubstring}', got '${result.error}'`
          );
        }
      });
    }

    it("isValidMathExpression returns false for invalid input", () => {
      assert.equal(isValidMathExpression("1*10^"), false);
      assert.equal(isValidMathExpression(""), false);
      assert.equal(isValidMathExpression("invalid"), false);
    });

    it("isValidMathExpression returns true for valid input", () => {
      assert.equal(isValidMathExpression("1*10^-2"), true);
      assert.equal(isValidMathExpression("6.02e23"), true);
      assert.equal(isValidMathExpression("3.5*10^6"), true);
    });
  });

  describe("Real Calculator Regression Tests (Using Shared Parser)", () => {
    it("Calculator 1: Kinetic Energy (Ek = 0.5 * m * v^2) with standard-form inputs", () => {
      const formula = formulas.find((f) => f.id === "kinetic-energy")!;
      assert.ok(formula, "Kinetic energy formula must exist");

      // Test 1: mass in standard form 1*10^-2 kg (0.01 kg), velocity 10 m/s => Ek = 0.5 * 0.01 * 100 = 0.5 J
      const res1 = calculateFormula(formula, {
        energy: "",
        mass: "1*10^-2",
        velocity: "10",
      });
      assert.equal(res1.success, true, res1.success ? "" : res1.error);
      if (res1.success) {
        assert.equal(res1.answer, 0.5);
        assert.equal(res1.formattedAnswer, "0.5");
        assert.equal(res1.unit, "J");
      }

      // Test 2: electron mass 9.11e-31 kg, speed of light 3.0*10^6 m/s
      // Ek = 0.5 * 9.11e-31 * 9e12 = 4.0995e-18 J
      const res2 = calculateFormula(formula, {
        energy: "",
        mass: "9.11*10^-31",
        velocity: "3.0*10^6",
      });
      assert.equal(res2.success, true, res2.success ? "" : res2.error);
      if (res2.success) {
        const expected = 0.5 * 9.11e-31 * 9e12;
        assert.ok(Math.abs(res2.answer - expected) / expected < 1e-10);
      }
    });

    it("Calculator 2: Ohm's Law (V = I * R) with scientific notation and milli/kilo inputs", () => {
      const formula = formulas.find((f) => f.id === "ohms-law")!;
      assert.ok(formula, "Ohm's law formula must exist");

      // Current = 2.5*10^-3 A (2.5 mA), Resistance = 4.7*10^3 Ω (4.7 kΩ) => V = 11.75 V
      const res = calculateFormula(formula, {
        voltage: "",
        current: "2.5*10^-3",
        resistance: "4.7*10^3",
      });
      assert.equal(res.success, true, res.success ? "" : res.error);
      if (res.success) {
        assert.equal(res.answer, 11.75);
        assert.equal(res.formattedAnswer, "11.75");
        assert.equal(res.unit, "V");
      }
    });

    it("Calculator 3: Photon Energy (E = h * f) with standard form", () => {
      const formula = formulas.find((f) => f.id === "photon-energy-frequency")!;
      assert.ok(formula, "Photon energy formula must exist");

      // h = 6.63*10^-34 J s, f = 5.0*10^14 Hz => E = 3.315*10^-19 J
      const res = calculateFormula(formula, {
        energy: "",
        planck: "6.63*10^-34",
        frequency: "5.0*10^14",
      });
      assert.equal(res.success, true, res.success ? "" : res.error);
      if (res.success) {
        assert.ok(Math.abs(res.answer - 3.315e-19) < 1e-25);
      }
    });

    it("Calculator 4: Gravitational Force / Field Strength with powers", () => {
      const formula = formulas.find((f) => f.id === "charge")!;
      assert.ok(formula, "Charge formula Q = I * t must exist");

      // Current 1.60e-19 A, Time 10^3 s => Q = 1.60e-16 C
      const res = calculateFormula(formula, {
        charge: "",
        current: "1.60e-19",
        time: "10^3",
      });
      assert.equal(res.success, true, res.success ? "" : res.error);
      if (res.success) {
        assert.ok(Math.abs(res.answer - 1.6e-16) < 1e-22);
      }
    });

    it("Rejects malformed input inside calculateFormula with clear error message", () => {
      const formula = formulas.find((f) => f.id === "kinetic-energy")!;
      const res = calculateFormula(formula, {
        energy: "",
        mass: "1*10^",
        velocity: "10",
      });
      assert.equal(res.success, false);
      if (!res.success) {
        assert.ok(res.error.includes("Invalid number entered for Mass (m)"));
        assert.ok(res.error.includes("Unexpected end of expression"));
      }
    });

    it("Fix verification: Lens Power P = 1/f handles both 2-variable directions without crashing", () => {
      const formula = formulas.find((f) => f.id === "lens-power")!;
      assert.ok(formula, "Lens power formula must exist");

      // Direction 1: Solve for power P from focal length 0.2 m => P = 5 D
      const resP = calculateFormula(formula, {
        power: "",
        "focal-length": "0.2",
      });
      assert.equal(resP.success, true);
      if (resP.success) {
        assert.equal(resP.answer, 5);
        assert.equal(resP.unit, "D");
      }

      // Direction 2: Solve for focal length f from lens power 2.5 D => f = 0.4 m
      const resF = calculateFormula(formula, {
        power: "2.5",
        "focal-length": "",
      });
      assert.equal(resF.success, true);
      if (resF.success) {
        assert.equal(resF.answer, 0.4);
        assert.equal(resF.unit, "m");
      }
    });

    it("Fix verification: Kinetic Theory Gas Pressure solves for particles N and molecular-mass m", () => {
      const formula = formulas.find((f) => f.id === "kinetic-theory-pressure")!;
      assert.ok(formula, "Kinetic theory pressure formula must exist");

      // p = 101325 Pa, V = 0.02 m³, c² = 2.5e5 m²/s², m = 4.65e-26 kg
      // N = 3pV / (m c²)
      const resN = calculateFormula(formula, {
        pressure: "101325",
        volume: "0.02",
        particles: "",
        "molecular-mass": "4.65e-26",
        "mean-square-speed": "2.5e5",
      });
      assert.equal(resN.success, true);
      if (resN.success) {
        const expectedN = (3 * 101325 * 0.02) / (4.65e-26 * 2.5e5);
        assert.ok(Math.abs(resN.answer - expectedN) / expectedN < 1e-10);
      }

      // Solve for m given N = 5.23e23
      const resM = calculateFormula(formula, {
        pressure: "101325",
        volume: "0.02",
        particles: "5.23e23",
        "molecular-mass": "",
        "mean-square-speed": "2.5e5",
      });
      assert.equal(resM.success, true);
      if (resM.success) {
        const expectedM = (3 * 101325 * 0.02) / (5.23e23 * 2.5e5);
        assert.ok(Math.abs(resM.answer - expectedM) / expectedM < 1e-10);
      }
    });

    it("Fix verification: Capacitor Charging solves for resistance R and capacitance C", () => {
      const formula = formulas.find((f) => f.id === "capacitor-charging-exponential")!;
      assert.ok(formula, "Capacitor charging formula must exist");

      // Q0 = 0.001 C, t = 0.05 s, C = 1e-4 F, R = 1000 Ω
      // Q = Q0 * (1 - exp(-0.05 / 0.1)) = 0.001 * (1 - exp(-0.5)) ≈ 0.000393469 C
      const Qval = (0.001 * (1 - Math.exp(-0.05 / 0.1))).toString();

      // Solve for R
      const resR = calculateFormula(formula, {
        charge: Qval,
        "max-charge": "0.001",
        time: "0.05",
        resistance: "",
        capacitance: "1e-4",
      });
      assert.equal(resR.success, true);
      if (resR.success) {
        assert.ok(Math.abs(resR.answer - 1000) < 0.01);
      }

      // Solve for C
      const resC = calculateFormula(formula, {
        charge: Qval,
        "max-charge": "0.001",
        time: "0.05",
        resistance: "1000",
        capacitance: "",
      });
      assert.equal(resC.success, true);
      if (resC.success) {
        assert.ok(Math.abs(resC.answer - 1e-4) < 1e-7);
      }
    });

    it("Capacitors in parallel and series calculators calculate and handle standard form", () => {
      const parallel = formulas.find((f) => f.id === "parallel-capacitors")!;
      const series = formulas.find((f) => f.id === "series-capacitors")!;

      // Parallel: C1 = 10*10^-6 F (10 µF), C2 = 47*10^-6 F (47 µF) => C = 57 µF = 5.7e-5 F
      const resPar = calculateFormula(parallel, {
        capacitance: "",
        "capacitor-1": "10*10^-6",
        "capacitor-2": "47*10^-6",
      });
      assert.equal(resPar.success, true);
      if (resPar.success) {
        assert.ok(Math.abs(resPar.answer - 5.7e-5) < 1e-9);
      }

      // Series: C1 = 10 µF, C2 = 10 µF => C = 5 µF = 5e-6 F
      const resSer = calculateFormula(series, {
        capacitance: "",
        "capacitor-1": "10*10^-6",
        "capacitor-2": "10*10^-6",
      });
      assert.equal(resSer.success, true);
      if (resSer.success) {
        assert.ok(Math.abs(resSer.answer - 5e-6) < 1e-10);
      }
    });
  });
});
