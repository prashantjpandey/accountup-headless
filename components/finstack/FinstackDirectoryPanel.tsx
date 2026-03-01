"use client";

import { startTransition, useDeferredValue, useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FinstackToolCard } from "@/components/finstack/FinstackToolCard";
import type { FinstackTool } from "@/lib/finstack";

type FinstackDirectoryPanelProps = {
  tools: FinstackTool[];
  categories: string[];
  initialQuery: string;
  initialCategory: string;
};

function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase();
}

export function FinstackDirectoryPanel({
  tools,
  categories,
  initialQuery,
  initialCategory,
}: FinstackDirectoryPanelProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, beginTransition] = useTransition();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const nextSearchParams = new URLSearchParams();
    const trimmedQuery = deferredQuery.trim();
    const trimmedCategory = category.trim();

    if (trimmedQuery) {
      nextSearchParams.set("q", trimmedQuery);
    }

    if (trimmedCategory) {
      nextSearchParams.set("category", trimmedCategory);
    }

    const queryString = nextSearchParams.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    beginTransition(() => {
      startTransition(() => {
        router.replace(nextUrl, { scroll: false });
      });
    });
  }, [category, deferredQuery, pathname, router]);

  const filteredTools = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(deferredQuery);

    return tools.filter((tool) => {
      if (category && tool.category !== category) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const title = normalizeSearchValue(tool.title);
      const integrations = tool.keyIntegrations.map((entry) => normalizeSearchValue(entry));

      return title.includes(normalizedQuery) || integrations.some((entry) => entry.includes(normalizedQuery));
    });
  }, [category, deferredQuery, tools]);

  const hasActiveFilters = query.trim().length > 0 || category.trim().length > 0;
  const hasCmsData = tools.length > 0;

  function clearFilters() {
    setQuery("");
    setCategory("");
  }

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(15rem,0.8fr)_auto] lg:items-end">
        <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
          <span>Search</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title or integration"
            className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm font-medium text-ink outline-none transition-colors duration-200 focus:border-purple/30"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
          <span>Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm font-medium text-ink outline-none transition-colors duration-200 focus:border-purple/30"
          >
            <option value="">All categories</option>
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <div className="flex min-h-12 items-center justify-between gap-4 lg:justify-end">
          <p className="text-sm text-charcoal">{hasCmsData ? `${filteredTools.length} tools` : "CMS unavailable"}</p>
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

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-black/6 pt-4">
        <p className="text-sm text-charcoal">
          {isPending ? "Updating directory..." : "Search and category filters stay in the URL."}
        </p>
      </div>

      {!hasCmsData ? (
        <div className="mt-8 rounded-[2rem] border border-black/8 bg-white/80 px-6 py-10 text-center shadow-[0_20px_46px_-34px_rgba(15,23,42,0.24)]">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
            FinStack UK is temporarily unavailable
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-charcoal sm:text-base">
            We could not load the Wix CMS directory right now. Once the collection is available, this page
            will render directly from `FinStackUK`.
          </p>
        </div>
      ) : filteredTools.length === 0 ? (
        <div className="mt-8 rounded-[2rem] border border-black/8 bg-white/80 px-6 py-10 text-center shadow-[0_20px_46px_-34px_rgba(15,23,42,0.24)]">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
            No tools match the current filters
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-charcoal sm:text-base">
            Try a different search term or clear the category filter to see more tools.
          </p>
          {hasActiveFilters ? (
            <div className="mt-6">
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-semibold text-purple transition-colors duration-200 hover:text-ink"
              >
                Reset filters
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-8 grid items-start gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTools.map((tool) => (
            <div key={tool.id}>
              <FinstackToolCard tool={tool} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
