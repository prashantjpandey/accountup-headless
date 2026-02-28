function LoadingCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-black/8 bg-white/82 shadow-[0_20px_46px_-34px_rgba(15,23,42,0.34)]">
      <div className="aspect-[16/10] animate-pulse bg-[linear-gradient(180deg,#f7f4ff_0%,#f6efe9_100%)]" />
      <div className="space-y-4 p-6">
        <div className="h-4 w-28 animate-pulse rounded-full bg-black/6" />
        <div className="h-8 w-4/5 animate-pulse rounded-2xl bg-black/6" />
        <div className="h-4 w-full animate-pulse rounded-full bg-black/6" />
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-black/6" />
      </div>
    </div>
  );
}

export default function LoadingInsightsPage() {
  return (
    <>
      <section className="resources-hero-surface page-shell py-16 sm:py-20 md:py-24">
        <div className="page-container">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/78 bg-white/70 px-6 py-12 text-center shadow-[0_24px_54px_-36px_rgba(15,23,42,0.34)] backdrop-blur-sm sm:px-8 md:px-12 md:py-16">
            <div className="mx-auto h-8 w-28 animate-pulse rounded-full bg-black/6" />
            <div className="mx-auto mt-6 h-12 w-3/4 animate-pulse rounded-[1.25rem] bg-black/6" />
            <div className="mx-auto mt-5 h-5 w-2/3 animate-pulse rounded-full bg-black/6" />
          </div>
        </div>
      </section>

      <section className="surface-muted page-shell py-10 sm:py-12 md:py-14">
        <div className="page-container">
          <div className="rounded-[2rem] border border-white/78 bg-white/72 p-5 shadow-[0_24px_54px_-36px_rgba(15,23,42,0.34)] backdrop-blur-sm sm:p-6">
            <div className="h-24 animate-pulse rounded-[1.5rem] bg-black/6" />
          </div>
          <div className="mt-10 grid gap-5 sm:gap-6 md:mt-12 md:grid-cols-2 xl:grid-cols-3">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        </div>
      </section>
    </>
  );
}
