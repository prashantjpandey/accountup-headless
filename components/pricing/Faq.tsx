import { Accordion } from "@/components/ui/Accordion";
import { FAQ_ITEMS } from "@/lib/constants";

export function Faq() {
  return (
    <section className="py-16 md:py-20 px-6 bg-white">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold text-ink mb-2">
          Frequently asked questions
        </h2>
        <p className="text-charcoal text-sm mb-10">
          Clear answers. No fluff.
        </p>
        <Accordion items={FAQ_ITEMS} />
      </div>
    </section>
  );
}
