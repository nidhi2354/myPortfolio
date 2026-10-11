import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/api.js";

export default function Messages({ onUnread }) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await api("/messages", { auth: true });
      setMessages(res.data);
      onUnread?.(res.unread);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [onUnread]);

  useEffect(() => {
    load();
  }, [load]);

  const markRead = async (id) => {
    await api(`/messages/${id}/read`, { method: "PATCH", auth: true }).catch((e) =>
      setError(e.message)
    );
    load();
  };

  const remove = async (id) => {
    if (!confirm("Message delete karein?")) return;
    await api(`/messages/${id}`, { method: "DELETE", auth: true }).catch((e) => setError(e.message));
    load();
  };

  if (loading) return <div className="spinner" />;

  return (
    <div>
      {error && <div className="alert alert-err">{error}</div>}
      {messages.length === 0 && <p className="muted small">Abhi koi message nahi aaya.</p>}

      <div className="stack">
        {messages.map((m) => (
          <div className={`card msg ${m.read ? "" : "unread"}`} key={m._id}>
            <div className="msg-head">
              <div>
                <strong>{m.name}</strong>{" "}
                <a className="muted small" href={`mailto:${m.email}`}>
                  &lt;{m.email}&gt;
                </a>
              </div>
              <span className="muted small">{new Date(m.createdAt).toLocaleString("en-IN")}</span>
            </div>

            {m.subject && <div className="small" style={{ marginBottom: "0.3rem" }}>{m.subject}</div>}
            <p className="muted small" style={{ margin: "0 0 0.8rem", whiteSpace: "pre-wrap" }}>
              {m.message}
            </p>

            <div className="row-actions">
              {!m.read && (
                <button className="link-btn" onClick={() => markRead(m._id)}>
                  Mark as read
                </button>
              )}
              <a className="link-btn" href={`mailto:${m.email}?subject=Re: ${m.subject || "Your message"}`}>
                Reply
              </a>
              <button className="link-btn danger" onClick={() => remove(m._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
