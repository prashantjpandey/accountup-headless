import { permanentRedirect } from "next/navigation";
import { normalizeRouteSlug } from "@/lib/insights";

type InsightDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function InsightDetailPage({
  params,
}: InsightDetailPageProps) {
  const { slug } = await params;
  permanentRedirect(`/insights/${normalizeRouteSlug(slug)}`);
}
