import { NewsletterSection } from "@layout/common/newsletter-section";
import Page from "@layout/common/page";
import { ContactForm } from "@layout/contact-page/contact-form";
import { MapsSection } from "@layout/contact-page/map-section";

import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import type { ImageContentSectionType } from "@layout/common/image-content-section";
import { getImageContentBlock } from "@cms/content-studio";
import { ContactDetailsSection } from "@layout/contact-page/contact-details";

interface Props {
  contactFormSection: ImageContentSectionType;
}

const ContactPage: NextPage<Props> = ({ contactFormSection }): JSX.Element => {
  return (
    <Page title="Contact">
      <MapsSection />
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

  return {
    props: {
      contactFormSection,
    },
  };
};

export { getStaticProps };
export default ContactPage;
