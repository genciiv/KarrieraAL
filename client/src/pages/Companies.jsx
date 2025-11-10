import { useEffect, useMemo, useState } from "react";
import CompanyCard from "../components/company/CompanyCard.jsx";

/* ------------------ MOCK DATA (pa backend) ------------------ */
const COMPANIES_MOCK = [
  {
    id: "c1",
    name: "TechAL",
    city: "Tiranë",
    size: "50–200",
    industry: "Software",
    about: "Zgjidhje web me fokus në MERN dhe cloud.",
    followers: 312,
    openJobs: [
      { id: "j101", title: "Frontend React", link: "/punet/j101" },
      { id: "j102", title: "Backend Node.js", link: "/punet/j102" },
      { id: "j103", title: "DevOps Engineer", link: "/punet/j103" },
    ],
  },
  {
    id: "c2",
    name: "Vision Group",
    city: "Tiranë",
    size: "200–500",
    industry: "Finance",
    about: "Zgjidhje fintech dhe BI për tregun vendas.",
    followers: 198,
    openJobs: [
      { id: "j201", title: "Data Analyst (BI)", link: "/punet/j201" },
      { id: "j202", title: "QA Tester", link: "/punet/j202" },
    ],
  },
  {
    id: "c3",
    name: "AlbaniaSoft",
    city: "Durrës",
    size: "20–50",
    industry: "IT Services",
    about: "Integrojmë sisteme dhe ofrojmë suport IT 24/7.",
    followers: 144,
    openJobs: [],
  },
  {
    id: "c4",
    name: "GreenTech AL",
    city: "Vlorë",
    size: "10–50",
    industry: "Green Tech",
    about: "Teknologji të gjelbra, IoT dhe energji e rinovueshme.",
    followers: 86,
    openJobs: [
      { id: "j401", title: "IoT Engineer (Junior)", link: "/punet/j401" },
    ],
  },
  {
    id: "c5",
    name: "EduNext",
    city: "Fier",
    size: "10–50",
    industry: "EduTech",
    about: "Platforma edutech dhe kursesh interaktive.",
    followers: 120,
    openJobs: [
      { id: "j501", title: "Full-Stack (MERN)", link: "/punet/j501" },
      { id: "j502", title: "UI/UX Designer", link: "/punet/j502" },
      { id: "j503", title: "Product Owner", link: "/punet/j503" },
      { id: "j504", title: "Content Manager", link: "/punet/j504" },
    ],
  },
];

/* ------------------ HELPERS ------------------ */
const unique = (arr) => Array.from(new Set(arr.filter(Boolean)));

