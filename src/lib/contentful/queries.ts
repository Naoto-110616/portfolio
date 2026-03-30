import { getContentfulClient } from "@/lib/contentful/client";
import { integrationStatus } from "@/lib/env";

type ContentfulEntry = {
  sys: {
    id: string;
    updatedAt?: string;
    contentType?: {
      sys?: {
        id?: string;
      };
    };
  };
  fields?: Record<string, unknown>;
};

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

const FALLBACK_ITEMS: ContentPreview[] = [
  {
    id: "fallback-hero",
    title: "Contentful connected landing blocks",
    description:
      "API キーを設定すると、ここに Contentful から取得した最新コンテンツが表示されます。",
    slug: "contentful-connected-landing-blocks",
    contentType: "starter-demo",
    updatedAt: "Ready after env setup",
  },
  {
    id: "fallback-mail",
    title: "Resend contact flow",
    description:
      "問い合わせフォームと API Route は実装済みです。Resend のキーを設定すればそのまま送信できます。",
    slug: "resend-contact-flow",
    contentType: "starter-demo",
    updatedAt: "Ready after env setup",
  },
  {
    id: "fallback-query",
    title: "TanStack Query dashboard",
    description:
      "クライアント側では Integration Status を React Query で取得し、再利用しやすい構成にしています。",
    slug: "tanstack-query-dashboard",
    contentType: "starter-demo",
    updatedAt: "Ready after env setup",
  },
];

function pickString(fields: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = fields[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
}

function mapEntry(entry: ContentfulEntry): ContentPreview | null {
  const fields = entry.fields ?? {};
  const title =
    pickString(fields, ["title", "name", "headline", "pageTitle"]) ?? "Untitled entry";
  const description =
    pickString(fields, ["description", "excerpt", "summary", "body", "text"]) ??
    "No description was found on this entry, but the connection to Contentful is active.";
  const slug = pickString(fields, ["slug", "path"]) ?? entry.sys.id;

  return {
    id: entry.sys.id,
    title,
    description,
    slug,
    contentType: entry.sys.contentType?.sys?.id ?? "contentful-entry",
    updatedAt: entry.sys.updatedAt ?? "Unknown",
  };
}

export async function getHomepageContent(limit = 3): Promise<HomepageContentResult> {
  if (!integrationStatus.hasContentful) {
    return {
      items: FALLBACK_ITEMS,
      source: "fallback",
      reason: "Contentful credentials are not configured yet.",
    };
  }

  try {
    const client = getContentfulClient();
    const response = await client.getEntries({
      include: 1,
      limit,
      order: ["-sys.updatedAt"],
    });

    const items = (response.items as unknown as ContentfulEntry[])
      .map(mapEntry)
      .filter((item): item is ContentPreview => item !== null);

    if (items.length === 0) {
      return {
        items: FALLBACK_ITEMS,
        source: "fallback",
        reason: "No published entries were found in Contentful.",
      };
    }

    return {
      items,
      source: "contentful",
    };
  } catch (error) {
    console.error("Failed to fetch Contentful entries", error);

    return {
      items: FALLBACK_ITEMS,
      source: "fallback",
      reason: "Contentful request failed, so local starter content is shown instead.",
    };
  }
}
