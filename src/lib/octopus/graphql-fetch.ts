type GraphqlError = { message: string };

type GraphqlResponse<T> = {
	data?: T;
	errors?: GraphqlError[];
};

export async function graphqlRequest<T>(
	graphqlUrl: string,
	body: { query: string; variables?: Record<string, unknown> },
	authToken?: string,
): Promise<T> {
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
	};
	if (authToken) {
		headers.Authorization = authToken;
	}

	const response = await fetch(graphqlUrl, {
		method: "POST",
		headers,
		body: JSON.stringify(body),
	});

	const json = (await response.json()) as GraphqlResponse<T>;

	if (!response.ok) {
		throw new Error(`Octopus GraphQL HTTP ${response.status}`);
	}

	if (json.errors?.length) {
		throw new Error(json.errors.map((e) => e.message).join("; "));
	}

	if (!json.data) {
		throw new Error("Octopus GraphQL returned no data.");
	}

	return json.data;
}
