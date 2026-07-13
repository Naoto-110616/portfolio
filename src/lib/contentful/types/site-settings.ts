import { z } from "zod";

import { snsLinkSchema } from "@/lib/contentful/types/sns-link";

export const siteSettingsSchema = z.object({
	id: z.string().min(1).optional(),
	title: z.string().min(1),
	description: z.string().min(1),
	siteName: z.string().min(1),
	locale: z.string().min(1),
	keywords: z.array(z.string().min(1)).min(1),
	twitterHandle: z.string().min(1).optional(),
	footerEmail: z.string().min(1),
	footerCopyright: z.string().min(1),
	footerBackToTopLabel: z.string().min(1),
	socialLinks: z.array(snsLinkSchema),
	source: z.enum(["contentful", "fallback"]),
	reason: z.string().optional(),
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;
