import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

import { getImageContentBlock, getPlaces } from "@cms/content-studio";

import type { ImageContentSectionType } from "@layout/common/image-content-section";
import { NewsletterSection } from "@layout/common/newsletter-section";
import Page from "@layout/common/page";
import { ContactDetailsSection } from "@layout/contact-page/contact-details";
import { ContactForm } from "@layout/contact-page/contact-form";
import { MapsSection } from "@layout/contact-page/map-section";

interface Props {
  contactFormSection: ImageContentSectionType;
  places: Place[];
}

const ContactPage: NextPage<Props> = ({
  contactFormSection,
  places,
}): JSX.Element => {
  return (
    <Page title="Contact">
      <MapsSection places={places} />
      <ContactDetailsSection />
      <ContactForm {...contactFormSection} />
      <NewsletterSection />
    </Page>
  );
};

const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const contactFormSection = await getImageContentBlock(
    "535U91Vi0eC1iU3BU3BNK9"
  );

  const places = await getPlaces();

  return {
    props: {
      contactFormSection,
      places,
    },
  };
};

export { getStaticProps };
export default ContactPage;
