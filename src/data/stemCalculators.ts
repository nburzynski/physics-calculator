import type { Formula } from "../types/formula";

export const stemCalculators: Formula[] = [
  // ============================================================
  // MATHEMATICS CALCULATORS
  // ============================================================
  {
    id: "quadratic-formula",
    name: "Quadratic Equation Solver",
    equation: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
    topic: "Algebra and Quadratics",
    subjectId: "mathematics",
    topicId: "algebra-quadratics",
    description: "Calculates the real or complex roots of a quadratic equation ax² + bx + c = 0 with discriminant step-by-step.",
    calculatorType: "custom",
    keywords: ["quadratic", "roots", "discriminant", "parabola", "algebra", "polynomial"],
    variables: [
      { id: "root", symbol: "x", name: "Roots (x)", unit: "" },
      { id: "a", symbol: "a", name: "Coefficient a (x²)", unit: "", defaultValue: "1" },
      { id: "b", symbol: "b", name: "Coefficient b (x)", unit: "", defaultValue: "-5" },
      { id: "c", symbol: "c", name: "Constant c", unit: "", defaultValue: "6" },
    ],
    notes: ["If discriminant Δ = b² - 4ac > 0, there are two distinct real roots.", "If Δ = 0, there is one repeated real root.", "If Δ < 0, roots are complex."],
  },

  {
    id: "pythagorean-theorem",
    name: "Pythagorean Theorem",
    equation: "c^2 = a^2 + b^2",
    topic: "Trigonometry and Geometry",
    subjectId: "mathematics",
    topicId: "trigonometry-geometry",
    description: "Calculates the hypotenuse or legs of a right-angled triangle.",
    calculatorType: "custom",
    keywords: ["pythagoras", "hypotenuse", "triangle", "geometry", "trigonometry", "right angle"],
    variables: [
      { id: "c", symbol: "c", name: "Hypotenuse", unit: "m" },
      { id: "a", symbol: "a", name: "Adjacent side a", unit: "m" },
      { id: "b", symbol: "b", name: "Opposite side b", unit: "m" },
    ],
  },

  {
    id: "vector-2d-dot-product",
    name: "2D Vector Dot Product and Angle",
    equation: "\\mathbf{a} \\cdot \\mathbf{b} = a_x b_x + a_y b_y",
    topic: "Vectors and Coordinates",
    subjectId: "mathematics",
    topicId: "vectors-matrices",
    description: "Calculates the scalar dot product of two 2D vectors and the angle between them.",
    calculatorType: "custom",
    keywords: ["vector", "dot product", "scalar product", "angle", "geometry"],
    variables: [
      { id: "dot", symbol: "a · b", name: "Dot product", unit: "" },
      { id: "ax", symbol: "ax", name: "Vector a x-component", unit: "" },
      { id: "ay", symbol: "ay", name: "Vector a y-component", unit: "" },
      { id: "bx", symbol: "bx", name: "Vector b x-component", unit: "" },
      { id: "by", symbol: "by", name: "Vector b y-component", unit: "" },
    ],
  },

  // ============================================================
  // CHEMISTRY CALCULATORS
  // ============================================================
  {
    id: "moles-mass-molar",
    name: "Moles, Mass and Molar Mass",
    equation: "n = \\frac{m}{M}",
    topic: "Stoichiometry and Moles",
    subjectId: "chemistry",
    topicId: "stoichiometry-moles",
    description: "Calculates moles of substance, mass in grams, or molar mass in g/mol.",
    calculatorType: "divide",
    keywords: ["moles", "mass", "molar mass", "grams", "stoichiometry", "chemistry"],
    variables: [
      { id: "moles", symbol: "n", name: "Amount of substance", unit: "mol" },
      { id: "mass", symbol: "m", name: "Mass", unit: "g" },
      { id: "molar-mass", symbol: "M", name: "Molar mass", unit: "g/mol" },
    ],
  },

  {
    id: "molarity-concentration",
    name: "Molar Concentration (Molarity)",
    equation: "c = \\frac{n}{V}",
    topic: "Solutions and Molarity",
    subjectId: "chemistry",
    topicId: "solutions-molarity",
    description: "Calculates molarity (mol/dm³), amount of solute (mol), or solution volume in dm³ (litres).",
    calculatorType: "divide",
    keywords: ["molarity", "concentration", "volume", "solution", "solute", "litres"],
    variables: [
      { id: "concentration", symbol: "c", name: "Concentration", unit: "mol/dm³" },
      { id: "moles", symbol: "n", name: "Amount of solute", unit: "mol" },
      { id: "volume", symbol: "V", name: "Volume of solution", unit: "dm³" },
    ],
  },

  {
    id: "solution-dilution",
    name: "Solution Dilution (C₁V₁ = C₂V₂)",
    equation: "C_1 V_1 = C_2 V_2",
    topic: "Solutions and Molarity",
    subjectId: "chemistry",
    topicId: "solutions-molarity",
    description: "Calculates initial or final concentrations and volumes when diluting a standard stock solution.",
    calculatorType: "custom",
    keywords: ["dilution", "concentration", "stock solution", "volume", "titration"],
    variables: [
      { id: "c2", symbol: "C2", name: "Final concentration", unit: "mol/dm³" },
      { id: "c1", symbol: "C1", name: "Initial stock concentration", unit: "mol/dm³" },
      { id: "v1", symbol: "V1", name: "Initial stock volume", unit: "cm³" },
      { id: "v2", symbol: "V2", name: "Final solution volume", unit: "cm³" },
    ],
  },

  {
    id: "ph-concentration",
    name: "pH from Hydrogen Ion Concentration",
    equation: "\\text{pH} = -\\log_{10}[\\text{H}^+]",
    topic: "Acids, Bases and pH",
    subjectId: "chemistry",
    topicId: "acids-bases-ph",
    description: "Calculates solution pH from hydrogen ion concentration [H⁺] or finds [H⁺] from pH.",
    calculatorType: "custom",
    keywords: ["pH", "acid", "base", "hydrogen ion", "alkali", "hydroxide"],
    variables: [
      { id: "ph", symbol: "pH", name: "pH value", unit: "" },
      { id: "h-conc", symbol: "[H⁺]", name: "Hydrogen ion concentration", unit: "mol/dm³" },
    ],
  },

  {
    id: "calorimetry-heat-energy",
    name: "Calorimetry & Heat Energy (q = mcΔT)",
    equation: "q = mc\\Delta T",
    topic: "Gas Laws and Thermochemistry",
    subjectId: "chemistry",
    topicId: "gas-laws-thermodynamics",
    description: "Calculates heat energy transferred (q), mass of substance (m), specific heat capacity (c), or temperature change (ΔT).",
    calculatorType: "custom",
    keywords: ["calorimetry", "heat energy", "specific heat", "enthalpy", "temperature change", "joules"],
    variables: [
      { id: "heat", symbol: "q", name: "Heat energy transfer", unit: "J" },
      { id: "mass", symbol: "m", name: "Mass of substance", unit: "kg" },
      { id: "specific-heat", symbol: "c", name: "Specific heat capacity", unit: "J/(kg K)", defaultValue: "4184" },
      { id: "temp-change", symbol: "ΔT", name: "Temperature change", unit: "K" },
    ],
  },

  // ============================================================
  // ENGINEERING CALCULATORS
  // ============================================================
  {
    id: "tensile-stress",
    name: "Tensile Stress (Direct Stress)",
    equation: "\\sigma = \\frac{F}{A}",
    topic: "Materials, Stress and Strain",
    subjectId: "engineering",
    topicId: "materials-stress-strain",
    description: "Calculates normal tensile or compressive stress from applied force and cross-sectional area.",
    calculatorType: "divide",
    keywords: ["stress", "tensile", "cross sectional area", "force", "pascal", "engineering"],
    variables: [
      { id: "stress", symbol: "σ", name: "Tensile stress", unit: "Pa" },
      { id: "force", symbol: "F", name: "Applied force", unit: "N" },
      { id: "area", symbol: "A", name: "Cross-sectional area", unit: "m²" },
    ],
  },

  {
    id: "tensile-strain",
    name: "Tensile Strain",
    equation: "\\varepsilon = \\frac{\\Delta L}{L}",
    topic: "Materials, Stress and Strain",
    subjectId: "engineering",
    topicId: "materials-stress-strain",
    description: "Calculates dimensionless tensile strain from extension and original length.",
    calculatorType: "divide",
    keywords: ["strain", "extension", "length", "deformation", "engineering"],
    variables: [
      { id: "strain", symbol: "ε", name: "Tensile strain", unit: "" },
      { id: "extension", symbol: "ΔL", name: "Extension / deformation", unit: "m" },
      { id: "length", symbol: "L", name: "Original length", unit: "m" },
    ],
  },

  {
    id: "electrical-power-voltage-current",
    name: "Electrical Power (P = VI)",
    equation: "P = VI",
    topic: "Electrical and Power Engineering",
    subjectId: "engineering",
    topicId: "electrical-power-circuits",
    description: "Calculates electrical power in Watts from voltage and current.",
    calculatorType: "multiply",
    keywords: ["power", "voltage", "current", "watts", "electrical", "engineering"],
    variables: [
      { id: "power", symbol: "P", name: "Power", unit: "W" },
      { id: "voltage", symbol: "V", name: "Voltage", unit: "V" },
      { id: "current", symbol: "I", name: "Current", unit: "A" },
    ],
  },

  // ============================================================
  // COMPUTER SCIENCE CALCULATORS
  // ============================================================
  {
    id: "data-transfer-time",
    name: "Data Download and Transfer Time",
    equation: "t = \\frac{D}{R}",
    topic: "Number Systems and Data",
    subjectId: "computer-science",
    topicId: "number-systems-data",
    description: "Calculates download or transfer time in seconds from file size (in Megabytes) and network speed (in Mbps).",
    calculatorType: "custom",
    keywords: ["download time", "data transfer", "bandwidth", "speed", "megabytes", "mbps", "computer science"],
    variables: [
      { id: "time", symbol: "t", name: "Transfer time", unit: "s" },
      { id: "size", symbol: "D", name: "Data size", unit: "MB" },
      { id: "speed", symbol: "R", name: "Network speed", unit: "Mbps" },
    ],
    notes: ["1 Megabyte (MB) = 8 Megabits (Mb). Time t (seconds) = (Data in MB × 8) / Speed in Mbps."],
  },
];
