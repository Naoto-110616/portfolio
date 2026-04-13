type ContentfulSys = {
	id: string;
	updatedAt?: string;
	contentType?: {
		sys?: {
			id?: string;
		};
	};
};

export type ContentfulAsset = {
	fields?: {
		title?: string;
		description?: string;
		file?: {
			url?: string;
		};
	};
};

export type ContentfulEntry = {
	sys: ContentfulSys;
	fields?: Record<string, unknown>;
};

export function asRecord(value: unknown) {
	return typeof value === "object" && value !== null
		? (value as Record<string, unknown>)
		: undefined;
}

export function asString(value: unknown) {
	return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function normalizeHref(value: string | undefined) {
	if (!value) {
		return undefined;
	}

	if (
		value.startsWith("http://") ||
		value.startsWith("https://") ||
		value.startsWith("mailto:") ||
		value.startsWith("#") ||
		value.startsWith("/")
	) {
		return value;
	}

	return `https://${value}`;
}

export function asBoolean(value: unknown) {
	return typeof value === "boolean" ? value : undefined;
}

export function asInteger(value: unknown) {
	return typeof value === "number" && Number.isInteger(value) ? value : undefined;
}

export function asStringArray(value: unknown) {
	return Array.isArray(value)
		? value.map((item) => asString(item)).filter((item): item is string => Boolean(item))
		: [];
}

export function asEntry(value: unknown) {
	const record = asRecord(value);
	const sys = record?.sys as ContentfulSys | undefined;

	return sys?.id ? ({ sys, fields: asRecord(record?.fields) } as ContentfulEntry) : undefined;
}

export function asEntryArray(value: unknown) {
	return Array.isArray(value)
		? value.map((item) => asEntry(item)).filter((item): item is ContentfulEntry => Boolean(item))
		: [];
}

export function asAsset(value: unknown) {
	const record = asRecord(value);
	const fields = asRecord(record?.fields);
	const file = asRecord(fields?.file);

	return file?.url || fields?.title || fields?.description
		? ({
				fields: {
					title: asString(fields?.title),
					description: asString(fields?.description),
					file: {
						url: asString(file?.url),
					},
				},
			} as ContentfulAsset)
		: undefined;
}

export function getAssetUrl(asset: ContentfulAsset | undefined) {
	const url = asset?.fields?.file?.url;

	if (!url) {
		return undefined;
	}

	return url.startsWith("//") ? `https:${url}` : url;
}
