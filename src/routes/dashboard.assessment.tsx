import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { CheckCircle2, ClipboardCheck, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DemoDataNote,
  MeterBar,
  SectionHeading,
} from "@/components/skillpulse/primitives";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { ASSESSMENT_SKILLS, LEVEL_VALUES, levelLabel } from "@/data/skills";

const LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

export const Route = createFileRoute("/dashboard/assessment")({
  head: () => ({
    meta: [
      { title: "Skill Assessment — SkillPulse" },
      {
        name: "description",
        content:
          "Rate six core skills as Beginner, Intermediate or Advanced; SkillPulse scores the assessment and updates your skill profile instantly.",
      },
      { property: "og:title", content: "Skill Assessment — SkillPulse" },
      {
        property: "og:description",
        content: "Interactive self-assessment that updates your skill profile.",
      },
    ],
  }),
  component: AssessmentPage,
});

function AssessmentPage() {
  const { student, updateStudent } = useStore();
  const [answers, setAnswers] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(
      ASSESSMENT_SKILLS.map((s) => [s, levelLabel(student.skills[s] ?? 0)]).filter(
        ([, v]) => LEVELS.includes(v as (typeof LEVELS)[number]),
      ),
    ),
  );
  const [submitting, setSubmitting] = React.useState(false);
  const [result, setResult] = React.useState<{ score: number } | null>(null);

  const answered = ASSESSMENT_SKILLS.filter((s) => answers[s]).length;
  const progress = Math.round((answered / ASSESSMENT_SKILLS.length) * 100);

  const submit = () => {
    setSubmitting(true);
    setTimeout(() => {
      const nextSkills: Record<string, number> = { ...student.skills };
      let total = 0;
      for (const skill of ASSESSMENT_SKILLS) {
        const level = answers[skill];
        const value = LEVEL_VALUES[level ?? ""] ?? 0;
        nextSkills[skill] = value;
        total += value;
      }
      const score = Math.round(total / ASSESSMENT_SKILLS.length);
      updateStudent({
        skills: nextSkills,
        assessmentScore: score,
        assessmentCompletedAt: new Date().toISOString(),
      });
      setResult({ score });
      setSubmitting(false);
      toast.success("Assessment Completed ✓", {
        description: `Demo skill score: ${score}/100. Your skill profile has been updated.`,
      });
    }, 600);
  };

  const reset = () => {
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Skill Assessment"
        description="Self-rate each skill. Levels map to Beginner 35, Intermediate 60, Advanced 85 in this demo scoring model."
        action={
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="size-4" aria-hidden="true" />
            Reset
          </Button>
        }
      />
      <DemoDataNote>
        Assessment scoring is a simplified prototype model, not a validated proficiency
        test.
      </DemoDataNote>

      {student.assessmentCompletedAt && !result ? (
        <div className="flex items-center gap-2 rounded-lg border border-success/25 bg-success/10 px-3 py-2 text-sm text-success">
          <CheckCircle2 className="size-4" aria-hidden="true" />
          Previous assessment completed · score {student.assessmentScore}/100
        </div>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ClipboardCheck className="size-4 text-brand-500" aria-hidden="true" />
            {answered} of {ASSESSMENT_SKILLS.length} answered
          </CardTitle>
          <MeterBar value={progress} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          {ASSESSMENT_SKILLS.map((skill, index) => (
            <div key={skill} className="rounded-lg border border-border p-4">
              <p className="text-sm font-semibold text-foreground">
                Q{index + 1}. How would you rate your proficiency in {skill}?
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {LEVELS.map((level) => {
                  const active = answers[skill] === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setAnswers((a) => ({ ...a, [skill]: level }))}
                      className={cn(
                        "rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "border-brand-500 bg-brand-100 text-brand-700"
                          : "border-border bg-background text-muted-foreground hover:border-brand-100 hover:bg-muted",
                      )}
                      aria-pressed={active}
                    >
                      {level}
                      <span className="ml-1 text-xs opacity-70">
                        ({LEVEL_VALUES[level] ?? 0})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={submit}
              disabled={answered !== ASSESSMENT_SKILLS.length || submitting}
            >
              {submitting ? "Scoring…" : "Submit assessment"}
            </Button>
            {answered !== ASSESSMENT_SKILLS.length ? (
              <span className="text-xs text-muted-foreground">
                Answer all {ASSESSMENT_SKILLS.length} questions to submit.
              </span>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {result ? (
        <Card className="border-success/30 bg-success/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="size-5" aria-hidden="true" />
              <h2 className="text-lg font-semibold">Assessment Completed ✓</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Demo skill score: <span className="font-semibold text-foreground">{result.score}/100</span>.
              Your skill profile was updated automatically.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {ASSESSMENT_SKILLS.map((s) => (
                <Badge key={s} variant="outline" className="border-brand-100 text-brand-700">
                  {s}: {student.skills[s]}
                </Badge>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild>
                <Link to="/dashboard/skill-gap">See updated skill gap</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/dashboard">Back to dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
