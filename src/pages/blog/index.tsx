import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

import { getArticles, getPageHeaderBlock } from "@cms/content-studio";

import { ArticlesGrid } from "@layout/blog-page/articles-grid";
import { NewsletterSection } from "@layout/common/newsletter-section";
import Page from "@layout/common/page";
import { PageHeader, type PageHeaderType } from "@layout/common/page-header";

interface Props {
  pageHeader: PageHeaderType;
  articles: Article[];
}

const BlogArticlesPage: NextPage<Props> = ({
  pageHeader,
  articles,
}: Props): JSX.Element => {
  return (
    <Page title="Blog">
      <PageHeader {...pageHeader} />
      <ArticlesGrid articles={articles} />
      <NewsletterSection />
    </Page>
  );
};

const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const pageHeader = await getPageHeaderBlock("675W8snu8BpjY6qyadCzxR");
  const articles = await getArticles();

  return {
    props: {
      pageHeader,
      articles,
    },
  };
};

export { getStaticProps };
export default BlogArticlesPage;
