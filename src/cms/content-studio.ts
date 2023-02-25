import type { Asset, Entry } from "contentful";

import { contentfulClient, getAssetUrl } from "@lib/contentful";

import { formatId } from "@utils/base";
import { getBlurHash } from "@utils/blurHashGenerator";

import type {
  IArticleFields,
  IBannerBlockFields,
  IBannerCardBlockFields,
  ICardBlockFields,
  IChildSiteFields,
  ICompanyValueFields,
  IFaqFields,
  IHeroSlideFields,
  IImageContentBlockFields,
  IJobPostFields,
  IMultiImageContentBlockFields,
  IPageHeaderBlockFields,
  IPageSummeryBlockFields,
  IPlaceFields,
  IStatFields,
  ITestimonialFields,
  ITextContentBlockFields,
  ITrainingCourseFields,
  IVideoBlockFields,
} from "@cms/generated/types";

import type { BannerType } from "@layout/common/banner-section";
import type { ContentGroupType } from "@layout/common/groups/content-group";
import type { ImageContentSectionType } from "@layout/common/image-content-section";
import type { PageHeaderType } from "@layout/common/page-header";
import type { PageSummerySectionType } from "@layout/common/page-summery-section";

import type { BannerCardType } from "@components/banner-card";
import type { CardBlockType } from "@components/card-block";

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
      ...data.fields,
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

export const getVideoBlock = async (entryId: string): Promise<Video> => {
  if (entryId.length < 1) throw new Error("Entry ID is empty");

  try {
    const data = await contentfulClient.getEntry<IVideoBlockFields>(entryId);

    return {
      fallbackImage: await processContentfulImage(data.fields.fallbackImage),
      files: data.fields.videos.map((vid) => ({
        id: formatId(vid.fields.title),
        src: getAssetUrl(vid),
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

export const getChildSites = async (): Promise<ChildSite[]> => {
  try {
    const data = await contentfulClient.getEntries<IChildSiteFields>({
      content_type: "childSite",
    });

    return await Promise.all(
      data.items.map(async (site) => ({
        ...site.fields,
        image: await processContentfulImage(site.fields.image),
      }))
    );
  } catch (err: unknown) {
    throw new Error(`Error fetching the Child sites`);
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

export const getPlaces = async (): Promise<Place[]> => {
  try {
    const response = await contentfulClient.getEntries<IPlaceFields>({
      content_type: "place",
      limit: 5,
    });

    return response.items.map((place) => ({
      ...place.fields,
      mapIcon: place.fields.mapIcon ? getAssetUrl(place.fields.mapIcon) : null,
    }));
  } catch (error: unknown) {
    throw new Error("An error occurred while fetching Places");
  }
};

export const getCompanyValues = async (
  limit?: number
): Promise<CompanyValue[]> => {
  try {
    const response = await contentfulClient.getEntries<ICompanyValueFields>({
      content_type: "companyValue",
      limit: limit,
    });

    return await Promise.all(
      response.items.map(async (value) => ({
        ...value.fields,
        image: await processContentfulImage(value.fields.image),
      }))
    );
  } catch (error: unknown) {
    throw new Error("An error occurred while fetching Company values");
  }
};

export const getJobPosts = async (
  limit?: number,
  excludeEntry?: string
): Promise<JobPost[]> => {
  try {
    const response = await contentfulClient.getEntries<IJobPostFields>({
      content_type: "jobPost",
      limit: limit,
      "fields.id[ne]": excludeEntry,
    });

    return await Promise.all(
      response.items.map(async (job) => ({
        ...job.fields,
        coverImage: await processContentfulImage(job.fields.coverImage),
      }))
    );
  } catch (error: unknown) {
    throw new Error("An error occurred while fetching Job Posts");
  }
};

export const getJobPost = async (jobId: string): Promise<JobPost> => {
  if (jobId.length < 1) throw new Error("jobId cannot be a empty string");

  try {
    const response = await contentfulClient.getEntries<IJobPostFields>({
      content_type: "jobPost",
      limit: 1,
      "fields.id": jobId,
    });

    if (response.items.length < 1 && !response.items[0])
      throw new Error(`no job post entires found for field id: ${jobId}`);

    return {
      ...(response.items[0] as Entry<IJobPostFields>).fields,
      coverImage: await processContentfulImage(
        (response.items[0] as Entry<IJobPostFields>).fields.coverImage
      ),
    };
  } catch (err: unknown) {
    throw new Error(
      `An error occurred while fetching jobPost entry for entry id: ${jobId}`
    );
  }
};

export const getTrainingCourses = async (
  limit?: number
): Promise<TrainingCourse[]> => {
  try {
    const response = await contentfulClient.getEntries<ITrainingCourseFields>({
      content_type: "trainingCourse",
      limit,
    });

    return await Promise.all(
      response.items.map(async (course) => ({
        ...course.fields,
        image: await processContentfulImage(course.fields.image),
        courseOutline: course.fields.courseOutline?.fields.file.url || null,
      }))
    );
  } catch (err: unknown) {
    throw new Error("An error occurred while fetching Training Courses");
  }
};

export const getArticles = async (
  limit?: number,
  excludeEntry?: string
): Promise<Article[]> => {
  try {
    const response = await contentfulClient.getEntries<IArticleFields>({
      content_type: "article",
      limit,
      "fields.id[ne]": excludeEntry,
    });

    return await Promise.all(
      response.items.map(async (article) => ({
        ...article.fields,
        author: article.fields.author || null,
        image: await processContentfulImage(article.fields.image),
      }))
    );
  } catch (error: unknown) {
    throw new Error("An error occurred while fetching articles.");
  }
};

export const getArticle = async (articleId: string): Promise<Article> => {
  if (articleId.length < 1) {
    throw new Error("articleId cannot be empty");
  }

  try {
    const response = await contentfulClient.getEntries<IArticleFields>({
      content_type: "article",
      "fields.id": articleId,
    });

    if (response.items.length < 1)
      throw new Error(`No articles found for given article id ${articleId}`);

    return {
      ...(response.items[0] as Entry<IArticleFields>).fields,
      image: await processContentfulImage(
        (response.items[0] as Entry<IArticleFields>).fields.image
      ),
      author:
        (response.items[0] as Entry<IArticleFields>).fields.author || null,
    };
  } catch (error: unknown) {
    throw new Error(
      `An error occurred while fetching the article with id ${articleId}`
    );
  }
};
