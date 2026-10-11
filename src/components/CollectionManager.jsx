import { useEffect, useState } from "react";
import { api } from "../lib/api.js";

/**
 * Ek hi generic manager — projects / skills / education / experience,
 * sab apni field-list de dete hain aur CRUD yahin ho jata hai.
 *
 * field: { key, label, type: text|textarea|number|checkbox|date|list|select, options? }
 */
export default function CollectionManager({ path, fields, titleOf, subtitleOf }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // form object ya null
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      const res = await api(path);
      setItems(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const blank = () =>
    fields.reduce(
      (acc, f) => ({ ...acc, [f.key]: f.type === "checkbox" ? false : f.type === "number" ? 0 : "" }),
      {}
    );

  const startEdit = (item) => {
    const form = {};
    for (const f of fields) {
      const v = item[f.key];
      form[f.key] =
        f.type === "list"
          ? (v || []).join(", ")
          : f.type === "date"
          ? v
            ? String(v).slice(0, 10)
            : ""
          : v ?? (f.type === "checkbox" ? false : "");
    }
    setEditing({ ...form, _id: item._id });
  };

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");

    const body = {};
    for (const f of fields) {
      const v = editing[f.key];
      if (f.type === "list") body[f.key] = String(v).split(",").map((s) => s.trim()).filter(Boolean);
      else if (f.type === "number") body[f.key] = v === "" ? undefined : Number(v);
      else if (f.type === "date") body[f.key] = v || undefined;
      else body[f.key] = v;
    }

    try {
      if (editing._id) await api(`${path}/${editing._id}`, { method: "PUT", body, auth: true });
      else await api(path, { method: "POST", body, auth: true });
      setEditing(null);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Pakka delete karna hai?")) return;
    try {
      await api(`${path}/${id}`, { method: "DELETE", auth: true });
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  if (editing)
    return (
      <form className="card" onSubmit={save}>
        <h3 style={{ marginTop: 0 }}>{editing._id ? "Edit" : "Naya add karo"}</h3>
        {error && <div className="alert alert-err">{error}</div>}

        {fields.map((f) => (
          <div className="field" key={f.key}>
            <label htmlFor={f.key}>{f.label}</label>
            {f.type === "textarea" ? (
              <textarea
                id={f.key}
                value={editing[f.key]}
                onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
              />
            ) : f.type === "checkbox" ? (
              <input
                id={f.key}
                type="checkbox"
                style={{ width: "auto" }}
                checked={!!editing[f.key]}
                onChange={(e) => setEditing({ ...editing, [f.key]: e.target.checked })}
              />
            ) : f.type === "select" ? (
              <select
                id={f.key}
                value={editing[f.key]}
                onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
              >
                <option value="">— choose —</option>
                {f.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={f.key}
                type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                value={editing[f.key]}
                onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                placeholder={f.type === "list" ? "comma se alag karo" : ""}
              />
            )}
          </div>
        ))}

        <div className="btn-row">
          <button className="btn btn-primary" disabled={busy}>
            {busy ? "Save ho raha hai…" : "Save"}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setEditing(null)}>
            Cancel
          </button>
        </div>
      </form>
    );

  return (
    <div>
      {error && <div className="alert alert-err">{error}</div>}
      <button className="btn btn-primary" onClick={() => setEditing(blank())} style={{ marginBottom: "1.2rem" }}>
        + Naya add karo
      </button>

      <div className="stack">
        {items.length === 0 && <p className="muted small">Abhi kuch nahi hai.</p>}
        {items.map((item) => (
          <div className="card" key={item._id}>
            <div className="msg-head">
              <strong>{titleOf(item)}</strong>
              <div className="row-actions">
                <button className="link-btn" onClick={() => startEdit(item)}>
                  Edit
                </button>
                <button className="link-btn danger" onClick={() => remove(item._id)}>
                  Delete
                </button>
              </div>
            </div>
            <div className="muted small">{subtitleOf(item)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
