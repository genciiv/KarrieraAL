import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { searchJobs } from "../lib/api.js";
import JobCard from "../components/jobs/JobCard.jsx";
import { useJobs } from "../contexts/JobsContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Jobs(){
  const { jobs: postedJobs } = useJobs();
  const { user } = useAuth();
  const [seed, setSeed] = useState([]);
  const [q, setQ] = useState("");

  useEffect(()=>{
    (async ()=>{
      const data = await searchJobs();
      setSeed(data);
    })();
  }, []);

  const all = useMemo(()=>{
    // postedJobs në krye, pastaj seed
    const merged = [...postedJobs, ...seed];
    if (!q.trim()) return merged;
    const s = q.toLowerCase();
    return merged.filter(j =>
      j.title.toLowerCase().includes(s) ||
      j.company?.toLowerCase().includes(s) ||
      j.city?.toLowerCase().includes(s)
    );
  }, [postedJobs, seed, q]);

  return (
    <div className="container" style={{marginTop:24}}>
      <div className="card" style={{display:"grid", gap:12}}>
        <div style={{display:"flex", gap:12, alignItems:"center"}}>
          <h2 style={{margin:0}}>Punë</h2>
          <div style={{marginLeft:"auto", display:"flex", gap:8}}>
            <input
              className="input"
              placeholder="Kërko sipas titullit, kompanisë, qytetit…"
              value={q}
              onChange={e=>setQ(e.target.value)}
              style={{minWidth: 280}}
            />
            {user?.role === "Kompani" && (
              <Link to="/punet/shto" className="button-primary">Posto punë</Link>
            )}
          </div>
        </div>

        {!all.length && <div style={{color:"var(--text-light)"}}>S’u gjet asnjë rezultat.</div>}

        <div className="grid grid-2">
          {all.map(job => <JobCard key={job.id} job={job} />)}
        </div>
      </div>
    </div>
  );
}
