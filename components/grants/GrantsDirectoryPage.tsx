import { Card } from "@/components/ui/Card";
import { GrantsDirectoryClient } from "@/components/grants/GrantsDirectoryClient";
import type { GrantDirectoryItem } from "@/lib/grants";

type GrantsDirectoryPageProps = {
  grants: GrantDirectoryItem[];
  regionOptions: string[];
  sizeOptions: string[];
  benefitTypeOptions: string[];
  initialQuery: string;
  initialRegion: string;
  initialSize: string;
  initialType: string;
  initialComplexity: string;
};

export function GrantsDirectoryPage({
  grants,
  regionOptions,
  sizeOptions,
  benefitTypeOptions,
  initialQuery,
  initialRegion,
  initialSize,
  initialType,
  initialComplexity,
}: GrantsDirectoryPageProps) {
  return (
    <div className="resources-page-flow">
      <section className="resources-hero-surface page-shell relative -mt-24 overflow-hidden pb-8 pt-40 sm:-mt-28 sm:pb-10 sm:pt-44 md:-mt-32 md:pb-12 md:pt-48">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_14%_18%,rgba(105,106,246,0.15)_0%,transparent_28%),radial-gradient(circle_at_84%_14%,rgba(205,117,34,0.14)_0%,transparent_26%),radial-gradient(circle_at_50%_88%,rgba(197,194,249,0.16)_0%,transparent_32%)]"
        />
        <div className="mx-auto w-full max-w-[78rem]">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.4rem] border border-white/72 bg-white/72 px-6 py-12 text-center shadow-[0_30px_70px_-40px_rgba(15,23,42,0.36)] backdrop-blur-xl sm:px-8 md:px-12 md:py-16">
            <div
              aria-hidden="true"
              className="absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(105,106,246,0.28),rgba(205,117,34,0.18),transparent)]"
            />
            <p className="eyebrow-chip">Funding Directory</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-charcoal/80">
              <span className="rounded-full border border-black/8 bg-white/76 px-3 py-1">Grant Filters</span>
              <span className="rounded-full border border-black/8 bg-white/76 px-3 py-1">Application Intelligence</span>
              <span className="rounded-full border border-black/8 bg-white/76 px-3 py-1">UK-Wide Coverage</span>
            </div>
            <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[3.8rem]">
              UK Business Grants &amp; Incentives
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-charcoal sm:text-lg">
              An interactive, decision-ready directory of grants, subsidies, and incentive schemes
              across the United Kingdom.
            </p>
          </div>
        </div>
      </section>

      <section className="page-shell pb-12 pt-2 sm:pb-14 sm:pt-4 md:pb-16 md:pt-6">
        <div className="mx-auto w-full max-w-[86rem]">
          <Card
            interactive={false}
            className="overflow-hidden border-white/78 bg-white/72 p-5 sm:p-6 md:p-7"
          >
            <GrantsDirectoryClient
              grants={grants}
              regionOptions={regionOptions}
              sizeOptions={sizeOptions}
              benefitTypeOptions={benefitTypeOptions}
              initialQuery={initialQuery}
              initialRegion={initialRegion}
              initialSize={initialSize}
              initialType={initialType}
              initialComplexity={initialComplexity}
            />
          </Card>
        </div>
      </section>
    </div>
  );
}
