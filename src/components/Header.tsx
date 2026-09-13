import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="site-name">
        PHYSICS REFERENCE
      </Link>

      <nav className="main-nav">
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
      </nav>
    </header>
  );
}

export default Header;