import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/CTASection";
import {
  ResourcesInsightsPreview,
  ResourcesInsightsPreviewSkeleton,
} from "@/components/insights/ResourcesInsightsPreview";
import { SectionHeader } from "@/components/SectionHeader";
import { ResourceSectionGrid } from "@/components/ResourceSectionGrid";
import { Card } from "@/components/ui/Card";
import { resourceSections } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Resources - Accountup",
  description:
    "Explore Accountup tools, diagnostics, grants, case studies, and insights for sharper startup finance decisions.",
};

export const revalidate = 300;

export default function ResourcesPage() {
  const calculators = resourceSections[0];
  const diagnostics = resourceSections[1];
  const utilities = resourceSections[2];
  const grants = resourceSections[3];
  const insights = resourceSections[5];

  return (
    <div className="resources-page-flow">
      <section className="resources-hero-surface page-shell relative -mt-24 overflow-hidden pt-40 sm:-mt-28 sm:pt-44 md:-mt-32 md:pt-48">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_18%_14%,rgba(105,106,246,0.16)_0%,transparent_26%),radial-gradient(circle_at_82%_10%,rgba(205,117,34,0.12)_0%,transparent_24%),radial-gradient(circle_at_50%_88%,rgba(197,194,249,0.14)_0%,transparent_30%)]"
        />
        <div className="page-container">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.4rem] border border-white/72 bg-white/72 px-6 py-12 text-center shadow-[0_30px_70px_-40px_rgba(15,23,42,0.36)] backdrop-blur-xl sm:px-8 md:px-12 md:py-16">
            <div
              aria-hidden="true"
              className="absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(105,106,246,0.28),rgba(205,117,34,0.18),transparent)]"
            />
            <p className="eyebrow-chip">Resources Hub</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-charcoal/80">
              <span className="rounded-full border border-black/8 bg-white/76 px-3 py-1">Calculators</span>
              <span className="rounded-full border border-black/8 bg-white/76 px-3 py-1">Diagnostics</span>
              <span className="rounded-full border border-black/8 bg-white/76 px-3 py-1">FinStack UK</span>
              <span className="rounded-full border border-black/8 bg-white/76 px-3 py-1">Grants</span>
              <span className="rounded-full border border-black/8 bg-white/76 px-3 py-1">Insights</span>
            </div>
            <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[3.8rem]">
              Startup Finance Toolkit
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-charcoal sm:text-lg">
              Sharper tools, cleaner breakdowns, and practical finance guidance for founders who
              need answers before small issues turn into expensive decisions.
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild variant="primary" size="lg">
                <Link href="/#contact">Talk to a Finance Expert</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ResourceSectionGrid
        id={calculators.id}
        title={calculators.title}
        description={calculators.description}
        items={calculators.items}
        viewAllHref={calculators.href}
      />

      <ResourceSectionGrid
        id={diagnostics.id}
        title={diagnostics.title}
        description={diagnostics.description}
        items={diagnostics.items}
        viewAllHref={diagnostics.href}
      />

      <ResourceSectionGrid
        id={utilities.id}
        title={utilities.title}
        description={utilities.description}
        items={utilities.items}
        viewAllHref={utilities.href}
      />

      <section className="page-shell py-10 sm:py-12 md:py-14">
        <div className="page-container">
          <Card
            interactive={false}
            variant="emphasized"
            className="overflow-hidden border-purple/24 bg-[radial-gradient(circle_at_top_left,rgba(105,106,246,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(205,117,34,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,255,255,0.9))] p-6 md:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-end">
              <div className="max-w-3xl">
                <p className="eyebrow-chip">FinStack UK</p>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.2rem]">
                  Curated Finance &amp; Accounting Tools for Startups / SMEs
                </h2>
                <p className="mt-4 text-base leading-8 text-charcoal">
                  Explore a sharper finance tools directory built for startups and SMEs. Compare
                  systems by category, surface stronger-fit options, and move toward a cleaner
                  operating stack with more confidence.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-purple/16 bg-white/86 px-5 py-5 shadow-[0_20px_50px_-34px_rgba(15,23,42,0.28)]">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/80">
                  What you&apos;ll find
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-charcoal">
                  <li>Category-by-category finance tools relevant to startup and SME operators.</li>
                  <li>Practical recommendations for shaping a cleaner finance stack.</li>
                  <li>Clearer comparisons before you commit to new systems.</li>
                </ul>
                <div className="mt-6">
                  <Button asChild variant="primary">
                    <Link href="/finstack">Open FinStack UK</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section
        id={grants.id}
        className="page-shell scroll-mt-24 py-10 sm:py-12 md:py-14 md:scroll-mt-28"
      >
        <div className="page-container">
          <div className="max-w-5xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.1rem]">
              UK Business Grants & Incentives Directory
            </h2>
            <p className="mt-3 text-sm leading-7 text-charcoal sm:text-base">
              Search the live Accountup grants directory for active UK grants, subsidies, and tax
              incentives. Filter by region, size, and benefit type to focus on the schemes worth
              pursuing.
            </p>
          </div>
          <Card
            interactive={false}
            className="mt-8 overflow-hidden border-primary/16 bg-white/82 p-6 md:mt-10 md:p-8"
          >
            <div className="max-w-3xl">
              <p className="eyebrow-chip">Funding Directory</p>
              <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.2rem]">
                Find support that fits your business.
              </h3>
              <p className="mt-4 text-base leading-8 text-charcoal">
                Search the grants directory with practical filters for region, company size,
                benefit type, and application complexity. Open each grant to review documents,
                timing, match funding, and common rejection risks.
              </p>
              <div className="mt-6">
                <Button asChild variant="primary">
                  <Link href="/resources/grants">
                    Open Grants Directory
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section
        id={insights.id}
        className="page-shell scroll-mt-24 py-10 sm:py-12 md:py-14 md:scroll-mt-28"
      >
        <div className="page-container">
          <SectionHeader
            title={insights.title}
            description={insights.description}
            action={{
              label: "View all",
              href: insights.href,
            }}
          />
          <Card
            interactive={false}
            variant="lavender"
            className="mt-8 overflow-hidden border-purple/16 bg-white/78 p-6 md:mt-10 md:p-8"
          >
            <h3 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.2rem]">
              Financial mistakes are predictable. Avoid them early.
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-8 text-charcoal">
              These breakdowns unpack the real reasons startups collapse, from burn misreads to
              compliance slippage, so you can make cleaner operating decisions before problems
              compound.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="primary">
                <Link href={insights.href}>Browse Insights</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/contact">Talk to a Finance Expert</Link>
              </Button>
            </div>
          </Card>
          <Suspense fallback={<ResourcesInsightsPreviewSkeleton />}>
            <ResourcesInsightsPreview />
          </Suspense>
        </div>
      </section>

      <CTASection
        headline="Tools are useful. Strategy is better."
        subheadline="If these raised questions, let's answer them properly."
        primaryCTA={{ label: "Talk to a Finance Expert", href: "/#contact" }}
      />
    </div>
  );
}
