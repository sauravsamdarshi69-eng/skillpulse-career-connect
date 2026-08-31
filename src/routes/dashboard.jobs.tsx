import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DemoDataNote,
  MeterBar,
  SectionHeading,
} from "@/components/skillpulse/primitives";
import { useStore } from "@/lib/store";
import { matchJobs } from "@/lib/engine";

export const Route = createFileRoute("/dashboard/jobs")({
  head: () => ({
    meta: [
      { title: "Job Match — SkillPulse" },
      {
        name: "description",
        content:
          "See how your skills align with simulated openings, with match percentage, matched skills and the gaps blocking each role.",
      },
      { property: "og:title", content: "Job Match — SkillPulse" },
      {
        property: "og:description",
        content: "Skill-based matching against demo job openings.",
      },
    ],
  }),
  component: JobsPage,
});

function JobsPage() {
  const { student } = useStore();
  const jobs = matchJobs(student.skills);

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Job Match"
        description="Match % is the weighted coverage of each employer's required proficiency levels."
      />
      <DemoDataNote>
        Openings are simulated records — no live job-board integration in this prototype.
      </DemoDataNote>

      <div className="grid gap-4 lg:grid-cols-2">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader className="flex-row items-start justify-between gap-3">
              <div>
                <CardTitle className="text-base">{job.title}</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">{job.company}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {job.location} · {job.type} · {job.experience}
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-brand-100 text-brand-700"
              >
                {job.match}% match
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <MeterBar value={job.match} tone={job.match >= 70 ? "success" : "brand"} />
              <p className="text-sm text-muted-foreground">{job.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {job.matchedSkills.map((s) => (
                  <Badge key={s} variant="secondary">
                    {s} ✓
                  </Badge>
                ))}
                {job.missingSkills.map((s) => (
                  <Badge key={s} variant="outline" className="border-warning/30 text-warning">
                    {s} gap
                  </Badge>
                ))}
              </div>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Briefcase className="size-3.5" aria-hidden="true" />
                {job.salary}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
