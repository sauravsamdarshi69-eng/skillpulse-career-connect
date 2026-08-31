// DEMO DATA — simulated industry skill requirements per career track.

export interface Career {
  id: string;
  title: string;
  summary: string;
  /** Industry-required proficiency (0-100) per skill. Simulated benchmark. */
  required: Record<string, number>;
  opportunities: string[];
  medianSalary: string;
  demandLabel: "Very High" | "High" | "Moderate";
}

export const CAREERS: Career[] = [
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    summary:
      "Builds both client and server side of web products, owning APIs, databases and UI.",
    required: {
      "HTML/CSS": 80,
      JavaScript: 85,
      React: 85,
      "Node.js": 75,
      SQL: 80,
      Git: 80,
      "REST APIs": 75,
      Communication: 70,
    },
    opportunities: ["Product Engineer", "MERN Developer", "Platform Engineer"],
    medianSalary: "₹7.5 – 12 LPA",
    demandLabel: "Very High",
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    summary:
      "Focuses on interface engineering, design systems, accessibility and performance.",
    required: {
      "HTML/CSS": 80,
      JavaScript: 85,
      React: 85,
      Git: 70,
      Communication: 70,
    },
    opportunities: ["UI Engineer", "React Developer", "Design Systems Engineer"],
    medianSalary: "₹6 – 11 LPA",
    demandLabel: "High",
  },
  {
    id: "software-developer",
    title: "Software Developer",
    summary:
      "General-purpose application development across services, tooling and integrations.",
    required: {
      JavaScript: 75,
      React: 75,
      SQL: 75,
      Git: 75,
      Python: 60,
      Communication: 70,
    },
    opportunities: ["Backend Developer", "Application Engineer", "SDE-1"],
    medianSalary: "₹6.5 – 12 LPA",
    demandLabel: "Very High",
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    summary: "Turns raw operational data into dashboards and decision support.",
    required: {
      Python: 80,
      SQL: 85,
      Excel: 70,
      "Power BI": 70,
      Communication: 70,
    },
    opportunities: ["Business Analyst", "BI Analyst", "Reporting Analyst"],
    medianSalary: "₹5 – 9 LPA",
    demandLabel: "High",
  },
];

export const CAREER_MAP: Record<string, Career> = Object.fromEntries(
  CAREERS.map((c) => [c.title, c]),
);

export function getCareer(title: string): Career {
  return CAREER_MAP[title] ?? CAREERS[0];
}
