import { cache } from "react";

import { fallbackSiteSettings } from "@/lib/contentful/fallbacks";
import { mapSiteSettingsEntry } from "@/lib/contentful/mappers";
import { getSingleEntryByContentType } from "@/lib/contentful/queries/shared";
import type { SiteSettings } from "@/lib/contentful/types";
import { env, integrationStatus } from "@/lib/env";

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!integrationStatus.hasContentful) {
    return {
      ...fallbackSiteSettings,
      metadata: {
        ...fallbackSiteSettings.metadata,
        siteUrl: env.NEXT_PUBLIC_SITE_URL,
      },
    };
  }

  try {
    const entry = await getSingleEntryByContentType("siteSettings", 1);

    if (!entry) {
      return {
        ...fallbackSiteSettings,
        metadata: {
          ...fallbackSiteSettings.metadata,
          siteUrl: env.NEXT_PUBLIC_SITE_URL,
        },
        reason: "No published siteSettings entry was found in Contentful.",
      };
    }

    return mapSiteSettingsEntry(entry);
  } catch (error) {
    console.error("Failed to fetch site settings from Contentful", error);

    return {
      ...fallbackSiteSettings,
      metadata: {
        ...fallbackSiteSettings.metadata,
        siteUrl: env.NEXT_PUBLIC_SITE_URL,
      },
      reason: "Contentful request failed, so local site settings are shown instead.",
    };
  }
});
