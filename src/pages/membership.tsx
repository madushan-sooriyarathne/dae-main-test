import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

import {
  getFAQGroup,
  getImageContentBlock,
  getMultiImageContentBlock,
  getPageHeaderBlock,
  getPageSummeryBlock,
  getStats,
  getVideoBlock,
} from "@cms/content-studio";

import { CTASection } from "@layout/common/cta-section";
import { FAQSection } from "@layout/common/faq-section";
import {
  ImageContentSection,
  type ImageContentSectionType,
} from "@layout/common/image-content-section";
import { MultiImageHorizontal } from "@layout/common/multi-image-content-horizontal";
import { NewsletterSection } from "@layout/common/newsletter-section";
import Page from "@layout/common/page";
import { PageHeader, type PageHeaderType } from "@layout/common/page-header";
import {
  PageSummerySection,
  type PageSummerySectionType,
} from "@layout/common/page-summery-section";
import { StatsGrid } from "@layout/common/stats-grid";
import { VideoSection } from "@layout/common/video-section";

interface Props {
  header: PageHeaderType;
  pageSummery: PageSummerySectionType;
  video: Video;
  membershipIntroSection: MultiImageContentBlockType;
  membershipPerksSection: ImageContentSectionType;
  membershipPerks: Stat[];
  membershipFAQs: FAQ[];
}

const FlowOne: NextPage<Props> = ({
  header,
  pageSummery,
  video,
  membershipIntroSection,
  membershipPerksSection,
  membershipPerks,
  membershipFAQs,
}: Props): JSX.Element => {
  return (
    <Page title="Explorers Collective">
      <PageHeader {...header} />
      <PageSummerySection
        {...pageSummery}
        button={{
          type: "route",
          route: "/join",
          children: "Join Explorer's Collective",
          withArrow: true,
          intent: "primary",
        }}
      />
      <VideoSection video={video} />
      <MultiImageHorizontal
        {...membershipIntroSection}
        button={{
          type: "route",
          route: "/join",
          children: "Join Explorer's Collective",
          withArrow: true,
          intent: "primary",
        }}
      />
      <ImageContentSection {...membershipPerksSection} />
      <StatsGrid stats={membershipPerks} />
      <CTASection
        heading="Join Explorer’s Collective today!"
        subHeading="Ready to join?"
        button={{
          children: "Apply Now",
          type: "route",
          route: "/join",
          intent: "primary",
        }}
      />
      <FAQSection faqs={membershipFAQs} />
      <NewsletterSection />
    </Page>
  );
};

const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const header = await getPageHeaderBlock("4psAM0yC3ESZFtW1i2EJrR");
  const pageSummery = await getPageSummeryBlock("2Vs1TMbwaNTDVAa5pu8Heo");
  const video = await getVideoBlock("7qhvNfQIzCkbZrcKbmCDLk");

  const membershipIntroSection = await getMultiImageContentBlock(
    "6i7o3Tcic2wotJjsKJFlFs"
  );
  const membershipPerksSection = await getImageContentBlock(
    "1t7mRB3hnNnHAeHxDpFDJr"
  );

  const membershipPerks = await getStats("membership-perks", 6);

  const membershipFAQs = await getFAQGroup("membership-faq");

  return {
    props: {
      header,
      pageSummery,
      video,
      membershipIntroSection,
      membershipPerksSection,
      membershipPerks,
      membershipFAQs,
    },
  };
};

export { getStaticProps };
export default FlowOne;
