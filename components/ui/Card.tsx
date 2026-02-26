import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "lavender" | "emphasized";
};

const variantStyles = {
  default:
    "bg-white border-lavender-1/50 shadow-sm hover:shadow-md hover:-translate-y-0.5",
  lavender:
    "bg-lavender-1/20 border-lavender-2/60 shadow-sm hover:shadow-md hover:-translate-y-0.5",
  emphasized:
    "bg-white border-purple/30 shadow-md hover:shadow-lg hover:-translate-y-0.5",
};

export function Card({
  variant = "default",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
