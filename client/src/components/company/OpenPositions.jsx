export default function OpenPositions({ jobs = [] }) {
  return (
    <div className="card section">
      <h3>Vende të lira</h3>
      {jobs.length ? jobs.map(j=>(
        <div key={j.id} className="item" style={{display:"grid", gap:6}}>
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <strong>{j.title}</strong>
            <span style={{color:"var(--primary)"}}>{j.salary}</span>
          </div>
          <div style={{color:"var(--text-light)", fontSize:14}}>
            {j.city} {j.remote ? "• Remote" : ""} • Afati: {j.deadline}
          </div>
          <div><a href="#">Shiko detajet</a></div>
        </div>
      )) : <div>Aktualisht nuk ka vende të hapura.</div>}
    </div>
  );
}
