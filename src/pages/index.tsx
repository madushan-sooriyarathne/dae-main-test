import {
  type ImageContentSectionType,
  ImageContentSection,
} from "@layout/common/image-content-section";
import Page from "@layout/common/page";
import PageSummerySection from "@layout/common/page-summery-section";
import { Hero } from "@layout/homepage/hero";
import {
  getImageContentBlock,
  getMultiImageContentBlock,
  getTestimonials,
} from "@cms/content-studio";
import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import {
  type MultiImageContentSectionType,
  MultiImageHorizontal,
} from "@layout/common/multi-image-content-horizontal";
// import { TestimonialSection } from "@layout/homepage/testimonials-section";

interface Props {
  aboutSection: ImageContentSectionType;
  boatStorageSection: ImageContentSectionType;
  waterSportsSection: MultiImageContentSectionType;
  testimonials: Testimonial[];
}

const Home: NextPage<Props> = ({
  aboutSection,
  boatStorageSection,
  waterSportsSection,
  testimonials,
}) => {
  return (
    <Page title="Home Page">
      <Hero
        video={{
          files: [
            {
              src: "http://localhost:3000/assets/video/hero-sample.mp4",
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
      {/* <TestimonialSection testimonials={testimonials} /> */}
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
  const waterSportsSection = await getMultiImageContentBlock(
    "1TdqoQoGUbfoy8xJ36Oymr"
  );

  const testimonials = await getTestimonials();
  return {
    props: {
      aboutSection,
      boatStorageSection,
      waterSportsSection,
      testimonials,
    },
  };
};

export { getStaticProps };
export default Home;
