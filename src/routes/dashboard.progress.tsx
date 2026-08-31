import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CHART_COLORS,
  ChartFrame,
  DemoDataNote,
  MeterBar,
  SectionHeading,
  StatCard,
} from "@/components/skillpulse/primitives";
import { useStore } from "@/lib/store";
import { buildLearningPath, coverage, jobReadiness } from "@/lib/engine";
import { getCareer } from "@/data/careers";

export const Route = createFileRoute("/dashboard/progress")({
  head: () => ({
    meta: [
      { title: "Progress Tracking — SkillPulse" },
      {
        name: "description",
        content:
          "Track readiness growth, completed learning modules and skill coverage over a simulated six-month timeline.",
      },
      { property: "og:title", content: "Progress Tracking — SkillPulse" },
      {
        property: "og:description",
        content: "Readiness growth and module completion over time.",
      },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const { student } = useStore();
  const readiness = jobReadiness(student.skills, student.careerGoal, student.assessmentScore);
  const match = coverage(student.skills, getCareer(student.careerGoal).required);
  const weeks = buildLearningPath(student.skills, student.careerGoal);
  const done = weeks.filter((w) => student.completedModules.includes(w.id)).length;

  const history = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"].map((month, i) => ({
    month,
    Readiness: Math.max(20, readiness.score - (5 - i) * 6),
    Coverage: Math.max(18, match - (5 - i) * 5),
  }));

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Progress Tracking"
        description="How your readiness and skill coverage have improved over time."
      />
      <DemoDataNote>
        Historical points are back-projected from your current scores for demo purposes.
      </DemoDataNote>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Job readiness" value={`${readiness.score}%`} />
        <StatCard label="Skill coverage" value={`${match}%`} />
        <StatCard label="Modules completed" value={`${done}/${weeks.length}`} />
        <StatCard label="Assessment score" value={`${student.assessmentScore}/100`} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Readiness over time</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartFrame height={300}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history} margin={{ left: -18, right: 8 }}>
                <CartesianGrid stroke={CHART_COLORS.grid} vertical={false} />
                <XAxis dataKey="month" tick={{ fill: CHART_COLORS.axis, fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fill: CHART_COLORS.axis, fontSize: 11 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Readiness"
                  stroke={CHART_COLORS.current}
                  fill={CHART_COLORS.current}
                  fillOpacity={0.18}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="Coverage"
                  stroke={CHART_COLORS.required}
                  fill={CHART_COLORS.required}
                  fillOpacity={0.12}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartFrame>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Module completion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {weeks.map((w) => {
            const complete = student.completedModules.includes(w.id);
            return (
              <div key={w.id}>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">
                    Week {w.week} · {w.skill}
                  </span>
                  <span className="text-muted-foreground">
                    {complete ? "Completed" : "Pending"}
                  </span>
                </div>
                <MeterBar
                  value={complete ? 100 : Math.round((w.current / w.target) * 100)}
                  tone={complete ? "success" : "brand"}
                  className="mt-1.5"
                />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
