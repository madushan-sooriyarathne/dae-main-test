import { createClient, type ContentfulClientApi } from "contentful";

import { env } from "@env/client.mjs";

const contentfulClient: ContentfulClientApi = createClient({
  space: env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN,
});

export { contentfulClient };
