import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-11 w-full rounded-md bg-elevated px-3 text-sm text-fg placeholder:text-subtle",
      "shadow-[inset_0_0_0_1px_var(--color-border)] outline-none",
      "transition-[box-shadow] duration-150",
      "focus-visible:shadow-[inset_0_0_0_1px_var(--color-primary)]",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
