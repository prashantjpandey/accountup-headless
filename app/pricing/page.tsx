import type { Metadata } from "next";
import { PricingExperience } from "@/components/pricing/PricingExperience";

export const metadata: Metadata = {
  title: "Pricing - Accountup",
  description:
    "Transparent modular finance pricing based on expenses, team size, and service modules.",
};

type ModuleKey = "bookkeeping" | "compliance" | "reporting";

type PricingPageProps = {
  searchParams?: Promise<{
    module?: string | string[];
  }>;
};

function getInitialModule(moduleValue?: string | string[]): ModuleKey {
  const value = Array.isArray(moduleValue) ? moduleValue[0] : moduleValue;

  if (value === "compliance" || value === "reporting" || value === "bookkeeping") {
    return value;
  }

  return "bookkeeping";
}

export default async function PricingPage({ searchParams }: PricingPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const initialModule = getInitialModule(resolvedSearchParams?.module);

  return <PricingExperience initialModule={initialModule} />;
}
