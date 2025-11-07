import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ApplicationsContext = createContext(null);
const STORAGE_KEY = "ka_apps";

export function ApplicationsProvider({ children }) {
  const [apps, setApps] = useState([]);

  // ngarko nga localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setApps(JSON.parse(raw));
    } catch (_) {}
  }, []);

  // persistim
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(apps)); } catch (_) {}
  }, [apps]);

  function addApplication(app) {
    // app: {id, jobId, jobTitle, company, userId, userName, email, cvName, message, appliedAt}
    const status = "Në pritje";
    setApps(prev => [{ ...app, status }, ...prev]);
  }

  function removeApplication(id) { setApps(prev => prev.filter(a => a.id !== id)); }
  function clearAll() { setApps([]); }
  function listByUser(userId) { return apps.filter(a => a.userId === userId); }
  function listByJob(jobId) { return apps.filter(a => a.jobId === jobId); }
  function updateStatus(id, status) {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  }

  const value = useMemo(() => ({
    apps, addApplication, removeApplication, clearAll, listByUser, listByJob, updateStatus
  }), [apps]);

  return <ApplicationsContext.Provider value={value}>{children}</ApplicationsContext.Provider>;
}

export function useApplications(){
  const ctx = useContext(ApplicationsContext);
  if (!ctx) throw new Error("useApplications must be used within ApplicationsProvider");
  return ctx;
}
