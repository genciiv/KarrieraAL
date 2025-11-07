import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useMessages } from "../contexts/MessagesContext.jsx";
import { useToast } from "../contexts/ToastContext.jsx";

const sampleContacts = [
  { id: "1", name: "TechVision" },
  { id: "2", name: "AlbaniaSoft" },
  { id: "3", name: "HR Group" },
  { id: "4", name: "GreenIT" },
];

export default function Messages() {
  const { user } = useAuth();
  const { getConversation, sendMessage } = useMessages();
  const { addToast } = useToast();
  const [active, setActive] = useState(null);
  const [input, setInput] = useState("");

  if (!user)
    return (
      <div className="container" style={{ marginTop: 40 }}>
        <div className="card">Duhet të jeni të loguar për të parë mesazhet.</div>
      </div>
    );

  const conv = active ? getConversation(active.id) : [];

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(user.name, active.name, input);
    setInput("");
    addToast("Mesazhi u dërgua ✅", "success");
  }

  return (
    <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16, marginTop: 24 }}>
      <div className="card" style={{ height: "75vh", overflowY: "auto" }}>
        <h3>Kontaktet</h3>
        <div style={{ display: "grid", gap: 8 }}>
          {sampleContacts.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c)}
              style={{
                textAlign: "left",
                padding: 10,
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: active?.id === c.id ? "var(--primary-light)" : "#fff",
                cursor: "pointer",
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ height: "75vh", display: "flex", flexDirection: "column" }}>
        {!active ? (
          <div style={{ margin: "auto", color: "gray" }}>Zgjidh një kontakt për të filluar bisedën.</div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: "auto", padding: 8, display: "grid", gap: 8 }}>
              {conv.length === 0 ? (
                <div style={{ textAlign: "center", color: "#777" }}>Asnjë mesazh.</div>
              ) : (
                conv.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      background: m.from === user.name ? "var(--primary-light)" : "#f0f0f0",
                      justifySelf: m.from === user.name ? "end" : "start",
                      maxWidth: "70%",
                      padding: "6px 10px",
                      borderRadius: 8,
                    }}
                  >
                    <b>{m.from === user.name ? "Unë" : m.from}:</b> {m.text}
                    <div style={{ fontSize: 12, color: "#666", textAlign: "right" }}>
                      {new Date(m.time).toLocaleTimeString("sq-AL", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSend} style={{ display: "flex", gap: 8 }}>
              <input
                className="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Mesazh për ${active.name}...`}
                style={{ flex: 1 }}
              />
              <button className="button-primary" type="submit">Dërgo</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
