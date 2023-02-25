import { createClient, type Asset, type ContentfulClientApi } from "contentful";

import { env } from "@env/client.mjs";

const contentfulClient: ContentfulClientApi = createClient({
  space: env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN,
});

/**
 * format the given asset's url with protocol correction.
 * @param asset {Asset} - The Contentful Asset
 * @returns return a formatted URL for the asset
 */
const getAssetUrl = (asset: Asset): string => {
  return asset.fields.file.url.replace("//", "https://");
};

export { contentfulClient, getAssetUrl };
