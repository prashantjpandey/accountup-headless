import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Cloud,
  CircleAlert,
  Code2,
  FileSearch,
  FileText,
  FolderKanban,
  NotebookPen,
  RefreshCw,
  ShieldCheck,
  Tags,
  TriangleAlert,
  Workflow,
} from "lucide-react";
import { ClaimEstimatorMicroSlider } from "@/components/rd-tax/ClaimEstimatorMicroSlider";
import { CTASection } from "@/components/CTASection";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const chaosItems = [
  "Dev costs mixed with general ops",
  "No project-level tracking",
  "Vague technical narratives",
  "Accountant files once a year and disappears",
] as const;

const comparisonRows = [
  {
    traditional: "Annual scramble",
    accountup: "Real-time cost tagging",
    traditionalIcon: RefreshCw,
    accountupIcon: Tags,
  },
  {
    traditional: "Generic narrative",
    accountup: "Project-backed documentation",
    traditionalIcon: FileText,
    accountupIcon: FolderKanban,
  },
  {
    traditional: '"Should be fine"',
    accountup: "Audit-ready structure",
    traditionalIcon: TriangleAlert,
    accountupIcon: ShieldCheck,
  },
  {
    traditional: "Reactive filing",
    accountup: "System-led submission",
    traditionalIcon: ClipboardList,
    accountupIcon: Workflow,
  },
] as const;

const qualifyingItems = [
  "Building new software",
  "Improving performance or scalability",
  "Solving technical uncertainty",
] as const;

const reassuranceItems = [
  "Not profitable yet",
  "Not inventing something world-first",
  "Early stage",
] as const;

const claimFailureItems = [
  "Costs not tagged properly",
  "Engineering time undocumented",
  "Narrative written after the fact",
] as const;

const cleanClaimItems = [
  "Projects mapped to uncertainty",
  "Spend tied back to evidence",
  "Narrative built from live records",
] as const;

const processSteps = [
  {
    title: "Map eligible work",
    description: "Pin down the technical uncertainty.",
  },
  {
    title: "Tag the evidence",
    description: "Tie payroll, cloud, and subcontractor spend back to projects.",
  },
  {
    title: "Submit cleanly",
    description: "Align the narrative with the numbers.",
  },
] as const;

const startupProfileItems = [
  "Raised seed funding",
  "Have 3-25 employees",
  "Pay dev salaries",
  "Use Xero or QuickBooks",
  "Want clean books, not tax tricks",
] as const;

const assuranceItems = [
  "The data is clean",
  "The claim is structured",
  "The narrative is solid",
] as const;

const dataSources = [
  { label: "Dev Payroll", icon: Code2 },
  { label: "Cloud Costs", icon: Cloud },
  { label: "Project Notes", icon: NotebookPen },
] as const;

const dataStages = ["Tagged", "Structured", "HMRC Submission"] as const;

const dashboardRows = [
  {
    label: "R&D Eligibility",
    value: "Likely Qualifies",
    tone: "text-emerald-700",
    icon: CheckCircle2,
  },
  {
    label: "Estimated Claim",
    value: "GBP 42,300",
    tone: "text-ink",
    icon: ArrowRight,
  },
  {
    label: "Documentation",
    value: "3 Gaps Found",
    tone: "text-amber-700",
    icon: CircleAlert,
  },
  {
    label: "Submission Risk",
    value: "Low",
    tone: "text-purple",
    icon: ShieldCheck,
  },
] as const;

