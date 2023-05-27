// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from "contentful";

export interface IArticleFields {
  /** Title */
  title: string;

  /** Id */
  id: string;

  /** Tags */
  tags: string[];

  /** Preview Content */
  previewContent: string;

  /** Content */
  content: string;

  /** Image */
  image: Asset;

  /** Author */
  author?: string | undefined;

  /** Published Date */
  publishedDate: string;
}

/** Main Specific */

export interface IArticle extends Entry<IArticleFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "article";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IBannerBlockFields {
  /** Heading */
  heading: string;

  /** Sub Heading */
  subHeading: string;

  /** Description */
  description?: string | undefined;

  /** Images */
  images: Asset[];
}

export interface IBannerBlock extends Entry<IBannerBlockFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "bannerBlock";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IBannerCardBlockFields {
  /** Heading */
  heading: string;

  /** Id */
  id: string;

  /** Sub Heading */
  subHeading: string;

  /** Content */
  content?: string | undefined;

  /** Image */
  image: Asset;

  /** Group */
  group: "event-types";
}

export interface IBannerCardBlock extends Entry<IBannerCardBlockFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "bannerCardBlock";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ICardBlockFields {
  /** Title */
  title: string;

  /** Id */
  id: string;

  /** Sub Title */
  subTitle?: string | undefined;

  /** Description */
  description: string;

  /** Image */
  image: Asset;

  /** Group */
  group: "dae-values";
}

export interface ICardBlock extends Entry<ICardBlockFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "cardBlock";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IChildSiteFields {
  /** Name */
  name: string;

  /** Id */
  id: string;

  /** Tag Line */
  tagLine: string;

  /** URL */
  url: string;

  /** Button Text */
  buttonText: string;

  /** Image */
  image: Asset;
}

/** Main Specific */

export interface IChildSite extends Entry<IChildSiteFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "childSite";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ICompanyValueFields {
  /** Name */
  name: string;

  /** Id */
  id: string;

  /** Description */
  description: string;

  /** Image */
  image: Asset;
}

/** Main Specific */

export interface ICompanyValue extends Entry<ICompanyValueFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "companyValue";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IFaqFields {
  /** Id */
  id: string;

  /** Question */
  question: string;

  /** Answer */
  answer: string;

  /** Group */
  group: "training-center-faq" | "membership-faq";
}

export interface IFaq extends Entry<IFaqFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "faq";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IHeroSlideFields {
  /** Heading */
  heading: string;

  /** Sub Text */
  subText: string;

  /** CTA Text */
  ctaText?: string | undefined;

  /** CTA Link */
  ctaLink?: string | undefined;

  /** External Link */
  externalLink: boolean;

  /** Image */
  image: Asset;
}

export interface IHeroSlide extends Entry<IHeroSlideFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "heroSlide";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IImageContentBlockFields {
  /** Heading */
  heading: string;

  /** Sub Heading */
  subHeading?: string | undefined;

  /** Description */
  description: string;

  /** Image */
  image: Asset;
}

/** Sections with a single image and a text content block. text content includes a heading, an optional sub-heading, and a description.  */

export interface IImageContentBlock extends Entry<IImageContentBlockFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "imageContentBlock";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IJobPostFields {
  /** Title */
  title: string;

  /** Id */
  id: string;

  /** Department */
  department: string;

  /** Location */
  location: string;

  /** Type */
  type: "Full-Time" | "Part-Time" | "Contract";

  /** Description */
  description: string;

  /** Cover Image */
  coverImage: Asset;
}

/** Main Specific */

export interface IJobPost extends Entry<IJobPostFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "jobPost";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ILegalDocumentFields {
  /** Title */
  title: string;

  /** Id */
  id: string;

  /** Date */
  date: string;

  /** Content */
  content: string;
}

export interface ILegalDocument extends Entry<ILegalDocumentFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "legalDocument";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IMultiImageContentBlockFields {
  /** Heading */
  heading: string;

  /** Sub Heading */
  subHeading?: string | undefined;

  /** Description */
  description: string;

  /** Images */
  images: Asset[];
}

/** Sections with multiple images and a text content block. text content includes a heading, an optional sub-heading, and a description.  */

