import {
  getFAQGroup,
  getImageContentBlock,
  getMultiImageContentBlock,
  getPageHeaderBlock,
  getPageSummeryBlock,
  getStats,
  getTestimonials,
} from "@cms/content-studio";

import { FAQSection } from "@layout/common/faq-section";
import { ImageContentSection } from "@layout/common/image-content-section";
import { MultiIMageContentVertical } from "@layout/common/multi-image-content-vertical";
import { NewsletterSection } from "@layout/common/newsletter-section";
import Page from "@layout/common/page";
import { PageHeader } from "@layout/common/page-header";
import { PageSummerySection } from "@layout/common/page-summery-section";
import { StatsGrid } from "@layout/common/stats-grid";
import { TestimonialSection } from "@layout/common/testimonials-section";

import type { ImageContentSectionType } from "@layout/common/image-content-section";
import type { PageHeaderType } from "@layout/common/page-header";
import type { PageSummerySectionType } from "@layout/common/page-summery-section";
import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { CTASection } from "@layout/common/cta-section";

interface Props {
  header: PageHeaderType;
  pageSummery: PageSummerySectionType;
  lifestyleSection: MultiImageContentBlockType;
  membershipBenefits: ImageContentSectionType;
  membershipPerks: Stat[];
  membershipFAQs: FAQ[];
  testimonials: Testimonial[];
}

const AboutPage: NextPage<Props> = ({
  header,
  pageSummery,
  lifestyleSection,
  membershipBenefits,
  membershipPerks,
  membershipFAQs,
  testimonials,
}: Props): JSX.Element => {
  return (
    <Page title="Membership">
      <PageHeader {...header} />
      <PageSummerySection {...pageSummery} />
      <MultiIMageContentVertical {...lifestyleSection} />
      <ImageContentSection {...membershipBenefits} withBg />
      <StatsGrid stats={membershipPerks} className="-mt-10 4xl:-mt-20" />
      <TestimonialSection testimonials={testimonials} />
      <FAQSection faqs={membershipFAQs} />
      <CTASection
        heading="Get your membership today!"
        subHeading="Ready to join?"
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
  const header = await getPageHeaderBlock("7n5aipQ9O2BSEPF3nYvdd");
  const pageSummery = await getPageSummeryBlock("5p3FcwgVIJJRzjFqx4rnQV");
  const lifestyleSection = await getMultiImageContentBlock(
    "0luWftpefbjFTnYPaJjAx"
  );
  const membershipBenefits = await getImageContentBlock(
    "363hLOPFFvWY8bKxt0lOGG"
  );

  const membershipPerks = await getStats("membership-perks", 6);
  const membershipFAQs = await getFAQGroup("membership-faq", 6);

  const testimonials = await getTestimonials();

  return {
    props: {
      header,
      pageSummery,
      lifestyleSection,
      membershipBenefits,
      membershipPerks,
      membershipFAQs,
      testimonials,
    },
  };
};

export { getStaticProps };
export default AboutPage;
