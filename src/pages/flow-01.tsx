import {
  getPageHeaderBlock,
  getPageSummeryBlock,
  getCardBlockGroup,
  getTextContentBlock,
  getStats,
  getBoat,
} from "@cms/content-studio";

import { CardBlock } from "@components/card-block";
import { CTASection } from "@layout/common/cta-section";

import { MultiItemSection } from "@layout/common/multi-item-section";
import { NewsletterSection } from "@layout/common/newsletter-section";
import Page from "@layout/common/page";
import { PageHeader, type PageHeaderType } from "@layout/common/page-header";
import {
  PageSummerySection,
  type PageSummerySectionType,
} from "@layout/common/page-summery-section";
import type { CardBlockType } from "@components/card-block";
import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { type ContentGroupType } from "@layout/common/groups/content-group";
import { StatsGrid } from "@layout/common/stats-grid";
import { BoatStats } from "@layout/boat-page/boat-stats";
import { BoatFeatures } from "@layout/boat-page/boat-features";
import { VideoSection } from "@layout/boat-page/video-section";

interface Props {
  header: PageHeaderType;
  pageSummery: PageSummerySectionType;
  boatStats: Boat;
  activitiesPerks: Stat[];
  activitiesRangeSection: ContentGroupType;
  activitiesRange: CardBlockType[];
}

const FlowOne: NextPage<Props> = ({
  header,
  pageSummery,
  boatStats,
  activitiesPerks,
  activitiesRangeSection,
  activitiesRange,
}: Props): JSX.Element => {
  return (
    <Page title="Flow 01">
      <PageHeader {...header} />
      {/* Booking Widget */}
      <PageSummerySection {...pageSummery} />
      <BoatStats
        length={boatStats.length}
        cabins={boatStats.noOfCabins}
        crew={boatStats.noOfCabins}
        guestsEvents={boatStats.guestsEvents}
        guestsStay={boatStats.guestsStay}
      />
      <BoatFeatures
        coverImage={boatStats.coverImage}
        features={boatStats.features}
      />
      {/* Cruises Section */}
      {/* Boat Options Tab Section */}
      {/* Video */}
      {boatStats.video && <VideoSection video={boatStats.video} />}
      {/* Gallery */}
      {/* <StatsGrid stats={activitiesPerks} />
      <MultiItemSection {...activitiesRangeSection}>
        {activitiesRange.map((facility, index) => (
          <CardBlock {...facility} key={`facility-${index}`} />
        ))}
      </MultiItemSection> */}
      <CTASection
        heading="Ready to set sail?"
        subHeading="Reserve your cruise today!"
        button={{
          children: "Reservations",
          type: "route",
          route: "/reserve",
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
  const header = await getPageHeaderBlock("1AypTwu98NQpEMvR5SvWRC");
  const pageSummery = await getPageSummeryBlock("2HMuY5gy1jlaxrCM1zPYFT");
  const boatStats = await getBoat("1VSYkSWkBlCTYCgWJ1Uf2D");
  const activitiesPerks = await getStats("activities-perks", 3);

  const activitiesRangeSection = await getTextContentBlock(
    "78an3ACQgTOxV33vHMW0zY"
  );
  const activitiesRange = await getCardBlockGroup("activity-types", 4);

  return {
    props: {
      header,
      pageSummery,
      boatStats,
      activitiesPerks,
      activitiesRangeSection,
      activitiesRange,
    },
  };
};

export { getStaticProps };
export default FlowOne;
