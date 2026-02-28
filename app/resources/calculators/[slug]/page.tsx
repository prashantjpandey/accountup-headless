import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorCmsContentBlock } from "@/components/calculators/CalculatorCmsContent";
import { CalculatorPageShell } from "@/components/calculators/CalculatorPageShell";
import { getCalculatorCmsContent, getCalculatorMetadata, getSupportedCalculatorSlugs } from "@/lib/calculator-content";
import { getCalculatorElement } from "@/lib/calculator-registry";
import { getCalculatorResourceBySlug } from "@/lib/resources";

type CalculatorDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getSupportedCalculatorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CalculatorDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getCalculatorResourceBySlug(slug);

  if (!resource) {
    return {
      title: "Calculator Not Found",
    };
  }

  return getCalculatorMetadata(resource);
}

export default async function CalculatorDetailPage({
  params,
}: CalculatorDetailPageProps) {
  const { slug } = await params;
  const resource = getCalculatorResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const calculatorElement = getCalculatorElement(resource.slug);
  const cmsContent = await getCalculatorCmsContent(resource.slug);

  return (
    <CalculatorPageShell
      title={resource.title}
      description={resource.pageDescription}
      titleAs={cmsContent ? "p" : "h1"}
      content={
        cmsContent ? <CalculatorCmsContentBlock content={cmsContent} /> : null
      }
    >
      {calculatorElement}
    </CalculatorPageShell>
  );
}
