import type { MultiImageContentSectionType } from "@layout/common/multi-image-content-horizontal";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any;
  }

  type EncodedFile = {
    filename: string;
    contentType: string;
    data: string;
  };
  type ErrorType = {
    code: number;
    message: string;
    title: string;
    image: Image;
  };

  type NonEmptyArray<T> = [T, ...T[]];

  type APIResponseType = {
    status: "success" | "failed";
    message: string | null;
    data: object | null;
  };

  type NotificationType = {
    title: string;
    message: string;
    type?: "error";
  };

  type InquiryType =
    | {
        image: Image;
        id: string;
        name: string;
        type: "in-site";
      }
    | {
        image: Image;
        id: string;
        name: string;
        type: "external";
        link: string;
      };

  type Image = {
    src: string;
    alt: string;
    blurUrl: string;
    dimensions?: {
      width: number;
      height: number;
    };
  };

  type YoutubeVideo = {
    name: string;
    id: string;
    url: string;
    thumbnail: Image;
    playlists?: string[];
  };

  type Brand = {
    companyName: string;
    address: string;
    vatNo: string;
    registrationNumber?: string;
    email: string;
    phone: string;
    whatsapp: {
      url: string;
      number: string;
    };
    location: { lat: number; lng: number };
  };

  type SocialLink = {
    id: string; // This is should match with a symbol id in sprites.svg
    url: string;
    label: string;
  };

  type NavLink = {
    route: string;
    label: string;
    external?: boolean;
  };

  interface Stat {
    id: string;
    icon: string | null;
    title: string;
    description: string;
  }

  type Testimonial = {
    customerName: string;
    title: string;
    content: string;
    customerNote?: string;
  };

  type FAQ = {
    id: string;
    question: string;
    answer: string;
  };

  interface PageHeader {
    heading: string;
    images: Image[];
  }

  type MultiImageContentBlockType = MultiImageContentSectionType;

  type YoutubeVideoType = {
    type: "Youtube";
    src: string;
    fallbackImage: Image;
    title: string | null;
  };

  type LocalVideoType = {
    type: "Local";
    src: {
      url: string;
      type: string;
      id: string;
    }[];
    fallbackImage: Image;
    title: string | null;
  };

  type VideoType = YoutubeVideoType | LocalVideoType;

  type HeroSlide = {
    heading: string;
    subText: string;
    ctaText: string | null;
    ctaLink: string | null;
    externalLink: boolean;
    image: Image;
  };

  // Main Specific types
  type Place = {
    name: string;
    id: string;
    address: string;
    phone: string;
    email: string;
    mapIcon: string | null;
    coords: {
      lon: number;
      lat: number;
    };
  };

  type CompanyValue = {
    id: string;
    name: string;
    description: string;
    image: Image;
  };

  type JobPost = {
    id: string;
    title: string;
    location: string;
    department: string;
    type: string; // Full-time / Part-time
    description: string;
    coverImage: Image;
  };

  type TrainingCourse = {
    id: string;
    name: string;
    duration: string;
    minAge: number;
    description: string;
    image: Image;
    courseOutline: string | null;
  };

  type Article = {
    id: string;
    title: string;
    tags: string[];
    previewContent: string;
    content: string;
    image: Image;
    publishedDate: string;
    author: string | null;
  };

  type ChildSite = {
    id: string;
    name: string;
    tagLine: string;
    url: string;
    buttonText: string;
    image: Image;
  };

  type LegalDocumentType = {
    id: string;
    title: string;
    date: string;
    content: string;
  };
}

export {};
