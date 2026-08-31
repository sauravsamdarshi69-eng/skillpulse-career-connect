import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import {
  ArrowRight,
  ClipboardCheck,
  GitCompareArrows,
  TrendingUp,
  Route as RouteIcon,
  Gauge,
  Trophy,
  Brain,
  Target,
  GraduationCap,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/skillpulse/Logo";
import { MeterBar } from "@/components/skillpulse/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillPulse — Bridge the Gap Between Skills and Industry Demand" },
      {
        name: "description",
        content:
          "SkillPulse maps student skills with evolving industry requirements to identify skill gaps and recommend personalized learning paths. SIH26134 prototype.",
      },
      {
        property: "og:title",
        content: "SkillPulse — Bridge the Gap Between Skills and Industry Demand",
      },
      {
        property: "og:description",
        content:
          "Skill assessment, AI-style gap analysis, industry demand mapping, learning paths and job readiness scoring in one dashboard.",
      },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  {
    icon: ClipboardCheck,
    title: "Skill Assessment",
    body: "Self-rate core technical and soft skills; scores instantly update your profile.",
  },
  {
    icon: GitCompareArrows,
    title: "AI Skill Gap Analysis",
    body: "Rule-based engine compares your levels against industry benchmarks per career.",
  },
  {
    icon: TrendingUp,
    title: "Industry Demand Mapping",
    body: "See which skills carry the highest simulated demand and growth signals.",
  },
  {
    icon: RouteIcon,
    title: "Personalized Learning Path",
    body: "A six-week roadmap generated from your prioritised gaps and resources.",
  },
  {
    icon: Gauge,
    title: "Job Readiness Score",
    body: "Weighted demo model: technical 70%, soft skills 20%, assessment 10%.",
  },
  {
    icon: Trophy,
    title: "Career Recommendations",
    body: "Ranked career fits with missing skills and job opportunities.",
  },
];

const STEPS = [
  { icon: GraduationCap, title: "Student Skills", body: "Assessment + profile captured." },
  { icon: Brain, title: "Analysis Engine", body: "Rule-based gap scoring." },
  { icon: Target, title: "Skill Gap", body: "Prioritised Critical → Low." },
  { icon: Trophy, title: "Career Guidance", body: "Learning path + job matches." },
];

function Landing() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="#home" className="transition-colors hover:text-foreground">
              Home
            </a>
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-foreground">
              How It Works
            </a>
            <a href="#about" className="transition-colors hover:text-foreground">
              About
            </a>
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="min-h-11 min-w-11 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
        {menuOpen ? (
          <div className="border-t border-border px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1 text-sm font-medium">
              {[
                ["#home", "Home"],
                ["#features", "Features"],
                ["#how-it-works", "How It Works"],
                ["#about", "About"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-2 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {label}
                </a>
              ))}
              <div className="mt-2 flex gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="flex-1" asChild>
                  <Link to="/login">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <section id="home" className="border-b border-border bg-brand-50/60">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <Badge variant="outline" className="border-brand-100 bg-background text-brand-700">
              SIH26134 · Skill–Industry Alignment · Prototype
            </Badge>
            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.9rem]">
              Bridge the Gap Between Skills and Industry Demand
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              SkillPulse intelligently maps student skills with evolving industry
              requirements to identify skill gaps and recommend personalized learning
              paths.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/login">
                  Get Started <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login" search={{ demo: true }}>
                  Explore Demo
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Demo credentials: <span className="font-medium">demo@skillpulse.com</span> /{" "}
              <span className="font-medium">demo123</span>
            </p>
          </div>

          <Card className="border-brand-100 shadow-sm">
            <CardContent className="p-5 sm:p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                How SkillPulse thinks
              </p>
              <div className="mt-4 space-y-3">
                {STEPS.map((step, i) => (
                  <div key={step.title} className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                      <step.icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        {i + 1}. {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-lg border border-border bg-muted/40 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">Sample readiness</span>
                  <span className="font-semibold text-brand-700">68%</span>
                </div>
                <MeterBar value={68} className="mt-2" />
                <p className="mt-2 text-xs text-muted-foreground">
                  Demo scoring model — technical 70%, soft skills 20%, assessment 10%.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Everything a skill-alignment platform needs
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Six working modules, all driven by local rule-based logic and clearly labelled
          demo datasets.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.title} className="h-full transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <span className="flex size-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                  <f.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            How it works
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Assess skills through a short interactive rating flow.",
              "Compare against simulated industry benchmarks per career track.",
              "Generate a prioritised six-week learning roadmap.",
              "Track job matches, readiness score and career fit.",
            ].map((text, i) => (
              <div
                key={text}
                className="rounded-xl border border-border bg-background p-5"
              >
                <span className="text-sm font-semibold text-brand-500">
                  Step {i + 1}
                </span>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              About this prototype
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Built for Smart India Hackathon problem statement{" "}
              <span className="font-medium text-foreground">SIH26134</span> — challenges in
              aligning skill development programs with industry requirements and emerging
              job market demands (Theme: Miscellaneous, Category: Software).
            </p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              {[
                "Student and institution dashboards with working interactions.",
                "Rule-based recommendation engine — no external AI service.",
                "All industry data is simulated and clearly labelled as demo data.",
                "State persists locally in your browser via LocalStorage.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-success"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Card className="bg-gradient-to-br from-brand-50 to-background">
            <CardContent className="p-6">
              <h3 className="text-base font-semibold text-foreground">
                Suggested 4-minute demo flow
              </h3>
              <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {[
                  "Demo login",
                  "Student dashboard",
                  "Skill assessment",
                  "Skill gap analysis",
                  "Generate learning path",
                  "Job match & careers",
                  "Institution dashboard & heatmap",
                ].map((s, i) => (
                  <li key={s}>
                    {i + 1}. {s}
                  </li>
                ))}
              </ol>
              <Button className="mt-5 w-full" asChild>
                <Link to="/login" search={{ demo: true }}>
                  Start the demo <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <Logo />
          <p>Prototype for SIH26134 · Simulated demo data only.</p>
        </div>
      </footer>
    </div>
  );
}
