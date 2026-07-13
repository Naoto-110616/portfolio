import { fallbackSiteSettings } from "@/lib/contentful/fallbacks";
import { mapSnsLinkEntry } from "@/lib/contentful/mappers/sns-link";
import {
	asEntryArray,
	asString,
	asStringArray,
	type ContentfulEntry,
} from "@/lib/contentful/mappers/shared";
import {
	siteSettingsSchema,
	type SiteSettings,
} from "@/lib/contentful/types/site-settings";
import type { SnsLink } from "@/lib/contentful/types/sns-link";

export function mapSiteSettingsEntry(entry: ContentfulEntry | undefined): SiteSettings {
	if (!entry?.fields) {
		return fallbackSiteSettings;
	}

	const fields = entry.fields;
	const socialLinks = asEntryArray(fields.socialLinks)
		.map(mapSnsLinkEntry)
		.filter((item): item is SnsLink => item !== null);

	const parsed = siteSettingsSchema.safeParse({
		id: entry.sys.id,
		title: asString(fields.title) ?? fallbackSiteSettings.title,
		description: asString(fields.description) ?? fallbackSiteSettings.description,
		siteName: asString(fields.siteName) ?? fallbackSiteSettings.siteName,
		locale: asString(fields.locale) ?? fallbackSiteSettings.locale,
		keywords: asStringArray(fields.keywords).length
			? asStringArray(fields.keywords)
			: fallbackSiteSettings.keywords,
		twitterHandle: asString(fields.twitterHandle),
		footerEmail: asString(fields.footerEmail) ?? fallbackSiteSettings.footerEmail,
		footerCopyright:
			asString(fields.footerCopyright) ?? fallbackSiteSettings.footerCopyright,
		footerBackToTopLabel:
			asString(fields.footerBackToTopLabel) ?? fallbackSiteSettings.footerBackToTopLabel,
		socialLinks,
		source: "contentful",
	});

	return parsed.success ? parsed.data : fallbackSiteSettings;
}
