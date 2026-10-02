import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[opacity,transform,background-color,box-shadow,color] duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary min-h-11",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-fg shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-primary)_55%,transparent)] hover:opacity-92",
        ghost:
          "bg-transparent text-fg hover:bg-elevated",
        outline:
          "bg-transparent text-fg shadow-[inset_0_0_0_1px_var(--color-border)] hover:shadow-[inset_0_0_0_1px_var(--color-border-strong)] hover:bg-elevated",
        subtle:
          "bg-elevated text-fg hover:bg-surface",
      },
      size: {
        md: "rounded-md px-4 text-sm",
        sm: "min-h-9 rounded-sm px-3 text-sm",
        lg: "min-h-12 rounded-lg px-5 text-base",
        icon: "size-11 rounded-md p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
