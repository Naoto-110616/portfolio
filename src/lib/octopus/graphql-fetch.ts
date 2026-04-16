type GraphqlError = { message: string; extensions?: { errorCode?: string } };

type GraphqlResponse<T> = {
	data?: T;
	errors?: GraphqlError[];
};

export class OctopusGraphqlError extends Error {
	readonly errorCodes: string[];

	constructor(message: string, errorCodes: string[]) {
		super(message);
		this.name = "OctopusGraphqlError";
		this.errorCodes = errorCodes;
		Object.setPrototypeOf(this, OctopusGraphqlError.prototype);
	}
}

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
		const errorCodes = json.errors.flatMap((e) => {
			const code = e.extensions?.errorCode;
			return code ? [code] : [];
		});
		throw new OctopusGraphqlError(json.errors.map((e) => e.message).join("; "), errorCodes);
	}

	if (!json.data) {
		throw new Error("Octopus GraphQL returned no data.");
	}

	return json.data;
}
