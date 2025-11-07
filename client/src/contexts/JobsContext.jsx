import { createContext, useContext, useEffect, useMemo, useState } from "react";

const JobsContext = createContext(null);
const STORAGE_KEY = "ka_jobs";

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([]); // [{id,title,company,city,remote,salary,deadline,desc}...]

  // ngarko
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setJobs(JSON.parse(raw));
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs)); } catch {}
  }, [jobs]);

  function addJob(job) {
    setJobs(prev => [{ ...job, id: crypto.randomUUID() }, ...prev]);
  }
  function removeJob(id) {
    setJobs(prev => prev.filter(j => j.id !== id));
  }

  const value = useMemo(() => ({ jobs, addJob, removeJob }), [jobs]);
  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export function useJobs() {
  const ctx = useContext(JobsContext);
  if (!ctx) throw new Error("useJobs must be used within JobsProvider");
  return ctx;
}
