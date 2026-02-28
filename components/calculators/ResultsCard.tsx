import { Card } from "@/components/ui/Card";

export type ResultItem = {
  label: string;
  value: string;
  tone?: "default" | "positive" | "warning";
};

type ResultsCardProps = {
  summaryLabel: string;
  summaryValue: string;
  summaryTone?: "default" | "positive" | "warning";
  message?: string;
  badge?: string;
  items: ResultItem[];
  note: string;
};

const toneStyles = {
  default: "text-ink",
  positive: "text-[#127b4f]",
  warning: "text-[#9a5b1b]",
};

export function ResultsCard({
  summaryLabel,
  summaryValue,
  summaryTone = "default",
  message,
  badge,
  items,
  note,
}: ResultsCardProps) {
  return (
    <Card
      variant="lavender"
      interactive={false}
      className="p-6 sm:p-7 lg:sticky lg:top-24"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/70">
            Live results
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
            Snapshot
          </h2>
        </div>
        {badge ? (
          <span className="rounded-full bg-purple/10 px-3 py-1 text-xs font-semibold text-purple">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-purple/12 bg-gradient-to-br from-white via-white to-lavender-1/22 p-5">
        <p className="text-sm font-medium text-charcoal">{summaryLabel}</p>
        <p className={`mt-2 font-display text-3xl font-semibold tracking-tight ${toneStyles[summaryTone]}`}>
          {summaryValue}
        </p>
        {message ? (
          <p className="mt-3 text-sm leading-7 text-charcoal">{message}</p>
        ) : null}
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-start justify-between gap-4 border-b border-black/6 pb-4 last:border-b-0 last:pb-0"
          >
            <p className="text-sm leading-6 text-charcoal">{item.label}</p>
            <p className={`text-right text-sm font-semibold ${toneStyles[item.tone ?? "default"]}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 border-t border-black/8 pt-4 text-xs leading-6 text-charcoal">
        {note}
      </p>
    </Card>
  );
}
