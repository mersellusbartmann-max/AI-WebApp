import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full px-3.5 text-sm font-medium transition-[background-color,color,box-shadow] duration-150",
        active
          ? "bg-primary text-primary-fg"
          : "bg-elevated text-muted shadow-[inset_0_0_0_1px_var(--color-border)] hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
