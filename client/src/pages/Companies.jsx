import { useEffect, useMemo, useState } from "react";
import { COMPANIES } from "../data/companies.js";
import { Link } from "react-router-dom";

const FOLLOW_KEY = "ka_followed_companies";

export default function Companies() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [industry, setIndustry] = useState("");
  const [followed, setFollowed] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(FOLLOW_KEY);
    if (raw) setFollowed(JSON.parse(raw));
  }, []);
  useEffect(() => {
    localStorage.setItem(FOLLOW_KEY, JSON.stringify(followed));
  }, [followed]);

  const cities = useMemo(() => ["", ...new Set(COMPANIES.map((c) => c.city))], []);
  const industries = useMemo(() => ["", ...new Set(COMPANIES.map((c) => c.industry))], []);

  function toggleFollow(id) {
    setFollowed((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]));
  }

  const list = useMemo(() => {
    const s = q.toLowerCase().trim();
    return COMPANIES.filter((c) => {
      const matchesQ =
        !s ||
        c.name.toLowerCase().includes(s) ||
        c.industry.toLowerCase().includes(s) ||
        c.city.toLowerCase().includes(s);
      const matchesCity = !city || c.city === city;
      const matchesInd = !industry || c.industry === industry;
      return matchesQ && matchesCity && matchesInd;
    });
  }, [q, city, industry]);

  return (
    <div className="container" style={{ marginTop: 24 }}>
      <div className="card" style={{ display: "grid", gap: 12 }}>
        <h2 style={{ margin: 0 }}>Kompani</h2>

        <div className="row">
          <input
            className="input"
            placeholder="Kërko sipas emrit, industrisë, qytetit…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select className="select" value={city} onChange={(e) => setCity(e.target.value)}>
            {cities.map((c, i) => (
              <option key={i} value={c}>{c || "Të gjitha qytetet"}</option>
            ))}
          </select>
          <select className="select" value={industry} onChange={(e) => setIndustry(e.target.value)}>
            {industries.map((x, i) => (
              <option key={i} value={x}>{x || "Të gjitha industrinë"}</option>
            ))}
          </select>
        </div>

        {!list.length && <div className="helper">S’u gjet asnjë kompani.</div>}

        <div className="grid grid-2">
          {list.map((c) => {
            const initial = c.name?.[0]?.toUpperCase() || "?";
            const isFollowed = followed.includes(c.id);
            return (
              <div key={c.id} className="card" style={{ display: "grid", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div className="avatar" style={{ width: 56, height: 56, fontSize: 18 }}>{initial}</div>
                  <div>
                    <Link to={`/company/${c.id}`} style={{ fontWeight: 700 }}>{c.name}</Link>
                    <div style={{ color: "var(--text-light)", fontSize: 14 }}>
                      {c.city} • {c.industry} • {c.employees}
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <button className="button-outline" onClick={() => toggleFollow(c.id)}>
                      {isFollowed ? "Ndalo ndjekjen" : "Ndiq"}
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
          })}
        </div>
      </div>
    </div>
  );
}
