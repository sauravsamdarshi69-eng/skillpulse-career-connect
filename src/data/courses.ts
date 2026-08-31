// DEMO DATA — curated learning resources mapped to skills.

export interface Course {
  id: string;
  skill: string;
  title: string;
  provider: string;
  hours: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  format: "Course" | "Project" | "Docs";
  /** Demo effectiveness rating used in the institution dashboard. */
  effectiveness: number;
}

export const COURSES: Course[] = [
  { id: "c-js-1", skill: "JavaScript", title: "Advanced JavaScript: Async, Closures & ES2023", provider: "OpenLearn", hours: 18, level: "Advanced", format: "Course", effectiveness: 82 },
  { id: "c-js-2", skill: "JavaScript", title: "30 JavaScript Katas (hands-on)", provider: "CodeForge", hours: 10, level: "Intermediate", format: "Project", effectiveness: 76 },
  { id: "c-react-1", skill: "React", title: "React 19 Patterns & State Management", provider: "FrontendMasters (demo)", hours: 22, level: "Advanced", format: "Course", effectiveness: 88 },
  { id: "c-react-2", skill: "React", title: "Build a Dashboard with React + Recharts", provider: "ProjectHub", hours: 14, level: "Intermediate", format: "Project", effectiveness: 84 },
  { id: "c-node-1", skill: "Node.js", title: "Node.js & Express Fundamentals", provider: "OpenLearn", hours: 20, level: "Beginner", format: "Course", effectiveness: 80 },
  { id: "c-node-2", skill: "Node.js", title: "Auth + File Uploads API Project", provider: "ProjectHub", hours: 16, level: "Intermediate", format: "Project", effectiveness: 79 },
  { id: "c-sql-1", skill: "SQL", title: "SQL Joins, Windows & Query Tuning", provider: "DataCamp (demo)", hours: 15, level: "Intermediate", format: "Course", effectiveness: 86 },
  { id: "c-sql-2", skill: "SQL", title: "Schema Design Case Studies", provider: "CodeForge", hours: 9, level: "Advanced", format: "Docs", effectiveness: 72 },
  { id: "c-rest-1", skill: "REST APIs", title: "Designing REST APIs that Scale", provider: "OpenLearn", hours: 12, level: "Intermediate", format: "Course", effectiveness: 78 },
  { id: "c-rest-2", skill: "REST APIs", title: "Postman & API Testing Lab", provider: "ProjectHub", hours: 6, level: "Beginner", format: "Project", effectiveness: 70 },
  { id: "c-git-1", skill: "Git", title: "Git Workflows, Rebase & Code Review", provider: "CodeForge", hours: 8, level: "Intermediate", format: "Course", effectiveness: 74 },
  { id: "c-git-2", skill: "Git", title: "CI/CD & Deployment Basics", provider: "Stratus Academy", hours: 10, level: "Intermediate", format: "Course", effectiveness: 81 },
  { id: "c-html-1", skill: "HTML/CSS", title: "Responsive Layouts with Flexbox & Grid", provider: "OpenLearn", hours: 12, level: "Beginner", format: "Course", effectiveness: 77 },
  { id: "c-py-1", skill: "Python", title: "Python for Data Handling", provider: "DataCamp (demo)", hours: 20, level: "Intermediate", format: "Course", effectiveness: 83 },
  { id: "c-excel-1", skill: "Excel", title: "Excel Analytics: Pivots & Power Query", provider: "OpenLearn", hours: 10, level: "Beginner", format: "Course", effectiveness: 68 },
  { id: "c-pbi-1", skill: "Power BI", title: "Power BI Dashboards End-to-End", provider: "DataCamp (demo)", hours: 14, level: "Beginner", format: "Course", effectiveness: 75 },
  { id: "c-cloud-1", skill: "Cloud", title: "Cloud Fundamentals & Containers", provider: "Stratus Academy", hours: 24, level: "Beginner", format: "Course", effectiveness: 85 },
  { id: "c-ai-1", skill: "AI/ML", title: "Applied Machine Learning Foundations", provider: "OpenLearn", hours: 30, level: "Intermediate", format: "Course", effectiveness: 87 },
  { id: "c-sec-1", skill: "Cybersecurity", title: "Secure Coding & OWASP Top 10", provider: "CodeForge", hours: 16, level: "Intermediate", format: "Course", effectiveness: 80 },
  { id: "c-comm-1", skill: "Communication", title: "Technical Communication & Interviews", provider: "SkillPulse Academy", hours: 8, level: "Intermediate", format: "Course", effectiveness: 73 },
];

export function coursesForSkill(skill: string) {
  const matches = COURSES.filter((c) => c.skill === skill);
  return matches.length ? matches : COURSES.slice(0, 2);
}
