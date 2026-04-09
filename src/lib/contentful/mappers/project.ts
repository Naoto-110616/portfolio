import { fallbackProjects } from "@/lib/contentful/fallbacks";
import {
  asAsset,
  asBoolean,
  asInteger,
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

export function mapProjectEntry(entry: ContentfulEntry): Project | null {
  const fields = entry.fields ?? {};
  const asset = asAsset(fields.thumbnail);

  const parsedProject = projectSchema.safeParse({
    id: entry.sys.id,
    title: asString(fields.title),
    slug: asString(fields.slug),
    description: asString(fields.description),
    partner: asString(fields.partner),
    publishedYear: asString(fields.publishedYear),
    role: asString(fields.role),
    stack: asStringArray(fields.stack),
    tag: asString(fields.tag),
    imageUrl: getAssetUrl(asset),
    imageAlt:
      asString(fields.moreProjectAlt) ??
      asset?.fields?.description ??
      asset?.fields?.title ??
      `${asString(fields.title) ?? "Project"} preview`,
    href: asString(fields.externalUrl),
    featuredOnHome: asBoolean(fields.featuredOnHome) ?? false,
    showInMoreProjects: asBoolean(fields.showInMoreProjects) ?? false,
    sortOrder: asInteger(fields.sortOrder),
    moreProjectHeightPx: asInteger(fields.moreProjectHeightPx),
  });

  return parsedProject.success ? parsedProject.data : null;
}

export function mapProjects(entries: ContentfulEntry[]): ProjectsResult {
  const parsedProjects = projectsResultSchema.safeParse({
    items: entries
      .map(mapProjectEntry)
      .filter((item): item is Project => item !== null)
      .sort((left, right) => left.sortOrder - right.sortOrder),
    source: "contentful",
  });

  return parsedProjects.success ? parsedProjects.data : fallbackProjects;
}

export function mapProjectsToWorkItems(items: Project[]) {
  return items
    .filter((item) => item.featuredOnHome)
    .map((item) => ({
      title: item.title,
      description: item.description,
      partner: item.partner,
      published: item.publishedYear,
      role: item.role,
      stack: item.stack.join(", "),
      tag: item.tag,
      imageUrl: item.imageUrl,
      href: item.href,
    }));
}

export function mapProjectsToMoreProjectItems(items: Project[]) {
  return items
    .filter((item) => item.showInMoreProjects)
    .map((item) => ({
      imageUrl: item.imageUrl,
      height: item.moreProjectHeightPx ?? 102,
      href: item.href,
      alt: item.imageAlt,
    }));
}
