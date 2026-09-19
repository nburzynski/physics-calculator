import type { Subject } from "../types/stem";

export const SUBJECTS: Subject[] = [
  {
    id: "physics",
    name: "Physics",
    shortName: "Physics",
    description: "Mechanics, circuits, wave optics, quantum phenomena, astrophysics, and medical imaging.",
    icon: "🪐",
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
    description: "Algebra, quadratic equations, trigonometry, vectors, calculus, and coordinate geometry.",
    icon: "📐",
    color: "#7c3aed",
    topicIds: ["algebra-quadratics", "trigonometry-geometry", "vectors-matrices", "calculus"],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    shortName: "Chemistry",
    description: "Stoichiometry, molarity, ideal gas laws, thermodynamics, pH, and electrochemistry.",
    icon: "⚗️",
    color: "#059669",
    topicIds: ["stoichiometry-moles", "solutions-molarity", "gas-laws-thermodynamics", "acids-bases-ph"],
  },
  {
    id: "engineering",
    name: "Engineering",
    shortName: "Engineering",
    description: "Electrical systems, stress and strain, beam deflection, thermal efficiency, and fluid mechanics.",
    icon: "⚙️",
    color: "#d97706",
    topicIds: ["electrical-power-circuits", "materials-stress-strain", "fluid-mechanics"],
  },
  {
    id: "computer-science",
    name: "Computer Science",
    shortName: "CompSci",
    description: "Number base conversions, Boolean logic, data representation, and algorithmic growth.",
    icon: "💻",
    color: "#0284c7",
    topicIds: ["number-systems-data", "boolean-logic-gates"],
  },
];

export function getSubjectById(subjectId: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === subjectId);
}
