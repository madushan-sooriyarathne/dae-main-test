import {
  getEventTypes,
  getMultiImageContentBlock,
  getPageHeaderBlock,
  getPageSummeryBlock,
  getStats,
} from "@cms/content-studio";

import { MultiIMageContentVertical } from "@layout/common/multi-image-content-vertical";
import { NewsletterSection } from "@layout/common/newsletter-section";
import Page from "@layout/common/page";
import { PageHeader } from "@layout/common/page-header";
import { PageSummerySection } from "@layout/common/page-summery-section";
import { StatsGrid } from "@layout/common/stats-grid";
import type { PageHeaderType } from "@layout/common/page-header";
import type { PageSummerySectionType } from "@layout/common/page-summery-section";
import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { CTASection } from "@layout/common/cta-section";
import { MultiImageHorizontal } from "@layout/common/multi-image-content-horizontal";
import EventTypesSection from "@layout/events-page/event-types-section";

interface Props {
  header: PageHeaderType;
  pageSummery: PageSummerySectionType;
  privateEventsSection: MultiImageContentBlockType;
  eventTypes: EventType[];
  eventsByDAESection: MultiImageContentBlockType;
  eventFacilities: Stat[];
}

const EventsPage: NextPage<Props> = ({
  header,
  pageSummery,
  privateEventsSection,
  eventTypes,
  eventsByDAESection,
  eventFacilities,
}: Props): JSX.Element => {
  return (
    <Page title="Events">
      <PageHeader {...header} />
      <PageSummerySection {...pageSummery} />
      <MultiImageHorizontal {...privateEventsSection} />
      <EventTypesSection eventTypes={eventTypes} />
      <MultiIMageContentVertical {...eventsByDAESection} />
      <StatsGrid stats={eventFacilities} className="-mt-10 4xl:-mt-20" />
      <CTASection
        heading="Reserve the Dates."
        subHeading="Celebrate your next special occasion with Marina."
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
  const pageSummery = await getPageSummeryBlock("5KMd0qIjZnksRCDJnrR9Zl");
  const privateEventsSection = await getMultiImageContentBlock(
    "3Cv8EIlCQXw7A1ZSKoM6ov"
  );
  const eventTypes = await getEventTypes();
  const eventsByDAESection = await getMultiImageContentBlock(
    "5bFo1y4HIbofMn3SJFkGeR"
  );

  const eventFacilities = await getStats("event-facilities", 6);

  return {
    props: {
      header,
      pageSummery,
      privateEventsSection,
      eventTypes,
      eventsByDAESection,
      eventFacilities,
    },
  };
};

export { getStaticProps };
export default EventsPage;
