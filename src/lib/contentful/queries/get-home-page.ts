import { cache } from "react";

import { fallbackHomePage } from "@/lib/contentful/fallbacks";
import { mapHomePageEntry } from "@/lib/contentful/mappers";
import { getSingleEntryByContentType } from "@/lib/contentful/queries/shared";
import type { HomePageContent } from "@/lib/contentful/types";
import { integrationStatus } from "@/lib/env";

export const getHomePage = cache(async (): Promise<HomePageContent> => {
	if (!integrationStatus.hasContentful) {
		return fallbackHomePage;
	}

	try {
		const entry = await getSingleEntryByContentType("homePage", 3);

		if (!entry) {
			return {
				...fallbackHomePage,
				reason: "No published homePage entry was found in Contentful.",
			};
		}

		return mapHomePageEntry(entry);
	} catch (error) {
		console.error("Failed to fetch homepage content from Contentful", error);

		return {
			...fallbackHomePage,
			reason: "Contentful request failed, so local homepage content is shown instead.",
		};
	}
});
