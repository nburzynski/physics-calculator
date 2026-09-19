import { useParams, Link } from "react-router-dom";
import { getTopicByIdOrSlug, TOPICS } from "../data/topics";
import { getFormulasByTopic } from "../data/formulas";
import { getSubjectById } from "../data/subjects";
import FormulaCard from "../components/FormulaCard";
import Breadcrumbs from "../components/Breadcrumbs";
import MathView from "../components/MathView";
import SEO from "../components/SEO";

export function TopicPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();

  const topic = getTopicByIdOrSlug(topicSlug ?? "");

  if (!topic) {
    return (
      <main className="topic-not-found-page">
        <SEO title="Topic Not Found" description="The requested STEM topic could not be found." />
        <div className="not-found-container">
          <h1>Topic Not Found</h1>
          <p>We couldn&apos;t find the topic &ldquo;{topicSlug}&rdquo; in our registry.</p>
          <Link to="/formulas" className="primary-button">
            &larr; Return to Formula Library
          </Link>
        </div>
      </main>
    );
  }

  const subject = getSubjectById(topic.subjectId);
  const topicFormulas = getFormulasByTopic(topic.id);

  const relatedTopics = (topic.relatedTopicIds || [])
    .map((id) => TOPICS.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <main className="topic-landing-page">
      <SEO
        title={`${topic.name} Calculators & Formulas`}
        description={`Explore all ${topicFormulas.length} ${topic.name} calculators and formulas for ${subject?.name || "STEM"}. Step-by-step mathematical working, key equations, and reference guides.`}
        canonicalPath={`/topics/${topic.slug}`}
        keywords={[
          topic.name,
          `${topic.name} formulas`,
          `${topic.name} calculators`,
          subject?.name || "STEM",
          ...(topic.concepts || []),
        ]}
      />

      <div className="topic-page-container">
        <Breadcrumbs
          items={[
            { label: subject?.name || "STEM", path: `/formulas?subject=${topic.subjectId}` },
            { label: topic.name },
          ]}
        />

        {/* Topic Header */}
        <section className="topic-hero">
          <div className="topic-hero-badge-row">
            <span className="topic-subject-badge">{subject?.name.toUpperCase()}</span>
            <span className="topic-count-pill">{topicFormulas.length} Calculators</span>
          </div>

          <div className="topic-title-row">
            <span className="topic-hero-icon">{topic.icon}</span>
            <h1>{topic.name}</h1>
          </div>

          <p className="topic-hero-description">{topic.description}</p>
        </section>

        {/* Key Concepts Box */}
        {topic.concepts && topic.concepts.length > 0 && (
          <section className="topic-concepts-card">
            <div className="concepts-header">
              <span className="concepts-icon">💡</span>
              <h2>Key Concepts in {topic.name}</h2>
            </div>

            <ul className="concepts-list">
              {topic.concepts.map((concept, index) => (
                <li key={index} className="concept-item">
                  <span className="concept-bullet">&bull;</span>
                  <span>{concept}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Calculators in this Topic */}
        <section className="topic-calculators-section">
          <div className="library-section-heading">
            <span>CALCULATORS & FORMULAS ({topicFormulas.length})</span>
            <span>{subject?.name.toUpperCase()}</span>
          </div>

          <div className="formula-list">
            {topicFormulas.map((formula) => (
              <FormulaCard key={formula.id} formula={formula} />
            ))}
          </div>
        </section>

        {/* Quick Equation Cheatsheet */}
        {topicFormulas.length > 0 && (
          <section className="topic-equations-cheatsheet">
            <div className="section-heading">
              <div>
                <p className="eyebrow">QUICK REFERENCE</p>
                <h2>Key Equations Sheet</h2>
              </div>
            </div>

            <div className="equations-grid">
              {topicFormulas.map((f) => (
                <div key={f.id} className="equation-cheat-card">
                  <span className="equation-name">{f.name}</span>
                  <div className="equation-math">
                    <MathView math={f.equation} />
                  </div>
                  <Link to={`/formulas/${f.id}`} className="equation-link">
                    Open Calculator &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Topics */}
        {relatedTopics.length > 0 && (
          <section className="related-topics-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">EXPLORE MORE</p>
                <h2>Related Topics</h2>
              </div>
            </div>

            <div className="related-topics-grid">
              {relatedTopics.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/topics/${rel.slug}`}
                  className="related-topic-card"
                  style={{ textDecoration: "none" }}
                >
                  <span className="rel-icon">{rel.icon}</span>
                  <div className="rel-info">
                    <h4>{rel.name}</h4>
                    <p>{rel.description}</p>
                  </div>
                  <span className="rel-arrow">&rarr;</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default TopicPage;
