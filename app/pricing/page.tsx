import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PricingTiers } from "@/components/pricing/PricingTiers";
import { AddOns } from "@/components/pricing/AddOns";
import { Faq } from "@/components/pricing/Faq";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing – Accountup",
  description:
    "Simple pricing for startup accounting. Clear packages. No hidden fees. Built for scaling startups.",
};

export default function PricingPage() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 px-6 bg-background">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-medium tracking-tight text-ink md:text-5xl font-display">
            Simple Pricing for Startup Accounting
          </h1>
          <p className="mt-6 text-lg text-charcoal max-w-xl mx-auto">
            Clear packages. No hidden fees. Built for scaling startups.
          </p>
        </div>
      </section>
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <PricingTiers />
        </div>
      </section>
      <AddOns />
      <Faq />
      <section className="py-20 px-6 bg-background-alt">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-medium text-ink font-display">
            Ready to get started?
          </h2>
          <p className="mt-3 text-charcoal text-sm">
            Book a call or send us a message. We&apos;ll recommend the right plan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild variant="primary" size="lg">
              <Link href="/#contact">Contact us</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
