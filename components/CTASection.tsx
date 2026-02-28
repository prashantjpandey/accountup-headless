import Link from "next/link";
import { Button } from "@/components/ui/Button";

export type CTASectionProps = {
  headline: string;
  subheadline: string;
  primaryCTA: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
};

export function CTASection({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
}: CTASectionProps) {
  return (
    <section className="surface-default page-shell py-14 sm:py-16 md:py-20">
      <div className="page-container">
        <div className="rounded-[2rem] bg-ink px-6 py-12 text-center shadow-[0_24px_56px_-34px_rgba(15,23,42,0.52)] sm:px-8 md:px-12 md:py-16">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/74 sm:text-base">
            {subheadline}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild variant="primary" size="lg">
              <Link href={primaryCTA.href}>{primaryCTA.label}</Link>
            </Button>
            {secondaryCTA ? (
              <Link
                href={secondaryCTA.href}
                className="text-sm font-semibold text-white/82 transition-colors duration-200 hover:text-white"
              >
                {secondaryCTA.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
