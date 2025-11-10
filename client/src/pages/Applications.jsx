import { useEffect, useMemo, useState } from "react";
import { useToast } from "../contexts/ToastContext.jsx";

const LS_APPS = "ka_applications";
const STATUSES = ["Të gjitha", "Në pritje", "Pranuar", "Refuzuar"];

function toDateStr(iso) {
  try {
    return new Date(iso).toLocaleString("sq-AL", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  } catch {
    return iso;
  }
}

function downloadCSV(filename, rows) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map(r => headers.map(h => {
      const raw = r[h] ?? "";
      const s = String(raw).replace(/"/g, '""');
      return /[",\n]/.test(s) ? `"${s}"` : s;
    }).join(","))
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Applications() {
  const { addToast } = useToast();

  // bootstrap
  const [apps, setApps] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_APPS) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_APPS, JSON.stringify(apps));
  }, [apps]);

  // filtra
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("Të gjitha");
  const [company, setCompany] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const companies = useMemo(() => {
    return ["", ...Array.from(new Set(apps.map(a => a.company).filter(Boolean)))];
  }, [apps]);

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    const from = dateFrom ? new Date(dateFrom + "T00:00:00") : null;
    const to = dateTo ? new Date(dateTo + "T23:59:59") : null;

    return apps.filter(a => {
      const matchQ =
        !s ||
        a.jobTitle?.toLowerCase().includes(s) ||
        a.company?.toLowerCase().includes(s) ||
        a.name?.toLowerCase().includes(s) ||
        a.email?.toLowerCase().includes(s);

      const matchStatus = status === "Të gjitha" || a.status === status;
      const matchCompany = !company || a.company === company;

      let matchDate = true;
      if (from || to) {
        const when = new Date(a.when);
        if (from && when < from) matchDate = false;
        if (to && when > to) matchDate = false;
      }

      return matchQ && matchStatus && matchCompany && matchDate;
    });
  }, [apps, q, status, company, dateFrom, dateTo]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => { setPage(1); }, [q, status, company, dateFrom, dateTo]);

  function changeStatus(id, next) {
    setApps(prev => prev.map(a => (a.id === id ? { ...a, status: next } : a)));
    addToast("Statusi u përditësua ✅", "success");
  }

  function removeApp(id) {
    setApps(prev => prev.filter(a => a.id !== id));
    addToast("Aplikimi u fshi", "info");
  }

  function exportCSV() {
    if (!filtered.length) {
      addToast("Nuk ka të dhëna për eksport.", "error");
      return;
    }
    const rows = filtered.map(a => ({
      id: a.id,
      data: toDateStr(a.when),
      kompania: a.company,
      pozicioni: a.jobTitle,
      emri: a.name,
      email: a.email,
      statusi: a.status,
      mesazhi: a.message ?? ""
    }));
    downloadCSV("aplikimet.csv", rows);
  }

  return (
    <div className="container" style={{ marginTop: 24 }}>
      <div className="card" style={{ display: "grid", gap: 12 }}>
        <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>Aplikimet e mia</h2>
          <div className="row" style={{ gap: 8 }}>
            <button className="button-outline" onClick={exportCSV}>Eksporto CSV</button>
          </div>
        </div>

        {/* FILTRAT */}
        <div className="row" style={{ flexWrap: "wrap", gap: 8 }}>
          <input
            className="input" style={{ flex: 2 }}
            placeholder="Kërko sipas pozicionit, kompanisë, emrit, email-it…"
            value={q} onChange={(e) => setQ(e.target.value)}
          />
          <select className="select" value={status} onChange={(e)=>setStatus(e.target.value)}>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="select" value={company} onChange={(e)=>setCompany(e.target.value)}>
            {companies.map((c,i)=><option key={i} value={c}>{c || "Të gjitha kompanitë"}</option>)}
          </select>
          <input className="input" type="date" value={dateFrom} onChange={(e)=>setDateFrom(e.target.value)} />
          <input className="input" type="date" value={dateTo} onChange={(e)=>setDateTo(e.target.value)} />
        </div>

        {/* LISTA */}
        {!pageItems.length ? (
          <div className="helper">S’u gjet asnjë aplikim me këta filtra.</div>
        ) : (
          <div className="table">
            <div className="thead">
              <div>Data</div>
              <div>Pozicioni</div>
              <div>Kompania</div>
              <div>Kontakt</div>
              <div>Status</div>
              <div style={{ textAlign: "right" }}>Veprime</div>
            </div>
            <div className="tbody">
              {pageItems.map(a => (
                <div key={a.id} className="trow">
                  <div>{toDateStr(a.when)}</div>
                  <div>
                    <div style={{ fontWeight: 700 }}>{a.jobTitle}</div>
                    {a.message && <div className="muted" title={a.message}>“{a.message.slice(0, 40)}{a.message.length > 40 ? "…" : ""}”</div>}
                  </div>
                  <div>{a.company}</div>
                  <div>
                    <div>{a.name || "—"}</div>
                    <div className="muted" style={{ fontSize: 13 }}>{a.email || "—"}</div>
                  </div>
                  <div>
                    <select
                      className="select"
                      value={a.status}
                      onChange={(e)=>changeStatus(a.id, e.target.value)}
                    >
                      <option>Në pritje</option>
                      <option>Pranuar</option>
                      <option>Refuzuar</option>
                    </select>
                  </div>
                  <div className="row" style={{ gap: 6, justifyContent: "flex-end" }}>
                    <button className="button-outline" onClick={()=>removeApp(a.id)}>Fshi</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="row" style={{ justifyContent: "center", gap: 6 }}>
            <button className="button-outline" disabled={page===1} onClick={()=>setPage(p=>p-1)}>«</button>
            {Array.from({ length: totalPages }).map((_,i)=>(
              <button
                key={i}
                className={i+1===page ? "button-primary" : "button-outline"}
                onClick={()=>setPage(i+1)}
              >
                {i+1}
              </button>
            ))}
            <button className="button-outline" disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}>»</button>
          </div>
        )}
      </div>
    </div>
  );
}
