import type { ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type CalculatorPageShellProps = {
  title: string;
  description: string;
  titleAs?: "h1" | "p";
  content?: ReactNode;
  children: ReactNode;
};

export function CalculatorPageShell({
  title,
  description,
  titleAs = "h1",
  content,
  children,
}: CalculatorPageShellProps) {
  const HeadingTag = titleAs;

  return (
    <section className="surface-default page-shell py-16 sm:py-20 md:py-24">
      <div className="page-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow-chip">Finance Calculator</p>
          <HeadingTag className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {title}
          </HeadingTag>
          <p className="mt-5 text-base leading-8 text-charcoal sm:text-lg">
            {description}
          </p>
          <Link
            href="/resources/calculators"
            className="mt-6 inline-flex text-sm font-semibold text-ink transition-colors duration-200 hover:text-purple"
          >
            Back to calculators
          </Link>
        </div>

        <div className="mt-10">{children}</div>
        {content ? <div className="mt-10">{content}</div> : null}

        <Card
          interactive={false}
          className="mt-10 border-purple/18 bg-white/82 px-6 py-8 text-center sm:px-8"
        >
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Want a second opinion on these numbers?
          </h2>
          <div className="mt-6 flex justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/contact">Talk to a Finance Expert</Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
