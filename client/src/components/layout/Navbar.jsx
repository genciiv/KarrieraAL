import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function doLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="navbar" style={navStyle}>
      <div style={containerStyle}>
        {/* Logo */}
        <Link to="/" style={brandStyle}>
          Karriera<span style={{ color: "var(--primary)" }}>AL</span>
        </Link>

        {/* Links desktop */}
        <nav style={linksStyle} className="nav-links">
          <Link to="/punet">Punë</Link>
          <Link to="/kompani">Kompani</Link>
          <Link to="/rrjeti">Rrjeti</Link>
          <Link to="/ngjarje">Ngjarje</Link>
          {user && <Link to="/applications">Aplikimet</Link>}
          {user?.role === "Kompani" && <Link to="/punet/shto">Posto punë</Link>}
          {user && <Link to="/messages">Mesazhe</Link>}
        </nav>

        {/* CTA */}
        <div style={ctaStyle} className="nav-cta">
          {!user ? (
            <>
              <Link to="/login" className="button-outline">Hyni</Link>
              <Link to="/register" className="button-primary">Regjistrohu</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="button-outline">{user.name || "Profili"}</Link>
              <button onClick={doLogout} className="button-primary">Dil</button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="menu-toggle"
          style={{ background: "none", border: "none", fontSize: 22, display: "none" }}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div style={drawerStyle} className="nav-drawer open">
          <Link to="/punet" onClick={() => setOpen(false)}>Punë</Link>
          <Link to="/kompani" onClick={() => setOpen(false)}>Kompani</Link>
          <Link to="/rrjeti" onClick={() => setOpen(false)}>Rrjeti</Link>
          <Link to="/ngjarje" onClick={() => setOpen(false)}>Ngjarje</Link>
          {user && <Link to="/applications" onClick={() => setOpen(false)}>Aplikimet</Link>}
          {user?.role === "Kompani" && <Link to="/punet/shto" onClick={() => setOpen(false)}>Posto punë</Link>}
          {user && <Link to="/messages" onClick={() => setOpen(false)}>Mesazhe</Link>}
          {user ? (
            <>
              <Link to="/profile" onClick={() => setOpen(false)}>Profili</Link>
              <button onClick={() => { setOpen(false); doLogout(); }} className="button-primary" style={{ marginTop: 8 }}>
                Dil
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="button-outline" style={{ marginTop: 8 }}>Hyni</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="button-primary">Regjistrohu</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

// ---- Styles (inline helpers)
const navStyle = {
  background: "var(--white)",
  borderBottom: "1px solid var(--border)",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  maxWidth: "1100px",
  margin: "0 auto",
  gap: 12,
};

const brandStyle = {
  fontSize: "1.6rem",
  fontWeight: 800,
  color: "var(--text-dark)",
  textDecoration: "none",
  letterSpacing: 0.3,
};

const linksStyle = { display: "flex", gap: 20, alignItems: "center" };
const ctaStyle = { display: "flex", gap: 10, alignItems: "center" };

const drawerStyle = {
  display: "grid",
  gap: 10,
  padding: "12px 20px",
  background: "var(--white)",
  borderTop: "1px solid var(--border)",
};
