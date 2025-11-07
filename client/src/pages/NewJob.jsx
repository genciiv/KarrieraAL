import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useToast } from "../contexts/ToastContext.jsx";
import { useJobs } from "../contexts/JobsContext.jsx";
import { Navigate, useNavigate } from "react-router-dom";

export default function NewJob() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { addJob } = useJobs();
  const navigate = useNavigate();

  // lejo vetëm kompani
  if (!user) return <Navigate to="/login" replace />;
  if (user?.role !== "Kompani")
    return <div className="container" style={{marginTop:24}}><div className="card">Kjo faqe lejohet vetëm për llogari “Kompani”.</div></div>;

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [remote, setRemote] = useState(false);
  const [salary, setSalary] = useState("");
  const [deadline, setDeadline] = useState("");
  const [desc, setDesc] = useState("");

  function submit(e){
    e.preventDefault();
    if (!title || !city || !deadline) {
      addToast("Titulli, qyteti dhe afati janë të detyrueshme.", "error");
      return;
    }
    addJob({
      title,
      company: user.name || "Kompani",
      city,
      remote,
      salary: salary || "€—",
      deadline,
      desc
    });
    addToast("Puna u publikua ✅", "success");
    navigate("/punet");
  }

  return (
    <div className="container" style={{marginTop:24, maxWidth: 800}}>
      <div className="card" style={{display:"grid", gap:14}}>
        <h2>Posto punë</h2>
        <form className="form" onSubmit={submit}>
          <div className="row">
            <div>
              <div className="label">Titulli</div>
              <input className="input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="p.sh. Zhvillues React" />
            </div>
            <div>
              <div className="label">Qyteti</div>
              <select className="select" value={city} onChange={e=>setCity(e.target.value)}>
                <option value="">Zgjidh</option>
                <option>Tiranë</option><option>Fier</option><option>Durrës</option><option>Shkodër</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div>
              <div className="label">Pagë (opsionale)</div>
              <input className="input" value={salary} onChange={e=>setSalary(e.target.value)} placeholder="p.sh. €900-1200" />
            </div>
            <div>
              <div className="label">Afati</div>
              <input className="input" type="date" value={deadline} onChange={e=>setDeadline(e.target.value)} />
            </div>
          </div>

          <div style={{display:"flex", gap:10, alignItems:"center"}}>
            <input id="remote" type="checkbox" checked={remote} onChange={e=>setRemote(e.target.checked)} />
            <label htmlFor="remote">Remote</label>
          </div>

          <div>
            <div className="label">Përshkrimi</div>
            <textarea className="textarea" rows={5} value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Detyrat, kërkesat, benefitet…"></textarea>
          </div>

          <div style={{display:"flex", justifyContent:"flex-end"}}>
            <button className="button-primary" type="submit">Publiko</button>
          </div>
        </form>
      </div>
    </div>
  );
}
