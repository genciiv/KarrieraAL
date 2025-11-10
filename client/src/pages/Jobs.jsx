import { useEffect, useMemo, useState } from "react";
import { useToast } from "../contexts/ToastContext.jsx";
import JobCard from "../components/jobs/JobCard.jsx";
import ApplyModal from "../components/jobs/ApplyModal.jsx";
import { JOBS as SEED } from "../data/jobs.js";

const LS_JOBS = "ka_jobs";
const LS_SAVED = "ka_saved_jobs";
const LS_APPS = "ka_applications";

export default function Jobs() {
  const { addToast } = useToast();

  // bootstrap jobs → localStorage
  useEffect(() => {
    if (!localStorage.getItem(LS_JOBS)) {
      localStorage.setItem(LS_JOBS, JSON.stringify(SEED));
    }
  }, []);

  const [jobs, setJobs] = useState(() => JSON.parse(localStorage.getItem(LS_JOBS) || "null") || SEED);
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem(LS_SAVED) || "[]"));

  // filtra
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");           // Remote | On-site | Hybrid
  const [minPay, setMinPay] = useState("");
  const [deadline, setDeadline] = useState("");   // YYYY-MM-DD
  const [sort, setSort] = useState("new");        // new | pay | deadline

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const cities = useMemo(() => ["", ...new Set(jobs.map(j => j.city))], [jobs]);
  const types = ["", "Remote", "On-site", "Hybrid"];

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    let list = jobs.filter(j => {
      const matchQ =
        !s ||
        j.title.toLowerCase().includes(s) ||
        j.company.toLowerCase().includes(s) ||
        j.city.toLowerCase().includes(s) ||
        j.tags?.some(t => t.toLowerCase().includes(s));
      const matchCity = !city || j.city === city;
      const matchType = !type || j.type === type;
      const matchPay = !minPay || (j.salaryMin ?? 0) >= Number(minPay);
      const matchDeadline = !deadline || new Date(j.deadline) <= new Date(deadline);
      return matchQ && matchCity && matchType && matchPay && matchDeadline;
    });

    if (sort === "pay") list.sort((a,b) => (b.salaryMax||0) - (a.salaryMax||0));
    else if (sort === "deadline") list.sort((a,b) => new Date(a.deadline) - new Date(b.deadline));
    else list.sort((a,b) => (b.id > a.id ? 1 : -1));

    return list;
  }, [jobs, q, city, type, minPay, deadline, sort]);

  useEffect(() => { setPage(1); }, [q, city, type, minPay, deadline, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page-1)*pageSize, page*pageSize);

  function toggleSave(id) {
    setSaved(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [id, ...prev];
      localStorage.setItem(LS_SAVED, JSON.stringify(next));
      addToast(prev.includes(id) ? "U hoq nga të ruajturat" : "U ruajt te Të ruajturat", "success");
      return next;
    });
  }

  // apply modal
  const [open, setOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  function openApply(job) {
    setCurrentJob(job);
    setOpen(true);
  }

  function submitApply(form) {
    const payload = {
      id: Date.now().toString(),
      jobId: currentJob.id,
      jobTitle: currentJob.title,
      company: currentJob.company,
      when: new Date().toISOString(),
      ...form,
      status: "Në pritje"
    };
    const list = JSON.parse(localStorage.getItem(LS_APPS) || "[]");
    list.unshift(payload);
    localStorage.setItem(LS_APPS, JSON.stringify(list));
    setOpen(false);
    addToast("Aplikimi u dërgua ✅", "success");
  }

  return (
    <div className="container" style={{ marginTop: 24 }}>
      <div className="card" style={{ display: "grid", gap: 12 }}>
        <h2 style={{ margin: 0 }}>Punë</h2>

        {/* FILTRA */}
        <div className="row" style={{ flexWrap: "wrap", gap: 8 }}>
          <input className="input" style={{ flex: 2 }} placeholder="Kërko sipas titullit, kompanisë, qytetit, teknologjive…"
                 value={q} onChange={(e)=>setQ(e.target.value)} />
          <select className="select" value={city} onChange={(e)=>setCity(e.target.value)}>
            {cities.map((c,i)=><option key={i} value={c}>{c||"Të gjitha qytetet"}</option>)}
          </select>
          <select className="select" value={type} onChange={(e)=>setType(e.target.value)}>
            {types.map((t,i)=><option key={i} value={t}>{t||"Të gjitha llojet"}</option>)}
          </select>
          <input className="input" style={{ width: 130 }} type="number" min="0" placeholder="Pagë min €"
                 value={minPay} onChange={(e)=>setMinPay(e.target.value)} />
          <input className="input" style={{ width: 170 }} type="date"
                 value={deadline} onChange={(e)=>setDeadline(e.target.value)} />
          <select className="select" value={sort} onChange={(e)=>setSort(e.target.value)}>
            <option value="new">Më të reja</option>
            <option value="pay">Pagë më e lartë</option>
            <option value="deadline">Afati më i afërt</option>
          </select>
        </div>

        {/* LISTA */}
        {!pageItems.length && <div className="helper">S’u gjet asnjë punë me këta filtra.</div>}

        <div className="grid grid-2">
          {pageItems.map(job => (
            <JobCard
              key={job.id}
              job={job}
              saved={saved.includes(job.id)}
              onSave={toggleSave}
              onApply={openApply}
            />
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="row" style={{ justifyContent: "center", gap: 6 }}>
            <button className="button-outline" disabled={page===1} onClick={()=>setPage(p=>p-1)}>«</button>
            {Array.from({length: totalPages}).map((_,i)=>(
              <button key={i}
                className={i+1===page ? "button-primary" : "button-outline"}
                onClick={()=>setPage(i+1)}>
                {i+1}
              </button>
            ))}
            <button className="button-outline" disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}>»</button>
          </div>
        )}
      </div>

      <ApplyModal
        open={open}
        onClose={()=>setOpen(false)}
        job={currentJob}
        onSubmit={submitApply}
      />
    </div>
  );
}
