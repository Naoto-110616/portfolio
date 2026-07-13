import { NextResponse } from "next/server";

import { getAbout } from "@/lib/contentful/queries";

export async function GET() {
	const about = await getAbout();

	return NextResponse.json(about);
}
