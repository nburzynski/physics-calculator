import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import FormulaCard from "../components/FormulaCard";
import { formulas } from "../data/formulas";
import { SUBJECTS } from "../data/subjects";
import { TOPICS } from "../data/topics";
import Breadcrumbs from "../components/Breadcrumbs";
import SEO from "../components/SEO";
import type { SubjectId } from "../types/stem";

export function FormulaLibrary() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSubjectParam = searchParams.get("subject") as SubjectId | null;
  const activeTopicParam = searchParams.get("topic");

  const [selectedSubject, setSelectedSubject] = useState<SubjectId | "all">(
    activeSubjectParam || "all"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubjectChange = (subj: SubjectId | "all") => {
    setSelectedSubject(subj);
    if (subj === "all") {
      searchParams.delete("subject");
    } else {
      searchParams.set("subject", subj);
    }
    setSearchParams(searchParams);
  };

  // Grouped topics with formulas
  const displayedTopicSections = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    // Filter topics by subject
    const relevantTopics = TOPICS.filter((t) => {
      if (selectedSubject !== "all" && t.subjectId !== selectedSubject) return false;
      if (activeTopicParam && t.slug !== activeTopicParam && t.id !== activeTopicParam) return false;
      return true;
    });

    return relevantTopics
      .map((topic) => {
        const topicFormulas = formulas.filter((f) => {
          const isTopicMatch =
            f.topicId === topic.id ||
            f.topic === topic.name ||
            f.topic.toLowerCase() === topic.name.toLowerCase();

          if (!isTopicMatch) return false;

          if (!term) return true;

          // Search term matching
          const matchName = f.name.toLowerCase().includes(term);
          const matchDesc = f.description.toLowerCase().includes(term);
          const matchEq = f.equation.toLowerCase().includes(term);
          const matchVars = f.variables.some(
            (v) =>
              v.name.toLowerCase().includes(term) ||
              v.symbol.toLowerCase() === term
          );
          const matchKeywords = f.keywords?.some((k) => k.toLowerCase().includes(term));

          return matchName || matchDesc || matchEq || matchVars || matchKeywords;
        });

        return {
          topic,
          formulas: topicFormulas,
        };
      })
      .filter((section) => section.formulas.length > 0);
  }, [selectedSubject, activeTopicParam, searchTerm]);

  const totalDisplayedFormulas = displayedTopicSections.reduce(
    (acc, sec) => acc + sec.formulas.length,
    0
  );

  return (
    <main className="formula-library-page">
      <SEO
        title="STEM Formula Library | 100+ Step-by-Step Physics, Maths & Chemistry Solvers"
        description="Comprehensive reference library of over 100 STEM formulas across Physics, Mathematics, Chemistry, Engineering, and Computer Science with instant interactive solvers."
        canonicalPath="/formulas"
        keywords={[
          "STEM formula library",
          "physics equation sheet",
          "maths formulas",
          "chemistry calculators",
          "engineering equations",
          "OCR A level physics formulas",
        ]}
      />

      <div className="library-container">
        <Breadcrumbs items={[{ label: "Formula Library" }]} />

        <section className="library-header">
          <p className="eyebrow">FORMULA DIRECTORY</p>
          <h1>STEM Formula Library</h1>
          <p>
            Browse all {formulas.length} formulas across STEM subjects. Filter by subject
            or search by keyword/variable to open any equation solver.
          </p>

          {/* Search & Subject Bar */}
          <div className="library-controls-bar">
            <div className="library-search-input-wrap">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="library-search-input"
                placeholder="Filter formulas by name, variable (e.g. 'SUVAT', 'quadratic', 'v', 'u', 'momentum')..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchTerm("")}
                >
                  ✕
                </button>
              )}
            </div>

            <div className="subject-filter-bar">
              <button
                type="button"
                className={`subject-pill ${selectedSubject === "all" ? "active" : ""}`}
                onClick={() => handleSubjectChange("all")}
              >
                All Subjects ({formulas.length})
              </button>
              {SUBJECTS.map((sub) => {
                const count = formulas.filter((f) => f.subjectId === sub.id).length;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    className={`subject-pill ${selectedSubject === sub.id ? "active" : ""}`}
                    onClick={() => handleSubjectChange(sub.id)}
                  >
                    <span className="pill-icon">{sub.icon}</span> {sub.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* TOPICS & FORMULAS SECTIONS */}
        {displayedTopicSections.length === 0 ? (
          <div className="library-no-results">
            <h3>No formulas found matching your filter</h3>
            <p>Try clearing your search term or selecting &ldquo;All Subjects&rdquo;.</p>
            <button
              type="button"
              className="primary-button"
              onClick={() => {
                setSearchTerm("");
                handleSubjectChange("all");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          displayedTopicSections.map(({ topic, formulas: topicFormulas }) => (
            <section key={topic.id} className="formula-list-section">
              <div className="library-section-heading">
                <div className="section-title-wrap">
                  <span className="section-topic-icon">{topic.icon}</span>
                  <Link to={`/topics/${topic.slug}`} className="section-topic-link">
                    {topic.name.toUpperCase()}
                  </Link>
                  <span className="section-subject-tag">{topic.subjectId.toUpperCase()}</span>
                </div>

                <div className="section-count-wrap">
                  <Link to={`/topics/${topic.slug}`} className="view-topic-guide-link">
                    Topic Guide &rarr;
                  </Link>
                  <span className="formula-count-badge">
                    {topicFormulas.length} {topicFormulas.length === 1 ? "FORMULA" : "FORMULAS"}
                  </span>
                </div>
              </div>

              <div className="formula-list">
                {topicFormulas.map((formula) => (
                  <FormulaCard key={formula.id} formula={formula} />
                ))}
              </div>
            </section>
          ))
        )}

        {searchTerm && displayedTopicSections.length > 0 && (
          <div className="library-results-summary">
            Showing {totalDisplayedFormulas} matching formulas.
          </div>
        )}
      </div>
    </main>
  );
}

export default FormulaLibrary;