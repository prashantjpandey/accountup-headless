import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { GrantDirectoryItem } from "@/lib/grants";

type GrantCardProps = {
  grant: GrantDirectoryItem;
  onOpenDetails: () => void;
};

function getComplexityClassName(complexityScore: GrantDirectoryItem["complexityScore"]) {
  if (complexityScore === "High") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  if (complexityScore === "Medium") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (complexityScore === "Low") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  return "border-black/8 bg-background text-charcoal";
}

function getDeadlineDisplay(grant: GrantDirectoryItem) {
  if (grant.nextDeadlineDisplay === "N/A") {
    return grant.deadlineType;
  }

  return `${grant.nextDeadlineDisplay} (${grant.deadlineType})`;
}

function getDeadlineTextClassName(grant: GrantDirectoryItem) {
  return grant.deadlineType === "Fixed" ? "text-amber-700" : "text-ink";
}

export function GrantCard({ grant, onOpenDetails }: GrantCardProps) {
  return (
    <Card className="flex h-full flex-col p-6 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.24)] hover:shadow-[0_22px_44px_-34px_rgba(15,23,42,0.28)] md:p-7">
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full border border-primary/18 bg-primary/8 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary">
          {grant.regionState}
        </span>
        <span
          className={`rounded-full border px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] ${getComplexityClassName(
            grant.complexityScore,
          )}`}
        >
          {grant.complexityScore ? `${grant.complexityScore} Complexity` : "Complexity Unspecified"}
        </span>
      </div>

      <div className="mt-5 flex-1">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
          {grant.title}
        </h2>
        <p className="mt-2 text-sm font-medium text-charcoal/78">
          {grant.officialAdministeringAuthority}
        </p>

        <div className="mt-6 space-y-3 rounded-[1.6rem] border border-black/8 bg-background/80 p-4">
          <div className="flex items-start justify-between gap-4 text-sm">
            <span className="text-charcoal/70">Amount</span>
            <span className="text-right font-semibold text-emerald-700">{grant.benefitAmount}</span>
          </div>
          <div className="flex items-start justify-between gap-4 text-sm">
            <span className="text-charcoal/70">Type</span>
            <span className="text-right font-medium text-ink">{grant.benefitType}</span>
          </div>
          <div className="flex items-start justify-between gap-4 text-sm">
            <span className="text-charcoal/70">Deadline</span>
            <span className={`text-right font-medium ${getDeadlineTextClassName(grant)}`}>
              {getDeadlineDisplay(grant)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button onClick={onOpenDetails} className="w-full">
          <span className="inline-flex items-center gap-2">
            View Full Details
            <ArrowUpRight size={15} />
          </span>
        </Button>
      </div>
    </Card>
  );
}
