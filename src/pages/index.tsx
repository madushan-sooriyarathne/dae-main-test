import dynamic from "next/dynamic";
import type { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

import {
  getArticles,
  getCardBlockGroup,
  getChildSites,
  getHeroSlides,
  getPageSummeryBlock,
  getTestimonials,
  getTextContentBlock,
  getVideoBlock,
} from "@cms/content-studio";

import type { ContentGroupType } from "@layout/common/groups/content-group";
import { MultiItemSection } from "@layout/common/multi-item-section";
import Page from "@layout/common/page";
import {
  PageSummerySection,
  type PageSummerySectionType,
} from "@layout/common/page-summery-section";
import { ArticlesSection } from "@layout/homepage/articles-section";
import { ChildSitesSection } from "@layout/homepage/child-sites-section";
import { Hero } from "@layout/homepage/hero";

import { CardBlock, type CardBlockType } from "@components/card-block";

const NewsletterSection = dynamic(() =>
  import("@layout/common/newsletter-section").then(
    (mod) => mod.NewsletterSection
  )
);
const ContactFormSection = dynamic(() =>
  import("@layout/common/contact-form").then((mod) => mod.ContactFormSection)
);

const TestimonialSection = dynamic(() =>
  import("@layout/common/testimonials-section").then(
    (mod) => mod.TestimonialSection
  )
);

interface Props {
  heroVideo: Video;
  heroSlides: HeroSlide[];
  pageSummery: PageSummerySectionType;
  childSites: ChildSite[];
  whyDAESection: ContentGroupType;
  daeValues: CardBlockType[];
  latestArticles: Article[];
  testimonials: Testimonial[];
}

const Home: NextPage<Props> = ({
  heroVideo,
  heroSlides,
  pageSummery,
  childSites,
  whyDAESection,
  daeValues,
  latestArticles,
  testimonials,
}) => {
  return (
    <Page title="Home">
      <Hero video={heroVideo} slides={heroSlides} />
      <PageSummerySection {...pageSummery} />
      <ChildSitesSection childSites={childSites} />
      <MultiItemSection {...whyDAESection}>
        {daeValues.map((val) => (
          <CardBlock {...val} key={val.title} />
        ))}
      </MultiItemSection>
      <ArticlesSection articles={latestArticles} />
      <TestimonialSection testimonials={testimonials} />
      {/* TODO: Insta Feed  */}
      <NewsletterSection trim />
      <ContactFormSection />
    </Page>
  );
};

const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const heroVideo = await getVideoBlock("4j0keJ4b1W4R0ZLmpfXQxX");
  const heroSlides = await getHeroSlides();
  const pageSummery = await getPageSummeryBlock("6hCw1Nn2Xv53i6BuZGHF0g");
  const childSites = await getChildSites();
  const whyDAESection = await getTextContentBlock("6Ma30q1FXp0PkspE7OITES");
  const daeValues = await getCardBlockGroup("dae-values", 4);
  const latestArticles = await getArticles(5);
  const testimonials = await getTestimonials();

  return {
    props: {
      heroVideo,
      heroSlides,
      pageSummery,
      childSites,
      whyDAESection,
      daeValues,
      latestArticles,
      testimonials,
    },
  };
};

export { getStaticProps };
export default Home;
