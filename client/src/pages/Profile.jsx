import ProfileHeader from "../components/profile/ProfileHeader.jsx";
import ExperienceList from "../components/profile/ExperienceList.jsx";
import EducationList from "../components/profile/EducationList.jsx";

const mockUser = {
  name: "Genci Vaqo",
  title: "Specialist IT",
  city: "Fier",
  bio: "Jam i apasionuar pas MERN, projekteve edukative dhe rrjeteve profesionale.",
  skills: ["react", "node", "mongodb", "marketing", "git"]
};
const mockExp = [
  { id:"e1", role:"Full-Stack Dev", company:"WidoLink", city:"Tiranë", start:"2024", desc:"Zhvillim SPA me React/Node, integrim Stripe, autentikim." },
  { id:"e2", role:"IT Teacher", company:"Petro Sota", city:"Fier", start:"2020", end:"2025", desc:"Mësimdhënie dhe mentorim për projekte praktike." }
];
const mockEdu = [
  { id:"ed1", school:"Uni X", degree:"Bachelor Informatikë", start:"2016", end:"2019" }
];

export default function Profile() {
  return (
    <div className="container" style={{marginTop:24, display:"grid", gap:16, gridTemplateColumns:"2fr 1fr"}}>
      <div style={{display:"grid", gap:16}}>
        <ProfileHeader user={mockUser} />
        <ExperienceList items={mockExp} />
        <EducationList items={mockEdu} />
      </div>
      <aside style={{display:"grid", gap:16}}>
        <div className="card">
          <h3>Rreth meje</h3>
          <p>Mund të shtosh certifikime, projekte dhe rekomandime.</p>
        </div>
        <div className="card">
          <h3>Kontakt</h3>
          <p>Email: demo@karriera.al</p>
        </div>
      </aside>
    </div>
  );
}
