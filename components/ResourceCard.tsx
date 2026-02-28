import Link from "next/link";
import { ResourceIcon } from "@/components/ResourceIcon";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { ResourceCategory, ResourceIconKey } from "@/lib/resources";

export type ResourceCardProps = {
  title: string;
  description: string;
  href: string;
  category: ResourceCategory;
  iconKey?: ResourceIconKey;
  variant?: "default" | "featured";
  linkLabel?: string;
};

export function ResourceCard({
  title,
  description,
  href,
  category,
  iconKey,
  variant = "default",
  linkLabel = "Open Tool",
}: ResourceCardProps) {
  const isCalculatorCard = href.startsWith("/resources/calculators/");

  return (
    <Card
      variant={variant === "featured" ? "emphasized" : "default"}
      className="group flex h-full flex-col p-6 md:p-7"
    >
      <div className="flex items-start gap-4">
        <ResourceIcon category={category} iconKey={iconKey} />
      </div>
      <div className="mt-6 flex flex-1 flex-col">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-charcoal sm:text-[0.95rem]">
          {description}
        </p>
        {isCalculatorCard ? (
          <div className="mt-7">
            <Button asChild size="md">
              <Link href={href}>{linkLabel}</Link>
            </Button>
          </div>
        ) : (
          <Link
            href={href}
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-purple transition-colors duration-200 hover:text-ink focus:outline-none focus:ring-2 focus:ring-purple/25 focus:ring-offset-2 focus:ring-offset-white"
          >
            <span>{linkLabel}</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        )}
      </div>
    </Card>
  );
}
