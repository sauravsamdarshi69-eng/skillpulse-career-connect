import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, Lock, Mail, PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/skillpulse/Logo";
import { useStore } from "@/lib/store";

const searchSchema = z.object({ demo: z.boolean().optional() });

export const Route = createFileRoute("/login")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Login or Demo Access — SkillPulse" },
      {
        name: "description",
        content:
          "Sign in to the SkillPulse prototype or continue as a demo student to explore skill gap analysis and job readiness.",
      },
      { property: "og:title", content: "Login or Demo Access — SkillPulse" },
      {
        property: "og:description",
        content: "Use demo@skillpulse.com / demo123 or continue as a demo student.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useStore();
  const { demo } = Route.useSearch();
  const [email, setEmail] = React.useState(demo ? "demo@skillpulse.com" : "");
  const [password, setPassword] = React.useState(demo ? "demo123" : "");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const enter = (as: string) => {
    setLoading(true);
    setTimeout(() => {
      login(as);
      toast.success("Demo session started", {
        description: "Signed in as Rahul Kumar (demo student).",
      });
      navigate({ to: "/dashboard" });
    }, 450);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (email.trim() === "demo@skillpulse.com" && password === "demo123") {
      enter(email.trim());
      return;
    }
    setError("Invalid credentials. Use demo@skillpulse.com / demo123 or continue as a demo student.");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-gradient-to-br from-brand-700 to-brand-500 p-10 text-primary-foreground lg:flex">
        <Link to="/" className="brightness-0 invert">
          <Logo />
        </Link>
        <div>
          <h2 className="text-3xl font-semibold leading-tight">
            Skill gaps, made visible.
          </h2>
          <p className="mt-3 max-w-sm text-sm opacity-90">
            Assess skills, compare them against simulated industry benchmarks, and get a
            prioritised learning path in seconds.
          </p>
          <ul className="mt-6 space-y-2 text-sm opacity-90">
            <li>· Rule-based gap analysis engine</li>
            <li>· Job matching with missing-skill breakdown</li>
            <li>· Institution-wide skill gap heatmap</li>
          </ul>
        </div>
        <p className="text-xs opacity-75">
          SIH26134 prototype · all data is simulated demo data.
        </p>
      </div>

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your SkillPulse workspace, or jump straight into demo mode.
          </p>

          <Card className="mt-6">
            <CardContent className="p-6">
              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail
                      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <Input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      className="pl-9"
                      placeholder="demo@skillpulse.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock
                      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <Input
                      id="login-password"
                      type="password"
                      autoComplete="current-password"
                      className="pl-9"
                      placeholder="demo123"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {error ? (
                  <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
                    {error}
                  </p>
                ) : null}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in…" : "Login"}
                  {!loading ? <ArrowRight className="size-4" aria-hidden="true" /> : null}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={loading}
                  onClick={() => enter("demo@skillpulse.com")}
                >
                  <PlayCircle className="size-4" aria-hidden="true" />
                  Continue as Demo Student
                </Button>
              </form>

              <p className="mt-4 rounded-md bg-brand-50 px-3 py-2 text-xs text-muted-foreground">
                Authentication is simulated with LocalStorage for this prototype. Demo
                credentials: demo@skillpulse.com / demo123.
              </p>
            </CardContent>
          </Card>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            <Link to="/" className="underline underline-offset-4 hover:text-foreground">
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
