/** Both Experience and Education are rendered by this component. */
export default function Timeline({ id, title, subtitle, items = [] }) {
  if (!items.length) return null;

  return (
    <section id={id}>
      <div className="container">
        <div className="rule" />
        <h2 className="section-title">{title}</h2>
        <p className="section-sub">{subtitle}</p>

        <div className="timeline">
          {items.map((it) => (
            <div className="tl-item" key={it.key}>
              <div className="tl-when">{it.when}</div>
              <p className="tl-title">{it.title}</p>
              <div className="tl-sub">{it.sub}</div>
              {it.body && (
                <p className="muted small" style={{ margin: "0.5rem 0 0" }}>
                  {it.body}
                </p>
              )}
              {it.bullets?.length > 0 && (
                <ul>
                  {it.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
