import ErrorView from "@layout/error-page/error-view";
import Page from "@layout/common/page";

const NotFoundPage: React.FC = (): JSX.Element => {
  return (
    <Page title="Page Not Found!">
      <ErrorView errorCode={404} />
    </Page>
  );
};

export default NotFoundPage;
