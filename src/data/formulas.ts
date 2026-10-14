import type { Formula } from "../types/formula";

const physicsFormulas: Formula[] = [
  // ============================================================
  // MODULE 2 — FOUNDATIONS OF PHYSICS
  // ============================================================

  {
    id: "vector-horizontal-component",
    name: "Horizontal Component of a Vector",
    equation: "F_x = F\\cos\\theta",
    topic: "Foundations of Physics",
    description:
      "Calculates the horizontal component of a vector.",

    calculatorType: "custom",

    variables: [
      { id: "horizontal-component", symbol: "Fx", name: "Horizontal component", unit: "N" },
      { id: "force", symbol: "F", name: "Vector magnitude", unit: "N" },
      { id: "angle", symbol: "θ", name: "Angle", unit: "°" },
    ],
  },

  {
    id: "kinetic-energy",
    name: "Kinetic Energy",
    equation: "E_k = \\frac{1}{2}mv^2",
    topic: "Forces and Motion",
    topicId: "forces-and-motion",
    description: "Calculates the translational kinetic energy of an object from its mass and velocity.",
    calculatorType: "kinetic-energy",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["kinetic energy", "motion", "energy", "velocity", "mechanics"],
    notes: [
      "Core recall equation across all A-level specifications.",
      "Because velocity is squared, doubling the speed quadruples the kinetic energy."
    ],
    variables: [
      { id: "energy", symbol: "Ek", name: "Kinetic energy", unit: "J" },
      { id: "mass", symbol: "m", name: "Mass", unit: "kg" },
      { id: "velocity", symbol: "v", name: "Velocity", unit: "m/s" },
    ],
  },

  {
    id: "gravitational-potential-energy",
    name: "Gravitational Potential Energy (Uniform Field)",
    equation: "E_p = mgh",
    topic: "Forces and Motion",
    topicId: "forces-and-motion",
    description: "Calculates gravitational potential energy gained or lost in a uniform gravitational field near Earth's surface.",
    calculatorType: "gpe",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["gravitational potential energy", "gpe", "height", "gravity", "energy"],
    notes: [
      "Core recall equation across all A-level specifications.",
      "Assumes uniform gravitational field strength g (9.81 N/kg near Earth's surface)."
    ],
    variables: [
      { id: "energy", symbol: "Ep", name: "Gravitational potential energy", unit: "J" },
      { id: "mass", symbol: "m", name: "Mass", unit: "kg" },
      { id: "gravity", symbol: "g", name: "Gravitational field strength", unit: "N/kg", defaultValue: "9.81", isConstant: true },
      { id: "height", symbol: "h", name: "Vertical height", unit: "m" },
    ],
  },


  {
    id: "percentage-uncertainty",
    name: "Percentage Uncertainty",
    equation: "\\text{Percentage Uncertainty} = \\frac{\\Delta x}{x} \\times 100\\%",
    topic: "Foundations of Physics",
    topicId: "foundations-of-physics",
    description: "Calculates the percentage uncertainty in an experimental measurement from absolute uncertainty and the measured value.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["uncertainty", "percentage uncertainty", "experimental error", "precision", "practical skills"],
    notes: [
      "Core practical skill tested across all A-level exam papers.",
      "When multiplying or dividing quantities, percentage uncertainties are added.",
      "When raising a quantity to power n, its percentage uncertainty is multiplied by n."
    ],
    variables: [
      { id: "percentage-uncertainty", symbol: "%", name: "Percentage uncertainty", unit: "%" },
      { id: "absolute-uncertainty", symbol: "Δx", name: "Absolute uncertainty", unit: "" },
      { id: "measured-value", symbol: "x", name: "Measured value", unit: "" },
    ],
  },


  {
    id: "vector-vertical-component",
    name: "Vertical Component of a Vector",
    equation: "F_y = F\\sin\\theta",
    topic: "Foundations of Physics",
    description:
      "Calculates the vertical component of a vector.",

    calculatorType: "custom",

    variables: [
      { id: "vertical-component", symbol: "Fy", name: "Vertical component", unit: "N" },
      { id: "force", symbol: "F", name: "Vector magnitude", unit: "N" },
      { id: "angle", symbol: "θ", name: "Angle", unit: "°" },
    ],
  },

  // ============================================================
  // MODULE 3 — FORCES AND MOTION
  // ============================================================

  {
    id: "suvat-velocity",
    name: "SUVAT: Final Velocity",
    equation: "v = u + at",
    topic: "Forces and Motion",
    description:
      "Calculates final velocity, initial velocity, acceleration or time for constant acceleration.",

    calculatorType: "suvat",

    variables: [
      { id: "initial-velocity", symbol: "u", name: "Initial velocity", unit: "m/s" },
      { id: "final-velocity", symbol: "v", name: "Final velocity", unit: "m/s" },
      { id: "acceleration", symbol: "a", name: "Acceleration", unit: "m/s²" },
      { id: "time", symbol: "t", name: "Time", unit: "s" },
    ],
  },

  {
    id: "shm-simple-pendulum",
    name: "Simple Pendulum Period",
    equation: "T = 2\\pi\\sqrt{\\frac{L}{g}}",
    topic: "Newtonian World and Astrophysics",
    topicId: "newtonian-world-astrophysics",
    description: "Calculates the period of oscillation of a simple pendulum for small angles of displacement.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["pendulum", "simple pendulum", "period", "shm", "oscillations", "gravity"],
    notes: [
      "Supplied on OCR, AQA and Edexcel data sheets.",
      "Valid only for small-angle oscillations (θ < 10°).",
      "Period T is independent of the pendulum bob mass."
    ],
    variables: [
      { id: "period", symbol: "T", name: "Oscillation period", unit: "s" },
      { id: "length", symbol: "L", name: "Pendulum length", unit: "m" },
      { id: "gravity", symbol: "g", name: "Gravitational field strength", unit: "m/s²", defaultValue: "9.81", isConstant: true },
    ],
  },

  {
    id: "shm-mass-spring",
    name: "Mass-Spring Oscillator Period",
    equation: "T = 2\\pi\\sqrt{\\frac{m}{k}}",
    topic: "Newtonian World and Astrophysics",
    topicId: "newtonian-world-astrophysics",
    description: "Calculates the oscillation period of a mass attached to a spring executing simple harmonic motion.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["mass spring", "spring oscillator", "period", "shm", "hookes law", "frequency"],
    notes: [
      "Supplied on OCR, AQA and Edexcel data sheets.",
      "Applies to both vertical and horizontal ideal mass-spring oscillators."
    ],
    variables: [
      { id: "period", symbol: "T", name: "Oscillation period", unit: "s" },
      { id: "mass", symbol: "m", name: "Oscillating mass", unit: "kg" },
      { id: "spring-constant", symbol: "k", name: "Spring constant", unit: "N/m" },
    ],
  },

  {
    id: "shm-velocity-displacement",
    name: "SHM Velocity at Displacement",
    equation: "v = \\pm \\omega\\sqrt{A^2 - x^2}",
    topic: "Newtonian World and Astrophysics",
    topicId: "newtonian-world-astrophysics",
    description: "Calculates particle velocity at any displacement x in simple harmonic motion.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["shm velocity", "simple harmonic motion", "amplitude", "displacement", "angular frequency"],
    notes: [
      "Supplied on OCR, AQA and Edexcel data sheets.",
      "Maximum speed vmax = ωA occurs at the centre of oscillation (x = 0).",
      "Speed is zero at the extremes of motion (x = ±A)."
    ],
    variables: [
      { id: "velocity", symbol: "v", name: "Velocity magnitude", unit: "m/s" },
      { id: "angular-frequency", symbol: "ω", name: "Angular frequency", unit: "rad/s" },
      { id: "amplitude", symbol: "A", name: "Amplitude", unit: "m" },
      { id: "displacement", symbol: "x", name: "Displacement", unit: "m" },
    ],
  },


  {
    id: "ohms-law",
    name: "Ohm's Law",
    equation: "V = IR",
    topic: "Electrons, Waves and Photons",
    topicId: "electrons-waves-photons",
    description: "Calculates potential difference, current, or resistance across an ohmic component.",
    calculatorType: "multiply",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["ohms law", "voltage", "current", "resistance", "circuits", "v=ir"],
    notes: [
      "Core recall equation across OCR, AQA, and Edexcel.",
      "Applies to ohmic conductors provided temperature and other physical conditions remain constant."
    ],
    variables: [
      { id: "voltage", symbol: "V", name: "Potential difference", unit: "V" },
      { id: "current", symbol: "I", name: "Current", unit: "A" },
      { id: "resistance", symbol: "R", name: "Resistance", unit: "Ω" },
    ],
  },

  {
    id: "parallel-plate-capacitance",
    name: "Parallel Plate Capacitor",
    equation: "C = \\frac{\\varepsilon_0 A}{d}",
    topic: "Particles and Medical Physics",
    topicId: "particles-medical-physics",
    description: "Calculates the capacitance of parallel conducting plates from overlapping area and plate separation in a vacuum or air.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["capacitance", "parallel plate", "permittivity", "plate area", "separation", "dielectric"],
    notes: [
      "Supplied on OCR (page 7: C = ε₀A/d) and AQA/Edexcel data sheets.",
      "If a dielectric of relative permittivity εr is placed between plates, C = ε₀εrA / d."
    ],
    variables: [
      { id: "capacitance", symbol: "C", name: "Capacitance", unit: "F" },
      { id: "permittivity", symbol: "ε0", name: "Permittivity of free space", unit: "F/m", defaultValue: "8.85e-12", isConstant: true },
      { id: "area", symbol: "A", name: "Overlap plate area", unit: "m²" },
      { id: "separation", symbol: "d", name: "Plate separation", unit: "m" },
    ],
  },

  {
    id: "spherical-conductor-capacitance",
    name: "Capacitance of an Isolated Sphere",
    equation: "C = 4\\pi\\varepsilon_0 R",
    topic: "Particles and Medical Physics",
    topicId: "particles-medical-physics",
    description: "Calculates the capacitance of an isolated spherical conductor of radius R.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["capacitance", "isolated sphere", "spherical conductor", "permittivity", "electrostatics"],
    notes: [
      "Supplied on OCR data sheet (page 7: C = 4πε₀R).",
      "Derived from electric potential V = Q / (4πε₀R) and C = Q / V."
    ],
    variables: [
      { id: "capacitance", symbol: "C", name: "Capacitance", unit: "F" },
      { id: "permittivity", symbol: "ε0", name: "Permittivity of free space", unit: "F/m", defaultValue: "8.85e-12", isConstant: true },
      { id: "radius", symbol: "R", name: "Sphere radius", unit: "m" },
    ],
  },

  {
    id: "capacitor-discharge-exponential",
    name: "Capacitor Discharge (Exponential Decay)",
    equation: "Q = Q_0 e^{-\\frac{t}{RC}}",
    topic: "Particles and Medical Physics",
    topicId: "particles-medical-physics",
    description: "Calculates remaining charge, voltage, or current during capacitor discharge through resistance R.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["capacitor discharge", "exponential decay", "time constant", "charge decay", "voltage decay"],
    notes: [
      "Supplied on OCR (page 7: x = x₀e^(-t/CR)), AQA, and Edexcel data sheets.",
      "Applies identically to voltage V = V₀e^(-t/RC) and current I = I₀e^(-t/RC)."
    ],
    variables: [
      { id: "charge", symbol: "Q", name: "Charge at time t", unit: "C" },
      { id: "initial-charge", symbol: "Q0", name: "Initial charge", unit: "C" },
      { id: "time", symbol: "t", name: "Discharge time", unit: "s" },
      { id: "resistance", symbol: "R", name: "Circuit resistance", unit: "Ω" },
      { id: "capacitance", symbol: "C", name: "Capacitance", unit: "F" },
    ],
  },

  {
    id: "capacitor-charging-exponential",
    name: "Capacitor Charging (Exponential Growth)",
    equation: "Q = Q_0 \\left(1 - e^{-\\frac{t}{RC}}\\right)",
    topic: "Particles and Medical Physics",
    topicId: "particles-medical-physics",
    description: "Calculates charge or potential difference as a capacitor charges through a resistor towards maximum value.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["capacitor charging", "exponential growth", "time constant", "charging circuit"],
    notes: [
      "Supplied on OCR data sheet (page 7: x = x₀(1 - e^(-t/CR))) and required by AQA and Edexcel.",
      "Applies identically to voltage V = V₀(1 - e^(-t/RC)). Current decreases exponentially: I = I₀e^(-t/RC)."
    ],
    variables: [
      { id: "charge", symbol: "Q", name: "Charge at time t", unit: "C" },
      { id: "max-charge", symbol: "Q0", name: "Maximum charge", unit: "C" },
      { id: "time", symbol: "t", name: "Charging time", unit: "s" },
      { id: "resistance", symbol: "R", name: "Circuit resistance", unit: "Ω" },
      { id: "capacitance", symbol: "C", name: "Capacitance", unit: "F" },
    ],
  },

  {
    id: "capacitor-half-life",
    name: "Capacitor Discharge Time to Halve",
    equation: "t_{1/2} = RC \\ln 2",
    topic: "Particles and Medical Physics",
    topicId: "particles-medical-physics",
    description: "Calculates the time required for capacitor charge, voltage, or current to halve during discharge.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["time to halve", "capacitor half life", "time constant", "discharge rate"],
    notes: [
      "Analogous to radioactive decay half-life: t½ = RC ln(2) ≈ 0.693 RC.",
      "Standard examination question across OCR, AQA, and Edexcel."
    ],
    variables: [
      { id: "half-time", symbol: "t½", name: "Time to halve", unit: "s" },
      { id: "resistance", symbol: "R", name: "Circuit resistance", unit: "Ω" },
      { id: "capacitance", symbol: "C", name: "Capacitance", unit: "F" },
    ],
  },



  {
    id: "suvat-average-velocity",
    name: "SUVAT: Displacement (Average Velocity)",
    equation: "s = \\frac{1}{2}(u+v)t",
    topic: "Forces and Motion",
    description:
      "Calculates displacement using initial velocity, final velocity and time.",

    calculatorType: "suvat-average-velocity",

    variables: [
      { id: "displacement", symbol: "s", name: "Displacement", unit: "m" },
      { id: "initial-velocity", symbol: "u", name: "Initial velocity", unit: "m/s" },
      { id: "final-velocity", symbol: "v", name: "Final velocity", unit: "m/s" },
      { id: "time", symbol: "t", name: "Time", unit: "s" },
    ],
  },

  {
    id: "suvat-displacement",
    name: "SUVAT: Displacement",
    equation: "s = ut + \\frac{1}{2}at^2",
    topic: "Forces and Motion",
    description:
      "Calculates displacement for an object moving with constant acceleration.",

    calculatorType: "suvat",

    variables: [
      { id: "displacement", symbol: "s", name: "Displacement", unit: "m" },
      { id: "initial-velocity", symbol: "u", name: "Initial velocity", unit: "m/s" },
      { id: "acceleration", symbol: "a", name: "Acceleration", unit: "m/s²" },
      { id: "time", symbol: "t", name: "Time", unit: "s" },
    ],
  },

  {
    id: "suvat-no-time",
    name: "SUVAT: Velocity and Displacement",
    equation: "v^2 = u^2 + 2as",
    topic: "Forces and Motion",
    description:
      "Calculates velocity, acceleration or displacement without using time.",

    calculatorType: "suvat-no-time",

    variables: [
      { id: "final-velocity", symbol: "v", name: "Final velocity", unit: "m/s" },
      { id: "initial-velocity", symbol: "u", name: "Initial velocity", unit: "m/s" },
      { id: "acceleration", symbol: "a", name: "Acceleration", unit: "m/s²" },
      { id: "displacement", symbol: "s", name: "Displacement", unit: "m" },
    ],
  },

  {
    id: "force-rate-of-change-momentum",
    name: "Force and Rate of Change of Momentum",
    equation: "F = \\frac{\\Delta p}{\\Delta t}",
    topic: "Forces and Motion",
    description:
      "Calculates force from the rate of change of momentum.",

    calculatorType: "custom",

    variables: [
      { id: "force", symbol: "F", name: "Force", unit: "N" },
      { id: "change-momentum", symbol: "Δp", name: "Change in momentum", unit: "kg m/s" },
      { id: "time", symbol: "Δt", name: "Time interval", unit: "s" },
    ],
  },

  {
    id: "momentum",
    name: "Momentum",
    equation: "p = mv",
    topic: "Forces and Motion",
    description:
      "Calculates momentum from mass and velocity.",

    calculatorType: "multiply",

    variables: [
      { id: "momentum", symbol: "p", name: "Momentum", unit: "kg m/s" },
      { id: "mass", symbol: "m", name: "Mass", unit: "kg" },
      { id: "velocity", symbol: "v", name: "Velocity", unit: "m/s" },
    ],
  },

  {
    id: "newtons-second-law",
    name: "Newton's Second Law",
    equation: "F = ma",
    topic: "Forces and Motion",
    topicId: "forces-and-motion",
    description: "Calculates resultant force, mass, or acceleration for an object of constant mass.",
    calculatorType: "multiply",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["newton", "second law", "force", "mass", "acceleration", "f=ma"],
    notes: [
      "Core recall equation across OCR, AQA, and Edexcel.",
      "Force F is the resultant (net) force acting on mass m in newtons (N)."
    ],
    variables: [
      { id: "force", symbol: "F", name: "Resultant force", unit: "N" },
      { id: "mass", symbol: "m", name: "Mass", unit: "kg" },
      { id: "acceleration", symbol: "a", name: "Acceleration", unit: "m/s²" },
    ],
  },

  {
    id: "impulse-momentum",
    name: "Impulse of a Force",
    equation: "I = F\\Delta t",
    topic: "Forces and Motion",
    topicId: "forces-and-motion",
    description: "Calculates the impulse of a force, equal to the change in linear momentum (Δp).",
    calculatorType: "multiply",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["impulse", "momentum", "change in momentum", "force", "impact"],
    notes: [
      "Impulse I = FΔt = Δp = mv - mu.",
      "Equal to the area under a force-time graph."
    ],
    variables: [
      { id: "impulse", symbol: "I", name: "Impulse", unit: "N s" },
      { id: "force", symbol: "F", name: "Average force", unit: "N" },
      { id: "time", symbol: "Δt", name: "Contact time", unit: "s" },
    ],
  },


  {
    id: "moment",
    name: "Moment",
    equation: "\\text{moment} = Fd",
    topic: "Forces and Motion",
    description:
      "Calculates the turning effect of a force about a pivot.",

    calculatorType: "multiply",

    variables: [
      { id: "moment", symbol: "M", name: "Moment", unit: "N m" },
      { id: "force", symbol: "F", name: "Force", unit: "N" },
      { id: "distance", symbol: "d", name: "Perpendicular distance", unit: "m" },
    ],
  },

  {
    id: "torque",
    name: "Torque",
    equation: "\\tau = Fd",
    topic: "Forces and Motion",
    description:
      "Calculates torque from force and perpendicular distance.",

    calculatorType: "multiply",

    variables: [
      { id: "torque", symbol: "τ", name: "Torque", unit: "N m" },
      { id: "force", symbol: "F", name: "Force", unit: "N" },
      { id: "distance", symbol: "d", name: "Perpendicular distance", unit: "m" },
    ],
  },

  {
    id: "density",
    name: "Density",
    equation: "\\rho = \\frac{m}{V}",
    topic: "Forces and Motion",
    description:
      "Calculates density from mass and volume.",

    calculatorType: "divide",

    variables: [
      { id: "density", symbol: "ρ", name: "Density", unit: "kg/m³" },
      { id: "mass", symbol: "m", name: "Mass", unit: "kg" },
      { id: "volume", symbol: "V", name: "Volume", unit: "m³" },
    ],
  },

  {
    id: "pressure-force-area",
    name: "Pressure",
    equation: "p = \\frac{F}{A}",
    topic: "Forces and Motion",
    description:
      "Calculates pressure from force and area.",

    calculatorType: "divide",

    variables: [
      { id: "pressure", symbol: "p", name: "Pressure", unit: "Pa" },
      { id: "force", symbol: "F", name: "Force", unit: "N" },
      { id: "area", symbol: "A", name: "Area", unit: "m²" },
    ],
  },

  {
    id: "pressure-depth",
    name: "Pressure in a Fluid",
    equation: "p = h\\rho g",
    topic: "Forces and Motion",
    description:
      "Calculates pressure in a fluid from depth, density and gravitational field strength.",

    calculatorType: "custom",

    variables: [
      { id: "pressure", symbol: "p", name: "Pressure", unit: "Pa" },
      { id: "height", symbol: "h", name: "Depth", unit: "m" },
      { id: "density", symbol: "ρ", name: "Density", unit: "kg/m³" },
      { id: "gravity", symbol: "g", name: "Gravitational field strength", unit: "N/kg", defaultValue: "9.81", isConstant: true },
    ],
  },

  {
    id: "work-done",
    name: "Work Done",
    equation: "W = Fx\\cos\\theta",
    topic: "Forces and Motion",
    description:
      "Calculates work done by a force acting through a displacement.",

    calculatorType: "custom",

    variables: [
      { id: "work", symbol: "W", name: "Work done", unit: "J" },
      { id: "force", symbol: "F", name: "Force", unit: "N" },
      { id: "displacement", symbol: "x", name: "Displacement", unit: "m" },
      { id: "angle", symbol: "θ", name: "Angle", unit: "°" },
    ],
  },

  {
    id: "efficiency",
    name: "Efficiency",
    equation:
      "\\text{efficiency} = \\frac{\\text{useful energy output}}{\\text{total energy input}} \\times 100\\%",
    topic: "Forces and Motion",
    description:
      "Calculates efficiency as a percentage.",

    calculatorType: "custom",

    variables: [
      { id: "efficiency", symbol: "η", name: "Efficiency", unit: "%" },
      { id: "useful-energy", symbol: "Euseful", name: "Useful energy output", unit: "J" },
      { id: "total-energy", symbol: "Etotal", name: "Total energy input", unit: "J" },
    ],
  },

  {
    id: "power-work-time",
    name: "Power",
    equation: "P = \\frac{W}{t}",
    topic: "Forces and Motion",
    description:
      "Calculates power from work done and time.",

    calculatorType: "divide",

    variables: [
      { id: "power", symbol: "P", name: "Power", unit: "W" },
      { id: "work", symbol: "W", name: "Work done", unit: "J" },
      { id: "time", symbol: "t", name: "Time", unit: "s" },
    ],
  },

  {
    id: "power-force-velocity",
    name: "Power from Force and Velocity",
    equation: "P = Fv",
    topic: "Forces and Motion",
    description:
      "Calculates power from force and velocity.",

    calculatorType: "multiply",

    variables: [
      { id: "power", symbol: "P", name: "Power", unit: "W" },
      { id: "force", symbol: "F", name: "Force", unit: "N" },
      { id: "velocity", symbol: "v", name: "Velocity", unit: "m/s" },
    ],
  },

  {
    id: "hookes-law",
    name: "Hooke's Law",
    equation: "F = kx",
    topic: "Forces and Motion",
    description:
      "Calculates force using spring constant and extension.",

    calculatorType: "multiply",

    variables: [
      { id: "force", symbol: "F", name: "Force", unit: "N" },
      { id: "spring-constant", symbol: "k", name: "Spring constant", unit: "N/m" },
      { id: "extension", symbol: "x", name: "Extension", unit: "m" },
    ],
  },

  {
    id: "elastic-energy-force-extension",
    name: "Elastic Potential Energy (from Force and Extension)",
    equation: "E = \\frac{1}{2}Fx",
    topic: "Forces and Motion",
    description:
      "Calculates energy stored in a stretched spring.",

    calculatorType: "custom",

    variables: [
      { id: "energy", symbol: "E", name: "Elastic potential energy", unit: "J" },
      { id: "force", symbol: "F", name: "Force", unit: "N" },
      { id: "extension", symbol: "x", name: "Extension", unit: "m" },
    ],
  },

  {
    id: "elastic-energy-spring",
    name: "Elastic Potential Energy (from Spring Constant)",
    equation: "E = \\frac{1}{2}kx^2",
    topic: "Forces and Motion",
    description:
      "Calculates energy stored in a spring using spring constant and extension.",

    calculatorType: "custom",

    variables: [
      { id: "energy", symbol: "E", name: "Elastic potential energy", unit: "J" },
      { id: "spring-constant", symbol: "k", name: "Spring constant", unit: "N/m" },
      { id: "extension", symbol: "x", name: "Extension", unit: "m" },
    ],
  },

  {
    id: "stress",
    name: "Stress",
    equation: "\\sigma = \\frac{F}{A}",
    topic: "Forces and Motion",
    description:
      "Calculates stress from force and cross-sectional area.",

    calculatorType: "divide",

    variables: [
      { id: "stress", symbol: "σ", name: "Stress", unit: "Pa" },
      { id: "force", symbol: "F", name: "Force", unit: "N" },
      { id: "area", symbol: "A", name: "Cross-sectional area", unit: "m²" },
    ],
  },

  {
    id: "strain",
    name: "Strain",
    equation: "\\epsilon = \\frac{x}{L}",
    topic: "Forces and Motion",
    description:
      "Calculates strain from extension and original length.",

    calculatorType: "divide",

    variables: [
      { id: "strain", symbol: "ε", name: "Strain", unit: "" },
      { id: "extension", symbol: "x", name: "Extension", unit: "m" },
      { id: "length", symbol: "L", name: "Original length", unit: "m" },
    ],
  },

  {
    id: "young-modulus",
    name: "Young Modulus",
    equation: "E = \\frac{\\sigma}{\\epsilon}",
    topic: "Forces and Motion",
    description:
      "Calculates Young modulus from stress and strain.",

    calculatorType: "divide",

    variables: [
      { id: "young-modulus", symbol: "E", name: "Young modulus", unit: "Pa" },
      { id: "stress", symbol: "σ", name: "Stress", unit: "Pa" },
      { id: "strain", symbol: "ε", name: "Strain", unit: "" },
    ],
  },

  // ============================================================
  // MODULE 4 — ELECTRONS, WAVES AND PHOTONS
  // ============================================================

  {
    id: "charge",
    name: "Charge",
    equation: "\\Delta Q = I\\Delta t",
    topic: "Electrons, Waves and Photons",
    description:
      "Calculates charge transferred by an electric current.",

    calculatorType: "charge",

    variables: [
      { id: "charge", symbol: "ΔQ", name: "Charge", unit: "C" },
      { id: "current", symbol: "I", name: "Current", unit: "A" },
      { id: "time", symbol: "Δt", name: "Time", unit: "s" },
    ],
  },

  {
    id: "current-drift-velocity",
    name: "Current and Drift Velocity",
    equation: "I = Anev",
    topic: "Electrons, Waves and Photons",
    description:
      "Relates electric current to cross-sectional area, charge carrier density, charge and drift velocity.",

    calculatorType: "custom",

    variables: [
      { id: "current", symbol: "I", name: "Current", unit: "A" },
      { id: "area", symbol: "A", name: "Cross-sectional area", unit: "m²" },
      { id: "number-density", symbol: "n", name: "Number density", unit: "m⁻³" },
      { id: "charge", symbol: "e", name: "Charge of carrier", unit: "C", defaultValue: "1.60e-19", isConstant: true },
      { id: "drift-velocity", symbol: "v", name: "Drift velocity", unit: "m/s" },
    ],
  },

  {
    id: "electrical-work-done",
    name: "Electrical Work Done",
    equation: "W = VQ",
    topic: "Electrons, Waves and Photons",
    description:
      "Calculates electrical work done from potential difference and charge.",

    calculatorType: "multiply",

    variables: [
      { id: "work", symbol: "W", name: "Work done", unit: "J" },
      { id: "voltage", symbol: "V", name: "Potential difference", unit: "V" },
      { id: "charge", symbol: "Q", name: "Charge", unit: "C" },
    ],
  },

  {
    id: "electrical-energy-charge",
    name: "Electrical Energy",
    equation: "W = \\mathcal{E}Q",
    topic: "Electrons, Waves and Photons",
    description:
      "Calculates work done or energy transferred using electromotive force (e.m.f.) and charge.",

    calculatorType: "multiply",

    variables: [
      { id: "work", symbol: "W", name: "Work done / Energy", unit: "J" },
      { id: "emf", symbol: "ℰ", name: "Electromotive force (e.m.f.)", unit: "V" },
      { id: "charge", symbol: "Q", name: "Charge", unit: "C" },
    ],
  },

  {
    id: "electrical-work-current-time",
    name: "Electrical Work Done",
    equation: "W = VIt",
    topic: "Electrons, Waves and Photons",
    description:
      "Calculates electrical work done from potential difference, current and time.",

    calculatorType: "custom",

    variables: [
      { id: "work", symbol: "W", name: "Work done", unit: "J" },
      { id: "voltage", symbol: "V", name: "Potential difference", unit: "V" },
      { id: "current", symbol: "I", name: "Current", unit: "A" },
      { id: "time", symbol: "t", name: "Time", unit: "s" },
    ],
  },

  {
    id: "resistivity",
    name: "Resistance and Resistivity",
    equation: "R = \\frac{\\rho L}{A}",
    topic: "Electrons, Waves and Photons",
    description:
      "Calculates resistance using resistivity, length and cross-sectional area.",

    calculatorType: "resistivity",

    variables: [
      { id: "resistance", symbol: "R", name: "Resistance", unit: "Ω" },
      { id: "resistivity", symbol: "ρ", name: "Resistivity", unit: "Ω m" },
      { id: "length", symbol: "L", name: "Length", unit: "m" },
      { id: "area", symbol: "A", name: "Cross-sectional area", unit: "m²" },
    ],
  },

  {
    id: "series-resistors",
    name: "Resistors in Series",
    equation: "R = R_1 + R_2 + \\ldots",
    topic: "Electrons, Waves and Photons",
    description:
      "Calculates total resistance for resistors connected in series.",

    calculatorType: "custom",

    variables: [
      { id: "total-resistance", symbol: "R", name: "Total resistance", unit: "Ω" },
      { id: "resistor-1", symbol: "R₁", name: "Resistor 1", unit: "Ω" },
      { id: "resistor-2", symbol: "R₂", name: "Resistor 2", unit: "Ω" },
    ],
  },

  {
    id: "parallel-resistors",
    name: "Resistors in Parallel",
    equation: "\\frac{1}{R}=\\frac{1}{R_1}+\\frac{1}{R_2}",
    topic: "Electrons, Waves and Photons",
    description:
      "Relates total resistance to resistors connected in parallel.",

    calculatorType: "custom",

    variables: [
      { id: "total-resistance", symbol: "R", name: "Total resistance", unit: "Ω" },
      { id: "resistor-1", symbol: "R₁", name: "Resistor 1", unit: "Ω" },
      { id: "resistor-2", symbol: "R₂", name: "Resistor 2", unit: "Ω" },
    ],
  },

  {
    id: "electrical-power",
    name: "Electrical Power",
    equation: "P = VI",
    topic: "Electrons, Waves and Photons",
    description:
      "Calculates electrical power from potential difference and current.",

    calculatorType: "multiply",

    variables: [
      { id: "power", symbol: "P", name: "Power", unit: "W" },
      { id: "voltage", symbol: "V", name: "Potential difference", unit: "V" },
      { id: "current", symbol: "I", name: "Current", unit: "A" },
    ],
  },

  {
    id: "electrical-power-current-resistance",
    name: "Electrical Power",
    equation: "P = I^2R",
    topic: "Electrons, Waves and Photons",
    description:
      "Calculates electrical power from current and resistance.",

    calculatorType: "custom",

    variables: [
      { id: "power", symbol: "P", name: "Power", unit: "W" },
      { id: "current", symbol: "I", name: "Current", unit: "A" },
      { id: "resistance", symbol: "R", name: "Resistance", unit: "Ω" },
    ],
  },

  {
    id: "electrical-power-voltage-resistance",
    name: "Electrical Power",
    equation: "P = \\frac{V^2}{R}",
    topic: "Electrons, Waves and Photons",
    description:
      "Calculates electrical power from potential difference and resistance.",

    calculatorType: "custom",

    variables: [
      { id: "power", symbol: "P", name: "Power", unit: "W" },
      { id: "voltage", symbol: "V", name: "Potential difference", unit: "V" },
      { id: "resistance", symbol: "R", name: "Resistance", unit: "Ω" },
    ],
  },

  {
    id: "internal-resistance",
    name: "Internal Resistance",
    equation: "E = I(R+r)",
    topic: "Electrons, Waves and Photons",
    description:
      "Relates electromotive force to current, external resistance and internal resistance.",

    calculatorType: "custom",

    variables: [
      { id: "emf", symbol: "E", name: "EMF", unit: "V" },
      { id: "current", symbol: "I", name: "Current", unit: "A" },
      { id: "resistance", symbol: "R", name: "External resistance", unit: "Ω" },
      { id: "internal-resistance", symbol: "r", name: "Internal resistance", unit: "Ω" },
    ],
  },

  {
    id: "terminal-potential-difference",
    name: "Terminal Potential Difference",
    equation: "E = V + Ir",
    topic: "Electrons, Waves and Photons",
    description:
      "Relates EMF to terminal potential difference and lost volts.",

    calculatorType: "custom",

    variables: [
      { id: "emf", symbol: "E", name: "EMF", unit: "V" },
      { id: "voltage", symbol: "V", name: "Terminal potential difference", unit: "V" },
      { id: "current", symbol: "I", name: "Current", unit: "A" },
      { id: "internal-resistance", symbol: "r", name: "Internal resistance", unit: "Ω" },
    ],
  },

  {
    id: "potential-divider",
    name: "Potential Divider",
    equation: "V_{out}=\\frac{R_2}{R_1+R_2}\\times V_{in}",
    topic: "Electrons, Waves and Photons",
    description:
      "Calculates output potential difference from a potential divider.",

    calculatorType: "custom",

    variables: [
      { id: "output-voltage", symbol: "Vout", name: "Output voltage", unit: "V" },
      { id: "resistance-one", symbol: "R1", name: "Resistance 1", unit: "Ω" },
      { id: "resistance-two", symbol: "R2", name: "Resistance 2", unit: "Ω" },
      { id: "input-voltage", symbol: "Vin", name: "Input voltage", unit: "V" },
    ],
  },

  {
    id: "potential-divider-ratio",
    name: "Potential Divider Ratio",
    equation: "\\frac{V_1}{V_2}=\\frac{R_1}{R_2}",
    topic: "Electrons, Waves and Photons",
    description:
      "Relates voltage ratios to resistance ratios in a potential divider.",

    calculatorType: "custom",

    variables: [
      { id: "voltage-one", symbol: "V1", name: "Voltage 1", unit: "V" },
      { id: "voltage-two", symbol: "V2", name: "Voltage 2", unit: "V" },
      { id: "resistance-one", symbol: "R1", name: "Resistance 1", unit: "Ω" },
      { id: "resistance-two", symbol: "R2", name: "Resistance 2", unit: "Ω" },
    ],
  },

  // WAVES

  {
    id: "wave-speed",
    name: "Wave Speed",
    equation: "v = f\\lambda",
    topic: "Electrons, Waves and Photons",
    description:
      "Calculates wave speed from frequency and wavelength.",

    calculatorType: "multiply",

    variables: [
      { id: "speed", symbol: "v", name: "Wave speed", unit: "m/s" },
      { id: "frequency", symbol: "f", name: "Frequency", unit: "Hz" },
      { id: "wavelength", symbol: "λ", name: "Wavelength", unit: "m" },
    ],
  },

  {
    id: "frequency-period",
    name: "Frequency and Period",
    equation: "f = \\frac{1}{T}",
    topic: "Electrons, Waves and Photons",
    description:
      "Calculates frequency from period.",

    calculatorType: "custom",

    variables: [
      { id: "frequency", symbol: "f", name: "Frequency", unit: "Hz" },
      { id: "period", symbol: "T", name: "Period", unit: "s" },
    ],
  },

  {
    id: "intensity",
    name: "Intensity",
    equation: "I = \\frac{P}{A}",
    topic: "Electrons, Waves and Photons",
    description:
      "Calculates intensity from power and area.",

    calculatorType: "divide",

    variables: [
      { id: "intensity", symbol: "I", name: "Intensity", unit: "W/m²" },
      { id: "power", symbol: "P", name: "Power", unit: "W" },
      { id: "area", symbol: "A", name: "Area", unit: "m²" },
    ],
  },

  {
    id: "young-double-slit",
    name: "Young Double-Slit Equation",
    equation: "\\lambda = \\frac{ax}{D}",
    topic: "Electrons, Waves and Photons",
    description:
      "Calculates wavelength using double-slit interference measurements.",

    calculatorType: "custom",

    variables: [
      { id: "wavelength", symbol: "λ", name: "Wavelength", unit: "m" },
      { id: "slit-separation", symbol: "a", name: "Slit separation", unit: "m" },
      { id: "fringe-separation", symbol: "x", name: "Fringe separation", unit: "m" },
      { id: "distance", symbol: "D", name: "Distance to screen", unit: "m" },
    ],
  },

  {
    id: "refractive-index",
    name: "Refractive Index",
    equation: "n = \\frac{c}{v}",
    topic: "Electrons, Waves and Photons",
    description:
      "Calculates refractive index from the speed of light in vacuum and in a material.",

    calculatorType: "divide",

    variables: [
      { id: "refractive-index", symbol: "n", name: "Refractive index", unit: "" },
      { id: "light-speed", symbol: "c", name: "Speed of light in vacuum", unit: "m/s", defaultValue: "3.00e8", isConstant: true },
      { id: "speed", symbol: "v", name: "Speed in material", unit: "m/s" },
    ],
  },

  {
    id: "snells-law",
    name: "Snell's Law",
    equation: "n_1\\sin\\theta_1=n_2\\sin\\theta_2",
    topic: "Electrons, Waves and Photons",
    description:
      "Relates refractive indices and angles of incidence and refraction.",

    calculatorType: "custom",

    variables: [
      { id: "refractive-index-one", symbol: "n1", name: "First refractive index", unit: "" },
      { id: "angle-one", symbol: "θ1", name: "First angle", unit: "°" },
      { id: "refractive-index-two", symbol: "n2", name: "Second refractive index", unit: "" },
      { id: "angle-two", symbol: "θ2", name: "Second angle", unit: "°" },
    ],
  },

  {
    id: "critical-angle",
    name: "Critical Angle",
    equation: "\\sin C=\\frac{1}{n}",
    topic: "Electrons, Waves and Photons",
    description:
      "Relates critical angle to refractive index.",

    calculatorType: "custom",

    variables: [
      { id: "critical-angle", symbol: "C", name: "Critical angle", unit: "°" },
      { id: "refractive-index", symbol: "n", name: "Refractive index", unit: "" },
    ],
  },

  {
    id: "wave-speed-string",
    name: "Wave Speed on a Stretched String",
    equation: "v = \\sqrt{\\frac{T}{\\mu}}",
    topic: "Electrons, Waves and Photons",
    topicId: "electrons-waves-photons",
    description: "Calculates the speed of transverse waves on a stretched string from tension and mass per unit length.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "AQA / Edexcel / OCR",
    keywords: ["wave speed", "string", "tension", "mass per unit length", "stationary waves", "harmonics"],
    notes: [
      "Supplied on AQA and Edexcel data sheets.",
      "Relates to stationary wave frequency: f = (1 / 2L) √(T / μ)."
    ],
    variables: [
      { id: "speed", symbol: "v", name: "Wave speed", unit: "m/s" },
      { id: "tension", symbol: "T", name: "Tension", unit: "N" },
      { id: "mass-per-unit-length", symbol: "μ", name: "Mass per unit length", unit: "kg/m" },
    ],
  },

  {
    id: "thin-lens-equation",
    name: "Thin Lens Equation",
    equation: "\\frac{1}{u} + \\frac{1}{v} = \\frac{1}{f}",
    topic: "Electrons, Waves and Photons",
    topicId: "electrons-waves-photons",
    description: "Relates object distance, image distance and focal length for a thin optical lens.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "Edexcel / OCR B / AQA",
    keywords: ["lens", "thin lens", "optics", "focal length", "magnification", "real image", "virtual image"],
    notes: [
      "Supplied on Edexcel data booklet.",
      "Sign convention: real object and real image distances are positive; virtual image distance is negative."
    ],
    variables: [
      { id: "focal-length", symbol: "f", name: "Focal length", unit: "m" },
      { id: "object-distance", symbol: "u", name: "Object distance", unit: "m" },
      { id: "image-distance", symbol: "v", name: "Image distance", unit: "m" },
    ],
  },

  {
    id: "lens-power",
    name: "Lens Power",
    equation: "P = \\frac{1}{f}",
    topic: "Electrons, Waves and Photons",
    topicId: "electrons-waves-photons",
    description: "Calculates the optical power of a lens in dioptres from its focal length in metres.",
    calculatorType: "divide",
    difficulty: "A-Level / High School",
    examBoard: "Edexcel / OCR B / AQA",
    keywords: ["lens power", "dioptres", "optics", "focal length", "refraction"],
    notes: [
      "Power is measured in dioptres (D), where 1 D = 1 m⁻¹.",
      "Converging lenses have positive power; diverging lenses have negative power."
    ],
    variables: [
      { id: "power", symbol: "P", name: "Lens power", unit: "D" },
      { id: "focal-length", symbol: "f", name: "Focal length", unit: "m" },
    ],
  },


  // QUANTUM PHYSICS

  {
    id: "photon-energy-frequency",
    name: "Photon Energy",
    equation: "E = hf",
    topic: "Electrons, Waves and Photons",
    description:
      "Calculates photon energy from Planck constant and frequency.",

    calculatorType: "multiply",

    variables: [
      { id: "energy", symbol: "E", name: "Energy", unit: "J" },
      { id: "planck", symbol: "h", name: "Planck constant", unit: "J s", defaultValue: "6.63e-34", isConstant: true },
      { id: "frequency", symbol: "f", name: "Frequency", unit: "Hz" },
    ],
  },

  {
    id: "photon-energy-wavelength",
    name: "Photon Energy from Wavelength",
    equation: "E = \\frac{hc}{\\lambda}",
    topic: "Electrons, Waves and Photons",
    description:
      "Calculates photon energy from wavelength.",

    calculatorType: "custom",

    variables: [
      { id: "energy", symbol: "E", name: "Energy", unit: "J" },
      { id: "planck", symbol: "h", name: "Planck constant", unit: "J s", defaultValue: "6.63e-34", isConstant: true },
      { id: "light-speed", symbol: "c", name: "Speed of light", unit: "m/s", defaultValue: "3.00e8", isConstant: true },
      { id: "wavelength", symbol: "λ", name: "Wavelength", unit: "m" },
    ],
  },

  {
    id: "photoelectric-equation",
    name: "Photoelectric Equation",
    equation: "hf = \\phi + KE_{max}",
    topic: "Electrons, Waves and Photons",
    description:
      "Relates photon energy, work function and maximum kinetic energy.",

    calculatorType: "custom",

    variables: [
      { id: "frequency", symbol: "f", name: "Frequency", unit: "Hz" },
      { id: "planck", symbol: "h", name: "Planck constant", unit: "J s", defaultValue: "6.63e-34", isConstant: true },
      { id: "work-function", symbol: "φ", name: "Work function", unit: "J" },
      { id: "kinetic-energy", symbol: "KEmax", name: "Maximum kinetic energy", unit: "J" },
    ],
  },

  {
    id: "photoelectric-stopping-potential",
    name: "Photoelectric Stopping Potential",
    equation: "eV_s = KE_{max}",
    topic: "Electrons, Waves and Photons",
    topicId: "electrons-waves-photons",
    description: "Relates stopping potential to the maximum kinetic energy of emitted photoelectrons in the photoelectric effect.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["stopping potential", "photoelectric", "work function", "electron volt", "photon"],
    notes: [
      "Stopping potential Vs is the minimum negative collector voltage required to reduce photocurrent to zero.",
      "eVs = KEmax = hf - φ."
    ],
    variables: [
      { id: "kinetic-energy", symbol: "KEmax", name: "Maximum kinetic energy", unit: "J" },
      { id: "charge", symbol: "e", name: "Elementary charge", unit: "C", defaultValue: "1.60e-19", isConstant: true },
      { id: "stopping-potential", symbol: "Vs", name: "Stopping potential", unit: "V" },
    ],
  },


  {
    id: "de-broglie-wavelength",
    name: "de Broglie Wavelength",
    equation: "\\lambda = \\frac{h}{p}",
    topic: "Electrons, Waves and Photons",
    description:
      "Calculates the wavelength associated with a particle.",

    calculatorType: "divide",

    variables: [
      { id: "wavelength", symbol: "λ", name: "Wavelength", unit: "m" },
      { id: "planck", symbol: "h", name: "Planck constant", unit: "J s", defaultValue: "6.63e-34", isConstant: true },
      { id: "momentum", symbol: "p", name: "Momentum", unit: "kg m/s" },
    ],
  },

  // ============================================================
  // MODULE 5 — NEWTONIAN WORLD AND ASTROPHYSICS
  // ============================================================

  {
    id: "thermal-energy-temperature",
    name: "Thermal Energy",
    equation: "E = mc\\Delta\\theta",
    topic: "Newtonian World and Astrophysics",
    description:
      "Calculates thermal energy transferred during a temperature change.",

    calculatorType: "custom",

    variables: [
      { id: "energy", symbol: "E", name: "Energy", unit: "J" },
      { id: "mass", symbol: "m", name: "Mass", unit: "kg" },
      { id: "specific-heat", symbol: "c", name: "Specific heat capacity", unit: "J/kg K" },
      { id: "temperature-change", symbol: "Δθ", name: "Temperature change", unit: "K" },
    ],
  },

  {
    id: "latent-heat",
    name: "Latent Heat",
    equation: "E = ml",
    topic: "Newtonian World and Astrophysics",
    description:
      "Calculates energy transferred during a change of state.",

    calculatorType: "multiply",

    variables: [
      { id: "energy", symbol: "E", name: "Energy", unit: "J" },
      { id: "mass", symbol: "m", name: "Mass", unit: "kg" },
      { id: "specific-latent-heat", symbol: "l", name: "Specific latent heat", unit: "J/kg" },
    ],
  },

  {
    id: "ideal-gas-particle",
    name: "Ideal Gas Equation",
    equation: "pV = NkT",
    topic: "Newtonian World and Astrophysics",
    description:
      "Relates pressure and volume to the number of particles and temperature.",

    calculatorType: "custom",

    variables: [
      { id: "pressure", symbol: "p", name: "Pressure", unit: "Pa" },
      { id: "volume", symbol: "V", name: "Volume", unit: "m³" },
      { id: "particles", symbol: "N", name: "Number of particles", unit: "" },
      { id: "boltzmann", symbol: "k", name: "Boltzmann constant", unit: "J/K", defaultValue: "1.38e-23", isConstant: true },
      { id: "temperature", symbol: "T", name: "Temperature", unit: "K" },
    ],
  },

  {
    id: "wiens-displacement-law",
    name: "Wien's Displacement Law",
    equation: "\\lambda_{max}T = 2.898 \\times 10^{-3}",
    topic: "Newtonian World and Astrophysics",
    topicId: "newtonian-world-astrophysics",
    description: "Relates black body peak emission wavelength to surface temperature.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["wiens law", "black body", "wavelength", "stellar temperature", "astrophysics", "radiation"],
    notes: [
      "Supplied on Edexcel data sheet and OCR booklet (as λmax ∝ 1/T).",
      "Used to estimate the surface temperature of stars from their spectral radiation curve."
    ],
    variables: [
      { id: "wavelength", symbol: "λmax", name: "Peak emission wavelength", unit: "m" },
      { id: "temperature", symbol: "T", name: "Surface temperature", unit: "K" },
      { id: "wien-constant", symbol: "b", name: "Wien constant", unit: "m K", defaultValue: "2.898e-3", isConstant: true },
    ],
  },

  {
    id: "hubbles-law",
    name: "Hubble's Law",
    equation: "v = H_0 d",
    topic: "Newtonian World and Astrophysics",
    topicId: "newtonian-world-astrophysics",
    description: "Relates recessional velocity of distant galaxies to their distance from Earth.",
    calculatorType: "multiply",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["hubbles law", "cosmology", "recession velocity", "hubble constant", "expanding universe"],
    notes: [
      "Supplied on OCR (page 7) and Edexcel data sheets.",
      "The reciprocal of the Hubble constant H0 (in s⁻¹) gives an estimate of the age of the universe: t ≈ 1/H0."
    ],
    variables: [
      { id: "velocity", symbol: "v", name: "Recessional velocity", unit: "km/s" },
      { id: "hubble-constant", symbol: "H0", name: "Hubble constant", unit: "km/s/Mpc", defaultValue: "70" },
      { id: "distance", symbol: "d", name: "Distance", unit: "Mpc" },
    ],
  },

  {
    id: "doppler-redshift",
    name: "Doppler Redshift (Cosmology)",
    equation: "z = \\frac{\\Delta\\lambda}{\\lambda} = \\frac{v}{c}",
    topic: "Newtonian World and Astrophysics",
    topicId: "newtonian-world-astrophysics",
    description: "Calculates the cosmological redshift and recessional velocity of distant astronomical sources.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["redshift", "doppler shift", "cosmology", "wavelength shift", "recessional speed"],
    notes: [
      "Supplied on OCR (page 7: Δλ/λ ≈ Δf/f ≈ v/c) and Edexcel data sheets.",
      "Approximation is valid for recessional speeds much less than the speed of light (v << c)."
    ],
    variables: [
      { id: "redshift", symbol: "z", name: "Redshift", unit: "" },
      { id: "delta-wavelength", symbol: "Δλ", name: "Wavelength shift", unit: "m" },
      { id: "wavelength", symbol: "λ", name: "Emitted wavelength", unit: "m" },
      { id: "velocity", symbol: "v", name: "Recessional velocity", unit: "m/s" },
      { id: "light-speed", symbol: "c", name: "Speed of light", unit: "m/s", defaultValue: "3.00e8", isConstant: true },
    ],
  },


  {
    id: "kinetic-theory-pressure",
    name: "Kinetic Theory Gas Pressure",
    equation: "pV = \\frac{1}{3}Nm\\overline{c^2}",
    topic: "Newtonian World and Astrophysics",
    topicId: "newtonian-world-astrophysics",
    description: "Relates macroscopic pressure and volume to microscopic molecular mass and mean square speed of ideal gas particles.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["kinetic theory", "pressure", "ideal gas", "mean square speed", "rms speed", "gas molecules"],
    notes: [
      "Supplied on OCR (page 6) and AQA data sheets.",
      "Assumes random motion, elastic collisions, negligible molecular volume, and no intermolecular forces between collisions."
    ],
    variables: [
      { id: "pressure", symbol: "p", name: "Pressure", unit: "Pa" },
      { id: "volume", symbol: "V", name: "Volume", unit: "m³" },
      { id: "particles", symbol: "N", name: "Number of molecules", unit: "" },
      { id: "molecular-mass", symbol: "m", name: "Molecular mass", unit: "kg" },
      { id: "mean-square-speed", symbol: "c²", name: "Mean square speed", unit: "m²/s²" },
    ],
  },

  {
    id: "gas-particle-kinetic-energy",
    name: "Molecular Kinetic Energy of a Gas",
    equation: "E_k = \\frac{3}{2}kT",
    topic: "Newtonian World and Astrophysics",
    topicId: "newtonian-world-astrophysics",
    description: "Calculates the average translational kinetic energy of an ideal gas molecule from thermodynamic temperature.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["kinetic energy", "thermal physics", "boltzmann", "temperature", "kelvin", "molecular energy"],
    notes: [
      "Supplied on OCR (page 6), AQA, and Edexcel data sheets.",
      "Shows that absolute temperature T is directly proportional to average molecular translational kinetic energy."
    ],
    variables: [
      { id: "kinetic-energy", symbol: "Ek", name: "Mean kinetic energy", unit: "J" },
      { id: "boltzmann", symbol: "k", name: "Boltzmann constant", unit: "J/K", defaultValue: "1.38e-23", isConstant: true },
      { id: "temperature", symbol: "T", name: "Thermodynamic temperature", unit: "K" },
    ],
  },


  {
    id: "ideal-gas-moles",
    name: "Ideal Gas Equation",
    equation: "pV = nRT",
    topic: "Newtonian World and Astrophysics",
    description:
      "Relates pressure and volume to amount of gas and temperature.",

    calculatorType: "custom",

    variables: [
      { id: "pressure", symbol: "p", name: "Pressure", unit: "Pa" },
      { id: "volume", symbol: "V", name: "Volume", unit: "m³" },
      { id: "moles", symbol: "n", name: "Amount of gas", unit: "mol" },
      { id: "gas-constant", symbol: "R", name: "Molar gas constant", unit: "J/mol K", defaultValue: "8.31", isConstant: true },
      { id: "temperature", symbol: "T", name: "Temperature", unit: "K" },
    ],
  },

  {
    id: "angular-velocity-period",
    name: "Angular Velocity",
    equation: "\\omega = \\frac{2\\pi}{T}",
    topic: "Newtonian World and Astrophysics",
    description:
      "Calculates angular velocity from period.",

    calculatorType: "custom",

    variables: [
      { id: "angular-velocity", symbol: "ω", name: "Angular velocity", unit: "rad/s" },
      { id: "period", symbol: "T", name: "Period", unit: "s" },
    ],
  },

  {
    id: "angular-velocity-frequency",
    name: "Angular Velocity",
    equation: "\\omega = 2\\pi f",
    topic: "Newtonian World and Astrophysics",
    description:
      "Calculates angular velocity from frequency.",

    calculatorType: "custom",

    variables: [
      { id: "angular-velocity", symbol: "ω", name: "Angular velocity", unit: "rad/s" },
      { id: "frequency", symbol: "f", name: "Frequency", unit: "Hz" },
    ],
  },

  {
    id: "circular-velocity",
    name: "Circular Motion Velocity",
    equation: "v = \\omega r",
    topic: "Newtonian World and Astrophysics",
    description:
      "Calculates tangential velocity from angular velocity and radius.",

    calculatorType: "multiply",

    variables: [
      { id: "velocity", symbol: "v", name: "Tangential velocity", unit: "m/s" },
      { id: "angular-velocity", symbol: "ω", name: "Angular velocity", unit: "rad/s" },
      { id: "radius", symbol: "r", name: "Radius", unit: "m" },
    ],
  },

  {
    id: "centripetal-acceleration",
    name: "Centripetal Acceleration",
    equation: "a = \\frac{v^2}{r}",
    topic: "Newtonian World and Astrophysics",
    description:
      "Calculates centripetal acceleration from velocity and radius.",

    calculatorType: "custom",

    variables: [
      { id: "acceleration", symbol: "a", name: "Centripetal acceleration", unit: "m/s²" },
      { id: "velocity", symbol: "v", name: "Velocity", unit: "m/s" },
      { id: "radius", symbol: "r", name: "Radius", unit: "m" },
    ],
  },

  {
    id: "centripetal-acceleration-angular",
    name: "Centripetal Acceleration",
    equation: "a = \\omega^2r",
    topic: "Newtonian World and Astrophysics",
    description:
      "Calculates centripetal acceleration from angular velocity and radius.",

    calculatorType: "custom",

    variables: [
      { id: "acceleration", symbol: "a", name: "Centripetal acceleration", unit: "m/s²" },
      { id: "angular-velocity", symbol: "ω", name: "Angular velocity", unit: "rad/s" },
      { id: "radius", symbol: "r", name: "Radius", unit: "m" },
    ],
  },

  {
    id: "centripetal-force",
    name: "Centripetal Force",
    equation: "F = \\frac{mv^2}{r}",
    topic: "Newtonian World and Astrophysics",
    description:
      "Calculates centripetal force from mass, velocity and radius.",

    calculatorType: "custom",

    variables: [
      { id: "force", symbol: "F", name: "Centripetal force", unit: "N" },
      { id: "mass", symbol: "m", name: "Mass", unit: "kg" },
      { id: "velocity", symbol: "v", name: "Velocity", unit: "m/s" },
      { id: "radius", symbol: "r", name: "Radius", unit: "m" },
    ],
  },

  {
    id: "centripetal-force-angular",
    name: "Centripetal Force",
    equation: "F = m\\omega^2r",
    topic: "Newtonian World and Astrophysics",
    description:
      "Calculates centripetal force from mass, angular velocity and radius.",

    calculatorType: "custom",

    variables: [
      { id: "force", symbol: "F", name: "Centripetal force", unit: "N" },
      { id: "mass", symbol: "m", name: "Mass", unit: "kg" },
      { id: "angular-velocity", symbol: "ω", name: "Angular velocity", unit: "rad/s" },
      { id: "radius", symbol: "r", name: "Radius", unit: "m" },
    ],
  },

  // OSCILLATIONS

  {
    id: "simple-harmonic-acceleration",
    name: "Simple Harmonic Motion Acceleration",
    equation: "a = -\\omega^2x",
    topic: "Newtonian World and Astrophysics",
    description:
      "Calculates acceleration in simple harmonic motion.",

    calculatorType: "custom",

    variables: [
      { id: "acceleration", symbol: "a", name: "Acceleration", unit: "m/s²" },
      { id: "angular-velocity", symbol: "ω", name: "Angular velocity", unit: "rad/s" },
      { id: "displacement", symbol: "x", name: "Displacement", unit: "m" },
    ],
  },

  {
    id: "shm-displacement-cos",
    name: "SHM Displacement (Cosine - starts at amplitude)",
    equation: "x = A\\cos\\omega t",
    topic: "Newtonian World and Astrophysics",
    description:
      "Calculates displacement in simple harmonic motion using cosine.",

    calculatorType: "custom",

    variables: [
      { id: "displacement", symbol: "x", name: "Displacement", unit: "m" },
      { id: "amplitude", symbol: "A", name: "Amplitude", unit: "m" },
      { id: "angular-velocity", symbol: "ω", name: "Angular velocity", unit: "rad/s" },
      { id: "time", symbol: "t", name: "Time", unit: "s" },
    ],
  },

  {
    id: "shm-displacement-sin",
    name: "SHM Displacement (Sine - starts at equilibrium)",
    equation: "x = A\\sin\\omega t",
    topic: "Newtonian World and Astrophysics",
    description:
      "Calculates displacement in simple harmonic motion using sine.",

    calculatorType: "custom",

    variables: [
      { id: "displacement", symbol: "x", name: "Displacement", unit: "m" },
      { id: "amplitude", symbol: "A", name: "Amplitude", unit: "m" },
      { id: "angular-velocity", symbol: "ω", name: "Angular velocity", unit: "rad/s" },
      { id: "time", symbol: "t", name: "Time", unit: "s" },
    ],
  },

  // GRAVITATIONAL FIELDS

  {
    id: "gravitational-field-strength",
    name: "Gravitational Field Strength",
    equation: "g = \\frac{F}{m}",
    topic: "Newtonian World and Astrophysics",
    description:
      "Calculates gravitational field strength from force and mass.",

    calculatorType: "divide",

    variables: [
      { id: "field-strength", symbol: "g", name: "Gravitational field strength", unit: "N/kg" },
      { id: "force", symbol: "F", name: "Force", unit: "N" },
      { id: "mass", symbol: "m", name: "Mass", unit: "kg" },
    ],
  },

  {
    id: "gravitational-force",
    name: "Gravitational Force",
    equation: "F = -\\frac{GMm}{r^2}",
    topic: "Newtonian World and Astrophysics",
    description:
      "Calculates gravitational force between two masses.",

    calculatorType: "custom",

    variables: [
      { id: "force", symbol: "F", name: "Gravitational force", unit: "N" },
      { id: "gravitational-constant", symbol: "G", name: "Gravitational constant", unit: "N m²/kg²", defaultValue: "6.67e-11", isConstant: true },
      { id: "mass-one", symbol: "M", name: "First mass", unit: "kg" },
      { id: "mass-two", symbol: "m", name: "Second mass", unit: "kg" },
      { id: "radius", symbol: "r", name: "Distance from centre", unit: "m" },
    ],
  },

  {
    id: "gravitational-potential",
    name: "Gravitational Potential",
    equation: "V_g = -\\frac{GM}{r}",
    topic: "Newtonian World and Astrophysics",
    topicId: "newtonian-world-astrophysics",
    description: "Calculates gravitational potential at distance r from a point or spherical mass M.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["gravitational potential", "gravity", "radial field", "equipotential", "gravitation"],
    notes: [
      "Supplied on OCR (page 6), AQA, and Edexcel data sheets.",
      "Defined as work done per unit mass bringing a small test mass from infinity to distance r.",
      "Zero at infinity, hence negative everywhere in attractive gravitational fields."
    ],
    variables: [
      { id: "potential", symbol: "Vg", name: "Gravitational potential", unit: "J/kg" },
      { id: "gravitational-constant", symbol: "G", name: "Gravitational constant", unit: "N m²/kg²", defaultValue: "6.67e-11", isConstant: true },
      { id: "mass", symbol: "M", name: "Central mass", unit: "kg" },
      { id: "radius", symbol: "r", name: "Distance from centre", unit: "m" },
    ],
  },

  {
    id: "gravitational-potential-energy-radial",
    name: "Gravitational Potential Energy (Radial Field)",
    equation: "E_p = -\\frac{GMm}{r}",
    topic: "Newtonian World and Astrophysics",
    topicId: "newtonian-world-astrophysics",
    description: "Calculates the gravitational potential energy between two point masses in a radial gravitational field.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["gravitational potential energy", "radial field", "satellite energy", "binding energy", "astrophysics"],
    notes: [
      "Supplied on OCR (as energy = -GMm/r) and AQA data sheets.",
      "Total orbital energy E = Ek + Ep = ½mv² - GMm/r = -GMm/(2r)."
    ],
    variables: [
      { id: "potential-energy", symbol: "Ep", name: "Gravitational potential energy", unit: "J" },
      { id: "gravitational-constant", symbol: "G", name: "Gravitational constant", unit: "N m²/kg²", defaultValue: "6.67e-11", isConstant: true },
      { id: "mass-one", symbol: "M", name: "Central mass", unit: "kg" },
      { id: "mass-two", symbol: "m", name: "Secondary mass", unit: "kg" },
      { id: "radius", symbol: "r", name: "Distance from centre", unit: "m" },
    ],
  },

  {
    id: "orbital-velocity",
    name: "Orbital Velocity",
    equation: "v = \\sqrt{\\frac{GM}{r}}",
    topic: "Newtonian World and Astrophysics",
    topicId: "newtonian-world-astrophysics",
    description: "Calculates circular orbital velocity of a satellite at distance r from the centre of mass M.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["orbital velocity", "satellite", "circular orbit", "kepler", "gravitation"],
    notes: [
      "Derived from equating gravitational attraction to centripetal force: GMm/r² = mv²/r.",
      "Orbital speed depends only on the central mass and radius, independent of satellite mass."
    ],
    variables: [
      { id: "velocity", symbol: "v", name: "Orbital velocity", unit: "m/s" },
      { id: "gravitational-constant", symbol: "G", name: "Gravitational constant", unit: "N m²/kg²", defaultValue: "6.67e-11", isConstant: true },
      { id: "mass", symbol: "M", name: "Central mass", unit: "kg" },
      { id: "radius", symbol: "r", name: "Orbital radius", unit: "m" },
    ],
  },

  {
    id: "keplers-third-law",
    name: "Kepler's Third Law (Orbital Period)",
    equation: "T^2 = \\left(\\frac{4\\pi^2}{GM}\\right)r^3",
    topic: "Newtonian World and Astrophysics",
    topicId: "newtonian-world-astrophysics",
    description: "Relates the orbital period squared of an orbiting body to the cube of its orbital radius.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["keplers third law", "planetary motion", "orbital period", "satellite period", "astronomy"],
    notes: [
      "Supplied on OCR (page 6: T² = (4π²/GM)r³) and Edexcel data sheets.",
      "Shows T² ∝ r³ for all bodies orbiting the same central mass M."
    ],
    variables: [
      { id: "period", symbol: "T", name: "Orbital period", unit: "s" },
      { id: "radius", symbol: "r", name: "Orbital radius", unit: "m" },
      { id: "gravitational-constant", symbol: "G", name: "Gravitational constant", unit: "N m²/kg²", defaultValue: "6.67e-11", isConstant: true },
      { id: "mass", symbol: "M", name: "Central mass", unit: "kg" },
    ],
  },


  {
    id: "gravitational-field-equation",
    name: "Gravitational Field Strength",
    equation: "g = -\\frac{GM}{r^2}",
    topic: "Newtonian World and Astrophysics",
    description:
      "Calculates gravitational field strength around a mass.",

    calculatorType: "custom",

    variables: [
      { id: "field-strength", symbol: "g", name: "Gravitational field strength", unit: "N/kg" },
      { id: "gravitational-constant", symbol: "G", name: "Gravitational constant", unit: "N m²/kg²", defaultValue: "6.67e-11", isConstant: true },
      { id: "mass", symbol: "M", name: "Mass", unit: "kg" },
      { id: "radius", symbol: "r", name: "Distance from centre", unit: "m" },
    ],
  },

  // ASTROPHYSICS

  {
    id: "photon-energy-transition",
    name: "Photon Energy Transition",
    equation: "hf = \\Delta E",
    topic: "Newtonian World and Astrophysics",
    description:
      "Relates photon frequency to an energy transition.",

    calculatorType: "custom",

    variables: [
      { id: "planck", symbol: "h", name: "Planck constant", unit: "J s", defaultValue: "6.63e-34", isConstant: true },
      { id: "frequency", symbol: "f", name: "Frequency", unit: "Hz" },
      { id: "energy-change", symbol: "ΔE", name: "Energy change", unit: "J" },
    ],
  },

  {
    id: "diffraction-grating",
    name: "Diffraction Grating",
    equation: "d\\sin\\theta = n\\lambda",
    topic: "Newtonian World and Astrophysics",
    description:
      "Relates diffraction angle, wavelength, grating spacing and order.",

    calculatorType: "custom",

    variables: [
      { id: "spacing", symbol: "d", name: "Grating spacing", unit: "m" },
      { id: "angle", symbol: "θ", name: "Angle", unit: "°" },
      { id: "order", symbol: "n", name: "Order", unit: "" },
      { id: "wavelength", symbol: "λ", name: "Wavelength", unit: "m" },
    ],
  },

  {
    id: "stefan-law",
    name: "Stefan-Boltzmann Law",
    equation: "L = 4\\pi r^2\\sigma T^4",
    topic: "Newtonian World and Astrophysics",
    description:
      "Calculates luminosity from radius, Stefan constant and temperature.",

    calculatorType: "custom",

    variables: [
      { id: "luminosity", symbol: "L", name: "Luminosity", unit: "W" },
      { id: "radius", symbol: "r", name: "Radius", unit: "m" },
      { id: "stefan-constant", symbol: "σ", name: "Stefan constant", unit: "W/m² K⁴", defaultValue: "5.67e-8", isConstant: true },
      { id: "temperature", symbol: "T", name: "Temperature", unit: "K" },
    ],
  },

  // ============================================================
  // MODULE 6 — PARTICLES AND MEDICAL PHYSICS
  // ============================================================

  {
    id: "capacitance",
    name: "Capacitance",
    equation: "C = \\frac{Q}{V}",
    topic: "Particles and Medical Physics",
    description:
      "Calculates capacitance from charge stored and potential difference.",

    calculatorType: "capacitance",

    variables: [
      { id: "capacitance", symbol: "C", name: "Capacitance", unit: "F" },
      { id: "charge", symbol: "Q", name: "Charge", unit: "C" },
      { id: "voltage", symbol: "V", name: "Potential difference", unit: "V" },
    ],
  },

  {
    id: "parallel-capacitors",
    name: "Capacitors in Parallel",
    equation: "C = C_1+C_2+\\ldots",
    topic: "Particles and Medical Physics",
    description:
      "Calculates total capacitance for capacitors connected in parallel.",

    calculatorType: "custom",

    variables: [
      { id: "capacitance", symbol: "C", name: "Total capacitance", unit: "F" },
      { id: "capacitor-1", symbol: "C₁", name: "Capacitor 1", unit: "F" },
      { id: "capacitor-2", symbol: "C₂", name: "Capacitor 2", unit: "F" },
    ],
  },

  {
    id: "series-capacitors",
    name: "Capacitors in Series",
    equation: "\\frac{1}{C}=\\frac{1}{C_1}+\\frac{1}{C_2}",
    topic: "Particles and Medical Physics",
    description:
      "Relates total capacitance to capacitors connected in series.",

    calculatorType: "custom",

    variables: [
      { id: "capacitance", symbol: "C", name: "Total capacitance", unit: "F" },
      { id: "capacitor-1", symbol: "C₁", name: "Capacitor 1", unit: "F" },
      { id: "capacitor-2", symbol: "C₂", name: "Capacitor 2", unit: "F" },
    ],
  },

  {
    id: "capacitor-energy-charge-voltage",
    name: "Energy Stored in a Capacitor (from Q and V)",
    equation: "W = \\frac{1}{2}QV",
    topic: "Particles and Medical Physics",
    description:
      "Calculates energy stored in a capacitor.",

    calculatorType: "capacitor-energy",

    variables: [
      { id: "energy", symbol: "W", name: "Energy stored", unit: "J" },
      { id: "charge", symbol: "Q", name: "Charge", unit: "C" },
      { id: "voltage", symbol: "V", name: "Potential difference", unit: "V" },
    ],
  },

  {
    id: "capacitor-energy-charge-capacitance",
    name: "Energy Stored in a Capacitor (from Q and C)",
    equation: "W = \\frac{1}{2}\\frac{Q^2}{C}",
    topic: "Particles and Medical Physics",
    description:
      "Calculates energy stored in a capacitor using charge and capacitance.",

    calculatorType: "custom",

    variables: [
      { id: "energy", symbol: "W", name: "Energy stored", unit: "J" },
      { id: "charge", symbol: "Q", name: "Charge", unit: "C" },
      { id: "capacitance", symbol: "C", name: "Capacitance", unit: "F" },
    ],
  },

  {
    id: "capacitor-energy-voltage-capacitance",
    name: "Energy Stored in a Capacitor (from V and C)",
    equation: "W = \\frac{1}{2}V^2C",
    topic: "Particles and Medical Physics",
    description:
      "Calculates energy stored in a capacitor using potential difference and capacitance.",

    calculatorType: "custom",

    variables: [
      { id: "energy", symbol: "W", name: "Energy stored", unit: "J" },
      { id: "voltage", symbol: "V", name: "Potential difference", unit: "V" },
      { id: "capacitance", symbol: "C", name: "Capacitance", unit: "F" },
    ],
  },

  {
    id: "time-constant",
    name: "Time Constant",
    equation: "\\tau = CR",
    topic: "Particles and Medical Physics",
    description:
      "Calculates the time constant of a capacitor and resistor circuit.",

    calculatorType: "multiply",

    variables: [
      { id: "time-constant", symbol: "τ", name: "Time constant", unit: "s" },
      { id: "capacitance", symbol: "C", name: "Capacitance", unit: "F" },
      { id: "resistance", symbol: "R", name: "Resistance", unit: "Ω" },
    ],
  },

  {
    id: "electric-field-strength",
    name: "Electric Field Strength",
    equation: "E = \\frac{F}{q}",
    topic: "Particles and Medical Physics",
    description:
      "Calculates electric field strength from force and charge.",

    calculatorType: "divide",

    variables: [
      { id: "electric-field", symbol: "E", name: "Electric field strength", unit: "N/C" },
      { id: "force", symbol: "F", name: "Force", unit: "N" },
      { id: "charge", symbol: "q", name: "Charge", unit: "C" },
    ],
  },

  {
    id: "electric-field-uniform",
    name: "Uniform Electric Field",
    equation: "E = \\frac{V}{d}",
    topic: "Particles and Medical Physics",
    description:
      "Calculates electric field strength from potential difference and separation.",

    calculatorType: "divide",

    variables: [
      { id: "electric-field", symbol: "E", name: "Electric field strength", unit: "V/m" },
      { id: "voltage", symbol: "V", name: "Potential difference", unit: "V" },
      { id: "distance", symbol: "d", name: "Distance", unit: "m" },
    ],
  },

  {
    id: "coulombs-law",
    name: "Coulomb's Law",
    equation: "F = \\frac{Q_1 Q_2}{4\\pi\\varepsilon_0 r^2}",
    topic: "Particles and Medical Physics",
    topicId: "particles-medical-physics",
    description: "Calculates the electrostatic force between two point charges separated by distance r in a vacuum.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["coulombs law", "electrostatic force", "point charge", "permittivity", "electric field"],
    notes: [
      "Supplied on OCR (page 7: F = Qq/(4πε₀r²)), AQA, and Edexcel data sheets.",
      "Inverse-square law analogous to Newton's law of gravitation.",
      "Positive force represents repulsion (like charges); negative force represents attraction (opposite charges)."
    ],
    variables: [
      { id: "force", symbol: "F", name: "Electrostatic force", unit: "N" },
      { id: "charge-one", symbol: "Q1", name: "First point charge", unit: "C" },
      { id: "charge-two", symbol: "Q2", name: "Second point charge", unit: "C" },
      { id: "distance", symbol: "r", name: "Separation distance", unit: "m" },
      { id: "permittivity", symbol: "ε0", name: "Permittivity of free space", unit: "F/m", defaultValue: "8.85e-12", isConstant: true },
    ],
  },

  {
    id: "electric-field-point-charge",
    name: "Electric Field Strength (Point Charge)",
    equation: "E = \\frac{Q}{4\\pi\\varepsilon_0 r^2}",
    topic: "Particles and Medical Physics",
    topicId: "particles-medical-physics",
    description: "Calculates radial electric field strength at distance r from a point charge Q.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["electric field", "point charge", "radial field", "field strength", "coulomb"],
    notes: [
      "Supplied on OCR (page 7), AQA, and Edexcel data sheets.",
      "Vector directed radially outward from positive charge, inward toward negative charge."
    ],
    variables: [
      { id: "field-strength", symbol: "E", name: "Electric field strength", unit: "N/C" },
      { id: "charge", symbol: "Q", name: "Point charge", unit: "C" },
      { id: "distance", symbol: "r", name: "Distance from charge", unit: "m" },
      { id: "permittivity", symbol: "ε0", name: "Permittivity of free space", unit: "F/m", defaultValue: "8.85e-12", isConstant: true },
    ],
  },

  {
    id: "electric-potential-point-charge",
    name: "Electric Potential (Point Charge)",
    equation: "V = \\frac{Q}{4\\pi\\varepsilon_0 r}",
    topic: "Particles and Medical Physics",
    topicId: "particles-medical-physics",
    description: "Calculates electric potential at distance r from an isolated point charge Q.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["electric potential", "point charge", "voltage", "work done", "equipotential"],
    notes: [
      "Supplied on OCR (page 7), AQA, and Edexcel data sheets.",
      "Scalar quantity defined as work done per unit positive charge bringing it from infinity.",
      "Positive potential around positive charges; negative potential around negative charges."
    ],
    variables: [
      { id: "potential", symbol: "V", name: "Electric potential", unit: "V" },
      { id: "charge", symbol: "Q", name: "Point charge", unit: "C" },
      { id: "distance", symbol: "r", name: "Distance from charge", unit: "m" },
      { id: "permittivity", symbol: "ε0", name: "Permittivity of free space", unit: "F/m", defaultValue: "8.85e-12", isConstant: true },
    ],
  },

  {
    id: "electric-potential-energy",
    name: "Electric Potential Energy",
    equation: "E_p = \\frac{Q_1 Q_2}{4\\pi\\varepsilon_0 r}",
    topic: "Particles and Medical Physics",
    topicId: "particles-medical-physics",
    description: "Calculates electrostatic potential energy stored between two point charges separated by distance r.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["electric potential energy", "electrostatic energy", "point charges", "work done"],
    notes: [
      "Supplied on OCR data sheet (page 7: energy = Qq / (4πε₀r)).",
      "Positive Ep for like charges (repulsive; work required to bring together).",
      "Negative Ep for opposite charges (attractive; energy released when brought together)."
    ],
    variables: [
      { id: "potential-energy", symbol: "Ep", name: "Electric potential energy", unit: "J" },
      { id: "charge-one", symbol: "Q1", name: "First point charge", unit: "C" },
      { id: "charge-two", symbol: "Q2", name: "Second point charge", unit: "C" },
      { id: "distance", symbol: "r", name: "Separation distance", unit: "m" },
      { id: "permittivity", symbol: "ε0", name: "Permittivity of free space", unit: "F/m", defaultValue: "8.85e-12", isConstant: true },
    ],
  },

  {
    id: "electric-potential-gradient",
    name: "Electric Field from Potential Gradient",
    equation: "E = -\\frac{\\Delta V}{\\Delta r}",
    topic: "Particles and Medical Physics",
    topicId: "particles-medical-physics",
    description: "Relates electric field strength to the rate of change of electric potential with distance.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "AQA / OCR / Edexcel",
    keywords: ["potential gradient", "electric field", "equipotential", "voltage change"],
    notes: [
      "Supplied on AQA data sheet and tested across OCR and Edexcel.",
      "The minus sign indicates that electric field lines point in the direction of steepest potential decrease."
    ],
    variables: [
      { id: "field-strength", symbol: "E", name: "Electric field strength", unit: "V/m" },
      { id: "potential-difference", symbol: "ΔV", name: "Potential difference", unit: "V" },
      { id: "distance", symbol: "Δr", name: "Displacement", unit: "m" },
    ],
  },

  {
    id: "electric-work-potential-difference",
    name: "Work Done in an Electric Field",
    equation: "\\Delta W = Q\\Delta V",
    topic: "Particles and Medical Physics",
    topicId: "particles-medical-physics",
    description: "Calculates work done moving charge Q through electric potential difference ΔV.",
    calculatorType: "multiply",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["work done", "electric work", "potential difference", "charge", "energy"],
    notes: [
      "Core specification relationship across all exam boards.",
      "Work done is independent of the path taken between the two equipotential surfaces."
    ],
    variables: [
      { id: "work-done", symbol: "ΔW", name: "Work done", unit: "J" },
      { id: "charge", symbol: "Q", name: "Charge", unit: "C" },
      { id: "potential-difference", symbol: "ΔV", name: "Potential difference", unit: "V" },
    ],
  },

  {
    id: "electron-gun-velocity",
    name: "Accelerated Charge Velocity (Electron Gun)",
    equation: "v = \\sqrt{\\frac{2qV}{m}}",
    topic: "Particles and Medical Physics",
    topicId: "particles-medical-physics",
    description: "Calculates final speed of a charged particle accelerated from rest through potential difference V.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["electron gun", "accelerated charge", "velocity", "kinetic energy", "particle accelerator"],
    notes: [
      "Derived from conservation of energy: qV = ½mv².",
      "Standard calculation for electron guns, mass spectrometers, and X-ray tubes."
    ],
    variables: [
      { id: "velocity", symbol: "v", name: "Final velocity", unit: "m/s" },
      { id: "charge", symbol: "q", name: "Particle charge", unit: "C", defaultValue: "1.60e-19" },
      { id: "voltage", symbol: "V", name: "Accelerating potential difference", unit: "V" },
      { id: "mass", symbol: "m", name: "Particle mass", unit: "kg", defaultValue: "9.11e-31" },
    ],
  },

  {
    id: "charged-particle-acceleration-field",
    name: "Charged Particle Acceleration in Electric Field",
    equation: "a = \\frac{qE}{m}",
    topic: "Particles and Medical Physics",
    topicId: "particles-medical-physics",
    description: "Calculates acceleration of a charged particle moving through an electric field.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["particle acceleration", "electric field deflection", "uniform field", "deflection plates"],
    notes: [
      "Combines F = qE and F = ma.",
      "In a uniform field between parallel plates, acceleration is constant and produces a parabolic trajectory."
    ],
    variables: [
      { id: "acceleration", symbol: "a", name: "Acceleration", unit: "m/s²" },
      { id: "charge", symbol: "q", name: "Particle charge", unit: "C" },
      { id: "field-strength", symbol: "E", name: "Electric field strength", unit: "N/C" },
      { id: "mass", symbol: "m", name: "Particle mass", unit: "kg" },
    ],
  },


  {
    id: "magnetic-force-current",
    name: "Magnetic Force on a Current",
    equation: "F = BI l\\sin\\theta",
    topic: "Particles and Medical Physics",
    description:
      "Calculates magnetic force on a current-carrying conductor.",

    calculatorType: "custom",

    variables: [
      { id: "force", symbol: "F", name: "Force", unit: "N" },
      { id: "magnetic-field", symbol: "B", name: "Magnetic flux density", unit: "T" },
      { id: "current", symbol: "I", name: "Current", unit: "A" },
      { id: "length", symbol: "l", name: "Length", unit: "m" },
      { id: "angle", symbol: "θ", name: "Angle", unit: "°" },
    ],
  },

  {
    id: "magnetic-force-charge",
    name: "Magnetic Force on a Charge",
    equation: "F = BQv",
    topic: "Particles and Medical Physics",
    description:
      "Calculates magnetic force on a moving charge.",

    calculatorType: "custom",

    variables: [
      { id: "force", symbol: "F", name: "Force", unit: "N" },
      { id: "magnetic-field", symbol: "B", name: "Magnetic flux density", unit: "T" },
      { id: "charge", symbol: "Q", name: "Charge", unit: "C" },
      { id: "velocity", symbol: "v", name: "Velocity", unit: "m/s" },
    ],
  },

  {
    id: "magnetic-flux",
    name: "Magnetic Flux",
    equation: "\\Phi = BA\\cos\\theta",
    topic: "Particles and Medical Physics",
    description:
      "Calculates magnetic flux through an area.",

    calculatorType: "custom",

    variables: [
      { id: "flux", symbol: "Φ", name: "Magnetic flux", unit: "Wb" },
      { id: "magnetic-field", symbol: "B", name: "Magnetic flux density", unit: "T" },
      { id: "area", symbol: "A", name: "Area", unit: "m²" },
      { id: "angle", symbol: "θ", name: "Angle", unit: "°" },
    ],
  },

  {
    id: "transformer-equation",
    name: "Transformer Equation",
    equation:
      "\\frac{N_s}{N_p}=\\frac{V_s}{V_p}=\\frac{I_p}{I_s}",
    topic: "Particles and Medical Physics",
    description:
      "Relates turns, potential differences and currents in an ideal transformer.",

    calculatorType: "custom",

    variables: [
      { id: "secondary-turns", symbol: "Ns", name: "Secondary turns", unit: "" },
      { id: "primary-turns", symbol: "Np", name: "Primary turns", unit: "" },
      { id: "secondary-voltage", symbol: "Vs", name: "Secondary voltage", unit: "V" },
      { id: "primary-voltage", symbol: "Vp", name: "Primary voltage", unit: "V" },
    ],
  },

  {
    id: "nuclear-radius",
    name: "Radius of a Nucleus",
    equation: "R = r_0A^{1/3}",
    topic: "Particles and Medical Physics",
    description:
      "Calculates nuclear radius from mass number.",

    calculatorType: "custom",

    variables: [
      { id: "radius", symbol: "R", name: "Nuclear radius", unit: "m" },
      { id: "constant", symbol: "r0", name: "Nuclear radius constant", unit: "m", defaultValue: "1.2e-15", isConstant: true },
      { id: "mass-number", symbol: "A", name: "Mass number", unit: "" },
    ],
  },

  {
    id: "radioactive-activity",
    name: "Radioactive Activity",
    equation: "A = \\lambda N",
    topic: "Particles and Medical Physics",
    description:
      "Relates radioactive activity to decay constant and number of undecayed nuclei.",

    calculatorType: "custom",

    variables: [
      { id: "activity", symbol: "A", name: "Activity", unit: "Bq" },
      { id: "decay-constant", symbol: "λ", name: "Decay constant", unit: "s⁻¹" },
      { id: "nuclei", symbol: "N", name: "Number of nuclei", unit: "" },
    ],
  },

  {
    id: "decay-rate",
    name: "Rate of Radioactive Decay",
    equation: "\\frac{\\Delta N}{\\Delta t}=-\\lambda N",
    topic: "Particles and Medical Physics",
    description:
      "Relates the rate of radioactive decay to the number of undecayed nuclei.",

    calculatorType: "custom",

    variables: [
      { id: "change-nuclei", symbol: "ΔN", name: "Change in nuclei", unit: "" },
      { id: "time", symbol: "Δt", name: "Time interval", unit: "s" },
      { id: "decay-constant", symbol: "λ", name: "Decay constant", unit: "s⁻¹" },
      { id: "nuclei", symbol: "N", name: "Number of nuclei", unit: "" },
    ],
  },

  {
    id: "half-life",
    name: "Half-Life",
    equation: "\\lambda t_{1/2}=\\ln(2)",
    topic: "Particles and Medical Physics",
    description:
      "Relates half-life to decay constant.",

    calculatorType: "custom",

    variables: [
      { id: "decay-constant", symbol: "λ", name: "Decay constant", unit: "s⁻¹" },
      { id: "half-life", symbol: "t½", name: "Half-life", unit: "s" },
    ],
  },

  {
    id: "radioactive-activity-decay",
    name: "Radioactive Activity Decay",
    equation: "A=A_0e^{-\\lambda t}",
    topic: "Particles and Medical Physics",
    description:
      "Calculates radioactive activity after a period of time.",

    calculatorType: "custom",

    variables: [
      { id: "activity", symbol: "A", name: "Activity", unit: "Bq" },
      { id: "initial-activity", symbol: "A0", name: "Initial activity", unit: "Bq" },
      { id: "decay-constant", symbol: "λ", name: "Decay constant", unit: "s⁻¹" },
      { id: "time", symbol: "t", name: "Time", unit: "s" },
    ],
  },

  {
    id: "radioactive-nuclei-decay",
    name: "Radioactive Decay",
    equation: "N=N_0e^{-\\lambda t}",
    topic: "Particles and Medical Physics",
    description:
      "Calculates the number of undecayed nuclei after a period of time.",

    calculatorType: "custom",

    variables: [
      { id: "nuclei", symbol: "N", name: "Number of nuclei", unit: "" },
      { id: "initial-nuclei", symbol: "N0", name: "Initial number of nuclei", unit: "" },
      { id: "decay-constant", symbol: "λ", name: "Decay constant", unit: "s⁻¹" },
      { id: "time", symbol: "t", name: "Time", unit: "s" },
    ],
  },

  {
    id: "mass-energy",
    name: "Einstein's Mass-Energy Equation",
    equation: "\\Delta E=\\Delta mc^2",
    topic: "Particles and Medical Physics",
    description:
      "Relates a change in mass to a change in energy.",

    calculatorType: "custom",

    variables: [
      { id: "energy", symbol: "ΔE", name: "Energy change", unit: "J" },
      { id: "mass", symbol: "Δm", name: "Mass change", unit: "kg" },
      { id: "light-speed", symbol: "c", name: "Speed of light", unit: "m/s", defaultValue: "3.00e8", isConstant: true },
    ],
  },

  {
    id: "xray-attenuation",
    name: "X-Ray Attenuation",
    equation: "I=I_0e^{-\\mu x}",
    topic: "Particles and Medical Physics",
    description:
      "Calculates X-ray intensity after passing through a material.",

    calculatorType: "custom",

    variables: [
      { id: "intensity", symbol: "I", name: "Final intensity", unit: "W/m²" },
      { id: "initial-intensity", symbol: "I0", name: "Initial intensity", unit: "W/m²" },
      { id: "attenuation", symbol: "μ", name: "Attenuation coefficient", unit: "m⁻¹" },
      { id: "distance", symbol: "x", name: "Thickness", unit: "m" },
    ],
  },

  {
    id: "acoustic-impedance",
    name: "Acoustic Impedance",
    equation: "Z=\\rho c",
    topic: "Particles and Medical Physics",
    description:
      "Calculates acoustic impedance from density and wave speed.",

    calculatorType: "multiply",

    variables: [
      { id: "impedance", symbol: "Z", name: "Acoustic impedance", unit: "kg/m² s" },
      { id: "density", symbol: "ρ", name: "Density", unit: "kg/m³" },
      { id: "speed", symbol: "c", name: "Wave speed", unit: "m/s" },
    ],
  },

  {
    id: "doppler-ultrasound",
    name: "Ultrasound Doppler Equation",
    equation: "\\frac{\\Delta f}{f}=\\frac{2v\\cos\\theta}{c}",
    topic: "Particles and Medical Physics",
    description:
      "Relates Doppler frequency change to velocity and angle in ultrasound.",

    calculatorType: "custom",

    variables: [
      { id: "frequency-change", symbol: "Δf", name: "Frequency change", unit: "Hz" },
      { id: "frequency", symbol: "f", name: "Original frequency", unit: "Hz" },
      { id: "velocity", symbol: "v", name: "Velocity", unit: "m/s" },
      { id: "angle", symbol: "θ", name: "Angle", unit: "°" },
      { id: "wave-speed", symbol: "c", name: "Wave speed", unit: "m/s" },
    ],
  },

  {
    id: "magnetic-flux-linkage",
    name: "Magnetic Flux Linkage",
    equation: "N\\Phi = BAN\\cos\\theta",
    topic: "Particles and Medical Physics",
    topicId: "particles-medical-physics",
    description: "Calculates the total magnetic flux linking a coil of N turns at angle θ to the magnetic field normal.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["magnetic flux linkage", "flux linkage", "coil", "magnetic field", "electromagnetism"],
    notes: [
      "Supplied on OCR (Φ = BA cos θ), AQA, and Edexcel data sheets.",
      "Flux linkage NΦ is measured in weber-turns (Wb or Wb-t)."
    ],
    variables: [
      { id: "flux-linkage", symbol: "NΦ", name: "Magnetic flux linkage", unit: "Wb" },
      { id: "magnetic-field", symbol: "B", name: "Magnetic flux density", unit: "T" },
      { id: "area", symbol: "A", name: "Coil area", unit: "m²" },
      { id: "turns", symbol: "N", name: "Number of turns", unit: "" },
      { id: "angle", symbol: "θ", name: "Angle to normal", unit: "°" },
    ],
  },

  {
    id: "faradays-law",
    name: "Faraday's and Lenz's Law of Induction",
    equation: "\\mathcal{E} = -\\frac{\\Delta(N\\Phi)}{\\Delta t}",
    topic: "Particles and Medical Physics",
    topicId: "particles-medical-physics",
    description: "Calculates the magnitude and direction of electromotive force (e.m.f.) induced by changing magnetic flux linkage.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["faradays law", "lenzs law", "electromagnetic induction", "induced emf", "flux change"],
    notes: [
      "Supplied on OCR (page 8: E = -Δ(NΦ)/Δt), AQA, and Edexcel data sheets.",
      "The minus sign (Lenz's law) indicates that the induced e.m.f. opposes the flux change producing it."
    ],
    variables: [
      { id: "emf", symbol: "ℰ", name: "Induced e.m.f.", unit: "V" },
      { id: "flux-linkage-change", symbol: "Δ(NΦ)", name: "Change in flux linkage", unit: "Wb" },
      { id: "time", symbol: "Δt", name: "Time interval", unit: "s" },
    ],
  },

  {
    id: "cyclotron-radius",
    name: "Charged Particle Radius in Magnetic Field",
    equation: "r = \\frac{mv}{Bq}",
    topic: "Particles and Medical Physics",
    topicId: "particles-medical-physics",
    description: "Calculates circular orbital radius of a charged particle in a uniform perpendicular magnetic field.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["cyclotron", "magnetic radius", "mass spectrometer", "lorentz force", "circular path"],
    notes: [
      "Equates magnetic Lorentz force Bqv to centripetal force mv²/r.",
      "Orbital period T = 2πm / (Bq) is independent of particle speed and radius (cyclotron principle)."
    ],
    variables: [
      { id: "radius", symbol: "r", name: "Orbit radius", unit: "m" },
      { id: "mass", symbol: "m", name: "Particle mass", unit: "kg" },
      { id: "velocity", symbol: "v", name: "Particle velocity", unit: "m/s" },
      { id: "magnetic-field", symbol: "B", name: "Magnetic flux density", unit: "T" },
      { id: "charge", symbol: "q", name: "Particle charge", unit: "C" },
    ],
  },

  {
    id: "binding-energy-per-nucleon",
    name: "Nuclear Binding Energy per Nucleon",
    equation: "\\frac{E}{A} = \\frac{\\Delta m c^2}{A}",
    topic: "Particles and Medical Physics",
    topicId: "particles-medical-physics",
    description: "Calculates nuclear binding energy per nucleon from mass defect and mass number.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["binding energy", "mass defect", "nuclear physics", "fission", "fusion", "einstein"],
    notes: [
      "Key measure of nuclear stability: peak occurs near iron-56 (Fe-56, ~8.8 MeV/nucleon).",
      "Fusion releases energy below A = 56; fission releases energy above A = 56."
    ],
    variables: [
      { id: "binding-energy-per-nucleon", symbol: "E/A", name: "Binding energy per nucleon", unit: "J/nucleon" },
      { id: "mass-defect", symbol: "Δm", name: "Mass defect", unit: "kg" },
      { id: "nucleon-number", symbol: "A", name: "Nucleon number", unit: "" },
      { id: "light-speed", symbol: "c", name: "Speed of light", unit: "m/s", defaultValue: "3.00e8", isConstant: true },
    ],
  },

  {
    id: "acoustic-reflection-coefficient",
    name: "Ultrasound Reflection Coefficient",
    equation: "\\frac{I_r}{I_0} = \\frac{(Z_2 - Z_1)^2}{(Z_2 + Z_1)^2}",
    topic: "Particles and Medical Physics",
    topicId: "particles-medical-physics",
    description: "Calculates the fraction of ultrasound beam intensity reflected at an acoustic boundary between two media.",
    calculatorType: "custom",
    difficulty: "A-Level / High School",
    examBoard: "OCR / AQA / Edexcel",
    keywords: ["ultrasound", "acoustic impedance", "reflection coefficient", "medical imaging", "coupling gel"],
    notes: [
      "Supplied on OCR (page 8: Ir/I0 = (Z2 - Z1)² / (Z2 + Z1)²) and AQA Medical Physics.",
      "Large acoustic impedance mismatch causes strong reflection; coupling gel prevents ~99.9% reflection at air-skin boundary."
    ],
    variables: [
      { id: "intensity-ratio", symbol: "Ir/I0", name: "Intensity reflection ratio", unit: "" },
      { id: "impedance-one", symbol: "Z1", name: "Acoustic impedance 1", unit: "kg/m² s" },
      { id: "impedance-two", symbol: "Z2", name: "Acoustic impedance 2", unit: "kg/m² s" },
    ],
  },

];

