"use client";

import { GrantsDirectoryPanel } from "@/components/grants/GrantsDirectoryPanel";
import type { GrantDirectoryItem } from "@/lib/grants";

type GrantsDirectoryClientProps = {
  grants: GrantDirectoryItem[];
  regionOptions: string[];
  sizeOptions: string[];
  benefitTypeOptions: string[];
  initialQuery: string;
  initialRegion: string;
  initialSize: string;
  initialType: string;
  initialComplexity: string;
};

export function GrantsDirectoryClient(props: GrantsDirectoryClientProps) {
  return <GrantsDirectoryPanel {...props} />;
}
