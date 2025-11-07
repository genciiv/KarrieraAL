import { useState } from "react";
import { createPost } from "../../lib/api.js";
import { useToast } from "../../contexts/ToastContext.jsx";

export default function CreatePost({ onCreated }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  async function handleSubmit(e){
    e.preventDefault();
    if(!text.trim()) return;
    setLoading(true);
    const res = await createPost({ text });
    setLoading(false);
    if (res.ok){ 
      addToast("Postimi u publikua ✅", "success");
      setText("");
      onCreated?.(res);
    } else {
      addToast("Diçka shkoi keq", "error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{marginBottom: 16}}>
      <textarea
        value={text}
        onChange={e=>setText(e.target.value)}
        placeholder="Shkruaj një postim…"
        rows={3}
        style={{width:"100%", border:"1px solid var(--border)", borderRadius:10, padding:12, resize:"vertical"}}
      />
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10}}>
        <div style={{color:"var(--text-light)", fontSize:14}}>Tekst • Media (së shpejti)</div>
        <button className="button-primary" disabled={loading}>
          {loading ? "Duke publikuar…" : "Posto"}
        </button>
      </div>
    </form>
  );
}
