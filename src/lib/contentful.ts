import { env } from "@env/client.mjs";
import { createClient } from "contentful";

import type { ContentfulClientApi } from "contentful";

const contentfulClient: ContentfulClientApi = createClient({
  space: env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN,
});

export { contentfulClient };
