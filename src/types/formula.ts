import type { SubjectId } from "./stem";

export type FormulaVariable = {
  id: string;
  symbol: string;
  name: string;
  unit: string;
  defaultValue?: string;
  isConstant?: boolean;
  min?: number;
  max?: number;
  description?: string;
};

export type Formula = {
  id: string;
  name: string;
  equation: string;
  topic: string;
  description: string;
  variables: FormulaVariable[];

  calculatorType:
    | "multiply"
    | "divide"
    | "kinetic-energy"
    | "gpe"
    | "suvat"
    | "suvat-no-time"
    | "suvat-average-velocity"
    | "suvat-final-displacement"
    | "charge"
    | "resistance"
    | "electrical-power"
    | "electrical-energy"
    | "resistivity"
    | "capacitance"
    | "capacitor-energy"
    | "custom";

  // Extended metadata for general STEM platform
  subjectId?: SubjectId;
  topicId?: string;
  subtopic?: string;
  keywords?: string[];
  relatedFormulaIds?: string[];
  notes?: string[];
  assumptions?: string[];
  examBoard?: string;
  difficulty?: "GCSE / School" | "A-Level / High School" | "University / Advanced";
};