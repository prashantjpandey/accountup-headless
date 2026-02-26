"use client";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  href?: string;
  onClick?: () => void;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex h-12 items-center justify-center rounded-full px-6 font-medium transition-transform transition-colors transition-shadow duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-purple/25 focus:ring-offset-0";
  const primary =
    "bg-neutral-900 text-white shadow-sm hover:bg-neutral-800 hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-sm";
  const secondary =
    "border border-neutral-200 bg-white text-neutral-900 shadow-sm hover:border-neutral-300 hover:bg-neutral-50 hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-sm";

  const classes = `no-underline ${base} ${variant === "primary" ? primary : secondary} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
