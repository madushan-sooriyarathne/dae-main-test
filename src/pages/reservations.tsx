import { type NextPage } from "next";

import Page from "@layout/common/page";
import { ReservationContainer } from "@layout/reservations-page/booking-container";

const ReservationsPage: NextPage = (): JSX.Element => {
  return (
    <Page title="Reservations">
      <ReservationContainer />
    </Page>
  );
};

export default ReservationsPage;
