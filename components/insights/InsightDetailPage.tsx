import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { InsightInlineCta } from "@/components/insights/InsightInlineCta";
import { RelevantCalculatorsSection } from "@/components/insights/RelevantCalculatorsSection";
import { RelatedInsightsSection } from "@/components/insights/RelatedInsightsSection";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatDate, formatReadingTime } from "@/lib/format";
import type { CalculatorRefInfo } from "@/lib/calculator-content";
import type { Insight } from "@/lib/insights";
import type { ResourceItem } from "@/lib/resources";
import {
  RichTextContent,
  richTextToPlainText,
  splitRichTextForInlineCta,
} from "@/lib/rich-text";

type InsightDetailPageProps = {
  insight: Insight;
  relatedInsights: Insight[];
  relatedCalculatorCta?: CalculatorRefInfo | null;
  relatedCalculators?: ResourceItem[];
};

export function InsightDetailPage({
  insight,
  relatedInsights,
  relatedCalculatorCta = null,
  relatedCalculators = [],
}: InsightDetailPageProps) {
  const formattedDate = formatDate(insight.publishDate);
  const formattedReadingTime = formatReadingTime(insight.readingTime);
  const splitContent = splitRichTextForInlineCta(insight.content);
  const shouldRenderInlineCta = splitContent.placement === "inline-after-section";
  const faqItems = insight.insightFaqs.reduce<Array<{ question: string; answer: ReactNode }>>(
    (items, item) => {
      const answerText = richTextToPlainText(item.answer);

      if (!answerText) {
        return items;
      }

      items.push({
        question: item.question,
        answer: <RichTextContent value={item.answer} className="calculator-rich-text" />,
      });

      return items;
    },
    [],
  );
  const faqStructuredData =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: insight.insightFaqs
            .map((item) => {
              const answerText = richTextToPlainText(item.answer);

              if (!answerText) {
                return null;
              }

              return {
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: answerText,
                },
              };
            })
            .filter(Boolean),
        }
      : null;

  return (
    <>
      <section className="surface-default page-shell py-16 sm:py-20 md:py-24">
        <div className="page-container">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/insights"
              className="inline-flex text-sm font-semibold text-ink transition-colors duration-200 hover:text-purple"
            >
              Back to insights
            </Link>

            <div className="mt-6 flex flex-wrap gap-2">
              {insight.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-purple/16 bg-white/86 px-3 py-1 text-[0.72rem] font-semibold tracking-[0.02em] text-charcoal"
                >
                  {category}
                </span>
              ))}
            </div>

            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[3.2rem]">
              {insight.title}
            </h1>

            {insight.excerpt ? (
              <p className="mt-5 text-lg leading-8 text-charcoal">
                {insight.excerpt}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-charcoal">
              {formattedDate ? <span>{formattedDate}</span> : null}
              {formattedDate && formattedReadingTime ? (
                <span className="text-black/20">/</span>
              ) : null}
              {formattedReadingTime ? <span>{formattedReadingTime}</span> : null}
              {(formattedDate || formattedReadingTime) && insight.authorName ? (
                <span className="text-black/20">/</span>
              ) : null}
              {insight.authorName ? <span>{insight.authorName}</span> : null}
              {insight.expertReviewed ? (
                <span className="rounded-full border border-purple/22 bg-purple/8 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-purple">
                  Expert reviewed
                </span>
              ) : null}
            </div>

            {insight.coverImageUrl ? (
              <div className="relative mt-10 aspect-[16/8.8] overflow-hidden rounded-[2rem] border border-black/8 bg-[linear-gradient(180deg,#f7f4ff_0%,#f6efe9_100%)] shadow-[0_24px_54px_-36px_rgba(15,23,42,0.34)]">
                <Image
                  src={insight.coverImageUrl}
                  alt={insight.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 48rem, 100vw"
                  priority
                />
              </div>
            ) : null}

            <article className="mt-10 md:mt-12">
              {splitContent.beforeCta ? (
                <RichTextContent
                  value={splitContent.beforeCta}
                  className="insight-rich-text text-base leading-8 text-charcoal sm:text-lg"
                />
              ) : null}

              {shouldRenderInlineCta ? (
                <InsightInlineCta relatedCalculatorCta={relatedCalculatorCta} />
              ) : null}

              {splitContent.afterCta ? (
                <RichTextContent
                  value={splitContent.afterCta}
                  className="insight-rich-text text-base leading-8 text-charcoal sm:text-lg"
                />
              ) : null}
            </article>

            {!shouldRenderInlineCta && faqItems.length > 0 ? (
              <InsightInlineCta relatedCalculatorCta={relatedCalculatorCta} />
            ) : null}

            {faqItems.length > 0 ? (
              <div className="mt-12 md:mt-14">
                <Card interactive={false} className="p-6 sm:p-8">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[2rem]">
                    FAQ
                  </h2>
                  <div className="mt-4">
                    <Accordion items={faqItems} />
                  </div>
                </Card>
              </div>
            ) : null}

            <div className="mt-12 flex justify-center md:mt-14">
              <Button asChild variant="secondary" size="lg">
                <Link href="/contact">Talk to a Finance Expert</Link>
              </Button>
            </div>

            {!shouldRenderInlineCta && faqItems.length === 0 ? (
              <InsightInlineCta relatedCalculatorCta={relatedCalculatorCta} />
            ) : null}

            <RelevantCalculatorsSection calculators={relatedCalculators} />
          </div>
        </div>
      </section>

      <div className="surface-muted">
        <RelatedInsightsSection insights={relatedInsights} />
      </div>

      {faqStructuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
      ) : null}
    </>
  );
}
