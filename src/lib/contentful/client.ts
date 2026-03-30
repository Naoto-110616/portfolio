import { createClient } from "contentful";

import { requireContentfulEnv } from "@/lib/env";

export function getContentfulClient() {
  const { space, accessToken, environment } = requireContentfulEnv();

  return createClient({
    space,
    accessToken,
    environment,
  });
}
