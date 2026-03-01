import type { Metadata } from "next";
import { FinstackDirectoryPage } from "@/components/finstack/FinstackDirectoryPage";
import { getAllFinstackTools, getFinstackCategoryOptions } from "@/lib/finstack";

type FinstackPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "FinStack UK - Accountup",
  description: "Curated finance and accounting tools for UK startups and SMEs, sourced from Wix CMS.",
};

export const revalidate = 300;

function getSingleSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function FinstackPage({ searchParams }: FinstackPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const tools = await getAllFinstackTools();
  const categories = getFinstackCategoryOptions(tools);
  const initialQuery = getSingleSearchParam(resolvedSearchParams?.q).trim();
  const initialCategory = getSingleSearchParam(resolvedSearchParams?.category).trim();

  return (
    <FinstackDirectoryPage
      tools={tools}
      categories={categories}
      initialQuery={initialQuery}
      initialCategory={initialCategory}
    />
  );
}
