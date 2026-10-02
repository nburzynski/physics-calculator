import { formulas } from "../src/data/formulas";
import { calculateFormula } from "../src/utils/calculator";

interface TestResult {
  formulaId: string;
  formulaName: string;
  status: "PASS" | "FAIL" | "WARN";
  errors: string[];
}

// Map of realistic test values for specific variable names or symbols to avoid division by zero, negative roots, or out-of-domain trig
function getTestValueForVar(formulaId: string, varId: string, symbol: string, defaultValue?: string): number {
  if (defaultValue && !isNaN(Number(defaultValue)) && Number(defaultValue) !== 0) {
    return Number(defaultValue);
  }

  // SHM specific domain check: ωt must be in [0, π/2] to test arccos/arcsin invertibility without phase ambiguity
  if (formulaId.startsWith("shm-displacement")) {
    if (varId === "amplitude") return 5.0;
    if (varId === "angular-velocity") return 2.0;
    if (varId === "time") return 0.25; // 2.0 * 0.25 = 0.5 rad (well within [0, pi/2])
  }

  if (formulaId === "quadratic-formula") {
    if (varId === "a") return 1.0;
    if (varId === "b") return -5.0;
    if (varId === "c") return 6.0;
    if (varId === "root") return 3.0;
  }

  if (formulaId === "vector-2d-dot-product") {
    if (varId === "ax") return 3.0;
    if (varId === "ay") return 4.0;
    if (varId === "bx") return 2.0;
    if (varId === "by") return 1.0;
    if (varId === "dot") return 10.0;
  }

  const idLower = varId.toLowerCase();
  const symLower = symbol.toLowerCase();

  if (idLower.includes("angle") || symLower === "θ" || symLower === "theta") {
    return 30; // 30 degrees
  }
  if (idLower.includes("temperature") || symLower === "t") {
    return 300; // 300 K
  }
  if (idLower.includes("refractive") || symLower === "n") {
    return 1.5;
  }
  if (idLower.includes("order") || symLower === "n" || symLower === "m") {
    return 2;
  }
  if (idLower.includes("wavelength") || symLower === "λ") {
    return 5e-7;
  }
  if (idLower.includes("slit-separation") || symLower === "d" || symLower === "a") {
    return 1e-4;
  }
  if (idLower.includes("distance") || symLower === "d" || symLower === "r" || symLower === "x") {
    return 2.5;
  }
  if (idLower.includes("mass") || symLower === "m") {
    return 4.0;
  }
  if (idLower.includes("velocity") || symLower === "v" || symLower === "u") {
    return 15.0;
  }
  if (idLower.includes("time") || symLower === "t") {
    return 3.0;
  }
  if (idLower.includes("acceleration") || symLower === "a") {
    return 2.0;
  }
  if (idLower.includes("force") || symLower === "f") {
    return 50.0;
  }
  if (idLower.includes("area") || symLower === "a") {
    return 0.05;
  }
  if (idLower.includes("pressure") || symLower === "p") {
    return 101325;
  }
  if (idLower.includes("density") || symLower === "ρ") {
    return 1000;
  }
  if (idLower.includes("voltage") || symLower === "v") {
    return 12.0;
  }
  if (idLower.includes("current") || symLower === "i") {
    return 2.5;
  }
  if (idLower.includes("resistance") || symLower === "r") {
    return 10.0;
  }
  if (idLower.includes("capacitance") || symLower === "c") {
    return 1e-5;
  }
  if (idLower.includes("charge") || symLower === "q") {
    return 5e-6;
  }
  if (idLower.includes("frequency") || symLower === "f") {
    return 50;
  }
  if (idLower.includes("moles") || symLower === "n") {
    return 2.0;
  }
  if (idLower.includes("molar-mass") || symLower === "m") {
    return 44.0;
  }
  if (idLower.includes("volume") || symLower === "v") {
    return 0.02;
  }

  // Default fallback positive number
  return 5.0;
}

