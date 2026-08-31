// DEMO DATA — simulated industry demand signals. NOT live market data.

export type DemandFilter = "All" | "Technology" | "Data" | "Cloud" | "Security" | "AI";

export interface DemandSkill {
  skill: string;
  demand: number; // simulated demand index 0-100
  growth: number; // simulated YoY growth %
  category: Exclude<DemandFilter, "All">;
  openings: number;
}

export const DEMAND_SKILLS: DemandSkill[] = [
  { skill: "AI/ML", demand: 94, growth: 38, category: "AI", openings: 18400 },
  { skill: "Cloud", demand: 89, growth: 27, category: "Cloud", openings: 16200 },
  { skill: "React", demand: 86, growth: 19, category: "Technology", openings: 21500 },
  { skill: "Python", demand: 84, growth: 22, category: "Data", openings: 24800 },
  { skill: "Data Analytics", demand: 80, growth: 24, category: "Data", openings: 15100 },
  { skill: "Cybersecurity", demand: 78, growth: 31, category: "Security", openings: 12700 },
  { skill: "SQL", demand: 74, growth: 9, category: "Data", openings: 19800 },
];

export const DEMAND_TREND: Array<Record<string, number | string>> = [
  { month: "Jan", "AI/ML": 62, React: 71, Cloud: 68, Python: 70, Cybersecurity: 55 },
  { month: "Mar", "AI/ML": 70, React: 74, Cloud: 72, Python: 73, Cybersecurity: 60 },
  { month: "May", "AI/ML": 77, React: 78, Cloud: 77, Python: 76, Cybersecurity: 66 },
  { month: "Jul", "AI/ML": 84, React: 81, Cloud: 82, Python: 79, Cybersecurity: 71 },
  { month: "Sep", "AI/ML": 89, React: 84, Cloud: 86, Python: 82, Cybersecurity: 75 },
  { month: "Nov", "AI/ML": 94, React: 86, Cloud: 89, Python: 84, Cybersecurity: 78 },
];

export interface EmergingSkill {
  name: string;
  category: Exclude<DemandFilter, "All">;
  growth: number;
  note: string;
}

export const EMERGING_SKILLS: EmergingSkill[] = [
  { name: "Generative AI", category: "AI", growth: 46, note: "Prompt design, RAG pipelines, model evaluation." },
  { name: "Cloud Computing", category: "Cloud", growth: 27, note: "Containers, IaC and cost-aware architecture." },
  { name: "Data Engineering", category: "Data", growth: 25, note: "Pipelines, warehousing and orchestration." },
  { name: "Cybersecurity", category: "Security", growth: 31, note: "Secure SDLC and threat modelling." },
  { name: "AI Agents", category: "AI", growth: 52, note: "Tool-using assistants and workflow automation." },
];

/** Demo industry-vs-curriculum coverage used in the institution dashboard. */
export const INDUSTRY_VS_CURRICULUM = [
  { skill: "AI/ML", industry: 94, curriculum: 41 },
  { skill: "Cloud", industry: 89, curriculum: 46 },
  { skill: "React", industry: 86, curriculum: 68 },
  { skill: "Python", industry: 84, curriculum: 72 },
  { skill: "Cybersecurity", industry: 78, curriculum: 38 },
  { skill: "SQL", industry: 74, curriculum: 66 },
];
