export default function Services({ services = [] }) {
  if (!services.length) return null;

  return (
    <section id="services">
      <div className="container">
        <div className="rule" />
        <h2 className="section-title">What I can build for you</h2>
        <p className="section-sub">End-to-end web development, from the first screen to the live server.</p>

        <div className="grid-2">
          {services.map((s) => (
            <div className="card card-hover service" key={s._id}>
              <div className="service-icon" aria-hidden="true">
                {s.icon}
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