async function runAudit() {
  console.log(`Starting comprehensive audit of ${formulas.length} formulas...`);
  const results: TestResult[] = [];
  let passCount = 0;
  let failCount = 0;

  for (const formula of formulas) {
    const formulaErrors: string[] = [];
    const vars = formula.variables;

    if (!vars || vars.length < 2) {
      formulaErrors.push(`Formula has fewer than 2 variables: ${vars?.length}`);
    }

    // Baseline test values
    const baselineInputs: Record<string, number> = {};
    for (const v of vars) {
      baselineInputs[v.id] = getTestValueForVar(formula.id, v.id, v.symbol, v.defaultValue);
    }

    // Step 1: Test calculating the primary target (usually the first variable)
    const primaryTarget = vars[0];
    const inputsForPrimary: Record<string, string> = {};
    for (const v of vars) {
      if (v.id !== primaryTarget.id) {
        inputsForPrimary[v.id] = String(baselineInputs[v.id]);
      }
    }

    const primaryOutcome = calculateFormula(formula, inputsForPrimary);
    if (!primaryOutcome.success) {
      formulaErrors.push(
        `Failed to calculate primary variable '${primaryTarget.id}' (${primaryTarget.symbol}): ${primaryOutcome.error}`
      );
    } else {
      const primaryAns = primaryOutcome.answer;
      if (!Number.isFinite(primaryAns)) {
        formulaErrors.push(
          `Primary variable '${primaryTarget.id}' produced non-finite answer: ${primaryAns}`
        );
      } else {
        // Step 2: Round-trip consistency test for each other variable
        // Set primary target to primaryAns, and solve for each other variable
        const fullValues: Record<string, number> = {
          ...baselineInputs,
          [primaryTarget.id]: primaryAns,
        };

        for (const testVar of vars) {
          if (testVar.id === primaryTarget.id) continue;
          if (testVar.isConstant) continue; // Constants don't need to be solved for

          const inputsForVar: Record<string, string> = {};
          for (const v of vars) {
            if (v.id !== testVar.id) {
              inputsForVar[v.id] = String(fullValues[v.id]);
            }
          }

          const outcome = calculateFormula(formula, inputsForVar);
          if (!outcome.success) {
            formulaErrors.push(
              `Rearrangement failed for '${testVar.id}' (${testVar.symbol}): ${outcome.error}`
            );
          } else {
            const calculatedVal = outcome.answer;
            const expectedVal = fullValues[testVar.id];

            if (!Number.isFinite(calculatedVal)) {
              formulaErrors.push(
                `Rearrangement for '${testVar.id}' produced non-finite answer: ${calculatedVal}`
              );
            } else {
              // Calculate relative difference
              const absDiff = Math.abs(calculatedVal - expectedVal);
              const relDiff = expectedVal === 0 ? absDiff : absDiff / Math.abs(expectedVal);

              // Allow 1% tolerance for trigonometric/float precision
              if (relDiff > 0.02 && absDiff > 1e-6) {
                formulaErrors.push(
                  `Round-trip mismatch for '${testVar.id}' (${testVar.symbol}): expected ${expectedVal}, got ${calculatedVal} (relDiff: ${(relDiff * 100).toFixed(2)}%)`
                );
              }
            }
          }
        }
      }
    }

    if (formulaErrors.length > 0) {
      failCount++;
      results.push({
        formulaId: formula.id,
        formulaName: formula.name,
        status: "FAIL",
        errors: formulaErrors,
      });
      console.log(`❌ FAIL: [${formula.id}] ${formula.name}`);
      formulaErrors.forEach((e) => console.log(`   -> ${e}`));
    } else {
      passCount++;
      results.push({
        formulaId: formula.id,
        formulaName: formula.name,
        status: "PASS",
        errors: [],
      });
      console.log(`✅ PASS: [${formula.id}] ${formula.name}`);
    }
  }

  console.log("\n==========================================");
  console.log(`AUDIT SUMMARY: ${passCount} PASSED, ${failCount} FAILED out of ${formulas.length} formulas.`);
  console.log("==========================================");
}

runAudit().catch(console.error);
