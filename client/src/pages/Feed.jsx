import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useToast } from "../contexts/ToastContext.jsx";

export default function Feed() {
  const { user } = useAuth();
  const { addToast } = useToast();

  const STORAGE_KEY = "karriera_feed";
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  // Ngarko postimet ekzistuese
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setPosts(JSON.parse(raw));
  }, []);

  // Ruaj çdo ndryshim
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  function handlePost() {
    if (!text.trim()) return addToast("Shkruaj diçka!", "error");
    const newPost = {
      id: Date.now(),
      author: user?.name || "Përdorues anonim",
      text,
      time: new Date().toLocaleString("sq-AL"),
      likes: 0,
    };
    setPosts([newPost, ...posts]);
    setText("");
    addToast("Postimi u publikua ✅", "success");
  }

  function handleLike(id) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      )
    );
  }

  return (
    <div className="container" style={{ marginTop: 24, maxWidth: 800 }}>
      <div className="card" style={{ marginBottom: 20 }}>
        <h2>Feed profesional</h2>
        <textarea
          className="textarea"
          placeholder="Shpërndaj një mendim, njoftim ose përvojë profesionale..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="button-primary" onClick={handlePost}>
          Publiko
        </button>
      </div>

      {posts.length === 0 && (
        <p style={{ textAlign: "center", color: "#777" }}>
          Asnjë postim ende. Bëj postimin e parë!
        </p>
      )}

      <div className="feed">
        {posts.map((p) => (
          <div className="card" key={p.id} style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 600 }}>{p.author}</div>
            <div style={{ color: "#666", fontSize: 13 }}>{p.time}</div>
            <p style={{ marginTop: 8 }}>{p.text}</p>
            <button
              className="button-secondary"
              style={{ fontSize: 14 }}
              onClick={() => handleLike(p.id)}
            >
              👍 Pëlqe ({p.likes})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
