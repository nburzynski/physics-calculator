import { Link } from "react-router-dom";
import MathView from "./MathView";
import type { Formula } from "../types/formula";

type FormulaCardProps = {
  formula: Formula;
  showSubjectBadge?: boolean;
};

export function FormulaCard({ formula, showSubjectBadge = false }: FormulaCardProps) {
  return (
    <Link
      to={`/formulas/${formula.id}`}
      className="formula-row"
      aria-label={`${formula.name} calculator, formula ${formula.equation}`}
    >
      <div className="formula-row-name">
        <div className="formula-card-badges">
          {showSubjectBadge && formula.subjectId && (
            <span className="formula-badge subject-tag">{formula.subjectId.toUpperCase()}</span>
          )}
          <span className="formula-badge topic-tag">{formula.topic}</span>
        </div>
        <h3>{formula.name}</h3>
        <p>{formula.description}</p>
      </div>

      <div className="formula-row-equation">
        <MathView math={formula.equation} />
      </div>

      <span className="formula-row-arrow" aria-hidden="true">→</span>
    </Link>
  );
}

export default FormulaCard;