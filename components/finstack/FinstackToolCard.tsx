import { ExternalLink, Layers3, Signal, Star, type LucideIcon } from "lucide-react";
import { FinstackProsConsDisclosure } from "@/components/finstack/FinstackProsConsDisclosure";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { FinstackTool } from "@/lib/finstack";

type FinstackToolCardProps = {
  tool: FinstackTool;
};

const CATEGORY_PILL_MAX_LENGTH = 26;
const sectionHeadingClassName =
  "text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/80";

function shortenCategoryLabel(category: string, maxLength = CATEGORY_PILL_MAX_LENGTH) {
  if (category.length <= maxLength) {
    return category;
  }

  const candidate = category.slice(0, maxLength - 3).trim();
  const lastSpace = candidate.lastIndexOf(" ");
  const shortened =
    lastSpace >= Math.floor(candidate.length * 0.65) ? candidate.slice(0, lastSpace) : candidate;

  return `${shortened.trim()}...`;
}

function getPricingValueClassName(pricingTier: string | null) {
  if (!pricingTier) {
    return "text-charcoal";
  }

  const normalizedPricing = pricingTier.trim().toLowerCase();

  if (!normalizedPricing || normalizedPricing === "unknown") {
    return "text-charcoal";
  }

  if (normalizedPricing.includes("low")) {
    return "text-emerald-700/75";
  }

  if (normalizedPricing.includes("mid") || normalizedPricing.includes("medium")) {
    return "text-amber-700/80";
  }

  if (
    normalizedPricing.includes("high") ||
    normalizedPricing.includes("enterprise") ||
    normalizedPricing.includes("custom")
  ) {
    return "text-rose-700/75";
  }

  return "text-charcoal";
}

function buildMetaItems(tool: FinstackTool) {
  const items: Array<{
    label: string;
    value: string;
    icon: LucideIcon;
    valueClassName?: string;
  }> = [];

  if (tool.pricingTier) {
    items.push({
      label: "Pricing",
      value: tool.pricingTier,
      icon: Layers3,
      valueClassName: getPricingValueClassName(tool.pricingTier),
    });
  }

  if (tool.complexity !== null) {
    items.push({ label: "Complexity", value: String(tool.complexity), icon: Signal });
  }

  if (tool.reviewSignals) {
    items.push({ label: "Reviews", value: tool.reviewSignals, icon: Star });
  }

  return items;
}

export function FinstackToolCard({ tool }: FinstackToolCardProps) {
  const integrations = tool.keyIntegrations.slice(0, 5);
  const remainingIntegrations = Math.max(0, tool.keyIntegrations.length - integrations.length);
  const metaItems = buildMetaItems(tool);
  const shortCategoryLabel = shortenCategoryLabel(tool.category);

  return (
    <Card className="flex flex-col p-6 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.24)] hover:shadow-[0_22px_44px_-34px_rgba(15,23,42,0.28)] md:p-7">
      <div className="flex items-start justify-between gap-4">
        <span
          title={tool.category}
          className="max-w-[13.5rem] min-w-0 truncate whitespace-nowrap rounded-full border border-purple/16 bg-purple/8 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-purple"
        >
          {shortCategoryLabel}
        </span>
        {tool.officialUrl ? (
          <Button
            href={tool.officialUrl}
            className="h-10 min-w-[7rem] shrink-0 px-4 text-xs"
          >
            <span className="inline-flex items-center gap-2">
              Website
              <ExternalLink size={14} />
            </span>
          </Button>
        ) : null}
      </div>

      <div className="mt-5 flex-1">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
          {tool.title}
        </h2>
        <p className="mt-2 text-sm font-medium text-charcoal/78">
          <span className="text-charcoal/66">Category:</span> {tool.category}
        </p>
        <p className="mt-3 text-sm leading-7 text-charcoal sm:text-[0.95rem]">
          {tool.shortDescription}
        </p>

        {tool.keyIntegrations.length > 0 ? (
          <div className="mt-6">
            <p className={sectionHeadingClassName}>Integrations</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {integrations.map((integration) => (
                <span
                  key={integration}
                  title={integration}
                  className="max-w-full truncate whitespace-nowrap rounded-full border border-black/8 bg-background px-3 py-1 text-xs font-medium text-ink"
                >
                  {integration}
                </span>
              ))}
              {remainingIntegrations > 0 ? (
                <span className="rounded-full border border-black/8 bg-background px-3 py-1 text-xs font-medium text-charcoal">
                  +{remainingIntegrations} more
                </span>
              ) : null}
            </div>
          </div>
        ) : null}

        {metaItems.length > 0 ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {metaItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-black/8 bg-background px-4 py-3"
                >
                  <div className={`flex items-center gap-2 ${sectionHeadingClassName}`}>
                    <Icon size={14} />
                    {item.label}
                  </div>
                  <p className={`mt-2 text-sm font-semibold ${item.valueClassName ?? "text-ink"}`}>
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        ) : null}

        {tool.notes ? (
          <div className="mt-6 rounded-2xl border border-primary/12 bg-primary/6 px-4 py-3">
            <p className={sectionHeadingClassName}>Notes</p>
            <p className="mt-2 text-sm leading-7 text-charcoal">{tool.notes}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-6 border-t border-black/6 pt-5">
        <FinstackProsConsDisclosure pros={tool.pros} cons={tool.cons} />
      </div>
    </Card>
  );
}
