import { fallbackServices } from "@/lib/contentful/fallbacks";
import { asString, asStringArray, type ContentfulEntry } from "@/lib/contentful/mappers/shared";
import {
	serviceItemSchema,
	servicesResultSchema,
	type ServiceItem,
	type ServicesResult,
} from "@/lib/contentful/types";

export function mapServiceEntry(entry: ContentfulEntry): ServiceItem | null {
	const fields = entry.fields ?? {};

	const parsedService = serviceItemSchema.safeParse({
		id: entry.sys.id,
		title: asString(fields.title),
		points: asStringArray(fields.point),
	});

	return parsedService.success ? parsedService.data : null;
}

export function mapServices(entries: ContentfulEntry[]): ServicesResult {
	const parsedServices = servicesResultSchema.safeParse({
		items: entries.map(mapServiceEntry).filter((item): item is ServiceItem => item !== null),
		source: "contentful",
	});

	return parsedServices.success ? parsedServices.data : fallbackServices;
}
