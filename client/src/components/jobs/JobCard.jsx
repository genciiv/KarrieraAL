export default function JobCard({ job }) {
  return (
    <div className="card" style={{display:"grid", gap:6}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"start"}}>
        <div>
          <h3 style={{margin:"0 0 4px"}}>{job.title}</h3>
          <div style={{color:"var(--text-light)"}}>
            {job.company} • {job.city} {job.remote ? "• Remote" : ""}
          </div>
        </div>
        <strong style={{color:"var(--primary)"}}>{job.salary}</strong>
      </div>
      <div style={{display:"flex", gap:12, alignItems:"center", marginTop:8, color:"var(--text-light)", fontSize:14}}>
        <span>Afati: {job.deadline}</span>
        <span style={{marginLeft:"auto"}}><a href="#">Apliko</a></span>
      </div>
    </div>
  );
}
