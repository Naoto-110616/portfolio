import { fallbackProjects } from "@/lib/contentful/fallbacks";
import {
	asAsset,
	asString,
	asStringArray,
	getAssetUrl,
	type ContentfulEntry,
} from "@/lib/contentful/mappers/shared";
import {
	projectSchema,
	projectsResultSchema,
	type Project,
	type ProjectsResult,
} from "@/lib/contentful/types";

function formatPublishedDate(value: string | undefined) {
	if (!value) {
		return undefined;
	}

	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return value;
	}

	const year = date.getUTCFullYear();
	const month = `${date.getUTCMonth() + 1}`.padStart(2, "0");
	const day = `${date.getUTCDate()}`.padStart(2, "0");

	return `${year}.${month}.${day}`;
}

function compareProjectsByPublishedDate(left: Project, right: Project) {
	const leftTime = Date.parse(left.published);
	const rightTime = Date.parse(right.published);

	if (!Number.isNaN(leftTime) && !Number.isNaN(rightTime) && leftTime !== rightTime) {
		return rightTime - leftTime;
	}

	return left.title.localeCompare(right.title);
}

export function mapProjectEntry(entry: ContentfulEntry): Project | null {
	const fields = entry.fields ?? {};
	const asset = asAsset(fields.img);

	const parsedProject = projectSchema.safeParse({
		id: entry.sys.id,
		title: asString(fields.title),
		description: asString(fields.description),
		with: asString(fields.with),
		published: formatPublishedDate(asString(fields.published)),
		role: asString(fields.role),
		stack: asStringArray(fields.stack),
		tag: asString(fields.tag),
		imageUrl: getAssetUrl(asset),
		imageAlt:
			asset?.fields?.description ??
			asset?.fields?.title ??
			`${asString(fields.title) ?? "Project"} preview`,
		href: asString(fields.url),
	});

	return parsedProject.success ? parsedProject.data : null;
}

export function mapProjects(entries: ContentfulEntry[]): ProjectsResult {
	const parsedProjects = projectsResultSchema.safeParse({
		items: entries
			.map(mapProjectEntry)
			.filter((item): item is Project => item !== null)
			.sort(compareProjectsByPublishedDate),
		source: "contentful",
	});

	return parsedProjects.success ? parsedProjects.data : fallbackProjects;
}

export function mapProjectsToWorkItems(items: Project[]) {
	return items.slice(0, 3).map((item) => ({
		title: item.title,
		description: item.description,
		with: item.with,
		published: item.published,
		role: item.role,
		stack: item.stack.join(", "),
		tag: item.tag,
		imageUrl: item.imageUrl,
		href: item.href,
	}));
}

export function mapProjectsToMoreProjectItems(items: Project[]) {
	return items.slice(3).map((item, index) => ({
		title: item.title,
		description: item.description,
		with: item.with,
		published: item.published,
		role: item.role,
		stack: item.stack.join(", "),
		tag: item.tag,
		imageUrl: item.imageUrl,
		href: item.href,
		closedImageHeight: index === 0 ? 85 : 102,
		imageAlt: item.imageAlt,
	}));
}
