import * as React from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Search,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  ListChecks,
  ClipboardCheck,
  GitCompareArrows,
  Route as RouteIcon,
  Briefcase,
  TrendingUp,
  Trophy,
  User,
  Building2,
  Users,
  Grid3x3,
  BookOpen,
  FileBarChart,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/skillpulse/Logo";
import { useStore } from "@/lib/store";
import { NOTIFICATIONS } from "@/data/notifications";

interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

const STUDENT_NAV: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "My Skills", to: "/dashboard/skills", icon: ListChecks },
  { label: "Skill Assessment", to: "/dashboard/assessment", icon: ClipboardCheck },
  { label: "Skill Gap", to: "/dashboard/skill-gap", icon: GitCompareArrows },
  { label: "Learning Path", to: "/dashboard/learning-path", icon: RouteIcon },
  { label: "Job Match", to: "/dashboard/jobs", icon: Briefcase },
  { label: "Industry Trends", to: "/dashboard/trends", icon: TrendingUp },
  { label: "Careers", to: "/dashboard/careers", icon: Trophy },
  { label: "Progress", to: "/dashboard/progress", icon: FileBarChart },
  { label: "Profile", to: "/dashboard/profile", icon: User },
];

const ADMIN_NAV: NavItem[] = [
  { label: "Overview", to: "/admin", icon: LayoutDashboard },
  { label: "Students", to: "/admin/students", icon: Users },
  { label: "Skill Gaps", to: "/admin/skill-gaps", icon: Grid3x3 },
  { label: "Industry Demand", to: "/admin/industry-demand", icon: TrendingUp },
  { label: "Courses", to: "/admin/courses", icon: BookOpen },
  { label: "Reports", to: "/admin/reports", icon: FileBarChart },
];

function NavList({ items, onNavigate }: { items: NavItem[]; onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const active =
          pathname === item.to ||
          (item.to !== "/dashboard" && item.to !== "/admin" && pathname.startsWith(item.to));
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-brand-100 text-brand-700"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <item.icon className="size-4" aria-hidden="true" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({
  children,
  variant = "student",
}: {
  children: React.ReactNode;
  variant?: "student" | "admin";
}) {
  const { student, logout } = useStore();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const items = variant === "admin" ? ADMIN_NAV : STUDENT_NAV;

  const results = query.trim()
    ? [...STUDENT_NAV, ...ADMIN_NAV].filter((i) =>
        i.label.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : [];

  const handleLogout = () => {
    logout();
    toast.success("Logged out of the demo session");
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar px-4 py-5 lg:flex">
        <Link to="/" className="px-1">
          <Logo />
        </Link>
        <p className="mt-1 px-1 text-xs text-muted-foreground">
          {variant === "admin" ? "Institution console" : "Student workspace"}
        </p>
        <div className="mt-6 flex-1 overflow-y-auto">
          <NavList items={items} />
          <div className="mt-6 border-t border-sidebar-border pt-4">
            <Link
              to={variant === "admin" ? "/dashboard" : "/admin"}
              className="flex items-center justify-between rounded-lg bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-100"
            >
              <span className="flex items-center gap-2">
                <Building2 className="size-4" aria-hidden="true" />
                {variant === "admin" ? "Student view" : "Institution view"}
              </span>
              <ChevronRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <Button variant="ghost" className="justify-start gap-2" onClick={handleLogout}>
          <LogOut className="size-4" aria-hidden="true" />
          Logout
        </Button>
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-foreground/30"
            onClick={() => setOpen(false)}
          />
          <div className="relative flex h-full w-72 flex-col border-r border-sidebar-border bg-sidebar px-4 py-5">
            <div className="flex items-center justify-between">
              <Logo />
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close navigation"
                className="min-h-11 min-w-11"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
            <div className="mt-6 flex-1 overflow-y-auto">
              <NavList items={items} onNavigate={() => setOpen(false)} />
              <div className="mt-6 border-t border-sidebar-border pt-4">
                <Link
                  to={variant === "admin" ? "/dashboard" : "/admin"}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700"
                >
                  <Building2 className="size-4" aria-hidden="true" />
                  {variant === "admin" ? "Student view" : "Institution view"}
                </Link>
              </div>
            </div>
            <Button variant="ghost" className="justify-start gap-2" onClick={handleLogout}>
              <LogOut className="size-4" aria-hidden="true" />
              Logout
            </Button>
          </div>
        </div>
      ) : null}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation"
            className="min-h-11 min-w-11 lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </Button>

          <div className="relative w-full max-w-sm">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages, skills, jobs…"
              className="pl-9"
              aria-label="Search"
            />
            {results.length ? (
              <div className="absolute left-0 right-0 top-11 z-40 overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
                {results.slice(0, 6).map((r) => (
                  <Link
                    key={r.to + r.label}
                    to={r.to}
                    onClick={() => setQuery("")}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted"
                  >
                    <r.icon className="size-4 text-brand-500" aria-hidden="true" />
                    {r.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <div className="ml-auto flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative min-h-11 min-w-11"
                  aria-label="Notifications"
                >
                  <Bell className="size-5" />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  Notifications
                  <Badge variant="secondary">Demo</Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {NOTIFICATIONS.map((n) => (
                  <DropdownMenuItem key={n.id} className="flex items-start gap-2 py-2">
                    <n.icon
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        n.tone === "warning"
                          ? "text-warning"
                          : n.tone === "success"
                            ? "text-success"
                            : "text-brand-500",
                      )}
                      aria-hidden="true"
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-foreground">
                        {n.title}
                      </span>
                      <span className="block text-xs text-muted-foreground">{n.body}</span>
                      <span className="block text-[11px] text-muted-foreground">{n.time}</span>
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                    {variant === "admin" ? "AD" : student.name.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="hidden text-left sm:block">
                    <span className="block text-sm font-medium leading-tight text-foreground">
                      {variant === "admin" ? "Institution Admin" : student.name}
                    </span>
                    <span className="block text-xs leading-tight text-muted-foreground">
                      {variant === "admin" ? "Demo Institute of Technology" : student.branch}
                    </span>
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>Demo account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/progress">Progress</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1400px] space-y-6 px-4 py-6 sm:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
