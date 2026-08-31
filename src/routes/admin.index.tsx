import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, ArrowRight, Gauge, Target, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CHART_COLORS,
  ChartFrame,
  DemoDataNote,
  SectionHeading,
  StatCard,
} from "@/components/skillpulse/primitives";
import { COURSES } from "@/data/courses";
import { DEMAND_SKILLS, INDUSTRY_VS_CURRICULUM } from "@/data/industryDemand";
import {
  GAP_DISTRIBUTION,
  INSTITUTION_KPIS,
  READINESS_DISTRIBUTION,
} from "@/data/students";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Institution Overview — SkillPulse" },
      {
        name: "description",
        content:
          "Institution console: cohort job readiness, critical skill gaps, industry demand alignment and course effectiveness.",
      },
      { property: "og:title", content: "Institution Overview — SkillPulse" },
      {
        property: "og:description",
        content:
          "Track cohort readiness, skill gaps and industry alignment across departments.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminOverview,
});

const courseEffectiveness = [...COURSES]
  .sort((a, b) => b.effectiveness - a.effectiveness)
  .slice(0, 8)
  .map((c) => ({ name: c.skill, effectiveness: c.effectiveness }));

function AdminOverview() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="Institution Overview"
        description="Cohort-level view of skill readiness against simulated industry requirements."
        action={
          <Button asChild variant="outline">
            <Link to="/admin/reports">
              View reports
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        }
      />
      <DemoDataNote />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Students"
          value={INSTITUTION_KPIS.totalStudents.toLocaleString("en-IN")}
          hint="Enrolled across 6 departments"
          icon={Users}
        />
        <StatCard
          label="Average Job Readiness"
          value={`${INSTITUTION_KPIS.averageReadiness}%`}
          hint="Weighted demo readiness score"
          icon={Gauge}
        />
        <StatCard
          label="Critical Skill Gaps"
          value={INSTITUTION_KPIS.criticalGaps.toLocaleString("en-IN")}
          hint="Gap ≥ 40 points vs requirement"
          icon={AlertTriangle}
          tone="warning"
        />
        <StatCard
          label="Industry-Aligned Students"
          value={`${INSTITUTION_KPIS.industryAligned}%`}
          hint="Meets ≥ 75% of role requirements"
          icon={Target}
          tone="success"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Skill Gap Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartFrame height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={GAP_DISTRIBUTION}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                  >
                    {GAP_DISTRIBUTION.map((entry, i) => (
                      <Cell
                        key={entry.name}
                        fill={CHART_COLORS.palette[i % CHART_COLORS.palette.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartFrame>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Industry Demand vs Curriculum Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartFrame height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={INDUSTRY_VS_CURRICULUM}>
                  <CartesianGrid stroke={CHART_COLORS.grid} vertical={false} />
                  <XAxis dataKey="skill" stroke={CHART_COLORS.axis} fontSize={12} />
                  <YAxis stroke={CHART_COLORS.axis} fontSize={12} domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="industry"
                    name="Industry demand"
                    fill={CHART_COLORS.current}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="curriculum"
                    name="Curriculum coverage"
                    fill={CHART_COLORS.required}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartFrame>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Readiness Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartFrame height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={READINESS_DISTRIBUTION}>
                  <CartesianGrid stroke={CHART_COLORS.grid} vertical={false} />
                  <XAxis dataKey="band" stroke={CHART_COLORS.axis} fontSize={12} />
                  <YAxis stroke={CHART_COLORS.axis} fontSize={12} />
                  <Tooltip />
                  <Bar
                    dataKey="students"
                    name="Students"
                    fill={CHART_COLORS.accent}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartFrame>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Effectiveness</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartFrame height={300}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={courseEffectiveness}>
                  <CartesianGrid stroke={CHART_COLORS.grid} vertical={false} />
                  <XAxis dataKey="name" stroke={CHART_COLORS.axis} fontSize={12} />
                  <YAxis stroke={CHART_COLORS.axis} fontSize={12} domain={[50, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="effectiveness"
                    name="Effectiveness"
                    stroke={CHART_COLORS.current}
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartFrame>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top demand signals to act on</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DEMAND_SKILLS.slice(0, 6).map((d) => (
            <div key={d.skill} className="rounded-lg border border-border p-4">
              <p className="text-sm font-semibold text-foreground">{d.skill}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Demand index {d.demand} · +{d.growth}% YoY
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {d.openings.toLocaleString("en-IN")} simulated openings
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
