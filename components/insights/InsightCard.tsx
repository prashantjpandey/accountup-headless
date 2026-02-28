import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { formatDate, formatReadingTime } from "@/lib/format";
import { getInsightHref, type Insight } from "@/lib/insights";

type InsightCardProps = {
  insight: Insight;
};

export function InsightCard({ insight }: InsightCardProps) {
  const visibleCategories = insight.categories.slice(0, 2);
  const hiddenCategoryCount = Math.max(insight.categories.length - visibleCategories.length, 0);
  const formattedDate = formatDate(insight.publishDate);
  const formattedReadingTime = formatReadingTime(insight.readingTime);

  return (
    <Link href={getInsightHref(insight.routeSlug)} className="block h-full">
      <Card variant="default" className="group flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(180deg,#f7f4ff_0%,#f6efe9_100%)]">
          {insight.coverImageUrl ? (
            <Image
              src={insight.coverImageUrl}
              alt={insight.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(min-width: 1280px) 22rem, (min-width: 768px) 45vw, 100vw"
            />
          ) : (
            <div className="flex h-full items-end p-6">
              <span className="eyebrow-chip">Insight</span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-7">
          <div className="flex flex-wrap gap-2">
            {visibleCategories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-purple/16 bg-white/86 px-3 py-1 text-[0.72rem] font-semibold tracking-[0.02em] text-charcoal"
              >
                {category}
              </span>
            ))}
            {hiddenCategoryCount > 0 ? (
              <span className="rounded-full border border-black/10 bg-white/86 px-3 py-1 text-[0.72rem] font-semibold tracking-[0.02em] text-charcoal">
                +{hiddenCategoryCount}
              </span>
            ) : null}
          </div>

          <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
            {insight.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-charcoal sm:text-[0.95rem]">
            {insight.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-charcoal">
            {formattedDate ? <span>{formattedDate}</span> : null}
            {formattedDate && formattedReadingTime ? (
              <span className="text-black/20">/</span>
            ) : null}
            {formattedReadingTime ? <span>{formattedReadingTime}</span> : null}
            {insight.expertReviewed ? (
              <span className="rounded-full border border-purple/22 bg-purple/8 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-purple">
                Expert reviewed
              </span>
            ) : null}
          </div>
        </div>
      </Card>
    </Link>
  );
}
