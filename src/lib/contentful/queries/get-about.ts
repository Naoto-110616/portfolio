import { cache } from "react";

import { fallbackAboutContent } from "@/lib/contentful/fallbacks";
import { mapAboutEntry } from "@/lib/contentful/mappers";
import { getSingleEntryByContentType } from "@/lib/contentful/queries/shared";
import type { AboutContent } from "@/lib/contentful/types";
import { integrationStatus } from "@/lib/env";

export const getAbout = cache(async (): Promise<AboutContent> => {
	if (!integrationStatus.hasContentful) {
		return fallbackAboutContent;
	}

	try {
		const entry = await getSingleEntryByContentType("about", 2);

		if (!entry) {
			return {
				...fallbackAboutContent,
				reason: "No published about entry was found in Contentful.",
			};
		}

		return mapAboutEntry(entry);
	} catch (error) {
		console.error("Failed to fetch about from Contentful", error);

		return {
			...fallbackAboutContent,
			reason: "Contentful request failed, so local about data is shown instead.",
		};
	}
});
