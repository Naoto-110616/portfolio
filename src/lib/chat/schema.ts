import { z } from "zod";

const MAX_MESSAGE_LENGTH = 500;

export const chatMessageSchema = z.object({
	message: z
		.string()
		.trim()
		.min(1, "質問を入力してください。")
		.max(MAX_MESSAGE_LENGTH, `質問は${MAX_MESSAGE_LENGTH}文字以内で入力してください。`),
});

export type ChatMessagePayload = z.infer<typeof chatMessageSchema>;
