import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

import {
  getImageContentBlock,
  getMultiImageContentBlock,
  getPageHeaderBlock,
  getPageSummeryBlock,
} from "@cms/content-studio";

import { MultiIMageContentVertical } from "@layout/common/multi-image-content-vertical";
import { NewsletterSection } from "@layout/common/newsletter-section";
import Page from "@layout/common/page";
import { PageHeader } from "@layout/common/page-header";
import { PageSummerySection } from "@layout/common/page-summery-section";
import type { PageHeaderType } from "@layout/common/page-header";
import type { PageSummerySectionType } from "@layout/common/page-summery-section";
import { CTASection } from "@layout/common/cta-section";
import { MultiImageHorizontal } from "@layout/common/multi-image-content-horizontal";
import {
  ImageContentSection,
  type ImageContentSectionType,
} from "@layout/common/image-content-section";

interface Props {
  header: PageHeaderType;
  eventsIntro: MultiImageContentBlockType;
  corporateEventsSection: ImageContentSectionType;
  privateEventsSection: MultiImageContentBlockType;
  eventsByDAESection: PageSummerySectionType;
}

const EventsPage: NextPage<Props> = ({
  header,
  eventsIntro,
  corporateEventsSection,
  privateEventsSection,
  eventsByDAESection,
}: Props): JSX.Element => {
  return (
    <Page title="Events">
      <PageHeader {...header} />
      <MultiIMageContentVertical {...eventsIntro} />
      <ImageContentSection {...corporateEventsSection} />
      <MultiImageHorizontal {...privateEventsSection} />
      <PageSummerySection {...eventsByDAESection} />
      <CTASection
        heading="Ready to set sail?"
        subHeading="Celebrate your next special occasion at the lake."
        button={{
          children: "Reserve Now",
          route: "/reservations?type=events",
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
  const header = await getPageHeaderBlock("6ux5DFx7sXZU7fnQBR5oR7");
  const eventsIntro = await getMultiImageContentBlock("5bFo1y4HIbofMn3SJFkGeR");
  const corporateEventsSection = await getImageContentBlock(
    "4EnWIJflad8VO0YWEtZfS7"
  );
  const privateEventsSection = await getMultiImageContentBlock(
    "3Cv8EIlCQXw7A1ZSKoM6ov"
  );
  const eventsByDAESection = await getPageSummeryBlock(
    "5KMd0qIjZnksRCDJnrR9Zl"
  );

  return {
    props: {
      header,
      eventsIntro,
      corporateEventsSection,
      privateEventsSection,
      eventsByDAESection,
    },
  };
};

export { getStaticProps };
export default EventsPage;
