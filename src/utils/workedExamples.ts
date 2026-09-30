import type { Formula } from "../types/formula";

export type WorkedExample = {
  problemStatement: string;
  givenValues: { symbol: string; name: string; value: string; unit: string }[];
  targetVariable: { symbol: string; name: string; unit: string };
  equationUsed: string;
  substitution: string;
  finalAnswer: string;
  explanation?: string;
};

/**
 * Curated and calculated realistic worked examples for STEM calculators.
 */
export function getWorkedExample(formula: Formula): WorkedExample {
  // Specific curated examples for common core formulas
  if (formula.id === "kinetic-energy") {
    return {
      problemStatement:
        "A 1,200 kg electric vehicle accelerates along a straight road at a velocity of 25 m/s. Calculate its kinetic energy.",
      givenValues: [
        { symbol: "m", name: "Mass", value: "1200", unit: "kg" },
        { symbol: "v", name: "Velocity", value: "25", unit: "m/s" },
      ],
      targetVariable: { symbol: "E_k", name: "Kinetic Energy", unit: "J" },
      equationUsed: "E_k = \\frac{1}{2} m v^2",
      substitution: "E_k = \\frac{1}{2} \\times 1200 \\times (25)^2 = 600 \\times 625",
      finalAnswer: "375,000 J (375 kJ)",
      explanation:
        "Because velocity is squared in the kinetic energy equation, doubling the velocity of the vehicle quadruples its kinetic energy.",
    };
  }

  if (formula.id === "gravitational-potential-energy") {
    return {
      problemStatement:
        "A 65 kg climber ascends to a mountain ledge 140 m above base camp. Calculate the gain in gravitational potential energy (using g = 9.81 m/s²).",
      givenValues: [
        { symbol: "m", name: "Mass", value: "65", unit: "kg" },
        { symbol: "g", name: "Gravitational acceleration", value: "9.81", unit: "m/s²" },
        { symbol: "h", name: "Height", value: "140", unit: "m" },
      ],
      targetVariable: { symbol: "E_p", name: "Gravitational Potential Energy", unit: "J" },
      equationUsed: "E_p = m g h",
      substitution: "E_p = 65 \\times 9.81 \\times 140",
      finalAnswer: "89,271 J (89.3 kJ)",
      explanation:
        "Gravitational potential energy is directly proportional to both mass and vertical displacement in a uniform gravitational field.",
    };
  }

  if (formula.id === "density") {
    return {
      problemStatement:
        "A solid metal cube has a mass of 540 g and a volume of 200 cm³. Calculate the density of the metal.",
      givenValues: [
        { symbol: "m", name: "Mass", value: "540", unit: "g" },
        { symbol: "V", name: "Volume", value: "200", unit: "cm³" },
      ],
      targetVariable: { symbol: "ρ", name: "Density", unit: "g/cm³" },
      equationUsed: "\\rho = \\frac{m}{V}",
      substitution: "\\rho = \\frac{540}{200}",
      finalAnswer: "2.7 g/cm³ (2,700 kg/m³ — aluminium)",
      explanation:
        "Density is an intensive material property independent of sample size. Ensure units are consistent (e.g. g/cm³ or kg/m³).",
    };
  }

  if (formula.id === "suvat-velocity") {
    return {
      problemStatement:
        "A train travelling at 12 m/s accelerates steadily at 1.5 m/s² for 8 seconds. Calculate its final velocity.",
      givenValues: [
        { symbol: "u", name: "Initial velocity", value: "12", unit: "m/s" },
        { symbol: "a", name: "Acceleration", value: "1.5", unit: "m/s²" },
        { symbol: "t", name: "Time", value: "8", unit: "s" },
      ],
      targetVariable: { symbol: "v", name: "Final Velocity", unit: "m/s" },
      equationUsed: "v = u + at",
      substitution: "v = 12 + (1.5 \\times 8) = 12 + 12",
      finalAnswer: "24 m/s",
      explanation:
        "This SUVAT equation applies under constant acceleration along a straight line.",
    };
  }

  if (formula.id === "suvat-displacement") {
    return {
      problemStatement:
        "A vehicle starts from rest (u = 0) and accelerates uniformly at 2.4 m/s² for 6 seconds. Calculate the total displacement.",
      givenValues: [
        { symbol: "u", name: "Initial velocity", value: "0", unit: "m/s" },
        { symbol: "a", name: "Acceleration", value: "2.4", unit: "m/s²" },
        { symbol: "t", name: "Time", value: "6", unit: "s" },
      ],
      targetVariable: { symbol: "s", name: "Displacement", unit: "m" },
      equationUsed: "s = ut + \\frac{1}{2} a t^2",
      substitution: "s = (0 \\times 6) + \\frac{1}{2} \\times 2.4 \\times (6)^2 = 0 + 1.2 \\times 36",
      finalAnswer: "43.2 m",
      explanation:
        "When an object accelerates from rest, the initial velocity term ut equals zero, simplifying displacement to ½at².",
    };
  }

  if (formula.id === "resistance" || formula.id === "ohms-law") {
    return {
      problemStatement:
        "A 240 V electrical heating element draws a current of 8.0 A. Calculate the electrical resistance of the element.",
      givenValues: [
        { symbol: "V", name: "Potential difference", value: "240", unit: "V" },
        { symbol: "I", name: "Current", value: "8.0", unit: "A" },
      ],
      targetVariable: { symbol: "R", name: "Resistance", unit: "Ω" },
      equationUsed: "R = \\frac{V}{I}",
      substitution: "R = \\frac{240}{8.0}",
      finalAnswer: "30.0 Ω",
      explanation:
        "Ohm's law states that current is directly proportional to potential difference across an ohmic conductor at constant temperature.",
    };
  }

  if (formula.id === "electrical-power" || formula.id === "electrical-power-voltage-current") {
    return {
      problemStatement:
        "A DC motor operates at 12 V and draws 3.5 A of current under normal load. Calculate the electrical power input.",
      givenValues: [
        { symbol: "V", name: "Voltage", value: "12", unit: "V" },
        { symbol: "I", name: "Current", value: "3.5", unit: "A" },
      ],
      targetVariable: { symbol: "P", name: "Power", unit: "W" },
      equationUsed: "P = V I",
      substitution: "P = 12 \\times 3.5",
      finalAnswer: "42 W",
      explanation:
        "One Watt represents an energy transfer rate of one Joule per second (1 W = 1 J/s).",
    };
  }

  if (formula.id === "charge") {
    return {
      problemStatement:
        "A steady current of 2.5 A flows through a circuit for 3 minutes (180 seconds). Calculate the total electric charge that passes through the cross-section.",
      givenValues: [
        { symbol: "I", name: "Current", value: "2.5", unit: "A" },
        { symbol: "t", name: "Time", value: "180", unit: "s" },
      ],
      targetVariable: { symbol: "Q", name: "Charge", unit: "C" },
      equationUsed: "Q = I t",
      substitution: "Q = 2.5 \\times 180",
      finalAnswer: "450 C",
      explanation:
        "Time must always be converted into seconds (SI base unit) before calculating electric charge in Coulombs.",
    };
  }

  if (formula.id === "momentum") {
    return {
      problemStatement:
        "A 0.45 kg football is kicked at a speed of 28 m/s. Calculate its linear momentum.",
      givenValues: [
        { symbol: "m", name: "Mass", value: "0.45", unit: "kg" },
        { symbol: "v", name: "Velocity", value: "28", unit: "m/s" },
      ],
      targetVariable: { symbol: "p", name: "Momentum", unit: "kg m/s" },
      equationUsed: "p = m v",
      substitution: "p = 0.45 \\times 28",
      finalAnswer: "12.6 kg m/s",
      explanation:
        "Linear momentum is a vector quantity that acts in the same direction as the velocity vector.",
    };
  }

  if (formula.id === "photon-energy-frequency") {
    return {
      problemStatement:
        "Calculate the energy of a single photon of green light with frequency f = 5.50 × 10¹⁴ Hz (Planck constant h = 6.63 × 10⁻³⁴ J s).",
      givenValues: [
        { symbol: "h", name: "Planck constant", value: "6.63 × 10⁻³⁴", unit: "J s" },
        { symbol: "f", name: "Frequency", value: "5.50 × 10¹⁴", unit: "Hz" },
      ],
      targetVariable: { symbol: "E", name: "Photon Energy", unit: "J" },
      equationUsed: "E = h f",
      substitution: "E = (6.63 \\times 10^{-34}) \\times (5.50 \\times 10^{14})",
      finalAnswer: "3.65 × 10⁻¹⁹ J (2.28 eV)",
      explanation:
        "Photon energy increases linearly with electromagnetic wave frequency. Converting Joules to electron-volts involves dividing by the elementary charge e = 1.60 × 10⁻¹⁹ C.",
    };
  }

  if (formula.id === "pythagorean-theorem") {
    return {
      problemStatement:
        "A right-angled triangle has perpendicular side lengths of a = 6 m and b = 8 m. Calculate the length of the hypotenuse c.",
      givenValues: [
        { symbol: "a", name: "Adjacent side", value: "6", unit: "m" },
        { symbol: "b", name: "Opposite side", value: "8", unit: "m" },
      ],
      targetVariable: { symbol: "c", name: "Hypotenuse", unit: "m" },
      equationUsed: "c = \\sqrt{a^2 + b^2}",
      substitution: "c = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100}",
      finalAnswer: "10 m",
      explanation:
        "The Pythagorean theorem applies to any Euclidean right-angled triangle, where the square of the hypotenuse equals the sum of the squares of the other two sides.",
    };
  }

  if (formula.id === "quadratic-formula") {
    return {
      problemStatement:
        "Find the real roots of the quadratic equation 2x² - 7x + 3 = 0.",
      givenValues: [
        { symbol: "a", name: "Coefficient a", value: "2", unit: "" },
        { symbol: "b", name: "Coefficient b", value: "-7", unit: "" },
        { symbol: "c", name: "Constant c", value: "3", unit: "" },
      ],
      targetVariable: { symbol: "x", name: "Roots", unit: "" },
      equationUsed: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      substitution: "x = \\frac{-(-7) \\pm \\sqrt{(-7)^2 - 4(2)(3)}}{2(2)} = \\frac{7 \\pm \\sqrt{49 - 24}}{4} = \\frac{7 \\pm 5}{4}",
      finalAnswer: "x₁ = 3, x₂ = 0.5",
      explanation:
        "The discriminant Δ = b² - 4ac = 25 is positive, yielding two distinct real solutions.",
    };
  }

  // Generic procedural worked example fallback for all other STEM formulas
  const firstVar = formula.variables[0];
  const inputVars = formula.variables.slice(1);

  const sampleInputs = inputVars.map((v, i) => ({
    symbol: v.symbol,
    name: v.name,
    value: v.defaultValue || (i === 0 ? "10" : i === 1 ? "5" : "2"),
    unit: v.unit,
  }));

  const subStr = sampleInputs.map((s) => `${s.symbol} = ${s.value}${s.unit ? ` ${s.unit}` : ""}`).join(", ");

  return {
    problemStatement: `Calculate ${firstVar.name} (${firstVar.symbol}) given standard known values for ${inputVars.map((v) => v.name).join(", ")}.`,
    givenValues: sampleInputs,
    targetVariable: { symbol: firstVar.symbol, name: firstVar.name, unit: firstVar.unit },
    equationUsed: formula.equation,
    substitution: `Substitute ${subStr} into the formula.`,
    finalAnswer: `Calculated value in standard SI units (${firstVar.unit || "dimensionless"})`,
    explanation:
      "Always ensure all physical quantities are converted to base SI units before performing substitutions into the equation.",
  };
}
