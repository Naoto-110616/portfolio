import { cache } from "react";

import { fallbackContact } from "@/lib/contentful/fallbacks";
import { mapContactEntry } from "@/lib/contentful/mappers";
import { getSingleEntryByContentType } from "@/lib/contentful/queries/shared";
import type { Contact } from "@/lib/contentful/types";
import { integrationStatus } from "@/lib/env";

export const getContact = cache(async (): Promise<Contact> => {
	if (!integrationStatus.hasContentful) {
		return fallbackContact;
	}

	try {
		const entry = await getSingleEntryByContentType("contact", 1);

		if (!entry) {
			return {
				...fallbackContact,
				reason: "No published contact entry was found in Contentful.",
			};
		}

		return mapContactEntry(entry);
	} catch (error) {
		console.error("Failed to fetch contact from Contentful", error);

		return {
			...fallbackContact,
			reason: "Contentful request failed, so local contact data is shown instead.",
		};
	}
});
