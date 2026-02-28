import { cache } from "react";
import type { Metadata } from "next";
import type { WixDataItem } from "@wix/wix-data-items-common";
import {
  calculatorResources,
  getCalculatorResourceBySlug,
  type CalculatorResource,
} from "@/lib/resources";
import { richTextToPlainText } from "@/lib/rich-text";
import { createWixServerClient, getOptionalWixReadEnv } from "@/lib/wix-server";
import { resolveWixImageUrl } from "@/lib/wix-media";

const CALCULATOR_CONTENT_COLLECTION_ID = "CalculatorContent";

export type CalculatorFaqItem = {
  question: string;
  answer: unknown;
};

export type CalculatorCmsContent = {
  slug: string;
  title: string;
  intro: unknown;
  explanation: unknown;
  whenToUse: unknown;
  commonMistakes: unknown;
  faqItems: CalculatorFaqItem[];
  seoTitle: string | null;
  metaDescription: string | null;
  ogImage: unknown;
};

function normalizeFaqItems(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const entry = item as Record<string, unknown>;
      const question = typeof entry.question === "string" ? entry.question.trim() : "";
      const answer = entry.answer;

      if (!question || !richTextToPlainText(answer)) {
        return null;
      }

      return {
        question,
        answer,
      };
    })
    .filter((item): item is CalculatorFaqItem => item !== null);
}

function normalizeCalculatorCmsContent(item: WixDataItem): CalculatorCmsContent {
  return {
    slug: typeof item.slug === "string" ? item.slug : "",
    title: typeof item.title === "string" ? item.title : "",
    intro: item.intro ?? item.Introduction,
    explanation: item.explanation ?? item.Explanation,
    whenToUse: item.whenToUse ?? item.when_to_use ?? item["When to Use"],
    commonMistakes:
      item.commonMistakes ?? item.common_mistakes ?? item["Common Mistakes"],
    faqItems: normalizeFaqItems(
      item.faqItems ??
        item.faq_items ??
        item["FAQ Items"] ??
        item["Faq Items"],
    ),
    seoTitle:
      typeof (item.seoTitle ?? item.seo_title) === "string" &&
      String(item.seoTitle ?? item.seo_title).trim()
        ? String(item.seoTitle ?? item.seo_title).trim()
        : null,
    metaDescription:
      typeof (item.metaDescription ?? item.meta_description) === "string" &&
      String(item.metaDescription ?? item.meta_description).trim()
        ? String(item.metaDescription ?? item.meta_description).trim()
        : null,
    ogImage: item.ogImage ?? item.og_image,
  };
}

export const getCalculatorCmsContent = cache(async (slug: string) => {
  if (!getOptionalWixReadEnv()) {
    console.warn(
      `[calculator-content] Missing Wix read env. Rendering calculator "${slug}" without CMS content.`,
    );
    return null;
  }

  const wixClient = createWixServerClient();

  if (!wixClient) {
    return null;
  }

  try {
    const result = await wixClient.items
      .query(CALCULATOR_CONTENT_COLLECTION_ID)
      .eq("slug", slug)
      .limit(1)
      .find();

    const item = result.items[0];

    if (!item) {
      console.warn(
        `[calculator-content] No CMS content found in "${CALCULATOR_CONTENT_COLLECTION_ID}" for slug "${slug}".`,
      );
      return null;
    }

    return normalizeCalculatorCmsContent(item);
  } catch (error) {
    console.warn(
      `[calculator-content] Failed to fetch CMS content for slug "${slug}".`,
      error,
    );
    return null;
  }
});

export type CalculatorRefInfo = {
  title: string;
  href: string;
};

export type CalculatorReferenceInfo = CalculatorRefInfo & {
  slug: string;
};

type CalculatorRefValue = {
  _id?: unknown;
  slug?: unknown;
  title?: unknown;
  name?: unknown;
};

function buildCalculatorCtaHref(slug: string) {
  return `/resources/${slug}`;
}

export function getCalculatorReferenceInfoFromContent(content: {
  slug?: string;
  title?: string;
}): CalculatorReferenceInfo | null {
  const slug = typeof content.slug === "string" ? content.slug.trim() : "";
  const title = typeof content.title === "string" ? content.title.trim() : "";

  if (!slug || !title) {
    return null;
  }

  return {
    slug,
    title,
    href: buildCalculatorCtaHref(slug),
  };
}

