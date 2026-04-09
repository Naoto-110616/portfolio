import { getContentfulClient } from "@/lib/contentful/client";
import type { ContentfulEntry } from "@/lib/contentful/mappers";

type IncludeDepth = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export async function getEntriesByContentType(
  contentType: string,
  options?: {
    include?: IncludeDepth;
    limit?: number;
    order?: string[];
  },
) {
  const client = getContentfulClient();
  const response = await client.getEntries(
    {
      content_type: contentType,
      include: options?.include ?? 2,
      limit: options?.limit,
      order: options?.order,
    } as never,
  );

  return response.items as unknown as ContentfulEntry[];
}

export async function getSingleEntryByContentType(
  contentType: string,
  include: IncludeDepth = 3,
) {
  const entries = await getEntriesByContentType(contentType, {
    include,
    limit: 1,
  });

  return entries[0];
}
