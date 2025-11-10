import { Link, NavLink } from "react-router-dom";
import Bell from "../notifications/Bell.jsx";
// (Opsionale) nëse ke AuthContext:
// import { useAuth } from "../../contexts/AuthContext.jsx";

export default function Navbar() {
  // const { user } = useAuth();
  return (
    <nav className="nav">
      <div className="container row" style={{ alignItems: "center", gap: 12 }}>
        <div className="nav-left row" style={{ gap: 12 }}>
          <Link to="/" className="logo">
            Karriera<span>AL</span>
          </Link>
          <NavLink to="/feed" className="nav-link">Feed</NavLink>
          <NavLink to="/punet" className="nav-link">Punë</NavLink>
          <NavLink to="/kompani" className="nav-link">Kompani</NavLink>
          <NavLink to="/rrjeti" className="nav-link">Rrjeti</NavLink>
          <NavLink to="/ngjarje" className="nav-link">Ngjarje</NavLink>
          <NavLink to="/te-ruajturat" className="nav-link">Të ruajturat</NavLink>
        </div>

        <div className="nav-right row" style={{ gap: 8, marginLeft: "auto" }}>
          <Bell />
          <NavLink to="/applications" className="button-outline">Aplikimet</NavLink>
          <NavLink to="/profile" className="button-primary">Profili</NavLink>
          {/* {!user ? <NavLink to="/login">Login</NavLink> : <NavLink to="/profile">Profili</NavLink>} */}
        </div>
      </div>
    </nav>
  );
}
