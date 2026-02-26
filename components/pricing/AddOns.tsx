import { ADDONS } from "@/lib/constants";

export function AddOns() {
  return (
    <section className="py-16 md:py-20 px-6 bg-background-alt">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-medium text-ink mb-2 font-display">Add-ons</h2>
        <p className="text-charcoal text-sm mb-10">
          Optional services available with any plan.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {ADDONS.map((addon) => (
            <div
              key={addon.name}
              className="rounded-xl border border-lavender-1/50 bg-white p-5 hover:border-lavender-2/50 transition-colors"
            >
              <p className="font-medium text-ink">{addon.name}</p>
              <p className="text-sm text-charcoal mt-1">{addon.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
