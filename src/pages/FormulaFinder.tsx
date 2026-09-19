import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import MathView from "../components/MathView";
import { formulas } from "../data/formulas";
import SEO from "../components/SEO";

// Common physics target quantities for quick selection
const TARGET_QUANTITIES = [
  { label: "Any quantity (Show all)", value: "" },
  { label: "Displacement (s, x)", symbols: ["s", "x", "d"] },
  { label: "Final Velocity (v)", symbols: ["v"] },
  { label: "Initial Velocity (u)", symbols: ["u"] },
  { label: "Acceleration (a)", symbols: ["a"] },
  { label: "Time (t, Δt, T)", symbols: ["t", "Δt", "T"] },
  { label: "Force (F)", symbols: ["F"] },
  { label: "Mass (m, M)", symbols: ["m", "M"] },
  { label: "Energy / Work (E, W)", symbols: ["E", "W"] },
  { label: "Power (P)", symbols: ["P"] },
  { label: "Momentum (p, Δp)", symbols: ["p", "Δp"] },
  { label: "Potential Difference / Voltage (V)", symbols: ["V", "Vout", "V1", "Vs"] },
  { label: "Current (I)", symbols: ["I"] },
  { label: "Resistance (R)", symbols: ["R", "r", "R1", "R2"] },
  { label: "Capacitance (C)", symbols: ["C"] },
  { label: "Wavelength (λ)", symbols: ["λ"] },
  { label: "Frequency (f)", symbols: ["f"] },
  { label: "Refractive Index (n)", symbols: ["n", "n1", "n2"] },
  { label: "Angle (θ, C)", symbols: ["θ", "θ1", "θ2", "C"] },
  { label: "Pressure (p)", symbols: ["p"] },
  { label: "Density (ρ)", symbols: ["ρ"] },
  { label: "Temperature (T, Δθ)", symbols: ["T", "Δθ"] },
  { label: "Radioactive Activity (A)", symbols: ["A"] },
  { label: "Half-Life (t½)", symbols: ["t½"] },
];

// Quick symbol chips organized by domain
const SYMBOL_CATEGORIES = [
  {
    category: "Motion & Mechanics",
    symbols: ["s", "u", "v", "a", "t", "F", "m", "p", "W", "P", "k", "x", "d"],
  },
  {
    category: "Electricity & Circuits",
    symbols: ["V", "I", "R", "r", "Q", "P", "C", "ρ", "L", "A"],
  },
  {
    category: "Waves & Optics",
    symbols: ["f", "λ", "v", "T", "n", "θ", "d", "D", "c"],
  },
  {
    category: "Thermal & Gases",
    symbols: ["p", "V", "T", "n", "N", "k", "R", "m", "c", "Δθ"],
  },
  {
    category: "Quantum & Nuclear",
    symbols: ["E", "h", "f", "λ", "c", "φ", "A", "N", "r0"],
  },
];

