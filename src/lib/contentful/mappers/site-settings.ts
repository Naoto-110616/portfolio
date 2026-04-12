import { env } from "@/lib/env";
import { fallbackSiteSettings } from "@/lib/contentful/fallbacks";
import { asRecord, asString, type ContentfulEntry } from "@/lib/contentful/mappers/shared";
import {
	headerLinkSchema,
	siteSettingsSchema,
	socialLinkSchema,
	type SiteSettings,
} from "@/lib/contentful/types";

export function mapSiteSettingsEntry(entry: ContentfulEntry | undefined): SiteSettings {
	if (!entry?.fields) {
		return fallbackSiteSettings;
	}

	const fields = entry.fields;
	const headerLinks = asRecord(fields.headerLinks);
	const socialLinks = asRecord(fields.socialLinks);

	const parsedSiteSettings = siteSettingsSchema.safeParse({
		metadata: {
			title: asString(fields.siteTitle) ?? fallbackSiteSettings.metadata.title,
			description: asString(fields.siteDescription) ?? fallbackSiteSettings.metadata.description,
			siteUrl: asString(fields.siteUrl) ?? env.NEXT_PUBLIC_SITE_URL,
		},
		header: {
			sinceLabel: asString(fields.headerSinceLabel) ?? fallbackSiteSettings.header.sinceLabel,
			links: Array.isArray(headerLinks?.items)
				? headerLinks.items
						.map((link) => headerLinkSchema.safeParse(link))
						.filter((result) => result.success)
						.map((result) => result.data)
				: fallbackSiteSettings.header.links,
		},
		footer: {
			email: asString(fields.footerEmail) ?? fallbackSiteSettings.footer.email,
			copyright: asString(fields.footerCopyright) ?? fallbackSiteSettings.footer.copyright,
			backToTopLabel:
				asString(fields.footerBackToTopLabel) ?? fallbackSiteSettings.footer.backToTopLabel,
			socialLinks: Array.isArray(socialLinks?.items)
				? socialLinks.items
						.map((link) => socialLinkSchema.safeParse(link))
						.filter((result) => result.success)
						.map((result) => result.data)
				: fallbackSiteSettings.footer.socialLinks,
		},
		source: "contentful",
	});

	return parsedSiteSettings.success ? parsedSiteSettings.data : fallbackSiteSettings;
}
