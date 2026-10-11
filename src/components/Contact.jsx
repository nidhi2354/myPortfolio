import { useState } from "react";
import { projectTypes, budgets } from "../data/portfolio.js";

const EMPTY = { name: "", email: "", projectType: "", budget: "", message: "" };
const gmail = (to, subject = "", body = "") =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export default function Contact({ profile }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ type: "", text: "" });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Static site — the brief opens as a Gmail compose window (works without a desktop mail app).
  const submit = (e) => {
    e.preventDefault();
    const subject = `Project inquiry${form.projectType ? ` — ${form.projectType}` : ""} (${form.name})`;
    const body = [
      form.message,
      "",
      `Project type: ${form.projectType || "—"}`,
      `Budget: ${form.budget || "—"}`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
    ].join("\n");
    window.open(gmail(profile.email, subject, body), "_blank", "noopener");
    setStatus({ type: "ok", text: "Gmail opened in a new tab — just hit send there 🎉" });
    setForm(EMPTY);
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="rule" />
        <h2 className="section-title">Let's build your project</h2>
        <p className="section-sub">
          Tell me what you need — I'll reply with questions, a rough timeline and a quote.
        </p>

        <div className="contact-grid">
          <div className="card">
            <div className="contact-item">
              <div className="k">Fastest way</div>
              {profile.whatsapp && (
                <a
                  href={`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent("Hi Nidhi, I'd like to discuss a project.")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Message me on WhatsApp ↗
                </a>
              )}
            </div>
            {profile?.email && (
              <div className="contact-item">
                <div className="k">Email</div>
                <a href={gmail(profile.email)} target="_blank" rel="noreferrer">
                  {profile.email}
                </a>
              </div>
            )}
            {profile?.phone && (
              <div className="contact-item">
                <div className="k">Phone</div>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
              </div>
            )}
            {profile?.location && (
              <div className="contact-item">
                <div className="k">Location</div>
                <div>{profile.location}</div>
              </div>
            )}

            {profile?.socials?.length > 0 && (
              <div className="socials">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    className="social-chip"
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>

          <form className="card" onSubmit={submit}>
            {status.text && (
              <div className={`alert alert-${status.type === "ok" ? "ok" : "err"}`}>
                {status.text}
              </div>
            )}

            <div className="grid-2">
              <div className="field">
                <label htmlFor="name">Your name *</label>
                <input id="name" name="name" value={form.name} onChange={change} required />
              </div>
              <div className="field">
                <label htmlFor="email">Your email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={change}
                  required
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="field">
                <label htmlFor="projectType">Project type</label>
                <select id="projectType" name="projectType" value={form.projectType} onChange={change}>
                  <option value="">Select…</option>
                  {projectTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="budget">Budget</label>
                <select id="budget" name="budget" value={form.budget} onChange={change}>
                  <option value="">Select…</option>
                  {budgets.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="message">About your project *</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={change}
                required
                maxLength={2000}
                placeholder="What do you want to build, and by when?"
              />
            </div>

            <button className="btn btn-primary">Send project brief</button>
          </form>
        </div>
      </div>
    </section>
  );
}
