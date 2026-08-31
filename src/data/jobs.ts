// DEMO DATA — simulated job openings (no live job board integration).

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Internship";
  experience: string;
  salary: string;
  category: "Technology" | "Data";
  description: string;
  /** Required proficiency per skill (simulated employer benchmark). */
  required: Record<string, number>;
}

export const JOBS: Job[] = [
  {
    id: "job-frontend",
    title: "Frontend Developer",
    company: "Nimbus Technologies",
    location: "Bengaluru (Hybrid)",
    type: "Full-time",
    experience: "0-2 years",
    salary: "₹6 – 9 LPA",
    category: "Technology",
    description:
      "Build responsive product interfaces with React and a shared design system.",
    required: { "HTML/CSS": 80, JavaScript: 85, React: 85, Git: 70 },
  },
  {
    id: "job-software",
    title: "Software Developer",
    company: "Vertex Systems",
    location: "Pune (On-site)",
    type: "Full-time",
    experience: "0-2 years",
    salary: "₹7 – 10 LPA",
    category: "Technology",
    description:
      "Work across services and internal tooling in a JavaScript + SQL stack.",
    required: { React: 75, JavaScript: 75, SQL: 75, Git: 75 },
  },
  {
    id: "job-fullstack",
    title: "Full Stack Developer",
    company: "Orbit Labs",
    location: "Remote (India)",
    type: "Full-time",
    experience: "1-3 years",
    salary: "₹8 – 13 LPA",
    category: "Technology",
    description:
      "Own features end-to-end: React frontend, Node.js APIs and relational data models.",
    required: {
      React: 85,
      "Node.js": 75,
      SQL: 80,
      Git: 80,
      "REST APIs": 75,
      JavaScript: 85,
    },
  },
  {
    id: "job-analyst",
    title: "Data Analyst",
    company: "InsightGrid Analytics",
    location: "Hyderabad (Hybrid)",
    type: "Full-time",
    experience: "0-2 years",
    salary: "₹5 – 8 LPA",
    category: "Data",
    description:
      "Build reporting pipelines and dashboards for operations and growth teams.",
    required: { Python: 80, SQL: 85, Excel: 70, "Power BI": 70 },
  },
  {
    id: "job-intern-react",
    title: "React Developer Intern",
    company: "Skyward Digital",
    location: "Remote (India)",
    type: "Internship",
    experience: "Fresher",
    salary: "₹25,000 / month",
    category: "Technology",
    description: "Six-month internship focused on component development and testing.",
    required: { "HTML/CSS": 70, JavaScript: 70, React: 70, Git: 60 },
  },
  {
    id: "job-cloud",
    title: "Junior Cloud Engineer",
    company: "Stratus Cloud Services",
    location: "Noida (On-site)",
    type: "Full-time",
    experience: "0-2 years",
    salary: "₹6 – 10 LPA",
    category: "Technology",
    description: "Support deployments, CI/CD pipelines and cloud infrastructure.",
    required: { Cloud: 75, Python: 65, Git: 75, SQL: 60 },
  },
];