const loadFollowSet = () => {
  try {
    const raw = localStorage.getItem("karriera_follows");
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
};
const saveFollowSet = (set) => {
  localStorage.setItem("karriera_follows", JSON.stringify(Array.from(set)));
};

export default function Companies() {
  const baseCompanies = COMPANIES_MOCK;

  // --- Filters state ---
  const [q, setQ] = useState("");
  const [city, setCity] = useState("Të gjitha");
  const [industry, setIndustry] = useState("Të gjitha");
  const [onlyOpenings, setOnlyOpenings] = useState(false);

  // --- Follow state (persist) ---
  const [follows, setFollows] = useState(() => loadFollowSet());
  useEffect(() => saveFollowSet(follows), [follows]);

  // --- Followers count (mutable state, nis nga MOCK) ---
  const [followersMap, setFollowersMap] = useState(() =>
    Object.fromEntries(baseCompanies.map(c => [c.id, c.followers || 0]))
  );

  // --- Modal për “të gjitha pozicionet” ---
  const [modalCompany, setModalCompany] = useState(null);

  // --- Options dinamike ---
  const cityOptions = useMemo(
    () => ["Të gjitha", ...unique(baseCompanies.map(c => c.city))],
    [baseCompanies]
  );
  const industryOptions = useMemo(
    () => ["Të gjitha", ...unique(baseCompanies.map(c => c.industry))],
    [baseCompanies]
  );

  // --- Filtering + Search ---
  const companies = useMemo(() => {
    let list = [...baseCompanies];

    const qn = q.trim().toLowerCase();
    if (qn) {
      list = list.filter(c =>
        [c.name, c.city, c.industry, c.about].join(" ").toLowerCase().includes(qn)
      );
    }
    if (city !== "Të gjitha") list = list.filter(c => c.city === city);
    if (industry !== "Të gjitha") list = list.filter(c => c.industry === industry);
    if (onlyOpenings) list = list.filter(c => (c.openJobs || []).length > 0);

    return list;
  }, [baseCompanies, q, city, industry, onlyOpenings]);

  const toggleFollow = (companyId) => {
    setFollows(prev => {
      const next = new Set(prev);
      const following = next.has(companyId);
      if (following) {
        next.delete(companyId);
        setFollowersMap(m => ({ ...m, [companyId]: Math.max(0, (m[companyId] || 0) - 1) }));
      } else {
        next.add(companyId);
        setFollowersMap(m => ({ ...m, [companyId]: (m[companyId] || 0) + 1 }));
      }
      return next;
    });
  };

  const clearFilters = () => {
    setQ("");
    setCity("Të gjitha");
    setIndustry("Të gjitha");
    setOnlyOpenings(false);
  };

  return (
    <div className="container" style={{ padding: "24px 0" }}>
      <h2 style={{ margin: "0 0 12px" }}>Kompani</h2>

      {/* FILTER BAR */}
      <div className="card filter-bar" style={{ marginBottom: 16 }}>
        {/* Rreshti 1: kërkimi + reset */}
        <div className="filter-row">
          <input
            className="search-input"
            placeholder="Kërko kompani, industri, qytet…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="reset-btn" onClick={clearFilters}>Rivendos filtrat</button>
        </div>

        {/* Rreshti 2: QYTETI */}
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

        {/* Rreshti 3: INDUSTRIA */}
        <div className="filter-row">
          <span className="filter-label">Industri:</span>
          <div className="chips">
            {industryOptions.map((opt) => (
              <button
                key={opt}
                className={`chip-btn ${industry === opt ? "active" : ""}`}
                onClick={() => setIndustry(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Rreshti 4: Vetëm me pozicione */}
        <div className="filter-row" style={{ alignItems: "center" }}>
          <label style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={onlyOpenings}
              onChange={(e) => setOnlyOpenings(e.target.checked)}
            />
            Vetëm me pozicione të hapura
          </label>

          <div style={{ marginLeft: "auto", color: "#6b7280", fontSize: 14 }}>
            {companies.length} rezultate
            {q && <> • kërkim për <strong>{q}</strong></>}
          </div>
        </div>
      </div>

      {/* GRID i kompanive */}
      {companies.length === 0 ? (
        <div className="card" style={{ textAlign: "center", color: "#6b7280" }}>
          Nuk u gjet asnjë kompani me këto filtra.
        </div>
      ) : (
        <div className="cards-grid cards-3">
          {companies.map(c => (
            <CompanyCard
              key={c.id}
              c={c}
              following={follows.has(c.id)}
              followersCount={followersMap[c.id] || 0}
              onToggleFollow={toggleFollow}
              onShowAll={setModalCompany}
            />
          ))}
        </div>
      )}

      {/* MODAL për “të gjitha pozicionet” */}
      {modalCompany && (
        <div className="modal-backdrop" onClick={() => setModalCompany(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>Pozicionet te {modalCompany.name}</h3>
            {(modalCompany.openJobs || []).length === 0 ? (
              <p style={{ color: "#6b7280" }}>Aktualisht s’ka pozicione të hapura.</p>
            ) : (
              <ul style={{ paddingLeft: 18 }}>
                {modalCompany.openJobs.map(j => (
                  <li key={j.id} style={{ marginBottom: 6 }}>
                    <a href={j.link} title="Hap detajet">{j.title}</a>
                  </li>
                ))}
              </ul>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
              <button className="btn-ghost" onClick={() => setModalCompany(null)}>Mbyll</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
