import { env } from "@/lib/env";
import { graphqlRequest } from "@/lib/octopus/graphql-fetch";

const JWT_SKEW_SECONDS = 120;

type ObtainResult = {
	obtainKrakenToken: {
		token: string;
		refreshToken?: string | null;
		refreshExpiresIn?: number | null;
	};
};

function isJwtExpired(token: string, skewSeconds: number): boolean {
	try {
		const payload = JSON.parse(Buffer.from(token.split(".")[1]!, "base64url").toString()) as {
			exp?: number;
		};
		if (typeof payload.exp !== "number") {
			return true;
		}
		return payload.exp <= Math.floor(Date.now() / 1000) + skewSeconds;
	} catch {
		return true;
	}
}

export async function getKrakenAccessToken(graphqlUrl: string): Promise<string> {
	const apiKey = env.OCTOPUSENERGY_API_KEY?.trim();
	const refreshToken = env.OCTOPUSENERGY_REFRESH_TOKEN?.trim();

	if (apiKey?.startsWith("eyJ") && !isJwtExpired(apiKey, JWT_SKEW_SECONDS)) {
		return apiKey;
	}

	if (refreshToken) {
		const mutation = `
			mutation ObtainKrakenToken($input: ObtainJSONWebTokenInput!) {
				obtainKrakenToken(input: $input) {
					token
				}
			}
		`;
		const data = await graphqlRequest<ObtainResult>(graphqlUrl, {
			query: mutation,
			variables: { input: { refreshToken } },
		});
		return data.obtainKrakenToken.token;
	}

	if (apiKey) {
		const mutation = `
			mutation ObtainKrakenToken($input: ObtainJSONWebTokenInput!) {
				obtainKrakenToken(input: $input) {
					token
				}
			}
		`;
		const data = await graphqlRequest<ObtainResult>(graphqlUrl, {
			query: mutation,
			variables: { input: { APIKey: apiKey } },
		});
		return data.obtainKrakenToken.token;
	}

	throw new Error("Octopus Energy credentials are not configured.");
}
