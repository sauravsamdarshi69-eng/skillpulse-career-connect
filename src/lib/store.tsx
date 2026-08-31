import * as React from "react";

export interface StudentProfile {
  name: string;
  email: string;
  education: string;
  branch: string;
  year: string;
  careerGoal: string;
  resume: string;
  skills: Record<string, number>;
  assessmentScore: number;
  assessmentCompletedAt: string | null;
  completedModules: string[];
  learningPathGenerated: boolean;
}

export const DEMO_STUDENT: StudentProfile = {
  name: "Rahul Kumar",
  email: "demo@skillpulse.com",
  education: "B.Tech (2023 – 2027)",
  branch: "Computer Science & Engineering",
  year: "3rd Year",
  careerGoal: "Full Stack Developer",
  resume: "rahul-kumar-resume.pdf",
  skills: {
    "HTML/CSS": 80,
    JavaScript: 70,
    React: 65,
    Python: 60,
    SQL: 50,
    Git: 60,
    "Node.js": 35,
    "REST APIs": 40,
    Excel: 55,
    Communication: 75,
  },
  assessmentScore: 70,
  assessmentCompletedAt: null,
  completedModules: [],
  learningPathGenerated: false,
};

const STORAGE_KEY = "skillpulse.state.v1";

interface AppState {
  authed: boolean;
  role: "student" | "admin";
  student: StudentProfile;
}

const DEFAULT_STATE: AppState = {
  authed: false,
  role: "student",
  student: DEMO_STUDENT,
};

interface StoreValue extends AppState {
  hydrated: boolean;
  login: (email: string) => void;
  logout: () => void;
  updateStudent: (patch: Partial<StudentProfile>) => void;
  setSkills: (skills: Record<string, number>) => void;
  toggleModule: (id: string) => void;
  reset: () => void;
}

const StoreContext = React.createContext<StoreValue | null>(null);

function read(): AppState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AppState;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      student: { ...DEMO_STUDENT, ...parsed.student },
    };
  } catch {
    return null;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AppState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const stored = read();
    if (stored) setState(stored);
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const value = React.useMemo<StoreValue>(
    () => ({
      ...state,
      hydrated,
      login: (email: string) =>
        setState((s) => ({
          ...s,
          authed: true,
          student: { ...s.student, email: email || s.student.email },
        })),
      logout: () => setState((s) => ({ ...s, authed: false })),
      updateStudent: (patch) =>
        setState((s) => ({ ...s, student: { ...s.student, ...patch } })),
      setSkills: (skills) =>
        setState((s) => ({
          ...s,
          student: { ...s.student, skills: { ...s.student.skills, ...skills } },
        })),
      toggleModule: (id) =>
        setState((s) => {
          const done = s.student.completedModules.includes(id);
          return {
            ...s,
            student: {
              ...s.student,
              completedModules: done
                ? s.student.completedModules.filter((m) => m !== id)
                : [...s.student.completedModules, id],
            },
          };
        }),
      reset: () => setState({ ...DEFAULT_STATE, student: DEMO_STUDENT }),
    }),
    [state, hydrated],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = React.useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
