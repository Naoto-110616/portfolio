import { Resend } from "resend";

import { requireResendEnv } from "@/lib/env";

export function getResendClient() {
	const { apiKey } = requireResendEnv();

	return new Resend(apiKey);
}
