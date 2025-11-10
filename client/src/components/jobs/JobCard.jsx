import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useApplications } from "../../contexts/ApplicationsContext.jsx";

export default function JobCard({ job }) {
  const { user } = useAuth();
  const { listByUser, apply } = useApplications();

  const applied = user && listByUser(user.id).some(a => a.jobId === job.id);

  return (
    <div className="card job" style={{ position: "relative" }}>
      {applied && <div className="ribbon">Aplikuar</div>}

      <div>
        <div className="job-header">
          <div className="job-avatar">{(job.company || "C")[0]}</div>
          <div>
            <div className="job-title">{job.title}</div>
            <div className="job-company">{job.company}</div>
          </div>
        </div>

        <div className="job-meta">
          <span>{job.city}</span>
          {job.remote && <span>• Remote</span>}
          {job.type && <span>• {job.type}</span>}
        </div>

        <div className="job-salary">{job.salary}</div>
      </div>

      <div className="job-actions">
        <Link to={`/punet/${job.id}`}>Detaje</Link>
        {!applied ? (
          <button
            className="btn-apply"
            onClick={() => apply({ userId: user?.id || "guest", jobId: job.id })}
          >
            Apliko
          </button>
        ) : (
          <button className="btn-apply" disabled>✔</button>
        )}
      </div>
    </div>
  );
}
