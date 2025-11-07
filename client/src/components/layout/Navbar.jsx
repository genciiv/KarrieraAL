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

        {/* Links */}
        <nav style={linksStyle}>
          <Link to="/punet">Punë</Link>
          <Link to="/kompani">Kompani</Link>
          <Link to="/rrjeti">Rrjeti</Link>
          <Link to="/ngjarje">Ngjarje</Link>
          {user && <Link to="/applications">Aplikimet</Link>}
          {user && <Link to="/messages">Mesazhe</Link>}
        </nav>

        {/* CTA */}
        <div style={ctaStyle}>
          {!user ? (
            <>
              <Link to="/login" className="button-outline">
                Hyni
              </Link>
              <Link to="/register" className="button-primary">
                Regjistrohu
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="button-outline">
                {user.name || "Profili"}
              </Link>
              <button onClick={doLogout} className="button-primary">
                Dil
              </button>
            </>
          )}
        </div>

        {/* Mobile toggle (opsional) */}
        <button
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", fontSize: 20, display: "none" }}
          className="menu-toggle"
        >
          ☰
        </button>
      </div>

      {/* Drawer menu për mobile */}
      {open && (
        <div style={drawerStyle}>
          <Link to="/punet" onClick={() => setOpen(false)}>Punë</Link>
          <Link to="/kompani" onClick={() => setOpen(false)}>Kompani</Link>
          <Link to="/rrjeti" onClick={() => setOpen(false)}>Rrjeti</Link>
          <Link to="/ngjarje" onClick={() => setOpen(false)}>Ngjarje</Link>
          {user && (
            <>
              <Link to="/applications" onClick={() => setOpen(false)}>Aplikimet</Link>
              <Link to="/messages" onClick={() => setOpen(false)}>Mesazhe</Link>
              <Link to="/profile" onClick={() => setOpen(false)}>Profili</Link>
              <button onClick={doLogout} className="button-primary">Dil</button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

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
};

const brandStyle = {
  fontSize: "1.6rem",
  fontWeight: "700",
  color: "var(--text-dark)",
  textDecoration: "none",
};

const linksStyle = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
};

const ctaStyle = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const drawerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "10px 20px",
  background: "var(--white)",
  borderTop: "1px solid var(--border)",
};
