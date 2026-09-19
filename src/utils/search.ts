import { formulas } from "../data/formulas";
import { TOPICS } from "../data/topics";
import { SUBJECTS } from "../data/subjects";
import type { SearchItem } from "../types/stem";

/**
 * Builds the complete searchable catalog of subjects, topics, formulas, and tools.
 */
export function getSearchCatalog(): SearchItem[] {
  const items: SearchItem[] = [];

  // 1. Featured Interactive Tools
  items.push({
    id: "tool-suvat",
    type: "tool",
    title: "Universal SUVAT 5-Variable Solver",
    subtitle: "Solves any 2 unknowns from any 3 given SUVAT kinematic values with full steps.",
    path: "/calculators",
    subjectId: "physics",
    keywords: ["suvat", "motion", "kinematics", "velocity", "acceleration", "displacement", "time"],
  });

  items.push({
    id: "tool-quantum",
    type: "tool",
    title: "Quantum & Photon Energy Converter",
    subtitle: "Converts between wavelength, frequency, Joules, and electron-volts (eV).",
    path: "/calculators",
    subjectId: "physics",
    keywords: ["photon", "quantum", "energy", "ev", "wavelength", "frequency", "planck"],
  });

  items.push({
    id: "tool-divider",
    type: "tool",
    title: "Potential Divider & Circuit Studio",
    subtitle: "Calculates output voltage, resistor voltages, circuit current, and power dissipation.",
    path: "/calculators",
    subjectId: "physics",
    keywords: ["potential divider", "circuit", "voltage", "resistor", "series", "current", "power"],
  });

  items.push({
    id: "tool-finder",
    type: "tool",
    title: "Formula Finder",
    subtitle: "Select known quantities to instantly find the exact equation and calculator to use.",
    path: "/formula-finder",
    keywords: ["finder", "which formula", "equation finder", "match"],
  });

  // 2. Subjects
  for (const s of SUBJECTS) {
    items.push({
      id: `subject-${s.id}`,
      type: "subject",
      title: `${s.name} Calculators`,
      subtitle: s.description,
      path: `/formulas?subject=${s.id}`,
      subjectId: s.id,
      keywords: [s.name.toLowerCase(), s.shortName.toLowerCase(), "subject", "calculators"],
    });
  }

  // 3. Topics
  for (const t of TOPICS) {
    items.push({
      id: `topic-${t.id}`,
      type: "topic",
      title: `${t.name} (Topic)`,
      subtitle: t.description,
      path: `/topics/${t.slug}`,
      subjectId: t.subjectId,
      topicId: t.id,
      keywords: [t.name.toLowerCase(), ...(t.concepts || []).map((c) => c.toLowerCase()), "topic", "equations"],
    });
  }

  // 4. Formulas / Calculators
  for (const f of formulas) {
    const symbolList = f.variables.map((v) => v.symbol).join(", ");
    const varNames = f.variables.map((v) => v.name.toLowerCase()).join(" ");

    items.push({
      id: `formula-${f.id}`,
      type: "formula",
      title: f.name,
      subtitle: `${f.topic} • Variables: ${symbolList}`,
      path: `/formulas/${f.id}`,
      equation: f.equation,
      subjectId: f.subjectId,
      topicId: f.topicId,
      keywords: [
        f.name.toLowerCase(),
        f.topic.toLowerCase(),
        varNames,
        ...f.variables.map((v) => v.symbol.toLowerCase()),
        ...(f.keywords || []),
      ],
    });
  }

  return items;
}

/**
 * Fast tokenized search across the catalog with scoring.
 */
export function searchCatalog(query: string, limit = 15): SearchItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const tokens = trimmed.split(/[\s,]+/).filter(Boolean);
  const catalog = getSearchCatalog();

  const scored = catalog.map((item) => {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const subLower = item.subtitle.toLowerCase();

    // Exact title match bonus
    if (titleLower === trimmed) score += 100;
    else if (titleLower.startsWith(trimmed)) score += 50;
    else if (titleLower.includes(trimmed)) score += 30;

    // Token matching
    for (const token of tokens) {
      if (titleLower.includes(token)) score += 15;
      if (subLower.includes(token)) score += 5;
      if (item.keywords?.some((k) => k.includes(token))) score += 10;
      if (item.keywords?.some((k) => k === token)) score += 20;
    }

    // Type weight priority
    if (item.type === "tool") score += 10;
    if (item.type === "topic") score += 5;

    return { item, score };
  });

  return scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}
