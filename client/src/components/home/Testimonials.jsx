const DATA = [
  {
    name: "Ardit K.",
    role: "Zhvillues React",
    text:
      "Gjeta punën e parë junior në Tiranë falë KarrieraAL. Postimet e kompanive janë të qarta dhe të shpeshta.",
  },
  {
    name: "Erjona M.",
    role: "HR, DataFier",
    text:
      "Si kompani, filtrat na kursejnë kohë. Kandidatët duken më të përgatitur falë profileve të detajuara.",
  },
  {
    name: "Klevis G.",
    role: "Designer",
    text:
      "Komuniteti është aktiv. Eventet dhe feed-i më kanë ndihmuar të lidhem me profesionistë të tjerë.",
  },
];

export default function Testimonials() {
  return (
    <div className="grid grid-3">
      {DATA.map((t, i) => (
        <div key={i} className="card testimonial">
          <div className="testimonial-avatar">{t.name[0]}</div>
          <div className="testimonial-name">{t.name}</div>
          <div className="testimonial-role">{t.role}</div>
          <p className="testimonial-text">“{t.text}”</p>
        </div>
      ))}
    </div>
  );
}
