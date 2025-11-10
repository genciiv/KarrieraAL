import { useState } from "react";

export default function ApplyModal({ open, onClose, job, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  if (!open) return null;
  const valid = name.trim() && /\S+@\S+\.\S+/.test(email);

  function handleSubmit(e) {
    e.preventDefault();
    if (!valid) return;
    onSubmit({ name, email, message: msg });
    setName(""); setEmail(""); setMsg("");
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Apliko për: {job?.title}</h3>
        <form className="grid" onSubmit={handleSubmit} style={{ gap: 10 }}>
          <input className="input" placeholder="Emri dhe mbiemri" value={name} onChange={(e)=>setName(e.target.value)} />
          <input className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <textarea className="textarea" placeholder="Mesazhi (opsional)" value={msg} onChange={(e)=>setMsg(e.target.value)} />
          <div className="row" style={{ justifyContent: "flex-end", gap: 8 }}>
            <button type="button" className="button-outline" onClick={onClose}>Mbyll</button>
            <button className="button-primary" disabled={!valid}>Dërgo aplikimin</button>
          </div>
        </form>
      </div>
    </div>
  );
}
