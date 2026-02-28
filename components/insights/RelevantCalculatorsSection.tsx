import { ResourceCard } from "@/components/ResourceCard";
import { SectionHeader } from "@/components/SectionHeader";
import type { ResourceItem } from "@/lib/resources";

type RelevantCalculatorsSectionProps = {
  calculators: ResourceItem[];
};

export function RelevantCalculatorsSection({
  calculators,
}: RelevantCalculatorsSectionProps) {
  if (calculators.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 md:mt-14">
      <SectionHeader
        title="Relevant Tools"
        description="Explore the tools connected to this topic and turn the insight into a clearer next step."
      />
      <div className="mt-8 grid gap-5 sm:gap-6 md:mt-10 md:grid-cols-2">
        {calculators.map((calculator) => (
          <div key={calculator.href} className="h-full">
            <ResourceCard {...calculator} />
          </div>
        ))}
      </div>
    </section>
  );
}
