import { useState } from "react";
import { apiLogin } from "../lib/auth.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useToast } from "../contexts/ToastContext.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function AuthLogin() {
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
      const u = await apiLogin({ email, password });
      login(u);
      addToast("Mirë se u ktheve!", "success");
      navigate(u.onboarded ? "/feed" : "/onboarding");
    } catch (err) {
      addToast(err.message || "Gabim gjatë hyrjes", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{marginTop:24, maxWidth: 520}}>
      <div className="card">
        <h2>Hyni</h2>
        <form onSubmit={submit} className="form">
          <div>
            <div className="label">Email</div>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="emri@shembull.al" />
          </div>
          <div>
            <div className="label">Fjalëkalimi</div>
            <input className="input" value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="••••••" />
          </div>
          <button className="button-primary" disabled={loading}>{loading ? "Duke u futur…" : "Hyni"}</button>
          <div className="helper">Nuk ke llogari? <Link to="/register">Regjistrohu</Link></div>
        </form>
      </div>
    </div>
  );
}
