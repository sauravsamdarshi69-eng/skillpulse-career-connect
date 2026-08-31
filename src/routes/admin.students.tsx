import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Users } from "lucide-react";

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
import { STUDENTS, statusFor } from "@/data/students";

export const Route = createFileRoute("/admin/students")({
  head: () => ({
    meta: [
      { title: "Student Cohort — SkillPulse Institution" },
      {
        name: "description",
        content:
          "Filter the student cohort by course, year and readiness status to spot at-risk learners early.",
      },
      { property: "og:title", content: "Student Cohort — SkillPulse Institution" },
      {
        property: "og:description",
        content: "Cohort table with readiness, skill gaps and status filters.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminStudents,
});

const COURSES_LIST = ["All", ...Array.from(new Set(STUDENTS.map((s) => s.course)))];
const YEARS = ["All", ...Array.from(new Set(STUDENTS.map((s) => s.year)))];
const STATUSES = ["All", "Industry Ready", "On Track", "At Risk"] as const;

function statusTone(status: string) {
  if (status === "Industry Ready") return "bg-success/10 text-success border-success/20";
  if (status === "On Track") return "bg-brand-100 text-brand-700 border-brand-100";
  return "bg-destructive/10 text-destructive border-destructive/20";
}

function AdminStudents() {
  const [query, setQuery] = React.useState("");
  const [course, setCourse] = React.useState("All");
  const [year, setYear] = React.useState("All");
  const [status, setStatus] = React.useState<string>("All");

  const rows = STUDENTS.filter((s) => {
    const st = statusFor(s.readiness);
    return (
      (course === "All" || s.course === course) &&
      (year === "All" || s.year === year) &&
      (status === "All" || st === status) &&
      s.name.toLowerCase().includes(query.trim().toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Students"
        description="Cohort readiness with filters by department, year and status."
      />
      <DemoDataNote />

      <Card>
        <CardContent className="space-y-4 p-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search student name…"
              aria-label="Search student name"
            />
            <Select value={course} onValueChange={setCourse}>
              <SelectTrigger aria-label="Filter by course">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                {COURSES_LIST.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c === "All" ? "All courses" : c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger aria-label="Filter by year">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y === "All" ? "All years" : y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger aria-label="Filter by status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s === "All" ? "All statuses" : s}
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
                    <TableHead>Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead className="min-w-40">Readiness</TableHead>
                    <TableHead>Skill Gap</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((s) => {
                    const st = statusFor(s.readiness);
                    return (
                      <TableRow key={s.id}>
                        <TableCell className="font-medium">
                          {s.name}
                          <span className="block text-xs text-muted-foreground">{s.year}</span>
                        </TableCell>
                        <TableCell>{s.course}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MeterBar
                              value={s.readiness}
                              tone={
                                s.readiness >= 75
                                  ? "success"
                                  : s.readiness >= 60
                                    ? "brand"
                                    : "danger"
                              }
                              className="w-24"
                            />
                            <span className="text-sm tabular-nums">{s.readiness}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {s.criticalGaps} critical
                          <span className="block text-xs text-muted-foreground">
                            Top: {s.topGap}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusTone(st)}>
                            {st}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <EmptyState
              icon={Users}
              title="No students match these filters"
              description="Try clearing the search box or selecting a different course, year or status."
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
