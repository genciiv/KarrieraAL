import { Link } from "react-router-dom";

export default function CompanyCard({ c, followed, onToggleFollow }) {
  const initial = c.name?.[0]?.toUpperCase() || "?";
  return (
    <div className="card" style={{ display: "grid", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div className="avatar" style={{ width: 56, height: 56, fontSize: 18 }}>{initial}</div>
        <div>
          <Link to={`/company/${c.id}`} style={{ fontWeight: 700 }}>{c.name}</Link>
          <div style={{ color: "var(--text-light)", fontSize: 14 }}>
            {c.city} • {c.industry} • {c.employees}
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <button className="button-outline" onClick={() => onToggleFollow(c.id)}>
            {followed ? "Ndalo ndjekjen" : "Ndiq"}
          </button>
        </div>
      </div>

      {c.openings?.length ? (
        <div className="chips">
          {c.openings.slice(0, 3).map((o) => (
            <span key={o.id} className="chip">{o.title}</span>
          ))}
          {c.openings.length > 3 && <span className="chip">+{c.openings.length - 3} të tjera</span>}
        </div>
      ) : (
        <div className="helper">S’ka pozicione të hapura aktualisht</div>
      )}
    </div>
  );
}
