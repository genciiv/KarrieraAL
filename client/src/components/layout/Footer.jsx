export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{display:"flex", justifyContent:"space-between", gap:16, flexWrap:"wrap"}}>
        <div>© {new Date().getFullYear()} KarrieraAL</div>
        <div style={{display:"flex", gap:16}}>
          <a href="#">Rreth nesh</a>
          <a href="#">Privatësia</a>
          <a href="#">Ndihma</a>
        </div>
      </div>
    </footer>
  );
}
