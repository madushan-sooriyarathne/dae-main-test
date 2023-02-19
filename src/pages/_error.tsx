import type { NextPage, NextPageContext } from "next";

import Page from "@layout/common/page";
import ErrorView from "@layout/error-page/error-view";

interface Props {
  statusCode: 404 | 500;
}

const Error: NextPage<Props> = ({ statusCode }: Props): JSX.Element => {
  return (
    <Page title={`${statusCode}`}>
      <ErrorView errorCode={statusCode} />
    </Page>
  );
};

Error.getInitialProps = (context: NextPageContext): Props => {
  const { res } = context;

  const statusCode = res ? (res.statusCode === 404 ? 404 : 500) : 404;

  return {
    statusCode,
  };
};

export default Error;
