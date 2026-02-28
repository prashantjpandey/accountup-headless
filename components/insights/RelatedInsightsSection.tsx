import { SectionHeader } from "@/components/SectionHeader";
import { InsightCard } from "@/components/insights/InsightCard";
import type { Insight } from "@/lib/insights";

type RelatedInsightsSectionProps = {
  insights: Insight[];
};

export function RelatedInsightsSection({ insights }: RelatedInsightsSectionProps) {
  if (insights.length === 0) {
    return null;
  }

  return (
    <section className="page-shell py-12 md:py-14">
      <div className="page-container">
        <SectionHeader
          title="Related Insights"
          description="More reads connected by category overlap or the same operating pattern."
        />
        <div className="mt-8 grid gap-5 sm:gap-6 md:mt-10 md:grid-cols-2 xl:grid-cols-3">
          {insights.map((insight) => (
            <div key={insight.id} className="h-full">
              <InsightCard insight={insight} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
