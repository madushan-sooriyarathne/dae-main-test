import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

import {
  getCompanyValues,
  getJobPosts,
  getPageHeaderBlock,
  getTextContentBlock,
} from "@cms/content-studio";

import { CompanyValueSection } from "@layout/careers-page/company-value-section";
import { LatestOpenings } from "@layout/careers-page/latest-openings";
import { PageIntroSection } from "@layout/careers-page/page-intro-section";
import type { ContentGroupType } from "@layout/common/groups/content-group";
import Page from "@layout/common/page";
import { PageHeader, type PageHeaderType } from "@layout/common/page-header";

import { BottomSpacer } from "@components/bottom-spacer";

interface Props {
  pageHeader: PageHeaderType;
  pageIntro: ContentGroupType;
  companyValues: CompanyValue[];
  jobPosts: JobPost[];
}

const CareersPage: NextPage<Props> = ({
  pageHeader,
  pageIntro,
  companyValues,
  jobPosts,
}: Props): JSX.Element => {
  return (
    <Page title="Careers">
      <PageHeader {...pageHeader} />
      <PageIntroSection {...pageIntro} />
      <CompanyValueSection values={companyValues} />
      <LatestOpenings openings={jobPosts} />
      <BottomSpacer />
    </Page>
  );
};

const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const pageHeader = await getPageHeaderBlock("3hGi4Ep99cpbAvf9oCCpgH");
  const pageIntro = await getTextContentBlock("4JQ02j7QeZUsTOstViOZ2X");
  const companyValues = await getCompanyValues(3);
  const jobPosts = await getJobPosts();

  return {
    props: {
      pageHeader,
      pageIntro,
      companyValues,
      jobPosts,
    },
  };
};

export { getStaticProps };
export default CareersPage;
