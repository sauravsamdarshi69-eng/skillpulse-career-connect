// DEMO DATA — simulated institution cohort for the admin dashboard.

export interface StudentRow {
  id: string;
  name: string;
  course: string;
  year: string;
  readiness: number;
  criticalGaps: number;
  topGap: string;
}

export function statusFor(readiness: number): "Industry Ready" | "On Track" | "At Risk" {
  if (readiness >= 75) return "Industry Ready";
  if (readiness >= 60) return "On Track";
  return "At Risk";
}

export const STUDENTS: StudentRow[] = [
  { id: "s1", name: "Rahul Kumar", course: "B.Tech CSE", year: "3rd Year", readiness: 68, criticalGaps: 2, topGap: "Node.js" },
  { id: "s2", name: "Ananya Sharma", course: "B.Tech CSE", year: "4th Year", readiness: 84, criticalGaps: 0, topGap: "Cloud" },
  { id: "s3", name: "Vikram Iyer", course: "B.Tech IT", year: "3rd Year", readiness: 57, criticalGaps: 3, topGap: "SQL" },
  { id: "s4", name: "Priya Nair", course: "B.Tech ECE", year: "4th Year", readiness: 62, criticalGaps: 2, topGap: "Python" },
  { id: "s5", name: "Mohit Verma", course: "BCA", year: "2nd Year", readiness: 48, criticalGaps: 4, topGap: "React" },
  { id: "s6", name: "Sneha Patil", course: "B.Tech CSE", year: "4th Year", readiness: 79, criticalGaps: 1, topGap: "AI/ML" },
  { id: "s7", name: "Arjun Reddy", course: "B.Tech IT", year: "2nd Year", readiness: 54, criticalGaps: 3, topGap: "Cloud" },
  { id: "s8", name: "Fatima Khan", course: "MCA", year: "1st Year", readiness: 71, criticalGaps: 1, topGap: "REST APIs" },
  { id: "s9", name: "Karan Mehta", course: "B.Tech ECE", year: "3rd Year", readiness: 45, criticalGaps: 5, topGap: "Communication" },
  { id: "s10", name: "Divya Raj", course: "MCA", year: "2nd Year", readiness: 88, criticalGaps: 0, topGap: "Cybersecurity" },
  { id: "s11", name: "Aditya Ghosh", course: "BCA", year: "3rd Year", readiness: 66, criticalGaps: 2, topGap: "SQL" },
  { id: "s12", name: "Meera Joshi", course: "B.Tech CSE", year: "2nd Year", readiness: 61, criticalGaps: 2, topGap: "Node.js" },
];

export const INSTITUTION_KPIS = {
  totalStudents: 1250,
  averageReadiness: 67,
  criticalGaps: 342,
  industryAligned: 58,
};

/** Rows = departments/courses, columns = skills. Values = demo coverage %. */
export const HEATMAP_SKILLS = ["React", "Python", "SQL", "Cloud", "AI/ML", "Communication"] as const;

export const HEATMAP_ROWS: Array<{ course: string; values: number[] }> = [
  { course: "B.Tech CSE", values: [72, 78, 68, 44, 38, 66] },
  { course: "B.Tech IT", values: [64, 70, 62, 40, 30, 58] },
  { course: "B.Tech ECE", values: [42, 55, 48, 28, 22, 61] },
  { course: "BCA", values: [58, 60, 66, 24, 18, 54] },
  { course: "MCA", values: [70, 74, 76, 46, 42, 63] },
  { course: "B.Sc CS", values: [48, 62, 58, 20, 16, 52] },
];

export const READINESS_DISTRIBUTION = [
  { band: "0-40%", students: 118 },
  { band: "41-55%", students: 246 },
  { band: "56-70%", students: 402 },
  { band: "71-85%", students: 358 },
  { band: "86-100%", students: 126 },
];

export const GAP_DISTRIBUTION = [
  { name: "Critical", value: 342 },
  { name: "High", value: 418 },
  { name: "Medium", value: 296 },
  { name: "Low", value: 194 },
];
