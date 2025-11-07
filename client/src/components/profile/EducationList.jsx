export default function EducationList({ items = [] }) {
  return (
    <div className="card section">
      <h3>Edukimi</h3>
      {items.length ? items.map((e)=>(
        <div key={e.id} className="item">
          <strong>{e.school}</strong> • {e.degree}
          <div style={{color:"var(--text-light)", fontSize:14}}>
            {e.start} – {e.end}
          </div>
        </div>
      )) : <div>Nuk ka edukim të shtuar ende.</div>}
    </div>
  );
}
