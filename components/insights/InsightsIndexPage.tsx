import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { FeaturedInsightCard } from "@/components/insights/FeaturedInsightCard";
import { InsightCard } from "@/components/insights/InsightCard";
import { InsightsFilterBar } from "@/components/insights/InsightsFilterBar";
import { InsightsPagination } from "@/components/insights/InsightsPagination";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { InsightQueryParams, InsightsIndexData } from "@/lib/insights";

type InsightsIndexPageProps = {
  data: InsightsIndexData;
  queryParams: InsightQueryParams;
};

export function InsightsIndexPage({ data, queryParams }: InsightsIndexPageProps) {
  const showFeatured =
    !data.hasActiveFilters && queryParams.page === 1 && data.featuredInsights.length > 0;

  return (
    <div className="resources-page-flow">
      <section className="resources-hero-surface page-shell relative -mt-24 overflow-hidden pt-40 sm:-mt-28 sm:pt-44 md:-mt-32 md:pt-48">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_18%_14%,rgba(105,106,246,0.16)_0%,transparent_26%),radial-gradient(circle_at_82%_10%,rgba(205,117,34,0.12)_0%,transparent_24%),radial-gradient(circle_at_50%_88%,rgba(197,194,249,0.14)_0%,transparent_30%)]"
        />
        <div className="page-container">
          <div className="relative mx-auto max-w-4xl rounded-[2rem] border border-white/78 bg-white/70 px-6 py-12 text-center shadow-[0_24px_54px_-36px_rgba(15,23,42,0.34)] backdrop-blur-sm sm:px-8 md:px-12 md:py-16">
            <div className="flex justify-start">
              <Link
                href="/resources"
                className="text-sm font-semibold text-ink transition-colors duration-200 hover:text-purple sm:text-base"
              >
                Back to Resources
              </Link>
            </div>
            <p className="eyebrow-chip">Insights</p>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[3.2rem]">
              Startup finance insight, without the vague layer.
            </h1>
            <p className="mx-auto mt-5 max-w-[43.75rem] text-base leading-8 text-charcoal sm:text-lg">
              Practical articles on reporting quality, operating discipline, and the
              finance systems behind cleaner decisions.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild variant="primary" size="lg">
                <Link href="/contact">Talk to a Finance Expert</Link>
              </Button>
              <p className="text-sm font-semibold text-charcoal sm:text-base">
                {data.totalInsights} published insight{data.totalInsights === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-12 md:py-14">
        <div className="page-container">
          <InsightsFilterBar
            categoryOptions={data.categoryOptions}
            contentTypeOptions={data.contentTypeOptions}
          />

          {showFeatured ? (
            <div className="mt-10 md:mt-12">
              <SectionHeader
                title="Featured Insights"
                description="A smaller set of reads to start with if you want the sharpest operating signals first."
              />
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {data.featuredInsights.map((insight) => (
                  <FeaturedInsightCard key={insight.id} insight={insight} />
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-10 md:mt-12">
            <SectionHeader
              title={data.hasActiveFilters ? "Filtered Results" : "Latest Insights"}
              description={
                data.hasActiveFilters
                  ? "Results update from the active category, content type, review, and sort controls."
                  : "Browse the full archive by theme, content type, or expert review status."
              }
            />

            {data.insights.length > 0 ? (
              <>
                <div className="mt-8 grid gap-5 sm:gap-6 md:mt-10 md:grid-cols-2 xl:grid-cols-3">
                  {data.insights.map((insight) => (
                    <div key={insight.id} className="h-full">
                      <InsightCard insight={insight} />
                    </div>
                  ))}
                </div>
                <InsightsPagination
                  currentPage={data.currentPage}
                  totalPages={data.totalPages}
                  queryParams={queryParams}
                />
              </>
            ) : (
              <Card
                interactive={false}
                className="mt-8 border-black/10 bg-white/82 px-6 py-10 text-center shadow-[0_20px_46px_-34px_rgba(15,23,42,0.34)]"
              >
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                  No insights match these filters
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-charcoal">
                  Try removing one or more filters, or reset to the latest view to see
                  the full archive again.
                </p>
                <div className="mt-6 flex justify-center">
                  <Button asChild variant="secondary">
                    <Link href="/insights">Clear filters</Link>
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
