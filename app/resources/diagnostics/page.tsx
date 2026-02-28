import type { Metadata } from "next";
import { ResourceSectionPage } from "@/components/ResourceSectionPage";
import { getRequiredResourceSectionById } from "@/lib/resources";

const section = getRequiredResourceSectionById("diagnostics");

export const metadata: Metadata = {
  title: `${section.pageTitle} - Accountup`,
  description: section.pageDescription,
};

export default function DiagnosticsPage() {
  return <ResourceSectionPage section={section} />;
}
