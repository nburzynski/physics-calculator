import { Link } from "react-router-dom";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import type { Formula } from "../types/formula";

type FormulaCardProps = {
  formula: Formula;
};

function FormulaCard({ formula }: FormulaCardProps) {
  return (
    <Link
      to={`/formulas/${formula.id}`}
      className="formula-row"
    >
      <div className="formula-row-name">
        <h3>{formula.name}</h3>
        <p>{formula.description}</p>
      </div>

      <div className="formula-row-equation">
        <InlineMath math={formula.equation} />
      </div>

      <span className="formula-row-arrow">→</span>
    </Link>
  );
}

export default FormulaCard;