import { useEffect, useState } from "react";
import JobFilters from "../components/jobs/JobFilters.jsx";
import JobCard from "../components/jobs/JobCard.jsx";
import { searchJobs } from "../lib/api.js";
import { useToast } from "../contexts/ToastContext.jsx";

export default function Jobs() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const { addToast } = useToast();

  useEffect(() => {
    handleSearch({});
    // eslint-disable-next-line
  }, []);

  async function handleSearch(filters){
    setLoading(true);
    const res = await searchJobs(filters);
    setJobs(res);
    setLoading(false);
    addToast(`U gjetën ${res.length} vende pune`, "success");
  }

  return (
    <div className="container" style={{marginTop: 24, display:"grid", gap:16}}>
      <JobFilters onSearch={handleSearch} />
      {loading ? (
        <div className="grid grid-3">
          {[...Array(3)].map((_,i)=>(
            <div key={i} className="card">
              <div className="skeleton shine" style={{height:16, width:"70%", marginBottom:10}}></div>
              <div className="skeleton shine" style={{height:12, width:"40%", marginBottom:14}}></div>
              <div className="skeleton shine" style={{height:12, width:"85%"}}></div>
            </div>
          ))}
        </div>
      ) : jobs.length ? (
        <div className="grid grid-3">
          {jobs.map(j => <JobCard key={j.id} job={j} />)}
        </div>
      ) : (
        <div className="card">Nuk u gjet asnjë rezultat me këto filtra.</div>
      )}
    </div>
  );
}
