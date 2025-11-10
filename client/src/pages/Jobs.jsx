import { useMemo, useState } from "react";
import JobCard from "../components/jobs/JobCard.jsx";

/* Mock data – funksionon pa backend */
const JOBS_MOCK = [
  { id: "j1", title: "Full-Stack (MERN)", company: "TechAL", city: "Tiranë",  remote: true,  salary: "1,200–1,600€", deadline: "30 Dhj", type: "Full-time" },
  { id: "j2", title: "UI/UX Designer",     company: "Studio Durrës", city: "Durrës", remote: false, salary: "1,000–1,300€", deadline: "15 Dhj", type: "Full-time" },
  { id: "j3", title: "Data Analyst",       company: "DataFier",      city: "Fier",   remote: false, salary: "900–1,200€",   deadline: "20 Dhj", type: "Full-time" },
  { id: "j4", title: "DevOps Junior",      company: "AlbaniaSoft",   city: "Durrës", remote: true,  salary: "1,100–1,400€", deadline: "10 Jan", type: "Internship" },
  { id: "j5", title: "Frontend React",     company: "BrightTech",    city: "Tiranë", remote: false, salary: "1,000–1,500€", deadline: "25 Dhj", type: "Full-time" },
  { id: "j6", title: "Backend Node.js",    company: "CloudBase",     city: "Vlorë",  remote: true,  salary: "1,200–1,700€", deadline: "18 Dhj", type: "Full-time" },
  { id: "j7", title: "Project Manager",    company: "Vision Group",  city: "Tiranë", remote: false, salary: "1,300–1,800€", deadline: "05 Jan", type: "Full-time" },
  { id: "j8", title: "QA Tester",          company: "SoftTest",      city: "Durrës", remote: false, salary: "900–1,100€",   deadline: "27 Dhj", type: "Internship" },
  { id: "j9", title: "IT Support",         company: "HelpDesk AL",   city: "Shkodër",remote: false, salary: "700–900€",     deadline: "21 Dhj", type: "Full-time" },
  { id: "j10",title: "BI Developer",       company: "InsightAL",     city: "Tiranë", remote: true,  salary: "1,400–1,900€", deadline: "08 Jan", type: "Full-time" },
];

const unique = (arr) => Array.from(new Set(arr.filter(Boolean)));

export default function Jobs() {
  const baseJobs = JOBS_MOCK;

  // State
  const [q, setQ] = useState("");
  const [city, setCity] = useState("Të gjitha");
  const [type, setType] = useState("Të gjitha");

  // Options dinamike nga të dhënat
  const cityOptions = useMemo(
    () => ["Të gjitha", ...unique(baseJobs.map(j => j.city))],
    [baseJobs]
  );
  const typeOptions = useMemo(
    () => ["Të gjitha", ...unique(baseJobs.map(j => j.type))],
    [baseJobs]
  );

  // Filtrim + kërkim
  const jobs = useMemo(() => {
    let list = [...baseJobs];

    const qn = q.trim().toLowerCase();
    if (qn) {
      list = list.filter(j =>
        [j.title, j.company, j.city, j.type].join(" ").toLowerCase().includes(qn)
      );
    }
    if (city !== "Të gjitha") list = list.filter(j => j.city === city);
    if (type !== "Të gjitha") list = list.filter(j => j.type === type);

    return list;
  }, [baseJobs, q, city, type]);

  const clearFilters = () => {
    setQ("");
    setCity("Të gjitha");
    setType("Të gjitha");
  };

  return (
    <div className="container" style={{ padding: "24px 0" }}>
      <h2 style={{ margin: "0 0 12px" }}>Punë</h2>

      {/* FILTER BAR */}
      <div className="card filter-bar" style={{ marginBottom: 16 }}>
        {/* Rreshti 1: kërkimi */}
        <div className="filter-row">
          <input
            className="search-input"
            placeholder="Kërko titull, kompani, qytet…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="reset-btn" onClick={clearFilters}>Rivendos filtrat</button>
        </div>

        {/* Rreshti 2: Qyteti */}
        <div className="filter-row">
          <span className="filter-label">Qyteti:</span>
          <div className="chips">
            {cityOptions.map((opt) => (
              <button
                key={opt}
                className={`chip-btn ${city === opt ? "active" : ""}`}
                onClick={() => setCity(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Rreshti 3: Tipi */}
        <div className="filter-row">
          <span className="filter-label">Tipi:</span>
          <div className="chips">
            {typeOptions.map((opt) => (
              <button
                key={opt}
                className={`chip-btn ${type === opt ? "active" : ""}`}
                onClick={() => setType(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* info */}
        <div className="filter-row" style={{ color: "#6b7280", fontSize: 14 }}>
          {jobs.length} rezultate
          {q && <> • kërkim për <strong>{q}</strong></>}
          {(city !== "Të gjitha" || type !== "Të gjitha") && (
            <>
              {" "}• filtruar ( {city}{type !== "Të gjitha" ? `, ${type}` : ""} )
            </>
          )}
        </div>
      </div>

      {/* GRID: 4 kolona */}
      {jobs.length === 0 ? (
        <div className="card" style={{ textAlign: "center", color: "#6b7280" }}>
          Nuk u gjet asnjë rezultat. Provo ndrysho filtrat.
        </div>
      ) : (
        <div className="cards-grid cards-4">
          {jobs.map(job => <JobCard key={job.id} job={job} />)}
        </div>
      )}
    </div>
  );
}
