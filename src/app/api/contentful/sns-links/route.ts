import { NextResponse } from "next/server";

import { getSnsLinks } from "@/lib/contentful/queries";

export async function GET() {
	const snsLinks = await getSnsLinks();

	return NextResponse.json(snsLinks);
}
