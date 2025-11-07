import Hero from "../components/home/Hero.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <section style={{marginTop: 24}}>
        <div className="container">
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
              <h3>Njohuri & evente</h3>
              <p>Webinare, takime dhe artikuj nga komuniteti.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
