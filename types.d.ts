import type { MultiImageContentSectionType } from "@layout/common/multi-image-content-horizontal";

declare global {
  type Image = {
    src: string;
    alt: string;
    blurUrl: string;
    dimensions?: {
      width: number;
      height: number;
    };
  };

  type Brand = {
    companyName: string;
    address: string;
    vatNo: string;
    registrationNumber?: string;
    email: string;
    phone: string;
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

  interface ArticlePreview {
    title: string;
    id: string;
    date: string;
    previewText: string;
    url: string;
    image: Image;
  }

  interface PageHeader {
    heading: string;
    subHeading: string;
    images: Image[];
  }

  type MultiImageContentBlockType = MultiImageContentSectionType;

  type Video = {
    files: {
      src: string;
      type: string;
      id: string;
    }[];
    fallbackImage: Image;
  };

  type Slide = {
    title: string;
    subtitle: string;
    url?: string;
    external?: boolean;
  };
}

export {};
