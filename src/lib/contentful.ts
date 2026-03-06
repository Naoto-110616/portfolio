import "server-only";
import { createClient } from "contentful";

function getRequiredEnv(name: string): string | null {
  const value = process.env[name];
  return value ?? null;
}

export function getContentfulClient() {
  const space = getRequiredEnv("CONTENTFUL_SPACE_ID");
  const usePreview = process.env.CONTENTFUL_USE_PREVIEW === "true";
  const accessToken = usePreview
    ? getRequiredEnv("CONTENTFUL_PREVIEW_ACCESS_TOKEN")
    : getRequiredEnv("CONTENTFUL_DELIVERY_ACCESS_TOKEN");

  if (!space || !accessToken) {
    return null;
  }

  return createClient({
    space,
    accessToken,
    host: usePreview ? "preview.contentful.com" : "cdn.contentful.com",
    environment: process.env.CONTENTFUL_ENVIRONMENT ?? "master",
  });
}
