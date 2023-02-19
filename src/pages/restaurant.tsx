import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

import {
  getFAQGroup,
  getImageContentBlock,
  getMultiImageContentBlock,
  getPageHeaderBlock,
} from "@cms/content-studio";

import { CTASection } from "@layout/common/cta-section";
import { FAQSection } from "@layout/common/faq-section";
import {
  ImageContentSection,
  type ImageContentSectionType,
} from "@layout/common/image-content-section";
import { MultiIMageContentVertical } from "@layout/common/multi-image-content-vertical";
import { NewsletterSection } from "@layout/common/newsletter-section";
import Page from "@layout/common/page";
import { PageHeader, type PageHeaderType } from "@layout/common/page-header";

interface Props {
  header: PageHeaderType;
  restaurantExperienceSection: MultiImageContentBlockType;
  diningSection: ImageContentSectionType;
  diningFAQs: FAQ[];
}

const RestaurantPage: NextPage<Props> = ({
  header,
  restaurantExperienceSection,
  diningSection,
  diningFAQs,
}: Props): JSX.Element => {
  return (
    <Page title="Restaurant">
      <PageHeader {...header} />
      <MultiIMageContentVertical {...restaurantExperienceSection} />
      <ImageContentSection {...diningSection} withBg />
      <FAQSection faqs={diningFAQs} />

      <CTASection
        heading="Reserve your table now!"
        subHeading="Reserve in advance to secure your table"
        button={{
          children: "Join Now",
          route: "/join",
          type: "route",
          intent: "primary",
        }}
      />
      <NewsletterSection />
    </Page>
  );
};

const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const header = await getPageHeaderBlock("6xXDArzkaQW9NYcKlE0lmC");
  const restaurantExperienceSection = await getMultiImageContentBlock(
    "1la64ggvW165MuVn6RAUdC"
  );
  const diningSection = await getImageContentBlock("3dYgdOcFxmaeBdTMag8GHv");
  const diningFAQs = await getFAQGroup("dining-faq");

  return {
    props: {
      header,
      restaurantExperienceSection,
      diningSection,
      diningFAQs,
    },
  };
};

export { getStaticProps };
export default RestaurantPage;
