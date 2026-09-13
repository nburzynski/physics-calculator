import FormulaCard from "../components/FormulaCard";
import { formulas } from "../data/formulas";
import SEO from "../components/SEO";

function FormulaLibrary() {
  const topics = [
    "Foundations of Physics",
    "Forces and Motion",
    "Electrons, Waves and Photons",
    "Newtonian World and Astrophysics",
    "Particles and Medical Physics",
  ];

  return (
    <main className="formula-library-page">
      <SEO
        title="A-Level Physics Formula Library | 92 OCR Formulas & Equations"
        description="Complete reference library of all 92 OCR A-Level Physics formulas across Foundations, Forces and Motion, Electrons and Waves, Newtonian Astrophysics, and Medical Physics."
        canonicalPath="/formulas"
        keywords={[
          "OCR A level physics formulas",
          "OCR physics equation sheet",
          "physics data booklet formulas",
          "A level physics revision notes",
        ]}
      />

      <section className="library-header">
        <p className="eyebrow">FORMULA LIBRARY</p>

        <h1>A-Level Physics formulas</h1>

        <p>
          Browse formulas by topic. Select a formula to view its calculator
          and reference information.
        </p>
      </section>

      {topics.map((topic) => {
        const topicFormulas = formulas.filter(
          (formula) => formula.topic === topic
        );

        if (topicFormulas.length === 0) {
          return null;
        }

        return (
          <section key={topic} className="formula-list-section">
            <div className="library-section-heading">
              <span>{topic.toUpperCase()}</span>

              <span>
                {topicFormulas.length}{" "}
                {topicFormulas.length === 1 ? "FORMULA" : "FORMULAS"}
              </span>
            </div>

            <div className="formula-list">
              {topicFormulas.map((formula) => (
                <FormulaCard key={formula.id} formula={formula} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}

export default FormulaLibrary;