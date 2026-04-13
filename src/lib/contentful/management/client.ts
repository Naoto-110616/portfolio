import { requireContentfulManagementEnv } from "@/lib/env";

const CONTENTFUL_MANAGEMENT_API_BASE_URL = "https://api.contentful.com";

export function getContentfulManagementConfig() {
	const { spaceId, accessToken, environmentId } = requireContentfulManagementEnv();

	return {
		accessToken,
		baseUrl: `${CONTENTFUL_MANAGEMENT_API_BASE_URL}/spaces/${spaceId}/environments/${environmentId}`,
	};
}

export async function fetchContentfulManagement<T>(
	path: string,
	init?: RequestInit,
	headers?: Record<string, string>,
) {
	const { accessToken, baseUrl } = getContentfulManagementConfig();
	const response = await fetch(`${baseUrl}${path}`, {
		...init,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/vnd.contentful.management.v1+json",
			...headers,
			...init?.headers,
		},
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(
			`Contentful management request failed (${response.status}): ${errorText || "Unknown error"}`,
		);
	}

	return (await response.json()) as T;
}
