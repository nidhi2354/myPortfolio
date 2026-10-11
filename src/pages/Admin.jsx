import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, getToken, clearToken } from "../lib/api.js";
import CollectionManager from "../components/CollectionManager.jsx";
import Messages from "../components/Messages.jsx";

const SKILL_CATEGORIES = ["Language", "Frontend", "Backend", "Database", "Tools"];

const COLLECTIONS = {
  projects: {
    path: "/projects",
    titleOf: (p) => p.title,
    subtitleOf: (p) => [p.summary, p.techStack?.join(", ")].filter(Boolean).join(" — "),
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "summary", label: "Summary", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "techStack", label: "Tech stack (comma separated)", type: "list" },
      { key: "liveUrl", label: "Live URL", type: "text" },
      { key: "githubUrl", label: "GitHub URL", type: "text" },
      { key: "imageUrl", label: "Image URL", type: "text" },
      { key: "featured", label: "Featured", type: "checkbox" },
      { key: "order", label: "Order", type: "number" },
    ],
  },
  skills: {
    path: "/skills",
    titleOf: (s) => `${s.name} — ${s.level}%`,
    subtitleOf: (s) => s.category,
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "category", label: "Category", type: "select", options: SKILL_CATEGORIES },
      { key: "level", label: "Level (0-100)", type: "number" },
      { key: "order", label: "Order", type: "number" },
    ],
  },
  experience: {
    path: "/experience",
    titleOf: (e) => `${e.role} @ ${e.company}`,
    subtitleOf: (e) => [e.type, e.location].filter(Boolean).join(" · "),
    fields: [
      { key: "role", label: "Role", type: "text" },
      { key: "company", label: "Company", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "type", label: "Type", type: "text" },
      { key: "startDate", label: "Start date", type: "date" },
      { key: "endDate", label: "End date", type: "date" },
      { key: "current", label: "Currently working here", type: "checkbox" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "highlights", label: "Highlights (comma separated)", type: "list" },
      { key: "order", label: "Order", type: "number" },
    ],
  },
  education: {
    path: "/education",
    titleOf: (e) => [e.degree, e.branch].filter(Boolean).join(" · "),
    subtitleOf: (e) => `${e.institute} — ${e.endYear}`,
    fields: [
      { key: "degree", label: "Degree", type: "text" },
      { key: "branch", label: "Branch", type: "text" },
      { key: "institute", label: "Institute", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "startYear", label: "Start year", type: "number" },
      { key: "endYear", label: "End year", type: "number" },
      { key: "score", label: "Score", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "order", label: "Order", type: "number" },
    ],
  },
};

const TABS = [
  ["messages", "Messages"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["experience", "Experience"],
  ["education", "Education"],
];

export default function Admin() {
  const [admin, setAdmin] = useState(null);
  const [tab, setTab] = useState("messages");
  const [unread, setUnread] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) return navigate("/login");
    api("/auth/me", { auth: true })
      .then((res) => setAdmin(res.data))
      .catch(() => {
        clearToken();
        navigate("/login");
      });
  }, [navigate]);

  const logout = () => {
    clearToken();
    navigate("/login");
  };

  if (!admin)
    return (
      <div className="center">
        <div className="spinner" />
      </div>
    );

  const col = COLLECTIONS[tab];

  return (
    <div className="container" style={{ padding: "2.5rem 0" }}>
      <div className="admin-head">
        <div>
          <h1 style={{ margin: 0, fontSize: "1.6rem" }}>Admin dashboard</h1>
          <p className="muted small" style={{ margin: 0 }}>
            {admin.email}
          </p>
        </div>
        <div className="btn-row">
          <Link to="/" className="btn btn-ghost">
            Site dekho
          </Link>
          <button className="btn btn-ghost" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="tabs">
        {TABS.map(([key, label]) => (
          <button
            key={key}
            className={`tab ${tab === key ? "active" : ""}`}
            onClick={() => setTab(key)}
          >
            {label}
            {key === "messages" && unread > 0 && <span className="pill">{unread}</span>}
          </button>
        ))}
      </div>

      {tab === "messages" ? (
        <Messages onUnread={setUnread} />
      ) : (
        <CollectionManager
          key={tab}
          path={col.path}
          fields={col.fields}
          titleOf={col.titleOf}
          subtitleOf={col.subtitleOf}
        />
      )}
    </div>
  );
}
