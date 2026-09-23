import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import SearchModal from "./SearchModal";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut Cmd+K or Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="site-header">
        <Link to="/" className="site-brand">
          {/* Inline SVG matching the favicon — atomic orbit design */}
          <span className="brand-icon" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width="38"
              height="38"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="32" cy="32" r="32" fill="#0b1f3a" />
              <circle cx="32" cy="32" r="30" fill="#0d2347" />
              <radialGradient id="hdr-glow" cx="50%" cy="50%" r="40%">
                <stop offset="0%" stopColor="#4a9eff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0b1f3a" stopOpacity="0" />
              </radialGradient>
              <circle cx="32" cy="30" r="18" fill="url(#hdr-glow)" />
              <ellipse cx="32" cy="29" rx="16" ry="6" fill="none" stroke="white" strokeWidth="1.2" opacity="0.9" />
              <ellipse cx="32" cy="29" rx="16" ry="6" fill="none" stroke="white" strokeWidth="1.2" opacity="0.9" transform="rotate(60 32 29)" />
              <ellipse cx="32" cy="29" rx="16" ry="6" fill="none" stroke="white" strokeWidth="1.2" opacity="0.9" transform="rotate(120 32 29)" />
              <circle cx="32" cy="29" r="3" fill="white" />
              <circle cx="48" cy="29" r="1.5" fill="white" opacity="0.95" />
              <circle cx="24" cy="15.5" r="1.5" fill="white" opacity="0.95" />
              <circle cx="24" cy="42.5" r="1.5" fill="white" opacity="0.95" />
              <text
                x="32"
                y="58"
                fontFamily="Arial, sans-serif"
                fontSize="7.5"
                fontWeight="600"
                fill="white"
                textAnchor="middle"
                opacity="0.92"
                letterSpacing="0.5"
              >
                E=hf
              </text>
            </svg>
          </span>
          <div className="brand-text">
            <span className="brand-name">STEMCalculate</span>
            <span className="brand-tagline">Universal STEM Solvers &amp; Formulas</span>
          </div>
        </Link>

        <nav className="main-nav" aria-label="Main Navigation">
          <NavLink
            to="/formulas"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Formula Library
          </NavLink>
          <NavLink
            to="/calculators"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Calculators
          </NavLink>
          <NavLink
            to="/formula-finder"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            Formula Finder
          </NavLink>

          <button
            type="button"
            className="nav-search-btn"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open search dialog"
          >
            <svg
              className="search-btn-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="search-btn-text">Search...</span>
            <kbd className="search-kbd">⌘K</kbd>
          </button>
        </nav>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

export default Header;