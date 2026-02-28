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
