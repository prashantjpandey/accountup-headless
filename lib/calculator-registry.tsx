import type { ReactNode } from "react";
import { BreakEvenHiringCalculator } from "@/components/calculators/BreakEvenHiringCalculator";
import { CacPaybackCalculator } from "@/components/calculators/CacPaybackCalculator";
import { RunwayBurnCalculator } from "@/components/calculators/RunwayBurnCalculator";
import { StartupValuationCalculator } from "@/components/calculators/StartupValuationCalculator";
import type { CalculatorResource } from "@/lib/resources";

const calculatorElementMap: Record<CalculatorResource["slug"], ReactNode> = {
  "runway-burn": <RunwayBurnCalculator />,
  "cac-payback": <CacPaybackCalculator />,
  "break-even-hiring": <BreakEvenHiringCalculator />,
  "startup-valuation": <StartupValuationCalculator />,
};

export function getCalculatorElement(slug: CalculatorResource["slug"]) {
  return calculatorElementMap[slug];
}
