import { getProjects } from "@/lib/contentful/queries/get-projects";

export * from "./get-contact";
export * from "./get-projects";
export * from "./get-services";
export * from "./get-sns-links";

export type ContentPreview = {
	id: string;
	title: string;
	description: string;
	url: string;
	contentType: string;
	updatedAt: string;
};

export type HomepageContentResult = {
	items: ContentPreview[];
	source: "contentful" | "fallback";
	reason?: string;
};

export async function getHomepageContent(limit = 3): Promise<HomepageContentResult> {
	const result = await getProjects();

	return {
		items: result.items.slice(0, limit).map((item) => ({
			id: item.id,
			title: item.title,
			description: item.description,
			url: item.href,
			contentType: "projects",
			updatedAt: item.published,
		})),
		source: result.source,
		reason: result.reason,
	};
}
