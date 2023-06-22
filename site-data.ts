export const brand: Brand = {
  companyName: "Debug Auto Exclusive Private Limited.",
  address: "No 58, 42nd Lane, Wellawatte, Colombo 06, Sri Lanka.",
  vatNo: "501030670",
  registrationNumber: "PV17108040",
  email: "info@dae.fun",
  phone: "+94 77 776 7679",
  whatsapp: {
    url: "https://wa.me/+94777767679",
    number: "+94 77 776 7679",
  },
  location: { lat: 6.755922562786295, lng: 79.9280520585388 },
};

export const navLinks: NavLink[] = [
  { label: "Marina", route: "https://marina.dae.fun" },
  { label: "Products", route: "https://products.dae.fun" },
  { label: "Charter", route: "https://charter.dae.fun" },
  { label: "JetSki Safari", route: "https://safari.dae.fun" },
];

export const sideBarNavLinks: NavLink[] = [
  { label: "Marina", route: "https://marina.dae.fun" },
  { label: "Products", route: "https://products.dae.fun" },
  { label: "Charter", route: "https://charter.dae.fun" },
  { label: "JetSki Safari", route: "https://safari.dae.fun" },
  { label: "About", route: "/about" },
  { label: "Membership", route: "/membership" },
  { label: "Events", route: "/events" },
  { label: "Training Center", route: "/training-center" },
  { label: "Careers", route: "/careers" },
  { label: "Blog", route: "/blog" },
  { label: "Contact", route: "/contact" },
];

export const socialLinks: SocialLink[] = [
  {
    id: "facebook",
    url: "https://www.facebook.com/DebugAutoExclusive",
    label: "Facebook",
  },
  {
    id: "instagram",
    url: "https://www.instagram.com/d.a.e.lk/",
    label: "Instagram",
  },
  {
    id: "youtube",
    url: "https://www.youtube.com/@DebugAutoExclusive",
    label: "YouTube",
  },
  {
    id: "linkedin",
    url: "https://lk.linkedin.com/company/debug-auto-exclusive",
    label: "LinkedIn",
  },
];

export const inquiryTypes: InquiryType[] = [
  {
    image: {
      src: "https://images.ctfassets.net/z812u03kxpvy/42cuAjKkRUHIVu6Zr5yCey/685ebf864b0f0812c9da1666cf5dc6a2/training-inquiries.jpg",
      alt: "D.A.E Training Center- A jetski training by Debug Auto Exclusive",
      blurUrl: "",
    },
    id: "training-center",
    name: "Training Center Inquiries",
    type: "in-site",
  },
  {
    image: {
      src: "https://images.ctfassets.net/z812u03kxpvy/1mO373Niw0Lrj5X98BXA7G/073537b5fe77a6449960baa21be5d943/events-inquires.jpg",
      alt: "Event spaces on a house boat by Debug Auto Exclusive",
      blurUrl: "",
    },
    id: "events",
    name: "Events Inquires",
    type: "in-site",
  },
  {
    image: {
      src: "https://images.ctfassets.net/z812u03kxpvy/5wvUMFVNZR8jsiGv7xOwRM/31376f0648e6aafb079c53340dcb7c5d/marina-inquires.jpg",
      alt: "Jet skies being parked at the Marina by Debug Auto Exclusive",
      blurUrl: "",
    },
    id: "marina",
    name: "Marina Inquiries",
    type: "external",
    link: "https://marina.dae.fun/inquiries",
  },
  {
    image: {
      src: "https://images.ctfassets.net/z812u03kxpvy/6uNvgy70cAZEDe4IipPIHX/77f5cc316c672403cb954a209297d847/charter-inquiries.jpg",
      alt: "Luxury house boat by Debug Auto Exclusive",
      blurUrl: "",
    },
    id: "charter",
    name: "Charter Inquiries",
    type: "external",
    link: "https://charter.dae.fun/inquiries",
  },
  {
    image: {
      src: "https://images.ctfassets.net/z812u03kxpvy/2q0UjS0RycA7A2BtJXnUvx/6d3fa2a6d07ea4a3cb2fb08825322a61/products-inquires.jpg",
      alt: "Sea-Doo Jet ski in Sri Lanka by Debug Auto Exclusive",
      blurUrl: "",
    },
    id: "products",
    name: "Products Inquiries",
    type: "external",
    link: "https://products.dae.fun/inquiries",
  },
  {
    image: {
      src: "https://images.ctfassets.net/z812u03kxpvy/7f1GyHoVY6050iKI7aFzZ8/5c72cc7afaf0339e817592cb9975586a/safari-inquires.jpg",
      alt: "Two People on a JetSki safari by Debug Auto Exclusive",
      blurUrl: "",
    },
    id: "safari",
    name: "Safari Inquiries",
    type: "external",
    link: "https://safari.dae.fun/inquiries",
  },
];

export const errorTypes: ErrorType[] = [
  {
    code: 404,
    message:
      "Sorry! The page you are looking for doesn't exist or has been moved. Please check the URL or try navigating to our homepage to find what you're looking for:",
    title: "Page not found...",
    image: {
      src: "https://images.ctfassets.net/5uyx9ygtaaqf/1AQV0d6iAtWJu4PUTBKGRS/98ecefa1ca09a874d16a91d91220bd1d/404.jpg",
      blurUrl: "",
      alt: "404-image",
    },
  },
  {
    code: 500,
    message:
      "Our server encountered an unexpected error and we're unable to fulfill your request at this time. Please try refreshing the page, or come back later and try again. If the issue persists, please feel free to contact our support team for assistance.",
    title: "Something went wrong...",
    image: {
      src: "https://images.ctfassets.net/5uyx9ygtaaqf/1jNayDfJsQz5tg2skzAHbd/9a9757301643b54e5fb3ab436080b6e8/500.jpg",
      blurUrl: "",
      alt: "500-image",
    },
  },
];

export const acceptedFileTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats",
  "officedocument.wordprocessingml.document",
];

export const eventTypes = [
  "Weddings",
  "Birthdays",
  "Corporate Events",
  "Gatherings",
] as const;

export const trainingCourses = [
  "Jet Ski Training",
  "Power Boat Training",
  "Basic Water Sports Training",
] as const;
