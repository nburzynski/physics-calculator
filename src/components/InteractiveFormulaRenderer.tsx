import React from "react";
import type { MathNode } from "../types/mathTree";
import MathView from "./MathView";

export type InteractiveFormulaRendererProps = {
  tree: MathNode;
  values: Record<string, string>;
  onValueChange: (varId: string, value: string) => void;
  targetVarId: string;
  solvedValue?: string;
  solvedUnit?: string;
  isSolved?: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
};

export const InteractiveFormulaRenderer: React.FC<InteractiveFormulaRendererProps> = ({
  tree,
  values,
  onValueChange,
  targetVarId,
  solvedValue,
  solvedUnit,
  isSolved,
  onKeyDown,
}) => {
  const renderNode = (node: MathNode, key: string | number): React.ReactNode => {
    switch (node.type) {
      case "variable": {
        const val = values[node.varId] ?? "";
        return (
          <span className="math-input-wrapper" key={key}>
            <input
              type="text"
              inputMode="decimal"
              className={`math-inline-input ${node.isConstant ? "is-constant" : ""}`}
              value={val}
              onChange={(e) => onValueChange(node.varId, e.target.value)}
              placeholder={node.symbol}
              aria-label={`${node.name} (${node.symbol})${node.unit ? ` in ${node.unit}` : ""}`}
              onKeyDown={onKeyDown}
            />
            {node.unit && (
              <span className="math-input-unit-badge" title={`Unit: ${node.unit}`}>
                <MathView text={node.unit} />
              </span>
            )}
          </span>
        );
      }

      case "target": {
        const isCurrentTarget = node.varId === targetVarId;
        if (isCurrentTarget && isSolved && solvedValue) {
          return (
            <span className="math-target-resolved" key={key}>
              <span className="math-target-symbol">
                <MathView text={node.symbol} />
              </span>
              <span className="math-target-answer">
                = {solvedValue}
                {solvedUnit && (
                  <span className="math-target-unit">
                    {" "}<MathView text={solvedUnit} />
                  </span>
                )}
              </span>
            </span>
          );
        }

        return (
          <span className="math-target-badge" key={key} title={`Solving for ${node.name}`}>
            <span className="math-target-symbol">
              <MathView text={node.symbol} />
            </span>
          </span>
        );
      }

      case "fraction": {
        const numContent = Array.isArray(node.numerator)
          ? node.numerator.map((n, i) => renderNode(n, `num-${i}`))
          : renderNode(node.numerator, "num");

        const denContent = Array.isArray(node.denominator)
          ? node.denominator.map((n, i) => renderNode(n, `den-${i}`))
          : renderNode(node.denominator, "den");

        return (
          <span className="math-fraction" key={key}>
            <span className="math-fraction-num">{numContent}</span>
            <span className="math-fraction-bar" aria-hidden="true" />
            <span className="math-fraction-den">{denContent}</span>
          </span>
        );
      }

      case "power": {
        const baseContent = Array.isArray(node.base)
          ? node.base.map((n, i) => renderNode(n, `base-${i}`))
          : renderNode(node.base, "base");

        const expContent = Array.isArray(node.exponent)
          ? node.exponent.map((n, i) => renderNode(n, `exp-${i}`))
          : renderNode(node.exponent, "exp");

        return (
          <span className="math-power" key={key}>
            <span className="math-power-base">{baseContent}</span>
            <sup className="math-power-exp">{expContent}</sup>
          </span>
        );
      }

      case "subscript": {
        const baseContent = Array.isArray(node.base)
          ? node.base.map((n, i) => renderNode(n, `base-${i}`))
          : renderNode(node.base, "base");

        const subContent = Array.isArray(node.sub)
          ? node.sub.map((n, i) => renderNode(n, `sub-${i}`))
          : renderNode(node.sub, "sub");

        return (
          <span className="math-subscript-wrap" key={key}>
            <span className="math-subscript-base">{baseContent}</span>
            <sub className="math-subscript-val">{subContent}</sub>
          </span>
        );
      }

      case "sqrt": {
        const radicandContent = Array.isArray(node.radicand)
          ? node.radicand.map((n, i) => renderNode(n, `rad-${i}`))
          : renderNode(node.radicand, "rad");

        return (
          <span className="math-sqrt" key={key}>
            <span className="math-sqrt-radical" aria-hidden="true">
              √
            </span>
            <span className="math-sqrt-radicand">{radicandContent}</span>
          </span>
        );
      }

      case "brackets": {
        const content = Array.isArray(node.content)
          ? node.content.map((n, i) => renderNode(n, `b-${i}`))
          : renderNode(node.content, "b");

        let open = "(";
        let close = ")";
        if (node.bracketType === "square") {
          open = "[";
          close = "]";
        } else if (node.bracketType === "curly") {
          open = "{";
          close = "}";
        } else if (node.bracketType === "abs") {
          open = "|";
          close = "|";
        }

        return (
          <span className="math-brackets" key={key}>
            <span className="math-bracket-symbol" aria-hidden="true">
              {open}
            </span>
            <span className="math-bracket-content">{content}</span>
            <span className="math-bracket-symbol" aria-hidden="true">
              {close}
            </span>
          </span>
        );
      }

      case "function": {
        const argContent = Array.isArray(node.argument)
          ? node.argument.map((n, i) => renderNode(n, `arg-${i}`))
          : renderNode(node.argument, "arg");

        return (
          <span className="math-function-wrap" key={key}>
            <span className="math-function-name">{node.name}</span>
            <span className="math-function-arg">{argContent}</span>
          </span>
        );
      }

      case "symbol":
      case "operator": {
        return (
          <span
            className={`math-symbol ${node.text === "=" ? "math-equals" : ""}`}
            key={key}
            aria-label={node.ariaLabel}
          >
            <MathView text={node.text} />
          </span>
        );
      }

      case "number":
      case "constant": {
        return (
          <span className="math-constant-number" key={key}>
            {node.value}
          </span>
        );
      }

      case "row": {
        return (
          <span className="math-row" key={key}>
            {node.items.map((item, idx) => renderNode(item, idx))}
          </span>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="interactive-formula-container" role="group" aria-label="Interactive mathematical formula with input fields">
      <div className="interactive-formula-equation">
        {renderNode(tree, "root")}
      </div>
    </div>
  );
};

export default InteractiveFormulaRenderer;
