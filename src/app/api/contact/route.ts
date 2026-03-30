import { NextResponse } from "next/server";

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
  email: string;
  company?: string;
  message: string;
}) {
  const name = escapeHtml(input.name);
  const email = escapeHtml(input.email);
  const company = escapeHtml(input.company ?? "Not provided");
  const message = escapeHtml(input.message).replace(/\n/g, "<br />");

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2>New contact inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    </div>
  `;
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

    const { from, to } = requireResendEnv();
    const resend = getResendClient();

    await resend.emails.send({
      from,
      to,
      replyTo: parsed.data.email,
      subject: `New inquiry from ${parsed.data.name}`,
      html: buildContactEmailHtml(parsed.data),
    });

    return NextResponse.json({
      message: "お問い合わせを送信しました。",
    });
  } catch (error) {
    console.error("Contact API error", error);
    const status =
      error instanceof Error && error.message.includes("Resend environment variables")
        ? 503
        : 500;

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "お問い合わせの送信に失敗しました。",
      },
      { status },
    );
  }
}
