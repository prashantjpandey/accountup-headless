import { Hero } from "@/components/home/Hero";
import { TrustedBy } from "@/components/home/TrustedBy";
import { TraditionalVsAccountup } from "@/components/home/TraditionalVsAccountup";
import { CoreServices } from "@/components/home/CoreServices";
import { Testimonials } from "@/components/home/Testimonials";
import { PricingTeaser } from "@/components/home/PricingTeaser";
import { StackBuilderCta } from "@/components/home/StackBuilderCta";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <TraditionalVsAccountup />
      <CoreServices />
      <Testimonials />
      <PricingTeaser />
      <StackBuilderCta />
      <ContactSection />
    </>
  );
}
