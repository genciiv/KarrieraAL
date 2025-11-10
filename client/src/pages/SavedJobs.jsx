import { useEffect, useMemo, useState } from "react";
import JobCard from "../components/jobs/JobCard.jsx";
import ApplyModal from "../components/jobs/ApplyModal.jsx";
import { useToast } from "../contexts/ToastContext.jsx";
import { useNotifications } from "../contexts/NotificationsContext.jsx";

const LS_SAVED = "ka_saved_jobs";
const LS_JOBS = "ka_jobs";
const LS_APPS = "ka_applications";

export default function SavedJobs() {
  const { addToast } = useToast();
  const { notify } = useNotifications();

  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem(LS_SAVED) || "[]"));
  const [jobs] = useState(() => JSON.parse(localStorage.getItem(LS_JOBS) || "[]"));

  useEffect(() => {
    localStorage.setItem(LS_SAVED, JSON.stringify(saved));
  }, [saved]);

  const list = useMemo(() => {
    const map = new Map(jobs.map(j => [j.id, j]));
    return saved.map(id => map.get(id)).filter(Boolean);
  }, [saved, jobs]);

  function toggleSave(id) {
    setSaved(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [id, ...prev];
      localStorage.setItem(LS_SAVED, JSON.stringify(next));
      addToast(prev.includes(id) ? "U hoq nga të ruajturat" : "U ruajt te Të ruajturat", "success");
      if (!prev.includes(id)) {
        const j = jobs.find(x => x.id === id);
        if (j) notify({ title: "Ruajte një punë", desc: `${j.title} • ${j.company}`, kind: "info" });
      }
      return next;
    });
  }

  // Apply modal
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
    notify({ title: "Aplikuat për një punë", desc: `${currentJob.title} • ${currentJob.company}`, kind: "success" });
  }

  return (
    <div className="container" style={{ marginTop: 24 }}>
      <div className="card" style={{ display: "grid", gap: 12 }}>
        <h2 style={{ margin: 0 }}>Të ruajturat</h2>

        {!list.length && <div className="helper">Nuk keni asnjë punë të ruajtur.</div>}

        <div className="grid grid-2">
          {list.map(job => (
            <JobCard
              key={job.id}
              job={job}
              saved={saved.includes(job.id)}
              onSave={toggleSave}
              onApply={openApply}
            />
          ))}
        </div>
      </div>

      <ApplyModal
        open={open}
        onClose={() => setOpen(false)}
        job={currentJob}
        onSubmit={submitApply}
      />
    </div>
  );
}
