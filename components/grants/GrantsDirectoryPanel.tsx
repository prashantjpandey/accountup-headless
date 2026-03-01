"use client";

import {
  startTransition,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { Landmark, Search, SlidersHorizontal } from "lucide-react";
import { GrantCard } from "@/components/grants/GrantCard";
import { GrantDetailModal } from "@/components/grants/GrantDetailModal";
import { Card } from "@/components/ui/Card";
import type { GrantComplexityScore, GrantDirectoryItem } from "@/lib/grants";

type GrantsDirectoryPanelProps = {
  grants: GrantDirectoryItem[];
  regionOptions: string[];
  sizeOptions: string[];
  benefitTypeOptions: string[];
  initialQuery: string;
  initialRegion: string;
  initialSize: string;
  initialType: string;
  initialComplexity: string;
};

type DistributionItem = {
  label: string;
  count: number;
};

function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase();
}

function isCompetitiveGrant(grant: GrantDirectoryItem) {
  return grant.competitivenessIndicator?.toLowerCase().includes("competitive") ?? false;
}

function hasUpcomingFixedDeadline(grant: GrantDirectoryItem) {
  return grant.deadlineType === "Fixed" && grant.nextDeadline !== null;
}

function buildDistribution(values: string[]) {
  const counts = new Map<string, number>();

  for (const value of values) {
    if (!value) {
      continue;
    }

    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return Array.from(counts, ([label, count]) => ({ label, count }));
}

function getFilteredSummary(grants: GrantDirectoryItem[]) {
  return {
    totalPrograms: grants.length,
    competitivePrograms: grants.filter(isCompetitiveGrant).length,
    upcomingDeadlines: grants.filter(hasUpcomingFixedDeadline).length,
    byRegion: buildDistribution(grants.map((grant) => grant.regionState)),
    byBusinessSize: buildDistribution(grants.flatMap((grant) => grant.businessSizeEligibility)),
  };
}

function getComplexityRank(complexity: GrantComplexityScore | null) {
  if (complexity === "Low") {
    return 1;
  }

  if (complexity === "Medium") {
    return 2;
  }

  if (complexity === "High") {
    return 3;
  }

  return 99;
}

function complexityMatches(grant: GrantDirectoryItem, complexity: string) {
  if (!complexity || complexity === "All") {
    return true;
  }

  if (complexity === "Low") {
    return grant.complexityScore === "Low";
  }

  if (complexity === "Medium") {
    return getComplexityRank(grant.complexityScore) <= 2;
  }

  return true;
}

function benefitTypeMatches(grant: GrantDirectoryItem, benefitType: string) {
  if (!benefitType || benefitType === "All") {
    return true;
  }

  return grant.benefitType.includes(benefitType);
}

function getBarTintClassName(index: number) {
  const tints = [
    "from-primary to-purple",
    "from-warm-peach to-primary",
    "from-purple to-lavender-2",
    "from-emerald-500 to-primary",
    "from-primary to-amber-500",
  ];

  return tints[index % tints.length] ?? tints[0];
}

function DistributionCard({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: DistributionItem[];
}) {
  const maxValue = Math.max(...items.map((item) => item.count), 1);

  return (
    <Card
      interactive={false}
      className="overflow-hidden border-black/8 bg-white/84 p-5 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.26)] md:p-6"
    >
      <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-charcoal">{description}</p>
      <div className="mt-6 space-y-4">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={item.label}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-ink">{item.label}</span>
                <span className="text-charcoal">{item.count}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-black/6">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${getBarTintClassName(index)}`}
                  style={{ width: `${(item.count / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="rounded-2xl border border-black/8 bg-background px-4 py-3 text-sm text-charcoal">
            No distribution data is available for the current filters.
          </p>
        )}
      </div>
    </Card>
  );
}

export function GrantsDirectoryPanel({
  grants,
  regionOptions,
  sizeOptions,
  benefitTypeOptions,
  initialQuery,
  initialRegion,
  initialSize,
  initialType,
  initialComplexity,
}: GrantsDirectoryPanelProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, beginTransition] = useTransition();
  const [query, setQuery] = useState(initialQuery);
  const [region, setRegion] = useState(initialRegion);
  const [size, setSize] = useState(initialSize);
  const [benefitType, setBenefitType] = useState(initialType);
  const [complexity, setComplexity] = useState(initialComplexity || "All");
  const [selectedGrantId, setSelectedGrantId] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setRegion(initialRegion);
  }, [initialRegion]);

  useEffect(() => {
    setSize(initialSize);
  }, [initialSize]);

  useEffect(() => {
    setBenefitType(initialType);
  }, [initialType]);

  useEffect(() => {
    setComplexity(initialComplexity || "All");
  }, [initialComplexity]);

  useEffect(() => {
    const nextSearchParams = new URLSearchParams();
    const trimmedQuery = deferredQuery.trim();
    const trimmedRegion = region.trim();
    const trimmedSize = size.trim();
    const trimmedType = benefitType.trim();
    const trimmedComplexity = complexity.trim();

    if (trimmedQuery) {
      nextSearchParams.set("q", trimmedQuery);
    }

    if (trimmedRegion) {
      nextSearchParams.set("region", trimmedRegion);
    }

    if (trimmedSize) {
      nextSearchParams.set("size", trimmedSize);
    }

    if (trimmedType) {
      nextSearchParams.set("type", trimmedType);
    }

    if (trimmedComplexity && trimmedComplexity !== "All") {
      nextSearchParams.set("complexity", trimmedComplexity);
    }

    const queryString = nextSearchParams.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    beginTransition(() => {
      startTransition(() => {
        router.replace(nextUrl, { scroll: false });
      });
    });
  }, [benefitType, complexity, deferredQuery, pathname, region, router, size]);

  const filteredGrants = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(deferredQuery);

    return grants.filter((grant) => {
      const matchesQuery =
        !normalizedQuery ||
        normalizeSearchValue(grant.title).includes(normalizedQuery) ||
        normalizeSearchValue(grant.officialAdministeringAuthority).includes(normalizedQuery) ||
        grant.eligibleExpenses.some((expense) =>
          normalizeSearchValue(expense).includes(normalizedQuery),
        );

      const matchesRegion = !region || region === "All" || grant.regionState === region;
      const matchesSize = !size || size === "All" || grant.businessSizeEligibility.includes(size);

      return (
        matchesQuery &&
        matchesRegion &&
        matchesSize &&
        benefitTypeMatches(grant, benefitType) &&
        complexityMatches(grant, complexity)
      );
    });
  }, [benefitType, complexity, deferredQuery, grants, region, size]);

  const selectedGrant = filteredGrants.find((grant) => grant.id === selectedGrantId) ?? null;
  const hasCmsData = grants.length > 0;
  const hasActiveFilters =
    query.trim().length > 0 ||
    region.trim().length > 0 ||
    size.trim().length > 0 ||
    benefitType.trim().length > 0 ||
    (complexity.trim().length > 0 && complexity !== "All");
  const summary = useMemo(() => getFilteredSummary(filteredGrants), [filteredGrants]);

  useEffect(() => {
    if (selectedGrantId && !filteredGrants.some((grant) => grant.id === selectedGrantId)) {
      setSelectedGrantId(null);
    }
  }, [filteredGrants, selectedGrantId]);

  function clearFilters() {
    setQuery("");
    setRegion("");
    setSize("");
    setBenefitType("");
    setComplexity("All");
  }

  return (
    <div>
      <div className="max-w-4xl">
        <p className="eyebrow-chip">Funding Landscape Overview</p>
        <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.3rem]">
          Scan the live grant landscape before you narrow the list.
        </h2>
        <p className="mt-4 text-sm leading-7 text-charcoal sm:text-base">
          Compare where support is concentrated, how competitive the current pool looks, and which
          program types fit your business before you spend time on a full application.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card
          interactive={false}
          className="border-primary/14 bg-white/84 p-5 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.26)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/78">
            Total Active Programs
          </p>
          <p className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink">
            {summary.totalPrograms}
          </p>
        </Card>
        <Card
          interactive={false}
          className="border-primary/14 bg-white/84 p-5 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.26)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/78">
            High Competitiveness
          </p>
          <p className="mt-4 font-display text-4xl font-semibold tracking-tight text-amber-700">
            {summary.competitivePrograms}
          </p>
        </Card>
        <Card
          interactive={false}
          className="border-primary/14 bg-white/84 p-5 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.26)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/78">
            Upcoming Deadlines
          </p>
          <p className="mt-4 font-display text-4xl font-semibold tracking-tight text-rose-700">
            {summary.upcomingDeadlines}
          </p>
        </Card>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <DistributionCard
          title="Programs by Region"
          description="Funding concentration updates with your filters, so you can quickly see where support is most available."
          items={summary.byRegion}
        />
        <DistributionCard
          title="Target Business Size"
          description="See which business sizes appear most often across the active grants currently in view."
          items={summary.byBusinessSize}
        />
      </div>

      <div className="mt-10 max-w-4xl">
        <p className="eyebrow-chip">Interactive Directory Explorer</p>
        <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-[2.3rem]">
          Filter the grants that are actually worth your time.
        </h2>
        <p className="mt-4 text-sm leading-7 text-charcoal sm:text-base">
          Search the live directory by region, company size, benefit type, and application
          complexity. Open any result to review application mechanics, required documents, and the
          most common rejection patterns.
        </p>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="xl:sticky xl:top-6 xl:self-start">
          <Card
            interactive={false}
            className="border-black/8 bg-white/84 p-5 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.26)]"
          >
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-charcoal/78">
              <SlidersHorizontal size={16} />
              Filter Grants
            </div>

            <div className="mt-5 space-y-4">
              <label className="block text-sm font-semibold text-ink">
                <span className="mb-2 flex items-center gap-2">
                  <Search size={14} />
                  Search Keyword
                </span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="R&D, innovation, energy..."
                  className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm font-medium text-ink outline-none transition-colors duration-200 focus:border-purple/30"
                />
              </label>

              <label className="block text-sm font-semibold text-ink">
                <span className="mb-2 block">Region</span>
                <select
                  value={region}
                  onChange={(event) => setRegion(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm font-medium text-ink outline-none transition-colors duration-200 focus:border-purple/30"
                >
                  <option value="">All UK regions</option>
                  {regionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-semibold text-ink">
                <span className="mb-2 block">Business Size</span>
                <select
                  value={size}
                  onChange={(event) => setSize(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm font-medium text-ink outline-none transition-colors duration-200 focus:border-purple/30"
                >
                  <option value="">All sizes</option>
                  {sizeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-semibold text-ink">
                <span className="mb-2 block">Benefit Type</span>
                <select
                  value={benefitType}
                  onChange={(event) => setBenefitType(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm font-medium text-ink outline-none transition-colors duration-200 focus:border-purple/30"
                >
                  <option value="">All benefit types</option>
                  {benefitTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-semibold text-ink">
                <span className="mb-2 block">Max Complexity</span>
                <select
                  value={complexity}
                  onChange={(event) => setComplexity(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm font-medium text-ink outline-none transition-colors duration-200 focus:border-purple/30"
                >
                  <option value="All">Any complexity</option>
                  <option value="Low">Low only</option>
                  <option value="Medium">Up to medium</option>
                </select>
              </label>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 w-full rounded-2xl border border-black/10 bg-background px-4 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:border-black/16 hover:bg-white"
            >
              Reset Filters
            </button>
          </Card>
        </aside>

        <div>
          <div className="flex flex-col gap-4 rounded-[1.8rem] border border-black/8 bg-white/72 px-5 py-4 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.22)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">
                {hasCmsData
                  ? `Showing ${filteredGrants.length} grant${filteredGrants.length === 1 ? "" : "s"}`
                  : "CMS unavailable"}
              </p>
              <p className="mt-1 text-sm text-charcoal">
                {isPending ? "Updating directory..." : "Refine the directory with search and filters."}
              </p>
            </div>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-semibold text-ink transition-colors duration-200 hover:text-purple"
              >
                Clear all filters
              </button>
            ) : null}
          </div>

          {!hasCmsData ? (
            <Card
              interactive={false}
              className="mt-6 border-black/8 bg-white/84 px-6 py-10 text-center shadow-[0_18px_44px_-34px_rgba(15,23,42,0.26)]"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/16 bg-primary/8 text-primary">
                <Landmark size={24} />
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
                UK grants data is temporarily unavailable
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-charcoal sm:text-base">
                The grants directory could not be loaded right now. Please check back shortly.
              </p>
            </Card>
          ) : filteredGrants.length === 0 ? (
            <Card
              interactive={false}
              className="mt-6 border-black/8 bg-white/84 px-6 py-10 text-center shadow-[0_18px_44px_-34px_rgba(15,23,42,0.26)]"
            >
              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                No matching grants found
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-charcoal sm:text-base">
                Try broadening the search term or clearing one of the directory filters.
              </p>
            </Card>
          ) : (
            <div className="mt-6 grid items-start gap-5 sm:gap-6 md:grid-cols-2">
              {filteredGrants.map((grant) => (
                <div key={grant.id}>
                  <GrantCard grant={grant} onOpenDetails={() => setSelectedGrantId(grant.id)} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <GrantDetailModal grant={selectedGrant} onClose={() => setSelectedGrantId(null)} />
    </div>
  );
}
