import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { COMPANIES } from "../data/companies.js";

const FOLLOW_KEY = "ka_followed_companies";

export default function Company() {
  const { id } = useParams();
  const [followed, setFollowed] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(FOLLOW_KEY);
    if (raw) setFollowed(JSON.parse(raw));
  }, []);

  function toggleFollow(cid) {
    setFollowed((prev) => {
      const next = prev.includes(cid) ? prev.filter((x) => x !== cid) : [cid, ...prev];
      localStorage.setItem(FOLLOW_KEY, JSON.stringify(next));
      return next;
    });
  }

  const c = useMemo(() => COMPANIES.find((x) => x.id === id), [id]);
  if (!c) {
    return (
      <div className="container" style={{ marginTop: 24 }}>
        <div className="card">Kompania nuk u gjet.</div>
      </div>
    );
  }

  const initial = c.name?.[0]?.toUpperCase() || "?";
  const isFollowed = followed.includes(c.id);

  return (
    <div className="container" style={{ marginTop: 24, maxWidth: 900 }}>
      <div className="card" style={{ display: "grid", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className="avatar" style={{ width: 72, height: 72, fontSize: 22 }}>{initial}</div>
          <div>
            <h2 style={{ margin: 0 }}>{c.name}</h2>
            <div style={{ color: "var(--text-light)" }}>
              {c.city} • {c.industry} • {c.employees}
            </div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <button className="button-outline" onClick={() => toggleFollow(c.id)}>
              {isFollowed ? "Ndalo ndjekjen" : "Ndiq"}
            </button>
            {c.website && (
              <a className="button-primary" href={c.website} target="_blank" rel="noreferrer" style={{ marginLeft: 8 }}>
                Website
              </a>
            )}
          </div>
        </div>

        <p style={{ marginTop: 8 }}>{c.about}</p>
      </div>

      <div className="card" style={{ marginTop: 16, display: "grid", gap: 10 }}>
        <h3 style={{ margin: 0 }}>Pozicione të hapura</h3>
        {!c.openings?.length && <div className="helper">Aktualisht s’ka pozicione të hapura.</div>}

        <div className="grid grid-2">
          {c.openings?.map((o) => (
            <div key={o.id} className="item" style={{ display: "grid", gap: 6 }}>
              <div style={{ fontWeight: 700 }}>{o.title}</div>
              <div style={{ color: "var(--text-light)" }}>
                {o.city} {o.remote ? "• Remote" : ""} {o.salary ? `• ${o.salary}` : ""}
              </div>
              <div>
                <Link to={`/punet/${o.id}`} className="button-primary">Shiko detajet</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ margin: 0 }}>Kontakte</h3>
        <div className="helper">Për bashkëpunime dhe rekrutim: {c.website || "—"}</div>
      </div>
    </div>
  );
}
