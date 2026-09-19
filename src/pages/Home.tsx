import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SUBJECTS } from "../data/subjects";
import { TOPICS } from "../data/topics";
import { formulas, getFormulasByTopic } from "../data/formulas";
import SEO from "../components/SEO";
import SearchModal from "../components/SearchModal";
import MathView from "../components/MathView";
import type { SubjectId } from "../types/stem";

export function Home() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | "all">("all");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Compute topic list with dynamic formula counts
  const topicsWithCounts = useMemo(() => {
    return TOPICS.map((topic) => {
      const topicFormulas = getFormulasByTopic(topic.id);
      return {
        ...topic,
        formulaCount: topicFormulas.length,
      };
    });
  }, []);

  const filteredTopics = useMemo(() => {
    if (selectedSubject === "all") return topicsWithCounts;
    return topicsWithCounts.filter((t) => t.subjectId === selectedSubject);
  }, [selectedSubject, topicsWithCounts]);

  const totalCalculators = formulas.length;

  return (
    <main className="home-page">
      <SEO
        title="STEMCalculate | Free Step-by-Step STEM Solvers & Formula Library"
        description="Comprehensive STEM calculation platform with step-by-step solvers for Physics, Mathematics, Chemistry, and Engineering. Universal SUVAT solver, formula finder, and exam calculators."
        canonicalPath="/"
        keywords={[
          "STEM calculator",
          "physics calculator",
          "maths calculator",
          "chemistry calculator",
          "engineering calculator",
          "SUVAT solver",
          "formula finder",
          "step by step physics solver",
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "STEMCalculate",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "All",
          "description": "Interactive STEM calculation platform and formula library with step-by-step mathematical working.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "GBP",
          },
        }}
      />

      {/* HERO SECTION */}
      <section className="hero">
        <p className="eyebrow">UNIVERSAL STEM CALCULATION PLATFORM</p>

        <h1>General STEM Solvers & Formula Library</h1>

        <p className="hero-description">
          Step-by-step calculations and reference formulas for Physics, Mathematics,
          Chemistry, Engineering, and Computer Science &mdash; from school to university.
        </p>

        {/* Global Search Bar in Hero */}
        <div className="hero-search-container" onClick={() => setIsSearchOpen(true)}>
          <span className="hero-search-icon">🔍</span>
          <input
            type="text"
            readOnly
            className="hero-search-input"
            placeholder="Search all 100+ calculators, topics, formulas (e.g. SUVAT, quadratic, momentum)..."
          />
          <kbd className="hero-search-kbd">⌘K</kbd>
        </div>

        <div className="hero-actions">
          <Link to="/formulas" className="primary-button">
            Browse All {totalCalculators} Formulas
          </Link>
          <Link to="/calculators" className="secondary-button">
            Open Interactive Solvers
          </Link>
          <Link to="/formula-finder" className="secondary-button">
            Formula Finder
          </Link>
        </div>
      </section>

      {/* CORE PLATFORM FEATURES */}
      <section className="feature-section" aria-label="Key features">
        <Link to="/formulas" className="feature">
          <span>01</span>
          <h2>Formula Library</h2>
          <p>
            Browse {totalCalculators} formulas organised by subject and topic with full LaTeX equations and notes.
          </p>
        </Link>

        <Link to="/calculators" className="feature">
          <span>02</span>
          <h2>Interactive Solvers</h2>
          <p>
            Dedicated multi-variable studios including the Universal SUVAT Solver and Potential Divider Studio.
          </p>
        </Link>

        <Link to="/formula-finder" className="feature">
          <span>03</span>
          <h2>Formula Finder</h2>
          <p>
            Input known quantities to instantly find the exact equation and step-by-step solver to use.
          </p>
        </Link>
      </section>

      {/* BROWSE BY TOPIC SECTION (DYNAMIC & SCALABLE) */}
      <section className="topics-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">TOPIC REFERENCE</p>
            <h2>Browse by Topic</h2>
          </div>

          <Link to="/formulas" className="text-button">
            View all formulas &rarr;
          </Link>
        </div>

        {/* Subject Filter Pills */}
        <div className="subject-filter-bar">
          <button
            type="button"
            className={`subject-pill ${selectedSubject === "all" ? "active" : ""}`}
            onClick={() => setSelectedSubject("all")}
          >
            All Subjects ({totalCalculators})
          </button>
          {SUBJECTS.map((sub) => {
            const count = formulas.filter((f) => f.subjectId === sub.id).length;
            return (
              <button
                key={sub.id}
                type="button"
                className={`subject-pill ${selectedSubject === sub.id ? "active" : ""}`}
                onClick={() => setSelectedSubject(sub.id)}
              >
                <span className="pill-icon">{sub.icon}</span> {sub.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Dynamic Topics Grid */}
        <div className="topics-grid">
          {filteredTopics.map((topic, index) => {
            const numStr = (index + 1).toString().padStart(2, "0");
            return (
              <Link
                key={topic.id}
                to={`/topics/${topic.slug}`}
                className="topic-card"
                style={{ textDecoration: "none" }}
              >
                <span className="topic-number">{numStr}</span>
                <div className="topic-card-content">
                  <div className="topic-card-title-row">
                    <span className="topic-icon">{topic.icon}</span>
                    <h3>{topic.name}</h3>
                  </div>
                  <p>{topic.description}</p>
                  <div className="topic-card-meta">
                    <span className="topic-count-tag">
                      {topic.formulaCount} {topic.formulaCount === 1 ? "Calculator" : "Calculators"}
                    </span>
                    <span className="topic-subject-tag">{topic.subjectId.toUpperCase()}</span>
                  </div>
                </div>
                <span className="topic-arrow">&rarr;</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED MULTI-STEP SOLVERS */}
      <section className="featured-solvers-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FEATURED TOOLS</p>
            <h2>Master Interactive Studios</h2>
          </div>

          <Link to="/calculators" className="text-button">
            View all solvers &rarr;
          </Link>
        </div>

        <div className="featured-tools-grid">
          <div className="featured-tool-card">
            <div className="tool-card-icon">🚀</div>
            <h3>Universal SUVAT Solver</h3>
            <p>
              Enter <strong>any 3</strong> known kinematic values and instantly solve the remaining 2 with full step-by-step working.
            </p>
            <Link to="/calculators" className="tool-card-btn">
              Launch SUVAT Solver &rarr;
            </Link>
          </div>

          <div className="featured-tool-card">
            <div className="tool-card-icon">⚛️</div>
            <h3>Quantum & Photon Converter</h3>
            <p>
              Interchange wavelength (&lambda;), frequency (f), energy in Joules (J), and electron-volts (eV) seamlessly.
            </p>
            <Link to="/calculators" className="tool-card-btn">
              Launch Quantum Studio &rarr;
            </Link>
          </div>

          <div className="featured-tool-card">
            <div className="tool-card-icon">⚡</div>
            <h3>Potential Divider Studio</h3>
            <p>
              Analyze series resistor circuits, calculate output voltage <MathView text="$V_{out}$" />, current, and component power dissipation.
            </p>
            <Link to="/calculators" className="tool-card-btn">
              Launch Circuit Studio &rarr;
            </Link>
          </div>

          <div className="featured-tool-card">
            <div className="tool-card-icon">🔢</div>
            <h3>Quadratic Equation Solver</h3>
            <p>
              Calculate real and complex roots of <MathView text="$ax^2 + bx + c = 0$" /> with discriminant analysis and step-by-step working.
            </p>
            <Link to="/formulas/quadratic-formula" className="tool-card-btn">
              Launch Quadratic Solver &rarr;
            </Link>
          </div>
        </div>
      </section>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </main>
  );
}

export default Home;
