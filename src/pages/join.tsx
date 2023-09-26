import { type NextPage } from "next";

import Page from "@layout/common/page";
import { MarinaJoinForm } from "@layout/join-page/join-form";

const ReservationsPage: NextPage = (): JSX.Element => {
  return (
    <Page title="Explorer's Collective">
      <MarinaJoinForm />
    </Page>
  );
};

export default ReservationsPage;
