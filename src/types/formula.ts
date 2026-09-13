export type FormulaVariable = {
  id: string;
  symbol: string;
  name: string;
  unit: string;
  defaultValue?: string;
  isConstant?: boolean;
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
};