import { createFileRoute } from "@tanstack/react-router";
import { Download, FileBarChart } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DemoDataNote,
  MeterBar,
  SectionHeading,
} from "@/components/skillpulse/primitives";
import { INDUSTRY_VS_CURRICULUM } from "@/data/industryDemand";
import { INSTITUTION_KPIS, STUDENTS, statusFor } from "@/data/students";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({
    meta: [
      { title: "Institution Reports — SkillPulse" },
      {
        name: "description",
        content:
          "Download-ready summaries of cohort readiness, department gaps and curriculum alignment actions.",
      },
      { property: "og:title", content: "Institution Reports — SkillPulse" },
      {
        property: "og:description",
        content: "Cohort readiness summaries and recommended curriculum actions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminReports,
});

function AdminReports() {
  const atRisk = STUDENTS.filter((s) => statusFor(s.readiness) === "At Risk").length;
  const ready = STUDENTS.filter((s) => statusFor(s.readiness) === "Industry Ready").length;

  const csv = () => {
    const header = "Name,Course,Year,Readiness,Critical Gaps,Status";
    const body = STUDENTS.map(
      (s) => `${s.name},${s.course},${s.year},${s.readiness},${s.criticalGaps},${statusFor(s.readiness)}`,
    ).join("\n");
    const blob = new Blob([`${header}\n${body}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "skillpulse-cohort-report.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Demo cohort report downloaded");
  };

  const actions = [...INDUSTRY_VS_CURRICULUM]
    .map((r) => ({ ...r, gap: r.industry - r.curriculum }))
    .sort((a, b) => b.gap - a.gap);

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Reports"
        description="Summaries an institution can share with departments and placement cells."
        action={
          <Button onClick={csv}>
            <Download className="size-4" aria-hidden="true" />
            Export cohort CSV
          </Button>
        }
      />
      <DemoDataNote />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cohort readiness</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-semibold">{INSTITUTION_KPIS.averageReadiness}%</p>
            <MeterBar value={INSTITUTION_KPIS.averageReadiness} />
            <p className="text-xs text-muted-foreground">Average across all departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Industry ready (sample)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-semibold">{ready}</p>
            <p className="text-xs text-muted-foreground">of {STUDENTS.length} sampled students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">At risk (sample)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-semibold text-destructive">{atRisk}</p>
            <p className="text-xs text-muted-foreground">Readiness below 60%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileBarChart className="size-4 text-brand-500" aria-hidden="true" />
            Recommended curriculum actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {actions.map((a) => (
            <div
              key={a.skill}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{a.skill}</p>
                <p className="text-xs text-muted-foreground">
                  Industry {a.industry} vs curriculum {a.curriculum} — {a.gap} point gap
                </p>
              </div>
              <Badge
                variant="outline"
                className={
                  a.gap >= 40
                    ? "border-destructive/20 bg-destructive/10 text-destructive"
                    : a.gap >= 20
                      ? "border-warning/25 bg-warning/15 text-warning"
                      : "border-success/20 bg-success/10 text-success"
                }
              >
                {a.gap >= 40 ? "Add new module" : a.gap >= 20 ? "Strengthen electives" : "Maintain"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
