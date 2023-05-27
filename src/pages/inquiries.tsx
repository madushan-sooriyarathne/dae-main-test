import { type NextPage } from "next";

import Page from "@layout/common/page";
import { InquiryContainer } from "@layout/inquiries-page/booking-container";

const InquiriesPage: NextPage = (): JSX.Element => {
  return (
    <Page title="Inquiries">
      <InquiryContainer />
    </Page>
  );
};

export default InquiriesPage;
