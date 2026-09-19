import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formulas, getRelatedFormulas } from "../data/formulas";
import { calculateFormula } from "../utils/calculator";
import { getSubjectById } from "../data/subjects";
import { getTopicByIdOrSlug } from "../data/topics";
import { trackCalculatorUsage } from "../utils/analytics";
import MathView from "../components/MathView";
import WorkingSteps from "../components/WorkingSteps";
import Breadcrumbs from "../components/Breadcrumbs";
import FormulaCard from "../components/FormulaCard";
import SEO from "../components/SEO";

export function FormulaPage() {
  const { formulaId } = useParams<{ formulaId: string }>();

  const formula = formulas.find((item) => item.id === formulaId);

  const getInitialValues = () => {
    const initial: Record<string, string> = {};
    if (formula) {
      for (const variable of formula.variables) {
        if (variable.defaultValue) {
          initial[variable.id] = variable.defaultValue;
        }
      }
    }
    return initial;
  };

  const [values, setValues] = useState<Record<string, string>>(getInitialValues);
  const [result, setResult] = useState("");
  const [solvedSymbol, setSolvedSymbol] = useState("");
  const [solvedValue, setSolvedValue] = useState("");
  const [solvedUnit, setSolvedUnit] = useState("");
  const [working, setWorking] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [prevId, setPrevId] = useState(formulaId);

  // Sync state when navigating between different formulas
  if (formulaId !== prevId) {
    setPrevId(formulaId);
    setValues(getInitialValues());
    setResult("");
    setSolvedSymbol("");
    setSolvedValue("");
    setSolvedUnit("");
    setWorking([]);
    setError("");
  }

  if (!formula) {
    return (
      <main className="formula-page not-found">
        <SEO title="Calculator Not Found" description="The requested STEM calculator could not be found." />
        <div className="not-found-container">
          <h1>Calculator Not Found</h1>
          <p>We could not find a calculator with ID &ldquo;{formulaId}&rdquo;.</p>
          <Link to="/formulas" className="primary-button">
            &larr; Back to Formula Library
          </Link>
        </div>
      </main>
    );
  }

  const subject = getSubjectById(formula.subjectId || "physics");
  const topic = getTopicByIdOrSlug(formula.topicId || formula.topic);
  const related = getRelatedFormulas(formula, 3);

  const updateValue = (id: string, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [id]: value,
    }));

    setResult("");
    setSolvedSymbol("");
    setSolvedValue("");
    setSolvedUnit("");
    setWorking([]);
    setError("");
  };

  const clearCalculator = () => {
    setValues({});
    setResult("");
    setSolvedSymbol("");
    setSolvedValue("");
    setSolvedUnit("");
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
    setSolvedSymbol("");
    setSolvedValue("");
    setSolvedUnit("");
    setWorking([]);
    setError("");
  };

  const handleCalculate = () => {
    setError("");

    const outcome = calculateFormula(formula, values);

    if (!outcome.success) {
      setError(outcome.error);
      setResult("");
      setSolvedSymbol("");
      setSolvedValue("");
      setSolvedUnit("");
      setWorking([]);
      return;
    }

    const unitSuffix = outcome.unit ? ` ${outcome.unit}` : "";
    setSolvedSymbol(outcome.variableSymbol);
    setSolvedValue(outcome.formattedAnswer);
    setSolvedUnit(outcome.unit);
    setResult(`${outcome.variableSymbol} = ${outcome.formattedAnswer}${unitSuffix}`);
    setWorking(outcome.steps);

    // Track analytics
    trackCalculatorUsage(formula.id, formula.name, formula.subjectId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCalculate();
    }
  };

  const hasConstants = formula.variables.some((v) => v.isConstant || v.defaultValue);

  return (
    <main className="formula-page">
      <SEO
        title={`${formula.name} Calculator & Step-by-Step Solver`}
        description={`Calculate ${formula.name} (${formula.variables.map((v) => v.symbol).join(", ")}) using formula ${formula.equation}. Step-by-step rearranging, substitute values, standard units, and full working.`}
        canonicalPath={`/formulas/${formula.id}`}
        keywords={[
          formula.name,
          `${formula.name} calculator`,
          formula.topic,
          `${subject?.name || "STEM"} calculator`,
          ...formula.variables.map((v) => v.name),
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "MathSolver",
          "name": `${formula.name} Calculator`,
          "description": formula.description,
          "equation": formula.equation,
          "educationalLevel": formula.difficulty || "A-Level / High School",
        }}
      />

      <div className="formula-page-wrapper">
        <Breadcrumbs
          items={[
            { label: subject?.name || "STEM", path: `/formulas?subject=${formula.subjectId || "physics"}` },
            { label: topic?.name || formula.topic, path: topic ? `/topics/${topic.slug}` : undefined },
            { label: formula.name },
          ]}
        />

        {/* HEADER */}
        <section className="formula-page-header">
          <div className="formula-header-badges">
            <span className="formula-subject-tag">{(formula.subjectId || "physics").toUpperCase()}</span>
            {topic && (
              <Link to={`/topics/${topic.slug}`} className="formula-topic-tag">
                {topic.name}
              </Link>
            )}
          </div>

          <h1>{formula.name}</h1>

          <div className="formula-page-equation">
            <MathView math={formula.equation} block={true} />
          </div>

          <p className="formula-page-description">{formula.description}</p>
        </section>

        {/* INTERACTIVE CALCULATOR */}
        <section className="interactive-calculator" aria-labelledby="calc-heading">
          <div className="calculator-heading">
            <p className="eyebrow">INTERACTIVE SOLVER</p>
            <h2 id="calc-heading">Enter Known Values</h2>
            <p className="calculator-instructions">
              Fill in the known values and leave the single variable you want to solve for blank.
            </p>
          </div>

          <div className="calculator-form" onKeyDown={handleKeyDown}>
            {formula.variables.map((variable) => (
              <div className="calculator-var-row" key={variable.id}>
                <div className="var-info">
                  <span className="var-symbol">
                    <MathView text={variable.symbol} />
                  </span>
                  <span className="var-name">
                    {variable.name}
                    {variable.isConstant && (
                      <span className="var-constant-tag" title="Physical constant (prefilled)">
                        CONSTANT
                      </span>
                    )}
                  </span>
                </div>

                <div className="var-input-container">
                  <input
                    type="text"
                    inputMode="decimal"
                    className="var-input"
                    value={values[variable.id] ?? ""}
                    onChange={(event) => updateValue(variable.id, event.target.value)}
                    placeholder="Leave blank to solve"
                    aria-label={`${variable.name} (${variable.symbol})`}
                  />

                  {variable.unit && (
                    <span className="var-unit">
                      <MathView text={variable.unit} />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div className="calculator-error" role="alert">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* RESULT BOX */}
          {result !== "" && (
            <div className="calculation-result" aria-live="polite">
              <div className="result-header">
                <p className="eyebrow">CALCULATED RESULT</p>
              </div>

              <div className="result-value-display">
                <span className="result-symbol">
                  <MathView text={solvedSymbol} /> =
                </span>
                <span className="result-number">{solvedValue}</span>
                {solvedUnit && (
                  <span className="result-unit">
                    <MathView text={solvedUnit} />
                  </span>
                )}
              </div>

              {/* STEP-BY-STEP WORKING WITH KATEX */}
              {working.length > 0 && (
                <div className="result-working-wrapper">
                  <WorkingSteps steps={working} title="Step-by-Step Working & Rearranging" />
                </div>
              )}
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="calculator-actions">
            <button
              type="button"
              className="calculate-button"
              onClick={handleCalculate}
            >
              Calculate Solution &rarr;
            </button>

            <button
              type="button"
              className="clear-button"
              onClick={clearCalculator}
            >
              Clear Values
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

        {/* EDUCATIONAL NOTES & ASSUMPTIONS */}
        {(formula.notes || formula.assumptions) && (
          <section className="formula-notes-section">
            {formula.notes && formula.notes.length > 0 && (
              <div className="notes-box">
                <h3>📌 Key Notes & Conditions</h3>
                <ul>
                  {formula.notes.map((note, idx) => (
                    <li key={idx}>
                      <MathView text={note} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {formula.assumptions && formula.assumptions.length > 0 && (
              <div className="notes-box assumptions-box">
                <h3>⚖️ Physical Assumptions</h3>
                <ul>
                  {formula.assumptions.map((asm, idx) => (
                    <li key={idx}>
                      <MathView text={asm} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* RELATED CALCULATORS SECTION */}
        {related.length > 0 && (
          <section className="related-calculators-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">RELATED TOOLS</p>
                <h2>Related Calculators</h2>
              </div>
            </div>

            <div className="formula-list">
              {related.map((rel) => (
                <FormulaCard key={rel.id} formula={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default FormulaPage;