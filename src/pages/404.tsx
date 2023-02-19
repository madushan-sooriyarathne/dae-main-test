import Page from "@layout/common/page";
import ErrorView from "@layout/error-page/error-view";

const NotFoundPage: React.FC = (): JSX.Element => {
  return (
    <Page title="Page Not Found!">
      <ErrorView errorCode={404} />
    </Page>
  );
};

export default NotFoundPage;
