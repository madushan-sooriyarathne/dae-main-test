import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

import { getLegalDocument } from "@cms/content-studio";

import Page from "@layout/common/page";
import { LegalPageContent } from "@layout/legal-page/legal-page-content";
import { LegalPageHeader } from "@layout/legal-page/legal-page-header";

interface Props {
  termsOfUse: LegalDocumentType;
}

const TermsOfUsePage: NextPage<Props> = ({
  termsOfUse,
}: Props): JSX.Element => {
  return (
    <Page title="Privacy Policy">
      <LegalPageHeader title={termsOfUse.title} date={termsOfUse.date} />
      <LegalPageContent content={termsOfUse.content} />
    </Page>
  );
};

const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const termsOfUse = await getLegalDocument("26yTQzBb0thh6AZfolYn65");

  return {
    props: {
      termsOfUse,
    },
  };
};

export { getStaticProps };

export default TermsOfUsePage;
