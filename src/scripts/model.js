import projects from '../../public/data/projects.json' with { type: 'json' };
const Model = {
  contactEmail: "fantocaa17@gmail.com",
  music: [
    { id: "auXYzfrmVbw", title: "Persona 5 Royal Relaxing Mix", source: "YouTube" },
    { id: "rto5hPN46io", title: "Persona 5 Relaxing Mix", source: "YouTube" },
  ],
  state: { screen: "home", menuIndex: 0, skillsBuilt: false },
  featured: [
    { title: "Course — E-Learning App", tag: "UI Design · Archive", color: "#ffe600", url: "https://fantoca.github.io/Fantoca-Portofolio.github.io/#project", cta: "View original work →", img: "/assets/projects/course.png", desc: "A mobile learning interface from my earlier design portfolio, focused on course discovery and a clear learning experience." },
    { title: "Fingerspot — Interface Redesign", tag: "Web Design · Archive", color: "#3dff6e", url: "https://fantoca.github.io/Fantoca-Portofolio.github.io/#project", cta: "View original work →", img: "/assets/projects/fingerspot.png", desc: "An attendance web application redesign, exploring clearer interfaces for employee attendance and time management." },
    { title: "Fantoca Dev — Digital Solution", tag: "Web Development · Archive", color: "#00add8", url: "https://fantoca-dev.vercel.app/", cta: "Visit website →", img: "/assets/projects/fantoca-dev.png", desc: "An earlier digital-services website combining visual design and web development." }
  ],
  skills: [
    { group: "Frontend & Web", items: [
      ["JavaScript · TypeScript", 88],
      ["React · Vue · Svelte · SolidJS", 84],
    ]},
    { group: "Backend & API", items: [
      ["PHP · Laravel", 88],
      ["Node.js · Express", 82],
      ["Bun · Elysia", 78],
      ["Go · Goravel", 76],
      ["REST · GraphQL API", 80],
    ]},
    { group: "Mobile Development", items: [
      ["Flutter", 74],
      ["NativePHP", 70],
    ]},
    { group: "Data & Infrastructure", items: [
      ["PostgreSQL · SQL", 82],
      ["Redis · RabbitMQ", 73],
      ["AWS S3 · Object Storage", 74],
      ["Docker · FrankenPHP · Laravel Octane", 74],
    ]},
    { group: "Design & Development Tools", items: [
      ["UI/UX · Figma", 83],
      ["Photoshop · Illustrator", 80],
      ["Motion graphics", 72],
      ["AI-assisted development · LLM workflows", 78],
      ["Git · GitHub · Composer", 86],
    ]},
    { group: "Languages", items: [
      ["Bahasa Indonesia · Native", 100],
      ["English · Working proficiency", 72],
    ]},
  ],
  async fetchCaseStudies() { return projects; }
};
export default Model;
