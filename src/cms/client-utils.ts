import { contentfulClient, getAssetUrl } from "@lib/contentful";

export const getImage = async (imageId: string): Promise<Image> => {
  if (imageId.length < 1) throw new Error("imageId cannot be a empty string");

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = await contentfulClient.getAsset(imageId);

    //
    return {
      src: getAssetUrl(response),
      alt: response.fields.description,
      blurUrl: "",
    };
  } catch (err: unknown) {
    throw new Error(
      `An error occurred while fetching the image asset for id: ${imageId}`
    );
  }
};
