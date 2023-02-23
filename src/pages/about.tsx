import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

import {
  getArticles,
  getImageContentBlock,
  getMultiImageContentBlock,
  getPageHeaderBlock,
  getPageSummeryBlock,
} from "@cms/content-studio";

import { SpecialtiesSection } from "@layout/about-page/specialties-section";
import {
  ImageContentSection,
  type ImageContentSectionType,
} from "@layout/common/image-content-section";
import { MultiIMageContentVertical } from "@layout/common/multi-image-content-vertical";
import { NewsletterSection } from "@layout/common/newsletter-section";
import { OtherArticlesGrid } from "@layout/common/other-articles-grid";
import Page from "@layout/common/page";
import { PageHeader, type PageHeaderType } from "@layout/common/page-header";
import {
  PageSummerySection,
  type PageSummerySectionType,
} from "@layout/common/page-summery-section";

interface Props {
  header: PageHeaderType;
  pageSummery: PageSummerySectionType;
  lifestyleSection: ImageContentSectionType;
  historySection: MultiImageContentBlockType;
  sustainabilitySection: ImageContentSectionType;
  latestArticles: Article[];
}

const AboutPage: NextPage<Props> = ({
  header,
  pageSummery,
  lifestyleSection,
  historySection,
  sustainabilitySection,
  latestArticles,
}: Props): JSX.Element => {
  return (
    <Page title="About D.A.E">
      <PageHeader {...header} />
      <PageSummerySection {...pageSummery} />
      <ImageContentSection {...lifestyleSection} withBg />
      <MultiIMageContentVertical {...historySection} />
      <SpecialtiesSection />
      <ImageContentSection {...sustainabilitySection} />
      <OtherArticlesGrid
        articles={latestArticles}
        heading="Latest News & Stories"
        subHeading="From the press"
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

  const lifestyleSection = await getImageContentBlock("7aMH2kvF0qY1iHlOUJY1iu");

  const historySection = await getMultiImageContentBlock(
    "42JacW2uUz3yzm5IigC5zL"
  );

  const sustainabilitySection = await getImageContentBlock(
    "72uyt5q1K3xzus2kfpinve"
  );

  const latestArticles = await getArticles(3);

  return {
    props: {
      header,
      pageSummery,
      lifestyleSection,
      historySection,
      sustainabilitySection,
      latestArticles,
    },
  };
};

export { getStaticProps };
export default AboutPage;
