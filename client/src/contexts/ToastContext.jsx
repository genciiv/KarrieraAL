import { createContext, useContext, useMemo, useState, useCallback } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const remove = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), []);
  const add = useCallback((msg, type="success", ttl=2500) => {
    const id = crypto.randomUUID();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => remove(id), ttl);
  }, [remove]);

  const value = useMemo(()=>({ addToast: add }), [add]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
