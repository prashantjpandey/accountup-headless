"use client";

import { cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "purple";
type ButtonSize = "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

export function Button({
  children,
  asChild = false,
  variant = "primary",
  size = "md",
  className = "",
  href,
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-semibold tracking-[-0.01em] transition-[transform,background-color,color,border-color,box-shadow] duration-200 ease-out motion-reduce:transform-none motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-purple/25 focus:ring-offset-0";
  const sizeStyles: Record<ButtonSize, string> = {
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-sm sm:text-base",
  };
  const purpleButtonStyle =
    "border border-purple/70 bg-purple text-white shadow-[0_10px_26px_-18px_rgba(59,64,197,0.68)] hover:bg-[#5f63ea] hover:border-[#5f63ea] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-18px_rgba(59,64,197,0.72)] active:translate-y-0 active:shadow-[0_8px_20px_-16px_rgba(59,64,197,0.6)]";

  const variantStyles: Record<ButtonVariant, string> = {
    primary: purpleButtonStyle,
    secondary: purpleButtonStyle,
    purple: purpleButtonStyle,
  };

  const classes = `no-underline ${base} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim();

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    const childClassName = child.props.className ?? "";
    return cloneElement(child, {
      className: `${classes} ${childClassName}`.trim(),
    });
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
