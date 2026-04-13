import { cache } from "react";

import { fallbackProjects } from "@/lib/contentful/fallbacks";
import { mapProjects } from "@/lib/contentful/mappers";
import { getEntriesByContentType } from "@/lib/contentful/queries/shared";
import type { ProjectsResult } from "@/lib/contentful/types";
import { integrationStatus } from "@/lib/env";

export const getProjects = cache(async (): Promise<ProjectsResult> => {
	if (!integrationStatus.hasContentful) {
		return fallbackProjects;
	}

	try {
		const entries = await getEntriesByContentType("projects", {
			include: 1,
			order: ["-fields.published", "-sys.createdAt"],
		});

		if (entries.length === 0) {
			return {
				...fallbackProjects,
				reason: "No published projects entries were found in Contentful.",
			};
		}

		return mapProjects(entries);
	} catch (error) {
		console.error("Failed to fetch projects from Contentful", error);

		return {
			...fallbackProjects,
			reason: "Contentful request failed, so local project data is shown instead.",
		};
	}
});
