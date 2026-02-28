"use client";

import { useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { InsightFilterOption } from "@/lib/insights";

type InsightsFilterBarProps = {
  categoryOptions: InsightFilterOption[];
  contentTypeOptions: InsightFilterOption[];
};

export function InsightsFilterBar({
  categoryOptions,
  contentTypeOptions,
}: InsightsFilterBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const state = useMemo(
    () => ({
      categories: searchParams.getAll("category"),
      contentType: searchParams.get("contentType") ?? "",
      sort: searchParams.get("sort") ?? "newest",
      expertReviewed:
        searchParams.get("expertReviewed") === "1" ||
        searchParams.get("expertReviewed") === "true",
    }),
    [searchParams],
  );

  function commit(nextSearchParams: URLSearchParams) {
    nextSearchParams.delete("page");
    const queryString = nextSearchParams.toString();

    startTransition(() => {
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    });
  }

  function toggleCategory(category: string) {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    const categories = new Set(nextSearchParams.getAll("category"));

    if (categories.has(category)) {
      categories.delete(category);
    } else {
      categories.add(category);
    }

    nextSearchParams.delete("category");

    for (const value of categories) {
      nextSearchParams.append("category", value);
    }

    commit(nextSearchParams);
  }

  function updateContentType(contentType: string) {
    const nextSearchParams = new URLSearchParams(searchParams.toString());

    if (contentType) {
      nextSearchParams.set("contentType", contentType);
    } else {
      nextSearchParams.delete("contentType");
    }

    commit(nextSearchParams);
  }

  function updateSort(sort: string) {
    const nextSearchParams = new URLSearchParams(searchParams.toString());

    if (sort && sort !== "newest") {
      nextSearchParams.set("sort", sort);
    } else {
      nextSearchParams.delete("sort");
    }

    commit(nextSearchParams);
  }

  function toggleExpertReviewed() {
    const nextSearchParams = new URLSearchParams(searchParams.toString());

    if (state.expertReviewed) {
      nextSearchParams.delete("expertReviewed");
    } else {
      nextSearchParams.set("expertReviewed", "1");
    }

    commit(nextSearchParams);
  }

  function clearFilters() {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.delete("category");
    nextSearchParams.delete("contentType");
    nextSearchParams.delete("expertReviewed");
    nextSearchParams.delete("sort");
    nextSearchParams.delete("page");
    commit(nextSearchParams);
  }

  const hasActiveFilters =
    state.categories.length > 0 ||
    state.contentType ||
    state.expertReviewed ||
    state.sort !== "newest";

  return (
    <div className="rounded-[2rem] border border-white/78 bg-white/72 p-5 shadow-[0_24px_54px_-36px_rgba(15,23,42,0.34)] backdrop-blur-sm sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal">
            Filter by category
          </p>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((option) => {
              const selected = state.categories.includes(option.value);

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleCategory(option.value)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                    selected
                      ? "border-purple bg-purple text-white"
                      : "border-black/10 bg-white text-ink hover:border-purple/24 hover:text-purple"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:min-w-[32rem]">
          <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
            <span>Content type</span>
            <select
              value={state.contentType}
              onChange={(event) => updateContentType(event.target.value)}
              className="h-11 rounded-xl border border-black/10 bg-white px-4 text-sm font-medium text-ink outline-none transition-colors duration-200 focus:border-purple/30"
            >
              <option value="">All types</option>
              {contentTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
            <span>Sort</span>
            <select
              value={state.sort}
              onChange={(event) => updateSort(event.target.value)}
              className="h-11 rounded-xl border border-black/10 bg-white px-4 text-sm font-medium text-ink outline-none transition-colors duration-200 focus:border-purple/30"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="reading-time">Reading time</option>
            </select>
          </label>

          <div className="flex flex-col gap-2 text-sm font-semibold text-ink">
            <span>Review status</span>
            <button
              type="button"
              onClick={toggleExpertReviewed}
              aria-pressed={state.expertReviewed}
              className={`flex h-11 items-center justify-center rounded-xl border px-4 text-sm font-semibold transition-colors duration-200 ${
                state.expertReviewed
                  ? "border-purple bg-purple text-white"
                  : "border-black/10 bg-white text-ink hover:border-purple/24 hover:text-purple"
              }`}
            >
              Expert reviewed only
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-sm text-charcoal">
          {isPending ? "Updating insights..." : "Shareable filters are kept in the URL."}
        </p>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-semibold text-ink transition-colors duration-200 hover:text-purple"
          >
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  );
}
