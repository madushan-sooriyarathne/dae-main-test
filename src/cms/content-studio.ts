import { contentfulClient } from "@lib/contentful";

import { getBlurHash } from "@utils/blurHashGenerator";

import type {
  IBannerBlockFields,
  IImageContentBlockFields,
  IMultiImageContentBlockFields,
  IStatFields,
  ITestimonialFields,
} from "@cms/generated/types";
import type { BannerType } from "@layout/common/banner-section";
import type { ImageContentSectionType } from "@layout/common/image-content-section";
import type { MultiImageContentSectionType } from "@layout/common/multi-image-content-horizontal";
import type { Asset } from "contentful";

/**
 * format the given asset's url with protocol correction.
 * @param asset {Asset} - The Contentful Asset
 * @returns return a formatted URL for the asset
 */
const getAssetUrl = (asset: Asset): string => {
  return asset.fields.file.url.replace("//", "https://");
};

/**
 * Process the image from Contentful and add the blur hash\
 * @remark - This should be only used with Image assets from Contentful.
 * @param image {string} - The image URL
 * @returns {Promise<Image>} - The image object with the blur hash
 */
const processContentfulImage = async (image: Asset): Promise<Image> => {
  if (!image.fields.file.details.image)
    throw new Error("Image is not an image");

  let base64: string;
  const assetUrl: string = getAssetUrl(image);

  try {
    base64 = await getBlurHash(assetUrl);
  } catch (error: unknown) {
    console.error(
      `Error occurred while generating blurhash for image ${image.fields.file.url}`
    );
    base64 = "";
  }

  return {
    src: assetUrl,
    alt: image.fields.description || "",
    blurUrl: base64,
    dimensions: image.fields.file.details.image && {
      width: image.fields.file.details.image.width,
      height: image.fields.file.details.image.height,
    },
  };
};

/**
 * Fetch and return a image content block for the given entry id.
 * @param entryId {string} - The ID of the Image Content Block
 * @returns {Promise<ImageContentSectionType>} - The Image Content Block
 */
export const getImageContentBlock = async (
  entryId: string
): Promise<ImageContentSectionType> => {
  if (entryId.length < 1) throw new Error("Entry ID is empty");

  try {
    const data = await contentfulClient.getEntry<IImageContentBlockFields>(
      entryId
    );

    return {
      heading: data.fields.heading,
      subHeading: data.fields.subHeading,
      content: data.fields.description,
      image: await processContentfulImage(data.fields.image),
    };
  } catch (error: unknown) {
    throw new Error(
      `Error fetching the Image Content Block with given ID: ${entryId}`
    );
  }
};

export const getMultiImageContentBlock = async (
  entryId: string
): Promise<MultiImageContentSectionType> => {
  if (entryId.length < 1) throw new Error("Entry ID is empty");

  try {
    const data = await contentfulClient.getEntry<IMultiImageContentBlockFields>(
      entryId
    );

    return {
      heading: data.fields.heading,
      subHeading: data.fields.subHeading,
      content: data.fields.description,
      images: (await Promise.all(
        data.fields.images.map((image) => processContentfulImage(image))
      )) as [Image, Image, Image],
    };
  } catch (error: unknown) {
    throw new Error(
      `Error fetching the Image Content Block with given ID: ${entryId}`
    );
  }
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const data = await contentfulClient.getEntries<ITestimonialFields>({
    content_type: "testimonial",
  });

  if (data.items.length < 1) throw new Error("No testimonials found");

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data.items.map((testimonial) => ({ ...testimonial.fields }));
};

export const getStats = async (
  group: string,
  limit?: number
): Promise<Stat[]> => {
  const data = await contentfulClient.getEntries<IStatFields>({
    content_type: "stat",
    limit: limit,
    "fields.group": group,
  });

  if (data.items.length < 1) throw new Error("No stats found");

  return data.items.map((stat) => ({
    ...stat.fields,
    icon: stat.fields.icon ? getAssetUrl(stat.fields.icon) : null,
  }));
};

export const getBannerBlock = async (
  entryId: string
): Promise<Omit<BannerType, "button">> => {
  if (entryId.length < 1) throw new Error("Entry ID is empty");

  try {
    const data = await contentfulClient.getEntry<IBannerBlockFields>(entryId);

    return {
      heading: data.fields.heading,
      subHeading: data.fields.subHeading,
      images: await Promise.all(
        data.fields.images.map((img) => processContentfulImage(img))
      ),
    };
  } catch (error: unknown) {
    throw new Error(
      `Error fetching the Image Content Block with given ID: ${entryId}`
    );
  }
};
