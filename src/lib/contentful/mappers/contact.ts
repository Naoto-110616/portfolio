import { fallbackContact } from "@/lib/contentful/fallbacks";
import { asString, type ContentfulEntry } from "@/lib/contentful/mappers/shared";
import { contactSchema, type Contact } from "@/lib/contentful/types";

export function mapContactEntry(entry: ContentfulEntry | undefined): Contact {
	if (!entry?.fields) {
		return fallbackContact;
	}

	const fields = entry.fields;
	const parsedContact = contactSchema.safeParse({
		id: entry.sys.id,
		title: asString(fields.title) ?? fallbackContact.title,
		description: asString(fields.description) ?? fallbackContact.description,
		email: asString(fields.email) ?? fallbackContact.email,
		source: "contentful",
	});

	return parsedContact.success ? parsedContact.data : fallbackContact;
}
