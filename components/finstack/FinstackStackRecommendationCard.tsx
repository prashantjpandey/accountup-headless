"use client";

import { ChevronDown, ExternalLink, Layers3, Signal, Star } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { CategoryRecommendation } from "@/lib/finstack-stack-builder";

type FinstackStackRecommendationCardProps = {
  recommendation: CategoryRecommendation;
};

const sectionHeadingClassName =
  "text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/80";

function getPricingValueClassName(pricingTier: string | null) {
  const normalizedPricing = pricingTier?.trim().toLowerCase() ?? "";

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

export function FinstackStackRecommendationCard({
  recommendation,
}: FinstackStackRecommendationCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();
  const hasAlternatives = recommendation.alternatives.length > 0 && recommendation.state === "recommended";

  return (
    <Card className="flex flex-col p-6 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.24)] md:p-7">
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full border border-purple/16 bg-purple/8 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-purple">
          {recommendation.category}
        </span>
        {recommendation.tool?.officialUrl ? (
          <Button href={recommendation.tool.officialUrl} className="h-10 min-w-[7rem] shrink-0 px-4 text-xs">
            <span className="inline-flex items-center gap-2">
              Website
              <ExternalLink size={14} />
            </span>
          </Button>
        ) : null}
      </div>

      <div className="mt-5 flex-1">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
          {recommendation.displayTitle}
        </h2>
        {recommendation.tool?.shortDescription ? (
          <p className="mt-3 text-sm leading-7 text-charcoal sm:text-[0.95rem]">
            {recommendation.tool.shortDescription}
          </p>
        ) : null}

        {recommendation.note ? (
          <div className="mt-5 rounded-2xl border border-primary/12 bg-primary/6 px-4 py-3">
            <p className={sectionHeadingClassName}>
              {recommendation.state === "no-strong-match" ? "Recommendation note" : "Context"}
            </p>
            <p className="mt-2 text-sm leading-7 text-charcoal">{recommendation.note}</p>
          </div>
        ) : null}

        {recommendation.whyThis.length > 0 ? (
          <div className="mt-6">
            <p className={sectionHeadingClassName}>Why this fits</p>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-charcoal">
              {recommendation.whyThis.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-purple">
                    +
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {recommendation.watchOut ? (
          <div className="mt-6">
            <p className={sectionHeadingClassName}>Watch out</p>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-charcoal">
              <li className="flex gap-2">
                <span aria-hidden="true" className="text-primary">
                  -
                </span>
                <span>{recommendation.watchOut}</span>
              </li>
            </ul>
          </div>
        ) : null}

        {(recommendation.metadata.pricingTier ||
          recommendation.metadata.complexity !== null ||
          recommendation.metadata.reviewSignals) &&
        recommendation.state !== "no-strong-match" ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {recommendation.metadata.pricingTier ? (
              <div className="rounded-2xl border border-black/8 bg-background px-4 py-3">
                <div className={`flex items-center gap-2 ${sectionHeadingClassName}`}>
                  <Layers3 size={14} />
                  Pricing
                </div>
                <p
                  className={`mt-2 text-sm font-semibold ${getPricingValueClassName(
                    recommendation.metadata.pricingTier,
                  )}`}
                >
                  {recommendation.metadata.pricingTier}
                </p>
              </div>
            ) : null}
            {recommendation.metadata.complexity !== null ? (
              <div className="rounded-2xl border border-black/8 bg-background px-4 py-3">
                <div className={`flex items-center gap-2 ${sectionHeadingClassName}`}>
                  <Signal size={14} />
                  Complexity
                </div>
                <p className="mt-2 text-sm font-semibold text-ink">
                  {recommendation.metadata.complexity}
                </p>
              </div>
            ) : null}
            {recommendation.metadata.reviewSignals ? (
              <div className="rounded-2xl border border-black/8 bg-background px-4 py-3">
                <div className={`flex items-center gap-2 ${sectionHeadingClassName}`}>
                  <Star size={14} />
                  Reviews
                </div>
                <p className="mt-2 text-sm font-semibold text-ink">
                  {recommendation.metadata.reviewSignals}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}

        {recommendation.state === "no-strong-match" && recommendation.alternatives.length > 0 ? (
          <div className="mt-6 rounded-2xl border border-black/8 bg-background px-4 py-4">
            <p className={sectionHeadingClassName}>Closest matches</p>
            <div className="mt-4 space-y-4">
              {recommendation.alternatives.map((alternative) => (
                <div key={alternative.tool.id} className="rounded-2xl border border-black/6 bg-white px-4 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-ink">{alternative.tool.title}</p>
                      <p className="mt-2 text-sm leading-7 text-charcoal">{alternative.rationale}</p>
                    </div>
                    {alternative.tool.officialUrl ? (
                      <Button href={alternative.tool.officialUrl} className="h-10 min-w-[6.5rem] px-4 text-xs">
                        Website
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {hasAlternatives ? (
        <div className="mt-6 border-t border-black/6 pt-5">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={contentId}
            onClick={() => setIsOpen((current) => !current)}
            className="flex w-full items-center justify-between text-left text-sm font-semibold text-ink transition-colors duration-200 hover:text-purple focus:outline-none focus:ring-2 focus:ring-purple/30 focus:ring-offset-0"
          >
            <span>{isOpen ? "Hide alternatives" : "See alternatives"}</span>
            <ChevronDown
              size={16}
              aria-hidden="true"
              className={`text-charcoal transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen ? (
            <div id={contentId} className="mt-4 space-y-4">
              {recommendation.alternatives.map((alternative) => (
                <div key={alternative.tool.id} className="rounded-2xl border border-black/8 bg-background px-4 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-ink">{alternative.tool.title}</p>
                      <p className="mt-2 text-sm leading-7 text-charcoal">{alternative.rationale}</p>
                    </div>
                    {alternative.tool.officialUrl ? (
                      <Button href={alternative.tool.officialUrl} className="h-10 min-w-[6.5rem] px-4 text-xs">
                        Website
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
}