export function RdTaxClaimsLandingPage() {
  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_14%_10%,rgba(105,106,246,0.12)_0%,transparent_22%),radial-gradient(circle_at_84%_8%,rgba(205,117,34,0.08)_0%,transparent_18%),radial-gradient(circle_at_20%_52%,rgba(105,106,246,0.06)_0%,transparent_24%),radial-gradient(circle_at_82%_64%,rgba(205,117,34,0.05)_0%,transparent_20%),linear-gradient(180deg,#faf8fb_0%,#fbf7f3_28%,#fbf9f8_56%,#faf8fb_100%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_18%_16%,rgba(105,106,246,0.12)_0%,transparent_28%),radial-gradient(circle_at_84%_14%,rgba(197,194,249,0.2)_0%,transparent_26%)]"
      />
      <section className="page-shell relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0.08)_48%,rgba(255,255,255,0)_100%)]"
        />
        <div className="page-container relative grid items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-14">
          <div className="max-w-2xl">
            <p className="eyebrow-chip">R&amp;D Tax Relief UK</p>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[3.45rem]">
              UK R&amp;D Tax Claims for Startups
            </h1>
            <p className="mt-5 max-w-xl font-display text-[1.4rem] leading-tight tracking-tight text-ink sm:text-[1.7rem]">
              You&apos;re Probably Leaving R&amp;D Money on the Table.
            </p>
            <div className="mt-6 max-w-[39rem] space-y-4 text-base leading-8 text-charcoal sm:text-lg">
              <p>
                UK startups miss thousands in{" "}
                <span className="font-medium text-ink">R&amp;D tax relief UK</span>{" "}
                not because they are ineligible, but because the finance setup is messy,
                unclear, or reactive.
              </p>
              <p>
                We make your <span className="font-medium text-ink">HMRC R&amp;D claim</span>{" "}
                clean, defensible, and system-backed.
              </p>
            </div>
            <div className="mt-8 flex flex-col items-start gap-3">
              <Button asChild variant="primary" size="lg">
                <Link href="/contact">Talk to an R&amp;D Expert -&gt;</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[linear-gradient(135deg,rgba(105,106,246,0.24),rgba(129,140,248,0.16),rgba(255,255,255,0.68),rgba(96,165,250,0.14))] p-px shadow-[0_0_0_1px_rgba(105,106,246,0.04),0_22px_48px_-34px_rgba(105,106,246,0.28)]">
            <Card
              interactive={false}
              variant="lavender"
              className="group/dashboard relative overflow-visible rounded-[calc(2rem-1px)] border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,247,252,0.84))] p-6 transition-shadow duration-300 hover:shadow-[0_26px_52px_-34px_rgba(105,106,246,0.24)] sm:p-7"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(105,106,246,0.36),transparent)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 top-4 h-28 w-28 rounded-full bg-lavender-1/50 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-6 bottom-4 h-24 w-24 rounded-full bg-purple/10 blur-3xl"
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-4 border-b border-black/6 pb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/74">
                      Claim Readiness
                    </p>
                    <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
                      R&amp;D Claim Dashboard
                    </p>
                  </div>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Live Review
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {dashboardRows.map(({ label, value, tone, icon: Icon }) => {
                    const isDocumentationRow = label === "Documentation";

                    return (
                      <div
                        key={label}
                        tabIndex={isDocumentationRow ? 0 : undefined}
                        className={`relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-[1.35rem] border border-black/6 bg-white/90 px-4 py-3.5 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.28)] ${
                          isDocumentationRow
                            ? "group/gaps cursor-default transition-[border-color,box-shadow] duration-200 hover:border-purple/20 hover:shadow-[0_20px_44px_-32px_rgba(105,106,246,0.24)] focus:border-purple/20 focus:shadow-[0_20px_44px_-32px_rgba(105,106,246,0.24)] focus:outline-none"
                            : ""
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/70">
                            {label}
                          </p>
                          <p className={`mt-1 text-lg font-semibold ${tone}`}>{value}</p>
                        </div>
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-purple/12 bg-purple/8 text-purple">
                          <Icon className="h-4.5 w-4.5" strokeWidth={1.9} />
                        </span>

                        {isDocumentationRow ? (
                          <div className="pointer-events-none absolute left-4 right-4 top-[calc(100%+0.65rem)] z-10 rounded-[1.2rem] border border-purple/14 bg-white/96 p-4 opacity-0 shadow-[0_18px_40px_-30px_rgba(105,106,246,0.22)] transition-all duration-200 group-hover/gaps:translate-y-0 group-hover/gaps:opacity-100 group-focus-within/gaps:translate-y-0 group-focus-within/gaps:opacity-100 md:left-auto md:right-0 md:w-60 md:translate-y-1">
                            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-charcoal/72">
                              Gaps found
                            </p>
                            <ul className="mt-3 space-y-2.5 text-sm leading-6 text-charcoal">
                              <li className="flex items-start gap-2.5">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-purple/70" />
                                <span>Untagged cloud spend</span>
                              </li>
                              <li className="flex items-start gap-2.5">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-purple/70" />
                                <span>Incomplete project notes</span>
                              </li>
                              <li className="flex items-start gap-2.5">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-purple/70" />
                                <span>Dev hours not categorized</span>
                              </li>
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-12 md:py-14">
        <div className="page-container">
          <Card
            interactive={false}
            className="overflow-hidden rounded-[2rem] border-purple/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,247,252,0.88))] p-6 sm:p-8 md:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
              <div className="max-w-xl">
                <p className="eyebrow-chip">Why claims fail</p>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.25rem]">
                  Most R&amp;D claims fail because the system fails.
                </h2>
                <p className="mt-5 text-base font-medium leading-7 text-ink">
                  Here&apos;s what actually happens:
                </p>
                <ul className="mt-5 space-y-3 text-base leading-7 text-charcoal">
                  {chaosItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-2 w-2 rounded-full bg-purple/70"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-lg font-semibold text-ink">
                  HMRC doesn&apos;t reject innovation. They reject messy documentation.
                </p>
              </div>

              <div>
                <div className="hidden overflow-hidden rounded-[1.7rem] border border-black/8 md:block">
                  <div className="grid grid-cols-2 bg-[linear-gradient(90deg,rgba(17,17,19,0.03),rgba(105,106,246,0.08))]">
                    <div className="border-r border-black/8 px-5 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/72">
                        Traditional Accountant
                      </p>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-purple">
                        Accountup
                      </p>
                    </div>
                  </div>
                  {comparisonRows.map((row, index) => {
                    const TraditionalIcon = row.traditionalIcon;
                    const AccountupIcon = row.accountupIcon;

                    return (
                    <div
                      key={row.traditional}
                      className={`grid grid-cols-2 ${
                        index < comparisonRows.length - 1 ? "border-t border-black/8" : ""
                      }`}
                    >
                      <div className="border-r border-black/8 bg-white/74 px-5 py-4 text-sm font-medium text-charcoal sm:text-base">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/8 bg-white/90 text-charcoal/88">
                            <TraditionalIcon className="h-4.5 w-4.5" strokeWidth={1.9} />
                          </span>
                          <span>{row.traditional}</span>
                        </div>
                      </div>
                      <div className="bg-purple/6 px-5 py-4 text-sm font-semibold text-ink sm:text-base">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-purple/12 bg-white/92 text-purple">
                            <AccountupIcon className="h-4.5 w-4.5" strokeWidth={1.9} />
                          </span>
                          <span>{row.accountup}</span>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>

                <div className="space-y-3 md:hidden">
                  {comparisonRows.map((row) => {
                    const TraditionalIcon = row.traditionalIcon;
                    const AccountupIcon = row.accountupIcon;

                    return (
                    <Card
                      key={row.traditional}
                      interactive={false}
                      className="rounded-[1.4rem] border-black/8 bg-white/90 p-4"
                    >
                      <div className="grid gap-3">
                        <div className="rounded-[1rem] border border-black/6 bg-black/[0.02] px-3 py-3">
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-charcoal/72">
                            Traditional Accountant
                          </p>
                          <div className="mt-1.5 flex items-center gap-3 text-sm font-medium text-charcoal">
                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/8 bg-white/90 text-charcoal/88">
                              <TraditionalIcon className="h-4 w-4" strokeWidth={1.9} />
                            </span>
                            <p>{row.traditional}</p>
                          </div>
                        </div>
                        <div className="rounded-[1rem] border border-purple/10 bg-purple/6 px-3 py-3">
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-purple">
                            Accountup
                          </p>
                          <div className="mt-1.5 flex items-center gap-3 text-sm font-semibold text-ink">
                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-purple/12 bg-white/92 text-purple">
                              <AccountupIcon className="h-4 w-4" strokeWidth={1.9} />
                            </span>
                            <p>{row.accountup}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="page-shell py-12 sm:py-14 md:py-16">
        <div className="page-container">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-stretch">
            <Card
              interactive={false}
              className="h-full rounded-[1.9rem] border-purple/14 bg-white/90 p-7 sm:p-9"
            >
              <p className="eyebrow-chip">What qualifies</p>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.2rem]">
                What actually counts as R&amp;D?
              </h2>
              <p className="mt-4 max-w-[38rem] text-base leading-7 text-charcoal">
                If your team is solving technical uncertainty, the work may qualify faster than most
                founders assume.
              </p>
              <p className="mt-3 max-w-[38rem] text-base leading-7 text-charcoal">
                The key is whether the work and evidence can stand up as a clean software
                development R&amp;D claim.
              </p>
              <div className="mt-9 grid gap-7 md:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ink/80">
                    If you&apos;re:
                  </p>
                  <ul className="mt-5 space-y-4 text-sm leading-7 text-charcoal sm:text-base">
                    {qualifyingItems.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-[1.1rem] border border-purple/10 bg-purple/6 px-4 py-3.5"
                      >
                        <CheckCircle2
                          className="mt-1 h-4.5 w-4.5 shrink-0 text-purple"
                          strokeWidth={1.9}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ink/80">
                    Even if:
                  </p>
                  <ul className="mt-5 space-y-4 text-sm leading-7 text-charcoal sm:text-base">
                    {reassuranceItems.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-[1.1rem] border border-black/8 bg-black/[0.02] px-4 py-3.5"
                      >
                        <FileSearch
                          className="mt-1 h-4.5 w-4.5 shrink-0 text-purple"
                          strokeWidth={1.9}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link
                href="/resources/tools/rd-tax-estimator"
                className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-purple transition-colors duration-200 hover:text-ink sm:text-base"
              >
                Estimate your claim
                <ArrowRight className="h-4 w-4" strokeWidth={1.9} />
              </Link>
            </Card>

            <Card
              interactive={false}
              variant="lavender"
              className="h-full rounded-[1.9rem] border-purple/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(248,247,252,0.88))] p-7 sm:p-9"
            >
              <div className="space-y-7">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/76">
                    Why claims fail
                  </p>
                  <ul className="mt-5 space-y-4 text-sm leading-7 text-charcoal sm:text-base">
                    {claimFailureItems.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-[1.1rem] border border-black/8 bg-white/84 px-4 py-3.5"
                      >
                        <CircleAlert
                          className="mt-1 h-4.5 w-4.5 shrink-0 text-amber-700"
                          strokeWidth={1.9}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/76">
                    What good looks like
                  </p>
                  <ul className="mt-5 space-y-4 text-sm leading-7 text-charcoal sm:text-base">
                    {cleanClaimItems.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-[1.1rem] border border-purple/10 bg-purple/6 px-4 py-3.5"
                      >
                        <ShieldCheck
                          className="mt-1 h-4.5 w-4.5 shrink-0 text-purple"
                          strokeWidth={1.9}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-purple/10 bg-white/88 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/72">
                  Signal to watch
                </p>
                <p className="mt-2 max-w-[34rem] text-lg font-semibold text-ink">
                  If payroll, cloud spend, and project notes live in separate tools, the claim gets
                  harder to defend.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="page-shell pt-14 pb-10 sm:pt-16 sm:pb-12 md:pt-20 md:pb-14">
        <div className="page-container">
          <Card
            interactive={false}
            className="rounded-[2rem] border-purple/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(248,247,252,0.92))] p-7 sm:p-9 md:p-12"
          >
            <div className="max-w-3xl">
              <p className="eyebrow-chip">System flow</p>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.25rem]">
                We don&apos;t just file your R&amp;D claim. We install the structure behind it.
              </h2>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,0.82fr)_4.25rem_minmax(0,1.18fr)] lg:items-center">
              <div className="grid gap-3">
                {dataSources.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-[1.15rem] border border-black/8 bg-white/90 px-4 py-3.5"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-purple/12 bg-purple/8 text-purple">
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.9} />
                    </span>
                    <span className="text-sm font-medium text-ink sm:text-base">{label}</span>
                  </div>
                ))}
              </div>

              <div
                aria-hidden="true"
                className="flex items-center justify-center gap-2 lg:flex-col"
              >
                <span className="h-px w-10 bg-[linear-gradient(90deg,rgba(105,106,246,0.08),rgba(105,106,246,0.52),rgba(96,165,250,0.34))] animate-pulse lg:h-10 lg:w-px" />
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-purple/12 bg-white/92 text-purple shadow-[0_10px_24px_-18px_rgba(105,106,246,0.28)]">
                  <ArrowRight className="h-4 w-4 lg:rotate-90" strokeWidth={1.9} />
                </span>
                <span className="h-px w-10 bg-[linear-gradient(90deg,rgba(105,106,246,0.08),rgba(105,106,246,0.52),rgba(96,165,250,0.34))] animate-pulse lg:h-10 lg:w-px" />
              </div>

              <div className="rounded-[1.8rem] bg-[linear-gradient(135deg,rgba(105,106,246,0.22),rgba(96,165,250,0.14),rgba(255,255,255,0.82))] p-px shadow-[0_0_0_1px_rgba(105,106,246,0.03),0_20px_44px_-32px_rgba(105,106,246,0.22)]">
                <div className="rounded-[calc(1.8rem-1px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,247,252,0.92))] px-5 py-6 sm:px-6 sm:py-7">
                  <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1.15fr)] md:items-center">
                    {dataStages.map((stage, index) => (
                      <div key={stage} className="contents">
                        <div className="rounded-[1.2rem] border border-purple/12 bg-purple/6 px-4 py-4 text-center shadow-[0_16px_36px_-34px_rgba(105,106,246,0.24)]">
                          <p className="text-sm font-semibold text-ink sm:text-base">{stage}</p>
                        </div>
                        {index < dataStages.length - 1 ? (
                          <div className="flex items-center justify-center" aria-hidden="true">
                            <span className="h-px w-6 bg-[linear-gradient(90deg,rgba(105,106,246,0.28),rgba(96,165,250,0.18))]" />
                            <ArrowRight className="mx-1 h-4 w-4 text-purple" strokeWidth={1.9} />
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <ol className="mt-8 grid gap-4 lg:grid-cols-3 lg:gap-6">
              {processSteps.map((step, index) => (
                <li key={step.title} className="relative">
                  {index < processSteps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-7 left-[calc(100%-0.5rem)] hidden h-px w-[calc(100%+1rem)] bg-[linear-gradient(90deg,rgba(105,106,246,0.22),rgba(105,106,246,0))] lg:block"
                    />
                  ) : null}
                  <Card
                    interactive={false}
                    className="h-full rounded-[1.6rem] border-black/8 bg-white/92 p-5 sm:p-6"
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-purple/16 bg-purple/8 font-display text-lg font-semibold text-purple">
                      {index + 1}
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[24rem] text-sm leading-7 text-charcoal sm:text-base">
                      {step.description}
                    </p>
                  </Card>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm font-semibold text-ink sm:text-base">
              Clean claim. Defensible file. No guesswork.
            </p>
          </Card>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-12 md:py-14">
        <div className="page-container">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)]">
            <Card
              interactive={false}
              className="rounded-[1.9rem] border-purple/14 bg-white/92 p-6 sm:p-8"
            >
              <p className="eyebrow-chip">Who this is for</p>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.2rem]">
                Built for UK startups that:
              </h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {startupProfileItems.map((item) => (
                  <span
                    key={item}
                    className="inline-flex rounded-full border border-purple/12 bg-purple/6 px-4 py-2 text-sm font-medium text-ink"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm font-medium text-charcoal/78">
                Typically in: SaaS · FinTech · HealthTech · ClimateTech · AI · DeepTech
              </p>
            </Card>

            <Card
              interactive={false}
              variant="lavender"
              className="rounded-[1.9rem] border-purple/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(248,247,252,0.88))] p-6 sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/76">
                Founder fit
              </p>
              <p className="mt-5 text-base leading-8 text-charcoal">
                This page is built for founder-led teams who need a defensible claim, not a tax
                trick. If the business is shipping product, paying engineers, and trying to keep the
                books clean while moving fast, the structure matters as much as the spend.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-12 md:py-14">
        <div className="page-container">
          <Card
            interactive={false}
            className="rounded-[2rem] border-purple/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,247,252,0.92))] p-6 sm:p-8 md:p-10"
          >
            <div className="max-w-3xl">
              <p className="eyebrow-chip">Claim value</p>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.2rem]">
                How much could you claim?
              </h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Card
                interactive={false}
                className="rounded-[1.6rem] border-black/8 bg-white/92 p-5 sm:p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/72">
                  Most qualifying companies
                </p>
                <p className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                  20% taxable R&amp;D expenditure credit under the merged scheme
                </p>
              </Card>
              <Card
                interactive={false}
                className="rounded-[1.6rem] border-purple/14 bg-purple/6 p-5 sm:p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/72">
                  Loss-making R&amp;D-intensive SMEs
                </p>
                <p className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
                  Enhanced ERIS support may apply
                </p>
              </Card>
            </div>
            <div className="mt-6">
              <ClaimEstimatorMicroSlider />
            </div>
            <div className="mt-6 space-y-2 text-base leading-8 text-charcoal">
              <p>
                The difference between &quot;probably eligible&quot; and a properly structured claim
                is often material.
              </p>
              <p>
                Exact benefit depends on profitability, R&amp;D intensity, qualifying spend, and
                scheme eligibility.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-12 md:py-16">
        <div className="page-container">
          <Card
            interactive={false}
            className="rounded-[2rem] border-purple/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,247,252,0.88))] p-6 sm:p-8 md:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
              <div className="max-w-xl">
                <p className="eyebrow-chip">Already have an accountant?</p>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.2rem]">
                  Good.
                </h2>
                <div className="mt-4 space-y-3 text-lg font-medium leading-8 text-ink">
                  <p>We don&apos;t replace them.</p>
                  <p>We upgrade the system behind them.</p>
                  <p>Your accountant can still file.</p>
                </div>
                <div className="mt-7">
                  <Button asChild variant="primary" size="lg">
                    <Link href="/contact">Talk to an R&amp;D Expert -&gt;</Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-[1.7rem] border border-purple/14 bg-white/92 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/76">
                  We make sure:
                </p>
                <ul className="mt-5 space-y-3 text-base leading-7 text-charcoal">
                  {assuranceItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-1 h-4.5 w-4.5 shrink-0 text-purple"
                        strokeWidth={1.9}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-lg font-semibold text-ink">System &gt; dependency.</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <CTASection
        headline="Stop guessing if you qualify."
        subheadline="Let's look at your dev costs and tell you - properly."
        primaryCTA={{ label: "Talk to an R&D Expert ->", href: "/contact" }}
        secondaryCTA={{
          label: "Or run the free R&D calculator first ->",
          href: "/resources/tools/rd-tax-estimator",
        }}
      />
    </div>
  );
}
