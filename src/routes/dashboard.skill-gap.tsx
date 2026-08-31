import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { GitCompareArrows, Lightbulb, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CHART_COLORS,
  ChartFrame,
  DemoDataNote,
  MeterBar,
  PriorityBadge,
  SectionHeading,
} from "@/components/skillpulse/primitives";
import { useStore } from "@/lib/store";
import { CAREERS, getCareer } from "@/data/careers";
import { analyseGaps, coverage, jobReadiness, recommendationText } from "@/lib/engine";

export const Route = createFileRoute("/dashboard/skill-gap")({
  head: () => ({
    meta: [
      { title: "AI Skill Gap Analysis — SkillPulse" },
      {
        name: "description",
        content:
          "Compare your current skill levels against simulated industry requirements with gap size, priority and a rule-based recommendation summary.",
      },
      { property: "og:title", content: "AI Skill Gap Analysis — SkillPulse" },
      {
        property: "og:description",
        content: "Current vs required skills, gap size and priority for your career goal.",
      },
    ],
  }),
  component: SkillGapPage,
});

function SkillGapPage() {
  const { student, updateStudent } = useStore();
  const navigate = useNavigate();
  const [generating, setGenerating] = React.useState(false);

  const career = getCareer(student.careerGoal);
  const gaps = analyseGaps(student.skills, student.careerGoal);
  const insights = recommendationText(student.skills, student.careerGoal);
  const readiness = jobReadiness(student.skills, student.careerGoal, student.assessmentScore);
  const match = coverage(student.skills, career.required);

  const chartData = gaps.map((g) => ({
    skill: g.skill,
    Current: g.current,
    Required: g.required,
    Gap: g.gap,
  }));

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      updateStudent({ learningPathGenerated: true });
      setGenerating(false);
      toast.success("Learning path generated", {
        description: `${Math.min(6, gaps.filter((g) => g.gap > 0).length)} weekly modules created from your priority gaps.`,
      });
      navigate({ to: "/dashboard/learning-path" });
    }, 700);
  };

  return (
    <div className="space-y-6">
      <SectionHeading
        title="AI Skill Gap Analysis"
        description="Rule-based engine: gap = max(0, required − current); priority thresholds 40 / 20 / 10 points."
        action={
          <Button onClick={generate} disabled={generating}>
            <Sparkles className="size-4" aria-hidden="true" />
            {generating ? "Generating…" : "Generate Learning Path"}
          </Button>
        }
      />
      <DemoDataNote>
        Industry requirements are simulated benchmarks defined in the project data files —
        not live labour-market data.
      </DemoDataNote>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Selected career</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select
              value={student.careerGoal}
              onValueChange={(value) => {
                updateStudent({ careerGoal: value });
                toast.success(`Career goal set to ${value}`);
              }}
            >
              <SelectTrigger aria-label="Select career goal">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CAREERS.map((c) => (
                  <SelectItem key={c.id} value={c.title}>
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">{career.summary}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Demand: {career.demandLabel}</Badge>
              <Badge variant="outline">{career.medianSalary}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Alignment summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Skill match</span>
                <span className="font-semibold text-foreground">{match}%</span>
              </div>
              <MeterBar value={match} className="mt-1.5" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Job readiness</span>
                <span className="font-semibold text-foreground">{readiness.score}%</span>
              </div>
              <MeterBar value={readiness.score} tone="success" className="mt-1.5" />
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 text-center">
              <div className="rounded-lg bg-destructive/10 p-2">
                <p className="text-lg font-semibold text-destructive">
                  {gaps.filter((g) => g.priority === "Critical").length}
                </p>
                <p className="text-xs text-muted-foreground">Critical</p>
              </div>
              <div className="rounded-lg bg-warning/15 p-2">
                <p className="text-lg font-semibold text-warning">
                  {gaps.filter((g) => g.priority === "High").length}
                </p>
                <p className="text-xs text-muted-foreground">High</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="size-4 text-brand-500" aria-hidden="true" />
              Recommendation engine
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {insights.map((line) => (
              <p key={line} className="text-sm text-muted-foreground">
                {line}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current vs industry requirement</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartFrame height={340}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ left: -18, right: 8 }}>
                <CartesianGrid stroke={CHART_COLORS.grid} vertical={false} />
                <XAxis
                  dataKey="skill"
                  tick={{ fill: CHART_COLORS.axis, fontSize: 11 }}
                  interval={0}
                  angle={-18}
                  textAnchor="end"
                  height={60}
                />
                <YAxis domain={[0, 100]} tick={{ fill: CHART_COLORS.axis, fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Current" fill={CHART_COLORS.current} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Required" fill={CHART_COLORS.required} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Gap" radius={[4, 4, 0, 0]}>
                  {chartData.map((d) => (
                    <Cell
                      key={d.skill}
                      fill={
                        d.Gap >= 40
                          ? CHART_COLORS.danger
                          : d.Gap >= 20
                            ? CHART_COLORS.warn
                            : CHART_COLORS.accent
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">
            Industry requirements vs your skills
          </CardTitle>
          <Badge variant="secondary">{career.title}</Badge>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Skill</TableHead>
                  <TableHead>Current</TableHead>
                  <TableHead>Required</TableHead>
                  <TableHead>Gap</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Recommended resource</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gaps.map((g) => (
                  <TableRow key={g.skill}>
                    <TableCell className="font-medium">{g.skill}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MeterBar value={g.current} className="w-20" />
                        <span className="text-xs text-muted-foreground">{g.current}</span>
                      </div>
                    </TableCell>
                    <TableCell>{g.required}</TableCell>
                    <TableCell className="font-semibold">{g.gap}</TableCell>
                    <TableCell>
                      <PriorityBadge priority={g.priority} />
                    </TableCell>
                    <TableCell className="max-w-[260px] text-xs text-muted-foreground">
                      {g.gap > 0 ? g.courses[0]?.title : "Benchmark met — keep practising"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <GitCompareArrows className="size-3.5" aria-hidden="true" />
            Priority rule: gap ≥ 40 Critical · ≥ 20 High · ≥ 10 Medium · otherwise Low.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
