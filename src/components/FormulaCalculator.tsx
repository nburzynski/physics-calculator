import React, { useState, useMemo, useCallback } from "react";
import type { Formula, FormulaVariable } from "../types/formula";
import { calculateFormula } from "../utils/calculator";
import { buildFormulaTree } from "../utils/formulaTreeBuilder";
import InteractiveFormulaRenderer from "./InteractiveFormulaRenderer";
import MathView from "./MathView";
import WorkingSteps from "./WorkingSteps";
import { trackCalculatorUsage } from "../utils/analytics";

export type FormulaCalculatorProps = {
  formula: Formula;
};

export const FormulaCalculator: React.FC<FormulaCalculatorProps> = ({ formula }) => {
  // Default target variable is the first variable in the formula
  const [targetVarId, setTargetVarId] = useState<string>(
    formula.variables[0]?.id || ""
  );

  // Initial values for known inputs
  const getInitialValues = useCallback(
    (targetId: string) => {
      const init: Record<string, string> = {};
      formula.variables.forEach((v) => {
        if (v.id !== targetId) {
          if (v.defaultValue) {
            init[v.id] = v.defaultValue;
          } else {
            init[v.id] = "";
          }
        }
      });
      return init;
    },
    [formula.variables]
  );

  const [values, setValues] = useState<Record<string, string>>(() =>
    getInitialValues(formula.variables[0]?.id || "")
  );

  const [solvedSymbol, setSolvedSymbol] = useState("");
  const [solvedValue, setSolvedValue] = useState("");
  const [solvedUnit, setSolvedUnit] = useState("");
  const [working, setWorking] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isSolved, setIsSolved] = useState(false);
  const [prevId, setPrevId] = useState(formula.id);

  // Sync state when formula prop changes
  if (formula.id !== prevId) {
    const firstId = formula.variables[0]?.id || "";
    setPrevId(formula.id);
    setTargetVarId(firstId);
    setValues(getInitialValues(firstId));
    setSolvedSymbol("");
    setSolvedValue("");
    setSolvedUnit("");
    setWorking([]);
    setError("");
    setIsSolved(false);
  }

  // Handle switching which variable to solve for
  const handleTargetChange = (newTargetId: string) => {
    setTargetVarId(newTargetId);
    setValues((prev) => {
      const next: Record<string, string> = {};
      formula.variables.forEach((v) => {
        if (v.id !== newTargetId) {
          // If we had a value for it previously, keep it, otherwise use defaultValue
          if (prev[v.id] !== undefined && prev[v.id] !== "") {
            next[v.id] = prev[v.id];
          } else if (v.defaultValue) {
            next[v.id] = v.defaultValue;
          } else {
            next[v.id] = "";
          }
        }
      });
      return next;
    });

    setSolvedSymbol("");
    setSolvedValue("");
    setSolvedUnit("");
    setWorking([]);
    setError("");
    setIsSolved(false);
  };

  const updateValue = (id: string, val: string) => {
    setValues((prev) => ({
      ...prev,
      [id]: val,
    }));
    setError("");
  };

  const handleClear = () => {
    const empty: Record<string, string> = {};
    formula.variables.forEach((v) => {
      if (v.id !== targetVarId) {
        empty[v.id] = "";
      }
    });
    setValues(empty);
    setSolvedSymbol("");
    setSolvedValue("");
    setSolvedUnit("");
    setWorking([]);
    setError("");
    setIsSolved(false);
  };

  const handleResetDefaults = () => {
    setValues(getInitialValues(targetVarId));
    setSolvedSymbol("");
    setSolvedValue("");
    setSolvedUnit("");
    setWorking([]);
    setError("");
    setIsSolved(false);
  };

  const handleCalculate = useCallback(() => {
    setError("");

    // Prepare raw values object: target variable is left blank, remaining are passed
    const calculationInput: Record<string, string> = {};
    formula.variables.forEach((v) => {
      if (v.id === targetVarId) {
        calculationInput[v.id] = "";
      } else {
        calculationInput[v.id] = values[v.id] ?? "";
      }
    });

    const outcome = calculateFormula(formula, calculationInput);

    if (!outcome.success) {
      setError(outcome.error);
      setIsSolved(false);
      setSolvedSymbol("");
      setSolvedValue("");
      setSolvedUnit("");
      setWorking([]);
      return;
    }

    setSolvedSymbol(outcome.variableSymbol);
    setSolvedValue(outcome.formattedAnswer);
    setSolvedUnit(outcome.unit);
    setWorking(outcome.steps);
    setIsSolved(true);

    // Track analytics
    trackCalculatorUsage(formula.id, formula.name, formula.subjectId);
  }, [formula, targetVarId, values]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCalculate();
    }
  };

  // Build formula tree based on active target variable
  const tree = useMemo(() => {
    return buildFormulaTree(formula, targetVarId);
  }, [formula, targetVarId]);

  const targetVariable =
    formula.variables.find((v) => v.id === targetVarId) || formula.variables[0];

  const hasConstants = formula.variables.some(
    (v) => (v.isConstant || v.defaultValue) && v.id !== targetVarId
  );

  return (
    <section className="interactive-calculator-card" aria-labelledby="calc-solver-heading">
      <div className="calculator-card-header">
        <div className="calc-header-text">
          <p className="eyebrow">EQUATION SOLVER</p>
          <h2 id="calc-solver-heading">Integrated Mathematical Calculator</h2>
          <p className="calculator-instructions">
            Select the quantity you want to calculate, enter the known values directly into the mathematical formula, and solve.
          </p>
        </div>

        {/* Target Variable Selector Pills */}
        <div className="target-solver-selector">
          <span className="target-selector-label">Solve for:</span>
          <div className="target-pills-wrap" role="radiogroup" aria-label="Select variable to calculate">
            {formula.variables.map((variable: FormulaVariable) => {
              const isSelected = variable.id === targetVarId;
              return (
                <button
                  key={variable.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`target-pill-btn ${isSelected ? "active" : ""}`}
                  onClick={() => handleTargetChange(variable.id)}
                >
                  <span className="pill-var-symbol">
                    <MathView text={variable.symbol} />
                  </span>
                  <span className="pill-var-name">{variable.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* VISUAL FORMULA WITH INTEGRATED INPUTS */}
      <div className="formula-interactive-viewport" onKeyDown={handleKeyDown}>
        <div className="formula-viewport-badge">
          <span>Calculating {targetVariable?.name || "Target"} ({targetVariable?.symbol})</span>
        </div>

        <InteractiveFormulaRenderer
          tree={tree}
          values={values}
          onValueChange={updateValue}
          targetVarId={targetVarId}
          solvedValue={solvedValue}
          solvedUnit={solvedUnit}
          isSolved={isSolved}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* ERROR ALERT */}
      {error && (
        <div className="calculator-error-bar" role="alert">
          <span className="error-icon-symbol">!</span>
          <span>{error}</span>
        </div>
      )}

      {/* ACTION CONTROLS */}
      <div className="calculator-actions-bar">
        <button
          type="button"
          className="calc-submit-btn"
          onClick={handleCalculate}
        >
          Calculate {targetVariable?.name || "Solution"} →
        </button>

        <button
          type="button"
          className="calc-clear-btn"
          onClick={handleClear}
        >
          Clear Inputs
        </button>

        {hasConstants && (
          <button
            type="button"
            className="calc-reset-btn"
            onClick={handleResetDefaults}
          >
            Reset Default Values
          </button>
        )}
      </div>

      {/* SOLVED RESULT PANEL WITH STEP-BY-STEP WORKING */}
      {isSolved && solvedValue && (
        <div className="calculation-outcome-panel" aria-live="polite">
          <div className="outcome-header">
            <p className="eyebrow">CALCULATED RESULT</p>
            <div className="outcome-display">
              <span className="outcome-symbol">
                <MathView text={solvedSymbol} /> =
              </span>
              <span className="outcome-value">{solvedValue}</span>
              {solvedUnit && (
                <span className="outcome-unit">
                  <MathView text={solvedUnit} />
                </span>
              )}
            </div>
          </div>

          {working.length > 0 && (
            <div className="outcome-steps-wrap">
              <WorkingSteps steps={working} title="Mathematical Working & Substitution" />
            </div>
          )}
        </div>
      )}

      {/* VARIABLE DEFINITIONS & SI UNITS REFERENCE TABLE */}
      <div className="formula-variables-table-section">
        <h3 className="variables-table-title">Variables & Standard SI Units</h3>
        <div className="variables-table-responsive">
          <table className="variables-data-table">
            <thead>
              <tr>
                <th scope="col">Symbol</th>
                <th scope="col">Quantity</th>
                <th scope="col">Standard Unit</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {formula.variables.map((variable) => {
                const isTarget = variable.id === targetVarId;
                return (
                  <tr key={variable.id} className={isTarget ? "is-target-row" : ""}>
                    <td className="var-cell-symbol">
                      <MathView text={variable.symbol} />
                    </td>
                    <td className="var-cell-name">
                      {variable.name}
                      {variable.description && (
                        <span className="var-cell-desc">{variable.description}</span>
                      )}
                    </td>
                    <td className="var-cell-unit">
                      {variable.unit ? <MathView text={variable.unit} /> : "Dimensionless / None"}
                    </td>
                    <td className="var-cell-status">
                      {isTarget ? (
                        <span className="badge-target">Calculating (Target)</span>
                      ) : variable.isConstant ? (
                        <span className="badge-constant">Constant</span>
                      ) : (
                        <span className="badge-input">Input</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default FormulaCalculator;
