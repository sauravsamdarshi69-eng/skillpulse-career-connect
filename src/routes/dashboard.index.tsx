import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowRight,
  Gauge,
  Lightbulb,
  ListChecks,
  Target,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  CHART_COLORS,
  ChartFrame,
  DemoDataNote,
  MeterBar,
  PriorityBadge,
  SectionHeading,
  StatCard,
} from "@/components/skillpulse/primitives";
import { useStore } from "@/lib/store";
import {
  analyseGaps,
  coverage,
  jobReadiness,
  matchJobs,
  recommendationText,
} from "@/lib/engine";
import { getCareer } from "@/data/careers";
import { ASSESSMENT_SKILLS } from "@/data/skills";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — SkillPulse" },
      {
        name: "description",
        content:
          "Job readiness, skill match, skill progress charts and a prioritised skill gap overview for the demo student.",
      },
      { property: "og:title", content: "Student Dashboard — SkillPulse" },
      {
        property: "og:description",
        content: "Track readiness, skill match and prioritised skill gaps in one view.",
      },
    ],
  }),
  component: DashboardHome,
});

function DashboardHome() {
  const { student } = useStore();
  const career = getCareer(student.careerGoal);
  const gaps = analyseGaps(student.skills, student.careerGoal);
  const readiness = jobReadiness(student.skills, student.careerGoal, student.assessmentScore);
  const match = coverage(student.skills, career.required);
  const recommended = gaps.filter((g) => g.gap >= 10).length;
  const skillCount = Object.values(student.skills).filter((v) => v > 0).length;
  const topJob = matchJobs(student.skills)[0];
  const insights = recommendationText(student.skills, student.careerGoal);

  const radarData = ASSESSMENT_SKILLS.map((skill) => ({
    skill,
    level: student.skills[skill] ?? 0,
  }));

  const barData = gaps.map((g) => ({
    skill: g.skill,
    Current: g.current,
    Required: g.required,
  }));

  return (
    <div className="space-y-6">
      <SectionHeading
        title={`Welcome back, ${student.name.split(" ")[0]}`}
        description={`Career goal: ${student.careerGoal} · ${student.branch}`}
        action={
          <Button asChild>
            <Link to="/dashboard/skill-gap">
              Run gap analysis <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        }
      />
      <DemoDataNote />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Job Readiness"
          value={`${readiness.score}%`}
          hint="Demo weighted model"
          icon={Gauge}
        />
        <StatCard
          label="Skill Match"
          value={`${match}%`}
          hint={career.title}
          icon={Target}
          tone="success"
        />
        <StatCard label="Skills Tracked" value={`${skillCount}`} hint="From your profile" icon={ListChecks} />
        <StatCard
          label="Recommended Skills"
          value={`${recommended}`}
          hint="Gap ≥ 10 points"
          icon={Sparkles}
          tone="warning"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Skill Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="radar">
              <TabsList>
                <TabsTrigger value="radar">Radar</TabsTrigger>
                <TabsTrigger value="bar">Current vs Required</TabsTrigger>
              </TabsList>
              <TabsContent value="radar">
                <ChartFrame height={300}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} outerRadius="72%">
                      <PolarGrid stroke={CHART_COLORS.grid} />
                      <PolarAngleAxis
                        dataKey="skill"
                        tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
                      />
                      <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                      <Radar
                        name="Your level"
                        dataKey="level"
                        stroke={CHART_COLORS.current}
                        fill={CHART_COLORS.current}
                        fillOpacity={0.35}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </ChartFrame>
              </TabsContent>
              <TabsContent value="bar">
                <ChartFrame height={300}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} margin={{ left: -18, right: 8 }}>
                      <CartesianGrid stroke={CHART_COLORS.grid} vertical={false} />
                      <XAxis
                        dataKey="skill"
                        tick={{ fill: CHART_COLORS.axis, fontSize: 11 }}
                        interval={0}
                        angle={-18}
                        textAnchor="end"
                        height={54}
                      />
                      <YAxis domain={[0, 100]} tick={{ fill: CHART_COLORS.axis, fontSize: 11 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Current" fill={CHART_COLORS.current} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Required" fill={CHART_COLORS.required} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartFrame>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="size-4 text-brand-500" aria-hidden="true" />
              Engine insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.map((line) => (
              <p key={line} className="text-sm text-muted-foreground">
                {line}
              </p>
            ))}
            <div className="rounded-lg border border-border bg-muted/40 p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Readiness breakdown
              </p>
              <div className="mt-2 space-y-2 text-sm">
                {[
                  ["Technical (70%)", readiness.technical],
                  ["Soft skills (20%)", readiness.soft],
                  ["Assessment (10%)", readiness.assessment],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{label}</span>
                      <span className="font-medium text-foreground">{value}%</span>
                    </div>
                    <MeterBar value={value as number} className="mt-1" />
                  </div>
                ))}
              </div>
            </div>
            {topJob ? (
              <div className="rounded-lg border border-border p-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Best job match
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {topJob.title} · {topJob.match}%
                </p>
                <p className="text-xs text-muted-foreground">{topJob.company}</p>
                <Button variant="link" className="h-auto p-0 text-xs" asChild>
                  <Link to="/dashboard/jobs">View all job matches</Link>
                </Button>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Skill Gap Overview</CardTitle>
          <Badge variant="secondary">{career.title}</Badge>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Skill</TableHead>
                  <TableHead className="w-[220px]">Current</TableHead>
                  <TableHead>Required</TableHead>
                  <TableHead>Gap</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gaps.map((g) => (
                  <TableRow key={g.skill}>
                    <TableCell className="font-medium">{g.skill}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MeterBar
                          value={g.current}
                          tone={g.gap >= 40 ? "danger" : g.gap >= 20 ? "warning" : "brand"}
                          className="w-28"
                        />
                        <span className="text-xs text-muted-foreground">{g.current}</span>
                      </div>
                    </TableCell>
                    <TableCell>{g.required}</TableCell>
                    <TableCell className="font-semibold">{g.gap}</TableCell>
                    <TableCell>
                      <PriorityBadge priority={g.priority} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
