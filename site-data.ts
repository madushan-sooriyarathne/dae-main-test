export const brand: Brand = {
  companyName: "The Marina by D. A. E",
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
