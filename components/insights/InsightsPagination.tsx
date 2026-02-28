import Link from "next/link";
import type { InsightQueryParams } from "@/lib/insights";

type InsightsPaginationProps = {
  currentPage: number;
  totalPages: number;
  queryParams: InsightQueryParams;
};

function buildPageHref(page: number, queryParams: InsightQueryParams) {
  const searchParams = new URLSearchParams();

  for (const category of queryParams.categories) {
    searchParams.append("category", category);
  }

  if (queryParams.contentType) {
    searchParams.set("contentType", queryParams.contentType);
  }

  if (queryParams.expertReviewed) {
    searchParams.set("expertReviewed", "1");
  }

  if (queryParams.sort !== "newest") {
    searchParams.set("sort", queryParams.sort);
  }

  if (page > 1) {
    searchParams.set("page", String(page));
  }

  const queryString = searchParams.toString();
  return queryString ? `/insights?${queryString}` : "/insights";
}

export function InsightsPagination({
  currentPage,
  totalPages,
  queryParams,
}: InsightsPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2 md:mt-12"
      aria-label="Insights pagination"
    >
      {currentPage > 1 ? (
        <Link
          href={buildPageHref(currentPage - 1, queryParams)}
          className="inline-flex h-11 items-center rounded-xl border border-black/10 bg-white/88 px-4 text-sm font-semibold text-ink transition-colors duration-200 hover:border-purple/24 hover:text-purple"
        >
          Previous
        </Link>
      ) : null}

      {pages.map((page) => {
        const isActive = page === currentPage;

        return (
          <Link
            key={page}
            href={buildPageHref(page, queryParams)}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex h-11 min-w-11 items-center justify-center rounded-xl border px-4 text-sm font-semibold transition-colors duration-200 ${
              isActive
                ? "border-purple bg-purple text-white"
                : "border-black/10 bg-white/88 text-ink hover:border-purple/24 hover:text-purple"
            }`}
          >
            {page}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link
          href={buildPageHref(currentPage + 1, queryParams)}
          className="inline-flex h-11 items-center rounded-xl border border-black/10 bg-white/88 px-4 text-sm font-semibold text-ink transition-colors duration-200 hover:border-purple/24 hover:text-purple"
        >
          Next
        </Link>
      ) : null}
    </nav>
  );
}
