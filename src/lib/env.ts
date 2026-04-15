import { z } from "zod";

const emptyStringToUndefined = (value: unknown) => {
	if (typeof value === "string" && value.trim() === "") {
		return undefined;
	}

	return value;
};

const optionalString = z.preprocess(emptyStringToUndefined, z.string().min(1).optional());

const optionalUrl = z.preprocess(emptyStringToUndefined, z.string().url().optional());

const optionalEmail = z.preprocess(emptyStringToUndefined, z.string().email().optional());

const serverEnvSchema = z.object({
	NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
	NEXT_PUBLIC_SITE_URL: optionalUrl,
	CONTENTFUL_SPACE_ID: optionalString,
	CONTENTFUL_DELIVERY_ACCESS_TOKEN: optionalString,
	CONTENTFUL_PREVIEW_ACCESS_TOKEN: optionalString,
	CONTENTFUL_ENVIRONMENT: z.string().min(1).default("master"),
	CONTENTFUL_MANAGEMENT_TOKEN: optionalString,
	RESEND_API_KEY: optionalString,
	RESEND_FROM_EMAIL: optionalEmail,
	CONTACT_TO_EMAIL: optionalEmail,
	GEMINI_API_KEY: optionalString,
	GEMINI_MODEL: optionalString,
	OCTOPUSENERGY_API_KEY: optionalString,
	OCTOPUSENERGY_REFRESH_TOKEN: optionalString,
	OCTOPUSENERGY_GRAPHQL_URL: optionalUrl,
	OCTOPUSENERGY_ACCOUNT_NUMBER: optionalString,
	OCTOPUSENERGY_TIMEZONE: optionalString,
});

const parsedEnv = serverEnvSchema.safeParse({
	NODE_ENV: process.env.NODE_ENV,
	NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
	CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
	CONTENTFUL_DELIVERY_ACCESS_TOKEN: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
	CONTENTFUL_PREVIEW_ACCESS_TOKEN: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
	CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
	CONTENTFUL_MANAGEMENT_TOKEN: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
	RESEND_API_KEY: process.env.RESEND_API_KEY,
	RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
	CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
	GEMINI_API_KEY: process.env.GEMINI_API_KEY,
	GEMINI_MODEL: process.env.GEMINI_MODEL,
	OCTOPUSENERGY_API_KEY: process.env.OCTOPUSENERGY_API_KEY,
	OCTOPUSENERGY_REFRESH_TOKEN: process.env.OCTOPUSENERGY_REFRESH_TOKEN,
	OCTOPUSENERGY_GRAPHQL_URL: process.env.OCTOPUSENERGY_GRAPHQL_URL,
	OCTOPUSENERGY_ACCOUNT_NUMBER: process.env.OCTOPUSENERGY_ACCOUNT_NUMBER,
	OCTOPUSENERGY_TIMEZONE: process.env.OCTOPUSENERGY_TIMEZONE,
});

if (!parsedEnv.success) {
	console.error("Invalid environment variables", parsedEnv.error.flatten().fieldErrors);
	throw new Error("Invalid environment variables.");
}

export const env = {
	...parsedEnv.data,
	NEXT_PUBLIC_SITE_URL: parsedEnv.data.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const integrationStatus = {
	hasContentful: Boolean(env.CONTENTFUL_SPACE_ID && env.CONTENTFUL_DELIVERY_ACCESS_TOKEN),
	hasContentfulManagement: Boolean(env.CONTENTFUL_SPACE_ID && env.CONTENTFUL_MANAGEMENT_TOKEN),
	hasResend: Boolean(env.RESEND_API_KEY && env.RESEND_FROM_EMAIL && env.CONTACT_TO_EMAIL),
	hasGemini: Boolean(env.GEMINI_API_KEY),
	hasOctopusEnergy: Boolean(env.OCTOPUSENERGY_REFRESH_TOKEN || env.OCTOPUSENERGY_API_KEY),
};

export function requireContentfulEnv() {
	if (!integrationStatus.hasContentful) {
		throw new Error(
			"Contentful environment variables are missing. Set CONTENTFUL_SPACE_ID and CONTENTFUL_DELIVERY_ACCESS_TOKEN.",
		);
	}

	return {
		space: env.CONTENTFUL_SPACE_ID!,
		accessToken: env.CONTENTFUL_DELIVERY_ACCESS_TOKEN!,
		environment: env.CONTENTFUL_ENVIRONMENT,
	};
}

export function requireResendEnv() {
	if (!integrationStatus.hasResend) {
		throw new Error(
			"Resend environment variables are missing. Set RESEND_API_KEY, RESEND_FROM_EMAIL, and CONTACT_TO_EMAIL.",
		);
	}

	return {
		apiKey: env.RESEND_API_KEY!,
		from: env.RESEND_FROM_EMAIL!,
		to: env.CONTACT_TO_EMAIL!,
	};
}

export function requireContentfulManagementEnv() {
	if (!integrationStatus.hasContentfulManagement) {
		throw new Error(
			"Contentful management environment variables are missing. Set CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN.",
		);
	}

	return {
		spaceId: env.CONTENTFUL_SPACE_ID!,
		accessToken: env.CONTENTFUL_MANAGEMENT_TOKEN!,
		environmentId: env.CONTENTFUL_ENVIRONMENT,
	};
}

export function requireGeminiEnv() {
	if (!integrationStatus.hasGemini) {
		throw new Error("Gemini environment variables are missing. Set GEMINI_API_KEY.");
	}

	return {
		apiKey: env.GEMINI_API_KEY!,
		model: env.GEMINI_MODEL ?? "gemini-2.0-flash",
	};
}
