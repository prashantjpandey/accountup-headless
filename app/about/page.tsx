import type { Metadata } from "next";
import Image from "next/image";
import {
  BarChart3,
  Blocks,
  BriefcaseBusiness,
  Clock3,
  Hammer,
  Linkedin,
  Lightbulb,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";

const whoWeAreParagraphs = [
  "AccountUp is a UK-focused finance and accounting firm built for startups, scaleups and SMEs.",
  "We are finance professionals with deep experience in management accounts, statutory reporting, VAT, payroll and tax compliance. Our work is grounded in discipline, structured processes and practical systems that support growing businesses.",
  "We do not believe in overcomplicating finance. We believe in clarity, accuracy and consistency.",
] as const;

const whyWeBuiltThisParagraphs = [
  "As businesses grow, financial complexity increases quickly.",
  "We saw scaling businesses repeatedly rebuild their finance function.",
  "Fragmented systems. Manual processes. Rising costs without better clarity.",
  "AccountUp was built to bring structure and discipline to growing companies.",
  "Provide reliable financial management using modern systems and consistent processes, so businesses can grow without financial disorder.",
] as const;

const leadershipProfiles = [
  {
    name: "Akash Janardhan Pandey, ACCA",
    role: "Co-Founder",
    description:
      "The systems mind behind AccountUp. Designs automation workflows, reporting structures and financial models that actually scale. If a process can be improved, streamlined or structured better, Akash will redesign it.",
    imageSrc: "/assets/images/akash linkedIn.jpg",
    imageAlt: "Akash Janardhan Pandey portrait",
    linkedinUrl: "https://www.linkedin.com/in/akash-janardhan-pandey/",
    borderClass: "border-purple/16",
    accentClass: "from-purple/70 via-lavender-2/65 to-transparent",
    imageFrameClass: "border-purple/14",
    badgeClass: "border-purple/16 text-purple/80",
    imageGlowClass: "bg-[radial-gradient(circle_at_30%_28%,rgba(105,106,246,0.34),transparent_68%)]",
    cardWashClass:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(248,247,252,0.78))]",
  },
  {
    name: "Nitin Punera, ACCA",
    role: "Co-Founder",
    description:
      "Leads compliance and statutory oversight. Ensures VAT, corporation tax and statutory filings are handled properly and on time. Detail-oriented, regulation-focused and calm under audit pressure.",
    imageSrc: "/assets/images/nitin linekdIn pic.jpg",
    imageAlt: "Nitin Punera portrait",
    linkedinUrl: "https://www.linkedin.com/in/nitinpunera",
    borderClass: "border-primary/16",
    accentClass: "from-primary/65 via-warm-peach/65 to-transparent",
    imageFrameClass: "border-primary/14",
    badgeClass: "border-primary/16 text-primary/80",
    imageGlowClass: "bg-[radial-gradient(circle_at_68%_24%,rgba(205,117,34,0.3),transparent_66%)]",
    cardWashClass:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(249,246,242,0.78))]",
  },
  {
    name: "Abhishek Sharma",
    role: "Senior Associate",
    description:
      "Execution anchor of the team. Drives bookkeeping, management accounts and reporting cycles with consistency and discipline. Keeps the engine running smoothly month after month.",
    imageSrc: "/assets/images/abhishek linkedIn.jpg",
    imageAlt: "Abhishek Sharma portrait",
    linkedinUrl: "https://www.linkedin.com/in/abhishkshrmaa",
    borderClass: "border-purple/16",
    accentClass: "from-purple/70 via-lavender-2/65 to-transparent",
    imageFrameClass: "border-purple/14",
    badgeClass: "border-purple/16 text-purple/80",
    imageGlowClass: "bg-[radial-gradient(circle_at_34%_74%,rgba(105,106,246,0.3),transparent_68%)]",
    cardWashClass:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(247,247,252,0.8))]",
  },
  {
    name: "Vedanshi Vashisht",
    role: "Finance Associate",
    description:
      "Focused on accuracy, documentation and operational accounting support. Ensures the financial data is clean, organised and ready for reporting and compliance.",
    imageSrc: "/assets/images/Vedanshi.png",
    imageAlt: "Vedanshi Vashisht portrait",
    linkedinUrl: "https://www.linkedin.com/in/vedanshi0919",
    borderClass: "border-primary/16",
    accentClass: "from-primary/65 via-warm-peach/65 to-transparent",
    imageFrameClass: "border-primary/14",
    badgeClass: "border-primary/16 text-primary/80",
    imageGlowClass: "bg-[radial-gradient(circle_at_70%_72%,rgba(205,117,34,0.28),transparent_66%)]",
    cardWashClass:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(250,246,243,0.8))]",
  },
] as const;

