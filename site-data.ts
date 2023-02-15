export const brand: Brand = {
  companyName: "Marina by D.A.E",
  address: "58, 42nd Lane, Wellawatte, Colombo 06, Sri Lanka.",
  vatNo: "501030670",
  registrationNumber: "PV17108040",
  email: "sales@dae.fun",
  phone: "+94 76 36 52 456",
  whatsapp: {
    url: "https://wa.me/+94763652456",
    number: "+94 76 365 2456",
  },
  location: { lat: 6.755922562786295, lng: 79.9280520585388 },
};

export const navLinks: NavLink[] = [
  { label: "Club", route: "/club" },
  { label: "Berthing", route: "/berthing" },
  { label: "Activities", route: "/activities" },
  { label: "Safety", route: "/safety" },
  { label: "Restaurant", route: "/restaurant" },
  { label: "Events", route: "/events" },
];

export const sideBarNavLinks: NavLink[] = [
  { label: "Club", route: "/club" },
  { label: "Berthing", route: "/berthing" },
  { label: "Activities", route: "/activities" },
  { label: "Safety", route: "/safety" },
  { label: "Restaurant", route: "/restaurant" },
  { label: "Events", route: "/events" },
  { label: "Offers", route: "/offers" },
  { label: "Blog", route: "https://dae.fun/blog", external: true },
  { label: "Contact", route: "/contact" },
];

export const socialLinks: SocialLink[] = [
  {
    id: "facebook",
    url: "https://www.facebook.com/DAEYachtClub/",
    label: "Facebook",
  },
  {
    id: "instagram",
    url: "https://www.instagram.com/dae_yacht_club/",
    label: "Instagram",
  },
  { id: "twitter", url: "https://twitter.com/DAEYachtClub", label: "Twitter" },
  {
    id: "youtube",
    url: "https://www.youtube.com/channel/UCYB1c5x1x5l5n5nZkG9Zp5A",
    label: "YouTube",
  },
  {
    id: "linkedin",
    url: "https://www.linkedin.com/company/d-a-e-yacht-club/",
    label: "LinkedIn",
  },
];

export const reservationTypes: ReservationType[] = [
  {
    image: {
      src: "https://images.ctfassets.net/5uyx9ygtaaqf/3K53muxwYjbNidlZNpoqES/7398ee1901d9f9f8a9bc22b5039eea61/reservation-type-restaurant.jpg",
      alt: "Restaurant Reservation selector image - Food Plates at Marina by D.A.E restaurant",
      blurUrl: "",
    },
    id: "restaurant",
    name: "Restaurant",
  },
  {
    image: {
      src: "https://images.ctfassets.net/5uyx9ygtaaqf/6Jkvb8n9n3ThE9lKKWOVOF/1be8cdae3dd7688cd8a94f8cdae794dd/reservation-type-watersports.jpg",
      alt: "Water-sports Reservation selector image - A couple on a Sea-Doo jet ski at Marina by D.A.E",
      blurUrl: "",
    },
    id: "water-sports",
    name: "Water Sports",
  },
  {
    image: {
      src: "https://images.ctfassets.net/5uyx9ygtaaqf/1c9xJC7BghZXzglXtuQh7s/abf50481f46084b908f2af1843b27d50/reservation-type-offers.jpg",
      alt: "Packages and Offers Reservation selector image - A girl relaxing in the swimming pool at Marina by D.A.E",
      blurUrl: "",
    },
    id: "packages-and-offers",
    name: "Packages and Offers",
  },
  {
    image: {
      src: "https://images.ctfassets.net/5uyx9ygtaaqf/Xt6BBRs0pPM5SEPIHVerb/787e216fd9b7fab87c540124a623682a/reservation-type-events.jpg",
      alt: "Events Reservation selector image - A dining table of event at Marina by D.A.E",
      blurUrl: "",
    },
    id: "events",
    name: "Events",
  },
];

type ErrorType = {
  code: number;
  message: string;
  title: string;
  image: Image;
};

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

export const eventTypes = [
  "Weddings",
  "Birthdays",
  "Corporate Events",
  "Gatherings",
] as const;

export const waterSports = ["Banana Boat", "Kayaking", "Jet Ski ride"] as const;
