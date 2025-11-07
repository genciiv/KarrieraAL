import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchJobs } from "../lib/api.js";
import { useToast } from "../contexts/ToastContext.jsx";
import { useApplications } from "../contexts/ApplicationsContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const jobs = await searchJobs();
      const found = jobs.find((j) => j.id === id);
      if (!found) {
        addToast("Puna nuk u gjet!", "error");
        navigate("/punet");
      } else setJob(found);
      setLoading(false);
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading)
    return (
      <div className="container" style={{ marginTop: 24 }}>
        <div className="card">Duke u ngarkuar…</div>
      </div>
    );

  if (!job) return null;

  return (
    <div
      className="container"
      style={{
        marginTop: 24,
        display: "grid",
        gap: 16,
        gridTemplateColumns: "2fr 1fr",
      }}
    >
      <div className="card" style={{ display: "grid", gap: 10 }}>
        <h2>{job.title}</h2>
        <div style={{ color: "var(--text-light)" }}>
          {job.company} • {job.city} {job.remote ? "• Remote" : ""}
        </div>
        <strong style={{ color: "var(--primary)" }}>{job.salary}</strong>
        <hr />
        <p>
          Përshkrim pune: <br />
          Kërkojmë profesionistë që zotërojnë teknologjitë më të fundit dhe
          aftësi bashkëpunimi.
        </p>
        <p>
          <b>Përgjegjësi:</b>
          <br />- Zhvillim front-end me React
          <br />- Bashkëpunim me ekipin
          <br />- Testim dhe optimizim
        </p>
        <p>
          <b>Kërkesa:</b>
          <br />- 1+ vit eksperiencë
          <br />- Njohje HTML, CSS, JS
          <br />- Git & teamwork
        </p>
        <p>
          <b>Afati:</b> {job.deadline}
        </p>
      </div>
      <div>
        <JobApply job={job} />
      </div>
    </div>
  );
}

function JobApply({ job }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cv, setCV] = useState(null);
  const [msg, setMsg] = useState("");
  const { addToast } = useToast();
  const { addApplication } = useApplications();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));

    addApplication({
      id: crypto.randomUUID(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      userId: user?.id || "guest",
      userName: user?.name || name || "Anonim",
      email: email,
      cvName: cv?.name || "",
      message: msg,
      appliedAt: new Date().toISOString(),
    });

    setLoading(false);
    addToast("Aplikimi u dërgua dhe u ruajt ✅", "success");
    setName("");
    setEmail("");
    setCV(null);
    setMsg("");
  }

  return (
    <div className="card">
      <h3>Apliko tani</h3>
      <form onSubmit={submit} className="form">
        <div>
          <div className="label">Emri dhe mbiemri</div>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={!user?.name}
            placeholder={user?.name || "Emri yt"}
          />
        </div>
        <div>
          <div className="label">Email</div>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <div className="label">Ngarko CV (PDF)</div>
          <input
            className="input"
            type="file"
            accept="application/pdf"
            onChange={(e) => setCV(e.target.files?.[0] || null)}
            required
          />
        </div>
        <div>
          <div className="label">Mesazh motivimi</div>
          <textarea
            className="textarea"
            rows={4}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Pse dëshiron këtë punë?"
            required
          ></textarea>
        </div>
        <button className="button-primary" disabled={loading}>
          {loading ? "Duke dërguar…" : "Dërgo aplikimin"}
        </button>
      </form>
    </div>
  );
}

export default JobDetails;
