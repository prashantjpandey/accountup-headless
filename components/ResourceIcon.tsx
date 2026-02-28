import type { ResourceCategory, ResourceIconKey } from "@/lib/resources";
import {
  resourceCategoryTintMap,
  resourceIconMap,
} from "@/lib/resources";

type ResourceIconProps = {
  category: ResourceCategory;
  iconKey?: ResourceIconKey;
};

export function ResourceIcon({
  category,
  iconKey = "runway",
}: ResourceIconProps) {
  const Icon = resourceIconMap[iconKey];

  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border bg-white/88 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.35)] ${resourceCategoryTintMap[category]}`}
    >
      <Icon className="h-5 w-5 text-ink/78" strokeWidth={1.9} />
    </span>
  );
}
