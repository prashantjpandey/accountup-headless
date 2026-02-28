import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function InsightNotFound() {
  return (
    <section className="surface-default page-shell py-16 sm:py-20 md:py-24">
      <div className="page-container">
        <Card
          interactive={false}
          className="mx-auto max-w-3xl border-black/8 bg-white/82 px-6 py-10 text-center shadow-[0_20px_46px_-34px_rgba(15,23,42,0.34)] sm:px-8 md:px-10 md:py-12"
        >
          <p className="eyebrow-chip">404</p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            This insight could not be found.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-charcoal sm:text-lg">
            The link may be outdated, or the article may no longer be available in the
            current CMS dataset.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/insights">Back to insights</Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
