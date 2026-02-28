import { ApiKeyStrategy, createClient } from "@wix/sdk";
import { items } from "@wix/data";

const REQUIRED_WIX_READ_ENV_KEYS = ["WIX_API_KEY", "WIX_SITE_ID"] as const;

type RequiredWixReadEnvKey = (typeof REQUIRED_WIX_READ_ENV_KEYS)[number];
type RequiredWixReadEnv = Record<RequiredWixReadEnvKey, string>;

function getMissingWixReadEnv(): RequiredWixReadEnvKey[] {
  return REQUIRED_WIX_READ_ENV_KEYS.filter((key) => !process.env[key]);
}

export function getOptionalWixReadEnv(): RequiredWixReadEnv | null {
  const missing = getMissingWixReadEnv();

  if (missing.length > 0) {
    return null;
  }

  return {
    WIX_API_KEY: process.env.WIX_API_KEY!,
    WIX_SITE_ID: process.env.WIX_SITE_ID!,
  };
}

export function createWixServerClient() {
  const env = getOptionalWixReadEnv();

  if (!env) {
    return null;
  }

  return createClient({
    modules: { items },
    auth: ApiKeyStrategy({
      apiKey: env.WIX_API_KEY,
      siteId: env.WIX_SITE_ID,
    }),
  });
}
