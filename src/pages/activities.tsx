import {
  getPageHeaderBlock,
  getPageSummeryBlock,
  getCardBlockGroup,
  getTextContentBlock,
  getStats,
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

interface Props {
  header: PageHeaderType;
  pageSummery: PageSummerySectionType;
  activitiesPerks: Stat[];
  activitiesRangeSection: ContentGroupType;
  activitiesRange: CardBlockType[];
}

const WaterActivitiesPage: NextPage<Props> = ({
  header,
  pageSummery,
  activitiesPerks,
  activitiesRangeSection,
  activitiesRange,
}: Props): JSX.Element => {
  return (
    <Page title="Activities">
      <PageHeader {...header} />
      <PageSummerySection {...pageSummery} />
      <StatsGrid stats={activitiesPerks} />
      <MultiItemSection {...activitiesRangeSection}>
        {activitiesRange.map((facility, index) => (
          <CardBlock {...facility} key={`facility-${index}`} />
        ))}
      </MultiItemSection>
      <CTASection
        heading="Contact us today!"
        subHeading="Ready to get started?"
        button={{
          children: "Contact us",
          type: "route",
          route: "/contact",
          intent: "white",
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
  const activitiesPerks = await getStats("activities-perks", 3);

  const activitiesRangeSection = await getTextContentBlock(
    "78an3ACQgTOxV33vHMW0zY"
  );
  const activitiesRange = await getCardBlockGroup("activity-types", 4);

  return {
    props: {
      header,
      pageSummery,
      activitiesPerks,
      activitiesRangeSection,
      activitiesRange,
    },
  };
};

export { getStaticProps };
export default WaterActivitiesPage;
