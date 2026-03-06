import "server-only";
import { getContentfulClient } from "@/lib/contentful";

export type PortfolioProject = {
  id: string;
  title: string;
  slug: string;
  summary?: string;
};

function toStringValue(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

export async function fetchPortfolioProjects(): Promise<PortfolioProject[]> {
  const contentfulClient = getContentfulClient();

  if (!contentfulClient) {
    return [];
  }

  try {
    const response = await contentfulClient.getEntries({
      content_type: "project",
      order: ["-sys.createdAt"],
    });

    return response.items.map((item) => {
      const fields = item.fields as Record<string, unknown>;

      return {
        id: item.sys.id,
        title: toStringValue(fields.title, "Untitled Project"),
        slug: toStringValue(fields.slug, item.sys.id),
        summary: toStringValue(fields.summary),
      };
    });
  } catch (error) {
    console.error("Failed to fetch Contentful projects:", error);
    return [];
  }
}
