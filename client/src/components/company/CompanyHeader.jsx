export default function CompanyHeader({ company }) {
  return (
    <div className="card" style={{display:"flex", gap:14, alignItems:"center"}}>
      <div style={{
        width:60, height:60, borderRadius:12, background:"#dde7ff",
        display:"grid", placeItems:"center", fontWeight:800, color:"#335"
      }}>
        {company.name?.slice(0,2).toUpperCase()}
      </div>
      <div style={{flex:1}}>
        <h2 style={{margin:"0 0 4px"}}>{company.name}</h2>
        <div style={{color:"var(--text-light)"}}>
          {company.industry} • {company.size} • {company.city}
        </div>
      </div>
      <button className="button-primary">Ndiq</button>
    </div>
  );
}
