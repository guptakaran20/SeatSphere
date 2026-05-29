import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "lg";
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-md hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring",
  outline:
    "border border-white/20 bg-transparent text-white hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-ring",
  ghost: "text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-ring",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-10 px-4 py-2 text-sm",
  lg: "h-11 px-6 py-2.5 text-sm",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