const supportItems = [
  "Startups preparing to scale",
  "Scaleups building stronger financial foundations",
  "UK-based SMEs seeking structured reporting",
  "Founder-led teams that need reliable compliance and visibility",
] as const;

const industryItems: {
  label: string;
  icon: LucideIcon;
  borderClass: string;
  iconShellClass: string;
}[] = [
  {
    label: "Technology and SaaS",
    icon: Blocks,
    borderClass: "border-purple/14",
    iconShellClass: "border-purple/14 bg-gradient-to-br from-purple/10 via-lavender-1/22 to-white",
  },
  {
    label: "Professional services",
    icon: BriefcaseBusiness,
    borderClass: "border-primary/14",
    iconShellClass: "border-primary/14 bg-gradient-to-br from-primary/10 via-warm-peach/18 to-white",
  },
  {
    label: "E-commerce and D2C brands",
    icon: ShoppingBag,
    borderClass: "border-purple/14",
    iconShellClass: "border-purple/14 bg-gradient-to-br from-purple/10 via-lavender-1/22 to-white",
  },
  {
    label: "Agencies and consulting firms",
    icon: Lightbulb,
    borderClass: "border-primary/14",
    iconShellClass: "border-primary/14 bg-gradient-to-br from-primary/10 via-warm-peach/18 to-white",
  },
  {
    label: "Healthcare and Clinics",
    icon: Stethoscope,
    borderClass: "border-purple/14",
    iconShellClass: "border-purple/14 bg-gradient-to-br from-purple/10 via-lavender-1/22 to-white",
  },
  {
    label: "Construction and Trades",
    icon: Hammer,
    borderClass: "border-primary/14",
    iconShellClass: "border-primary/14 bg-gradient-to-br from-primary/10 via-warm-peach/18 to-white",
  },
];

export const metadata: Metadata = {
  title: "About - Accountup",
  description:
    "Learn about Accountup, a UK-focused finance and accounting firm supporting startups, scaleups, and SMEs with structured reporting, compliance, and operational clarity.",
};

