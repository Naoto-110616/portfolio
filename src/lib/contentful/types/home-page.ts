import { z } from "zod";

export const heroItemSchema = z.object({
	label: z.string().min(1),
	value: z.string().min(1),
	isHighlighted: z.boolean().optional(),
});

export const aboutBlockSchema = z.object({
	id: z.string().min(1).optional(),
	title: z.string().min(1),
	paragraphs: z.array(z.string().min(1)).min(1),
});

export const aboutSectionContentSchema = z.object({
	title: z.string().min(1),
	leadText: z.string().min(1),
	portraitImageUrl: z.string().min(1),
	portraitImageAlt: z.string().min(1),
	blocks: z.array(aboutBlockSchema),
});

export const serviceItemSchema = z.object({
	id: z.string().min(1).optional(),
	title: z.string().min(1),
	points: z.array(z.string().min(1)).min(1),
});

export const servicesSectionContentSchema = z.object({
	title: z.string().min(1),
	items: z.array(serviceItemSchema),
});

export const chatContentSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	helperText: z.string().min(1),
	placeholder: z.string().min(1),
});

export const homePageSchema = z.object({
	heroItems: z.array(heroItemSchema),
	chat: chatContentSchema,
	about: aboutSectionContentSchema,
	services: servicesSectionContentSchema,
	sectionTitles: z.object({
		work: z.string().min(1),
		moreProjects: z.string().min(1),
	}),
	source: z.enum(["contentful", "fallback"]),
	reason: z.string().optional(),
});

export type HeroItem = z.infer<typeof heroItemSchema>;
export type AboutBlock = z.infer<typeof aboutBlockSchema>;
export type AboutSectionContent = z.infer<typeof aboutSectionContentSchema>;
export type ServiceItem = z.infer<typeof serviceItemSchema>;
export type ServicesSectionContent = z.infer<typeof servicesSectionContentSchema>;
export type ChatContent = z.infer<typeof chatContentSchema>;
export type HomePageContent = z.infer<typeof homePageSchema>;
