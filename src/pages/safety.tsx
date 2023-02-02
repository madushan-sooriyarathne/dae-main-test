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
import { type MultiImageContentSectionType } from "@layout/common/multi-image-content-horizontal";
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
  marinaSafetySection: MultiImageContentSectionType;
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
  const header = await getPageHeaderBlock("");
  const pageSummery = await getPageSummeryBlock("");
  const marinaSafetySection = await getMultiImageContentBlock("");
  const safetyTrainingSection = await getImageContentBlock("");

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
