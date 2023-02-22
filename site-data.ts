export const brand: Brand = {
  companyName: "Debug Auto Exclusive Private Limited.",
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
  { label: "About", route: "/about" },
  { label: "Membership", route: "/membership" },
  { label: "Events", route: "/events" },
  { label: "Offers", route: "/offers" },
  { label: "Training Center", route: "/training-center" },
];

export const sideBarNavLinks: NavLink[] = [
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
      src: "https://images.ctfassets.net/88dxwx49umgp/7JTcwrtVo4x1M1Xt6pULE5/ad4deb70940d9628747ad7f26b78997d/reservation-type-cruises.jpg",
      alt: "Cruises Reservation selector image - A cruising yacht by Debug Auto Exclusive",
      blurUrl: "",
    },
    id: "cruises",
    name: "Cruises",
  },
  {
    image: {
      src: "https://images.ctfassets.net/88dxwx49umgp/23T38Azj7Vu01l8VvRrDLN/74ec9a9e608c7b3456e21f10d481c53c/reservations-type-offers.jpg",
      alt: "Packages and Offers Reservation selector image - A couple having a good time in cruise by Debug Auto Exclusive",
      blurUrl: "",
    },
    id: "packages-and-offers",
    name: "Packages and Offers",
  },
  {
    image: {
      src: "https://images.ctfassets.net/88dxwx49umgp/UfOLa7Y9MP7nulHobrL1G/99d0d729cb0cbb02b80bee4129e04757/reservations-type-evens.jpg",
      alt: "Events Reservation selector image - Group of people having a party on a cruise by Debug Auto Exclusive",
      blurUrl: "",
    },
    id: "events",
    name: "Events",
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

export const cruiseTypes = [
  "Overnight Stay",
  "Sunset Cruise",
  "Morning Cruise",
] as const;
