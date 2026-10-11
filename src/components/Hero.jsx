import CountUp from "./CountUp.jsx";

export default function Hero({ profile }) {
  if (!profile) return null;
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="hero">
      <div className="container hero-grid fade-in">
        <div>
          {profile.availableForWork && (
            <span className="badge">
              <i className="dot" /> {profile.availability || "Available for work"}
            </span>
          )}
          <p className="eyebrow">
            {profile.name} · {profile.title}
          </p>
          <h1>
            <span className="gradient">{profile.headline}</span>
          </h1>
          <p className="tagline">{profile.tagline}</p>

          <div className="btn-row">
            <a href="#contact" className="btn btn-primary">
              Start a project
            </a>
            <a href="#projects" className="btn btn-ghost">
              See my work
            </a>
            {profile.whatsapp && (
              <a
                href={`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent("Hi Nidhi, I'd like to discuss a project.")}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                WhatsApp me
              </a>
            )}
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
                Resume
              </a>
            )}
          </div>

          {profile.stats?.length > 0 && (
            <div className="stats">
              {profile.stats.map((s) => (
                <div key={s.label}>
                  <div className="stat-value gradient">
                    <CountUp value={s.value} />
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="avatar-wrap">
          <div className="avatar">
            {profile.avatarUrl ? <img src={profile.avatarUrl} alt={profile.name} /> : initials}
          </div>
        </div>
      </div>
    </section>
  );
}
