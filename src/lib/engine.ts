/**
 * SkillPulse rule-based recommendation engine.
 * Fully local & deterministic — no external AI service is used.
 */
import { CAREERS, getCareer } from "@/data/careers";
import { coursesForSkill, type Course } from "@/data/courses";
import { isSoftSkill } from "@/data/skills";
import { JOBS, type Job } from "@/data/jobs";

export type Priority = "Critical" | "High" | "Medium" | "Low";

export interface GapRow {
  skill: string;
  current: number;
  required: number;
  gap: number;
  priority: Priority;
  courses: Course[];
}

/** Gap = max(0, required - current) — never negative. */
export function skillGap(current: number, required: number) {
  return Math.max(0, required - current);
}

export function priorityFor(gap: number): Priority {
  if (gap >= 40) return "Critical";
  if (gap >= 20) return "High";
  if (gap >= 10) return "Medium";
  return "Low";
}

const PRIORITY_ORDER: Record<Priority, number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Low: 3,
};

export function analyseGaps(
  skills: Record<string, number>,
  careerTitle: string,
): GapRow[] {
  const career = getCareer(careerTitle);
  return Object.entries(career.required)
    .map(([skill, required]) => {
      const current = skills[skill] ?? 0;
      const gap = skillGap(current, required);
      return {
        skill,
        current,
        required,
        gap,
        priority: priorityFor(gap),
        courses: coursesForSkill(skill),
      };
    })
    .sort(
      (a, b) =>
        PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority] || b.gap - a.gap,
    );
}

/** Coverage of a requirement set: mean of min(current/required, 1). */
export function coverage(
  skills: Record<string, number>,
  required: Record<string, number>,
) {
  const entries = Object.entries(required);
  if (!entries.length) return 0;
  const total = entries.reduce(
    (sum, [skill, req]) => sum + Math.min((skills[skill] ?? 0) / req, 1),
    0,
  );
  return Math.round((total / entries.length) * 100);
}

export interface JobMatch extends Job {
  match: number;
  matchedSkills: string[];
  missingSkills: string[];
}

/** Job match % = (matched skills / required skills) x 100, weighted by proficiency. */
export function matchJobs(skills: Record<string, number>): JobMatch[] {
  return JOBS.map((job) => {
    const required = Object.entries(job.required);
    const matchedSkills = required
      .filter(([skill, req]) => (skills[skill] ?? 0) >= req * 0.8)
      .map(([skill]) => skill);
    const missingSkills = required
      .filter(([skill, req]) => (skills[skill] ?? 0) < req * 0.8)
      .map(([skill]) => skill);
    return {
      ...job,
      match: coverage(skills, job.required),
      matchedSkills,
      missingSkills,
    };
  }).sort((a, b) => b.match - a.match);
}

export interface ReadinessBreakdown {
  score: number;
  technical: number;
  soft: number;
  assessment: number;
}

/**
 * Prototype/demo scoring model:
 * technical skills 70% + soft skills 20% + assessment score 10%.
 */
export function jobReadiness(
  skills: Record<string, number>,
  careerTitle: string,
  assessmentScore: number,
): ReadinessBreakdown {
  const career = getCareer(careerTitle);
  const technicalReq: Record<string, number> = {};
  const softReq: Record<string, number> = {};
  for (const [skill, req] of Object.entries(career.required)) {
    if (isSoftSkill(skill)) softReq[skill] = req;
    else technicalReq[skill] = req;
  }
  const technical = coverage(skills, technicalReq);
  const soft = Object.keys(softReq).length ? coverage(skills, softReq) : 70;
  const score = Math.round(technical * 0.7 + soft * 0.2 + assessmentScore * 0.1);
  return { score, technical, soft, assessment: assessmentScore };
}

export interface CareerRecommendation {
  id: string;
  title: string;
  summary: string;
  match: number;
  requiredSkills: string[];
  missingSkills: string[];
  learningFocus: string[];
  opportunities: string[];
  medianSalary: string;
  demandLabel: string;
}

export function recommendCareers(
  skills: Record<string, number>,
): CareerRecommendation[] {
  return CAREERS.map((career) => {
    const gaps = analyseGaps(skills, career.title);
    return {
      id: career.id,
      title: career.title,
      summary: career.summary,
      match: coverage(skills, career.required),
      requiredSkills: Object.keys(career.required),
      missingSkills: gaps.filter((g) => g.gap >= 20).map((g) => g.skill),
      learningFocus: gaps.filter((g) => g.gap > 0).slice(0, 3).map((g) => g.skill),
      opportunities: career.opportunities,
      medianSalary: career.medianSalary,
      demandLabel: career.demandLabel,
    };
  }).sort((a, b) => b.match - a.match);
}

export interface LearningWeek {
  id: string;
  week: number;
  skill: string;
  current: number;
  target: number;
  hours: number;
  priority: Priority;
  courses: Course[];
}

/** Builds a week-by-week roadmap from the prioritised gap list. */
export function buildLearningPath(
  skills: Record<string, number>,
  careerTitle: string,
): LearningWeek[] {
  const gaps = analyseGaps(skills, careerTitle).filter((g) => g.gap > 0);
  const ordered = gaps.length ? gaps : analyseGaps(skills, careerTitle).slice(0, 4);
  return ordered.slice(0, 6).map((g, index) => ({
    id: `week-${index + 1}-${g.skill}`,
    week: index + 1,
    skill: g.skill,
    current: g.current,
    target: g.required,
    hours: Math.max(6, Math.round(g.gap * 0.6) + 6),
    priority: g.priority,
    courses: g.courses,
  }));
}

export function recommendationText(
  skills: Record<string, number>,
  careerTitle: string,
): string[] {
  const gaps = analyseGaps(skills, careerTitle).filter((g) => g.gap > 0);
  if (!gaps.length) {
    return [
      `You already meet the simulated industry benchmark for every ${careerTitle} skill.`,
      "Focus on portfolio projects and interview preparation next.",
    ];
  }
  const [top, second, third] = gaps as [GapRow, GapRow?, GapRow?];
  const lines = [`Your highest priority skill is ${top.skill}.`];
  if (second) {
    const others = third ? `${second.skill} and ${third.skill}` : second.skill;
    lines.push(
      `Improving ${others} can significantly increase your ${careerTitle} job readiness.`,
    );
  }
  const critical = gaps.filter((g) => g.priority === "Critical");
  if (critical.length) {
    lines.push(
      `${critical.length} critical gap${critical.length > 1 ? "s" : ""} detected: ${critical
        .map((g) => `${g.skill} (${g.gap} pts)`)
        .join(", ")}.`,
    );
  }
  lines.push(
    `Closing your top ${Math.min(3, gaps.length)} gaps is projected to raise readiness by about ${Math.min(
      24,
      Math.round(gaps.slice(0, 3).reduce((s, g) => s + g.gap, 0) * 0.25),
    )} points in this demo model.`,
  );
  return lines;
}
