const PARTNERS = ["TechAL", "DataFier", "Studio Durrës", "HR Group", "GreenIT", "TiranaLabs"];

export default function PartnerStrip() {
  return (
    <div className="partners">
      {PARTNERS.map((p) => (
        <div key={p} className="partner-pill" title={p}>
          {p}
        </div>
      ))}
    </div>
  );
}
