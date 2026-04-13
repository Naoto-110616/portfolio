import type { ContactFormValues } from "@/lib/contact/schema";

import { fetchContentfulManagement } from "./client";

const CONTACT_CONTENT_TYPE_ID = "contact";
const FALLBACK_LOCALE_CODE = "en-US";

type ContentfulLocaleCollection = {
	items: Array<{
		code: string;
		default?: boolean;
	}>;
};

type ContentfulEntry = {
	sys: {
		id: string;
	};
};

async function getDefaultLocaleCode() {
	const locales = await fetchContentfulManagement<ContentfulLocaleCollection>("/locales");
	const defaultLocale = locales.items.find((locale) => locale.default);

	return defaultLocale?.code ?? FALLBACK_LOCALE_CODE;
}

export async function createContactInquiry(input: ContactFormValues) {
	const localeCode = await getDefaultLocaleCode();

	return fetchContentfulManagement<ContentfulEntry>(
		"/entries",
		{
			method: "POST",
			body: JSON.stringify({
				fields: {
					name: { [localeCode]: input.name },
					topic: { [localeCode]: input.topic },
					contact: { [localeCode]: input.contact },
					submittedAt: { [localeCode]: new Date().toISOString() },
				},
			}),
		},
		{
			"X-Contentful-Content-Type": CONTACT_CONTENT_TYPE_ID,
		},
	);
}
