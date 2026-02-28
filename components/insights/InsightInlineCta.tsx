import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { CalculatorRefInfo } from "@/lib/calculator-content";

type InsightInlineCtaProps = {
  relatedCalculatorCta?: CalculatorRefInfo | null;
};

export function InsightInlineCta({ relatedCalculatorCta }: InsightInlineCtaProps) {
  const hasCalculatorCta = Boolean(relatedCalculatorCta?.href && relatedCalculatorCta?.title);

  return (
    <Card
      interactive={false}
      variant="lavender"
      className="my-10 border-purple/22 bg-white/86 px-6 py-8 sm:px-8"
    >
      <p className="eyebrow-chip">SYSTEM INSIGHT / NEXT STEP</p>
      <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        Make the next move with clarity.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-8 text-charcoal">
        If this issue is already showing up in reporting, runway, or team decisions, the next
        move is usually clearer with a structured finance view.
      </p>

      <div
        className={
          hasCalculatorCta
            ? "mt-6 flex flex-col items-start gap-3 md:flex-row md:flex-wrap md:items-center"
            : "mt-6 flex items-start"
        }
      >
        <Button asChild variant="primary" size="lg">
          <Link href="/contact">Talk to a Finance Expert</Link>
        </Button>

        {hasCalculatorCta ? (
          <Button asChild variant="secondary" size="lg">
            <Link href={relatedCalculatorCta!.href}>
              Run {relatedCalculatorCta!.title}
            </Link>
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
