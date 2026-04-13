import { NextResponse } from "next/server";

import { createContactInquiry } from "@/lib/contentful/management";
import { contactSchema } from "@/lib/contact/schema";
import { requireResendEnv } from "@/lib/env";
import { getResendClient } from "@/lib/resend/client";

function escapeHtml(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

function buildContactEmailHtml(input: {
	name: string;
	topic: string;
	contact: string;
	inquiryId?: string;
}) {
	const name = escapeHtml(input.name);
	const topic = escapeHtml(input.topic);
	const contact = escapeHtml(input.contact);
	const inquiryId = input.inquiryId ? escapeHtml(input.inquiryId) : undefined;

	return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2>New contact inquiry</h2>
      ${inquiryId ? `<p><strong>Inquiry ID:</strong> ${inquiryId}</p>` : ""}
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Topic:</strong> ${topic}</p>
      <p><strong>Contact:</strong> ${contact}</p>
    </div>
  `;
}

function getReplyTo(contact: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) ? contact : undefined;
}

export async function POST(request: Request) {
	try {
		const payload = await request.json();
		const parsed = contactSchema.safeParse(payload);

		if (!parsed.success) {
			return NextResponse.json(
				{
					message: "入力内容を確認してください。",
					errors: parsed.error.flatten().fieldErrors,
				},
				{ status: 400 },
			);
		}

		const inquiry = await createContactInquiry(parsed.data);
		const { from, to } = requireResendEnv();
		const resend = getResendClient();

		try {
			await resend.emails.send({
				from,
				to,
				replyTo: getReplyTo(parsed.data.contact),
				subject: `New inquiry from ${parsed.data.name}`,
				html: buildContactEmailHtml({
					...parsed.data,
					inquiryId: inquiry.sys.id,
				}),
			});
		} catch (error) {
			console.error("Contact email notification error", error);

			return NextResponse.json(
				{
					message: "お問い合わせは保存されましたが、通知送信に失敗しました。",
				},
				{ status: 502 },
			);
		}

		return NextResponse.json({
			message: "お問い合わせを送信しました。",
		});
	} catch (error) {
		console.error("Contact API error", error);
		const status =
			error instanceof Error && error.message.includes("Resend environment variables") ? 503 : 500;

		return NextResponse.json(
			{
				message: error instanceof Error ? error.message : "お問い合わせの送信に失敗しました。",
			},
			{ status },
		);
	}
}
