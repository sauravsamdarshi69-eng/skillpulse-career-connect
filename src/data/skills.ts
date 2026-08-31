// DEMO DATA — static skill catalogue used by the SkillPulse prototype.

export type SkillCategory = "Technical" | "Soft";

export interface SkillMeta {
  name: string;
  category: SkillCategory;
  group: "Technology" | "Data" | "Cloud" | "Security" | "AI" | "Professional";
}

export const SKILL_CATALOGUE: SkillMeta[] = [
  { name: "HTML/CSS", category: "Technical", group: "Technology" },
  { name: "JavaScript", category: "Technical", group: "Technology" },
  { name: "React", category: "Technical", group: "Technology" },
  { name: "Node.js", category: "Technical", group: "Technology" },
  { name: "REST APIs", category: "Technical", group: "Technology" },
  { name: "Git", category: "Technical", group: "Technology" },
  { name: "SQL", category: "Technical", group: "Data" },
  { name: "Python", category: "Technical", group: "Data" },
  { name: "Excel", category: "Technical", group: "Data" },
  { name: "Power BI", category: "Technical", group: "Data" },
  { name: "Cloud", category: "Technical", group: "Cloud" },
  { name: "Cybersecurity", category: "Technical", group: "Security" },
  { name: "AI/ML", category: "Technical", group: "AI" },
  { name: "Communication", category: "Soft", group: "Professional" },
];

export const SKILL_MAP: Record<string, SkillMeta> = Object.fromEntries(
  SKILL_CATALOGUE.map((s) => [s.name, s]),
);

export function isSoftSkill(name: string) {
  return SKILL_MAP[name]?.category === "Soft";
}

/** Skills covered by the interactive self-assessment. */
export const ASSESSMENT_SKILLS = [
  "JavaScript",
  "React",
  "Python",
  "SQL",
  "Git",
  "Communication",
] as const;

export const LEVEL_VALUES: Record<string, number> = {
  Beginner: 35,
  Intermediate: 60,
  Advanced: 85,
};

export function levelLabel(value: number) {
  if (value >= 80) return "Advanced";
  if (value >= 55) return "Intermediate";
  if (value > 0) return "Beginner";
  return "Not started";
}
