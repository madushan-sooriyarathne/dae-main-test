import dynamic from "next/dynamic";

import {
  getBannerBlock,
  getImageContentBlock,
  getMultiImageContentBlock,
  getStats,
  getTestimonials,
} from "@cms/content-studio";

import Page from "@layout/common/page";
import { Hero } from "@layout/homepage/hero";
import { LocationSection } from "@layout/homepage/location-section";

import type { BannerType } from "@layout/common/banner-section";
import type { ImageContentSectionType } from "@layout/common/image-content-section";
import type { MultiImageContentSectionType } from "@layout/common/multi-image-content-horizontal";
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
  aboutSection: ImageContentSectionType;
  locationSection: ImageContentSectionType;
  boatStorageSection: ImageContentSectionType;
  stats: Stat[];
  waterSportsSection: MultiImageContentSectionType;
  diningBanner: Omit<BannerType, "button">;
  testimonials: Testimonial[];
}

const Home: NextPage<Props> = ({
  aboutSection,
  locationSection,
  boatStorageSection,
  stats,
  waterSportsSection,
  diningBanner,
  testimonials,
}) => {
  return (
    <Page title="Home Page">
      <Hero
        video={{
          files: [
            {
              src: "/assets/video/hero-sample.mp4",
              type: "video/mp4",
              id: "mp4",
            },
          ],
          fallbackImage: {
            src: "https://picsum.photos/1920/1080",
            alt: "",
            blurUrl: "",
          },
        }}
        slides={[]}
      />
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
          children: "Explore Water Sports",
          route: "/water-sports",
          intent: "primary",
          type: "route",
          withArrow: true,
        }}
      />
      <MultiImageHorizontal
        {...waterSportsSection}
        button={{
          children: "Explore Water Sports",
          route: "/water-sports",
          intent: "primary",
          type: "route",
          withArrow: true,
        }}
      />

      <TestimonialSection testimonials={testimonials} />
      <NewsletterSection />
      <ContactFormSection />
    </Page>
  );
};

const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const aboutSection = await getImageContentBlock("vtzVqu4ar9WM8ztkaXeDD");
  const boatStorageSection = await getImageContentBlock(
    "673ys7tUS6UwcmbCceSMJl"
  );
  const locationSection = await getImageContentBlock("7aMH2kvF0qY1iHlOUJY1iu");

  const stats = await getStats("berthing-values", 3);

  const waterSportsSection = await getMultiImageContentBlock(
    "1TdqoQoGUbfoy8xJ36Oymr"
  );

  const diningBanner = await getBannerBlock("6z4iVnl6j0QCU39LXgXGQa");

  const testimonials = await getTestimonials();
  return {
    props: {
      aboutSection,
      locationSection,
      boatStorageSection,
      stats,
      diningBanner,
      waterSportsSection,
      testimonials,
    },
  };
};

export { getStaticProps };
export default Home;
