import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useToast } from "../contexts/ToastContext.jsx";
import { fileToBase64 } from "../utils/fileToBase64.js";

const DEFAULT_PROFILE = {
  name: "",
  title: "",
  bio: "",
  education: "",
  experience: "",
  skills: "",
  city: "",
  role: "Individ",
  photoDataUrl: "",
  cvName: "",
  cvDataUrl: "",
  socials: { linkedin: "", github: "", website: "" },
};

export default function Profile() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const STORAGE_KEY = "ka_profile_" + (user?.id || "guest");

  const [profile, setProfile] = useState({
    ...DEFAULT_PROFILE,
    name: user?.name || "",
  });

  // ngarko nga localStorage + MERGE me defaultet (fix për profile të vjetra)
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setProfile((prev) => ({
          ...prev,
          ...parsed,
          socials: { ...DEFAULT_PROFILE.socials, ...(parsed.socials || {}) },
        }));
      } catch {
        // nëse ka data të korruptuar, i pastrojmë
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    // eslint-disable-next-line
  }, [STORAGE_KEY]);

  // helpers
  function handleChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }
  function handleSocialChange(e) {
    setProfile({
      ...profile,
      socials: { ...profile.socials, [e.target.name]: e.target.value },
    });
  }

  async function onPhotoPick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      addToast("Ngarko vetëm imazhe për foton e profilit.", "error");
      return;
    }
    const dataUrl = await fileToBase64(file);
    setProfile((p) => ({ ...p, photoDataUrl: dataUrl }));
    addToast("Fotoja u ngarkua (lokalisht).", "success");
  }
  function clearPhoto() {
    setProfile((p) => ({ ...p, photoDataUrl: "" }));
  }

  async function onCVPick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      addToast("Ngarko vetëm PDF si CV.", "error");
      return;
    }
    const dataUrl = await fileToBase64(file);
    setProfile((p) => ({ ...p, cvName: file.name, cvDataUrl: dataUrl }));
    addToast("CV u ngarkua (lokalisht).", "success");
  }
  function clearCV() {
    setProfile((p) => ({ ...p, cvName: "", cvDataUrl: "" }));
  }

  function handleSave() {
    try {
      // siguro që socials ekziston edhe kur ruan
      const toSave = {
        ...profile,
        socials: { ...DEFAULT_PROFILE.socials, ...(profile.socials || {}) },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      addToast("Profili u ruajt me sukses ✅", "success");
    } catch {
      addToast("S’u ruajt (shumë i madh?). Do kalojmë në backend më vonë.", "error");
    }
  }

  return (
    <div className="container" style={{ marginTop: 24 }}>
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "2fr 1fr" }}>
        {/* Kolona majtas: Forma */}
        <div className="card" style={{ display: "grid", gap: 16 }}>
          <h2>Profili im</h2>

          {/* Foto profili */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="avatar avatar-img">
              {profile.photoDataUrl ? (
                <img
                  src={profile.photoDataUrl}
                  alt="Foto profili"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                />
              ) : (
                <span style={{ fontWeight: 700, color: "#666" }}>
                  {(profile.name || "U")?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <label className="button-outline" style={{ cursor: "pointer" }}>
                Ngarko foto
                <input type="file" accept="image/*" onChange={onPhotoPick} style={{ display: "none" }} />
              </label>
              {profile.photoDataUrl && (
                <button className="button-outline" onClick={clearPhoto}>Hiq foton</button>
              )}
            </div>
          </div>

          <div className="form">
            <div className="row">
              <div>
                <div className="label">Emri dhe mbiemri</div>
                <input className="input" name="name" value={profile.name} onChange={handleChange} />
              </div>
              <div>
                <div className="label">Pozicioni / Profesioni</div>
                <input
                  className="input"
                  name="title"
                  value={profile.title}
                  onChange={handleChange}
                  placeholder="p.sh. Zhvillues Web / Specialist IT"
                />
              </div>
            </div>

            <div>
              <div className="label">Bio</div>
              <textarea
                className="textarea"
                name="bio"
                rows={4}
                value={profile.bio}
                onChange={handleChange}
                placeholder="Shkruaj diçka rreth vetes..."
              />
            </div>

            <div className="row">
              <div>
                <div className="label">Arsimi</div>
                <textarea
                  className="textarea"
                  name="education"
                  rows={3}
                  value={profile.education}
                  onChange={handleChange}
                  placeholder="p.sh. Universiteti i Tiranës, Bachelor në Informatikë"
                />
              </div>
              <div>
                <div className="label">Eksperienca</div>
                <textarea
                  className="textarea"
                  name="experience"
                  rows={3}
                  value={profile.experience}
                  onChange={handleChange}
                  placeholder="p.sh. 2 vite si zhvillues React në një kompani software"
                />
              </div>
            </div>

            <div className="row">
              <div>
                <div className="label">Qyteti</div>
                <select className="select" name="city" value={profile.city} onChange={handleChange}>
                  <option value="">Zgjidh</option>
                  <option>Tiranë</option><option>Fier</option><option>Durrës</option><option>Shkodër</option>
                </select>
              </div>
              <div>
                <div className="label">Roli</div>
                <select className="select" name="role" value={profile.role} onChange={handleChange}>
                  <option>Individ</option>
                  <option>Kompani</option>
                </select>
              </div>
            </div>

            <div>
              <div className="label">Aftësi (presje të ndara)</div>
              <input
                className="input"
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                placeholder="p.sh. HTML, CSS, React, Node.js"
              />
            </div>

            {/* CV */}
            <div>
              <div className="label">CV (PDF)</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <label className="button-outline" style={{ cursor: "pointer" }}>
                  Ngarko CV
                  <input type="file" accept="application/pdf" onChange={onCVPick} style={{ display: "none" }} />
                </label>
                {profile.cvName && (
                  <>
                    <a className="button-outline" href={profile.cvDataUrl} download={profile.cvName}>
                      Shkarko: {profile.cvName}
                    </a>
                    <button className="button-outline" onClick={clearCV}>Hiq CV</button>
                  </>
                )}
              </div>
              <div className="helper">Shënim: Ruhet lokalisht si dataURL — për CV të mëdha do kalojmë në backend.</div>
            </div>

            {/* Socials */}
            <div className="row">
              <div>
                <div className="label">LinkedIn</div>
                <input
                  className="input"
                  name="linkedin"
                  value={profile.socials?.linkedin || ""}
                  onChange={handleSocialChange}
                  placeholder="https://www.linkedin.com/in/…"
                />
              </div>
              <div>
                <div className="label">GitHub</div>
                <input
                  className="input"
                  name="github"
                  value={profile.socials?.github || ""}
                  onChange={handleSocialChange}
                  placeholder="https://github.com/…"
                />
              </div>
            </div>
            <div>
              <div className="label">Website</div>
              <input
                className="input"
                name="website"
                value={profile.socials?.website || ""}
                onChange={handleSocialChange}
                placeholder="https://emri.al"
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className="button-primary" onClick={handleSave}>Ruaj profilin</button>
            </div>
          </div>
        </div>

        {/* Kolona djathtas: Shfaqja */}
        <aside className="card" style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="avatar avatar-img">
              {profile.photoDataUrl ? (
                <img
                  src={profile.photoDataUrl}
                  alt="Foto profili"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                />
              ) : (
                <span style={{ fontWeight: 700, color: "#666" }}>
                  {(profile.name || "U")?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <div style={{ fontWeight: 700 }}>{profile.name || "—"}</div>
              <div style={{ color: "var(--text-light)", fontSize: 14 }}>
                {profile.title || "—"}
              </div>
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />

          <Detail label="Bio" value={profile.bio} />
          <Detail label="Arsimi" value={profile.education} />
          <Detail label="Eksperienca" value={profile.experience} />
          <Detail label="Aftësi" value={profile.skills} />
          <Detail label="Qyteti" value={profile.city} />
          <Detail label="Roli" value={profile.role} />

          {(profile.socials?.linkedin || profile.socials?.github || profile.socials?.website) && (
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Lidhje</div>
              <div style={{ display: "grid", gap: 6 }}>
                {profile.socials?.linkedin && <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
                {profile.socials?.github && <a href={profile.socials.github} target="_blank" rel="noreferrer">GitHub</a>}
                {profile.socials?.website && <a href={profile.socials.website} target="_blank" rel="noreferrer">Website</a>}
              </div>
            </div>
          )}

          {profile.cvName && (
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>CV</div>
              <a className="button-outline" href={profile.cvDataUrl} download={profile.cvName}>
                Shkarko CV ({profile.cvName})
              </a>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
      <div style={{ color: "#333" }}>{value || "—"}</div>
    </div>
  );
}
