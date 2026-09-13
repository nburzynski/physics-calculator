import { useState } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { formulas } from "../data/formulas";
import { calculateFormula, formatPhysicsNumber } from "../utils/calculator";
import { PHYSICS_CONSTANTS } from "../utils/constants";
import SEO from "../components/SEO";

export default function Calculators() {
  const [activeTab, setActiveTab] = useState<"suvat" | "photon" | "divider" | "quick">("suvat");

  // ==========================================
  // TAB 1: UNIVERSAL SUVAT MASTER SOLVER
  // ==========================================
  const [suvatInputs, setSuvatInputs] = useState<{
    s: string;
    u: string;
    v: string;
    a: string;
    t: string;
  }>({
    s: "",
    u: "0",
    v: "",
    a: "9.81",
    t: "3",
  });

  const [suvatResult, setSuvatResult] = useState<{
    solved: { symbol: string; name: string; value: number; unit: string; steps: string[] }[];
    error?: string;
  } | null>(null);

  const handleSuvatSolve = () => {
    const s = suvatInputs.s.trim() !== "" ? Number(suvatInputs.s) : null;
    const u = suvatInputs.u.trim() !== "" ? Number(suvatInputs.u) : null;
    const v = suvatInputs.v.trim() !== "" ? Number(suvatInputs.v) : null;
    const a = suvatInputs.a.trim() !== "" ? Number(suvatInputs.a) : null;
    const t = suvatInputs.t.trim() !== "" ? Number(suvatInputs.t) : null;

    const knownCount = [s, u, v, a, t].filter((x) => x !== null).length;
    if (knownCount !== 3) {
      setSuvatResult({
        solved: [],
        error: `Please provide exactly 3 known values (you currently entered ${knownCount}). Leave the 2 you want to find blank.`,
      });
      return;
    }

    const solvedList: { symbol: string; name: string; value: number; unit: string; steps: string[] }[] = [];

    // Case 1: Known (u, a, t)
    if (u !== null && a !== null && t !== null) {
      const vVal = u + a * t;
      const sVal = u * t + 0.5 * a * t * t;
      solvedList.push({
        symbol: "v",
        name: "Final velocity",
        value: vVal,
        unit: "m/s",
        steps: [
          "Formula: v = u + at",
          `Substitute: v = ${u} + (${a} × ${t})`,
          `Answer: v = ${formatPhysicsNumber(vVal)} m/s`,
        ],
      });
      solvedList.push({
        symbol: "s",
        name: "Displacement",
        value: sVal,
        unit: "m",
        steps: [
          "Formula: s = ut + ½at²",
          `Substitute: s = (${u} × ${t}) + ½ × ${a} × (${t})²`,
          `Answer: s = ${formatPhysicsNumber(sVal)} m`,
        ],
      });
    }
    // Case 2: Known (v, a, t)
    else if (v !== null && a !== null && t !== null) {
      const uVal = v - a * t;
      const sVal = v * t - 0.5 * a * t * t;
      solvedList.push({
        symbol: "u",
        name: "Initial velocity",
        value: uVal,
        unit: "m/s",
        steps: [
          "Formula: u = v - at",
          `Substitute: u = ${v} - (${a} × ${t})`,
          `Answer: u = ${formatPhysicsNumber(uVal)} m/s`,
        ],
      });
      solvedList.push({
        symbol: "s",
        name: "Displacement",
        value: sVal,
        unit: "m",
        steps: [
          "Formula: s = vt - ½at²",
          `Substitute: s = (${v} × ${t}) - ½ × ${a} × (${t})²`,
          `Answer: s = ${formatPhysicsNumber(sVal)} m`,
        ],
      });
    }
    // Case 3: Known (u, v, t)
    else if (u !== null && v !== null && t !== null) {
      if (t === 0) {
        setSuvatResult({ solved: [], error: "Time cannot be zero." });
        return;
      }
      const aVal = (v - u) / t;
      const sVal = 0.5 * (u + v) * t;
      solvedList.push({
        symbol: "a",
        name: "Acceleration",
        value: aVal,
        unit: "m/s²",
        steps: [
          "Formula: a = (v - u) ÷ t",
          `Substitute: a = (${v} - ${u}) ÷ ${t}`,
          `Answer: a = ${formatPhysicsNumber(aVal)} m/s²`,
        ],
      });
      solvedList.push({
        symbol: "s",
        name: "Displacement",
        value: sVal,
        unit: "m",
        steps: [
          "Formula: s = ½(u + v)t",
          `Substitute: s = ½ × (${u} + ${v}) × ${t}`,
          `Answer: s = ${formatPhysicsNumber(sVal)} m`,
        ],
      });
    }
    // Case 4: Known (u, v, a)
    else if (u !== null && v !== null && a !== null) {
      if (a === 0) {
        setSuvatResult({ solved: [], error: "Acceleration cannot be zero for these inputs." });
        return;
      }
      const sVal = (v * v - u * u) / (2 * a);
      const tVal = (v - u) / a;
      solvedList.push({
        symbol: "s",
        name: "Displacement",
        value: sVal,
        unit: "m",
        steps: [
          "Formula: s = (v² - u²) ÷ (2a)",
          `Substitute: s = (${v}² - ${u}²) ÷ (2 × ${a})`,
          `Answer: s = ${formatPhysicsNumber(sVal)} m`,
        ],
      });
      solvedList.push({
        symbol: "t",
        name: "Time",
        value: tVal,
        unit: "s",
        steps: [
          "Formula: t = (v - u) ÷ a",
          `Substitute: t = (${v} - ${u}) ÷ ${a}`,
          `Answer: t = ${formatPhysicsNumber(tVal)} s`,
        ],
      });
    }
    // Case 5: Known (s, u, t)
    else if (s !== null && u !== null && t !== null) {
      if (t === 0) {
        setSuvatResult({ solved: [], error: "Time cannot be zero." });
        return;
      }
      const aVal = (2 * (s - u * t)) / (t * t);
      const vVal = u + aVal * t;
      solvedList.push({
        symbol: "a",
        name: "Acceleration",
        value: aVal,
        unit: "m/s²",
        steps: [
          "Formula: a = 2(s - ut) ÷ t²",
          `Substitute: a = 2(${s} - ${u} × ${t}) ÷ (${t})²`,
          `Answer: a = ${formatPhysicsNumber(aVal)} m/s²`,
        ],
      });
      solvedList.push({
        symbol: "v",
        name: "Final velocity",
        value: vVal,
        unit: "m/s",
        steps: [
          "Formula: v = u + at",
          `Substitute: v = ${u} + (${formatPhysicsNumber(aVal)} × ${t})`,
          `Answer: v = ${formatPhysicsNumber(vVal)} m/s`,
        ],
      });
    }
    // Case 6: Known (s, v, t)
    else if (s !== null && v !== null && t !== null) {
      if (t === 0) {
        setSuvatResult({ solved: [], error: "Time cannot be zero." });
        return;
      }
      const aVal = (2 * (v * t - s)) / (t * t);
      const uVal = v - aVal * t;
      solvedList.push({
        symbol: "u",
        name: "Initial velocity",
        value: uVal,
        unit: "m/s",
        steps: [
          "Formula: u = (2s ÷ t) - v",
          `Substitute: u = (2 × ${s} ÷ ${t}) - ${v}`,
          `Answer: u = ${formatPhysicsNumber(uVal)} m/s`,
        ],
      });
      solvedList.push({
        symbol: "a",
        name: "Acceleration",
        value: aVal,
        unit: "m/s²",
        steps: [
          "Formula: a = (v - u) ÷ t",
          `Substitute: a = (${v} - ${formatPhysicsNumber(uVal)}) ÷ ${t}`,
          `Answer: a = ${formatPhysicsNumber(aVal)} m/s²`,
        ],
      });
    }
    // Case 7: Known (s, a, t)
    else if (s !== null && a !== null && t !== null) {
      if (t === 0) {
        setSuvatResult({ solved: [], error: "Time cannot be zero." });
        return;
      }
      const uVal = (s - 0.5 * a * t * t) / t;
      const vVal = uVal + a * t;
      solvedList.push({
        symbol: "u",
        name: "Initial velocity",
        value: uVal,
        unit: "m/s",
        steps: [
          "Formula: u = (s - ½at²) ÷ t",
          `Substitute: u = (${s} - ½ × ${a} × ${t}²) ÷ ${t}`,
          `Answer: u = ${formatPhysicsNumber(uVal)} m/s`,
        ],
      });
      solvedList.push({
        symbol: "v",
        name: "Final velocity",
        value: vVal,
        unit: "m/s",
        steps: [
          "Formula: v = u + at",
          `Substitute: v = ${formatPhysicsNumber(uVal)} + (${a} × ${t})`,
          `Answer: v = ${formatPhysicsNumber(vVal)} m/s`,
        ],
      });
    }
    // Case 8: Known (s, u, a)
    else if (s !== null && u !== null && a !== null) {
      const vSq = u * u + 2 * a * s;
      if (vSq < 0) {
        setSuvatResult({ solved: [], error: "v² is negative; no real velocity exists." });
        return;
      }
      const vVal = Math.sqrt(vSq);
      const tVal = a !== 0 ? (vVal - u) / a : s / u;
      solvedList.push({
        symbol: "v",
        name: "Final velocity",
        value: vVal,
        unit: "m/s",
        steps: [
          "Formula: v = √(u² + 2as)",
          `Substitute: v = √(${u}² + 2 × ${a} × ${s}) = √(${vSq})`,
          `Answer: v = ${formatPhysicsNumber(vVal)} m/s`,
        ],
      });
      solvedList.push({
        symbol: "t",
        name: "Time",
        value: tVal,
        unit: "s",
        steps: [
          "Formula: t = (v - u) ÷ a",
          `Substitute: t = (${formatPhysicsNumber(vVal)} - ${u}) ÷ ${a}`,
          `Answer: t = ${formatPhysicsNumber(tVal)} s`,
        ],
      });
    }
    // Case 9: Known (s, v, a)
    else if (s !== null && v !== null && a !== null) {
      const uSq = v * v - 2 * a * s;
      if (uSq < 0) {
        setSuvatResult({ solved: [], error: "u² is negative; no real initial velocity exists." });
        return;
      }
      const uVal = Math.sqrt(uSq);
      const tVal = a !== 0 ? (v - uVal) / a : s / v;
      solvedList.push({
        symbol: "u",
        name: "Initial velocity",
        value: uVal,
        unit: "m/s",
        steps: [
          "Formula: u = √(v² - 2as)",
          `Substitute: u = √(${v}² - 2 × ${a} × ${s}) = √(${uSq})`,
          `Answer: u = ${formatPhysicsNumber(uVal)} m/s`,
        ],
      });
      solvedList.push({
        symbol: "t",
        name: "Time",
        value: tVal,
        unit: "s",
        steps: [
          "Formula: t = (v - u) ÷ a",
          `Substitute: t = (${v} - ${formatPhysicsNumber(uVal)}) ÷ ${a}`,
          `Answer: t = ${formatPhysicsNumber(tVal)} s`,
        ],
      });
    }
    // Case 10: Known (s, u, v)
    else if (s !== null && u !== null && v !== null) {
      if (u + v === 0) {
        setSuvatResult({ solved: [], error: "u + v cannot be zero." });
        return;
      }
      const tVal = (2 * s) / (u + v);
      const aVal = (v - u) / tVal;
      solvedList.push({
        symbol: "t",
        name: "Time",
        value: tVal,
        unit: "s",
        steps: [
          "Formula: t = 2s ÷ (u + v)",
          `Substitute: t = (2 × ${s}) ÷ (${u} + ${v})`,
          `Answer: t = ${formatPhysicsNumber(tVal)} s`,
        ],
      });
      solvedList.push({
        symbol: "a",
        name: "Acceleration",
        value: aVal,
        unit: "m/s²",
        steps: [
          "Formula: a = (v - u) ÷ t",
          `Substitute: a = (${v} - ${u}) ÷ ${formatPhysicsNumber(tVal)}`,
          `Answer: a = ${formatPhysicsNumber(aVal)} m/s²`,
        ],
      });
    }

    setSuvatResult({ solved: solvedList });
  };

  // ==========================================
  // TAB 2: QUANTUM & PHOTON CONVERTER
  // ==========================================
  const [photonInputType, setPhotonInputType] = useState<"wavelength" | "frequency" | "joules" | "ev">("wavelength");
  const [photonInputValue, setPhotonInputValue] = useState("500"); // 500 nm default
  const [photonWavelengthUnit, setPhotonWavelengthUnit] = useState<"m" | "nm">("nm");

  const photonResult = (() => {
    const raw = Number(photonInputValue);
    if (!Number.isFinite(raw) || raw <= 0) return null;

    const c = PHYSICS_CONSTANTS.c.value;
    const h = PHYSICS_CONSTANTS.h.value;
    const e = PHYSICS_CONSTANTS.e.value;

    let lambdaM = 0;
    if (photonInputType === "wavelength") {
      lambdaM = photonWavelengthUnit === "nm" ? raw * 1e-9 : raw;
    } else if (photonInputType === "frequency") {
      lambdaM = c / raw;
    } else if (photonInputType === "joules") {
      lambdaM = (h * c) / raw;
    } else if (photonInputType === "ev") {
      const E_j = raw * e;
      lambdaM = (h * c) / E_j;
    }

    if (lambdaM <= 0) return null;

    const freqHz = c / lambdaM;
    const energyJ = (h * c) / lambdaM;
    const energyEv = energyJ / e;

    return {
      wavelengthNm: lambdaM * 1e9,
      wavelengthM: lambdaM,
      freqHz,
      energyJ,
      energyEv,
    };
  })();

  // ==========================================
  // TAB 3: POTENTIAL DIVIDER & CIRCUIT STUDIO
  // ==========================================
  const [vin, setVin] = useState("12");
  const [r1, setR1] = useState("100");
  const [r2, setR2] = useState("200");

  const dividerResult = (() => {
    const vInNum = Number(vin);
    const r1Num = Number(r1);
    const r2Num = Number(r2);

    if (r1Num <= 0 || r2Num <= 0 || !Number.isFinite(vInNum)) return null;

    const totalR = r1Num + r2Num;
    const vOut = (r2Num / totalR) * vInNum;
    const v1 = (r1Num / totalR) * vInNum;
    const current = vInNum / totalR;
    const power1 = current * current * r1Num;
    const power2 = current * current * r2Num;
    const totalPower = current * vInNum;

    return {
      vOut,
      v1,
      totalR,
      current,
      power1,
      power2,
      totalPower,
    };
  })();

  // ==========================================
  // TAB 4: IN-PAGE QUICK FORMULA RUNNER
  // ==========================================
  const [quickFormulaId, setQuickFormulaId] = useState("suvat-velocity");
  const [quickValues, setQuickValues] = useState<Record<string, string>>({
    "initial-velocity": "5",
    "acceleration": "2",
    "time": "4",
    "final-velocity": "",
  });
  const [quickResult, setQuickResult] = useState<string>("");
  const [quickWorking, setQuickWorking] = useState<string[]>([]);
  const [quickError, setQuickError] = useState<string>("");

  const activeQuickFormula = formulas.find((f) => f.id === quickFormulaId) ?? formulas[0];

  const handleQuickFormulaSelect = (id: string) => {
    setQuickFormulaId(id);
    const target = formulas.find((f) => f.id === id);
    if (target) {
      const init: Record<string, string> = {};
      target.variables.forEach((v, idx) => {
        if (v.defaultValue) init[v.id] = v.defaultValue;
        else if (idx === 0) init[v.id] = "";
        else init[v.id] = "10";
      });
      setQuickValues(init);
      setQuickResult("");
      setQuickWorking([]);
      setQuickError("");
    }
  };

  const handleQuickCalculate = () => {
    setQuickError("");
    const outcome = calculateFormula(activeQuickFormula, quickValues);
    if (!outcome.success) {
      setQuickError(outcome.error);
      setQuickResult("");
      setQuickWorking([]);
      return;
    }
    const unitStr = outcome.unit ? ` ${outcome.unit}` : "";
    setQuickResult(`${outcome.variableSymbol} = ${outcome.formattedAnswer}${unitStr}`);
    setQuickWorking(outcome.steps);
  };

  return (
    <main className="calculators-page">
      <SEO
        title="Interactive A-Level Physics Calculators | Universal SUVAT & Exam Solvers"
        description="Master exam solvers for OCR A-Level Physics: Universal SUVAT 5-variable solver, Photon & Quantum converter, Circuit Potential Divider studio, and 92 in-page calculators."
        canonicalPath="/calculators"
        keywords={[
          "SUVAT solver all 5 variables",
          "A level physics calculator",
          "photon energy eV converter",
          "potential divider calculator",
          "OCR physics solvers",
        ]}
      />

      <section className="library-header">
        <p className="eyebrow">SOLVER SUITE</p>
        <h1>Interactive Physics Calculators</h1>
        <p>
          Dedicated multi-step solvers designed for A-Level physics homework and
          exam revision. Calculate multi-variable systems with complete step-by-step
          working directly on this page.
        </p>
      </section>

      {/* Navigation Tabs */}
      <div className="solver-tabs">
        <button
          type="button"
          className={`solver-tab ${activeTab === "suvat" ? "active" : ""}`}
          onClick={() => setActiveTab("suvat")}
        >
          🚀 Universal SUVAT Solver
        </button>

        <button
          type="button"
          className={`solver-tab ${activeTab === "photon" ? "active" : ""}`}
          onClick={() => setActiveTab("photon")}
        >
          ⚛️ Quantum & Photon Studio
        </button>

        <button
          type="button"
          className={`solver-tab ${activeTab === "divider" ? "active" : ""}`}
          onClick={() => setActiveTab("divider")}
        >
          ⚡ Potential Divider Studio
        </button>

        <button
          type="button"
          className={`solver-tab ${activeTab === "quick" ? "active" : ""}`}
          onClick={() => setActiveTab("quick")}
        >
          📋 Quick Formula Runner (92)
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: SUVAT MASTER SOLVER */}
      {/* ======================================================== */}
      {activeTab === "suvat" && (
        <section className="solver-panel">
          <div className="panel-header">
            <h2>Universal SUVAT 5-Variable Solver</h2>
            <p>
              In A-Level mechanics, you are given <strong>any 3</strong> variables
              and must find the remaining 2. Enter any 3 values below and leave 2 blank.
            </p>
          </div>

          <div className="suvat-grid">
            <div className="suvat-field">
              <label htmlFor="suvat-s">
                <span className="var-symbol">s</span> Displacement (m)
              </label>
              <input
                id="suvat-s"
                type="text"
                inputMode="decimal"
                className="var-input"
                placeholder="Leave blank or enter value"
                value={suvatInputs.s}
                onChange={(e) => setSuvatInputs({ ...suvatInputs, s: e.target.value })}
              />
            </div>

            <div className="suvat-field">
              <label htmlFor="suvat-u">
                <span className="var-symbol">u</span> Initial Velocity (m/s)
              </label>
              <input
                id="suvat-u"
                type="text"
                inputMode="decimal"
                className="var-input"
                placeholder="Leave blank or enter value"
                value={suvatInputs.u}
                onChange={(e) => setSuvatInputs({ ...suvatInputs, u: e.target.value })}
              />
            </div>

            <div className="suvat-field">
              <label htmlFor="suvat-v">
                <span className="var-symbol">v</span> Final Velocity (m/s)
              </label>
              <input
                id="suvat-v"
                type="text"
                inputMode="decimal"
                className="var-input"
                placeholder="Leave blank or enter value"
                value={suvatInputs.v}
                onChange={(e) => setSuvatInputs({ ...suvatInputs, v: e.target.value })}
              />
            </div>

            <div className="suvat-field">
              <label htmlFor="suvat-a">
                <span className="var-symbol">a</span> Acceleration (m/s²)
              </label>
              <input
                id="suvat-a"
                type="text"
                inputMode="decimal"
                className="var-input"
                placeholder="Leave blank or enter value"
                value={suvatInputs.a}
                onChange={(e) => setSuvatInputs({ ...suvatInputs, a: e.target.value })}
              />
            </div>

            <div className="suvat-field">
              <label htmlFor="suvat-t">
                <span className="var-symbol">t</span> Time (s)
              </label>
              <input
                id="suvat-t"
                type="text"
                inputMode="decimal"
                className="var-input"
                placeholder="Leave blank or enter value"
                value={suvatInputs.t}
                onChange={(e) => setSuvatInputs({ ...suvatInputs, t: e.target.value })}
              />
            </div>
          </div>

          <div className="calculator-actions">
            <button type="button" className="calculate-button" onClick={handleSuvatSolve}>
              Solve Both Unknowns →
            </button>
            <button
              type="button"
              className="clear-button"
              onClick={() => {
                setSuvatInputs({ s: "", u: "", v: "", a: "", t: "" });
                setSuvatResult(null);
              }}
            >
              Clear
            </button>
          </div>

          {suvatResult?.error && (
            <div className="calculator-error">{suvatResult.error}</div>
          )}

          {suvatResult && suvatResult.solved.length > 0 && (
            <div className="suvat-results-container">
              <p className="eyebrow">SOLVED VALUES & WORKING</p>
              <div className="suvat-solved-cards">
                {suvatResult.solved.map((item) => (
                  <div key={item.symbol} className="solved-card">
                    <span className="solved-symbol">{item.symbol}</span>
                    <div className="solved-info">
                      <h4>{item.name}</h4>
                      <p className="solved-value">
                        {item.symbol} = {formatPhysicsNumber(item.value)} {item.unit}
                      </p>
                      <div className="working" style={{ marginTop: "12px", padding: "16px" }}>
                        <h5>Step-by-Step</h5>
                        {item.steps.map((st, i) => (
                          <p key={i} style={{ margin: "4px 0" }}>{st}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ======================================================== */}
      {/* TAB 2: QUANTUM & PHOTON CONVERTER */}
      {/* ======================================================== */}
      {activeTab === "photon" && (
        <section className="solver-panel">
          <div className="panel-header">
            <h2>Quantum & Photon Energy Converter</h2>
            <p>
              In OCR A-Level quantum physics, wavelength, frequency, energy in Joules,
              and energy in electron-volts (eV) are interchangeable. Enter
              <strong> any one</strong> value to instantly solve the others.
            </p>
          </div>

          <div className="photon-input-box">
            <div className="photon-select-row">
              <label htmlFor="photon-type">Input Type:</label>
              <select
                id="photon-type"
                className="finder-select"
                value={photonInputType}
                onChange={(e) => setPhotonInputType(e.target.value as typeof photonInputType)}
              >
                <option value="wavelength">Wavelength (λ)</option>
                <option value="frequency">Frequency (f)</option>
                <option value="joules">Energy in Joules (J)</option>
                <option value="ev">Energy in electron-volts (eV)</option>
              </select>

              {photonInputType === "wavelength" && (
                <select
                  className="finder-select"
                  value={photonWavelengthUnit}
                  onChange={(e) => setPhotonWavelengthUnit(e.target.value as "m" | "nm")}
                >
                  <option value="nm">nanometres (nm)</option>
                  <option value="m">metres (m)</option>
                </select>
              )}
            </div>

            <input
              type="text"
              inputMode="decimal"
              className="var-input"
              style={{ maxWidth: "360px", marginTop: "12px" }}
              value={photonInputValue}
              onChange={(e) => setPhotonInputValue(e.target.value)}
              placeholder="Enter number..."
            />
          </div>

          {photonResult && (
            <div className="photon-grid">
              <div className="photon-card">
                <span className="photon-card-label">WAVELENGTH (λ)</span>
                <h3>{formatPhysicsNumber(photonResult.wavelengthNm)} nm</h3>
                <p>{formatPhysicsNumber(photonResult.wavelengthM)} m</p>
              </div>

              <div className="photon-card">
                <span className="photon-card-label">FREQUENCY (f)</span>
                <h3>{formatPhysicsNumber(photonResult.freqHz)} Hz</h3>
                <p>{formatPhysicsNumber(photonResult.freqHz / 1e12)} THz</p>
              </div>

              <div className="photon-card">
                <span className="photon-card-label">ENERGY (JOULES)</span>
                <h3>{formatPhysicsNumber(photonResult.energyJ)} J</h3>
                <p>Formula: E = hf = hc/λ</p>
              </div>

              <div className="photon-card">
                <span className="photon-card-label">ENERGY (ELECTRON-VOLTS)</span>
                <h3>{formatPhysicsNumber(photonResult.energyEv)} eV</h3>
                <p>Conversion: ÷ 1.60 × 10⁻¹⁹ J/eV</p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ======================================================== */}
      {/* TAB 3: POTENTIAL DIVIDER & CIRCUIT STUDIO */}
      {/* ======================================================== */}
      {activeTab === "divider" && (
        <section className="solver-panel">
          <div className="panel-header">
            <h2>Potential Divider & Circuit Studio</h2>
            <p>
              Analyze two resistors in series across a supply voltage $V_{"{in}"}$.
              Calculate output voltage $V_{"{out}"}$, resistor voltages, circuit current,
              and power dissipation.
            </p>
          </div>

          <div className="suvat-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div className="suvat-field">
              <label htmlFor="div-vin">Supply Voltage $V_{"{in}"}$ (V)</label>
              <input
                id="div-vin"
                type="text"
                inputMode="decimal"
                className="var-input"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
              />
            </div>

            <div className="suvat-field">
              <label htmlFor="div-r1">Resistor $R_1$ (Ω)</label>
              <input
                id="div-r1"
                type="text"
                inputMode="decimal"
                className="var-input"
                value={r1}
                onChange={(e) => setR1(e.target.value)}
              />
            </div>

            <div className="suvat-field">
              <label htmlFor="div-r2">Resistor $R_2$ across output (Ω)</label>
              <input
                id="div-r2"
                type="text"
                inputMode="decimal"
                className="var-input"
                value={r2}
                onChange={(e) => setR2(e.target.value)}
              />
            </div>
          </div>

          {dividerResult && (
            <div className="divider-results">
              <div className="divider-card highlight-box">
                <span className="eyebrow">OUTPUT VOLTAGE</span>
                <h2>Vout = {formatPhysicsNumber(dividerResult.vOut)} V</h2>
                <p>Across Resistor R₂ ({r2} Ω)</p>
              </div>

              <div className="divider-details-grid">
                <div className="detail-box">
                  <span className="detail-label">Voltage across R₁:</span>
                  <strong>{formatPhysicsNumber(dividerResult.v1)} V</strong>
                </div>
                <div className="detail-box">
                  <span className="detail-label">Total Resistance:</span>
                  <strong>{formatPhysicsNumber(dividerResult.totalR)} Ω</strong>
                </div>
                <div className="detail-box">
                  <span className="detail-label">Circuit Current (I):</span>
                  <strong>{formatPhysicsNumber(dividerResult.current)} A ({formatPhysicsNumber(dividerResult.current * 1000)} mA)</strong>
                </div>
                <div className="detail-box">
                  <span className="detail-label">Power dissipated in R₁:</span>
                  <strong>{formatPhysicsNumber(dividerResult.power1)} W</strong>
                </div>
                <div className="detail-box">
                  <span className="detail-label">Power dissipated in R₂:</span>
                  <strong>{formatPhysicsNumber(dividerResult.power2)} W</strong>
                </div>
                <div className="detail-box">
                  <span className="detail-label">Total Power:</span>
                  <strong>{formatPhysicsNumber(dividerResult.totalPower)} W</strong>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ======================================================== */}
      {/* TAB 4: IN-PAGE QUICK FORMULA RUNNER */}
      {/* ======================================================== */}
      {activeTab === "quick" && (
        <section className="solver-panel">
          <div className="panel-header">
            <h2>Quick In-Page Formula Runner</h2>
            <p>
              Select any of the 92 OCR formulas to calculate right here without
              leaving the page.
            </p>
          </div>

          <div className="finder-control-group" style={{ maxWidth: "600px" }}>
            <label htmlFor="quick-formula-select">Choose formula:</label>
            <select
              id="quick-formula-select"
              className="finder-select"
              value={quickFormulaId}
              onChange={(e) => handleQuickFormulaSelect(e.target.value)}
            >
              {formulas.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.topic})
                </option>
              ))}
            </select>
          </div>

          <div style={{ margin: "20px 0" }}>
            <BlockMath math={activeQuickFormula.equation} />
          </div>

          <div className="calculator-form">
            {activeQuickFormula.variables.map((v) => (
              <div className="calculator-var-row" key={v.id}>
                <div className="var-info">
                  <span className="var-symbol">{v.symbol}</span>
                  <span className="var-name">
                    {v.name}
                    {v.isConstant && <span className="var-constant-tag">CONSTANT</span>}
                  </span>
                </div>
                <div className="var-input-container">
                  <input
                    type="text"
                    inputMode="decimal"
                    className="var-input"
                    value={quickValues[v.id] ?? ""}
                    onChange={(e) =>
                      setQuickValues({ ...quickValues, [v.id]: e.target.value })
                    }
                    placeholder="Leave blank to solve"
                  />
                  <span className="var-unit">{v.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="calculator-actions">
            <button type="button" className="calculate-button" onClick={handleQuickCalculate}>
              Calculate →
            </button>
            <button
              type="button"
              className="clear-button"
              onClick={() => {
                const init: Record<string, string> = {};
                activeQuickFormula.variables.forEach((v) => {
                  if (v.defaultValue) init[v.id] = v.defaultValue;
                });
                setQuickValues(init);
                setQuickResult("");
                setQuickWorking([]);
                setQuickError("");
              }}
            >
              Clear
            </button>
          </div>

          {quickError && <div className="calculator-error">{quickError}</div>}

          {quickResult && (
            <div className="calculation-result">
              <p className="eyebrow">RESULT</p>
              <h2>{quickResult}</h2>
              {quickWorking.length > 0 && (
                <div className="working">
                  <h3>Working Steps</h3>
                  {quickWorking.map((step, i) => (
                    <p key={i}>{step}</p>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
