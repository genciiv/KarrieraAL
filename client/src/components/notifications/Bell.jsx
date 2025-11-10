import { useNotifications } from "../../contexts/NotificationsContext.jsx";

export default function Bell() {
  const { items, unread, open, setOpen, markAllRead, remove, clear } = useNotifications();

  return (
    <div className="notif-wrap">
      <button className="notif-btn" onClick={() => setOpen(!open)} aria-label="Njoftime">
        🔔
        {unread > 0 && <span className="notif-badge">{unread}</span>}
      </button>

      {open && (
        <div className="notif-panel">
          <div className="notif-head">
            <strong>Njoftime</strong>
            <div className="row" style={{ gap: 6 }}>
              <button className="button-link" onClick={markAllRead}>Mark read</button>
              <button className="button-link" onClick={clear}>Pastro</button>
            </div>
          </div>

          <div className="notif-list">
            {!items.length && <div className="helper">S’ka njoftime.</div>}
            {items.map(n => (
              <div key={n.id} className={`notif-item ${n.read ? "read" : ""}`}>
                <div className="notif-dot" data-kind={n.kind} />
                <div className="notif-texts">
                  <div className="notif-title">{n.title}</div>
                  {n.desc && <div className="notif-desc">{n.desc}</div>}
                  <div className="notif-time">
                    {new Date(n.at).toLocaleString("sq-AL", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
                <button className="button-link" onClick={() => remove(n.id)}>Fshi</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