export default function AboutPage() {
  return (
    <div className="resources-page-flow">
      <section className="resources-hero-surface page-shell relative -mt-24 overflow-hidden pt-40 sm:-mt-28 sm:pt-44 md:-mt-32 md:pt-48">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_18%_14%,rgba(105,106,246,0.16)_0%,transparent_26%),radial-gradient(circle_at_82%_10%,rgba(205,117,34,0.12)_0%,transparent_24%),radial-gradient(circle_at_50%_88%,rgba(197,194,249,0.14)_0%,transparent_30%)]"
        />
        <div className="page-container">
          <div className="relative mx-auto max-w-5xl rounded-[2.25rem] border border-white/78 bg-white/70 px-6 py-12 shadow-[0_24px_54px_-36px_rgba(15,23,42,0.34)] backdrop-blur-sm sm:px-8 md:px-12 md:py-16 lg:px-14">
            <div
              aria-hidden="true"
              className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-purple/45 via-primary/30 to-transparent"
            />
            <p className="eyebrow-chip">About AccountUp</p>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-[3.2rem]">
              Who we are
            </h1>
            <div className="mt-6 max-w-4xl space-y-5 text-base leading-8 text-charcoal sm:text-lg">
              {whoWeAreParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-12 md:py-14">
        <div className="page-container">
          <div className="rounded-[2.25rem] bg-[linear-gradient(135deg,rgba(105,106,246,0.34),rgba(234,196,173,0.28),rgba(255,255,255,0.82),rgba(105,106,246,0.2))] p-px shadow-[0_28px_70px_-44px_rgba(105,106,246,0.34)]">
            <div className="relative overflow-hidden rounded-[calc(2.25rem-1px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(255,255,255,0.68))] px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] backdrop-blur-sm sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-12 top-10 h-32 w-32 rounded-full bg-lavender-1/16 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-6 right-[20%] h-28 w-28 rounded-full bg-warm-peach/16 blur-3xl"
              />
              <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-stretch lg:gap-10">
                <div className="max-w-xl pr-0 lg:pr-4">
                  <h2 className="font-display text-[2rem] font-semibold tracking-tight text-ink sm:text-[2.35rem]">
                    Why we built this
                  </h2>
                  <p className="mt-5 max-w-[30rem] text-[1rem] leading-8 text-charcoal sm:text-[1.02rem]">
                    {whyWeBuiltThisParagraphs[0]}
                  </p>
                  <div className="mt-8 space-y-4">
                    {[
                      { text: "Reporting expectations increase.", icon: BarChart3, tint: "text-purple/72" },
                      { text: "Compliance becomes more demanding.", icon: ShieldCheck, tint: "text-primary/72" },
                      { text: "Cash flow visibility becomes critical.", icon: Wallet, tint: "text-purple/72" },
                      { text: "Many traditional firms struggle to adapt at that pace.", icon: Clock3, tint: "text-primary/72" },
                    ].map(({ text, icon: Icon, tint }) => (
                      <div key={text} className="flex items-start gap-3.5">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/6 bg-white/72">
                          <Icon className={`h-4 w-4 ${tint}`} strokeWidth={1.8} />
                        </span>
                        <p className="pt-1 text-[1rem] leading-7 text-ink/88 sm:text-[1.05rem]">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-[1.8rem] border border-white/52 bg-[linear-gradient(135deg,rgba(245,242,250,0.94)_0%,rgba(250,246,241,0.86)_48%,rgba(246,243,251,0.92)_100%)] px-6 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.68)] sm:px-7 sm:py-7 lg:px-8 lg:py-8">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_16%_54%,rgba(105,106,246,0.14),transparent_24%),radial-gradient(circle_at_58%_52%,rgba(234,196,173,0.16),transparent_22%),radial-gradient(circle_at_86%_38%,rgba(105,106,246,0.12),transparent_18%)]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-10 left-0 w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.76),transparent)]"
                  />
                <div className="relative max-w-2xl space-y-6">
                  <p className="text-[1rem] leading-8 text-charcoal sm:text-[1.02rem]">
                    {whyWeBuiltThisParagraphs[1]}
                  </p>
                  <p className="max-w-[33rem] text-[1rem] leading-8 text-ink/88 sm:text-[1.02rem]">
                    {whyWeBuiltThisParagraphs[2]}
                  </p>
                  <div className="space-y-3">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-charcoal/68">
                      Why AccountUp Exists
                    </p>
                    <p className="max-w-[33rem] text-[1rem] leading-8 text-ink/88 sm:text-[1.02rem]">
                      {whyWeBuiltThisParagraphs[3]}
                    </p>
                  </div>
                  <p className="max-w-[33rem] text-[1rem] leading-8 text-ink sm:text-[1.02rem]">
                    {whyWeBuiltThisParagraphs[4]}
                  </p>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-8 sm:py-12 md:py-14">
        <div className="page-container">
          <div className="max-w-3xl">
            <h2 className="font-display text-[1.65rem] font-semibold tracking-tight text-ink sm:text-[2rem]">
              Who leads AccountUp
            </h2>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 md:grid-cols-2">
            {leadershipProfiles.map((profile) => (
              <Card
                key={profile.name}
                interactive={false}
                className={`relative overflow-hidden rounded-[1.5rem] p-4 sm:rounded-[1.75rem] sm:p-5 ${profile.borderClass} ${profile.cardWashClass}`}
              >
                <div
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${profile.accentClass}`}
                />
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-y-0 left-0 w-32 opacity-80 blur-2xl ${profile.imageGlowClass}`}
                />
                <div className="flex items-start gap-3 sm:gap-5">
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${profile.name} on LinkedIn`}
                    className="relative shrink-0"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute -inset-1 rounded-[1.4rem] opacity-80 blur-xl ${profile.imageGlowClass}`}
                    />
                    <span
                      className={`relative block w-20 overflow-hidden rounded-[1rem] border bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,247,252,0.9))] p-1 sm:w-28 sm:rounded-[1.2rem] ${profile.imageFrameClass}`}
                    >
                      <span className="relative block aspect-[4/5] overflow-hidden rounded-[0.8rem] sm:rounded-[0.95rem]">
                        <Image
                          src={profile.imageSrc}
                          alt={profile.imageAlt}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(17,17,19,0.04)_100%)]"
                        />
                        <span
                          aria-hidden="true"
                          className={`absolute inset-0 mix-blend-screen opacity-50 ${profile.imageGlowClass}`}
                        />
                      </span>
                    </span>
                  </a>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-display text-[1.12rem] font-semibold tracking-tight text-ink sm:text-[1.5rem]">
                          <a
                            href={profile.linkedinUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="transition-colors duration-200 hover:text-purple"
                          >
                            {profile.name}
                          </a>
                        </h3>
                        <p className="mt-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-charcoal/76 sm:mt-2 sm:text-[0.72rem]">
                          {profile.role}
                        </p>
                      </div>
                      <span className="shrink-0">
                        <a
                          href={profile.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${profile.name} on LinkedIn`}
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-full border bg-white/94 shadow-[0_12px_26px_-22px_rgba(15,23,42,0.38)] transition-colors duration-200 hover:text-ink sm:h-9 sm:w-9 ${profile.badgeClass}`}
                        >
                          <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.9} />
                          <span className="sr-only">LinkedIn</span>
                        </a>
                      </span>
                    </div>
                    <div className="mt-3 h-px w-full bg-[linear-gradient(90deg,rgba(17,17,19,0.09),rgba(17,17,19,0.03),transparent)] sm:mt-4" />
                    <p className="mt-3 text-[0.92rem] leading-6.5 text-charcoal sm:mt-4 sm:text-[0.98rem] sm:leading-7">
                      {profile.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-12 md:py-14">
        <div className="page-container">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.1rem]">
              Who we serve
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card
              interactive={false}
              className="relative overflow-hidden rounded-[1.75rem] border-purple/16 bg-white/86 p-6 md:p-8"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-purple/55 via-lavender-2/50 to-transparent"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/76">
                We support:
              </p>
              <ul className="mt-5 space-y-3 text-base leading-7 text-charcoal">
                {supportItems.map((item) => (
                  <li
                    key={item}
                    className="rounded-[1.2rem] border border-purple/10 bg-white/92 px-4 py-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card
              interactive={false}
              className="relative overflow-hidden rounded-[1.75rem] border-primary/16 bg-white/86 p-6 md:p-8"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/58 via-warm-peach/50 to-transparent"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/76">
                Industries we commonly work with include:
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {industryItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <li
                      key={item.label}
                      className={`flex min-h-[5.5rem] rounded-[1.2rem] border bg-white/92 px-4 py-3.5 ${item.borderClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] border ${item.iconShellClass}`}
                        >
                          <Icon className="h-4.5 w-4.5 text-ink/72" strokeWidth={1.8} />
                        </span>
                        <span className="text-sm font-medium leading-6 text-charcoal sm:text-[0.95rem]">
                          {item.label}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
