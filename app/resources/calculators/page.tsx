import type { Metadata } from "next";
import { ResourceSectionPage } from "@/components/ResourceSectionPage";
import { getRequiredResourceSectionById } from "@/lib/resources";

const section = getRequiredResourceSectionById("calculators");

export const metadata: Metadata = {
  title: `${section.pageTitle} - Accountup`,
  description: section.pageDescription,
};

export default function CalculatorsPage() {
  return (
    <ResourceSectionPage
      section={section}
      backHref="/resources"
      backLabel="Back to all resources"
    />
  );
}
