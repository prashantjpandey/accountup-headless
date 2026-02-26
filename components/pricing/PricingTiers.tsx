import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PRICING_TIERS } from "@/lib/constants";
import Link from "next/link";

export function PricingTiers() {
  return (
    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
      {PRICING_TIERS.map((tier) => (
        <Card
          key={tier.id}
          variant={tier.emphasized ? "emphasized" : "default"}
          className={`p-6 md:p-8 flex flex-col ${tier.recommended ? "ring-1 ring-purple/30" : ""}`}
        >
          {tier.recommended && (
            <span className="text-xs font-semibold text-purple uppercase tracking-wider mb-4">
              Recommended
            </span>
          )}
          <h3 className="text-xl font-semibold text-ink">{tier.name}</h3>
          <p className="text-sm text-charcoal mt-1">{tier.description}</p>
          <p className="mt-4 text-2xl font-semibold text-ink">
            {tier.price}
            <span className="text-base font-normal text-charcoal">
              {tier.period}
            </span>
          </p>
          <ul className="mt-6 space-y-2 flex-1">
            {tier.bullets.map((b) => (
              <li key={b} className="text-sm text-charcoal flex gap-2">
                <span className="text-purple shrink-0">✓</span>
                {b}
              </li>
            ))}
          </ul>
          <Button
            asChild
            variant={tier.emphasized ? "primary" : "secondary"}
            size="md"
            className="mt-8 w-full"
          >
            <Link href="/#contact">{tier.cta}</Link>
          </Button>
        </Card>
      ))}
    </div>
  );
}
