import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

import {
  getFAQGroup,
  getImageContentBlock,
  getPageHeaderBlock,
  getPageSummeryBlock,
  getStats,
  getTrainingCourses,
} from "@cms/content-studio";

import { CTASection } from "@layout/common/cta-section";
import { FAQSection } from "@layout/common/faq-section";
import {
  ImageContentSection,
  type ImageContentSectionType,
} from "@layout/common/image-content-section";
import { NewsletterSection } from "@layout/common/newsletter-section";
import Page from "@layout/common/page";
import { PageHeader, type PageHeaderType } from "@layout/common/page-header";
import {
  PageSummerySection,
  type PageSummerySectionType,
} from "@layout/common/page-summery-section";
import { StatsGrid } from "@layout/common/stats-grid";
import { TrainingCoursesSection } from "@layout/training-center-page/training-courses-section";

interface Props {
  header: PageHeaderType;
  pageSummery: PageSummerySectionType;
  trainingCenterIntro: ImageContentSectionType;
  trainingCenterPerks: Stat[];
  courses: TrainingCourse[];
  trainingCenterFAQ: FAQ[];
}

const TrainingCenterPage: NextPage<Props> = ({
  header,
  pageSummery,
  trainingCenterIntro,
  trainingCenterPerks,
  courses,
  trainingCenterFAQ,
}: Props): JSX.Element => {
  return (
    <Page title="Training Center">
      <PageHeader {...header} />
      <PageSummerySection
        {...pageSummery}
        button={{
          type: "route",
          route: "/inquiry?type=training-center",
          children: "Inquire Now",
          withArrow: true,
          intent: "primary",
        }}
      />
      <ImageContentSection {...trainingCenterIntro} withBg />
      <StatsGrid stats={trainingCenterPerks} className="-mt-10 4xl:-mt-20" />
      <TrainingCoursesSection courses={courses} />

      <CTASection
        heading="Reserve your appointment now!"
        subHeading="Ready to set sail?"
        button={{
          children: "Inquire Now",
          route: "/reservations?type=training-center",
          type: "route",
          withArrow: true,
          intent: "primary",
        }}
      />
      <FAQSection faqs={trainingCenterFAQ} />
      <NewsletterSection />
    </Page>
  );
};

const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const header = await getPageHeaderBlock("7n5aipQ9O2BSEPF3nYvdd");
  const pageSummery = await getPageSummeryBlock("5p3FcwgVIJJRzjFqx4rnQV");
  const trainingCenterIntro = await getImageContentBlock(
    "363hLOPFFvWY8bKxt0lOGG"
  );
  const trainingCenterPerks = await getStats("training-perks", 3);
  const courses = await getTrainingCourses();
  const trainingCenterFAQ = await getFAQGroup("training-center-faq");

  return {
    props: {
      header,
      pageSummery,
      trainingCenterIntro,
      trainingCenterPerks,
      courses,
      trainingCenterFAQ,
    },
  };
};

export { getStaticProps };
export default TrainingCenterPage;
