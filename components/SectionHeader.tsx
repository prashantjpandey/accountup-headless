import Link from "next/link";

export type SectionHeaderProps = {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
};

export function SectionHeader({
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.1rem]">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-xl text-sm leading-7 text-charcoal sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="group shrink-0 pt-1 text-sm font-semibold text-ink transition-colors duration-200 hover:text-purple"
        >
          <span className="inline-flex items-center gap-2">
            <span>{action.label}</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </span>
        </Link>
      ) : null}
    </div>
  );
}
