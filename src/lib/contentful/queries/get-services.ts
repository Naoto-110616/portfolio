import { cache } from "react";

import { fallbackServices } from "@/lib/contentful/fallbacks";
import { mapServices } from "@/lib/contentful/mappers";
import { getEntriesByContentType } from "@/lib/contentful/queries/shared";
import type { ServicesResult } from "@/lib/contentful/types";
import { integrationStatus } from "@/lib/env";

export const getServices = cache(async (): Promise<ServicesResult> => {
	if (!integrationStatus.hasContentful) {
		return fallbackServices;
	}

	try {
		const entries = await getEntriesByContentType("services", {
			order: ["sys.createdAt"],
		});

		if (entries.length === 0) {
			return {
				...fallbackServices,
				reason: "No published services entries were found in Contentful.",
			};
		}

		return mapServices(entries);
	} catch (error) {
		console.error("Failed to fetch services from Contentful", error);

		return {
			...fallbackServices,
			reason: "Contentful request failed, so local services data is shown instead.",
		};
	}
});
