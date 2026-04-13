import { z } from "zod";

export const contactFormSettingsSchema = z.object({
	id: z.string().min(1).optional(),
	title: z.string().min(1),
	topicOptions: z.array(z.string().min(1)).min(1),
	source: z.enum(["contentful", "fallback"]),
	reason: z.string().optional(),
});

export type ContactFormSettings = z.infer<typeof contactFormSettingsSchema>;
