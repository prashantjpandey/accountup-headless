import { Card } from "@/components/ui/Card";
import { FinstackDirectoryClient } from "@/components/finstack/FinstackDirectoryClient";
import type { FinstackTool } from "@/lib/finstack";

type FinstackDirectoryPageProps = {
  tools: FinstackTool[];
  categories: string[];
  initialQuery: string;
  initialCategory: string;
};

export function FinstackDirectoryPage({
  tools,
  categories,
  initialQuery,
  initialCategory,
}: FinstackDirectoryPageProps) {
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
            <p className="eyebrow-chip">FinStack UK</p>
            <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[3.8rem]">
              FinStack UK
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-charcoal sm:text-lg">
              Curated Finance &amp; Accounting Tools for Startups / SMEs
            </p>
          </div>
        </div>
      </section>

      <section className="page-shell pb-12 pt-2 sm:pb-14 sm:pt-4 md:pb-16 md:pt-6">
        <div className="mx-auto w-full max-w-[86rem]">
          <Card
            interactive={false}
            variant="lavender"
            className="overflow-hidden border-white/78 bg-white/72 p-5 sm:p-6 md:p-7"
          >
            <FinstackDirectoryClient
              tools={tools}
              categories={categories}
              initialQuery={initialQuery}
              initialCategory={initialCategory}
            />
          </Card>
        </div>
      </section>
    </div>
  );
}
