import { NextResponse } from "next/server";

import { getContactFormSettings } from "@/lib/contentful/queries";

export async function GET() {
	const contactFormSettings = await getContactFormSettings();

	return NextResponse.json(contactFormSettings);
}
