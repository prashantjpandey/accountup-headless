import { permanentRedirect } from "next/navigation";

export default function LegacyInsightsPage() {
  permanentRedirect("/insights");
}
