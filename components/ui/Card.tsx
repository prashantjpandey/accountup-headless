import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "lavender" | "emphasized";
  interactive?: boolean;
};

const variantStyles = {
  default:
    "bg-white border-lavender-1/50 shadow-sm",
  lavender:
    "bg-lavender-1/20 border-lavender-2/60 shadow-sm",
  emphasized:
    "bg-white border-purple/30 shadow-md",
};

export function Card({
  variant = "default",
  interactive = true,
  className = "",
  children,
  ...props
}: CardProps) {
  const interactiveStyles = interactive
    ? "transition-[transform,box-shadow,border-color] duration-200 ease-out motion-reduce:transform-none hover:-translate-y-0.5 hover:shadow-md"
    : "";

  return (
    <div
      className={`rounded-xl border ${variantStyles[variant]} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
