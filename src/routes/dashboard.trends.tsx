import { createFileRoute } from "@tanstack/react-router";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CHART_COLORS,
  ChartFrame,
  DemoDataNote,
  MeterBar,
  SectionHeading,
} from "@/components/skillpulse/primitives";
import { DEMAND_SKILLS, DEMAND_TREND, EMERGING_SKILLS } from "@/data/industryDemand";

export const Route = createFileRoute("/dashboard/trends")({
  head: () => ({
    meta: [
      { title: "Industry Trends — SkillPulse" },
      {
        name: "description",
        content:
          "Simulated demand indices, year-over-year growth and emerging skills such as Generative AI, Cloud and Cybersecurity.",
      },
      { property: "og:title", content: "Industry Trends — SkillPulse" },
      {
        property: "og:description",
        content: "Demand signals and emerging skills for the job market.",
      },
    ],
  }),
  component: TrendsPage,
});

function TrendsPage() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="Industry Trends"
        description="Where hiring demand is moving, and which emerging skills to add next."
      />
      <DemoDataNote>All demand figures are simulated prototype data.</DemoDataNote>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Demand index over the year</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartFrame height={320}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DEMAND_TREND} margin={{ left: -18, right: 8 }}>
                <CartesianGrid stroke={CHART_COLORS.grid} vertical={false} />
                <XAxis dataKey="month" tick={{ fill: CHART_COLORS.axis, fontSize: 11 }} />
                <YAxis domain={[40, 100]} tick={{ fill: CHART_COLORS.axis, fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="AI/ML" stroke={CHART_COLORS.danger} strokeWidth={2} />
                <Line type="monotone" dataKey="Cloud" stroke={CHART_COLORS.current} strokeWidth={2} />
                <Line type="monotone" dataKey="React" stroke={CHART_COLORS.required} strokeWidth={2} />
                <Line type="monotone" dataKey="Python" stroke={CHART_COLORS.accent} strokeWidth={2} />
                <Line type="monotone" dataKey="Cybersecurity" stroke={CHART_COLORS.warn} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartFrame>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top in-demand skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {DEMAND_SKILLS.map((s) => (
              <div key={s.skill}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{s.skill}</span>
                  <span className="text-muted-foreground">
                    {s.demand} · +{s.growth}% · {s.openings.toLocaleString("en-IN")} openings
                  </span>
                </div>
                <MeterBar value={s.demand} className="mt-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Emerging skills to watch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {EMERGING_SKILLS.map((s) => (
              <div key={s.name} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">{s.name}</span>
                  <Badge variant="outline" className="border-success/30 text-success">
                    +{s.growth}%
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
