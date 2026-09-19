import MathView from "./MathView";
import type { CalculationStep } from "../types/stem";

type WorkingStepsProps = {
  steps: string[] | CalculationStep[];
  title?: string;
};

/**
 * Parses legacy step string (e.g. "1. Formula: v = u + at" or "Formula: s = ut + ½at²")
 * into a structured label + math equation.
 */
function parseStepString(stepStr: string): { label: string; math: string } {
  // Regex to match "1. Label: Math content" or "Label: Math content"
  const match = stepStr.match(/^(\d+\.\s*)?([A-Za-z\s-]+):\s*(.*)$/);

  if (match) {
    const rawLabel = match[2].trim();
    const rawMath = match[3].trim();
    return {
      label: rawLabel,
      math: rawMath,
    };
  }

  // Fallback if no colon prefix
  return {
    label: "Step",
    math: stepStr,
  };
}

export function WorkingSteps({ steps, title = "Step-by-Step Working" }: WorkingStepsProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="working-steps-container">
      <div className="working-steps-header">
        <span className="working-steps-icon">📝</span>
        <h3>{title}</h3>
      </div>

      <div className="working-steps-list">
        {steps.map((step, index) => {
          const { label, math } =
            typeof step === "string"
              ? parseStepString(step)
              : {
                  label: step.label,
                  math: step.latex || step.plainText || "",
                };

          const isAnswer =
            label.toLowerCase().includes("answer") || label.toLowerCase().includes("result");

          return (
            <div
              key={index}
              className={`working-step-item ${isAnswer ? "step-answer-item" : ""}`}
            >
              <div className="step-badge-col">
                <span className={`step-badge ${isAnswer ? "step-badge-answer" : ""}`}>
                  {index + 1}. {label}
                </span>
              </div>

              <div className="step-math-content">
                <MathView math={math} block={false} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WorkingSteps;
