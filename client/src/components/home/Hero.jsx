import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container" style={{textAlign:"center"}}>
        <h1>Lidhu. Ndaj përvojën. Ndërto karrierën në Shqipëri.</h1>
        <p>Rrjet profesional për studentë, specialistë dhe kompani shqiptare.</p>
        <div className="hero-actions">
          <Link to="/register" className="button-primary">Regjistrohu</Link>
          <Link to="/punet" className="button-outline">Eksploro punët</Link>
        </div>
      </div>
    </section>
  );
}
