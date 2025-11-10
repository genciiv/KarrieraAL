import { Link } from "react-router-dom";

const colorByIndustry = (industry) => {
  switch (industry) {
    case "Software":   return "badge-soft";
    case "IT Services":return "badge-it";
    case "HR & Rekrutim": return "badge-hr";
    case "Green Tech": return "badge-green";
    case "EduTech":    return "badge-edu";
    case "Finance":    return "badge-fin";
    default:           return "";
  }
};

export default function CompanyCard({ c, following, followersCount = 0, onToggleFollow, onShowAll }) {
  const jobs = c.openJobs || [];
  const preview = jobs.slice(0, 2);
  const hasMore = jobs.length > 2;

  return (
    <div className="card company-card" style={{ position: "relative" }}>
      {following && <div className="ribbon">👀 Duke ndjekur</div>}

      <div className="card-head">
        <div className="avatar-40">{c.name?.[0] || "K"}</div>
        <div style={{ flex: 1 }}>
          <div className="title-md">{c.name}</div>
          <div className="meta-row">
            <span>{c.city}</span>
            <span>{c.size}</span>
          </div>
        </div>

        <div className="actions" style={{ alignSelf: "flex-start" }}>
          <button
            className={following ? "btn-primary" : "btn-ghost"}
            onClick={() => onToggleFollow?.(c.id)}
            title={following ? "Ndalo ndjekjen" : "Ndiq kompaninë"}
          >
            {following ? "Duke ndjekur" : "Ndiq"}
          </button>
        </div>
      </div>

      <div className="badges" style={{ marginTop: 10 }}>
        <span className={`badge ${colorByIndustry(c.industry)}`}>{c.industry}</span>
        <span className="badge">👥 {followersCount} ndjekës</span>
      </div>

      {c.about && (
        <p style={{ margin: "12px 0 10px", color: "#374151" }}>
          {c.about}
        </p>
      )}

      {/* punët e hapura (deri 2) */}
      <div className="pills" title={hasMore ? "Shih të gjitha pozicionet" : ""}>
        {preview.length === 0 ? (
          <span className="subtitle">S’ka pozicione të hapura aktualisht.</span>
        ) : (
          <>
            {preview.map((j) => (
              <Link key={j.id} to={j.link} className="pill">{j.title}</Link>
            ))}
            {hasMore && (
              <button className="pill" onClick={() => onShowAll?.(c)}>
                +{jobs.length - 2} të tjera
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
