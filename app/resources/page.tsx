import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/CTASection";
import { ResourceSectionGrid } from "@/components/ResourceSectionGrid";
import { resourceSections } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Resources - Accountup",
  description:
    "Explore Accountup tools, diagnostics, grants, case studies, and insights for sharper startup finance decisions.",
};

export default function ResourcesPage() {
  const calculators = resourceSections[0];
  const diagnostics = resourceSections[1];
  const utilities = resourceSections[2];
  const grants = resourceSections[3];
  const caseStudies = resourceSections[4];
  const insights = resourceSections[5];

  return (
    <>
      <section className="resources-hero-surface page-shell relative overflow-hidden py-16 sm:py-20 md:py-24">
        <div className="page-container">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/78 bg-white/70 px-6 py-12 text-center shadow-[0_24px_54px_-36px_rgba(15,23,42,0.34)] backdrop-blur-sm sm:px-8 md:px-12 md:py-16">
            <p className="eyebrow-chip">Resources Hub</p>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[3.5rem]">
              Startup Finance Toolkit
            </h1>
            <p className="mx-auto mt-5 max-w-[43.75rem] text-base leading-8 text-charcoal sm:text-lg">
              Tools, frameworks, and breakdowns to help you make better financial
              decisions before they become expensive mistakes.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild variant="primary" size="lg">
                <Link href="#calculators">Explore Tools {"->"}</Link>
              </Button>
              <Link
                href="/#contact"
                className="text-sm font-semibold text-ink transition-colors duration-200 hover:text-purple sm:text-base"
              >
                Talk to a Finance Expert {"->"}
              </Link>
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

      <div className="surface-muted">
        <ResourceSectionGrid
          id={diagnostics.id}
          title={diagnostics.title}
          description={diagnostics.description}
          items={diagnostics.items}
          viewAllHref={diagnostics.href}
        />
      </div>

      <ResourceSectionGrid
        id={utilities.id}
        title={utilities.title}
        description={utilities.description}
        items={utilities.items}
        viewAllHref={utilities.href}
      />

      <div className="surface-muted">
        <ResourceSectionGrid
          id={grants.id}
          title={grants.title}
          description={grants.description}
          items={grants.items}
          viewAllHref={grants.href}
          footer={
            <Button asChild variant="secondary">
              <Link href={grants.href}>Explore All Grants {"->"}</Link>
            </Button>
          }
        />
      </div>

      <ResourceSectionGrid
        id={caseStudies.id}
        title={caseStudies.title}
        description={caseStudies.description}
        items={caseStudies.items}
        viewAllHref={caseStudies.href}
      />

      <div className="surface-muted">
        <ResourceSectionGrid
          id={insights.id}
          title={insights.title}
          description={insights.description}
          items={insights.items}
          viewAllHref={insights.href}
        />
      </div>

      <CTASection
        headline="Tools are useful. Strategy is better."
        subheadline="If these raised questions, let's answer them properly."
        primaryCTA={{ label: "Talk to a Finance Expert ->", href: "/#contact" }}
      />
    </>
  );
}
