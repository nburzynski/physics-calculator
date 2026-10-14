import fs from "fs";
import path from "path";

const formulasPath = path.resolve(process.cwd(), "src/data/formulas.ts");
let content = fs.readFileSync(formulasPath, "utf-8").replace(/\r\n/g, "\n");

// 1. Rename duplicate/ambiguous formula names
content = content.replace(
  `    id: "suvat-average-velocity",\n    name: "SUVAT: Displacement",`,
  `    id: "suvat-average-velocity",\n    name: "SUVAT: Displacement (Average Velocity)",`
);

content = content.replace(
  `    id: "elastic-energy-force-extension",\n    name: "Elastic Potential Energy",`,
  `    id: "elastic-energy-force-extension",\n    name: "Elastic Potential Energy (from Force and Extension)",`
);

content = content.replace(
  `    id: "elastic-energy-spring",\n    name: "Elastic Potential Energy",`,
  `    id: "elastic-energy-spring",\n    name: "Elastic Potential Energy (from Spring Constant)",`
);

content = content.replace(
  `    id: "capacitor-energy-charge-voltage",\n    name: "Energy Stored in a Capacitor",`,
  `    id: "capacitor-energy-charge-voltage",\n    name: "Energy Stored in a Capacitor (from Q and V)",`
);

content = content.replace(
  `    id: "capacitor-energy-charge-capacitance",\n    name: "Energy Stored in a Capacitor",`,
  `    id: "capacitor-energy-charge-capacitance",\n    name: "Energy Stored in a Capacitor (from Q and C)",`
);

content = content.replace(
  `    id: "capacitor-energy-voltage-capacitance",\n    name: "Energy Stored in a Capacitor",`,
  `    id: "capacitor-energy-voltage-capacitance",\n    name: "Energy Stored in a Capacitor (from V and C)",`
);

content = content.replace(
  `    id: "shm-displacement-cos",\n    name: "SHM Displacement",`,
  `    id: "shm-displacement-cos",\n    name: "SHM Displacement (Cosine - starts at amplitude)",`
);

content = content.replace(
  `    id: "shm-displacement-sin",\n    name: "SHM Displacement",`,
  `    id: "shm-displacement-sin",\n    name: "SHM Displacement (Sine - starts at equilibrium)",`
);

// New formulas for Module 2
const mod2New = `
  {
    id: "percentage-uncertainty",
    name: "Percentage Uncertainty",
    equation: "\\\\text{Percentage Uncertainty} = \\\\frac{\\\\Delta x}{x} \\\\times 100\\\\%",
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
`;

// Insert after vector-vertical-component
const vecVerticalEnd = `      { id: "angle", symbol: "θ", name: "Angle", unit: "°" },\n    ],\n  },`;
content = content.replace(vecVerticalEnd, vecVerticalEnd + "\n" + mod2New);

// New formulas for Module 3
const mod3NewForces = `
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
    equation: "I = F\\\\Delta t",
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
`;

const mod3NewEnergy = `
  {
    id: "kinetic-energy",
    name: "Kinetic Energy",
    equation: "E_k = \\\\frac{1}{2}mv^2",
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
`;

// Insert after momentum
const momentumEnd = `      { id: "velocity", symbol: "v", name: "Velocity", unit: "m/s" },\n    ],\n  },`;
content = content.replace(momentumEnd, momentumEnd + "\n" + mod3NewForces);

// Insert after work-done
const workDoneEnd = `      { id: "angle", symbol: "θ", name: "Angle", unit: "°" },\n    ],\n  },`;
content = content.replace(workDoneEnd, workDoneEnd + "\n" + mod3NewEnergy);

// New formulas for Module 4
const mod4NewElectricity = `
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
`;

const mod4NewWaves = `
  {
    id: "wave-speed-string",
    name: "Wave Speed on a Stretched String",
    equation: "v = \\\\sqrt{\\\\frac{T}{\\\\mu}}",
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
    equation: "\\\\frac{1}{u} + \\\\frac{1}{v} = \\\\frac{1}{f}",
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
    equation: "P = \\\\frac{1}{f}",
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
`;

const mod4NewQuantum = `
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
`;

// Insert after electrical-work-current-time
const elecWorkTimeEnd = `      { id: "time", symbol: "t", name: "Time", unit: "s" },\n    ],\n  },`;
content = content.replace(elecWorkTimeEnd, elecWorkTimeEnd + "\n" + mod4NewElectricity);

// Insert after critical-angle
const critAngleEnd = `      { id: "refractive-index", symbol: "n", name: "Refractive index", unit: "" },\n    ],\n  },`;
content = content.replace(critAngleEnd, critAngleEnd + "\n" + mod4NewWaves);

// Insert after photoelectric-equation
const photoEnd = `      { id: "kinetic-energy", symbol: "KEmax", name: "Maximum kinetic energy", unit: "J" },\n    ],\n  },`;
content = content.replace(photoEnd, photoEnd + "\n" + mod4NewQuantum);

// New formulas for Module 5
const mod5NewGases = `
  {
    id: "kinetic-theory-pressure",
    name: "Kinetic Theory Gas Pressure",
    equation: "pV = \\\\frac{1}{3}Nm\\\\overline{c^2}",
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
    equation: "E_k = \\\\frac{3}{2}kT",
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
`;

