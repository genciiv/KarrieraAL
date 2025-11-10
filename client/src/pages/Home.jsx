import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import StatCounter from "../components/home/StatCounter.jsx";
import Testimonials from "../components/home/Testimonials.jsx";
import PartnerStrip from "../components/home/PartnerStrip.jsx";
import FAQ from "../components/home/FAQ.jsx";

export default function Home() {
  const { user } = useAuth();
  const isCompany = user?.role === "Kompani";

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Lidhu. Ndaj përvojën. Ndërto karrierën në Shqipëri.
          </h1>
          <p className="hero-sub">
            Rrjet profesional për studentë, specialistë dhe kompani shqiptare.
          </p>
          <div className="cta-row">
            {!user && (
              <>
                <Link to="/register" className="button-primary">Regjistrohu</Link>
                <Link to="/punet" className="button-secondary">Eksploro punët</Link>
              </>
            )}
            {user && !isCompany && (
              <>
                <Link to="/feed" className="button-primary">Shpërndaj një postim</Link>
                <Link to="/applications" className="button-secondary">Aplikimet e mia</Link>
              </>
            )}
            {user && isCompany && (
              <>
                <Link to="/punet/shto" className="button-primary">Posto një punë</Link>
                <Link to="/kompani" className="button-secondary">Shiko kompanitë</Link>
              </>
            )}
          </div>

          {/* Stats me animacion */}
          <div className="stats grid grid-3">
            <div className="stat">
              <div className="stat-num">
                <StatCounter to={3120} />
              </div>
              <div className="stat-label">Anëtarë</div>
            </div>
            <div className="stat">
              <div className="stat-num">
                <StatCounter to={127} />
              </div>
              <div className="stat-label">Punë aktive</div>
            </div>
            <div className="stat">
              <div className="stat-num">
                <StatCounter to={86} />
              </div>
              <div className="stat-label">Kompani partnere</div>
            </div>
          </div>
        </div>
      </section>

      {/* PSE TË BASHKOHESH */}
      <section className="container">
        <div className="grid grid-3">
          <div className="card">
            <h3>Pse të bashkohesh?</h3>
            <p>Rrjetëzim me profesionistë dhe kompani në Shqipëri.</p>
          </div>
          <div className="card">
            <h3>Mundësi pune</h3>
            <p>Shfleto pozicione të reja për çdo nivel.</p>
          </div>
          <div className="card">
            <h3>Njoftime & evente</h3>
            <p>Webinare, takime dhe artikuj nga komuniteti.</p>
          </div>
        </div>
      </section>

      {/* Testimoniale */}
      <section className="container">
        <h2 className="section-title">Çfarë thonë përdoruesit</h2>
        <Testimonials />
      </section>

      {/* Partnerë */}
      <section className="partners-wrap">
        <div className="container">
          <PartnerStrip />
        </div>
      </section>

      {/* FAQ */}
      <section className="container">
        <h2 className="section-title">Pyetje të shpeshta</h2>
        <FAQ />
      </section>
    </div>
  );
}
