export default function About({ profile }) {
  if (!profile?.about) return null;

  const facts = [
    ["Location", profile.location],
    ["Email", profile.email],
    ["Phone", profile.phone],
  ].filter(([, v]) => v);

  return (
    <section id="about">
      <div className="container">
        <div className="rule" />
        <h2 className="section-title">About me</h2>
        <p className="section-sub">A little about me.</p>

        <div className="grid-2">
          <div className="card">
            <p style={{ margin: 0, color: "var(--muted)" }}>{profile.about}</p>
          </div>
          <div className="card">
            {facts.map(([k, v]) => (
              <div className="contact-item" key={k}>
                <div className="k">{k}</div>
                <div>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
