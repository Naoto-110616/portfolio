import { ABOUT_PORTRAIT_IMAGE_URL } from "@/constans/const";
import { fallbackHomePage } from "@/lib/contentful/fallbacks";
import {
	asAsset,
	asEntry,
	asEntryArray,
	asInteger,
	asRecord,
	asString,
	asStringArray,
	type ContentfulEntry,
} from "@/lib/contentful/mappers/shared";
import {
	aboutBlockSchema,
	homePageSchema,
	heroItemSchema,
	serviceItemSchema,
	type HomePageContent,
} from "@/lib/contentful/types";

function mapAboutSection(entry: ContentfulEntry | undefined) {
	if (!entry?.fields) {
		return fallbackHomePage.about;
	}

	const fields = entry.fields;
	const portraitAsset = asAsset(fields.portraitImage);
	const blocks = asEntryArray(fields.blocks);

	return {
		title: asString(fields.title) ?? fallbackHomePage.about.title,
		leadText: asString(fields.leadText) ?? fallbackHomePage.about.leadText,
		portraitImageUrl: ABOUT_PORTRAIT_IMAGE_URL,
		portraitImageAlt:
			asString(fields.portraitAlt) ??
			portraitAsset?.fields?.description ??
			portraitAsset?.fields?.title ??
			fallbackHomePage.about.portraitImageAlt,
		blocks: blocks
			.map((block) => {
				const parsedBlock = aboutBlockSchema.safeParse({
					id: block.sys.id,
					title: asString(block.fields?.title),
					paragraphs: asStringArray(block.fields?.paragraphs),
				});

				if (!parsedBlock.success) {
					return null;
				}

				return {
					...parsedBlock.data,
					sortOrder: asInteger(block.fields?.sortOrder) ?? 0,
				};
			})
			.filter((block): block is NonNullable<typeof block> => block !== null)
			.sort((left, right) => left.sortOrder - right.sortOrder)
			.map((block) => ({
				id: block.id,
				title: block.title,
				paragraphs: block.paragraphs,
			})),
	};
}

function mapServicesSection(entry: ContentfulEntry | undefined) {
	if (!entry?.fields) {
		return fallbackHomePage.services;
	}

	const fields = entry.fields;

	return {
		title: asString(fields.title) ?? fallbackHomePage.services.title,
		items: asEntryArray(fields.items)
			.map((service) => {
				const parsedService = serviceItemSchema.safeParse({
					id: service.sys.id,
					title: asString(service.fields?.title),
					points: asStringArray(service.fields?.points),
				});

				if (!parsedService.success) {
					return null;
				}

				return {
					...parsedService.data,
					sortOrder: asInteger(service.fields?.sortOrder) ?? 0,
				};
			})
			.filter((service): service is NonNullable<typeof service> => service !== null)
			.sort((left, right) => left.sortOrder - right.sortOrder)
			.map((service) => ({
				id: service.id,
				title: service.title,
				points: service.points,
			})),
	};
}

export function mapHomePageEntry(entry: ContentfulEntry | undefined): HomePageContent {
	if (!entry?.fields) {
		return fallbackHomePage;
	}

	const fields = entry.fields;
	const heroItems = asRecord(fields.heroItems);
	const aboutSection = asEntry(fields.aboutSection);
	const servicesSection = asEntry(fields.servicesSection);

	const parsedHomePage = homePageSchema.safeParse({
		heroItems: Array.isArray(heroItems?.items)
			? heroItems.items
					.map((item) => heroItemSchema.safeParse(item))
					.filter((result) => result.success)
					.map((result) => result.data)
			: fallbackHomePage.heroItems,
		chat: {
			title: asString(fields.chatTitle) ?? fallbackHomePage.chat.title,
			description: asString(fields.chatDescription) ?? fallbackHomePage.chat.description,
			helperText: asString(fields.chatHelperText) ?? fallbackHomePage.chat.helperText,
			placeholder: asString(fields.chatPlaceholder) ?? fallbackHomePage.chat.placeholder,
		},
		about: mapAboutSection(aboutSection),
		services: mapServicesSection(servicesSection),
		sectionTitles: {
			work: asString(fields.workSectionTitle) ?? fallbackHomePage.sectionTitles.work,
			moreProjects:
				asString(fields.moreProjectsSectionTitle) ?? fallbackHomePage.sectionTitles.moreProjects,
		},
		source: "contentful",
	});

	return parsedHomePage.success ? parsedHomePage.data : fallbackHomePage;
}
