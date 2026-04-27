import type { ContentfulEntry } from "@/lib/contentful/mappers";
import { requireContentfulEnv } from "@/lib/env";

type IncludeDepth = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type ContentfulLink = {
	sys?: {
		type?: string;
		linkType?: "Entry" | "Asset";
		id?: string;
	};
};

type RawContentfulEntry = ContentfulEntry & {
	fields?: Record<string, unknown>;
};

type RawContentfulAsset = {
	sys?: {
		id?: string;
		type?: string;
	};
	fields?: Record<string, unknown>;
};

type ContentfulEntriesResponse = {
	items?: RawContentfulEntry[];
	includes?: {
		Entry?: RawContentfulEntry[];
		Asset?: RawContentfulAsset[];
	};
};

function isLink(value: unknown): value is ContentfulLink {
	return typeof value === "object" && value !== null && "sys" in value;
}

function resolveFieldValue(
	value: unknown,
	entryMap: Map<string, RawContentfulEntry>,
	assetMap: Map<string, RawContentfulAsset>,
	depth: number,
): unknown {
	if (depth < 0) {
		return value;
	}

	if (Array.isArray(value)) {
		return value.map((item) => resolveFieldValue(item, entryMap, assetMap, depth));
	}

	if (!isLink(value)) {
		return value;
	}

	const linkType = value.sys?.linkType;
	const linkId = value.sys?.id;

	if (!linkType || !linkId) {
		return value;
	}

	if (linkType === "Asset") {
		return assetMap.get(linkId) ?? value;
	}

	if (linkType === "Entry") {
		const linkedEntry = entryMap.get(linkId);
		return linkedEntry ? resolveEntryLinks(linkedEntry, entryMap, assetMap, depth - 1) : value;
	}

	return value;
}

function resolveEntryLinks(
	entry: RawContentfulEntry,
	entryMap: Map<string, RawContentfulEntry>,
	assetMap: Map<string, RawContentfulAsset>,
	depth: number,
): RawContentfulEntry {
	const fields = entry.fields ?? {};
	const resolvedFields = Object.fromEntries(
		Object.entries(fields).map(([key, value]) => [
			key,
			resolveFieldValue(value, entryMap, assetMap, depth),
		]),
	);

	return {
		...entry,
		fields: resolvedFields,
	};
}

export async function getEntriesByContentType(
	contentType: string,
	options?: {
		include?: IncludeDepth;
		limit?: number;
		order?: string[];
	},
) {
	const { space, accessToken, environment } = requireContentfulEnv();
	const url = new URL(
		`https://cdn.contentful.com/spaces/${space}/environments/${environment}/entries`,
	);
	const include = options?.include ?? 2;

	url.searchParams.set("content_type", contentType);
	url.searchParams.set("include", String(include));

	if (options?.limit !== undefined) {
		url.searchParams.set("limit", String(options.limit));
	}

	if (options?.order?.length) {
		url.searchParams.set("order", options.order.join(","));
	}

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		next: {
			revalidate: 300,
		},
	});

	if (!response.ok) {
		throw new Error(`Contentful request failed with ${response.status} ${response.statusText}`);
	}

	const data = (await response.json()) as ContentfulEntriesResponse;
	const entryMap = new Map((data.includes?.Entry ?? []).map((entry) => [entry.sys.id, entry]));
	const assetMap = new Map(
		(data.includes?.Asset ?? []).map((asset) => [asset.sys?.id ?? "", asset]),
	);

	return (data.items ?? []).map((entry) => resolveEntryLinks(entry, entryMap, assetMap, include));
}

export async function getSingleEntryByContentType(contentType: string, include: IncludeDepth = 3) {
	const entries = await getEntriesByContentType(contentType, {
		include,
		limit: 1,
	});

	return entries[0];
}
