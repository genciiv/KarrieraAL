import { useState, useRef, useEffect } from "react";

export default function ChatWindow({ conv }) {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState(conv?.messages || []);
  const endRef = useRef(null);

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); }, [msgs]);

  function send(e){
    e.preventDefault();
    const text = input.trim(); if(!text) return;
    setMsgs(m => [...m, { id: crypto.randomUUID(), who:"me", text }]);
    setInput("");
  }

  if (!conv) return <div className="card">Zgjidh një bisedë në të majtë.</div>;

  return (
    <div className="card" style={{display:"grid", gridTemplateRows:"1fr auto", height:"520px"}}>
      <div style={{overflowY:"auto", paddingRight:4}}>
        {msgs.map(m=>(
          <div key={m.id} style={{
            display:"flex", justifyContent: m.who==="me"?"flex-end":"flex-start", margin:"8px 0"
          }}>
            <div style={{
              background: m.who==="me"?"var(--primary)":"#eee",
              color: m.who==="me"?"#fff":"#333",
              padding:"8px 12px", borderRadius:12, maxWidth:"70%"
            }}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={send} style={{display:"flex", gap:8}}>
        <input
          value={input}
          onChange={e=>setInput(e.target.value)}
          placeholder="Shkruaj një mesazh…"
          style={{flex:1, border:"1px solid var(--border)", borderRadius:10, padding:"10px 12px", background:"var(--white)"}}
        />
        <button className="button-primary">Dërgo</button>
      </form>
    </div>
  );
}
