import { contentfulClient } from "@lib/contentful";

import { formatId } from "@utils/base";
import { getBlurHash } from "@utils/blurHashGenerator";

import type {
  IArticlePreviewFields,
  IBannerBlockFields,
  IBannerCardBlockFields,
  IBoatFields,
  ICardBlockFields,
  ICruiseTypeFields,
  IFaqFields,
  IHeroSlideFields,
  IImageContentBlockFields,
  IMultiImageContentBlockFields,
  IOfferFields,
  IPageHeaderBlockFields,
  IPageSummeryBlockFields,
  IStatFields,
  ITestimonialFields,
  ITextContentBlockFields,
  IVideoBlockFields,
} from "@cms/generated/types";

import type { BannerType } from "@layout/common/banner-section";
import type { ImageContentSectionType } from "@layout/common/image-content-section";
import type { PageHeaderType } from "@layout/common/page-header";
import type { PageSummerySectionType } from "@layout/common/page-summery-section";
import type { Asset } from "contentful";
import type { CardBlockType } from "@components/card-block";
import type { ContentGroupType } from "@layout/common/groups/content-group";
import type { BannerCardType } from "@components/banner-card";

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
      subHeading: data.fields.subHeading || null,
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
): Promise<MultiImageContentBlockType> => {
  if (entryId.length < 1) throw new Error("Entry ID is empty");

  try {
    const data = await contentfulClient.getEntry<IMultiImageContentBlockFields>(
      entryId
    );

    return {
      heading: data.fields.heading,
      subHeading: data.fields.subHeading || null,
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
      content: data.fields.description ? data.fields.description : null,
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

export const getPageHeaderBlock = async (
  entryId: string
): Promise<PageHeaderType> => {
  if (entryId.length < 1) throw new Error("Entry ID is empty");

  try {
    const data = await contentfulClient.getEntry<IPageHeaderBlockFields>(
      entryId
    );

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

export const getPageSummeryBlock = async (
  entryId: string
): Promise<PageSummerySectionType> => {
  if (entryId.length < 1) throw new Error("Entry ID is empty");

  try {
    const data = await contentfulClient.getEntry<IPageSummeryBlockFields>(
      entryId
    );

    return {
      heading: data.fields.heading,
      subHeading: data.fields.subHeading || null,
      content: data.fields.description,
      image: data.fields.image
        ? await processContentfulImage(data.fields.image)
        : null,
    };
  } catch (error: unknown) {
    throw new Error(
      `Error fetching the Image Content Block with given ID: ${entryId}`
    );
  }
};

export const getFAQGroup = async (
  group: string,
  limit?: number
): Promise<FAQ[]> => {
  const data = await contentfulClient.getEntries<IFaqFields>({
    content_type: "faq",
    limit: limit,
    "fields.group": group,
  });

  if (data.items.length < 1) throw new Error("No FAQs found");

  return data.items.map((faq) => ({
    question: faq.fields.question,
    answer: faq.fields.answer,
    id: faq.fields.id,
  }));
};

export const getCardBlockGroup = async (
  group: string,
  limit?: number
): Promise<CardBlockType[]> => {
  const data = await contentfulClient.getEntries<ICardBlockFields>({
    content_type: "cardBlock",
    limit: limit,
    "fields.group": group,
  });

  if (data.items.length < 1) throw new Error("No Card Blocks found");

  return await Promise.all(
    data.items.map(async (card) => ({
      ...card.fields,
      subTitle: card.fields.subTitle ? card.fields.subTitle : null,
      image: await processContentfulImage(card.fields.image),
    }))
  );
};

export const getTextContentBlock = async (
  entryId: string
): Promise<ContentGroupType> => {
  if (entryId.length < 1) throw new Error("Entry ID is empty");

  try {
    const data = await contentfulClient.getEntry<ITextContentBlockFields>(
      entryId
    );

    return {
      heading: data.fields.heading,
      subHeading: data.fields.subHeading || null,
      content: data.fields.description,
    };
  } catch {
    throw new Error(
      `Error fetching the Text Content Block with given ID: ${entryId}`
    );
  }
};

export const getPreviewArticles = async (): Promise<ArticlePreview[]> => {
  const data = await contentfulClient.getEntries<IArticlePreviewFields>({
    content_type: "articlePreview",
  });

  if (data.items.length < 1) throw new Error("No articles found");

  return await Promise.all(
    data.items.map(async (article) => ({
      ...article.fields,
      image: await processContentfulImage(article.fields.image),
    }))
  );
};

export const getOffers = async (): Promise<Offer[]> => {
  const data = await contentfulClient.getEntries<IOfferFields>({
    content_type: "offer",
  });

  return await Promise.all(
    data.items.map(async (offer) => ({
      ...offer.fields,
      images: await Promise.all(
        offer.fields.images.map(
          async (img) => await processContentfulImage(img)
        )
      ),
    }))
  );
};

export const getVideoBlock = async (entryId: string): Promise<Video> => {
  if (entryId.length < 1) throw new Error("Entry ID is empty");

  try {
    const data = await contentfulClient.getEntry<IVideoBlockFields>(entryId);

    return {
      fallbackImage: await processContentfulImage(data.fields.fallbackImage),
      files: data.fields.videos.map((vid) => ({
        id: formatId(vid.fields.title),
        src: vid.fields.file.url,
        type: vid.fields.file.contentType,
      })),
      title: data.fields.title || null,
    };
  } catch {
    throw new Error(
      `Error fetching the Text Content Block with given ID: ${entryId}`
    );
  }
};

export const getHeroSlides = async (): Promise<HeroSlide[]> => {
  try {
    const data = await contentfulClient.getEntries<IHeroSlideFields>({
      content_type: "heroSlide",
    });

    return data.items.map((slide) => ({
      ...slide.fields,
      ctaLink: slide.fields.ctaLink || null,
      ctaText: slide.fields.ctaText || null,
    }));
  } catch (err: unknown) {
    throw new Error(`Error fetching the Hero Slides`);
  }
};

export const getCruiseTypes = async (): Promise<CruiseType[]> => {
  try {
    const data = await contentfulClient.getEntries<ICruiseTypeFields>({
      content_type: "eventType",
    });

    return await Promise.all(
      data.items.map(async (type) => ({
        ...type.fields,
        image: await processContentfulImage(type.fields.image),
      }))
    );
  } catch (err: unknown) {
    throw new Error(`Error fetching the Hero Slides`);
  }
};

export const getBannerCardBlocks = async (
  group: string,
  limit?: number
): Promise<Omit<BannerCardType, "button">[]> => {
  if (group.length < 1) throw new Error("Group id cannot be empty");

  try {
    const data = await contentfulClient.getEntries<IBannerCardBlockFields>({
      content_type: "bannerCardBlock",
      limit: limit,
      "fields.group": group,
    });

    return await Promise.all(
      data.items.map(async (card) => ({
        ...card.fields,
        content: card.fields.content || null,
        image: await processContentfulImage(card.fields.image),
      }))
    );
  } catch (error: unknown) {
    throw new Error(
      `An error occurred while fetching Banner Card Blocks of group id ${group}`
    );
  }
};

export const getBoat = async (entryId: string): Promise<Boat> => {
  if (entryId.length < 1) throw new Error("entryId cannot be empty");

  try {
    const data = await contentfulClient.getEntry<IBoatFields>(entryId);

    return {
      ...data.fields,
      coverImage: await processContentfulImage(data.fields.coverImage),
      gallery: await Promise.all(
        data.fields.gallery.map(async (img) => processContentfulImage(img))
      ),
      video: data.fields.video
        ? {
            fallbackImage: await processContentfulImage(
              data.fields.video.fields.fallbackImage
            ),
            files: data.fields.video.fields.videos.map((vid) => ({
              src: vid.fields.file.url,
              id: vid.fields.title,
              type: vid.fields.file.contentType,
            })),
            title: data.fields.video.fields.title || null,
          }
        : null,
      guestsEvents: data.fields.guestsEvents || null,
      guestsStay: data.fields.guestsStay || null,
    };
  } catch (error: unknown) {
    throw new Error(
      `An error occurred while fetching Boat data for entry ${entryId}`
    );
  }
};
