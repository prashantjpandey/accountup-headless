export function resolveWixImageUrl(value: unknown): string | null {
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
