import { z } from "zod";

export const projectSchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1),
	slug: z.string().min(1),
	description: z.string().min(1),
	partner: z.string().min(1),
	publishedYear: z.string().min(1),
	role: z.string().min(1),
	stack: z.array(z.string().min(1)),
	tag: z.string().min(1),
	imageUrl: z.string().min(1),
	imageAlt: z.string().min(1),
	href: z.string().min(1),
	featuredOnHome: z.boolean(),
	showInMoreProjects: z.boolean(),
	sortOrder: z.number().int(),
	moreProjectHeightPx: z.number().int().optional(),
});

export const projectsResultSchema = z.object({
	items: z.array(projectSchema),
	source: z.enum(["contentful", "fallback"]),
	reason: z.string().optional(),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectsResult = z.infer<typeof projectsResultSchema>;
