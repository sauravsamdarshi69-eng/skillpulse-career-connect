import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import * as React from "react";

import { AppShell } from "@/components/skillpulse/AppShell";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const { authed, hydrated } = useStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (hydrated && !authed) navigate({ to: "/login" });
  }, [hydrated, authed, navigate]);

  return (
    <AppShell variant="student">
      <Outlet />
    </AppShell>
  );
}
