import { useEffect, useState } from "react";
import useScrollReveal from "../lib/useScrollReveal.js";
import { profile, education, skills, projects, experience, services, process } from "../data/portfolio.js";

import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Services from "../components/Services.jsx";
import Process from "../components/Process.jsx";
import Skills from "../components/Skills.jsx";
import Projects from "../components/Projects.jsx";
import Timeline from "../components/Timeline.jsx";
import Contact from "../components/Contact.jsx";

const NAV = [
  ["Services", "#services"],
  ["Projects", "#projects"],
  ["Process", "#process"],
  ["Skills", "#skills"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

export default function Home() {
  useScrollReveal();

  // Thin progress bar at the top that fills as you scroll.
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />
      <header className="nav">
        <div className="container nav-inner">
          <a href="#" className="brand">
            {profile?.name?.split(" ")[0] || "Portfolio"}<span>.</span>
          </a>
          <nav className="nav-links">
            {NAV.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <Hero profile={profile} />
        <Services services={services} />
        <Projects projects={projects} />
        <Process steps={process} />
        <Skills skills={skills} />
        <About profile={profile} />
        <Timeline
          id="experience"
          title="Experience"
          subtitle="Where I have been building and shipping real products."
          items={experience.map((e) => ({
            key: e._id,
            when: `${fmt(e.startDate)} — ${e.current ? "Present" : fmt(e.endDate)}`,
            title: e.role,
            sub: [e.company, e.location, e.type].filter(Boolean).join(" · "),
            body: e.description,
            bullets: e.highlights,
          }))}
        />
        <Timeline
          id="education"
          title="Education"
          subtitle="Academic background."
          items={education.map((e) => ({
            key: e._id,
            when: `${e.startYear ? `${e.startYear} — ` : ""}${e.endYear}`,
            title: [e.degree, e.branch].filter(Boolean).join(" · "),
            sub: [e.institute, e.location, e.score].filter(Boolean).join(" · "),
            body: e.description,
          }))}
        />
        <Contact profile={profile} />
      </main>

      <footer className="container">
        <span>
          © {new Date().getFullYear()} {profile?.name}. Built with React.
        </span>
      </footer>
    </>
  );
}

const fmt = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "—";
