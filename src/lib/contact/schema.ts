import { z } from "zod";

export const contactSchema = z.object({
	name: z.string().trim().min(2, "お名前は2文字以上で入力してください。"),
	topic: z.string().trim().min(1, "相談内容を選択してください。"),
	contact: z.string().trim().min(2, "連絡先を入力してください。"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
