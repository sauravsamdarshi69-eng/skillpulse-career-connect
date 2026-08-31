import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
  SectionHeading,
} from "@/components/skillpulse/primitives";
import { HEATMAP_ROWS, HEATMAP_SKILLS } from "@/data/students";
import { INDUSTRY_VS_CURRICULUM } from "@/data/industryDemand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/skill-gaps")({
  head: () => ({
    meta: [
      { title: "Institution Skill Gap Heatmap — SkillPulse" },
      {
        name: "description",
        content:
          "Department-by-skill heatmap showing where curriculum coverage falls behind industry requirements.",
      },
      { property: "og:title", content: "Institution Skill Gap Heatmap — SkillPulse" },
      {
        property: "og:description",
        content: "Compare coverage of React, Python, SQL, Cloud, AI and Communication by department.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminSkillGaps,
});

/** Coverage → colour intensity. Lower coverage = hotter (red). */
function cellClass(value: number) {
  if (value >= 70) return "bg-success/80 text-white";
  if (value >= 55) return "bg-success/45 text-foreground";
  if (value >= 40) return "bg-warning/50 text-foreground";
  if (value >= 25) return "bg-destructive/45 text-foreground";
  return "bg-destructive/80 text-white";
}

const LEGEND = [
  { label: "0-24% critical", cls: "bg-destructive/80" },
  { label: "25-39% weak", cls: "bg-destructive/45" },
  { label: "40-54% moderate", cls: "bg-warning/50" },
  { label: "55-69% good", cls: "bg-success/45" },
  { label: "70%+ strong", cls: "bg-success/80" },
];

function AdminSkillGaps() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="Skill Gaps"
        description="Where department curricula lag behind simulated industry requirements."
      />
      <DemoDataNote />

      <Card>
        <CardHeader>
          <CardTitle>Institution Skill Gap Heatmap</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full min-w-150 border-separate border-spacing-1 text-sm">
              <thead>
                <tr>
                  <th className="w-40 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Department
                  </th>
                  {HEATMAP_SKILLS.map((s) => (
                    <th
                      key={s}
                      scope="col"
                      className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                    >
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HEATMAP_ROWS.map((row) => (
                  <tr key={row.course}>
                    <th
                      scope="row"
                      className="whitespace-nowrap text-left text-sm font-medium text-foreground"
                    >
                      {row.course}
                    </th>
                    {row.values.map((v, i) => (
                      <td
                        key={HEATMAP_SKILLS[i]}
                        className={cn(
                          "rounded-md p-3 text-center text-sm font-semibold tabular-nums",
                          cellClass(v),
                        )}
                        title={`${row.course} · ${HEATMAP_SKILLS[i]}: ${v}% coverage`}
                      >
                        {v}%
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {LEGEND.map((l) => (
              <span key={l.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className={cn("size-3 rounded", l.cls)} />
                {l.label}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Industry requirement vs curriculum coverage</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartFrame height={320}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INDUSTRY_VS_CURRICULUM} layout="vertical">
                <CartesianGrid stroke={CHART_COLORS.grid} horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke={CHART_COLORS.axis} fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="skill"
                  width={90}
                  stroke={CHART_COLORS.axis}
                  fontSize={12}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="industry" name="Industry demand" fill={CHART_COLORS.current} radius={[0, 4, 4, 0]} />
                <Bar dataKey="curriculum" name="Curriculum coverage" fill={CHART_COLORS.warn} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
        </CardContent>
      </Card>
    </div>
  );
}
