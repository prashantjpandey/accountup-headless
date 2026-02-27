import type { Metadata } from "next";
import { PricingExperience } from "@/components/pricing/PricingExperience";

export const metadata: Metadata = {
  title: "Pricing - Accountup",
  description:
    "Transparent modular finance pricing based on expenses, team size, and service modules.",
};

export default function PricingPage() {
  return <PricingExperience />;
}
