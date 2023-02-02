import {
  getImageContentBlock,
  getMultiImageContentBlock,
  getPageHeaderBlock,
  getPageSummeryBlock,
} from "@cms/content-studio";
import {
  ImageContentSection,
  type ImageContentSectionType,
} from "@layout/common/image-content-section";
import { MultiIMageContentVertical } from "@layout/common/multi-image-content-vertical";
import { NewsletterSection } from "@layout/common/newsletter-section";
import Page from "@layout/common/page";
import { PageHeader, type PageHeaderType } from "@layout/common/page-header";
import {
  PageSummerySection,
  type PageSummerySectionType,
} from "@layout/common/page-summery-section";
import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

interface Props {
  header: PageHeaderType;
  pageSummery: PageSummerySectionType;
  marinaSafetySection: MultiImageContentBlockType;
  safetyTrainingSection: ImageContentSectionType;
}

const SafetyPage: NextPage<Props> = ({
  header,
  pageSummery,
  marinaSafetySection,
  safetyTrainingSection,
}: Props): JSX.Element => {
  return (
    <Page title="Safety">
      <PageHeader {...header} />
      <PageSummerySection {...pageSummery} />
      <MultiIMageContentVertical {...marinaSafetySection} />
      <ImageContentSection {...safetyTrainingSection} />
      <NewsletterSection />
    </Page>
  );
};

const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const header = await getPageHeaderBlock("3hGi4Ep99cpbAvf9oCCpgH");
  const pageSummery = await getPageSummeryBlock("6lQy9IzvDxZA3rpO0FCe3Q");
  const marinaSafetySection = await getMultiImageContentBlock(
    "2QRYVhf7ltI6pMoCywdzRl"
  );
  const safetyTrainingSection = await getImageContentBlock(
    "2oH0fTYIuTwdMOgb8Z2Sg1"
  );

  return {
    props: {
      header,
      pageSummery,
      marinaSafetySection,
      safetyTrainingSection,
    },
  };
};

export { getStaticProps };
export default SafetyPage;
