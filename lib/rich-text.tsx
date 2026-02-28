import type { ReactElement } from "react";

type RichTextNode = {
  type?: string;
  nodes?: RichTextNode[];
  textData?: {
    text?: string;
    decorations?: Array<{
      type?: string;
      linkData?: {
        url?: string;
      };
    }>;
  };
  paragraphData?: {
    textStyle?: {
      textAlignment?: string;
    };
  };
  headingData?: {
    level?: number;
  };
  linkData?: {
    url?: string;
  };
};

type InlineCtaPlacement = "inline-after-section" | "before-following-section";

type RichTextSplitResult = {
  beforeCta: unknown | null;
  afterCta: unknown | null;
  placement: InlineCtaPlacement;
  hasArticleContent: boolean;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  if (/^(https?:|mailto:|tel:|#|\/)/i.test(trimmed)) {
    return trimmed;
  }

  return null;
}

function sanitizeHtml(html: string) {
  return html
    .replace(/<\s*(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\s*\/\s*\1>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "")
    .replace(/\sstyle\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\s(href|src)\s*=\s*(['"])\s*javascript:[^'"]*\2/gi, "");
}

function plainTextToHtml(value: string) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br />")}</p>`)
    .join("");
}

function renderTextNode(node: RichTextNode) {
  const rawText = node.textData?.text ?? "";
  let html = escapeHtml(rawText);

  for (const decoration of node.textData?.decorations ?? []) {
    switch (decoration.type) {
      case "BOLD":
        html = `<strong>${html}</strong>`;
        break;
      case "ITALIC":
        html = `<em>${html}</em>`;
        break;
      case "UNDERLINE":
        html = `<u>${html}</u>`;
        break;
      case "LINK": {
        const href = sanitizeUrl(decoration.linkData?.url ?? "");

        if (href) {
          html = `<a href="${escapeHtml(href)}" rel="noreferrer">${html}</a>`;
        }
        break;
      }
      default:
        break;
    }
  }

  return html;
}

function getNodeChildrenHtml(node: RichTextNode) {
  return (node.nodes ?? []).map(renderNodeToHtml).join("");
}

function renderNodeToHtml(node: RichTextNode): string {
  if (node.textData?.text) {
    return renderTextNode(node);
  }

  const type = node.type?.toUpperCase();
  const children = getNodeChildrenHtml(node);

  switch (type) {
    case "ROOT":
    case "DOCUMENT":
    case "DOC":
      return children;
    case "PARAGRAPH":
      return children ? `<p>${children}</p>` : "";
    case "HEADING": {
      const level = Math.min(Math.max(node.headingData?.level ?? 2, 2), 4);
      return children ? `<h${level}>${children}</h${level}>` : "";
    }
    case "BULLETED_LIST":
      return children ? `<ul>${children}</ul>` : "";
    case "NUMBERED_LIST":
      return children ? `<ol>${children}</ol>` : "";
    case "LIST_ITEM":
      return children ? `<li>${children}</li>` : "";
    case "BLOCKQUOTE":
      return children ? `<blockquote>${children}</blockquote>` : "";
    case "LINK": {
      const href = sanitizeUrl(node.linkData?.url ?? "");

      if (!href || !children) {
        return children;
      }

      return `<a href="${escapeHtml(href)}" rel="noreferrer">${children}</a>`;
    }
    default:
      return children;
  }
}

function richNodeTreeToHtml(value: RichTextNode | RichTextNode[]) {
  const nodes = Array.isArray(value) ? value : [value];

  return nodes.map(renderNodeToHtml).join("");
}

function richTextToHtml(value: unknown): string {
  if (typeof value === "string") {
    const trimmed = value.trim();

    if (!trimmed) {
      return "";
    }

    return sanitizeHtml(trimmed.includes("<") ? trimmed : plainTextToHtml(trimmed));
  }

  if (!value || typeof value !== "object") {
    return "";
  }

  if ("html" in value && typeof value.html === "string") {
    return sanitizeHtml(value.html);
  }

  if ("nodes" in value && Array.isArray(value.nodes)) {
    return sanitizeHtml(richNodeTreeToHtml(value.nodes as RichTextNode[]));
  }

  if ("document" in value && value.document && typeof value.document === "object") {
    const documentValue = value.document as { nodes?: RichTextNode[] };

    if (Array.isArray(documentValue.nodes)) {
      return sanitizeHtml(richNodeTreeToHtml(documentValue.nodes));
    }
  }

  return "";
}

function extractTopLevelBlock(html: string, startIndex: number, tagName: string) {
  const blockMatcher = new RegExp(`<\\/?${tagName}\\b[^>]*>`, "gi");
  blockMatcher.lastIndex = startIndex;

  let depth = 0;
  let match: RegExpExecArray | null;

  while ((match = blockMatcher.exec(html)) !== null) {
    const token = match[0];
    const isClosingTag = /^<\//.test(token);

    depth += isClosingTag ? -1 : 1;

    if (depth === 0) {
      return html.slice(startIndex, blockMatcher.lastIndex);
    }
  }

  return html.slice(startIndex);
}

function getTopLevelHtmlBlocks(html: string) {
  const blocks: string[] = [];
  let cursor = 0;

  while (cursor < html.length) {
    if (/\s/.test(html[cursor])) {
      cursor += 1;
      continue;
    }

    const remainingHtml = html.slice(cursor);
    const blockMatch = remainingHtml.match(
      /^<(h2|h3|h4|p|ul|ol|blockquote)\b[^>]*>/i,
    );

    if (!blockMatch) {
      blocks.push(remainingHtml.trim());
      break;
    }

    const tagName = blockMatch[1].toLowerCase();
    const blockHtml = extractTopLevelBlock(html, cursor, tagName);

    if (!blockHtml.trim()) {
      break;
    }

    blocks.push(blockHtml);
    cursor += blockHtml.length;
  }

  return blocks.filter(Boolean);
}

export function splitRichTextForInlineCta(value: unknown): RichTextSplitResult {
  const html = richTextToHtml(value);

  if (!html) {
    return {
      beforeCta: null,
      afterCta: null,
      placement: "before-following-section",
      hasArticleContent: false,
    };
  }

  const blocks = getTopLevelHtmlBlocks(html);
  const articleHtml = blocks.length > 0 ? blocks.join("") : html;
  const h2Indexes = blocks.reduce<number[]>((indexes, block, index) => {
    if (/^<h2\b/i.test(block)) {
      indexes.push(index);
    }

    return indexes;
  }, []);

  if (h2Indexes.length === 0) {
    return {
      beforeCta: { html: articleHtml },
      afterCta: null,
      placement: "before-following-section",
      hasArticleContent: Boolean(articleHtml.trim()),
    };
  }

  const targetH2Index = h2Indexes[1] ?? h2Indexes[0];
  const nextH2Index =
    h2Indexes.find((index) => index > targetH2Index) ?? blocks.length;
  const splitIndex = nextH2Index;
  const beforeHtml = blocks.slice(0, splitIndex).join("");
  const afterHtml = blocks.slice(splitIndex).join("");

  return {
    beforeCta: beforeHtml ? { html: beforeHtml } : null,
    afterCta: afterHtml ? { html: afterHtml } : null,
    placement: "inline-after-section",
    hasArticleContent: true,
  };
}

export function richTextToPlainText(value: unknown): string {
  const html = richTextToHtml(value);

  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h2|h3|h4|blockquote)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function RichTextContent({
  value,
  className = "",
}: {
  value: unknown;
  className?: string;
}): ReactElement | null {
  const html = richTextToHtml(value);

  if (!html) {
    return null;
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
