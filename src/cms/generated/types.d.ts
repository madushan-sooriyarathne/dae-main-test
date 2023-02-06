// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from "contentful";

export interface IArticlePreviewFields {
  /** Title */
  title: string;

  /** Id */
  id: string;

  /** Date */
  date: string;

  /** Preview Text */
  previewText: string;

  /** URL */
  url: string;

  /** Image */
  image: Asset;
}

export interface IArticlePreview extends Entry<IArticlePreviewFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "articlePreview";
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
  group: "storage-facilities" | "activity-types";
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

export interface IFaqFields {
  /** Question */
  question: string;

  /** Answer */
  answer: string;

  /** Id */
  id: string;

  /** Group */
  group: "membership-faq" | "dining-faq";
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

export interface IOfferFields {
  /** Name */
  name: string;

  /** Id */
  id: string;

  /** Description */
  description: string;

  /** Pricing */
  pricing: number;

  /** Pricing Type */
  pricingType: "percentage" | "fixed";

  /** Currency */
  currency: string;

  /** Expire Date */
  expireDate?: string | undefined;

  /** Images */
  images: Asset[];
}

export interface IOffer extends Entry<IOfferFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "offer";
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
  subHeading?: string | undefined;

  /** Description */
  description: string;

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
  group: "berthing-values" | "membership-perks" | "activities-perks";
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

export interface IVideoBlockFields {
  /** Videos */
  videos: Asset[];

  /** Id */
  id: string;

  /** Fallback Image */
  fallbackImage: Asset;
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
  | "articlePreview"
  | "bannerBlock"
  | "cardBlock"
  | "faq"
  | "imageContentBlock"
  | "multiImageContentBlock"
  | "offer"
  | "pageHeaderBlock"
  | "pageSummeryBlock"
  | "stat"
  | "testimonial"
  | "textContentBlock"
  | "videoBlock";

export type IEntry =
  | IArticlePreview
  | IBannerBlock
  | ICardBlock
  | IFaq
  | IImageContentBlock
  | IMultiImageContentBlock
  | IOffer
  | IPageHeaderBlock
  | IPageSummeryBlock
  | IStat
  | ITestimonial
  | ITextContentBlock
  | IVideoBlock;

export type LOCALE_CODE = "en-US";

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "en-US";
