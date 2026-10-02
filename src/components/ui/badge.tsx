import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-elevated px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-ice",
        "shadow-[inset_0_0_0_1px_var(--color-border)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
