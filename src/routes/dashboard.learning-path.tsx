import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  PlayCircle,
  Route as RouteIcon,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DemoDataNote,
  EmptyState,
  MeterBar,
  PriorityBadge,
  SectionHeading,
} from "@/components/skillpulse/primitives";
import { useStore } from "@/lib/store";
import { buildLearningPath } from "@/lib/engine";

export const Route = createFileRoute("/dashboard/learning-path")({
  head: () => ({
    meta: [
      { title: "Personalized Learning Path — SkillPulse" },
      {
        name: "description",
        content:
          "A six-week roadmap generated from your prioritised skill gaps, with resources, estimated hours and completion tracking.",
      },
      { property: "og:title", content: "Personalized Learning Path — SkillPulse" },
      {
        property: "og:description",
        content: "Week-by-week skill roadmap with progress saved in your browser.",
      },
    ],
  }),
  component: LearningPathPage,
});

function LearningPathPage() {
  const { student, updateStudent, toggleModule } = useStore();
  const weeks = buildLearningPath(student.skills, student.careerGoal);
  const completed = weeks.filter((w) => student.completedModules.includes(w.id)).length;
  const progress = weeks.length ? Math.round((completed / weeks.length) * 100) : 0;

  if (!student.learningPathGenerated) {
    return (
      <div className="space-y-6">
        <SectionHeading
          title="Personalized Learning Path"
          description="Generated from your prioritised skill gaps."
        />
        <EmptyState
          icon={RouteIcon}
          title="No learning path yet"
          description="Run the skill gap analysis and generate a path, or create it directly from your current gaps."
          action={
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                onClick={() => {
                  updateStudent({ learningPathGenerated: true });
                  toast.success("Learning path generated");
                }}
              >
                <Sparkles className="size-4" aria-hidden="true" />
                Generate now
              </Button>
              <Button variant="outline" asChild>
                <Link to="/dashboard/skill-gap">Open gap analysis</Link>
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Personalized Learning Path"
        description={`Six-week roadmap for ${student.careerGoal}, ordered by gap priority.`}
        action={
          <Badge variant="outline" className="border-brand-100 text-brand-700">
            {completed}/{weeks.length} modules complete
          </Badge>
        }
      />
      <DemoDataNote>
        Course titles and providers are placeholder demo resources for the prototype.
      </DemoDataNote>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Roadmap progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall completion</span>
            <span className="font-semibold text-foreground">{progress}%</span>
          </div>
          <MeterBar value={progress} tone="success" className="mt-2" />
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {weeks.map((week) => {
          const done = student.completedModules.includes(week.id);
          return (
            <Card
              key={week.id}
              className={done ? "border-success/30 bg-success/5" : undefined}
            >
              <CardHeader className="flex-row items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-brand-500">
                    Week {week.week}
                  </p>
                  <CardTitle className="mt-1 text-base">{week.skill}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <PriorityBadge priority={week.priority} />
                  {done ? (
                    <CheckCircle2 className="size-5 text-success" aria-hidden="true" />
                  ) : null}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-lg bg-muted/60 p-2">
                    <p className="text-base font-semibold text-foreground">{week.current}</p>
                    <p className="text-muted-foreground">Current</p>
                  </div>
                  <div className="rounded-lg bg-brand-50 p-2">
                    <p className="text-base font-semibold text-brand-700">{week.target}</p>
                    <p className="text-muted-foreground">Target</p>
                  </div>
                  <div className="rounded-lg bg-muted/60 p-2">
                    <p className="flex items-center justify-center gap-1 text-base font-semibold text-foreground">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {week.hours}h
                    </p>
                    <p className="text-muted-foreground">Est. time</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress to target</span>
                    <span>{Math.round((week.current / week.target) * 100)}%</span>
                  </div>
                  <MeterBar
                    value={done ? 100 : Math.round((week.current / week.target) * 100)}
                    tone={done ? "success" : "brand"}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <BookOpen className="size-3.5" aria-hidden="true" />
                    Recommended resources
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {week.courses.slice(0, 2).map((c) => (
                      <li key={c.id} className="text-sm text-foreground">
                        {c.title}
                        <span className="block text-xs text-muted-foreground">
                          {c.provider} · {c.hours}h · {c.format}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={done ? "outline" : "default"}
                    onClick={() => {
                      toggleModule(week.id);
                      toast.success(
                        done
                          ? `Week ${week.week} marked incomplete`
                          : `Week ${week.week} (${week.skill}) marked complete ✓`,
                      );
                    }}
                  >
                    {done ? "Mark incomplete" : "Mark complete"}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      toast.info(`Opening "${week.courses[0]?.title}" (demo resource)`)
                    }
                  >
                    <PlayCircle className="size-4" aria-hidden="true" />
                    Start Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
