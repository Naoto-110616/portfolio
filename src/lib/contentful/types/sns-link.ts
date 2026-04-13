import { z } from "zod";

export const snsLinkSchema = z.object({
	id: z.string().min(1).optional(),
	title: z.string().min(1),
	url: z.string().min(1),
});

export const snsLinksResultSchema = z.object({
	items: z.array(snsLinkSchema),
	source: z.enum(["contentful", "fallback"]),
	reason: z.string().optional(),
});

export type SnsLink = z.infer<typeof snsLinkSchema>;
export type SnsLinksResult = z.infer<typeof snsLinksResultSchema>;
