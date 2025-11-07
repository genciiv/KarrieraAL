import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useApplications } from "../../contexts/ApplicationsContext.jsx";

export default function JobCard({ job }) {
  const { user } = useAuth();
  const { listByUser } = useApplications();
  const applied = user && listByUser(user.id).some(a => a.jobId === job.id);

  return (
    <div className="card" style={{ display: "grid", gap: 6, position: "relative" }}>
      {applied && (
        <div style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: "var(--secondary)",
          color: "var(--text-dark)",
          fontSize: "0.8rem",
          fontWeight: 600,
          padding: "4px 10px",
          borderRadius: "999px"
        }}>
          ✅ Aplikuar
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <div>
          <h3 style={{ margin: "0 0 4px" }}>{job.title}</h3>
          <div style={{ color: "var(--text-light)" }}>
            {job.company} • {job.city} {job.remote ? "• Remote" : ""}
          </div>
        </div>
        <strong style={{ color: "var(--primary)" }}>{job.salary}</strong>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8, color: "var(--text-light)", fontSize: 14 }}>
        <span>Afati: {job.deadline}</span>
        <span style={{ marginLeft: "auto" }}>
          <Link to={`/punet/${job.id}`}>Detaje</Link>
        </span>
      </div>
    </div>
  );
}
