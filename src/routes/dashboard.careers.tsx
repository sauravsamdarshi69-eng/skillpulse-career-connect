import { createFileRoute } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DemoDataNote,
  MeterBar,
  SectionHeading,
} from "@/components/skillpulse/primitives";
import { useStore } from "@/lib/store";
import { recommendCareers } from "@/lib/engine";

export const Route = createFileRoute("/dashboard/careers")({
  head: () => ({
    meta: [
      { title: "Career Recommendations — SkillPulse" },
      {
        name: "description",
        content:
          "Ranked career paths based on how well your current skills cover each role's simulated industry requirements.",
      },
      { property: "og:title", content: "Career Recommendations — SkillPulse" },
      {
        property: "og:description",
        content: "Best-fit career paths ranked by skill coverage.",
      },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const { student, updateStudent } = useStore();
  const careers = recommendCareers(student.skills);

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Career Recommendations"
        description="Ranked by weighted coverage of each role's required proficiency levels."
      />
      <DemoDataNote>Role benchmarks and salaries are simulated demo values.</DemoDataNote>

      <div className="grid gap-4 lg:grid-cols-2">
        {careers.map((c) => (
          <Card
            key={c.id}
            className={c.title === student.careerGoal ? "border-brand-500" : undefined}
          >
            <CardHeader className="flex-row items-start justify-between gap-3">
              <div>
                <CardTitle className="text-base">{c.title}</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">{c.summary}</p>
              </div>
              <Badge variant="outline" className="border-brand-100 text-brand-700">
                {c.match}%
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <MeterBar value={c.match} tone={c.match >= 70 ? "success" : "brand"} />
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary">{c.demandLabel} demand</Badge>
                <Badge variant="outline">{c.medianSalary}</Badge>
              </div>
              {c.learningFocus.length ? (
                <p className="text-xs text-muted-foreground">
                  Focus next: {c.learningFocus.join(", ")}
                </p>
              ) : (
                <p className="text-xs text-success">All benchmarks met for this role.</p>
              )}
              <p className="text-xs text-muted-foreground">
                Typical roles: {c.opportunities.join(" · ")}
              </p>
              <Button
                variant={c.title === student.careerGoal ? "outline" : "default"}
                disabled={c.title === student.careerGoal}
                onClick={() => {
                  updateStudent({ careerGoal: c.title });
                  toast.success(`Career goal set to ${c.title}`);
                }}
              >
                {c.title === student.careerGoal ? "Current goal" : "Set as goal"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
