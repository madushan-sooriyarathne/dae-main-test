import {
  getOffers,
  getPageHeaderBlock,
  getPageSummeryBlock,
} from "@cms/content-studio";

import { NewsletterSection } from "@layout/common/newsletter-section";
import Page from "@layout/common/page";
import { PageHeader } from "@layout/common/page-header";
import { PageSummerySection } from "@layout/common/page-summery-section";
import { CTASection } from "@layout/common/cta-section";

import type { PageHeaderType } from "@layout/common/page-header";
import type { PageSummerySectionType } from "@layout/common/page-summery-section";
import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import { OfferCard } from "@layout/offers-page/offer-card";

interface Props {
  header: PageHeaderType;
  pageSummery: PageSummerySectionType;
  offers: Offer[];
}

const OffersPage: NextPage<Props> = ({
  header,
  pageSummery,
  offers,
}: Props): JSX.Element => {
  return (
    <Page title="Membership">
      <PageHeader {...header} />
      <PageSummerySection {...pageSummery} />
      {offers.map((offer, index) => (
        <OfferCard offer={offer} key={offer.id} invert={index % 2 !== 0} />
      ))}

      <CTASection
        heading="Get your membership today!"
        subHeading="Ready to join?"
        button={{
          children: "Join Now",
          route: "/join",
          type: "route",
          intent: "primary",
        }}
      />

      <NewsletterSection />
    </Page>
  );
};

const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const header = await getPageHeaderBlock("675W8snu8BpjY6qyadCzxR");
  const pageSummery = await getPageSummeryBlock("4D4UiqwBvMBw7yX0IwGsI6");
  const offers: Offer[] = await getOffers();

  return {
    props: {
      header,
      pageSummery,
      offers,
    },
  };
};

export { getStaticProps };
export default OffersPage;
