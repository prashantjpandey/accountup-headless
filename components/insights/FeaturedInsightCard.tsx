import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { formatDate, formatReadingTime } from "@/lib/format";
import { getInsightHref, type Insight } from "@/lib/insights";

type FeaturedInsightCardProps = {
  insight: Insight;
};

export function FeaturedInsightCard({ insight }: FeaturedInsightCardProps) {
  const formattedDate = formatDate(insight.publishDate);
  const formattedReadingTime = formatReadingTime(insight.readingTime);

  return (
    <Link href={getInsightHref(insight.routeSlug)} className="block h-full">
      <Card
        variant="emphasized"
        className="group grid h-full overflow-hidden md:grid-cols-[1.15fr_1fr]"
      >
        <div className="relative min-h-64 overflow-hidden bg-[linear-gradient(180deg,#f7f4ff_0%,#f6efe9_100%)]">
          {insight.coverImageUrl ? (
            <Image
              src={insight.coverImageUrl}
              alt={insight.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(min-width: 768px) 32rem, 100vw"
            />
          ) : (
            <div className="flex h-full items-end p-6">
              <span className="eyebrow-chip">Featured Insight</span>
            </div>
          )}
        </div>

        <div className="flex flex-col p-6 md:p-8">
          <div className="flex flex-wrap gap-2">
            {insight.categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-purple/16 bg-white/86 px-3 py-1 text-[0.72rem] font-semibold tracking-[0.02em] text-charcoal"
              >
                {category}
              </span>
            ))}
          </div>

          <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink">
            {insight.title}
          </h3>

          <p className="mt-4 text-base leading-8 text-charcoal">
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
