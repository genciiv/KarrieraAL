import { useState } from "react";

const QA = [
  {
    q: "A është platforma falas?",
    a: "Po. Regjistrimi për individë është falas. Kompanitë mund të postojnë punë në planin bazë (mock).",
  },
  {
    q: "Si aplikoj për një punë?",
    a: "Hyni te Punë, zgjidhni pozicionin dhe klikoni Apliko. Aplikimi ruhet në ‘Aplikimet e mia’.",
  },
  {
    q: "Si mund të jem i dukshëm për rekrutues?",
    a: "Plotësoni profilin me aftësi, përvojë dhe lidhje sociale. Sa më i plotë, aq më mirë.",
  },
  {
    q: "A ka evente komunitare?",
    a: "Po, te Ngjarje do gjeni webinare/meetups dhe mund të bëni RSVP (ruhet lokalisht).",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="accordion">
      {QA.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`acc-item ${isOpen ? "open" : ""}`}>
            <button className="acc-q" onClick={() => setOpen(isOpen ? -1 : i)}>
              {item.q}
              <span className="acc-icon">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && <div className="acc-a">{item.a}</div>}
          </div>
        );
      })}
    </div>
  );
}
