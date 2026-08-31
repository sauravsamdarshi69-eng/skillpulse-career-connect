import { createFileRoute, Link } from "@tanstack/react-router";
import { ListChecks, Plus, Trash2 } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DemoDataNote,
  MeterBar,
  SectionHeading,
} from "@/components/skillpulse/primitives";
import { useStore } from "@/lib/store";
import { SKILL_CATALOGUE, SKILL_MAP, levelLabel } from "@/data/skills";
import { getCareer } from "@/data/careers";
import { skillGap } from "@/lib/engine";

export const Route = createFileRoute("/dashboard/skills")({
  head: () => ({
    meta: [
      { title: "My Skills — SkillPulse" },
      {
        name: "description",
        content:
          "Review, adjust and add skills with proficiency levels; changes persist locally and feed every SkillPulse calculation.",
      },
      { property: "og:title", content: "My Skills — SkillPulse" },
      {
        property: "og:description",
        content: "Manage your skill inventory and proficiency levels.",
      },
    ],
  }),
  component: MySkills,
});

function MySkills() {
  const { student, updateStudent, setSkills } = useStore();
  const career = getCareer(student.careerGoal);
  const [newSkill, setNewSkill] = React.useState("");

  const entries = Object.entries(student.skills).sort((a, b) => b[1] - a[1]);
  const available = SKILL_CATALOGUE.filter((s) => !(s.name in student.skills));

  const addSkill = () => {
    if (!newSkill) return;
    setSkills({ [newSkill]: 40 });
    setNewSkill("");
    toast.success(`${newSkill} added to your profile`);
  };

  const removeSkill = (skill: string) => {
    const next = { ...student.skills };
    delete next[skill];
    updateStudent({ skills: next });
    toast.success(`${skill} removed`);
  };

  return (
    <div className="space-y-6">
      <SectionHeading
        title="My Skills"
        description="Adjust your proficiency levels — every score feeds the gap analysis, job matching and readiness model."
        action={
          <Button variant="outline" asChild>
            <Link to="/dashboard/assessment">Take assessment</Link>
          </Button>
        }
      />
      <DemoDataNote>
        Industry-required levels shown here are simulated benchmarks for{" "}
        {career.title}.
      </DemoDataNote>

      <Card>
        <CardHeader className="flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <ListChecks className="size-4 text-brand-500" aria-hidden="true" />
            Skill inventory ({entries.length})
          </CardTitle>
          <div className="flex w-full gap-2 sm:w-auto">
            <Select value={newSkill} onValueChange={setNewSkill}>
              <SelectTrigger className="w-full sm:w-52" aria-label="Select a skill to add">
                <SelectValue placeholder="Add a skill…" />
              </SelectTrigger>
              <SelectContent>
                {available.length ? (
                  available.map((s) => (
                    <SelectItem key={s.name} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="__none" disabled>
                    All catalogue skills added
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <Button onClick={addSkill} disabled={!newSkill}>
              <Plus className="size-4" aria-hidden="true" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {entries.map(([skill, value]) => {
            const required = career.required[skill];
            const gap = required ? skillGap(value, required) : 0;
            return (
              <div key={skill} className="rounded-lg border border-border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{skill}</span>
                    <Badge variant="secondary">
                      {SKILL_MAP[skill]?.category ?? "Technical"}
                    </Badge>
                    {required ? (
                      <Badge variant="outline" className="border-brand-100 text-brand-700">
                        Required {required}
                      </Badge>
                    ) : null}
                    {gap > 0 ? (
                      <Badge variant="outline" className="border-warning/30 text-warning">
                        Gap {gap}
                      </Badge>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {levelLabel(value)} · {value}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${skill}`}
                      className="min-h-9 min-w-9"
                      onClick={() => removeSkill(skill)}
                    >
                      <Trash2 className="size-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <Slider
                    value={[value]}
                    max={100}
                    step={5}
                    aria-label={`${skill} proficiency`}
                    onValueChange={([v]) => setSkills({ [skill]: v })}
                    className="max-w-md"
                  />
                  <MeterBar value={value} className="hidden flex-1 sm:block" />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
