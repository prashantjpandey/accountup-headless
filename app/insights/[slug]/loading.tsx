export default function LoadingInsightDetailPage() {
  return (
    <section className="surface-default page-shell py-16 sm:py-20 md:py-24">
      <div className="page-container">
        <div className="mx-auto max-w-3xl">
          <div className="h-5 w-28 animate-pulse rounded-full bg-black/6" />
          <div className="mt-8 h-10 w-36 animate-pulse rounded-full bg-black/6" />
          <div className="mt-6 h-14 w-4/5 animate-pulse rounded-[1.25rem] bg-black/6" />
          <div className="mt-5 h-6 w-3/4 animate-pulse rounded-full bg-black/6" />
          <div className="mt-10 aspect-[16/8.8] animate-pulse rounded-[2rem] bg-[linear-gradient(180deg,#f7f4ff_0%,#f6efe9_100%)]" />
          <div className="mt-10 space-y-4">
            <div className="h-4 w-full animate-pulse rounded-full bg-black/6" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-black/6" />
            <div className="h-32 animate-pulse rounded-[2rem] bg-black/6" />
            <div className="h-4 w-full animate-pulse rounded-full bg-black/6" />
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-black/6" />
          </div>
        </div>
      </div>
    </section>
  );
}
