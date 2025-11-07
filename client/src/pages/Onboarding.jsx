import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useToast } from "../contexts/ToastContext.jsx";
import { apiCompleteOnboarding } from "../lib/auth.js";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [photo, setPhoto] = useState(null);
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("Individ");
  const [skills, setSkills] = useState(["react", "node"]);

  if (!user) return null;

  function next(){ setStep(s => Math.min(3, s+1)); }
  function prev(){ setStep(s => Math.max(1, s-1)); }

  async function finish(){
    const payload = { photo: !!photo, bio, city, role, skills };
    const res = await apiCompleteOnboarding(payload);
    if (res.ok){
      updateUser({ onboarded: true, city, role }); 
      addToast("Onboarding i përfunduar!", "success");
      navigate("/feed");
    } else addToast("S’u përfundua onboarding", "error");
  }

  return (
    <div className="container" style={{marginTop:24, maxWidth: 720}}>
      <div className="card">
        <h2>Onboarding</h2>
        <p className="helper">Hapi {step} nga 3</p>

        {step === 1 && (
          <div className="form">
            <div>
              <div className="label">Foto (opsionale)</div>
              <input className="input" type="file" accept="image/*" onChange={e=>setPhoto(e.target.files?.[0]||null)} />
              <div className="helper">Ruajmë vetëm emrin e skedarit tani (mock).</div>
            </div>
            <div>
              <div className="label">Bio e shkurtër</div>
              <textarea className="textarea" rows={4} value={bio} onChange={e=>setBio(e.target.value)} placeholder="Përshkruaj eksperiencën dhe interesat..."/>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form">
            <div className="row">
              <div>
                <div className="label">Qyteti</div>
                <select className="select" value={city} onChange={e=>setCity(e.target.value)}>
                  <option value="">Zgjidh</option>
                  <option>Tiranë</option><option>Fier</option><option>Durrës</option><option>Shkodër</option>
                </select>
              </div>
              <div>
                <div className="label">Roli</div>
                <select className="select" value={role} onChange={e=>setRole(e.target.value)}>
                  <option>Individ</option>
                  <option>Kompani</option>
                </select>
              </div>
            </div>
            <div className="helper">Mund t’i ndryshosh më vonë te “Settings”.</div>
          </div>
        )}

        {step === 3 && (
          <div className="form">
            <div className="label">Aftësitë (shkruaj dhe shtyp Enter)</div>
            <SkillInput value={skills} onChange={setSkills}/>
            <div className="helper">Shembuj: react, node, mongodb, marketing…</div>
          </div>
        )}

        <div style={{display:"flex", justifyContent:"space-between", marginTop:16}}>
          <button className="button-outline" onClick={prev} disabled={step===1}>Prapa</button>
          {step<3 ? (
            <button className="button-primary" onClick={next}>Vazhdo</button>
          ) : (
            <button className="button-primary" onClick={finish}>Përfundo</button>
          )}
        </div>
      </div>
    </div>
  );
}

function SkillInput({ value = [], onChange }){
  const [text, setText] = useState("");
  function add(tag){
    const t = tag.trim().toLowerCase();
    if (!t) return;
    if (value.includes(t)) return;
    onChange([...value, t]);
  }
  function remove(tag){
    onChange(value.filter(x=>x!==tag));
  }
  function key(e){
    if(e.key==="Enter"){ e.preventDefault(); add(text); setText(""); }
  }
  return (
    <div>
      <div className="chips" style={{marginBottom:10}}>
        {value.map(s => (
          <span key={s} className="chip" style={{display:"inline-flex", alignItems:"center", gap:6}}>
            #{s} <button onClick={()=>remove(s)} style={{border:"none", background:"transparent", cursor:"pointer"}}>×</button>
          </span>
        ))}
      </div>
      <input className="input" value={text} onChange={e=>setText(e.target.value)} onKeyDown={key} placeholder="Shto aftësi dhe shtyp Enter" />
    </div>
  );
}
