import type { ParsedUrlQuery } from "querystring";
import type {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsResult,
  NextPage,
} from "next";

import { getArticle, getArticles } from "@cms/content-studio";

import { ArticleBody } from "@layout/article-page/article-body";
import { ArticleHeader } from "@layout/article-page/article-header";
import { NewsletterSection } from "@layout/common/newsletter-section";
import { OtherArticlesGrid } from "@layout/common/other-articles-grid";
import Page from "@layout/common/page";

interface Props {
  article: Article;
  otherArticles: Article[];
}

const ArticlePage: NextPage<Props> = ({
  article,
  otherArticles,
}: Props): JSX.Element => {
  return (
    <Page title={article.title}>
      <ArticleHeader image={article.image} />
      <ArticleBody article={article} />
      <OtherArticlesGrid
        articles={otherArticles}
        heading="Other Related Articles"
      />
      <NewsletterSection />
    </Page>
  );
};

const getStaticProps: GetStaticProps = async (
  context
): Promise<GetStaticPropsResult<Props>> => {
  const articleId = (context.params as ParsedUrlQuery).articleId as string;

  const article = await getArticle(articleId);

  const otherArticles = await getArticles(3, articleId);

  return {
    props: {
      article,
      otherArticles,
    },
  };
};

const getStaticPaths: GetStaticPaths =
  async (): Promise<GetStaticPathsResult> => {
    const articles = await getArticles();

    const paths = articles.map((article) => ({
      params: { articleId: article.id },
    }));

    return {
      paths: paths,
      fallback: false,
    };
  };

export { getStaticProps, getStaticPaths };
export default ArticlePage;
