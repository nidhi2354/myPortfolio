import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, setToken } from "../lib/api.js";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await login(form);
      setToken(res.token);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="center">
      <form className="card auth-card fade-in" onSubmit={submit}>
        <h2 style={{ margin: "0 0 0.3rem" }}>Admin login</h2>
        <p className="muted small" style={{ marginTop: 0 }}>
          Portfolio content manage karne ke liye.
        </p>

        {error && <div className="alert alert-err">{error}</div>}

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            autoFocus
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button className="btn btn-primary" style={{ width: "100%" }} disabled={busy}>
          {busy ? "Check kar rahe hain…" : "Login"}
        </button>

        <p className="small" style={{ marginBottom: 0, textAlign: "center" }}>
          <Link to="/" className="muted">
            ← Portfolio par wapas
          </Link>
        </p>
      </form>
    </div>
  );
}
