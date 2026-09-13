import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { formulas } from "../data/formulas";
import { calculateFormula } from "../utils/calculator";
import SEO from "../components/SEO";

function FormulaPage() {
  const { formulaId } = useParams();

  const formula = formulas.find((item) => item.id === formulaId);

  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState("");
  const [working, setWorking] = useState<string[]>([]);
  const [error, setError] = useState("");

  // Initialize or reset with default physical constants when formula changes
  useEffect(() => {
    if (formula) {
      const initial: Record<string, string> = {};
      for (const variable of formula.variables) {
        if (variable.defaultValue) {
          initial[variable.id] = variable.defaultValue;
        }
      }
      setValues(initial);
      setResult("");
      setWorking([]);
      setError("");
    }
  }, [formulaId]);

  if (!formula) {
    return (
      <main className="formula-page">
        <h1>Formula not found</h1>
        <Link to="/formulas">← Back to Formula Library</Link>
      </main>
    );
  }

  const updateValue = (id: string, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [id]: value,
    }));

    setResult("");
    setWorking([]);
    setError("");
  };

  const clearCalculator = () => {
    setValues({});
    setResult("");
    setWorking([]);
    setError("");
  };

  const resetConstants = () => {
    const initial: Record<string, string> = {};
    for (const variable of formula.variables) {
      if (variable.defaultValue) {
        initial[variable.id] = variable.defaultValue;
      }
    }
    setValues(initial);
    setResult("");
    setWorking([]);
    setError("");
  };

  const handleCalculate = () => {
    setError("");

    const outcome = calculateFormula(formula, values);

    if (!outcome.success) {
      setError(outcome.error);
      setResult("");
      setWorking([]);
      return;
    }

    const unitSuffix = outcome.unit ? ` ${outcome.unit}` : "";
    setResult(`${outcome.variableSymbol} = ${outcome.formattedAnswer}${unitSuffix}`);
    setWorking(outcome.steps);
  };

  const hasConstants = formula.variables.some((v) => v.isConstant || v.defaultValue);

  return (
    <main className="formula-page">
      <SEO
        title={`${formula.name} Calculator & Equation`}
        description={`Calculate ${formula.name} (${formula.variables.map((v) => v.symbol).join(", ")}) using OCR A-Level Physics formula ${formula.equation}. Step-by-step rearranging, substitute values, and units.`}
        canonicalPath={`/formulas/${formula.id}`}
        keywords={[
          formula.name,
          `${formula.name} calculator`,
          formula.topic,
          "OCR A level physics calculator",
          ...formula.variables.map((v) => v.name),
        ]}
      />

      <Link to="/formulas" className="back-link">
        ← Formula Library
      </Link>

      <section className="formula-page-header">
        <p className="eyebrow">{formula.topic.toUpperCase()}</p>

        <h1>{formula.name}</h1>

        <div className="formula-page-equation">
          <BlockMath math={formula.equation} />
        </div>

        <p className="formula-page-description">{formula.description}</p>
      </section>

      <section className="interactive-calculator">
        <div className="calculator-heading">
          <p className="eyebrow">CALCULATOR</p>

          <h2>Enter the values you know</h2>

          <p className="calculator-instructions">
            Fill in the known values and leave the value you want to calculate blank.
          </p>
        </div>

        <div className="calculator-form">
          {formula.variables.map((variable) => (
            <div className="calculator-var-row" key={variable.id}>
              <div className="var-info">
                <span className="var-symbol">{variable.symbol}</span>
                <span className="var-name">
                  {variable.name}
                  {variable.isConstant && (
                    <span className="var-constant-tag">CONSTANT</span>
                  )}
                </span>
              </div>

              <div className="var-input-container">
                <input
                  type="text"
                  inputMode="decimal"
                  className="var-input"
                  value={values[variable.id] ?? ""}
                  onChange={(event) =>
                    updateValue(variable.id, event.target.value)
                  }
                  placeholder="Leave blank to calculate"
                />

                <span className="var-unit">{variable.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {error && <div className="calculator-error">{error}</div>}

        {result !== "" && (
          <div className="calculation-result">
            <p className="eyebrow">RESULT</p>

            <h2>{result}</h2>

            {working.length > 0 && (
              <div className="working">
                <h3>Working Steps</h3>

                {working.map((step, index) => (
                  <p key={index}>{step}</p>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="calculator-actions">
          <button
            type="button"
            className="calculate-button"
            onClick={handleCalculate}
          >
            Calculate →
          </button>

          <button
            type="button"
            className="clear-button"
            onClick={clearCalculator}
          >
            Clear
          </button>

          {hasConstants && (
            <button
              type="button"
              className="reset-constants-button"
              onClick={resetConstants}
            >
              Reset Standard Constants
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default FormulaPage;