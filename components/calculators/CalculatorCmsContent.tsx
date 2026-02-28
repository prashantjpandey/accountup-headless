import { Accordion } from "@/components/ui/Accordion";
import { Card } from "@/components/ui/Card";
import type { CalculatorCmsContent } from "@/lib/calculator-content";
import { RichTextContent, richTextToPlainText } from "@/lib/rich-text";

type CalculatorCmsContentProps = {
  content: CalculatorCmsContent;
};

function ContentSection({
  title,
  value,
}: {
  title: string;
  value: unknown;
}) {
  const plainText = richTextToPlainText(value);

  if (!plainText) {
    return null;
  }

  return (
    <Card interactive={false} className="p-6 sm:p-8">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[2rem]">
        {title}
      </h2>
      <RichTextContent
        value={value}
        className="calculator-rich-text mt-4 text-base leading-8 text-charcoal"
      />
    </Card>
  );
}

export function CalculatorCmsContentBlock({
  content,
}: CalculatorCmsContentProps) {
  const introText = richTextToPlainText(content.intro);
  const faqItems = content.faqItems.map((item) => ({
    question: item.question,
    answer: <RichTextContent value={item.answer} className="calculator-rich-text" />,
  }));
  const faqStructuredData =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: richTextToPlainText(item.answer),
            },
          })),
        }
      : null;

  return (
    <section className="space-y-6 sm:space-y-8">
      <Card interactive={false} className="p-6 sm:p-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {content.title}
        </h1>
        {introText ? (
          <RichTextContent
            value={content.intro}
            className="calculator-rich-text mt-5 text-base leading-8 text-charcoal"
          />
        ) : null}
      </Card>

      <ContentSection title="Explanation" value={content.explanation} />
      <ContentSection title="When to Use" value={content.whenToUse} />
      <ContentSection title="Common Mistakes" value={content.commonMistakes} />

      {faqItems.length > 0 ? (
        <Card interactive={false} className="p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[2rem]">
            FAQ
          </h2>
          <div className="mt-4">
            <Accordion items={faqItems} />
          </div>
        </Card>
      ) : null}

      {faqStructuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
      ) : null}
    </section>
  );
}
