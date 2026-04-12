import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

import { CHAT_SYSTEM_INSTRUCTION } from "@/lib/chat/persona";
import { chatMessageSchema } from "@/lib/chat/schema";
import { requireGeminiEnv } from "@/lib/env";

export async function POST(request: Request) {
	try {
		const { apiKey, model: modelName } = requireGeminiEnv();

		const payload = await request.json();
		const parsed = chatMessageSchema.safeParse(payload);

		if (!parsed.success) {
			return NextResponse.json(
				{
					message: "入力内容を確認してください。",
					errors: parsed.error.flatten().fieldErrors,
				},
				{ status: 400 },
			);
		}

		const genAI = new GoogleGenerativeAI(apiKey);
		const model = genAI.getGenerativeModel({
			model: modelName,
			systemInstruction: CHAT_SYSTEM_INSTRUCTION,
			generationConfig: {
				maxOutputTokens: 1024,
				temperature: 0.7,
			},
		});

		const result = await model.generateContent({
			contents: [
				{
					role: "user",
					parts: [{ text: parsed.data.message }],
				},
			],
		});

		const reply = result.response.text();

		return NextResponse.json({ reply });
	} catch (error) {
		if (
			error instanceof Error &&
			error.message.includes("Gemini environment variables")
		) {
			return NextResponse.json(
				{
					message:
						"チャット機能は現在利用できません。管理者に GEMINI_API_KEY の設定を確認してください。",
				},
				{ status: 503 },
			);
		}

		console.error("Chat API error", error);

		return NextResponse.json(
			{
				message:
					error instanceof Error
						? error.message
						: "回答の取得に失敗しました。しばらくしてから再度お試しください。",
			},
			{ status: 500 },
		);
	}
}
