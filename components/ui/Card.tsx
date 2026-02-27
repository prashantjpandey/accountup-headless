import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "lavender" | "emphasized";
  interactive?: boolean;
};

const variantStyles = {
  default:
    "border-black/10 bg-white/78 shadow-[0_20px_46px_-34px_rgba(15,23,42,0.34)]",
  lavender:
    "border-purple/15 bg-white/62 shadow-[0_20px_46px_-34px_rgba(15,23,42,0.34)] backdrop-blur-xl",
  emphasized:
    "border-purple/30 bg-white/85 shadow-[0_24px_52px_-34px_rgba(15,23,42,0.38)]",
};

export function Card({
  variant = "default",
  interactive = true,
  className = "",
  children,
  ...props
}: CardProps) {
  const interactiveStyles = interactive
    ? "transition-[transform,box-shadow,border-color] duration-200 ease-out motion-reduce:transform-none hover:-translate-y-0.5 hover:shadow-[0_26px_58px_-34px_rgba(15,23,42,0.42)]"
    : "";

  return (
    <div
      className={`rounded-3xl border ${variantStyles[variant]} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
