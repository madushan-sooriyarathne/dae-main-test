import dynamic from "next/dynamic";

import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

import {
  getBannerBlock,
  getBannerCardBlocks,
  getHeroSlides,
  getImageContentBlock,
  getMultiImageContentBlock,
  getOffers,
  getTestimonials,
  getTextContentBlock,
  getVideoBlock,
} from "@cms/content-studio";

import type { BannerType } from "@layout/common/banner-section";
import type { ContentGroupType } from "@layout/common/groups/content-group";
import type { ImageContentSectionType } from "@layout/common/image-content-section";
import { OptionsGrid } from "@layout/common/options-grid";
import Page from "@layout/common/page";
import { Hero } from "@layout/homepage/hero";

import type { BannerCardType } from "@components/banner-card";

const ImageContentSection = dynamic(() =>
  import("@layout/common/image-content-section").then(
    (mod) => mod.ImageContentSection
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

const OffersCarousel = dynamic(() =>
  import("@layout/homepage/offers-carousel").then((mod) => mod.OffersCarousel)
);

interface Props {
  heroVideo: Video;
  boatOptions: Omit<BannerCardType, "button">[];
  heroSlides: HeroSlide[];
  accommodationSection: ImageContentSectionType;
  cruisesSection: MultiImageContentBlockType;
  eventsSection: Omit<BannerType, "button">;
  offers: Offer[];
  offersSection: ContentGroupType;
  testimonials: Testimonial[];
}

const Home: NextPage<Props> = ({
  heroVideo,
  heroSlides,
  boatOptions,
  accommodationSection,
  cruisesSection,
  eventsSection,
  offers,
  offersSection,
  testimonials,
}) => {
  return (
    <Page title="Home Page">
      <Hero video={heroVideo} slides={heroSlides} />
      <OptionsGrid
        options={boatOptions.map((option) => ({
          ...option,
          button: {
            children: `Explore ${option.heading}`,
            type: "route",
            intent: "white",
            route: `/${option.id}`,
            withArrow: true,
          },
        }))}
      />
      <MultiIMageContentVertical
        {...cruisesSection}
        button={{
          children: "Explore Cruises",
          route: "/cruises",
          intent: "primary",
          type: "route",
          withArrow: true,
        }}
      />

      <ImageContentSection {...accommodationSection} />
      <BannerSection
        {...eventsSection}
        button={{
          children: "Explore The Restaurant",
          route: "/restaurant",
          intent: "primary",
          type: "route",
          solid: true,
          withArrow: true,
        }}
      />

      <OffersCarousel offers={offers} {...offersSection} />

      <TestimonialSection testimonials={testimonials} />
      {/* TODO: Insta Feed  */}
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

  const boatOptions = await getBannerCardBlocks("boat-options");

  const accommodationSection = await getImageContentBlock(
    "vtzVqu4ar9WM8ztkaXeDD"
  );

  const cruisesSection = await getMultiImageContentBlock(
    "1TdqoQoGUbfoy8xJ36Oymr"
  );

  const eventsSection = await getBannerBlock("6z4iVnl6j0QCU39LXgXGQa");

  const offersSection = await getTextContentBlock("6Ma30q1FXp0PkspE7OITES");

  const offers = await getOffers();

  const testimonials = await getTestimonials();
  return {
    props: {
      heroVideo,
      heroSlides,
      boatOptions,
      accommodationSection,
      eventsSection,
      cruisesSection,
      offers,
      offersSection,
      testimonials,
    },
  };
};

export { getStaticProps };
export default Home;
