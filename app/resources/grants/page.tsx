import type { Metadata } from "next";
import { GrantsDirectoryPage } from "@/components/grants/GrantsDirectoryPage";
import {
  getAllGrantDirectoryItems,
  getGrantBenefitTypeOptions,
  getGrantBusinessSizeOptions,
  getGrantRegionOptions,
} from "@/lib/grants";

type GrantsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "Government Grants & Incentives - Accountup",
  description:
    "Search the Accountup UK grants and incentives directory for active funding opportunities.",
};

export const revalidate = 300;

function getSingleSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function GrantsPage({ searchParams }: GrantsPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const grants = await getAllGrantDirectoryItems();
  const regionOptions = getGrantRegionOptions(grants);
  const sizeOptions = getGrantBusinessSizeOptions(grants);
  const benefitTypeOptions = getGrantBenefitTypeOptions(grants);

  return (
    <GrantsDirectoryPage
      grants={grants}
      regionOptions={regionOptions}
      sizeOptions={sizeOptions}
      benefitTypeOptions={benefitTypeOptions}
      initialQuery={getSingleSearchParam(resolvedSearchParams?.q).trim()}
      initialRegion={getSingleSearchParam(resolvedSearchParams?.region).trim()}
      initialSize={getSingleSearchParam(resolvedSearchParams?.size).trim()}
      initialType={getSingleSearchParam(resolvedSearchParams?.type).trim()}
      initialComplexity={getSingleSearchParam(resolvedSearchParams?.complexity).trim()}
    />
  );
}
