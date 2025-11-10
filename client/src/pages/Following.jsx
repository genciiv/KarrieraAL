import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CompanyCard from "../components/company/CompanyCard.jsx";

/* E njëjta bazë si te Companies.jsx (pa backend) */
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

/* LocalStorage helpers – njëjtë si te Companies */
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

export default function Following() {
  const [follows, setFollows] = useState(() => loadFollowSet());
  useEffect(() => saveFollowSet(follows), [follows]);

  // Opsionale: llogarisim ndjekësit duke shtuar 1 kur je duke ndjekur
  const followersMap = useMemo(() => {
    const base = Object.fromEntries(COMPANIES_MOCK.map(c => [c.id, c.followers || 0]));
    follows.forEach((id) => { base[id] = (base[id] || 0) + 1; });
    return base;
  }, [follows]);

  const companies = useMemo(
    () => COMPANIES_MOCK.filter(c => follows.has(c.id)),
    [follows]
  );

  const toggleFollow = (companyId) => {
    setFollows(prev => {
      const next = new Set(prev);
      if (next.has(companyId)) next.delete(companyId);
      else next.add(companyId);
      return next;
    });
  };

  const clearAll = () => setFollows(new Set());

  return (
    <div className="container" style={{ padding: "24px 0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <h2 style={{ margin: 0 }}>Ndjekjet</h2>
        {companies.length > 0 && (
          <button className="btn-ghost" onClick={clearAll}>Hiq të gjitha</button>
        )}
      </div>

      {companies.length === 0 ? (
        <div className="card" style={{ marginTop: 16, textAlign: "center" }}>
          <p style={{ color: "#6b7280", marginBottom: 12 }}>
            Nuk po ndjek asnjë kompani për momentin.
          </p>
          <Link to="/kompani" className="button-primary">Shko te Kompanitë</Link>
        </div>
      ) : (
        <div className="cards-grid cards-3" style={{ marginTop: 16 }}>
          {companies.map(c => (
            <CompanyCard
              key={c.id}
              c={c}
              following={true}
              followersCount={followersMap[c.id] || 0}
              onToggleFollow={toggleFollow}
              onShowAll={(company) => {
                // opsionale: të hapësh një modal global në App, por për thjeshtësi s’e përdorim këtu.
                alert(`Pozicionet e ${company.name}: ${company.openJobs?.map(j => j.title).join(", ") || "—"}`);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
