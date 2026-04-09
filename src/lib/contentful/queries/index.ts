import { getProjects } from "@/lib/contentful/queries/get-projects";

export * from "./get-home-page";
export * from "./get-projects";
export * from "./get-site-settings";

export type ContentPreview = {
  id: string;
  title: string;
  description: string;
  slug: string;
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
      slug: item.slug,
      contentType: "project",
      updatedAt: item.publishedYear,
    })),
    source: result.source,
    reason: result.reason,
  };
}
