import Page from "@layout/common/page";
import { MapsSection } from "@layout/contact-page/map-section";
import type { NextPage } from "next";

const ContactPage: NextPage = (): JSX.Element => {
  return (
    <Page title="Contact">
      <MapsSection />
    </Page>
  );
};

export default ContactPage;
