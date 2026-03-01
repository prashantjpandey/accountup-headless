import type { Metadata } from "next";
import { RdTaxClaimsLandingPage } from "@/components/rd-tax/RdTaxClaimsLandingPage";

export const metadata: Metadata = {
  title: "UK R&D Tax Claims for Startups | Accountup",
  description:
    "Clean, defensible UK R&D tax claims for startups. Accountup helps founders structure HMRC R&D claims, software development R&D claim evidence, and financial support behind stronger submissions.",
};

export default function UkRdTaxClaimsPage() {
  return <RdTaxClaimsLandingPage />;
}
