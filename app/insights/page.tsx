import type { Metadata } from "next";
import { InsightsIndexPage } from "@/components/insights/InsightsIndexPage";
import { getInsightsIndexData, parseInsightSearchParams } from "@/lib/insights";

type InsightsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "Insights - Accountup",
  description:
    "Practical startup finance insights on reporting quality, operating discipline, and cleaner decision-making.",
};

export default async function InsightsPage({ searchParams }: InsightsPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const queryParams = parseInsightSearchParams(resolvedSearchParams);
  const data = await getInsightsIndexData(queryParams);

  return <InsightsIndexPage data={data} queryParams={queryParams} />;
}
