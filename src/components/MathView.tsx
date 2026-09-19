import React, { useMemo } from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

type MathViewProps = {
  /**
   * Pure LaTeX math expression or mixed string containing $...$ or LaTeX commands.
   */
  math?: string;
  text?: string;
  block?: boolean;
  className?: string;
  ariaLabel?: string;
};

/**
 * Clean up common pseudo-latex or plain symbols into valid LaTeX for KaTeX.
 */
function sanitizeLatex(expr: string): string {
  if (!expr) return "";
  let clean = expr.trim();

  // Replace unicode multiplication / division with LaTeX commands if not already LaTeX
  clean = clean.replace(/×/g, "\\times ");
  clean = clean.replace(/÷/g, "\\div ");
  clean = clean.replace(/±/g, "\\pm ");
  clean = clean.replace(/²/g, "^2");
  clean = clean.replace(/³/g, "^3");
  clean = clean.replace(/½/g, "\\frac{1}{2}");
  clean = clean.replace(/⅓/g, "\\frac{1}{3}");
  clean = clean.replace(/¼/g, "\\frac{1}{4}");
  clean = clean.replace(/¾/g, "\\frac{3}{4}");
  clean = clean.replace(/√\(([^)]+)\)/g, "\\sqrt{$1}");
  clean = clean.replace(/√([a-zA-Z0-9]+)/g, "\\sqrt{$1}");
  clean = clean.replace(/π/g, "\\pi ");
  clean = clean.replace(/θ/g, "\\theta ");
  clean = clean.replace(/λ/g, "\\lambda ");
  clean = clean.replace(/Δ/g, "\\Delta ");
  clean = clean.replace(/ρ/g, "\\rho ");
  clean = clean.replace(/τ/g, "\\tau ");
  clean = clean.replace(/ω/g, "\\omega ");
  clean = clean.replace(/σ/g, "\\sigma ");
  clean = clean.replace(/μ/g, "\\mu ");
  clean = clean.replace(/ε/g, "\\varepsilon ");
  clean = clean.replace(/φ/g, "\\phi ");
  clean = clean.replace(/∞/g, "\\infty ");

  return clean;
}

/**
 * Parses mixed text containing inline LaTeX e.g. "Supply Voltage $V_{in}$ (V)" or raw LaTeX.
 */
export function MathView({ math, text, block = false, className = "", ariaLabel }: MathViewProps) {
  const content = math ?? text ?? "";

  const parsedElements = useMemo(() => {
    if (!content) return null;

    // If explicit math prop passed, render directly as KaTeX
    if (math !== undefined) {
      const sanitized = sanitizeLatex(math);
      if (block) {
        return (
          <div className={`math-scroll-wrapper ${className}`} aria-label={ariaLabel}>
            <BlockMath
              math={sanitized}
              errorColor="#b91c1c"
              renderError={() => <span className="math-fallback">{math}</span>}
            />
          </div>
        );
      }
      return (
        <span className={`math-inline-wrapper ${className}`} aria-label={ariaLabel}>
          <InlineMath
            math={sanitized}
            errorColor="#b91c1c"
            renderError={() => <span className="math-fallback">{math}</span>}
          />
        </span>
      );
    }

    // If text contains $...$ delimiters, parse tokens
    if (content.includes("$")) {
      const parts = content.split(/(\$[^$]+\$)/g);
      return (
        <span className={className}>
          {parts.map((part, index) => {
            if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
              const innerMath = sanitizeLatex(part.slice(1, -1));
              return (
                <InlineMath
                  key={index}
                  math={innerMath}
                  errorColor="#b91c1c"
                  renderError={() => <span>{part}</span>}
                />
              );
            }
            return <React.Fragment key={index}>{part}</React.Fragment>;
          })}
        </span>
      );
    }

    // Check if text looks like pure LaTeX (contains backslashes like \frac, \Delta, \times, etc.)
    if (/(\\[a-zA-Z]+|\^|_|\+|-|=)/.test(content) && content.includes("\\")) {
      const sanitized = sanitizeLatex(content);
      if (block) {
        return (
          <div className={`math-scroll-wrapper ${className}`} aria-label={ariaLabel}>
            <BlockMath
              math={sanitized}
              errorColor="#b91c1c"
              renderError={() => <span className="math-fallback">{content}</span>}
            />
          </div>
        );
      }
      return (
        <span className={`math-inline-wrapper ${className}`} aria-label={ariaLabel}>
          <InlineMath
            math={sanitized}
            errorColor="#b91c1c"
            renderError={() => <span className="math-fallback">{content}</span>}
          />
        </span>
      );
    }

    // Default plain text
    return <span className={className}>{content}</span>;
  }, [content, math, block, className, ariaLabel]);

  return <>{parsedElements}</>;
}

export default MathView;
