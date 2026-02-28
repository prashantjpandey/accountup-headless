import { notFound, permanentRedirect } from "next/navigation";
import { getCalculatorResourceBySlug } from "@/lib/resources";

type ResourceShortcutPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ResourceShortcutPage({
  params,
}: ResourceShortcutPageProps) {
  const { slug } = await params;
  const calculator = getCalculatorResourceBySlug(slug);

  if (!calculator) {
    notFound();
  }

  permanentRedirect(`/resources/calculators/${calculator.slug}`);
}
