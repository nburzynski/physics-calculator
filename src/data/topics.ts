import type { Topic, SubjectId } from "../types/stem";

export const TOPICS: Topic[] = [
  // ============================================================
  // PHYSICS TOPICS
  // ============================================================
  {
    id: "forces-and-motion",
    slug: "forces-and-motion",
    name: "Forces and Motion",
    subjectId: "physics",
    description: "Motion kinematics, SUVAT equations, Newton's laws, momentum, work, kinetic energy, power, density, and elasticity.",
    icon: "🚀",
    concepts: [
      "Constant acceleration kinematics (SUVAT)",
      "Newton's laws of motion and momentum",
      "Work done, kinetic energy, and gravitational potential energy",
      "Power, mechanical efficiency, and drag",
      "Hooke's law, stress, strain, and Young's modulus",
    ],
    relatedTopicIds: ["foundations-of-physics", "newtonian-world-astrophysics", "materials-stress-strain"],
  },
  {
    id: "electrons-waves-photons",
    slug: "electrons-waves-photons",
    name: "Electrons, Waves and Photons",
    subjectId: "physics",
    description: "Electric current, Kirchhoff's laws, potential dividers, wave speed, diffraction grating, photoelectric effect, and de Broglie wavelength.",
    icon: "⚡",
    concepts: [
      "Electric current, charge, and drift velocity",
      "Potential difference, resistance, and resistivity",
      "Kirchhoff's circuit laws and potential divider circuits",
      "Wave frequency, wavelength, interference, and diffraction",
      "Photon energy (E = hf), work function, and de Broglie relation",
    ],
    relatedTopicIds: ["forces-and-motion", "particles-medical-physics", "electrical-power-circuits"],
  },
  {
    id: "newtonian-world-astrophysics",
    slug: "newtonian-world-astrophysics",
    name: "Newtonian World and Astrophysics",
    subjectId: "physics",
    description: "Thermal physics, ideal gas laws, circular motion, simple harmonic motion, gravitational fields, Kepler's laws, stellar radiation, and Hubble's law.",
    icon: "🪐",
    concepts: [
      "Specific heat capacity and latent heat",
      "Ideal gas equations (pV = NkT and pV = nRT)",
      "Centripetal acceleration and angular velocity",
      "Simple harmonic motion (SHM) displacement and acceleration",
      "Newton's law of gravitation and orbital velocity",
      "Stefan-Boltzmann law, Wien's displacement law, and Hubble's law",
    ],
    relatedTopicIds: ["forces-and-motion", "gas-laws-thermodynamics", "particles-medical-physics"],
  },
  {
    id: "particles-medical-physics",
    slug: "particles-medical-physics",
    name: "Particles and Medical Physics",
    subjectId: "physics",
    description: "Capacitors, uniform and radial electric fields, magnetic flux and forces, radioactive decay, binding energy, X-ray attenuation, and ultrasound.",
    icon: "⚛️",
    concepts: [
      "Capacitance, series/parallel capacitors, and exponential decay",
      "Coulomb's law, electric field strength, and electric potential",
      "Magnetic force on moving charges (F = Bqv) and conductors (F = BIL)",
      "Radioactive activity, half-life, and mass-energy equivalence (E = mc²)",
      "X-ray attenuation coefficient and ultrasound acoustic impedance",
    ],
    relatedTopicIds: ["electrons-waves-photons", "newtonian-world-astrophysics"],
  },
  {
    id: "foundations-of-physics",
    slug: "foundations-of-physics",
    name: "Foundations of Physics",
    subjectId: "physics",
    description: "Physical quantities, SI base units, horizontal and vertical vector resolution, scalar and vector kinematics, and experimental uncertainty.",
    icon: "📐",
    concepts: [
      "SI base units and derived units",
      "Vector resolution (horizontal & vertical components)",
      "Percentage and absolute uncertainty propagation",
    ],
    relatedTopicIds: ["forces-and-motion", "vectors-matrices"],
  },

  // ============================================================
  // MATHEMATICS TOPICS
  // ============================================================
  {
    id: "algebra-quadratics",
    slug: "algebra-quadratics",
    name: "Algebra and Quadratics",
    subjectId: "mathematics",
    description: "Quadratic formula solver, discriminant analysis, roots calculation, and polynomial equations.",
    icon: "🔢",
    concepts: [
      "Quadratic equation standard form (ax² + bx + c = 0)",
      "Discriminant analysis (b² - 4ac) for real and complex roots",
      "Completing the square and vertex form",
    ],
    relatedTopicIds: ["trigonometry-geometry", "calculus"],
  },
  {
    id: "trigonometry-geometry",
    slug: "trigonometry-geometry",
    name: "Trigonometry and Geometry",
    subjectId: "mathematics",
    description: "Pythagorean theorem, distance formula, sine rule, cosine rule, and 2D/3D geometric relations.",
    icon: "📐",
    concepts: [
      "Pythagorean theorem in 2D and 3D",
      "Trigonometric sine, cosine, and tangent ratios",
      "Sine rule and cosine rule for non-right angled triangles",
      "Euclidean distance and midpoint formulas",
    ],
    relatedTopicIds: ["algebra-quadratics", "vectors-matrices", "forces-and-motion"],
  },
  {
    id: "vectors-matrices",
    slug: "vectors-matrices",
    name: "Vectors and Coordinates",
    subjectId: "mathematics",
    description: "Vector magnitudes in 2D and 3D, scalar dot product, angle between vectors, and unit vectors.",
    icon: "↗️",
    concepts: [
      "Vector magnitude in 2D and 3D space",
      "Scalar dot product (a · b = |a||b| cos θ)",
      "Angle between two vectors",
      "Unit vectors and normalization",
    ],
    relatedTopicIds: ["foundations-of-physics", "trigonometry-geometry"],
  },

  // ============================================================
  // CHEMISTRY TOPICS
  // ============================================================
  {
    id: "stoichiometry-moles",
    slug: "stoichiometry-moles",
    name: "Stoichiometry and Moles",
    subjectId: "chemistry",
    description: "Mole-mass-particle calculations, molar mass conversions, Avogadro constant relationships, and percentage yield.",
    icon: "⚗️",
    concepts: [
      "Amount of substance: n = m / M",
      "Particle counting with Avogadro constant: N = n × N_A",
      "Percentage yield and atom economy",
    ],
    relatedTopicIds: ["solutions-molarity", "gas-laws-thermodynamics"],
  },
  {
    id: "solutions-molarity",
    slug: "solutions-molarity",
    name: "Solutions and Molarity",
    subjectId: "chemistry",
    description: "Solution concentration (c = n / V), mass concentration, and standard solution dilution formula (C₁V₁ = C₂V₂).",
    icon: "🧪",
    concepts: [
      "Molar concentration: c = n / V",
      "Mass concentration: ρ = m / V",
      "Dilution equation: C₁V₁ = C₂V₂",
    ],
    relatedTopicIds: ["stoichiometry-moles", "acids-bases-ph"],
  },
  {
    id: "gas-laws-thermodynamics",
    slug: "gas-laws-thermodynamics",
    name: "Gas Laws and Thermochemistry",
    subjectId: "chemistry",
    description: "Ideal gas law (pV = nRT), molar gas volume, enthalpy change of reactions (q = mcΔT), and calorimetry.",
    icon: "🔥",
    concepts: [
      "Ideal gas equation: pV = nRT",
      "Heat energy transfer: q = mcΔT",
      "Molar enthalpy change: ΔH = -q / n",
    ],
    relatedTopicIds: ["stoichiometry-moles", "newtonian-world-astrophysics"],
  },
  {
    id: "acids-bases-ph",
    slug: "acids-bases-ph",
    name: "Acids, Bases and pH",
    subjectId: "chemistry",
    description: "pH and pOH calculations, hydrogen ion concentration [H⁺], hydroxide ion concentration [OH⁻], and ionic product of water.",
    icon: "💧",
    concepts: [
      "pH definition: pH = -log₁₀[H⁺]",
      "Hydrogen ion concentration: [H⁺] = 10^(-pH)",
      "Water autoionization: pH + pOH = 14",
    ],
    relatedTopicIds: ["solutions-molarity"],
  },

  // ============================================================
  // ENGINEERING TOPICS
  // ============================================================
  {
    id: "electrical-power-circuits",
    slug: "electrical-power-circuits",
    name: "Electrical and Power Engineering",
    subjectId: "engineering",
    description: "Ohm's law, electrical power dissipation (P = VI = I²R = V²/R), circuit current, and power efficiency.",
    icon: "⚡",
    concepts: [
      "Ohm's Law: V = IR",
      "Electrical power formulas: P = VI, P = I²R, P = V² / R",
      "Energy transfer: E = Pt",
      "Electrical efficiency = (P_out / P_in) × 100%",
    ],
    relatedTopicIds: ["electrons-waves-photons", "materials-stress-strain"],
  },
  {
    id: "materials-stress-strain",
    slug: "materials-stress-strain",
    name: "Materials, Stress and Strain",
    subjectId: "engineering",
    description: "Direct tensile stress, tensile strain, Young's modulus of elasticity, shear stress, and factor of safety.",
    icon: "🏗️",
    concepts: [
      "Direct tensile stress: σ = F / A",
      "Direct tensile strain: ε = ΔL / L",
      "Young's modulus of elasticity: E = σ / ε = FL / (A ΔL)",
      "Factor of safety = Ultimate Strength / Working Stress",
    ],
    relatedTopicIds: ["forces-and-motion", "electrical-power-circuits"],
  },

  // ============================================================
  // COMPUTER SCIENCE TOPICS
  // ============================================================
  {
    id: "number-systems-data",
    slug: "number-systems-data",
    name: "Number Systems and Data",
    subjectId: "computer-science",
    description: "Decimal, binary, and hexadecimal number conversions, bit storage capacity, and network bandwidth data rates.",
    icon: "💻",
    concepts: [
      "Base 2 (Binary), Base 10 (Decimal), Base 16 (Hexadecimal) conversion",
      "Storage units: bits, bytes, KB, MB, GB",
      "Data transfer time: t = Data Size / Bandwidth",
    ],
    relatedTopicIds: [],
  },
];

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

/**
 * Normalizes a topic string or slug into a standard Topic object.
 */
export function getTopicByIdOrSlug(idOrSlug: string): Topic | undefined {
  const normKey = normalizeTopicKey(idOrSlug);
  return TOPICS.find(
    (t) =>
      t.id === idOrSlug ||
      t.slug === idOrSlug ||
      t.name.toLowerCase() === idOrSlug.toLowerCase() ||
      normalizeTopicKey(t.id) === normKey ||
      normalizeTopicKey(t.slug) === normKey ||
      normalizeTopicKey(t.name) === normKey
  );
}

/**
 * Returns all registered topics.
 */
export function getAllTopics(): Topic[] {
  return TOPICS;
}

/**
 * Returns topics belonging to a specific subject.
 */
export function getTopicsBySubject(subjectId: SubjectId): Topic[] {
  return TOPICS.filter((t) => t.subjectId === subjectId);
}
