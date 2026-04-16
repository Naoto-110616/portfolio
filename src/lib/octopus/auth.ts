import { env } from "@/lib/env";
import { graphqlRequest, OctopusGraphqlError } from "@/lib/octopus/graphql-fetch";

const JWT_SKEW_SECONDS = 120;
/** Kraken: refresh token has expired (full re-auth required). */
const KT_REFRESH_TOKEN_EXPIRED = "KT-CT-1134";

type ObtainResult = {
	obtainKrakenToken: {
		token: string;
		refreshToken?: string | null;
		refreshExpiresIn?: number | null;
	};
};

let memoryAccessToken: string | null = null;
let memoryAccessValidUntilUnix: number | null = null;
/** In-process refresh token (e.g. rotated by Kraken); falls back to env. */
let memoryRefreshToken: string | null = null;

function resetCredentialCache() {
	memoryAccessToken = null;
	memoryAccessValidUntilUnix = null;
	memoryRefreshToken = null;
}

function jwtExpUnix(token: string): number | null {
	try {
		const payload = JSON.parse(Buffer.from(token.split(".")[1]!, "base64url").toString()) as {
			exp?: number;
		};
		if (typeof payload.exp !== "number") {
			return null;
		}
		return payload.exp;
	} catch {
		return null;
	}
}

function rememberAccessToken(token: string) {
	memoryAccessToken = token;
	memoryAccessValidUntilUnix = jwtExpUnix(token);
}

function rememberTokensFromObtainResult(result: ObtainResult["obtainKrakenToken"]) {
	rememberAccessToken(result.token);
	if (result.refreshToken) {
		memoryRefreshToken = result.refreshToken;
	}
}

function memoryAccessCacheValid(): boolean {
	if (!memoryAccessToken || memoryAccessValidUntilUnix == null) {
		return false;
	}
	const now = Math.floor(Date.now() / 1000);
	return memoryAccessValidUntilUnix > now + JWT_SKEW_SECONDS;
}

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

const OBTAIN_MUTATION = `
	mutation ObtainKrakenToken($input: ObtainJSONWebTokenInput!) {
		obtainKrakenToken(input: $input) {
			token
			refreshToken
			refreshExpiresIn
		}
	}
`;

async function obtainKrakenToken(graphqlUrl: string, input: Record<string, unknown>): Promise<string> {
	const data = await graphqlRequest<ObtainResult>(graphqlUrl, {
		query: OBTAIN_MUTATION,
		variables: { input },
	});
	rememberTokensFromObtainResult(data.obtainKrakenToken);
	return data.obtainKrakenToken.token;
}

function effectiveRefreshToken(envRefresh: string | undefined): string | undefined {
	const trimmed = envRefresh?.trim();
	return memoryRefreshToken ?? (trimmed || undefined);
}

export async function getKrakenAccessToken(graphqlUrl: string): Promise<string> {
	const apiKey = env.OCTOPUSENERGY_API_KEY?.trim();
	const refreshTokenEnv = env.OCTOPUSENERGY_REFRESH_TOKEN?.trim();
	const email = env.OCTOPUSENERGY_EMAIL?.trim();
	const password = env.OCTOPUSENERGY_PASSWORD?.trim();

	if (memoryAccessCacheValid() && memoryAccessToken) {
		return memoryAccessToken;
	}

	if (apiKey?.startsWith("eyJ") && !isJwtExpired(apiKey, JWT_SKEW_SECONDS)) {
		rememberAccessToken(apiKey);
		return apiKey;
	}

	const refreshToTry = effectiveRefreshToken(refreshTokenEnv);
	if (refreshToTry) {
		try {
			return await obtainKrakenToken(graphqlUrl, { refreshToken: refreshToTry });
		} catch (error) {
			const isExpiredRefresh =
				error instanceof OctopusGraphqlError &&
				(error.errorCodes.includes(KT_REFRESH_TOKEN_EXPIRED) ||
					error.message.includes(KT_REFRESH_TOKEN_EXPIRED));
			if (!isExpiredRefresh) {
				throw error;
			}
			resetCredentialCache();
		}
	}

	if (email && password) {
		return await obtainKrakenToken(graphqlUrl, { email, password });
	}

	if (apiKey) {
		return await obtainKrakenToken(graphqlUrl, { APIKey: apiKey });
	}

	throw new Error("Octopus Energy credentials are not configured.");
}
