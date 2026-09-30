import type { Subject } from "../types/stem";

export const SUBJECTS: Subject[] = [
  {
    id: "physics",
    name: "Physics",
    shortName: "Physics",
    description: "Mechanics, electrical circuits, wave optics, thermodynamics, quantum phenomena, and astrophysics.",
    icon: "PHYS",
    color: "#2563eb",
    topicIds: [
      "forces-and-motion",
      "electrons-waves-photons",
      "newtonian-world-astrophysics",
      "particles-medical-physics",
      "foundations-of-physics",
    ],
  },
  {
    id: "mathematics",
    name: "Mathematics",
    shortName: "Maths",
    description: "Algebra, quadratic equations, trigonometry, vector mathematics, and geometry.",
    icon: "MATH",
    color: "#7c3aed",
    topicIds: ["algebra-quadratics", "trigonometry-geometry", "vectors-matrices", "calculus"],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    shortName: "Chemistry",
    description: "Stoichiometry, solution concentration, gas laws, thermochemistry, and pH calculations.",
    icon: "CHEM",
    color: "#059669",
    topicIds: ["stoichiometry-moles", "solutions-molarity", "gas-laws-thermodynamics", "acids-bases-ph"],
  },
  {
    id: "engineering",
    name: "Engineering",
    shortName: "Engineering",
    description: "Direct stress and strain, power dissipation, circuit analysis, and material mechanics.",
    icon: "ENG",
    color: "#d97706",
    topicIds: ["electrical-power-circuits", "materials-stress-strain", "fluid-mechanics"],
  },
  {
    id: "computer-science",
    name: "Computer Science",
    shortName: "CompSci",
    description: "Data representation, number systems, transfer rates, and computational units.",
    icon: "CS",
    color: "#0284c7",
    topicIds: ["number-systems-data", "boolean-logic-gates"],
  },
];

export function getSubjectById(subjectId: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === subjectId);
}
