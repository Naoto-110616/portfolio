import { NextResponse } from "next/server";

import { env, integrationStatus } from "@/lib/env";
import { fetchThisMonthElectricityKwh } from "@/lib/octopus/month-usage";

export const dynamic = "force-dynamic";

type NotConfigured = { ok: false; reason: "not_configured" };
type ErrorBody = { ok: false; reason: "error" };

export async function GET() {
	if (!integrationStatus.hasOctopusEnergy) {
		return NextResponse.json({ ok: false, reason: "not_configured" } satisfies NotConfigured);
	}

	try {
		const timeZone = env.OCTOPUSENERGY_TIMEZONE ?? "Asia/Tokyo";
		const payload = await fetchThisMonthElectricityKwh(timeZone);
		return NextResponse.json(payload);
	} catch (error) {
		console.error("Octopus electricity-month:", error);
		return NextResponse.json({ ok: false, reason: "error" } satisfies ErrorBody, { status: 502 });
	}
}
