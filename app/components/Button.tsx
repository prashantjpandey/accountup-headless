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
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-[transform,background-color,color,border-color,box-shadow] duration-200 ease-out motion-reduce:transform-none motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-purple/25 focus:ring-offset-0";
  const sizeStyles: Record<ButtonSize, string> = {
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
  };
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-neutral-900 text-white shadow-sm hover:bg-neutral-800 hover:-translate-y-px hover:shadow-sm active:translate-y-0 active:shadow-sm",
    secondary:
      "border border-neutral-200 bg-white text-neutral-900 shadow-sm hover:border-neutral-300 hover:bg-neutral-50 hover:-translate-y-px hover:shadow-sm active:translate-y-0 active:shadow-sm",
    purple:
      "bg-purple text-white shadow-sm hover:bg-[#5f63ea] hover:-translate-y-px hover:shadow-sm active:translate-y-0 active:shadow-sm",
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
    >
      {children}
    </button>
  );
}
