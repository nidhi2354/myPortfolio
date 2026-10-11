export default function Projects({ projects = [] }) {
  if (!projects.length) return null;

  return (
    <section id="projects">
      <div className="container">
        <div className="rule" />
        <h2 className="section-title">Projects</h2>
        <p className="section-sub">Real projects, built end to end.</p>

        <div className="grid-2">
          {projects.map((p) => (
            <article className="card card-hover project" key={p._id}>
              {p.kind && <span className="kind">{p.kind}</span>}
              <h3>{p.title}</h3>
              <p>{p.summary || p.description}</p>

              {p.techStack?.length > 0 && (
                <div className="tags">
                  {p.techStack.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="project-links">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer">
                    Live demo ↗
                  </a>
                )}
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noreferrer">
                    Source ↗
                  </a>
                )}
                {!p.liveUrl && !p.githubUrl && <span className="muted small">Links coming soon</span>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
