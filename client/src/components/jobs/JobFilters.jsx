import { useState } from "react";

export default function JobFilters({ onSearch }) {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [remote, setRemote] = useState("");

  function submit(e){
    e.preventDefault();
    onSearch?.({ q, city, remote });
  }

  return (
    <form onSubmit={submit} className="card" style={{display:"grid", gap:12}}>
      <div style={{display:"grid", gap:10, gridTemplateColumns:"2fr 1fr 1fr auto"}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Titull, kompani…" style={inputStyle}/>
        <select value={city} onChange={e=>setCity(e.target.value)} style={inputStyle}>
          <option value="">Qyteti</option>
          <option>Tiranë</option><option>Fier</option><option>Durrës</option>
        </select>
        <select value={remote} onChange={e=>setRemote(e.target.value)} style={inputStyle}>
          <option value="">Të gjitha</option>
          <option value="true">Remote</option>
          <option value="false">Në zyrë</option>
        </select>
        <button className="button-primary">Kërko</button>
      </div>
    </form>
  );
}

const inputStyle = {
  border:"1px solid var(--border)", borderRadius:10, padding:"10px 12px", background:"var(--white)"
};
