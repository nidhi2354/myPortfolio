const ORDER = ["Language", "Frontend", "Backend", "Database", "Tools"];
const LABELS = { Tools: "Tools & deployment" };

export default function Skills({ skills = [] }) {
  if (!skills.length) return null;

  const byCat = skills.reduce((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});

  const cats = ORDER.filter((c) => byCat[c]);

  return (
    <section id="skills">
      <div className="container">
        <div className="rule" />
        <h2 className="section-title">Tech stack</h2>
        <p className="section-sub">The tools I use to build and ship your project.</p>

        <div className="grid-3">
          {cats.map((cat) => (
            <div className="card" key={cat}>
              <div className="skill-cat">{LABELS[cat] || cat}</div>
              <div className="tags">
                {byCat[cat].map((s) => (
                  <span className="tag" key={s._id}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
