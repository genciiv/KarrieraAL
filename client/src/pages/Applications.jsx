import { useAuth } from "../contexts/AuthContext.jsx";
import { useApplications } from "../contexts/ApplicationsContext.jsx";

export default function Applications() {
  const { user } = useAuth();
  const { listByUser, removeApplication } = useApplications();

  const items = user ? listByUser(user.id) : [];

  return (
    <div className="container" style={{marginTop:24}}>
      <div className="card" style={{display:"grid", gap:12}}>
        <h2>Aplikimet e mia</h2>
        {!user && <div>Duhet të jesh i loguar.</div>}
        {user && !items.length && <div>Nuk ke asnjë aplikim ende.</div>}
        {user && items.map(app => (
          <div key={app.id} style={{border:"1px solid var(--border)", borderRadius:10, padding:12}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <div>
                <strong>{app.jobTitle}</strong> • {app.company}
                <div style={{color:"var(--text-light)", fontSize:13}}>
                  Dërguar më: {new Date(app.appliedAt).toLocaleString()}
                </div>
              </div>
              <button className="button-outline" onClick={()=>removeApplication(app.id)}>Hiq</button>
            </div>
            <div style={{marginTop:8, color:"var(--text-light)"}}>
              Email: {app.email} {app.cvName ? `• CV: ${app.cvName}` : ""}
            </div>
            {app.message && <p style={{marginTop:8}}>{app.message}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
