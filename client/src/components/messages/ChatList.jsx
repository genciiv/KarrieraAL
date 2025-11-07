export default function ChatList({ items = [], onOpen }) {
  return (
    <div className="card" style={{padding:0}}>
      {items.map(c => (
        <div key={c.id}
             onClick={()=>onOpen?.(c.id)}
             style={{padding:"12px 14px", borderBottom:"1px solid var(--border)", cursor:"pointer"}}>
          <strong>{c.name}</strong>
          <div style={{color:"var(--text-light)", fontSize:13, marginTop:4}}>{c.last}</div>
        </div>
      ))}
      {!items.length && <div style={{padding:14}}>S’ka biseda ende.</div>}
    </div>
  );
}
