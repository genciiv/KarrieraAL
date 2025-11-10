import { useEffect, useMemo, useState } from "react";
import { COMPANIES } from "../data/companies.js";
import CompanyCard from "../components/company/CompanyCard.jsx";

const LS_COMPANIES = "ka_companies";
const LS_MY_FOLLOWS = "ka_my_company_follows";

export default function Following() {
  // lexon kompanitë dhe ndjekjet e mia
  const [companies] = useState(() =>
    JSON.parse(localStorage.getItem(LS_COMPANIES) || "null") || COMPANIES
  );
  const [my] = useState(() =>
    new Set(JSON.parse(localStorage.getItem(LS_MY_FOLLOWS) || "[]"))
  );

  const list = useMemo(() => companies.filter(c => my.has(c.id)), [companies, my]);

  return (
    <div className="container" style={{ marginTop: 24 }}>
      <div className="card" style={{ display:"grid", gap:12 }}>
        <h2 style={{ margin:0 }}>Ndjekjet e mia</h2>
        {!list.length && <div className="helper">Nuk po ndiqni asnjë kompani ende.</div>}
        <div className="grid-2">
          {list.map(c => (
            <div key={c.id} className="company-wrapper">
              <CompanyCard c={c} following={true} onToggleFollow={()=>{}} onShowAll={()=>{}} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
