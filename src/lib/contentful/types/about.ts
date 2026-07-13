import { z } from "zod";

export const aboutBlockSchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1),
	paragraphs: z.array(z.string().min(1)).min(1),
});

export const aboutContentSchema = z.object({
	title: z.string().min(1),
	leadText: z.string().min(1),
	portraitImageUrl: z.string().min(1),
	portraitImageAlt: z.string().min(1),
	blocks: z.array(aboutBlockSchema),
	source: z.enum(["contentful", "fallback"]),
	reason: z.string().optional(),
});

export type AboutBlock = z.infer<typeof aboutBlockSchema>;
export type AboutContent = z.infer<typeof aboutContentSchema>;
