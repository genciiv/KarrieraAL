import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function doLogout(){
    logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">Karriera<span>AL</span></Link>

        <nav className="nav-links">
          <Link to="/punet">Punë</Link>
          <Link to="/kompani">Kompani</Link>
          <Link to="/rrjeti">Rrjeti</Link>
          <Link to="/ngjarje">Ngjarje</Link>
          <Link to="/messages">Mesazhe</Link>
        </nav>

        <div className="nav-cta">
          {!user ? (
            <>
              <Link to="/login" className="button-outline">Hyni</Link>
              <Link to="/register" className="button-primary">Regjistrohu</Link>
            </>
          ) : (
            <>
              <Link to="/feed" className="button-outline">Rrjeti</Link>
              <Link to="/profile" className="button-primary">{user.name || "Profili"}</Link>
              <button className="menu-toggle" onClick={() => setOpen(v => !v)}>Menu</button>
              <button className="button-outline" onClick={doLogout}>Dil</button>
            </>
          )}
        </div>
      </div>

      <div className={`nav-drawer ${open ? "open" : ""}`}>
        <div className="container">
          <Link to="/punet" onClick={()=>setOpen(false)}>Punë</Link>
          <Link to="/kompani" onClick={()=>setOpen(false)}>Kompani</Link>
          <Link to="/rrjeti" onClick={()=>setOpen(false)}>Rrjeti</Link>
          <Link to="/ngjarje" onClick={()=>setOpen(false)}>Ngjarje</Link>
          <Link to="/messages" onClick={()=>setOpen(false)}>Mesazhe</Link>
          {!user ? (
            <div style={{ display:"flex", gap:10, padding: "12px 0" }}>
              <Link to="/login" className="button-outline" onClick={()=>setOpen(false)}>Hyni</Link>
              <Link to="/register" className="button-primary" onClick={()=>setOpen(false)}>Regjistrohu</Link>
            </div>
          ) : (
            <div style={{ display:"flex", gap:10, padding: "12px 0" }}>
              <Link to="/profile" className="button-outline" onClick={()=>setOpen(false)}>Profili</Link>
              <button className="button-primary" onClick={()=>{ setOpen(false); doLogout(); }}>Dil</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