export function getCalculatorRefInfoFromContent(content: {
  slug?: string;
  title?: string;
}): CalculatorRefInfo | null {
  const reference = getCalculatorReferenceInfoFromContent(content);

  if (!reference) {
    return null;
  }

  return {
    title: reference.title,
    href: reference.href,
  };
}

export const getCalculatorReferenceById = cache(
  async (itemId: string): Promise<CalculatorReferenceInfo | null> => {
    if (!getOptionalWixReadEnv() || !itemId.trim()) {
      return null;
    }

    const wixClient = createWixServerClient();
    if (!wixClient) {
      return null;
    }

    try {
      const item = await wixClient.items.get(CALCULATOR_CONTENT_COLLECTION_ID, itemId.trim());
      if (!item) {
        return null;
      }

      const normalized = normalizeCalculatorCmsContent(item);
      return getCalculatorReferenceInfoFromContent(normalized);
    } catch {
      return null;
    }
  },
);

/** Fetch a calculator item from CalculatorContent by its _id (for reference fields). */
export const getCalculatorById = cache(async (itemId: string): Promise<CalculatorRefInfo | null> => {
  const reference = await getCalculatorReferenceById(itemId);

  if (!reference) {
    return null;
  }

  return {
    title: reference.title,
    href: reference.href,
  };
});

/** Resolve calculator URL: prefer slug (if in registry), else match by title in local registry. */
export function resolveCalculatorHref(content: { slug?: string; title?: string }): string | null {
  const slug = typeof content.slug === "string" ? content.slug.trim() : "";
  if (slug) {
    const resource = getCalculatorResourceBySlug(slug as CalculatorResource["slug"]);
    if (resource) {
      return resource.href;
    }
  }

  const title = typeof content.title === "string" ? content.title.trim() : "";
  if (title) {
    const match = calculatorResources.find(
      (r) => r.title.toLowerCase() === title.toLowerCase(),
    );
    if (match) {
      return match.href;
    }
  }

  return null;
}

export function resolveCalculatorFromRegistry(value: string): CalculatorRefInfo | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const bySlug = getCalculatorResourceBySlug(trimmed as CalculatorResource["slug"]);

  if (bySlug) {
    return {
      title: bySlug.title,
      href: bySlug.href,
    };
  }

  const normalizedValue = trimmed.toLowerCase();
  const byTitle = calculatorResources.find(
    (resource) => resource.title.toLowerCase() === normalizedValue,
  );

  if (byTitle) {
    return {
      title: byTitle.title,
      href: byTitle.href,
    };
  }

  return null;
}

export function resolveCalculatorFromReferenceValue(
  value: unknown,
): CalculatorRefInfo | null {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    return resolveCalculatorFromRegistry(value);
  }

  if (typeof value === "object") {
    const reference = value as CalculatorRefValue;
    const slug = typeof reference.slug === "string" ? reference.slug.trim() : "";
    const title =
      typeof reference.title === "string"
        ? reference.title.trim()
        : typeof reference.name === "string"
          ? reference.name.trim()
          : "";

    if (slug) {
      const href = resolveCalculatorHref({ slug, title });

      if (href) {
        return {
          title: title || slug,
          href,
        };
      }
    }

    if (title) {
      return resolveCalculatorFromRegistry(title);
    }
  }

  return null;
}

export async function getCalculatorMetadata(
  resource: CalculatorResource,
): Promise<Metadata> {
  const cmsContent = await getCalculatorCmsContent(resource.slug);
  const title = cmsContent?.seoTitle ?? cmsContent?.title ?? resource.title;
  const description =
    cmsContent?.metaDescription ??
    resource.pageDescription ??
    cmsContent?.title ??
    resource.description;
  const ogImageUrl = resolveWixImageUrl(cmsContent?.ogImage);

  return {
    title,
    description,
    openGraph: ogImageUrl
      ? {
          title,
          description,
          images: [{ url: ogImageUrl }],
        }
      : undefined,
  };
}

export function getSupportedCalculatorSlugs() {
  return calculatorResources.map((resource) => resource.slug);
}
