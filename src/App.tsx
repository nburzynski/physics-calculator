import FormulaPage from "./pages/FormulaPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import FormulaLibrary from "./pages/FormulaLibrary";
import Calculators from "./pages/Calculators";
import FormulaFinder from "./pages/FormulaFinder";
import SEO from "./components/SEO";
import "./App.css";

function Home() {
  return (
    <main>
      <SEO
        title="OCR A-Level Physics Calculators & Formula Library"
        description="Free online formulas, universal SUVAT solver, circuit analyzer, and step-by-step physics calculators for OCR A-Level Physics."
        canonicalPath="/"
        keywords={[
          "OCR A-Level Physics",
          "physics calculator",
          "A-Level physics revision",
          "SUVAT solver",
          "physics formula finder",
        ]}
      />

      <section className="hero">
        <p className="eyebrow">A-LEVEL PHYSICS</p>

        <h1>A-Level Physics</h1>

        <p className="hero-description">
          A collection of formulas, calculators and reference material for
          A-Level Physics.
        </p>

        <div className="hero-actions">
          <Link to="/formulas" className="primary-button" style={{ textDecoration: "none", display: "inline-block" }}>
            Browse formulas
          </Link>
          <Link to="/calculators" className="secondary-button" style={{ textDecoration: "none", display: "inline-block" }}>
            Open calculators
          </Link>
        </div>
      </section>

      <section className="feature-section">
        <Link to="/formulas" className="feature" style={{ textDecoration: "none", color: "inherit" }}>
          <span>01</span>
          <h2>Formula Library</h2>
          <p>
            Browse A-Level Physics formulas organised by topic and exam board.
          </p>
        </Link>

        <Link to="/calculators" className="feature" style={{ textDecoration: "none", color: "inherit" }}>
          <span>02</span>
          <h2>Calculators</h2>
          <p>
            Dedicated exam solvers including the Universal SUVAT and Circuit Studio.
          </p>
        </Link>

        <Link to="/formula-finder" className="feature" style={{ textDecoration: "none", color: "inherit" }}>
          <span>03</span>
          <h2>Formula Finder</h2>
          <p>
            Input what values you have and instantly find the right equation to use.
          </p>
        </Link>
      </section>

      <section className="topics-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FORMULA LIBRARY</p>
            <h2>Browse by topic</h2>
          </div>

          <Link to="/formulas" className="text-button" style={{ textDecoration: "none" }}>
            View all topics →
          </Link>
        </div>

        <div className="topics-grid">
          <Link to="/formulas" className="topic-card" style={{ textDecoration: "none" }}>
            <span className="topic-number">01</span>
            <div>
              <h3>Mechanics</h3>
              <p>Motion, forces, momentum and energy.</p>
            </div>
            <span className="topic-arrow">→</span>
          </Link>

          <Link to="/formulas" className="topic-card" style={{ textDecoration: "none" }}>
            <span className="topic-number">02</span>
            <div>
              <h3>Electricity</h3>
              <p>Current, voltage, resistance and circuits.</p>
            </div>
            <span className="topic-arrow">→</span>
          </Link>

          <Link to="/formulas" className="topic-card" style={{ textDecoration: "none" }}>
            <span className="topic-number">03</span>
            <div>
              <h3>Waves</h3>
              <p>Wave properties, interference and diffraction.</p>
            </div>
            <span className="topic-arrow">→</span>
          </Link>

          <Link to="/formulas" className="topic-card" style={{ textDecoration: "none" }}>
            <span className="topic-number">04</span>
            <div>
              <h3>Materials</h3>
              <p>Density, stress, strain and material properties.</p>
            </div>
            <span className="topic-arrow">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formulas" element={<FormulaLibrary />} />
          <Route path="/formulas/:formulaId" element={<FormulaPage />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/formula-finder" element={<FormulaFinder />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;