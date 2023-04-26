import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

import { getLegalDocument } from "@cms/content-studio";

import Page from "@layout/common/page";
import { LegalPageContent } from "@layout/legal-page/legal-page-content";
import { LegalPageHeader } from "@layout/legal-page/legal-page-header";

interface Props {
  termsAndConditions: LegalDocumentType;
}

const TermsAndConditionsPage: NextPage<Props> = ({
  termsAndConditions,
}: Props): JSX.Element => {
  return (
    <Page title="Privacy Policy">
      <LegalPageHeader
        title={termsAndConditions.title}
        date={termsAndConditions.date}
      />
      <LegalPageContent content={termsAndConditions.content} />
    </Page>
  );
};

const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const termsAndConditions = await getLegalDocument("18uzHcvIllEObPW5qfLQtz");

  return {
    props: {
      termsAndConditions,
    },
  };
};

export { getStaticProps };

export default TermsAndConditionsPage;
