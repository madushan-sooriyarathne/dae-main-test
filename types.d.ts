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
  };

  type SocialLink = {
    id: string; // This is should match with a symbol id in sprites.svg
    url: string;
    label: string;
  };

  type NavLink = {
    route: string;
    label: string;
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
