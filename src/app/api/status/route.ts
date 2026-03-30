import { NextResponse } from "next/server";

import { env, integrationStatus } from "@/lib/env";

export async function GET() {
  return NextResponse.json({
    siteUrl: env.NEXT_PUBLIC_SITE_URL,
    integrations: {
      contentful: integrationStatus.hasContentful,
      resend: integrationStatus.hasResend,
      tanstackQuery: true,
    },
    timestamp: new Date().toISOString(),
  });
}