const mod5NewSHM = `
  {
    id: "shm-simple-pendulum",
    name: "Simple Pendulum Period",
    equation: "T = 2\\\\pi\\\\sqrt{\\\\frac{L}{g}}",
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
    equation: "T = 2\\\\pi\\\\sqrt{\\\\frac{m}{k}}",
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
    equation: "v = \\\\pm \\\\omega\\\\sqrt{A^2 - x^2}",
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
`;

const mod5NewGravitation = `
  {
    id: "gravitational-potential",
    name: "Gravitational Potential",
    equation: "V_g = -\\\\frac{GM}{r}",
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
    equation: "E_p = -\\\\frac{GMm}{r}",
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
    equation: "v = \\\\sqrt{\\\\frac{GM}{r}}",
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
    equation: "T^2 = \\\\left(\\\\frac{4\\\\pi^2}{GM}\\\\right)r^3",
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
`;

const mod5NewAstro = `
  {
    id: "wiens-displacement-law",
    name: "Wien's Displacement Law",
    equation: "\\\\lambda_{max}T = 2.898 \\\\times 10^{-3}",
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
    equation: "z = \\\\frac{\\\\Delta\\\\lambda}{\\\\lambda} = \\\\frac{v}{c}",
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
`;

// Insert after ideal-gas-moles
const idealMolesEnd = `      { id: "temperature", symbol: "T", name: "Temperature", unit: "K" },\n    ],\n  },`;
content = content.replace(idealMolesEnd, idealMolesEnd + "\n" + mod5NewGases);

// Insert after shm-displacement-sin
const shmSinEnd = `      { id: "time", symbol: "t", name: "Time", unit: "s" },\n    ],\n  },`;
content = content.replace(shmSinEnd, shmSinEnd + "\n" + mod5NewSHM);

// Insert after gravitational-field-equation
const gravFieldEqEnd = `      { id: "radius", symbol: "r", name: "Distance from centre", unit: "m" },\n    ],\n  },`;
content = content.replace(gravFieldEqEnd, gravFieldEqEnd + "\n" + mod5NewGravitation);

// Insert after stefan-law
const stefanLawEnd = `      { id: "temperature", symbol: "T", name: "Temperature", unit: "K" },\n    ],\n  },`;
content = content.replace(stefanLawEnd, stefanLawEnd + "\n" + mod5NewAstro);

// New formulas for Module 6 (Electric Fields & Capacitors, Electromagnetism, Nuclear & Medical)
const mod6NewCapacitors = `
  {
    id: "parallel-plate-capacitance",
    name: "Parallel Plate Capacitor",
    equation: "C = \\\\frac{\\\\varepsilon_0 A}{d}",
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
    equation: "C = 4\\\\pi\\\\varepsilon_0 R",
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
    equation: "Q = Q_0 e^{-\\\\frac{t}{RC}}",
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
    equation: "Q = Q_0 \\\\left(1 - e^{-\\\\frac{t}{RC}}\\\\right)",
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
    equation: "t_{1/2} = RC \\\\ln 2",
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
`;

const mod6NewElectricFields = `
  {
    id: "coulombs-law",
    name: "Coulomb's Law",
    equation: "F = \\\\frac{Q_1 Q_2}{4\\\\pi\\\\varepsilon_0 r^2}",
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
    equation: "E = \\\\frac{Q}{4\\\\pi\\\\varepsilon_0 r^2}",
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
    equation: "V = \\\\frac{Q}{4\\\\pi\\\\varepsilon_0 r}",
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
    equation: "E_p = \\\\frac{Q_1 Q_2}{4\\\\pi\\\\varepsilon_0 r}",
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
    equation: "E = -\\\\frac{\\\\Delta V}{\\\\Delta r}",
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
    equation: "\\\\Delta W = Q\\\\Delta V",
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
    equation: "v = \\\\sqrt{\\\\frac{2qV}{m}}",
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
    equation: "a = \\\\frac{qE}{m}",
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
`;

const mod6NewEMandMedical = `
  {
    id: "magnetic-flux-linkage",
    name: "Magnetic Flux Linkage",
    equation: "N\\\\Phi = BAN\\\\cos\\\\theta",
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
    equation: "\\\\mathcal{E} = -\\\\frac{\\\\Delta(N\\\\Phi)}{\\\\Delta t}",
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
    equation: "r = \\\\frac{mv}{Bq}",
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
    equation: "\\\\frac{E}{A} = \\\\frac{\\\\Delta m c^2}{A}",
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
    equation: "\\\\frac{I_r}{I_0} = \\\\frac{(Z_2 - Z_1)^2}{(Z_2 + Z_1)^2}",
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
`;

// Insert after time-constant
const timeConstEnd = `      { id: "resistance", symbol: "R", name: "Resistance", unit: "Ω" },\n    ],\n  },`;
content = content.replace(timeConstEnd, timeConstEnd + "\n" + mod6NewCapacitors);

// Insert after electric-field-uniform
const elecFieldUniformEnd = `      { id: "distance", symbol: "d", name: "Distance", unit: "m" },\n    ],\n  },`;
content = content.replace(elecFieldUniformEnd, elecFieldUniformEnd + "\n" + mod6NewElectricFields);

// Insert after doppler-ultrasound
const dopplerUltrasoundEnd = `      { id: "wave-speed", symbol: "c", name: "Wave speed", unit: "m/s" },\n    ],\n  },`;
content = content.replace(dopplerUltrasoundEnd, dopplerUltrasoundEnd + "\n" + mod6NewEMandMedical);

fs.writeFileSync(formulasPath, content, "utf-8");
console.log("Successfully updated formulas.ts with all 39 missing formulas!");
