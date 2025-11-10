import { useEffect, useMemo, useState } from "react";
import CompanyCard from "../components/company/CompanyCard.jsx";
import { COMPANIES, CITIES, INDUSTRIES } from "../data/companies.js";
import { useToast } from "../contexts/ToastContext.jsx";
import { Link } from "react-router-dom";

const LS_COMPANIES = "ka_companies";
const LS_FOLLOWS = "ka_company_follows";     // numri publik i ndjekësve
const LS_MY_FOLLOWS = "ka_my_company_follows"; // kompanitë që po i ndjek unë

export default function Companies() {
  const { addToast } = useToast();

  useEffect(() => {
    if (!localStorage.getItem(LS_COMPANIES)) {
      localStorage.setItem(LS_COMPANIES, JSON.stringify(COMPANIES));
    }
    if (!localStorage.getItem(LS_FOLLOWS)) {
      const base = {};
      COMPANIES.forEach(c => { base[c.id] = Math.floor(15 + Math.random() * 80); });
      localStorage.setItem(LS_FOLLOWS, JSON.stringify(base));
    }
    if (!localStorage.getItem(LS_MY_FOLLOWS)) {
      localStorage.setItem(LS_MY_FOLLOWS, JSON.stringify([]));
    }
  }, []);

  const [companies] = useState(() =>
    JSON.parse(localStorage.getItem(LS_COMPANIES) || "[]")
  );
  const [follows, setFollows] = useState(() =>
    JSON.parse(localStorage.getItem(LS_FOLLOWS) || "{}")
  );
  const [myFollows, setMyFollows] = useState(() =>
    new Set(JSON.parse(localStorage.getItem(LS_MY_FOLLOWS) || "[]"))
  );

  // Modal: “Shih të gjitha punët”
  const [open, setOpen] = useState(false);
  const [modalCompany, setModalCompany] = useState(null);
  function showAllJobs(c) { setModalCompany(c); setOpen(true); }

  // Filtrat
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [industry, setIndustry] = useState("");
  const [withJobs, setWithJobs] = useState(""); // "", "me", "pa"

  const cities = ["", ...CITIES];
  const industries = ["", ...INDUSTRIES];

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    return companies.filter(c => {
      const matchQ =
        !s ||
        c.name.toLowerCase().includes(s) ||
        c.industry.toLowerCase().includes(s) ||
        c.city.toLowerCase().includes(s);
      const matchCity = !city || c.city === city;
      const matchInd = !industry || c.industry === industry;
      const matchJobs =
        !withJobs ||
        (withJobs === "me" && c.openJobs?.length > 0) ||
        (withJobs === "pa" && (!c.openJobs || c.openJobs.length === 0));
      return matchQ && matchCity && matchInd && matchJobs;
    });
  }, [companies, q, city, industry, withJobs]);

  function toggleFollow(id) {
    setMyFollows(prev => {
      const next = new Set(prev);
      const isFollowing = next.has(id);
      if (isFollowing) next.delete(id); else next.add(id);

      // persist lista ime
      localStorage.setItem(LS_MY_FOLLOWS, JSON.stringify(Array.from(next)));

      // rrit/ul numrin publik
      setFollows(f => {
        const obj = { ...f, [id]: Math.max(0, (f[id] || 0) + (isFollowing ? -1 : 1)) };
        localStorage.setItem(LS_FOLLOWS, JSON.stringify(obj));
        return obj;
      });

      addToast(isFollowing ? "E hoqët nga ndjekjet" : "Po ndiqni kompaninë ✅", "success");
      return next;
    });
  }

  return (
    <div className="container" style={{ marginTop: 24 }}>
      <div className="card" style={{ display: "grid", gap: 12 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <h2 style={{ margin: 0 }}>Kompani</h2>
          <Link to="/ndjekjet" className="button-outline">Ndjekjet e mia</Link>
        </div>

        {/* Filtrat */}
        <div className="row" style={{ flexWrap: "wrap", gap: 8 }}>
          <input className="input" style={{ flex: 2 }} placeholder="Kërko sipas emrit, industrisë, qytetit…"
            value={q} onChange={e=>setQ(e.target.value)} />
          <select className="select" value={city} onChange={e=>setCity(e.target.value)}>
            {cities.map((c,i)=><option key={i} value={c}>{c || "Të gjitha qytetet"}</option>)}
          </select>
          <select className="select" value={industry} onChange={e=>setIndustry(e.target.value)}>
            {industries.map((ind,i)=><option key={i} value={ind}>{ind || "Të gjitha industrinë"}</option>)}
          </select>
          <select className="select" value={withJobs} onChange={e=>setWithJobs(e.target.value)}>
            <option value="">Me/Pa pozicione</option>
            <option value="me">Vetëm me pozicione</option>
            <option value="pa">Vetëm pa pozicione</option>
          </select>
        </div>

        {/* Lista */}
        {!filtered.length && <div className="helper">S’u gjet asnjë kompani me këta filtra.</div>}

        <div className="grid-2">
          {filtered.map(c => (
            <div key={c.id} className="company-wrapper">
              <CompanyCard
                c={c}
                following={myFollows.has(c.id)}
                onToggleFollow={toggleFollow}
                onShowAll={() => showAllJobs(c)}
              />
              <div className="follow-ct">
                <span className="muted">Ndjekës: </span>
                <strong>{follows[c.id] || 0}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL – të gjitha punët e kompanisë */}
      {open && modalCompany && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e)=>e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <h3 style={{ margin:0 }}>{modalCompany.name} — punët e hapura</h3>
              <button className="button-outline" onClick={()=>setOpen(false)}>Mbyll</button>
            </div>
            {!modalCompany.openJobs?.length ? (
              <div className="helper">S’ka pozicione të hapura.</div>
            ) : (
              <div className="grid" style={{ gap:8 }}>
                {modalCompany.openJobs.map(j => (
                  <Link key={j.id} to={j.link} className="job-pill" onClick={()=>setOpen(false)}>
                    {j.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
