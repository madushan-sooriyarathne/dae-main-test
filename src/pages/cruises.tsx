import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

import {
  getBannerBlock,
  getImageContentBlock,
  getMultiImageContentBlock,
  getPageHeaderBlock,
  getPageSummeryBlock,
  getStats,
} from "@cms/content-studio";

import { BannerSection, type BannerType } from "@layout/common/banner-section";
import { CTASection } from "@layout/common/cta-section";
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

interface Props {
  header: PageHeaderType;
  pageSummery: PageSummerySectionType;
  morningCruises: BannerType;
  sunsetCruises: MultiImageContentBlockType;
  overnightCruises: ImageContentSectionType;
  cruisesHighlights: Stat[];
}

const CruisesPage: NextPage<Props> = ({
  header,
  pageSummery,
  morningCruises,
  sunsetCruises,
  overnightCruises,
  cruisesHighlights,
}: Props): JSX.Element => {
  return (
    <Page title="Cruises">
      <PageHeader {...header} />
      <PageSummerySection {...pageSummery} />
      <BannerSection
        {...morningCruises}
        button={{
          children: "Reserve a Morning Cruise",
          route: "/reservation?type=cruises&mode=morning-cruise",
          type: "route",
          intent: "white",
          withArrow: true,
        }}
      />
      <MultiImageHorizontal
        {...sunsetCruises}
        button={{
          children: "Reserve a Sunset Cruise",
          route: "/reservation?type=cruises&mode=sunset-cruise",
          type: "route",
          intent: "primary",
          withArrow: true,
        }}
      />
      <ImageContentSection
        {...overnightCruises}
        withBg
        button={{
          children: "Reserve a Overnight Stay",
          route: "/reservation?type=cruises&mode=overnight stay",
          type: "route",
          intent: "primary",
          withArrow: true,
        }}
      />
      <StatsGrid stats={cruisesHighlights} className="-mt-10 4xl:-mt-20" />

      <CTASection
        heading="Reserve your Cruise today!"
        subHeading="Ready to set sail?"
        button={{
          children: "Reserve",
          route: "/reservations?type=cruises",
          type: "route",
          withArrow: true,
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
  const morningCruises = await getBannerBlock("4gITeHQxttRn1xV0a5hErq");
  const sunsetCruises = await getMultiImageContentBlock(
    "0luWftpefbjFTnYPaJjAx"
  );
  const overnightCruises = await getImageContentBlock("363hLOPFFvWY8bKxt0lOGG");

  const cruisesHighlights = await getStats("cruises-highlights", 3);

  return {
    props: {
      header,
      pageSummery,
      morningCruises,
      sunsetCruises,
      overnightCruises,
      cruisesHighlights,
    },
  };
};

export { getStaticProps };
export default CruisesPage;
