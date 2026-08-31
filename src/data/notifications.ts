// DEMO DATA — simulated in-app notifications.

import type { LucideIcon } from "lucide-react";
import { Sparkles, AlertTriangle, CheckCircle2, Briefcase, TrendingUp } from "lucide-react";

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  tone: "info" | "warning" | "success";
  icon: LucideIcon;
}

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    title: "New skill recommendation",
    body: "Node.js added to your priority list for Full Stack Developer.",
    time: "2 min ago",
    tone: "info",
    icon: Sparkles,
  },
  {
    id: "n2",
    title: "Critical skill gap detected",
    body: "Node.js gap of 40 points against industry benchmark.",
    time: "1 hour ago",
    tone: "warning",
    icon: AlertTriangle,
  },
  {
    id: "n3",
    title: "Learning module completed",
    body: "Week 1 — Advanced JavaScript marked complete.",
    time: "Yesterday",
    tone: "success",
    icon: CheckCircle2,
  },
  {
    id: "n4",
    title: "New job match",
    body: "Frontend Developer at Nimbus Technologies — 88% match.",
    time: "2 days ago",
    tone: "info",
    icon: Briefcase,
  },
  {
    id: "n5",
    title: "Industry demand updated",
    body: "Generative AI demand index up 46% in the demo dataset.",
    time: "3 days ago",
    tone: "info",
    icon: TrendingUp,
  },
];
