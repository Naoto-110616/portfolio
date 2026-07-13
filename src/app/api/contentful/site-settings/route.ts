import { NextResponse } from "next/server";

import { getSiteSettings } from "@/lib/contentful/queries";

export async function GET() {
	const siteSettings = await getSiteSettings();

	return NextResponse.json(siteSettings);
}
