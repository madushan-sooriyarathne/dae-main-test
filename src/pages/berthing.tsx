import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

import {
  getCardBlockGroup,
  getImageContentBlock,
  getPageHeaderBlock,
  getPageSummeryBlock,
  getTextContentBlock,
} from "@cms/content-studio";

import { CTASection } from "@layout/common/cta-section";
import { type ContentGroupType } from "@layout/common/groups/content-group";
import {
  ImageContentSection,
  type ImageContentSectionType,
} from "@layout/common/image-content-section";
import { MultiItemSection } from "@layout/common/multi-item-section";
import { NewsletterSection } from "@layout/common/newsletter-section";
import Page from "@layout/common/page";
import { PageHeader, type PageHeaderType } from "@layout/common/page-header";
import {
  PageSummerySection,
  type PageSummerySectionType,
} from "@layout/common/page-summery-section";

import { CardBlock, type CardBlockType } from "@components/card-block";

interface Props {
  header: PageHeaderType;
  pageSummery: PageSummerySectionType;
  experiencedStaffSection: ImageContentSectionType;
  storageFacilitiesSection: ContentGroupType;
  storageFacilities: CardBlockType[];
}

const BerthingPage: NextPage<Props> = ({
  header,
  pageSummery,
  experiencedStaffSection,
  storageFacilitiesSection,
  storageFacilities,
}: Props): JSX.Element => {
  return (
    <Page title="Berthing">
      <PageHeader {...header} />
      <PageSummerySection {...pageSummery} />
      <ImageContentSection {...experiencedStaffSection} withBg />
      <MultiItemSection {...storageFacilitiesSection}>
        {storageFacilities.map((facility, index) => (
          <CardBlock {...facility} key={`facility-${index}`} />
        ))}
      </MultiItemSection>
      <CTASection
        heading="Contact us today!"
        subHeading="Ready to get started?"
        button={{
          children: "Contact us",
          type: "route",
          route: "/contact",
          intent: "white",
        }}
      />
      <NewsletterSection />
    </Page>
  );
};

const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const header = await getPageHeaderBlock("38SFVquyYxXg9ZnEGUk1rc");
  const pageSummery = await getPageSummeryBlock("5p3FcwgVIJJRzjFqx4rnQV");

  const experiencedStaffSection = await getImageContentBlock(
    "363hLOPFFvWY8bKxt0lOGG"
  );

  const storageFacilitiesSection = await getTextContentBlock(
    "6Ma30q1FXp0PkspE7OITES"
  );
  const storageFacilities = await getCardBlockGroup("storage-facilities", 4);

  return {
    props: {
      header,
      pageSummery,
      experiencedStaffSection,
      storageFacilitiesSection,
      storageFacilities,
    },
  };
};

export { getStaticProps };
export default BerthingPage;
