"use client";

import { useId, useState } from "react";
import { FinstackDirectoryPanel } from "@/components/finstack/FinstackDirectoryPanel";
import { FinstackStackBuilder } from "@/components/finstack/FinstackStackBuilder";
import type { FinstackTool } from "@/lib/finstack";

type FinstackDirectoryClientProps = {
  tools: FinstackTool[];
  categories: string[];
  initialQuery: string;
  initialCategory: string;
};

export function FinstackDirectoryClient({
  tools,
  categories,
  initialQuery,
  initialCategory,
}: FinstackDirectoryClientProps) {
  const [activeTab, setActiveTab] = useState<"directory" | "stack-builder">("directory");
  const tabListLabelId = useId();

  return (
    <div>
      <div
        className="rounded-2xl border border-black/10 bg-white/82 p-2 shadow-[0_18px_48px_-36px_rgba(8,10,18,0.35)] backdrop-blur-sm"
        aria-labelledby={tabListLabelId}
      >
        <p
          id={tabListLabelId}
          className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-[0.09em] text-charcoal"
        >
          FinStack UK tools and recommendations
        </p>
        <div className="grid gap-2 md:grid-cols-2" role="tablist" aria-label="FinStack UK views">
          <button
            type="button"
            role="tab"
            id="finstack-tab-directory"
            aria-selected={activeTab === "directory"}
            aria-controls="finstack-panel-directory"
            className={`rounded-xl border px-4 py-3 text-left transition-colors ${
              activeTab === "directory"
                ? "border-purple/25 bg-purple text-white"
                : "border-black/8 bg-white text-ink hover:bg-neutral-50"
            }`}
            onClick={() => setActiveTab("directory")}
          >
            <p className="text-sm font-semibold">Directory</p>
            <p className={`mt-1 text-xs ${activeTab === "directory" ? "text-white/85" : "text-charcoal"}`}>
              Search and filter the live CMS dataset.
            </p>
          </button>
          <button
            type="button"
            role="tab"
            id="finstack-tab-stack-builder"
            aria-selected={activeTab === "stack-builder"}
            aria-controls="finstack-panel-stack-builder"
            className={`rounded-xl border px-4 py-3 text-left transition-colors ${
              activeTab === "stack-builder"
                ? "border-purple/25 bg-purple text-white"
                : "border-black/8 bg-white text-ink hover:bg-neutral-50"
            }`}
            onClick={() => setActiveTab("stack-builder")}
          >
            <p className="text-sm font-semibold">Stack Builder</p>
            <p className={`mt-1 text-xs ${activeTab === "stack-builder" ? "text-white/85" : "text-charcoal"}`}>
              Generate a rollout-ready finance stack from the same tool data.
            </p>
          </button>
        </div>
      </div>

      <div
        id="finstack-panel-directory"
        role="tabpanel"
        aria-labelledby="finstack-tab-directory"
        hidden={activeTab !== "directory"}
        className="mt-8"
      >
        <FinstackDirectoryPanel
          tools={tools}
          categories={categories}
          initialQuery={initialQuery}
          initialCategory={initialCategory}
        />
      </div>

      <div
        id="finstack-panel-stack-builder"
        role="tabpanel"
        aria-labelledby="finstack-tab-stack-builder"
        hidden={activeTab !== "stack-builder"}
        className="mt-8"
      >
        <FinstackStackBuilder tools={tools} />
      </div>
    </div>
  );
}
