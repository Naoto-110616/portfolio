import { cache } from "react";

import { fallbackContactFormSettings } from "@/lib/contentful/fallbacks";
import { mapContactFormSettingsEntry } from "@/lib/contentful/mappers";
import { getSingleEntryByContentType } from "@/lib/contentful/queries/shared";
import type { ContactFormSettings } from "@/lib/contentful/types";
import { integrationStatus } from "@/lib/env";

export const getContactFormSettings = cache(async (): Promise<ContactFormSettings> => {
	if (!integrationStatus.hasContentful) {
		return fallbackContactFormSettings;
	}

	try {
		const entry = await getSingleEntryByContentType("contactFormSettings", 1);

		if (!entry) {
			return {
				...fallbackContactFormSettings,
				reason: "No published contact form settings entry was found in Contentful.",
			};
		}

		return mapContactFormSettingsEntry(entry);
	} catch (error) {
		console.error("Failed to fetch contact form settings from Contentful", error);

		return {
			...fallbackContactFormSettings,
			reason: "Contentful request failed, so local contact topics are shown instead.",
		};
	}
});
