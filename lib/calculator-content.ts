import { cache } from "react";
import type { Metadata } from "next";
import type { WixDataItem } from "@wix/wix-data-items-common";
import { calculatorResources, type CalculatorResource } from "@/lib/resources";
import { richTextToPlainText } from "@/lib/rich-text";
import { createWixServerClient, getOptionalWixReadEnv } from "@/lib/wix-server";

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

function resolveWixImageUrl(value: unknown): string | null {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    if (/^https?:\/\//i.test(value)) {
      return value;
    }

    const wixImageMatch = value.match(/^wix:image:\/\/v1\/([^/#?]+)(?:\/([^#?]+))?/i);

    if (wixImageMatch) {
      return `https://static.wixstatic.com/media/${wixImageMatch[1]}`;
    }

    return null;
  }

  if (typeof value === "object") {
    const image = value as Record<string, unknown>;

    for (const key of ["url", "fileUrl", "src"]) {
      if (typeof image[key] === "string" && image[key]) {
        return resolveWixImageUrl(image[key]);
      }
    }
  }

  return null;
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
