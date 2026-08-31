import { createFileRoute, Outlet } from "@tanstack/react-router";

import { AppShell } from "@/components/skillpulse/AppShell";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <AppShell variant="admin">
      <Outlet />
    </AppShell>
  );
}
