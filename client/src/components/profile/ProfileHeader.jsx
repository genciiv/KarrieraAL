export default function ProfileHeader({ user }) {
  return (
    <div className="card" style={{display:"grid", gap:12}}>
      <div style={{display:"flex", gap:14, alignItems:"center"}}>
        <div className="avatar">{(user.name||"U")?.[0]}</div>
        <div>
          <h2 style={{margin:"0 0 4px"}}>{user.name}</h2>
          <div style={{color:"var(--text-light)"}}>{user.title} • {user.city}</div>
        </div>
        <div style={{marginLeft:"auto", display:"flex", gap:10}}>
          <button className="button-outline">Mesazh</button>
          <button className="button-primary">Lidhu</button>
        </div>
      </div>
      <p style={{margin:"6px 0 0"}}>{user.bio}</p>
      <div className="chips">
        {user.skills?.map((s)=> <span key={s} className="chip">#{s}</span>)}
      </div>
    </div>
  );
}
