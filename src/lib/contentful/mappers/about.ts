import { fallbackAboutContent } from "@/lib/contentful/fallbacks";
import { asEntryArray, asString, asStringArray, type ContentfulEntry } from "@/lib/contentful/mappers/shared";
import {
	aboutBlockSchema,
	aboutContentSchema,
	type AboutBlock,
	type AboutContent,
} from "@/lib/contentful/types";

function mapAboutBlockEntry(entry: ContentfulEntry): AboutBlock | null {
	const fields = entry.fields ?? {};
	const parsed = aboutBlockSchema.safeParse({
		id: entry.sys.id,
		title: asString(fields.title),
		paragraphs: asStringArray(fields.paragraphs),
	});

	return parsed.success ? parsed.data : null;
}

export function mapAboutEntry(entry: ContentfulEntry | undefined): AboutContent {
	if (!entry?.fields) {
		return fallbackAboutContent;
	}

	const fields = entry.fields;
	const parsed = aboutContentSchema.safeParse({
		title: asString(fields.title) ?? fallbackAboutContent.title,
		leadText: asString(fields.leadText) ?? fallbackAboutContent.leadText,
		portraitImageUrl: asString(fields.portraitImageUrl) ?? fallbackAboutContent.portraitImageUrl,
		portraitImageAlt: asString(fields.portraitImageAlt) ?? fallbackAboutContent.portraitImageAlt,
		blocks: asEntryArray(fields.blocks)
			.map(mapAboutBlockEntry)
			.filter((block): block is AboutBlock => block !== null),
		source: "contentful",
	});

	return parsed.success ? parsed.data : fallbackAboutContent;
}
