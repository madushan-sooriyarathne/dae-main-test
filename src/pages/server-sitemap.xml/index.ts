import type { GetServerSidePropsContext } from "next";
import { getServerSideSitemapLegacy, type ISitemapField } from "next-sitemap";

import { env } from "@env/server.mjs";

import { getArticles } from "@cms/content-studio";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // articles
  const articles = await getArticles();

  const articleNodes = articles.map((article) => ({
    loc: new URL(`/blog/${article.id}`, env.NEXT_PUBLIC_SITE_URL).href,
    lastmod: article.publishedDate,
    changefreq: "monthly",
    priority: 0.7,
  }));

  const fields = [...articleNodes] as ISitemapField[];

  return getServerSideSitemapLegacy(ctx, fields);
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function Site() {}
