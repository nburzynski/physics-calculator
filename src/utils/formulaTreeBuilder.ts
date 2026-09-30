import type { Formula, FormulaVariable } from "../types/formula";
import {
  type MathNode,
  v,
  target,
  num,
  sym,
  frac,
  pow,
  sqrt,
  brackets,
  fn,
  row,
} from "../types/mathTree";

/**
 * Helper to build a variable node (input or constant)
 */
function makeVarNode(variable: FormulaVariable): MathNode {
  return v(
    variable.id,
    variable.symbol,
    variable.name,
    variable.unit,
    variable.isConstant,
    variable.defaultValue
  );
}

/**
 * Helper to build a target node
 */
function makeTargetNode(variable: FormulaVariable): MathNode {
  return target(variable.id, variable.symbol, variable.name, variable.unit);
}

/**
 * Builds the data-driven MathNode AST for a given formula and target variable.
 */
export function buildFormulaTree(
  formula: Formula,
  targetVarId: string
): MathNode {
  const targetVar =
    formula.variables.find((v) => v.id === targetVarId) || formula.variables[0];
  const targetId = targetVar.id;

  const getVar = (id: string): FormulaVariable => {
    const found = formula.variables.find((v) => v.id === id);
    if (!found) {
      return { id, symbol: id, name: id, unit: "" };
    }
    return found;
  };

  const vn = (id: string) => makeVarNode(getVar(id));
  const tn = (id: string) => makeTargetNode(getVar(id));

  // ============================================================
  // 1. THREE-VARIABLE MULTIPLICATION: A = B * C
  // ============================================================
  if (
    formula.calculatorType === "multiply" ||
    formula.id === "charge" ||
    formula.id === "latent-heat" ||
    formula.id === "circular-velocity" ||
    formula.id === "time-constant" ||
    formula.id === "acoustic-impedance" ||
    formula.id === "photon-energy-frequency" ||
    formula.id === "radioactive-activity" ||
    formula.id === "angular-velocity-frequency"
  ) {
    const [first, second, third] = formula.variables;
    if (first && second && third) {
      if (targetId === first.id) {
        return row(
          tn(first.id),
          sym("="),
          vn(second.id),
          sym("×"),
          vn(third.id)
        );
      }
      if (targetId === second.id) {
        return row(tn(second.id), sym("="), frac(vn(first.id), vn(third.id)));
      }
      if (targetId === third.id) {
        return row(tn(third.id), sym("="), frac(vn(first.id), vn(second.id)));
      }
    }
  }

  // ============================================================
  // 2. THREE-VARIABLE DIVISION: A = B / C
  // ============================================================
  if (
    formula.calculatorType === "divide" ||
    formula.id === "capacitance" ||
    formula.id === "gravitational-field-strength" ||
    formula.id === "electric-field-strength" ||
    formula.id === "electric-field-uniform" ||
    formula.id === "de-broglie-wavelength" ||
    formula.id === "refractive-index" ||
    formula.id === "tensile-stress" ||
    formula.id === "tensile-strain" ||
    formula.id === "moles-mass-molar" ||
    formula.id === "molarity-concentration"
  ) {
    const [first, second, third] = formula.variables;
    if (first && second && third) {
      if (targetId === first.id) {
        return row(tn(first.id), sym("="), frac(vn(second.id), vn(third.id)));
      }
      if (targetId === second.id) {
        return row(
          tn(second.id),
          sym("="),
          vn(first.id),
          sym("×"),
          vn(third.id)
        );
      }
      if (targetId === third.id) {
        return row(tn(third.id), sym("="), frac(vn(second.id), vn(first.id)));
      }
    }
  }

  // ============================================================
  // 3. KINETIC ENERGY: E = 1/2 m v^2
  // ============================================================
  if (formula.id === "kinetic-energy" || formula.calculatorType === "kinetic-energy") {
    const eVar = formula.variables.find((v) => v.id === "energy") || formula.variables[0];
    const mVar = formula.variables.find((v) => v.id === "mass") || formula.variables[1];
    const vVar = formula.variables.find((v) => v.id === "velocity") || formula.variables[2];

    if (targetId === eVar.id) {
      return row(
        tn(eVar.id),
        sym("="),
        frac(num("1"), num("2")),
        sym("×"),
        vn(mVar.id),
        sym("×"),
        pow(vn(vVar.id), num("2"))
      );
    }
    if (targetId === mVar.id) {
      return row(
        tn(mVar.id),
        sym("="),
        frac(row(num("2"), sym("×"), vn(eVar.id)), pow(vn(vVar.id), num("2")))
      );
    }
    if (targetId === vVar.id) {
      return row(
        tn(vVar.id),
        sym("="),
        sqrt(frac(row(num("2"), sym("×"), vn(eVar.id)), vn(mVar.id)))
      );
    }
  }

  // ============================================================
  // 4. GRAVITATIONAL POTENTIAL ENERGY: E = m g h
  // ============================================================
  if (formula.id === "gravitational-potential-energy" || formula.calculatorType === "gpe") {
    const eVar = formula.variables.find((v) => v.id === "energy") || formula.variables[0];
    const mVar = formula.variables.find((v) => v.id === "mass") || formula.variables[1];
    const gVar = formula.variables.find((v) => v.id === "gravity") || formula.variables[2];
    const hVar = formula.variables.find((v) => v.id === "height") || formula.variables[3];

    if (targetId === eVar.id) {
      return row(
        tn(eVar.id),
        sym("="),
        vn(mVar.id),
        sym("×"),
        vn(gVar.id),
        sym("×"),
        vn(hVar.id)
      );
    }
    if (targetId === mVar.id) {
      return row(
        tn(mVar.id),
        sym("="),
        frac(vn(eVar.id), row(vn(gVar.id), sym("×"), vn(hVar.id)))
      );
    }
    if (targetId === hVar.id) {
      return row(
        tn(hVar.id),
        sym("="),
        frac(vn(eVar.id), row(vn(mVar.id), sym("×"), vn(gVar.id)))
      );
    }
  }

  // ============================================================
  // 5. SUVAT: v = u + at
  // ============================================================
  if (formula.id === "suvat-velocity") {
    if (targetId === "final-velocity") {
      return row(
        tn("final-velocity"),
        sym("="),
        vn("initial-velocity"),
        sym("+"),
        vn("acceleration"),
        sym("×"),
        vn("time")
      );
    }
    if (targetId === "initial-velocity") {
      return row(
        tn("initial-velocity"),
        sym("="),
        vn("final-velocity"),
        sym("-"),
        vn("acceleration"),
        sym("×"),
        vn("time")
      );
    }
    if (targetId === "acceleration") {
      return row(
        tn("acceleration"),
        sym("="),
        frac(
          brackets(row(vn("final-velocity"), sym("-"), vn("initial-velocity"))),
          vn("time")
        )
      );
    }
    if (targetId === "time") {
      return row(
        tn("time"),
        sym("="),
        frac(
          brackets(row(vn("final-velocity"), sym("-"), vn("initial-velocity"))),
          vn("acceleration")
        )
      );
    }
  }

  // ============================================================
  // 6. SUVAT: s = 1/2(u + v)t
  // ============================================================
  if (
    formula.id === "suvat-average-velocity" ||
    formula.calculatorType === "suvat-average-velocity"
  ) {
    if (targetId === "displacement") {
      return row(
        tn("displacement"),
        sym("="),
        frac(num("1"), num("2")),
        brackets(row(vn("initial-velocity"), sym("+"), vn("final-velocity"))),
        sym("×"),
        vn("time")
      );
    }
    if (targetId === "initial-velocity") {
      return row(
        tn("initial-velocity"),
        sym("="),
        frac(row(num("2"), sym("×"), vn("displacement")), vn("time")),
        sym("-"),
        vn("final-velocity")
      );
    }
    if (targetId === "final-velocity") {
      return row(
        tn("final-velocity"),
        sym("="),
        frac(row(num("2"), sym("×"), vn("displacement")), vn("time")),
        sym("-"),
        vn("initial-velocity")
      );
    }
    if (targetId === "time") {
      return row(
        tn("time"),
        sym("="),
        frac(
          row(num("2"), sym("×"), vn("displacement")),
          brackets(row(vn("initial-velocity"), sym("+"), vn("final-velocity")))
        )
      );
    }
  }

  // ============================================================
  // 7. SUVAT: s = ut + 1/2 a t^2
  // ============================================================
  if (formula.id === "suvat-displacement") {
    if (targetId === "displacement") {
      return row(
        tn("displacement"),
        sym("="),
        vn("initial-velocity"),
        sym("×"),
        vn("time"),
        sym("+"),
        frac(num("1"), num("2")),
        sym("×"),
        vn("acceleration"),
        sym("×"),
        pow(vn("time"), num("2"))
      );
    }
    if (targetId === "initial-velocity") {
      return row(
        tn("initial-velocity"),
        sym("="),
        frac(
          row(
            vn("displacement"),
            sym("-"),
            frac(num("1"), num("2")),
            sym("×"),
            vn("acceleration"),
            sym("×"),
            pow(vn("time"), num("2"))
          ),
          vn("time")
        )
      );
    }
    if (targetId === "acceleration") {
      return row(
        tn("acceleration"),
        sym("="),
        frac(
          row(
            num("2"),
            brackets(
              row(
                vn("displacement"),
                sym("-"),
                vn("initial-velocity"),
                sym("×"),
                vn("time")
              )
            )
          ),
          pow(vn("time"), num("2"))
        )
      );
    }
    if (targetId === "time") {
      return row(
        tn("time"),
        sym("="),
        frac(
          row(
            sym("-"),
            vn("initial-velocity"),
            sym("±"),
            sqrt(
              row(
                pow(vn("initial-velocity"), num("2")),
                sym("+"),
                num("2"),
                sym("×"),
                vn("acceleration"),
                sym("×"),
                vn("displacement")
              )
            )
          ),
          vn("acceleration")
        )
      );
    }
  }

  // ============================================================
  // 8. SUVAT: v^2 = u^2 + 2as
  // ============================================================
  if (formula.id === "suvat-no-time" || formula.calculatorType === "suvat-no-time") {
    if (targetId === "final-velocity") {
      return row(
        tn("final-velocity"),
        sym("="),
        sqrt(
          row(
            pow(vn("initial-velocity"), num("2")),
            sym("+"),
            num("2"),
            sym("×"),
            vn("acceleration"),
            sym("×"),
            vn("displacement")
          )
        )
      );
    }
    if (targetId === "initial-velocity") {
      return row(
        tn("initial-velocity"),
        sym("="),
        sqrt(
          row(
            pow(vn("final-velocity"), num("2")),
            sym("-"),
            num("2"),
            sym("×"),
            vn("acceleration"),
            sym("×"),
            vn("displacement")
          )
        )
      );
    }
    if (targetId === "acceleration") {
      return row(
        tn("acceleration"),
        sym("="),
        frac(
          row(
            pow(vn("final-velocity"), num("2")),
            sym("-"),
            pow(vn("initial-velocity"), num("2"))
          ),
          row(num("2"), sym("×"), vn("displacement"))
        )
      );
    }
    if (targetId === "displacement") {
      return row(
        tn("displacement"),
        sym("="),
        frac(
          row(
            pow(vn("final-velocity"), num("2")),
            sym("-"),
            pow(vn("initial-velocity"), num("2"))
          ),
          row(num("2"), sym("×"), vn("acceleration"))
        )
      );
    }
  }

  // ============================================================
  // 9. OHM'S LAW: V = I R
  // ============================================================
  if (formula.id === "resistance" || formula.id === "ohms-law") {
    if (targetId === "voltage") {
      return row(tn("voltage"), sym("="), vn("current"), sym("×"), vn("resistance"));
    }
    if (targetId === "current") {
      return row(tn("current"), sym("="), frac(vn("voltage"), vn("resistance")));
    }
    if (targetId === "resistance") {
      return row(tn("resistance"), sym("="), frac(vn("voltage"), vn("current")));
    }
  }

  // ============================================================
  // 10. ELECTRICAL POWER: P = V I
  // ============================================================
  if (formula.id === "electrical-power" || formula.id === "electrical-power-voltage-current") {
    if (targetId === "power") {
      return row(tn("power"), sym("="), vn("voltage"), sym("×"), vn("current"));
    }
    if (targetId === "voltage") {
      return row(tn("voltage"), sym("="), frac(vn("power"), vn("current")));
    }
    if (targetId === "current") {
      return row(tn("current"), sym("="), frac(vn("power"), vn("voltage")));
    }
  }

  // ============================================================
  // 11. ELECTRICAL ENERGY: W = V I t
  // ============================================================
  if (formula.id === "electrical-energy") {
    if (targetId === "energy") {
      return row(
        tn("energy"),
        sym("="),
        vn("voltage"),
        sym("×"),
        vn("current"),
        sym("×"),
        vn("time")
      );
    }
    if (targetId === "voltage") {
      return row(
        tn("voltage"),
        sym("="),
        frac(vn("energy"), row(vn("current"), sym("×"), vn("time")))
      );
    }
    if (targetId === "current") {
      return row(
        tn("current"),
        sym("="),
        frac(vn("energy"), row(vn("voltage"), sym("×"), vn("time")))
      );
    }
    if (targetId === "time") {
      return row(
        tn("time"),
        sym("="),
        frac(vn("energy"), row(vn("voltage"), sym("×"), vn("current")))
      );
    }
  }

  // ============================================================
  // 12. RESISTIVITY: R = ρ L / A
  // ============================================================
  if (formula.id === "resistivity") {
    if (targetId === "resistance") {
      return row(
        tn("resistance"),
        sym("="),
        frac(row(vn("resistivity"), sym("×"), vn("length")), vn("area"))
      );
    }
    if (targetId === "resistivity") {
      return row(
        tn("resistivity"),
        sym("="),
        frac(row(vn("resistance"), sym("×"), vn("area")), vn("length"))
      );
    }
    if (targetId === "length") {
      return row(
        tn("length"),
        sym("="),
        frac(row(vn("resistance"), sym("×"), vn("area")), vn("resistivity"))
      );
    }
    if (targetId === "area") {
      return row(
        tn("area"),
        sym("="),
        frac(row(vn("resistivity"), sym("×"), vn("length")), vn("resistance"))
      );
    }
  }

  // ============================================================
  // 13. CAPACITOR ENERGY: W = 1/2 Q V
  // ============================================================
  if (formula.id === "capacitor-energy") {
    if (targetId === "energy") {
      return row(
        tn("energy"),
        sym("="),
        frac(num("1"), num("2")),
        sym("×"),
        vn("charge"),
        sym("×"),
        vn("voltage")
      );
    }
    if (targetId === "charge") {
      return row(
        tn("charge"),
        sym("="),
        frac(row(num("2"), sym("×"), vn("energy")), vn("voltage"))
      );
    }
    if (targetId === "voltage") {
      return row(
        tn("voltage"),
        sym("="),
        frac(row(num("2"), sym("×"), vn("energy")), vn("charge"))
      );
    }
  }

  // ============================================================
  // 14. FREQUENCY & PERIOD: f = 1 / T
  // ============================================================
  if (formula.id === "frequency-period") {
    if (targetId === "frequency") {
      return row(tn("frequency"), sym("="), frac(num("1"), vn("period")));
    }
    if (targetId === "period") {
      return row(tn("period"), sym("="), frac(num("1"), vn("frequency")));
    }
  }

  // ============================================================
  // 15. ANGULAR VELOCITY & PERIOD: ω = 2π / T
  // ============================================================
  if (formula.id === "angular-velocity-period") {
    if (targetId === "angular-velocity") {
      return row(
        tn("angular-velocity"),
        sym("="),
        frac(row(num("2"), sym("π")), vn("period"))
      );
    }
    if (targetId === "period") {
      return row(
        tn("period"),
        sym("="),
        frac(row(num("2"), sym("π")), vn("angular-velocity"))
      );
    }
  }

  // ============================================================
  // 16. VECTOR HORIZONTAL COMPONENT: Fx = F cos(θ)
  // ============================================================
  if (formula.id === "vector-horizontal-component") {
    if (targetId === "horizontal-component") {
      return row(
        tn("horizontal-component"),
        sym("="),
        vn("force"),
        sym("×"),
        fn("cos", vn("angle"))
      );
    }
    if (targetId === "force") {
      return row(
        tn("force"),
        sym("="),
        frac(vn("horizontal-component"), fn("cos", vn("angle")))
      );
    }
    if (targetId === "angle") {
      return row(
        tn("angle"),
        sym("="),
        fn("arccos", frac(vn("horizontal-component"), vn("force")))
      );
    }
  }

  // ============================================================
  // 17. VECTOR VERTICAL COMPONENT: Fy = F sin(θ)
  // ============================================================
  if (formula.id === "vector-vertical-component") {
    if (targetId === "vertical-component") {
      return row(
        tn("vertical-component"),
        sym("="),
        vn("force"),
        sym("×"),
        fn("sin", vn("angle"))
      );
    }
    if (targetId === "force") {
      return row(
        tn("force"),
        sym("="),
        frac(vn("vertical-component"), fn("sin", vn("angle")))
      );
    }
    if (targetId === "angle") {
      return row(
        tn("angle"),
        sym("="),
        fn("arcsin", frac(vn("vertical-component"), vn("force")))
      );
    }
  }

  // ============================================================
  // 18. WORK DONE: W = F x cos(θ)
  // ============================================================
  if (formula.id === "work-done") {
    if (targetId === "work") {
      return row(
        tn("work"),
        sym("="),
        vn("force"),
        sym("×"),
        vn("displacement"),
        sym("×"),
        fn("cos", vn("angle"))
      );
    }
    if (targetId === "force") {
      return row(
        tn("force"),
        sym("="),
        frac(vn("work"), row(vn("displacement"), sym("×"), fn("cos", vn("angle"))))
      );
    }
    if (targetId === "displacement") {
      return row(
        tn("displacement"),
        sym("="),
        frac(vn("work"), row(vn("force"), sym("×"), fn("cos", vn("angle"))))
      );
    }
    if (targetId === "angle") {
      return row(
        tn("angle"),
        sym("="),
        fn("arccos", frac(vn("work"), row(vn("force"), sym("×"), vn("displacement"))))
      );
    }
  }

  // ============================================================
  // 19. SNELL'S LAW: n1 sin(θ1) = n2 sin(θ2)
  // ============================================================
  if (formula.id === "snells-law") {
    if (targetId === "refractive-index-one") {
      return row(
        tn("refractive-index-one"),
        sym("="),
        frac(
          row(vn("refractive-index-two"), sym("×"), fn("sin", vn("angle-two"))),
          fn("sin", vn("angle-one"))
        )
      );
    }
    if (targetId === "refractive-index-two") {
      return row(
        tn("refractive-index-two"),
        sym("="),
        frac(
          row(vn("refractive-index-one"), sym("×"), fn("sin", vn("angle-one"))),
          fn("sin", vn("angle-two"))
        )
      );
    }
    if (targetId === "angle-one") {
      return row(
        tn("angle-one"),
        sym("="),
        fn(
          "arcsin",
          frac(
            row(vn("refractive-index-two"), sym("×"), fn("sin", vn("angle-two"))),
            vn("refractive-index-one")
          )
        )
      );
    }
    if (targetId === "angle-two") {
      return row(
        tn("angle-two"),
        sym("="),
        fn(
          "arcsin",
          frac(
            row(vn("refractive-index-one"), sym("×"), fn("sin", vn("angle-one"))),
            vn("refractive-index-two")
          )
        )
      );
    }
  }

  // ============================================================
  // 20. PYTHAGOREAN THEOREM: c^2 = a^2 + b^2
  // ============================================================
  if (formula.id === "pythagorean-theorem") {
    if (targetId === "c") {
      return row(
        tn("c"),
        sym("="),
        sqrt(row(pow(vn("a"), num("2")), sym("+"), pow(vn("b"), num("2"))))
      );
    }
    if (targetId === "a") {
      return row(
        tn("a"),
        sym("="),
        sqrt(row(pow(vn("c"), num("2")), sym("-"), pow(vn("b"), num("2"))))
      );
    }
    if (targetId === "b") {
      return row(
        tn("b"),
        sym("="),
        sqrt(row(pow(vn("c"), num("2")), sym("-"), pow(vn("a"), num("2"))))
      );
    }
  }

  // ============================================================
  // 21. QUADRATIC FORMULA: x = (-b ± √(b^2 - 4ac)) / (2a)
  // ============================================================
  if (formula.id === "quadratic-formula") {
    return row(
      tn("root"),
      sym("="),
      frac(
        row(
          sym("-"),
          vn("b"),
          sym("±"),
          sqrt(
            row(
              pow(vn("b"), num("2")),
              sym("-"),
              num("4"),
              sym("×"),
              vn("a"),
              sym("×"),
              vn("c")
            )
          )
        ),
        row(num("2"), sym("×"), vn("a"))
      )
    );
  }

  // ============================================================
  // 22. CALORIMETRY: q = m c ΔT
  // ============================================================
  if (formula.id === "calorimetry-heat-energy") {
    if (targetId === "heat") {
      return row(
        tn("heat"),
        sym("="),
        vn("mass"),
        sym("×"),
        vn("specific-heat"),
        sym("×"),
        vn("temp-change")
      );
    }
    if (targetId === "mass") {
      return row(
        tn("mass"),
        sym("="),
        frac(
          vn("heat"),
          row(vn("specific-heat"), sym("×"), vn("temp-change"))
        )
      );
    }
    if (targetId === "temp-change") {
      return row(
        tn("temp-change"),
        sym("="),
        frac(
          vn("heat"),
          row(vn("mass"), sym("×"), vn("specific-heat"))
        )
      );
    }
  }

  // ============================================================
  // 23. pH FORMULA: pH = -log10[H+]
  // ============================================================
  if (formula.id === "ph-concentration") {
    if (targetId === "ph") {
      return row(
        tn("ph"),
        sym("="),
        sym("-"),
        fn("log₁₀", brackets(vn("h-conc"), "square"))
      );
    }
    if (targetId === "h-conc") {
      return row(
        tn("h-conc"),
        sym("="),
        pow(num("10"), row(sym("-"), vn("ph")))
      );
    }
  }

  // ============================================================
  // 24. DATA TRANSFER TIME: t = (D × 8) / R
  // ============================================================
  if (formula.id === "data-transfer-time") {
    if (targetId === "time") {
      return row(
        tn("time"),
        sym("="),
        frac(row(vn("size"), sym("×"), num("8")), vn("speed"))
      );
    }
    if (targetId === "size") {
      return row(
        tn("size"),
        sym("="),
        frac(row(vn("time"), sym("×"), vn("speed")), num("8"))
      );
    }
    if (targetId === "speed") {
      return row(
        tn("speed"),
        sym("="),
        frac(row(vn("size"), sym("×"), num("8")), vn("time"))
      );
    }
  }

  // ============================================================
  // 25. GENERAL FALLBACK: LHS = RHS with remaining inputs
  // ============================================================
  // If no bespoke rearrange is registered, place target on LHS and remaining as row/fraction
  const remainingVars = formula.variables.filter((v) => v.id !== targetId);
  const inputRowItems: MathNode[] = [];

  remainingVars.forEach((vObj, idx) => {
    if (idx > 0) inputRowItems.push(sym("×"));
    inputRowItems.push(makeVarNode(vObj));
  });

  return row(tn(targetId), sym("="), row(...inputRowItems));
}
