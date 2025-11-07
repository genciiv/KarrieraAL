import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // {id, name, email, onboarded}
  useEffect(() => {
    const raw = localStorage.getItem("ka_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);
  useEffect(() => {
    if (user) localStorage.setItem("ka_user", JSON.stringify(user));
    else localStorage.removeItem("ka_user");
  }, [user]);

  const value = useMemo(() => ({
    user,
    login: (u) => setUser(u),
    logout: () => setUser(null),
    updateUser: (patch) => setUser(prev => ({ ...prev, ...patch })),
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(){
  const ctx = useContext(AuthContext);
  if(!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
