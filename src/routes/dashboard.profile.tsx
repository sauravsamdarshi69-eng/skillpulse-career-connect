import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DemoDataNote, SectionHeading } from "@/components/skillpulse/primitives";
import { useStore } from "@/lib/store";
import { CAREERS } from "@/data/careers";

export const Route = createFileRoute("/dashboard/profile")({
  head: () => ({
    meta: [
      { title: "Student Profile — SkillPulse" },
      {
        name: "description",
        content:
          "Edit your name, education, branch, year and career goal; details are stored locally in your browser.",
      },
      { property: "og:title", content: "Student Profile — SkillPulse" },
      {
        property: "og:description",
        content: "Manage your SkillPulse student profile details.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { student, updateStudent, reset } = useStore();

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Student Profile"
        description="Profile details are persisted in browser LocalStorage for this prototype."
        action={
          <Button
            variant="outline"
            onClick={() => {
              reset();
              toast.success("Demo data reset");
            }}
          >
            Reset demo data
          </Button>
        }
      />
      <DemoDataNote>No backend account — this is a local demo profile.</DemoDataNote>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="profile-name">Full name</Label>
            <Input
              id="profile-name"
              value={student.name}
              onChange={(e) => updateStudent({ name: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-email">Email</Label>
            <Input
              id="profile-email"
              type="email"
              value={student.email}
              onChange={(e) => updateStudent({ email: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-education">Education</Label>
            <Input
              id="profile-education"
              value={student.education}
              onChange={(e) => updateStudent({ education: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-branch">Branch</Label>
            <Input
              id="profile-branch"
              value={student.branch}
              onChange={(e) => updateStudent({ branch: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-year">Year</Label>
            <Input
              id="profile-year"
              value={student.year}
              onChange={(e) => updateStudent({ year: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-goal">Career goal</Label>
            <Select
              value={student.careerGoal}
              onValueChange={(value) => updateStudent({ careerGoal: value })}
            >
              <SelectTrigger id="profile-goal">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CAREERS.map((c) => (
                  <SelectItem key={c.id} value={c.title}>
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="profile-resume">Resume file (demo)</Label>
            <Input
              id="profile-resume"
              value={student.resume}
              onChange={(e) => updateStudent({ resume: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
