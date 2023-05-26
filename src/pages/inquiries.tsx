import { type NextPage } from "next";

import Page from "@layout/common/page";
import { ReservationContainer } from "@layout/inquiries-page/booking-container";

const InquiriesPage: NextPage = (): JSX.Element => {
  return (
    <Page title="Inquiries">
      <ReservationContainer />
    </Page>
  );
};

export default InquiriesPage;
