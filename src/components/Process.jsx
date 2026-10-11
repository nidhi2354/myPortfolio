export default function Process({ steps = [] }) {
  if (!steps.length) return null;

  return (
    <section id="process">
      <div className="container">
        <div className="rule" />
        <h2 className="section-title">How we'll work together</h2>
        <p className="section-sub">A simple, transparent process so you always know what happens next.</p>

        <div className="steps">
          {steps.map((s, i) => (
            <div className="card step" key={s._id}>
              <div className="step-num">{String(i + 1).padStart(2, "0")}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
