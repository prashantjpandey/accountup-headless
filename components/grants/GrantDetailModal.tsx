"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { GrantDirectoryItem } from "@/lib/grants";

type GrantDetailModalProps = {
  grant: GrantDirectoryItem | null;
  onClose: () => void;
};

function getComplexityTextClassName(complexityScore: GrantDirectoryItem["complexityScore"]) {
  if (complexityScore === "High") {
    return "text-rose-700";
  }

  if (complexityScore === "Medium") {
    return "text-amber-700";
  }

  if (complexityScore === "Low") {
    return "text-emerald-700";
  }

  return "text-ink";
}

function renderDeadline(grant: GrantDirectoryItem) {
  if (grant.nextDeadlineDisplay === "N/A") {
    return grant.deadlineType;
  }

  return `${grant.nextDeadlineDisplay} (${grant.deadlineType})`;
}

export function GrantDetailModal({ grant, onClose }: GrantDetailModalProps) {
  useEffect(() => {
    if (!grant) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [grant, onClose]);

  if (!grant) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 px-4 py-6 backdrop-blur-sm sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="grant-detail-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_30px_80px_-36px_rgba(15,23,42,0.44)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-black/10 bg-white/90 p-2 text-charcoal transition-colors duration-200 hover:border-black/20 hover:text-ink"
          aria-label="Close grant details"
        >
          <X size={18} />
        </button>

        <div className="border-b border-black/8 bg-[radial-gradient(circle_at_top_left,rgba(205,117,34,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(105,106,246,0.16),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,255,255,0.9))] px-6 py-7 sm:px-8 sm:py-8">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-primary/16 bg-primary/10 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-primary">
              {grant.benefitType}
            </span>
            <span className="rounded-full border border-black/8 bg-white/88 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-charcoal">
              {grant.country}
            </span>
          </div>
          <h2
            id="grant-detail-title"
            className="mt-5 max-w-3xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.35rem]"
          >
            {grant.title}
          </h2>
          <p className="mt-3 text-base font-medium text-primary">
            {grant.officialAdministeringAuthority}
          </p>
        </div>

        <div className="grid flex-1 gap-8 overflow-y-auto bg-background/72 px-6 py-6 sm:px-8 sm:py-8 lg:grid-cols-2">
          <div className="space-y-6">
            <section className="rounded-[1.6rem] border border-black/8 bg-white p-5">
              <h3 className="text-lg font-semibold text-ink">Core details</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-start justify-between gap-4 border-b border-black/6 pb-3">
                  <dt className="text-charcoal/70">Region</dt>
                  <dd className="text-right font-medium text-ink">{grant.regionState}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-black/6 pb-3">
                  <dt className="text-charcoal/70">Benefit amount</dt>
                  <dd className="text-right font-semibold text-emerald-700">{grant.benefitAmount}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-black/6 pb-3">
                  <dt className="text-charcoal/70">Eligible sizes</dt>
                  <dd className="text-right font-medium text-ink">{grant.businessSizeEligibilityLabel}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-black/6 pb-3">
                  <dt className="text-charcoal/70">Deadline</dt>
                  <dd className="text-right font-medium text-ink">{renderDeadline(grant)}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-charcoal/70">Decision timeline</dt>
                  <dd className="text-right font-medium text-ink">{grant.decisionTimeline}</dd>
                </div>
              </dl>
            </section>

            <section className="rounded-[1.6rem] border border-black/8 bg-white p-5">
              <h3 className="text-lg font-semibold text-ink">Eligibility and expenses</h3>
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/78">
                    Eligible industries
                  </p>
                  <p className="mt-2 leading-7 text-charcoal">
                    {grant.industryEligibility.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/78">
                    Eligible expenses
                  </p>
                  <p className="mt-2 leading-7 text-charcoal">
                    {grant.eligibleExpenses.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/78">
                    Key requirements
                  </p>
                  <p className="mt-2 rounded-2xl border border-black/8 bg-background px-4 py-3 leading-7 text-charcoal">
                    {grant.eligibilityRequirements}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-[1.6rem] border border-black/8 bg-white p-5">
              <h3 className="text-lg font-semibold text-ink">Advanced intelligence</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-black/8 bg-background px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/78">
                    Complexity
                  </p>
                  <p className={`mt-2 text-lg font-semibold ${getComplexityTextClassName(grant.complexityScore)}`}>
                    {grant.complexityScore ?? "Unspecified"}
                  </p>
                </div>
                <div className="rounded-2xl border border-black/8 bg-background px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/78">
                    Match funding
                  </p>
                  <p className="mt-2 text-sm font-semibold text-ink">{grant.matchFundingRequired}</p>
                </div>
                <div className="rounded-2xl border border-black/8 bg-background px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/78">
                    Payment type
                  </p>
                  <p className="mt-2 text-sm font-semibold text-ink">{grant.paymentType}</p>
                </div>
                <div className="rounded-2xl border border-black/8 bg-background px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/78">
                    Time to apply
                  </p>
                  <p className="mt-2 text-sm font-semibold text-ink">{grant.estimatedTimeToApply}</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-primary/14 bg-primary/6 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/78">
                  Competitiveness
                </p>
                <p className="mt-2 text-sm font-semibold text-ink">
                  {grant.competitivenessIndicator ?? "Not specified"}
                </p>
              </div>
            </section>

            <section className="rounded-[1.6rem] border border-black/8 bg-white p-5">
              <h3 className="text-lg font-semibold text-ink">Application pack</h3>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-charcoal">
                {grant.requiredDocuments.map((document) => (
                  <li
                    key={document}
                    className="rounded-2xl border border-black/8 bg-background px-4 py-3"
                  >
                    {document}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[1.6rem] border border-black/8 bg-white p-5">
              <h3 className="text-lg font-semibold text-ink">Decision risks</h3>
              <div className="mt-4 space-y-4 text-sm leading-7 text-charcoal">
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-900">
                  {grant.commonRejectionReasons ?? "No common rejection reasons were supplied."}
                </div>
                <div className="rounded-2xl border border-black/8 bg-background px-4 py-3">
                  <span className="font-semibold text-ink">Renewal rules:</span> {grant.renewalRules}
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="border-t border-black/8 bg-white px-6 py-5 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-7 text-charcoal">
              Review the official application guidance before committing internal time or matching funds.
            </p>
            {grant.applicationLink ? (
              <Button asChild>
                <Link href={grant.applicationLink} target="_blank" rel="noreferrer">
                  <span className="inline-flex items-center gap-2">
                    Open Application Page
                    <ArrowUpRight size={15} />
                  </span>
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
