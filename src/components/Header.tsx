import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import SearchModal from "./SearchModal";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut Cmd+K or Ctrl+K or / to open search
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
          <span className="brand-icon">⚡</span>
          <div className="brand-text">
            <span className="brand-name">STEMCalculate</span>
            <span className="brand-tagline">Universal STEM Solvers & Formulas</span>
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
            <span className="search-btn-icon">🔍</span>
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