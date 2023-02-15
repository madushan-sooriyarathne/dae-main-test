import dynamic from "next/dynamic";

import {
  getBannerBlock,
  getHeroSlides,
  getImageContentBlock,
  getMultiImageContentBlock,
  getPageSummeryBlock,
  getStats,
  getTestimonials,
  getVideoBlock,
} from "@cms/content-studio";

import Page from "@layout/common/page";
import { type PageSummerySectionType } from "@layout/common/page-summery-section";
import { Hero } from "@layout/homepage/hero";
import { LocationSection } from "@layout/homepage/location-section";

import type { BannerType } from "@layout/common/banner-section";
import type { ImageContentSectionType } from "@layout/common/image-content-section";
import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

const MultiImageHorizontal = dynamic(() =>
  import("@layout/common/multi-image-content-horizontal").then(
    (mod) => mod.MultiImageHorizontal
  )
);

const ImageContentSection = dynamic(() =>
  import("@layout/common/image-content-section").then(
    (mod) => mod.ImageContentSection
  )
);

const PageSummerySection = dynamic(() =>
  import("@layout/common/page-summery-section").then(
    (mod) => mod.PageSummerySection
  )
);

const NewsletterSection = dynamic(() =>
  import("@layout/common/newsletter-section").then(
    (mod) => mod.NewsletterSection
  )
);
const ContactFormSection = dynamic(() =>
  import("@layout/common/contact-form").then((mod) => mod.ContactFormSection)
);

const TestimonialSection = dynamic(() =>
  import("@layout/common/testimonials-section").then(
    (mod) => mod.TestimonialSection
  )
);

const BannerSection = dynamic(() =>
  import("@layout/common/banner-section").then((mod) => mod.BannerSection)
);

const MultiIMageContentVertical = dynamic(() =>
  import("@layout/common/multi-image-content-vertical").then(
    (mod) => mod.MultiIMageContentVertical
  )
);

const StatsGrid = dynamic(() =>
  import("@layout/common/stats-grid").then((mod) => mod.StatsGrid)
);

interface Props {
  heroVideo: Video;
  heroSlides: HeroSlide[];
  aboutSection: ImageContentSectionType;
  locationSection: ImageContentSectionType;
  boatStorageSection: PageSummerySectionType;
  stats: Stat[];
  waterSportsSection: MultiImageContentBlockType;
  diningBanner: Omit<BannerType, "button">;
  eventsSection: MultiImageContentBlockType;
  testimonials: Testimonial[];
}

const Home: NextPage<Props> = ({
  heroVideo,
  heroSlides,
  aboutSection,
  locationSection,
  boatStorageSection,
  stats,
  waterSportsSection,
  diningBanner,
  eventsSection,
  testimonials,
}) => {
  return (
    <Page title="Home Page">
      <Hero video={heroVideo} slides={heroSlides} />
      <ImageContentSection
        {...aboutSection}
        button={{
          children: "About The Marina",
          route: "/about",
          intent: "primary",
          type: "route",
          withArrow: true,
        }}
      />
      <LocationSection {...locationSection} />
      <PageSummerySection
        {...boatStorageSection}
        button={{
          children: "About The Marina",
          route: "/about",
          intent: "primary",
          type: "route",
          withArrow: true,
        }}
      />
      <MultiIMageContentVertical
        {...waterSportsSection}
        button={{
          children: "Explore Water Sports",
          route: "/water-sports",
          intent: "primary",
          type: "route",
          withArrow: true,
        }}
      />
      <StatsGrid stats={stats} />
      <BannerSection
        {...diningBanner}
        button={{
          children: "Explore The Restaurant",
          route: "/restaurant",
          intent: "primary",
          type: "route",
          solid: true,
          withArrow: true,
        }}
      />
      <MultiImageHorizontal
        {...eventsSection}
        button={{
          children: "Explore Events",
          route: "/events",
          intent: "primary",
          type: "route",
          withArrow: true,
        }}
      />

      <TestimonialSection testimonials={testimonials} />
      <NewsletterSection trim />
      <ContactFormSection />
    </Page>
  );
};

const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const heroVideo = await getVideoBlock("4j0keJ4b1W4R0ZLmpfXQxX");

  const heroSlides = await getHeroSlides();

  const aboutSection = await getImageContentBlock("vtzVqu4ar9WM8ztkaXeDD");
  const boatStorageSection = await getPageSummeryBlock(
    "76ESyIGEPU40V57T7MeHYw"
  );
  const locationSection = await getImageContentBlock("7aMH2kvF0qY1iHlOUJY1iu");

  const stats = await getStats("berthing-values", 3);

  const waterSportsSection = await getMultiImageContentBlock(
    "1TdqoQoGUbfoy8xJ36Oymr"
  );

  const diningBanner = await getBannerBlock("6z4iVnl6j0QCU39LXgXGQa");

  const eventsSection = await getMultiImageContentBlock(
    "42JacW2uUz3yzm5IigC5zL"
  );

  const testimonials = await getTestimonials();
  return {
    props: {
      heroVideo,
      heroSlides,
      aboutSection,
      locationSection,
      boatStorageSection,
      stats,
      diningBanner,
      waterSportsSection,
      eventsSection,
      testimonials,
    },
  };
};

export { getStaticProps };
export default Home;