import { stemCalculators } from "./stemCalculators";

export const formulas: Formula[] = [
  ...physicsFormulas.map((f) => ({
    ...f,
    subjectId: (f.subjectId ?? "physics") as "physics",
  })),
  ...stemCalculators,
];

export function getFormulaById(id: string): Formula | undefined {
  return formulas.find((f) => f.id === id);
}

function normalizeTopicKey(str: string): string {
  return str
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/,/g, "")
    .replace(/&/g, "")
    .replace(/\band\b/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\s+/g, "-");
}

export function getFormulasByTopic(topicNameOrId: string): Formula[] {
  const normKey = normalizeTopicKey(topicNameOrId);
  const rawLower = topicNameOrId.toLowerCase().trim();

  return formulas.filter((f) => {
    if (f.topicId && (f.topicId === topicNameOrId || normalizeTopicKey(f.topicId) === normKey)) {
      return true;
    }
    if (f.topic.toLowerCase() === rawLower) {
      return true;
    }
    if (normalizeTopicKey(f.topic) === normKey) {
      return true;
    }
    return false;
  });
}

export function getFormulasBySubject(subjectId: string): Formula[] {
  return formulas.filter((f) => (f.subjectId ?? "physics") === subjectId);
}

export function getRelatedFormulas(formula: Formula, limit = 4): Formula[] {
  if (formula.relatedFormulaIds && formula.relatedFormulaIds.length > 0) {
    const explicitlyRelated = formulas.filter((f) =>
      formula.relatedFormulaIds?.includes(f.id)
    );
    if (explicitlyRelated.length > 0) return explicitlyRelated.slice(0, limit);
  }

  // Same topic first
  const sameTopic = formulas.filter(
    (f) => f.id !== formula.id && f.topic === formula.topic
  );
  if (sameTopic.length >= limit) {
    return sameTopic.slice(0, limit);
  }

  // Same subject fallback
  const sameSubject = formulas.filter(
    (f) =>
      f.id !== formula.id &&
      f.topic !== formula.topic &&
      (f.subjectId ?? "physics") === (formula.subjectId ?? "physics")
  );

  return [...sameTopic, ...sameSubject].slice(0, limit);
}