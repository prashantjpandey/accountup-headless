import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { getResourceByCategoryAndSlug, grantResources } from "@/lib/resources";

type GrantDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return grantResources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({
  params,
}: GrantDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceByCategoryAndSlug("grant", slug);

  if (!resource) {
    return {
      title: "Resource Not Found - Accountup",
    };
  }

  return {
    title: `${resource.title} - Accountup`,
    description: resource.description,
  };
}

export default async function GrantDetailPage({ params }: GrantDetailPageProps) {
  const { slug } = await params;
  const resource = getResourceByCategoryAndSlug("grant", slug);

  if (!resource) {
    notFound();
  }

  return (
    <section className="surface-default page-shell py-16 sm:py-20 md:py-24">
      <div className="page-container">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-black/8 bg-white/82 px-6 py-10 shadow-[0_20px_46px_-34px_rgba(15,23,42,0.34)] sm:px-8 md:px-10 md:py-12">
          <p className="eyebrow-chip">Grant Placeholder</p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {resource.title}
          </h1>
          <p className="mt-5 text-base leading-8 text-charcoal sm:text-lg">
            {resource.description}
          </p>
          <p className="mt-6 text-sm leading-7 text-charcoal sm:text-base">
            This resource is being prepared. If grant strategy or qualification is
            urgent, Accountup can help you assess it properly.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/#contact">Talk to a Finance Expert</Link>
            </Button>
            <Link
              href="/resources"
              className="text-sm font-semibold text-ink transition-colors duration-200 hover:text-purple sm:text-base"
            >
              Back to Resources
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
