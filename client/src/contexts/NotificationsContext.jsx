import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LS_NOTIFS = "ka_notifications";
const NotificationsContext = createContext(null);

export function NotificationsProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_NOTIFS) || "[]"); }
    catch { return []; }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(LS_NOTIFS, JSON.stringify(items));
  }, [items]);

  function notify({ title, desc = "", kind = "info" }) {
    const n = {
      id: Date.now().toString(),
      title,
      desc,
      kind,              // "info" | "success" | "warning"
      read: false,
      at: new Date().toISOString(),
    };
    setItems(prev => [n, ...prev]);
  }

  function markAllRead() {
    setItems(prev => prev.map(n => ({ ...n, read: true })));
  }
  function remove(id) {
    setItems(prev => prev.filter(n => n.id !== id));
  }
  function clear() {
    setItems([]);
  }

  const unread = useMemo(() => items.filter(n => !n.read).length, [items]);

  return (
    <NotificationsContext.Provider value={{
      items, notify, markAllRead, remove, clear,
      open, setOpen, unread
    }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationsContext);
}
