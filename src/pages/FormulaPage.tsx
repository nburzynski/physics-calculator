import { Link, useParams } from "react-router-dom";
import { formulas, getRelatedFormulas } from "../data/formulas";
import { getSubjectById } from "../data/subjects";
import { getTopicByIdOrSlug } from "../data/topics";
import MathView from "../components/MathView";
import Breadcrumbs from "../components/Breadcrumbs";
import FormulaCard from "../components/FormulaCard";
import SEO from "../components/SEO";
import FormulaCalculator from "../components/FormulaCalculator";
import { getWorkedExample } from "../utils/workedExamples";

function cleanEquationForMeta(eq: string): string {
  return eq
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "($1)/($2)")
    .replace(/\\left\(/g, "(")
    .replace(/\\right\)/g, ")")
    .replace(/\\pm/g, "±")
    .replace(/\\times/g, "×")
    .replace(/\\cdot/g, "·")
    .replace(/\\Delta/g, "Δ")
    .replace(/\\lambda/g, "λ")
    .replace(/\\theta/g, "θ")
    .replace(/\\omega/g, "ω")
    .replace(/\\pi/g, "π")
    .replace(/\\varepsilon/g, "ε")
    .replace(/\\epsilon/g, "ε")
    .replace(/\\sigma/g, "σ")
    .replace(/\\rho/g, "ρ")
    .replace(/\\sqrt\{([^}]+)\}/g, "√($1)")
    .replace(/\\overline\{([^}]+)\}/g, "$1")
    .replace(/\\text\{([^}]+)\}/g, "$1")
    .replace(/\\mathbf\{([^}]+)\}/g, "$1")
    .replace(/\\/g, "")
    .replace(/\{|\}/g, "")
    .trim();
}

export function FormulaPage() {
  const { formulaId } = useParams<{ formulaId: string }>();

  const formula = formulas.find((item) => item.id === formulaId);

  if (!formula) {
    return (
      <main className="formula-page not-found">
        <SEO
          title="Calculator Not Found"
          description="The requested STEM calculator could not be found."
        />
        <div className="not-found-container">
          <h1>Calculator Not Found</h1>
          <p>We could not find a calculator matching &ldquo;{formulaId}&rdquo;.</p>
          <Link to="/formulas" className="primary-button">
            &larr; Back to Formula Library
          </Link>
        </div>
      </main>
    );
  }

  const subject = getSubjectById(formula.subjectId || "physics");
  const topic = getTopicByIdOrSlug(formula.topicId || formula.topic);
  const related = getRelatedFormulas(formula, 4);
  const workedExample = getWorkedExample(formula);

  // SEO title & meta description (prioritising custom SEO if set)
  const seoTitle = formula.seoTitle || `${formula.name} Calculator | ${formula.variables.map((v) => v.symbol).join(", ")}`;
  const cleanEq = cleanEquationForMeta(formula.equation);
  const seoDescription = formula.seoDescription || `Calculate ${formula.name} (${formula.variables.map((v) => v.symbol).join(", ")}) using equation ${cleanEq}. Step-by-step rearranging, variable substitutions, standard SI units, and worked examples.`;

  return (
    <main className="formula-page">
      <SEO
        title={seoTitle}
        description={seoDescription}
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
            { label: `${formula.name} Calculator` },
          ]}
        />

        {/* HEADER SECTION */}
        <section className="formula-page-header">
          <div className="formula-header-badges">
            <span className="formula-subject-tag">{(formula.subjectId || "physics").toUpperCase()}</span>
            {topic && (
              <Link to={`/topics/${topic.slug}`} className="formula-topic-tag">
                {topic.name}
              </Link>
            )}
            {formula.difficulty && (
              <span className="formula-difficulty-tag">{formula.difficulty}</span>
            )}
          </div>

          <h1>{formula.name} Calculator</h1>

          <div className="formula-page-equation">
            <MathView math={formula.equation} block={true} />
          </div>

          <p className="formula-page-description">{formula.description}</p>
        </section>

        {/* INTEGRATED MATHEMATICAL FORMULA & CALCULATOR */}
        <div id={formula.id} className="formula-calculator-anchor-wrap">
          <FormulaCalculator formula={formula} />
        </div>

        {/* WORKED EXAMPLE SECTION */}
        <section className="worked-example-section" id="worked-example" aria-labelledby="worked-example-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">STEP-BY-STEP EXAMPLE</p>
              <h2 id="worked-example-heading">Worked Example</h2>
            </div>
          </div>

          <div className="worked-example-card">
            <p className="example-problem">
              <strong>Problem:</strong> {workedExample.problemStatement}
            </p>

            <div className="example-steps-grid">
              <div className="example-step-col">
                <span className="step-label">1. Given Quantities</span>
                <ul className="example-given-list">
                  {workedExample.givenValues.map((g, idx) => (
                    <li key={idx}>
                      <span className="given-sym"><MathView text={g.symbol} /></span> = {g.value}{g.unit ? ` ${g.unit}` : ""} <span className="given-name">({g.name})</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="example-step-col">
                <span className="step-label">2. Formula &amp; Substitution</span>
                <div className="example-math-block">
                  <div className="example-eq">
                    <MathView math={workedExample.equationUsed} />
                  </div>
                  <div className="example-sub">
                    <MathView text={workedExample.substitution} />
                  </div>
                </div>
              </div>

              <div className="example-step-col">
                <span className="step-label">3. Calculated Result</span>
                <div className="example-answer-box">
                  <span className="answer-target">
                    <MathView text={workedExample.targetVariable.symbol} /> =
                  </span>
                  <span className="answer-val">{workedExample.finalAnswer}</span>
                </div>
              </div>
            </div>

            {workedExample.explanation && (
              <p className="example-note">{workedExample.explanation}</p>
            )}
          </div>
        </section>

        {/* PHYSICAL PRINCIPLES & CONDITIONS */}
        {(formula.notes || formula.assumptions) && (
          <section className="formula-notes-section" id="notes">
            {formula.notes && formula.notes.length > 0 && (
              <div className="notes-box">
                <h3>Calculation Notes &amp; Conditions</h3>
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
                <h3>Physical Assumptions</h3>
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
          <section className="related-calculators-section" id="related-calculators">
            <div className="section-heading">
              <div>
                <p className="eyebrow">INTERNAL REFERENCE</p>
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