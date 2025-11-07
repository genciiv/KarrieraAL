import CompanyHeader from "../components/company/CompanyHeader.jsx";
import OpenPositions from "../components/company/OpenPositions.jsx";

const mockCompany = { name:"TechAL", industry:"Software", size:"50–100", city:"Tiranë" };
const mockJobs = [
  { id:"c1", title:"Full-Stack (MERN)", city:"Tiranë", remote:true, salary:"1,200–1,600€", deadline:"30 Dhj" },
  { id:"c2", title:"QA Tester", city:"Tiranë", remote:false, salary:"900–1,200€", deadline:"20 Dhj" },
];

export default function Company() {
  return (
    <div className="container" style={{marginTop:24, display:"grid", gap:16, gridTemplateColumns:"2fr 1fr"}}>
      <div style={{display:"grid", gap:16}}>
        <CompanyHeader company={mockCompany} />
        <OpenPositions jobs={mockJobs} />
        <div className="card">
          <h3>Rreth kompanisë</h3>
          <p>Ne ndërtojmë produkte dixhitale për tregun shqiptar dhe rajonin.</p>
        </div>
      </div>
      <aside style={{display:"grid", gap:16}}>
        <div className="card">
          <h3>Postime</h3>
          <p>Shpejt: postime nga kompania, njoftime dhe lajme.</p>
        </div>
      </aside>
    </div>
  );
}
