import { env } from "@/lib/env";

const DEFAULT_GRAPHQL = "https://api.octopus.energy/v1/graphql/";

function normalizeGraphqlUrl(url: string): string {
	const trimmed = url.trim();
	return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
}

/**
 * Resolves the Kraken GraphQL endpoint. Japan (OEJP) uses api.oejp-kraken.energy; the UK uses api.octopus.energy.
 * If `OCTOPUSENERGY_GRAPHQL_URL` is unset and the API key is a JWT, `iss` from the payload is used.
 */
export function resolveOctopusGraphqlUrl(): string {
	const explicit = env.OCTOPUSENERGY_GRAPHQL_URL?.trim();
	if (explicit) {
		return normalizeGraphqlUrl(explicit);
	}

	const apiKey = env.OCTOPUSENERGY_API_KEY?.trim();
	if (apiKey?.startsWith("eyJ")) {
		try {
			const payload = JSON.parse(Buffer.from(apiKey.split(".")[1]!, "base64url").toString()) as {
				iss?: string;
			};
			if (payload.iss?.includes("graphql")) {
				return normalizeGraphqlUrl(payload.iss);
			}
		} catch {
			/* use default */
		}
	}

	return DEFAULT_GRAPHQL;
}
