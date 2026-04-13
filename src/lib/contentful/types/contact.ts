import { z } from "zod";

export const contactSchema = z.object({
	id: z.string().min(1).optional(),
	title: z.string().min(1),
	description: z.string().min(1),
	email: z.string().min(1),
	source: z.enum(["contentful", "fallback"]),
	reason: z.string().optional(),
});

export type Contact = z.infer<typeof contactSchema>;
