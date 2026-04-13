import { cache } from "react";

import { fallbackSnsLinks } from "@/lib/contentful/fallbacks";
import { mapSnsLinks } from "@/lib/contentful/mappers";
import { getEntriesByContentType } from "@/lib/contentful/queries/shared";
import type { SnsLinksResult } from "@/lib/contentful/types";
import { integrationStatus } from "@/lib/env";

export const getSnsLinks = cache(async (): Promise<SnsLinksResult> => {
	if (!integrationStatus.hasContentful) {
		return fallbackSnsLinks;
	}

	try {
		const entries = await getEntriesByContentType("snsLinks", {
			order: ["sys.createdAt"],
		});

		if (entries.length === 0) {
			return {
				...fallbackSnsLinks,
				reason: "No published snsLinks entries were found in Contentful.",
			};
		}

		return mapSnsLinks(entries);
	} catch (error) {
		console.error("Failed to fetch sns links from Contentful", error);

		return {
			...fallbackSnsLinks,
			reason: "Contentful request failed, so local SNS links are shown instead.",
		};
	}
});
