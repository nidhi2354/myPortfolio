/**
 * All portfolio content lives here — no backend or database needed.
 * To change anything, just edit this file.
 */

// Give every item a stable `_id` (used as the React key).
const withIds = (prefix, list) => list.map((item, i) => ({ _id: `${prefix}-${i}`, ...item }));

export const profile = {
  name: "Nidhi Singh",
  title: "Freelance Full Stack Developer",
  headline: "I build fast, secure web apps for businesses — from first idea to live deployment.",
  tagline:
    "React, Node.js and MongoDB. I handle design-to-deploy: store and booking platforms, admin " +
    "dashboards, payments (Razorpay) and hosting, so you deal with one developer, not five.",
  about:
    "I'm a Full Stack Developer based in Delhi, currently at Reef Technologies, and I take on " +
    "freelance projects alongside. I build the whole thing: React frontends, Node.js and Express APIs, " +
    "MongoDB databases, JWT authentication and Razorpay payments — and I also deploy it (cPanel, " +
    "MongoDB Atlas, SSL, subdomains, automated backups). My last client project, Zivonix Store, went " +
    "from idea to a live store with admin panel, payments and order tracking.",
  email: "nidhi4upooja@gmail.com",
  phone: "+91 7571973708",
  whatsapp: "917571973708",
  location: "Dwarka Mor, Delhi (working with clients across India and remotely)",
  avatarUrl: "",
  resumeUrl: "",
  availableForWork: true,
  availability: "Open for freelance projects",
  socials: [
    { label: "GitHub", url: "https://github.com/nidhi2354", icon: "github" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/nidhisingh-0144b0248", icon: "linkedin" },
    { label: "Instagram", url: "https://www.instagram.com/coderqueen.dev", icon: "instagram" },
    { label: "Facebook", url: "https://www.facebook.com/coderqueen08", icon: "facebook" },
  ],
  stats: [
    { label: "Projects shipped", value: "3+" },
    { label: "Stack", value: "MERN" },
    { label: "Delivery", value: "Design to deploy" },
  ],
};

export const services = withIds("service", [
  {
    icon: "🛒",
    title: "E-commerce stores",
    text: "Product catalogue, search and filters, cart, checkout with Razorpay or Cash on Delivery, order tracking and an admin panel to run the shop.",
  },
  {
    icon: "🧩",
    title: "Custom web apps",
    text: "Booking platforms, dashboards, CRMs and internal tools — React frontend with a Node.js and MongoDB backend built around your workflow.",
  },
  {
    icon: "🔌",
    title: "REST APIs & backend",
    text: "Clean, documented APIs with JWT authentication, role-based access, validation, rate limiting and security best practices.",
  },
  {
    icon: "🚀",
    title: "Deployment & hosting",
    text: "Live on your own domain: cPanel or server setup, MongoDB Atlas, SSL, subdomains, and automated database backups.",
  },
]);

export const process = withIds("step", [
  { title: "Discuss", text: "You share the idea and goals. I ask the right questions and tell you honestly what's needed." },
  { title: "Plan & quote", text: "A clear scope, timeline and fixed price before any work starts — no surprises." },
  { title: "Build", text: "I build in milestones and show you progress along the way, so you can give feedback early." },
  { title: "Launch & support", text: "I deploy it live, hand over everything, and stay available for fixes after launch." },
]);

export const projectTypes = [
  "E-commerce store",
  "Booking / service platform",
  "Admin dashboard / CRM",
  "REST API / backend",
  "Deployment / hosting help",
  "Something else",
];

export const budgets = ["Under ₹25,000", "₹25,000 – ₹75,000", "₹75,000 – ₹1,50,000", "₹1,50,000+", "Not sure yet"];

export const education = withIds("edu", [
  {
    degree: "B.Tech",
    branch: "Computer Science and Engineering",
    institute: "Azad Institute of Engineering & Technology (AKTU)",
    location: "Lucknow, Uttar Pradesh",
    startYear: 2023,
    endYear: 2026,
    score: "",
    description: "Lateral entry — DSA, DBMS, Operating Systems and Web Technologies.",
  },
  {
    degree: "Diploma",
    branch: "Information Technology",
    institute: "Girls Govt. Polytechnic",
    location: "Lucknow, Uttar Pradesh",
    startYear: 2020,
    endYear: 2023,
    score: "",
    description: "Where I built my foundation in programming, databases and web development.",
  },
  {
    degree: "High School (UP Board)",
    branch: "",
    institute: "Maharshi Arvind Vidya Mandir",
    location: "Kushinagar, Uttar Pradesh",
    endYear: 2020,
    score: "",
    description: "",
  },
]);

export const skills = withIds("skill", [
  { name: "JavaScript (ES6+)", category: "Language" },
  { name: "React", category: "Frontend" },
  { name: "Vite", category: "Frontend" },
  { name: "HTML5", category: "Frontend" },
  { name: "CSS3", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "JWT Authentication", category: "Backend" },
  { name: "Razorpay Integration", category: "Backend" },
  { name: "MVC & Middleware", category: "Backend" },
  { name: "API Security", category: "Backend" },
  { name: "MongoDB", category: "Database" },
  { name: "Mongoose", category: "Database" },
  { name: "MongoDB Atlas", category: "Database" },
  { name: "cPanel Hosting & Deployment", category: "Tools" },
  { name: "SSH, DNS & SSL Setup", category: "Tools" },
  { name: "DB Backup & Restore", category: "Tools" },
  { name: "Git & GitHub", category: "Tools" },
  { name: "Postman", category: "Tools" },
  { name: "VS Code", category: "Tools" },
]);

export const projects = withIds("project", [
  {
    title: "Zivonix Store — Clay & Craft Pottery",
    kind: "Client project",
    summary: "Full-stack e-commerce store for a real client — handmade pottery, Razorpay and an admin panel.",
    description:
      "Multi-category store with search, filters, per-user cart and wishlist, checkout with saved " +
      "addresses, and order tracking and cancellation. Admin panel with a sales dashboard, product " +
      "management, order status updates and customer messages. Secured with JWT httpOnly cookies, " +
      "role-based access, password-reset emails, Helmet, CORS and rate limiting. Razorpay and Cash on " +
      "Delivery, server-side order pricing and a pincode-based delivery check. API deployed on cPanel " +
      "with MongoDB Atlas, SSL, subdomain setup and automated database backups.",
    techStack: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Razorpay"],
    githubUrl: "https://github.com/nidhi2354/zivonix-store",
    liveUrl: "",
    featured: true,
  },
  {
    title: "Laundry Service Website",
    kind: "Booking platform",
    summary: "Dynamic laundry service platform with online booking, order tracking and an admin dashboard.",
    description:
      "Users book a service and track their orders. An admin dashboard manages services, blogs, " +
      "orders and users, backed by CRUD APIs for dynamic content. Built on JWT authentication, " +
      "MongoDB and an MVC architecture for a secure, scalable backend.",
    techStack: ["Node.js", "Express", "MongoDB", "JWT"],
    githubUrl: "https://github.com/nidhi2354/loundry",
    liveUrl: "",
    featured: true,
  },
  {
    title: "Portfolio Website",
    kind: "Personal project",
    summary: "This very website — a static portfolio built with React and Vite.",
    description: "A responsive portfolio with hero, skills, projects, experience and education sections.",
    techStack: ["React", "Vite"],
    githubUrl: "",
    liveUrl: "",
    featured: false,
  },
]);

export const experience = withIds("exp", [
  {
    role: "Full Stack Developer",
    company: "Reef Technologies",
    location: "",
    type: "Full-time",
    // TODO: add the real joining date (the resume only says "Present")
    startDate: "2025-01-01",
    current: true,
    description: "",
    highlights: [
      "Building and maintaining full-stack web applications using React on the frontend and Node.js, Express.js and MongoDB on the backend.",
      "Developing REST APIs with JWT authentication and working on server-side setup and deployment of applications.",
    ],
  },
  {
    role: "Backend Developer Intern",
    company: "Softix Solution",
    location: "Lucknow, Uttar Pradesh",
    type: "Internship",
    // TODO: add the real months
    startDate: "2024-06-01",
    endDate: "2024-09-01",
    current: false,
    description: "",
    highlights: [
      "Developed RESTful APIs for user authentication and data management using Node.js and Express.js.",
      "Integrated MongoDB with Mongoose; implemented JWT-based authentication and API security.",
      "Collaborated with team members on live project development.",
    ],
  },
]);
