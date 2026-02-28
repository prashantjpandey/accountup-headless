import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightDetailPage } from "@/components/insights/InsightDetailPage";
import {
  getInsightByRouteSlug,
  getInsightRelatedCalculatorCta,
  getInsightRelatedCalculators,
  getRelatedInsights,
} from "@/lib/insights";

type InsightDetailRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: InsightDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsightByRouteSlug(slug);

  if (!insight) {
    return {
      title: "Insight Not Found - Accountup",
      description: "The insight you requested could not be found.",
    };
  }

  return {
    title: `${insight.seoTitle ?? insight.title} - Accountup`,
    description: insight.seoDescription ?? insight.excerpt,
  };
}

export default async function InsightDetailRoute({
  params,
}: InsightDetailRouteProps) {
  const { slug } = await params;
  const insight = await getInsightByRouteSlug(slug);

  if (!insight) {
    notFound();
  }

  const [relatedInsights, relatedCalculatorCta, relatedCalculators] = await Promise.all([
    getRelatedInsights(insight),
    getInsightRelatedCalculatorCta(insight),
    getInsightRelatedCalculators(insight),
  ]);

  return (
    <InsightDetailPage
      insight={insight}
      relatedInsights={relatedInsights}
      relatedCalculatorCta={relatedCalculatorCta}
      relatedCalculators={relatedCalculators}
    />
  );
}