export default function FormulaFinder() {
  const [selectedTargetIndex, setSelectedTargetIndex] = useState<number>(0);
  const [selectedSymbols, setSelectedSymbols] = useState<Set<string>>(new Set(["u", "a", "t"]));
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSymbol = (sym: string) => {
    setSelectedSymbols((prev) => {
      const next = new Set(prev);
      if (next.has(sym)) {
        next.delete(sym);
      } else {
        next.add(sym);
      }
      return next;
    });
  };

  const clearAll = () => {
    setSelectedSymbols(new Set());
    setSelectedTargetIndex(0);
    setSearchQuery("");
  };

  // Matching algorithm
  const matches = useMemo(() => {
    const targetFilter = TARGET_QUANTITIES[selectedTargetIndex];
    const targetSymbols = targetFilter?.symbols ?? [];
    const queryWords = searchQuery.toLowerCase().split(/[\s,]+/).filter(Boolean);

    const results = formulas.map((formula) => {
      const formulaSymbols = formula.variables.map((v) => v.symbol);
      const formulaVarNames = formula.variables.map((v) => v.name.toLowerCase());
      const formulaNameLower = formula.name.toLowerCase();
      const topicLower = formula.topic.toLowerCase();

      // 1. Check if formula contains target quantity (if selected)
      let hasTarget = true;
      let targetVariable = "";
      if (targetSymbols.length > 0) {
        hasTarget = formula.variables.some((v) => {
          if (targetSymbols.includes(v.symbol)) {
            targetVariable = v.symbol;
            return true;
          }
          return false;
        });
      }

      if (!hasTarget) {
        return null;
      }

      // 2. Count matched known variables
      const matchedVars: string[] = [];
      const missingVars: string[] = [];

      for (const variable of formula.variables) {
        const isTarget = targetSymbols.includes(variable.symbol);
        const isKnown = selectedSymbols.has(variable.symbol);

        if (isKnown && !isTarget) {
          matchedVars.push(variable.symbol);
        } else if (!isTarget) {
          missingVars.push(variable.symbol);
        }
      }

      // 3. Search query relevance
      let queryMatchBonus = 0;
      if (queryWords.length > 0) {
        for (const word of queryWords) {
          if (formulaNameLower.includes(word) || topicLower.includes(word)) {
            queryMatchBonus += 2;
          }
          if (formulaSymbols.some((s) => s.toLowerCase() === word)) {
            queryMatchBonus += 3;
          }
          if (formulaVarNames.some((n) => n.includes(word))) {
            queryMatchBonus += 1;
          }
        }
      }

      // Calculate completeness
      const totalVars = formula.variables.length;
      const isSolvableNow =
        (matchedVars.length === totalVars - 1 && targetVariable !== "") ||
        (matchedVars.length === totalVars - 1 && targetSymbols.length === 0) ||
        (missingVars.length === 0 && matchedVars.length >= 2);

      const score = matchedVars.length * 10 + (isSolvableNow ? 50 : 0) + queryMatchBonus;

      if (score === 0 && selectedSymbols.size > 0 && queryWords.length === 0) {
        return null;
      }

      return {
        formula,
        matchedVars,
        missingVars,
        targetVariable: targetVariable || (missingVars.length === 1 ? missingVars[0] : ""),
        isSolvableNow,
        score,
      };
    });

    const filtered = results.filter((r): r is NonNullable<typeof r> => r !== null);

    // Sort: Solvable now first, then by score descending
    return filtered.sort((a, b) => {
      if (a.isSolvableNow && !b.isSolvableNow) return -1;
      if (!a.isSolvableNow && b.isSolvableNow) return 1;
      return b.score - a.score;
    });
  }, [selectedSymbols, selectedTargetIndex, searchQuery]);

  const solvableCount = matches.filter((m) => m.isSolvableNow).length;

  return (
    <main className="formula-finder-page">
      <SEO
        title="A-Level Physics Formula Finder | Find Equations from Known Values"
        description="Stuck on a physics problem? Enter the values you know to instantly find the exact OCR A-Level Physics formula to use, with step-by-step calculator access."
        canonicalPath="/formula-finder"
        keywords={[
          "physics formula finder",
          "which physics equation to use",
          "OCR A level formula finder",
          "suvat formula chooser",
          "physics equation matcher",
        ]}
      />

      <section className="library-header">
        <p className="eyebrow">FORMULA FINDER</p>
        <h1>Find the right formula</h1>
        <p>
          Not sure which equation to use? Select what you want to calculate and
          choose the variables you know. We’ll show you the exact formula and
          step-by-step solver.
        </p>
      </section>

      <section className="finder-controls-card">
        <div className="finder-controls-grid">
          {/* 1. Target Selector */}
          <div className="finder-control-group">
            <label htmlFor="target-select">1. What are you trying to calculate?</label>
            <select
              id="target-select"
              className="finder-select"
              value={selectedTargetIndex}
              onChange={(e) => setSelectedTargetIndex(Number(e.target.value))}
            >
              {TARGET_QUANTITIES.map((item, idx) => (
                <option key={idx} value={idx}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Text Search */}
          <div className="finder-control-group">
            <label htmlFor="search-input">Search by topic or keyword</label>
            <input
              id="search-input"
              type="text"
              className="finder-text-input"
              placeholder="e.g. SUVAT, potential divider, energy, u, a, t..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* 3. Clickable Known Variable Chips */}
        <div className="finder-chips-section">
          <div className="finder-chips-header">
            <p className="finder-chips-title">
              2. Select known variables you have: (click to toggle)
            </p>
            {(selectedSymbols.size > 0 || selectedTargetIndex !== 0 || searchQuery !== "") && (
              <button type="button" className="finder-clear-btn" onClick={clearAll}>
                Reset all filters
              </button>
            )}
          </div>

          {SYMBOL_CATEGORIES.map((cat) => (
            <div className="symbol-cat-row" key={cat.category}>
              <span className="cat-name">{cat.category}:</span>
              <div className="chip-list">
                {cat.symbols.map((sym) => {
                  const isSelected = selectedSymbols.has(sym);
                  return (
                    <button
                      type="button"
                      key={sym}
                      className={`symbol-chip ${isSelected ? "active" : ""}`}
                      onClick={() => toggleSymbol(sym)}
                      title={`Toggle ${sym}`}
                    >
                      {sym}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Results Header */}
      <section className="finder-results-section">
        <div className="library-section-heading">
          <span>
            MATCHING FORMULAS ({matches.length})
            {solvableCount > 0 && (
              <span className="solvable-tag"> — {solvableCount} SOLVABLE RIGHT NOW</span>
            )}
          </span>
          <span>OCR PHYSICS A-LEVEL</span>
        </div>

        {matches.length === 0 ? (
          <div className="finder-no-results">
            <h3>No formulas found matching this combination</h3>
            <p>Try clearing some filters or selecting different known variables.</p>
            <button type="button" className="primary-button" onClick={clearAll}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="finder-results-grid">
            {matches.map(({ formula, matchedVars, missingVars, targetVariable, isSolvableNow }) => (
              <article
                key={formula.id}
                className={`finder-card ${isSolvableNow ? "solvable-highlight" : ""}`}
              >
                <div className="finder-card-header">
                  <span className="finder-topic">{formula.topic}</span>
                  {isSolvableNow && (
                    <span className="badge-solvable">✨ SOLVABLE NOW</span>
                  )}
                </div>

                <h2 className="finder-card-title">{formula.name}</h2>

                <div className="finder-card-math">
                  <MathView math={formula.equation} block={true} />
                </div>

                <p className="finder-card-desc">{formula.description}</p>

                {/* Variable matching status */}
                <div className="var-match-status">
                  <div className="status-row">
                    <span className="status-label">Known:</span>
                    <div className="badge-row">
                      {matchedVars.length > 0 ? (
                        matchedVars.map((s) => (
                          <span key={s} className="tag tag-matched">
                            ✓ {s}
                          </span>
                        ))
                      ) : (
                        <span className="tag-none">None selected</span>
                      )}
                    </div>
                  </div>

                  {targetVariable && (
                    <div className="status-row">
                      <span className="status-label">Solving for:</span>
                      <span className="tag tag-target">🎯 {targetVariable}</span>
                    </div>
                  )}

                  {missingVars.length > 0 && !isSolvableNow && (
                    <div className="status-row">
                      <span className="status-label">Still needed:</span>
                      <div className="badge-row">
                        {missingVars.map((s) => (
                          <span key={s} className="tag tag-missing">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  to={`/formulas/${formula.id}`}
                  className={`finder-open-btn ${isSolvableNow ? "btn-solvable" : ""}`}
                >
                  {isSolvableNow ? "Open & Calculate Now →" : "View Calculator →"}
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
