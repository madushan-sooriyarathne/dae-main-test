import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

import { getLegalDocument } from "@cms/content-studio";

import Page from "@layout/common/page";
import { LegalPageContent } from "@layout/legal-page/legal-page-content";
import { LegalPageHeader } from "@layout/legal-page/legal-page-header";

interface Props {
  privacyPolicy: LegalDocumentType;
}

const PrivacyPolicyPage: NextPage<Props> = ({
  privacyPolicy,
}: Props): JSX.Element => {
  return (
    <Page title="Privacy Policy">
      <LegalPageHeader title={privacyPolicy.title} date={privacyPolicy.date} />
      <LegalPageContent content={privacyPolicy.content} />
    </Page>
  );
};

const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const privacyPolicy = await getLegalDocument("7JWmrHAecnBwW0v3QmjRiz");

  return {
    props: {
      privacyPolicy,
    },
  };
};

export { getStaticProps };

export default PrivacyPolicyPage;
