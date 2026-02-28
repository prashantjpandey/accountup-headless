import type { ReactNode } from "react";
import { ResourceCard } from "@/components/ResourceCard";
import { SectionHeader } from "@/components/SectionHeader";
import type { ResourceItem } from "@/lib/resources";

type ResourceSectionGridProps = {
  id?: string;
  title: string;
  description?: string;
  items: ResourceItem[];
  viewAllHref?: string;
  footer?: ReactNode;
};

export function ResourceSectionGrid({
  id,
  title,
  description,
  items,
  viewAllHref,
  footer,
}: ResourceSectionGridProps) {
  return (
    <section
      id={id}
      className="page-shell scroll-mt-24 py-10 sm:py-12 md:py-14 md:scroll-mt-28"
    >
      <div className="page-container">
        <SectionHeader
          title={title}
          description={description}
          action={
            viewAllHref
              ? {
                  label: "View all ->",
                  href: viewAllHref,
                }
              : undefined
          }
        />
        <div className="mt-8 grid gap-5 sm:gap-6 md:mt-10 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div key={item.slug} className="h-full">
              <ResourceCard
                title={item.title}
                description={item.description}
                href={item.href}
                category={item.category}
                iconKey={item.iconKey}
                variant={item.variant}
                linkLabel={item.linkLabel}
              />
            </div>
          ))}
        </div>
        {footer ? <div className="mt-8 flex justify-center md:mt-10">{footer}</div> : null}
      </div>
    </section>
  );
}
