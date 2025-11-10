import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-inner">
        {/* Logo */}
        <Link to="/" className="logo">
          Karriera<span>AL</span>
        </Link>

        {/* Kërkimi */}
        <div className="nav-search">
          <input type="text" placeholder="Kërko punë, kompani, persona..." />
        </div>

        {/* Lidhjet (desktop) */}
        <div className="nav-links">
          <NavLink to="/feed" className="nav-link">Feed</NavLink>
          <NavLink to="/punet" className="nav-link">Punë</NavLink>
          <NavLink to="/kompani" className="nav-link">Kompani</NavLink>
          <NavLink to="/rrjeti" className="nav-link">Rrjeti</NavLink>
          <NavLink to="/ndjekjet" className="nav-link">Ndjekjet</NavLink>
        </div>

        {/* CTA Buttons */}
        <div className="nav-right">
          <NavLink to="/applications" className="button-outline">Aplikimet</NavLink>
          <NavLink to="/profile" className="button-primary">Profili</NavLink>
        </div>

        {/* Toggle për mobile */}
        <button className="nav-toggle" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Drawer (mobile) */}
      <div className={`nav-drawer ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
        <NavLink to="/feed">Feed</NavLink>
        <NavLink to="/punet">Punë</NavLink>
        <NavLink to="/kompani">Kompani</NavLink>
        <NavLink to="/rrjeti">Rrjeti</NavLink>
        <NavLink to="/ndjekjet">Ndjekjet</NavLink>
        <NavLink to="/applications">Aplikimet</NavLink>
        <NavLink to="/profile">Profili</NavLink>
      </div>
    </nav>
  );
}
