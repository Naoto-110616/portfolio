import { z } from "zod";

export const serviceItemSchema = z.object({
	id: z.string().min(1).optional(),
	title: z.string().min(1),
	points: z.array(z.string().min(1)).min(1),
});

export const servicesResultSchema = z.object({
	items: z.array(serviceItemSchema),
	source: z.enum(["contentful", "fallback"]),
	reason: z.string().optional(),
});

export type ServiceItem = z.infer<typeof serviceItemSchema>;
export type ServicesResult = z.infer<typeof servicesResultSchema>;
