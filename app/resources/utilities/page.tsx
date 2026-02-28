import type { Metadata } from "next";
import { ResourceSectionPage } from "@/components/ResourceSectionPage";
import { getRequiredResourceSectionById } from "@/lib/resources";

const section = getRequiredResourceSectionById("utilities");

export const metadata: Metadata = {
  title: `${section.pageTitle} - Accountup`,
  description: section.pageDescription,
};

export default function UtilitiesPage() {
  return <ResourceSectionPage section={section} />;
}
