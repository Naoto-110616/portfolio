import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  CONTENTFUL_SPACE_ID: z.string().min(1).optional(),
  CONTENTFUL_ACCESS_TOKEN: z.string().min(1).optional(),
  CONTENTFUL_ENVIRONMENT: z.string().min(1).default("master"),
  RESEND_API_KEY: z.string().min(1).optional(),
  RESEND_FROM_EMAIL: z.string().email().optional(),
  CONTACT_TO_EMAIL: z.string().email().optional(),
});

const parsedEnv = serverEnvSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
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
  hasContentful: Boolean(env.CONTENTFUL_SPACE_ID && env.CONTENTFUL_ACCESS_TOKEN),
  hasResend: Boolean(
    env.RESEND_API_KEY && env.RESEND_FROM_EMAIL && env.CONTACT_TO_EMAIL,
  ),
};

export function requireContentfulEnv() {
  if (!integrationStatus.hasContentful) {
    throw new Error(
      "Contentful environment variables are missing. Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN.",
    );
  }

  return {
    space: env.CONTENTFUL_SPACE_ID!,
    accessToken: env.CONTENTFUL_ACCESS_TOKEN!,
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
