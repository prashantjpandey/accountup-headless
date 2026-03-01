import { InsightCard } from "@/components/insights/InsightCard";
import { getResourcesInsightsPreview } from "@/lib/insights";

function InsightCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-black/10 bg-white/78 shadow-[0_20px_46px_-34px_rgba(15,23,42,0.34)]">
      <div className="aspect-[16/10] animate-pulse bg-[linear-gradient(180deg,#f7f4ff_0%,#f6efe9_100%)]" />
      <div className="space-y-4 p-6 md:p-7">
        <div className="flex gap-2">
          <div className="h-7 w-20 animate-pulse rounded-full bg-black/6" />
          <div className="h-7 w-24 animate-pulse rounded-full bg-black/6" />
        </div>
        <div className="h-8 w-5/6 animate-pulse rounded-2xl bg-black/6" />
        <div className="h-4 w-full animate-pulse rounded-full bg-black/6" />
        <div className="h-4 w-4/5 animate-pulse rounded-full bg-black/6" />
        <div className="flex gap-3 pt-2">
          <div className="h-4 w-28 animate-pulse rounded-full bg-black/6" />
          <div className="h-4 w-20 animate-pulse rounded-full bg-black/6" />
        </div>
      </div>
    </div>
  );
}

export function ResourcesInsightsPreviewSkeleton() {
  return (
    <div className="mt-8 grid gap-5 sm:gap-6 md:mt-10 md:grid-cols-2">
      <InsightCardSkeleton />
      <InsightCardSkeleton />
      <InsightCardSkeleton />
      <InsightCardSkeleton />
      <InsightCardSkeleton />
      <InsightCardSkeleton />
    </div>
  );
}

export async function ResourcesInsightsPreview() {
  const insights = await getResourcesInsightsPreview(6);

  if (insights.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 grid gap-5 sm:gap-6 md:mt-10 md:grid-cols-2">
      {insights.map((insight) => (
        <InsightCard key={insight.id} insight={insight} />
      ))}
    </div>
  );
}
