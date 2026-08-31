import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-primary-foreground">
        <Activity className="size-4.5" aria-hidden="true" />
      </span>
      <span className="text-lg font-semibold tracking-tight text-foreground">
        Skill<span className="text-brand-500">Pulse</span>
      </span>
    </span>
  );
}
