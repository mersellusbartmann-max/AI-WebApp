import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-36 w-full rounded-lg bg-elevated px-3 py-3 text-sm leading-relaxed text-fg placeholder:text-subtle",
      "shadow-[inset_0_0_0_1px_var(--color-border)] outline-none resize-y",
      "transition-[box-shadow] duration-150",
      "focus-visible:shadow-[inset_0_0_0_1px_var(--color-primary)]",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
