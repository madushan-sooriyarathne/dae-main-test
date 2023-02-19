import { type NextPage } from "next";

import Page from "@layout/common/page";
import { MarinaJoinForm } from "@layout/join-page/marina-join-form";

const ReservationsPage: NextPage = (): JSX.Element => {
  return (
    <Page title="Join to Marina Club">
      <MarinaJoinForm />
    </Page>
  );
};

export default ReservationsPage;
