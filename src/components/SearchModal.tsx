import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { searchCatalog } from "../utils/search";
import { trackSearchQuery } from "../utils/analytics";
import MathView from "./MathView";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    return searchCatalog(query, 12);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      if (query.trim().length > 2) {
        trackSearchQuery(query, results.length);
      }
    }
  }, [isOpen, query, results.length]);

  // Global keydown listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault();
        }
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        navigate(results[selectedIndex].path);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <span className="search-modal-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder="Search all formulas, topics, subjects, variables (e.g. SUVAT, quadratic, momentum, pH)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button type="button" className="search-modal-close" onClick={onClose} aria-label="Close search">
            ✕
          </button>
        </div>

        <div className="search-modal-body">
          {results.length === 0 ? (
            <div className="search-no-results">
              <p>No calculations or topics found for &ldquo;{query}&rdquo;</p>
              <span className="search-hint">Try searching by variable symbol (e.g. &apos;v&apos;, &apos;u&apos;, &apos;a&apos;, &apos;t&apos;) or topic name.</span>
            </div>
          ) : (
            <ul className="search-results-list" role="listbox">
              {results.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <li
                    key={item.id}
                    className={`search-result-item ${isSelected ? "selected" : ""}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      navigate(item.path);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="search-item-info">
                      <div className="search-item-title-row">
                        <span className={`search-type-badge type-${item.type}`}>
                          {item.type.toUpperCase()}
                        </span>
                        {item.subjectId && (
                          <span className="search-subject-badge">{item.subjectId}</span>
                        )}
                        <h4 className="search-item-title">{item.title}</h4>
                      </div>

                      <p className="search-item-sub">{item.subtitle}</p>
                    </div>

                    {item.equation && (
                      <div className="search-item-math">
                        <MathView math={item.equation} />
                      </div>
                    )}

                    <span className="search-item-arrow">→</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="search-modal-footer">
          <span className="search-footer-hint">
            <kbd>↑</kbd> <kbd>↓</kbd> to navigate
          </span>
          <span className="search-footer-hint">
            <kbd>↵</kbd> to select
          </span>
          <span className="search-footer-hint">
            <kbd>ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
