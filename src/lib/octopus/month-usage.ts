import { env } from "@/lib/env";
import { getKrakenAccessToken } from "@/lib/octopus/auth";
import { resolveOctopusGraphqlUrl } from "@/lib/octopus/endpoint";
import { graphqlRequest } from "@/lib/octopus/graphql-fetch";
import { startOfZonedMonthUtcIso } from "@/lib/octopus/time-boundaries";

const VIEWER_ACCOUNTS_QUERY = `
	query ViewerAccounts {
		viewer {
			accounts {
				... on Account {
					number
				}
			}
		}
	}
`;

const HALF_HOURLY_QUERY = `
	query HalfHourlyWindow($accountNumber: String!, $fromDatetime: DateTime, $toDatetime: DateTime) {
		account(accountNumber: $accountNumber) {
			properties {
				electricitySupplyPoints {
					halfHourlyReadings(fromDatetime: $fromDatetime, toDatetime: $toDatetime) {
						startAt
						value
					}
				}
			}
		}
	}
`;

type ViewerData = {
	viewer: {
		accounts: Array<{ number?: string | null } | null> | null;
	} | null;
};

type HalfHourlyData = {
	account: {
		properties: Array<{
			electricitySupplyPoints: Array<{
				halfHourlyReadings: Array<{ startAt: string; value: string } | null> | null;
			} | null> | null;
		} | null> | null;
	} | null;
};

function parseKwh(raw: string): number {
	const n = Number(raw);
	return Number.isFinite(n) ? n : 0;
}

async function resolveAccountNumber(token: string, graphqlUrl: string): Promise<string> {
	const configured = env.OCTOPUSENERGY_ACCOUNT_NUMBER?.trim();
	if (configured) {
		return configured;
	}

	const data = await graphqlRequest<ViewerData>(
		graphqlUrl,
		{ query: VIEWER_ACCOUNTS_QUERY },
		token,
	);
	const first = data.viewer?.accounts?.find((a) => a?.number);
	const number = first?.number;
	if (!number) {
		throw new Error("No Octopus account number found for this user.");
	}
	return number;
}

export type MonthElectricityResult = {
	ok: true;
	kwh: number;
	yearMonth: string;
	timezone: string;
	intervalCount: number;
};

export async function fetchThisMonthElectricityKwh(
	timeZone: string,
	reference: Date = new Date(),
): Promise<MonthElectricityResult> {
	const graphqlUrl = resolveOctopusGraphqlUrl();
	const token = await getKrakenAccessToken(graphqlUrl);
	const accountNumber = await resolveAccountNumber(token, graphqlUrl);

	const ymd = reference.toLocaleDateString("en-CA", { timeZone });
	const yearMonth = ymd.slice(0, 7);

	const fromDatetime = startOfZonedMonthUtcIso(reference, timeZone);
	const toDatetime = reference.toISOString();

	const data = await graphqlRequest<HalfHourlyData>(
		graphqlUrl,
		{
			query: HALF_HOURLY_QUERY,
			variables: { accountNumber, fromDatetime, toDatetime },
		},
		token,
	);

	const readings =
		data.account?.properties?.flatMap(
			(p) => p?.electricitySupplyPoints?.flatMap((s) => s?.halfHourlyReadings ?? []) ?? [],
		) ?? [];

	const rows = readings.filter((r): r is NonNullable<typeof r> => Boolean(r));

	const kwh = rows.reduce((sum, r) => sum + parseKwh(r.value), 0);

	return {
		ok: true,
		kwh,
		yearMonth,
		timezone: timeZone,
		intervalCount: rows.length,
	};
}
