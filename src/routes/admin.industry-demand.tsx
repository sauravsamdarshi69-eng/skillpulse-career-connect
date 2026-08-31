import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CHART_COLORS,
  ChartFrame,
  DemoDataNote,
  SectionHeading,
} from "@/components/skillpulse/primitives";
import {
  DEMAND_SKILLS,
  DEMAND_TREND,
  EMERGING_SKILLS,
  type DemandFilter,
} from "@/data/industryDemand";

export const Route = createFileRoute("/admin/industry-demand")({
  head: () => ({
    meta: [
      { title: "Industry Demand Signals — SkillPulse Institution" },
      {
        name: "description",
        content:
          "Simulated demand indices, growth trends and emerging skills to guide curriculum planning.",
      },
      { property: "og:title", content: "Industry Demand Signals — SkillPulse" },
      {
        property: "og:description",
        content: "Demand indices, 12-month trends and emerging skill clusters.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminIndustryDemand,
});

const FILTERS: DemandFilter[] = ["All", "Technology", "Data", "Cloud", "Security", "AI"];
const TREND_KEYS = ["AI/ML", "React", "Cloud", "Python", "Cybersecurity"];

function AdminIndustryDemand() {
  const [filter, setFilter] = React.useState<DemandFilter>("All");
  const skills = DEMAND_SKILLS.filter((s) => filter === "All" || s.category === filter);

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Industry Demand"
        description="Demand signals used to benchmark curriculum against the job market."
      />
      <DemoDataNote />

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Demand index by skill</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartFrame height={320}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skills}>
                <CartesianGrid stroke={CHART_COLORS.grid} vertical={false} />
                <XAxis dataKey="skill" stroke={CHART_COLORS.axis} fontSize={12} />
                <YAxis stroke={CHART_COLORS.axis} fontSize={12} domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="demand" name="Demand index" fill={CHART_COLORS.current} radius={[4, 4, 0, 0]} />
                <Bar dataKey="growth" name="YoY growth %" fill={CHART_COLORS.accent} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Demand trend across the year</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartFrame height={320}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DEMAND_TREND}>
                <CartesianGrid stroke={CHART_COLORS.grid} vertical={false} />
                <XAxis dataKey="month" stroke={CHART_COLORS.axis} fontSize={12} />
                <YAxis stroke={CHART_COLORS.axis} fontSize={12} domain={[40, 100]} />
                <Tooltip />
                <Legend />
                {TREND_KEYS.map((k, i) => (
                  <Line
                    key={k}
                    type="monotone"
                    dataKey={k}
                    stroke={CHART_COLORS.palette[i % CHART_COLORS.palette.length]}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartFrame>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Emerging skills to add to curriculum</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {EMERGING_SKILLS.map((s) => (
            <div key={s.name} className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-foreground">{s.name}</p>
                <Badge variant="secondary">+{s.growth}%</Badge>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
