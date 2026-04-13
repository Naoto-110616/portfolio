import { fallbackSnsLinks } from "@/lib/contentful/fallbacks";
import { asString, normalizeHref, type ContentfulEntry } from "@/lib/contentful/mappers/shared";
import {
	snsLinkSchema,
	snsLinksResultSchema,
	type SnsLink,
	type SnsLinksResult,
} from "@/lib/contentful/types";

export function mapSnsLinkEntry(entry: ContentfulEntry): SnsLink | null {
	const fields = entry.fields ?? {};

	const parsedSnsLink = snsLinkSchema.safeParse({
		id: entry.sys.id,
		title: asString(fields.title),
		url: normalizeHref(asString(fields.url)),
	});

	return parsedSnsLink.success ? parsedSnsLink.data : null;
}

export function mapSnsLinks(entries: ContentfulEntry[]): SnsLinksResult {
	const parsedSnsLinks = snsLinksResultSchema.safeParse({
		items: entries.map(mapSnsLinkEntry).filter((item): item is SnsLink => item !== null),
		source: "contentful",
	});

	return parsedSnsLinks.success ? parsedSnsLinks.data : fallbackSnsLinks;
}
