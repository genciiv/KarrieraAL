export default function ExperienceList({ items = [] }) {
  return (
    <div className="card section">
      <h3>Përvoja</h3>
      {items.length ? items.map((e)=>(
        <div key={e.id} className="item">
          <strong>{e.role}</strong> • {e.company}
          <div style={{color:"var(--text-light)", fontSize:14}}>
            {e.start} – {e.end || "Prezent"} • {e.city}
          </div>
          <p style={{marginTop:8}}>{e.desc}</p>
        </div>
      )) : <div>Nuk ka përvoja të shtuar ende.</div>}
    </div>
  );
}
