import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { BookOpen } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  DemoDataNote,
  EmptyState,
  MeterBar,
  SectionHeading,
} from "@/components/skillpulse/primitives";
import { COURSES } from "@/data/courses";

export const Route = createFileRoute("/admin/courses")({
  head: () => ({
    meta: [
      { title: "Course Catalogue & Effectiveness — SkillPulse" },
      {
        name: "description",
        content:
          "Review course effectiveness by skill, level and format to decide what to keep, revise or retire.",
      },
      { property: "og:title", content: "Course Catalogue & Effectiveness — SkillPulse" },
      {
        property: "og:description",
        content: "Effectiveness ratings for every mapped learning resource.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminCourses,
});

const SKILLS = ["All", ...Array.from(new Set(COURSES.map((c) => c.skill)))];
const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];

function AdminCourses() {
  const [query, setQuery] = React.useState("");
  const [skill, setSkill] = React.useState("All");
  const [level, setLevel] = React.useState("All");

  const rows = COURSES.filter(
    (c) =>
      (skill === "All" || c.skill === skill) &&
      (level === "All" || c.level === level) &&
      (c.title + c.provider).toLowerCase().includes(query.trim().toLowerCase()),
  ).sort((a, b) => b.effectiveness - a.effectiveness);

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Courses"
        description="Learning resources mapped to skills, with simulated effectiveness ratings."
      />
      <DemoDataNote />

      <Card>
        <CardContent className="space-y-4 p-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search course or provider…"
              aria-label="Search courses"
            />
            <Select value={skill} onValueChange={setSkill}>
              <SelectTrigger aria-label="Filter by skill">
                <SelectValue placeholder="Skill" />
              </SelectTrigger>
              <SelectContent>
                {SKILLS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s === "All" ? "All skills" : s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger aria-label="Filter by level">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {LEVELS.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l === "All" ? "All levels" : l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {rows.length ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Skill</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead className="min-w-40">Effectiveness</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">
                        {c.title}
                        <span className="block text-xs text-muted-foreground">{c.provider}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{c.skill}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{c.level}</TableCell>
                      <TableCell className="text-sm tabular-nums">{c.hours}h</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MeterBar
                            value={c.effectiveness}
                            tone={c.effectiveness >= 80 ? "success" : "brand"}
                            className="w-24"
                          />
                          <span className="text-sm tabular-nums">{c.effectiveness}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <EmptyState
              icon={BookOpen}
              title="No courses match these filters"
              description="Adjust the search text, skill or level to see the catalogue again."
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
