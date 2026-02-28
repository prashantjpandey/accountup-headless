import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "Contact - Accountup",
  description:
    "Talk to Accountup about bookkeeping, reporting, runway planning, and finance support for your startup.",
};

export default function ContactPage() {
  return (
    <>
      <section className="resources-hero-surface page-shell relative overflow-hidden py-16 sm:py-20 md:py-24">
        <div className="page-container">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/78 bg-white/70 px-6 py-12 text-center shadow-[0_24px_54px_-36px_rgba(15,23,42,0.34)] backdrop-blur-sm sm:px-8 md:px-12 md:py-16">
            <p className="eyebrow-chip">Contact</p>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[3.2rem]">
              Talk to a finance expert
            </h1>
            <p className="mx-auto mt-5 max-w-[43.75rem] text-base leading-8 text-charcoal sm:text-lg">
              Share where the business is now, what is blocking clarity, and what
              support you need next.
            </p>
            <Link
              href="/resources"
              className="mt-6 inline-flex text-sm font-semibold text-ink transition-colors duration-200 hover:text-purple"
            >
              Back to resources
            </Link>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
