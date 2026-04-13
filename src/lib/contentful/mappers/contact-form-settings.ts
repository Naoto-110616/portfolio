import { fallbackContactFormSettings } from "@/lib/contentful/fallbacks";
import { asString, asStringArray, type ContentfulEntry } from "@/lib/contentful/mappers/shared";
import {
	contactFormSettingsSchema,
	type ContactFormSettings,
} from "@/lib/contentful/types/contact-form-settings";

export function mapContactFormSettingsEntry(
	entry: ContentfulEntry | undefined,
): ContactFormSettings {
	if (!entry?.fields) {
		return fallbackContactFormSettings;
	}

	const fields = entry.fields;
	const parsed = contactFormSettingsSchema.safeParse({
		id: entry.sys.id,
		title: asString(fields.title) ?? fallbackContactFormSettings.title,
		topicOptions: asStringArray(fields.topicOptions),
		source: "contentful",
	});

	return parsed.success ? parsed.data : fallbackContactFormSettings;
}
