import { z } from "zod";

const contentfulManagementEnvSchema = z.object({
  CONTENTFUL_SPACE_ID: z.string().min(1),
  CONTENTFUL_ENVIRONMENT: z.string().min(1).default("master"),
  CONTENTFUL_MANAGEMENT_TOKEN: z.string().min(1),
});

export function requireContentfulManagementEnv() {
  const parsedEnv = contentfulManagementEnvSchema.safeParse({
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
    CONTENTFUL_MANAGEMENT_TOKEN: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  });

  if (!parsedEnv.success) {
    console.error(
      "Invalid Contentful management environment variables",
      parsedEnv.error.flatten().fieldErrors,
    );
    throw new Error(
      "Set CONTENTFUL_SPACE_ID, CONTENTFUL_ENVIRONMENT, and CONTENTFUL_MANAGEMENT_TOKEN before running migrations.",
    );
  }

  return {
    spaceId: parsedEnv.data.CONTENTFUL_SPACE_ID,
    environmentId: parsedEnv.data.CONTENTFUL_ENVIRONMENT,
    accessToken: parsedEnv.data.CONTENTFUL_MANAGEMENT_TOKEN,
  };
}