export interface IMultiImageContentBlock
  extends Entry<IMultiImageContentBlockFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "multiImageContentBlock";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IPageHeaderBlockFields {
  /** Heading */
  heading: string;

  /** Sub Heading */
  subHeading: string;

  /** Images */
  images: Asset[];
}

export interface IPageHeaderBlock extends Entry<IPageHeaderBlockFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "pageHeaderBlock";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IPageSummeryBlockFields {
  /** Heading */
  heading: string;

  /** Sub Heading */
  subHeading: string;

  /** Image */
  image?: Asset | undefined;
}

/** Sections with a single image and a text content block. text content includes a heading, an optional sub-heading, and a description.  */

export interface IPageSummeryBlock extends Entry<IPageSummeryBlockFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "pageSummeryBlock";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IPlaceFields {
  /** Name */
  name: string;

  /** Id */
  id: string;

  /** Address */
  address: string;

  /** Email */
  email: string;

  /** Phone */
  phone: string;

  /** Coordinates  */
  coords: { lat: number; lon: number };

  /** Map Icon */
  mapIcon?: Asset | undefined;
}

/** Main Specific */

export interface IPlace extends Entry<IPlaceFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "place";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IStatFields {
  /** Id */
  id: string;

  /** Title */
  title: string;

  /** Description */
  description: string;

  /** Icon */
  icon?: Asset | undefined;

  /** Group */
  group: "training-perks" | "membership-perks";
}

export interface IStat extends Entry<IStatFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "stat";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ITestimonialFields {
  /** Customer Name */
  customerName: string;

  /** Title */
  title: string;

  /** Content */
  content: string;

  /** Customer Note */
  customerNote?: string | undefined;
}

/** A Testimonial by a client / customer */

export interface ITestimonial extends Entry<ITestimonialFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "testimonial";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ITextContentBlockFields {
  /** Heading */
  heading: string;

  /** Sub Heading */
  subHeading?: string | undefined;

  /** Description */
  description: string;
}

/** Text content block with a heading, an optional sub-heading, and a description.  */

export interface ITextContentBlock extends Entry<ITextContentBlockFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "textContentBlock";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ITrainingCourseFields {
  /** Name */
  name: string;

  /** Id */
  id: string;

  /** Duration */
  duration: string;

  /** Minimum Age */
  minAge: number;

  /** Description */
  description: string;

  /** Image */
  image: Asset;

  /** Course Outline */
  courseOutline?: Asset | undefined;
}

/** Main Specific */

export interface ITrainingCourse extends Entry<ITrainingCourseFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "trainingCourse";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IVideoBlockFields {
  /** Id */
  id: string;

  /** Type */
  type: "Local" | "Youtube";

  /** Youtube URL */
  youtubeUrl?: string | undefined;

  /** Videos */
  videos?: Asset[] | undefined;

  /** Fallback Image */
  fallbackImage: Asset;

  /** Title */
  title?: string | undefined;
}

/** A video block with multiple videos (multiple file types) and a fallback image.  */

export interface IVideoBlock extends Entry<IVideoBlockFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "videoBlock";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export type CONTENT_TYPE =
  | "article"
  | "bannerBlock"
  | "bannerCardBlock"
  | "cardBlock"
  | "childSite"
  | "companyValue"
  | "faq"
  | "heroSlide"
  | "imageContentBlock"
  | "jobPost"
  | "legalDocument"
  | "multiImageContentBlock"
  | "pageHeaderBlock"
  | "pageSummeryBlock"
  | "place"
  | "stat"
  | "testimonial"
  | "textContentBlock"
  | "trainingCourse"
  | "videoBlock";

export type IEntry =
  | IArticle
  | IBannerBlock
  | IBannerCardBlock
  | ICardBlock
  | IChildSite
  | ICompanyValue
  | IFaq
  | IHeroSlide
  | IImageContentBlock
  | IJobPost
  | ILegalDocument
  | IMultiImageContentBlock
  | IPageHeaderBlock
  | IPageSummeryBlock
  | IPlace
  | IStat
  | ITestimonial
  | ITextContentBlock
  | ITrainingCourse
  | IVideoBlock;

export type LOCALE_CODE = "en-US";

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "en-US";
