import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

import {
  getBannerBlock,
  getBannerCardBlocks,
  getImageContentBlock,
  getMultiImageContentBlock,
  getPageHeaderBlock,
} from "@cms/content-studio";

import { BannerSection, type BannerType } from "@layout/common/banner-section";
import { CTASection } from "@layout/common/cta-section";
import {
  ImageContentSection,
  type ImageContentSectionType,
} from "@layout/common/image-content-section";
import { MultiImageHorizontal } from "@layout/common/multi-image-content-horizontal";
import { MultiIMageContentVertical } from "@layout/common/multi-image-content-vertical";
import { NewsletterSection } from "@layout/common/newsletter-section";
import { OptionsGrid } from "@layout/common/options-grid";
import Page from "@layout/common/page";
import { PageHeader, type PageHeaderType } from "@layout/common/page-header";

import type { BannerCardType } from "@components/banner-card";

interface Props {
  header: PageHeaderType;
  eventsIntro: MultiImageContentBlockType;
  eventsByYouSection: ImageContentSectionType;
  eventTypes: BannerCardType[];
  eventsForYouSection: MultiImageContentBlockType;
  featuredEvent: BannerType;
}

const EventsPage: NextPage<Props> = ({
  header,
  eventsIntro,
  eventsByYouSection,
  eventTypes,
  eventsForYouSection,
  featuredEvent,
}: Props): JSX.Element => {
  return (
    <Page title="Events">
      <PageHeader {...header} />
      <MultiIMageContentVertical {...eventsIntro} />
      <ImageContentSection {...eventsByYouSection} />
      <OptionsGrid options={eventTypes} />
      <MultiImageHorizontal {...eventsForYouSection} />
      <BannerSection {...featuredEvent} />
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
  const eventsByYouSection = await getImageContentBlock(
    "4EnWIJflad8VO0YWEtZfS7"
  );
  const eventTypes = await getBannerCardBlocks("event-types");
  const eventsForYouSection = await getMultiImageContentBlock(
    "3Cv8EIlCQXw7A1ZSKoM6ov"
  );
  const featuredEvent = await getBannerBlock("6z4iVnl6j0QCU39LXgXGQa");

  return {
    props: {
      header,
      eventsIntro,
      eventsByYouSection,
      eventTypes,
      eventsForYouSection,
      featuredEvent,
    },
  };
};

export { getStaticProps };
export default EventsPage;
