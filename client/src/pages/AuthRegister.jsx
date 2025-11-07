import { useState } from "react";
import { apiRegister } from "../lib/auth.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useToast } from "../contexts/ToastContext.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function AuthRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      setLoading(true);
      const u = await apiRegister({ name, email, password });
      login(u);
      addToast("Llogaria u krijua!", "success");
      navigate("/onboarding");
    } catch (err) {
      addToast(err.message || "Gabim gjatë regjistrimit", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{marginTop:24, maxWidth: 520}}>
      <div className="card">
        <h2>Regjistrohu</h2>
        <form onSubmit={submit} className="form">
          <div>
            <div className="label">Emri</div>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Emri yt" />
          </div>
          <div>
            <div className="label">Email</div>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="emri@shembull.al" />
          </div>
          <div>
            <div className="label">Fjalëkalimi</div>
            <input className="input" value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="≥ 6 shenja" />
          </div>
          <button className="button-primary" disabled={loading}>{loading ? "Duke krijuar…" : "Krijo llogari"}</button>
          <div className="helper">Ke llogari? <Link to="/login">Hyni</Link></div>
        </form>
      </div>
    </div>
  );
}
