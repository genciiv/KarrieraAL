import { Link } from "react-router-dom";

export default function JobCard({ job, saved, onSave, onApply }) {
  return (
    <div className="card job-card">
      <div className="job-main">
        <div className="job-title">{job.title}</div>
        <div className="job-company">
          {job.company} • {job.city} • {job.type}
        </div>
        <div className="job-tags">
          {job.tags?.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </div>

      <div className="job-side">
        <div className="job-salary">
          {job.salaryMin?.toLocaleString("sq-AL")}&ndash;{job.salaryMax?.toLocaleString("sq-AL")}€
        </div>
        <div className="job-deadline">
          Afati: {new Date(job.deadline).toLocaleDateString("sq-AL", { day: "2-digit", month: "short" })}
        </div>
        <div className="job-actions">
          <button className="button-outline" onClick={() => onSave(job.id)}>
            {saved ? "E ruajtur" : "Ruaj"}
          </button>
          <button className="button-primary" onClick={() => onApply(job)}>Apliko</button>
          <Link className="button-link" to={`/punet/${job.id}`}>Detaje</Link>
        </div>
      </div>
    </div>
  );
}
