import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import Link from "next/link";

import { env } from "@env/client.mjs";

import { formatDate } from "@utils/base";

import { PrimaryHeading } from "@components/headings/primary-heading";
import { QuaternaryHeading } from "@components/headings/quaternary-heading";
import { QuinaryHeading } from "@components/headings/quinary-heading";
import { Paragraph } from "@components/paragraph";

interface Props {
  article: Article;
}

const ArticleBody: React.FC<Props> = ({ article }: Props): JSX.Element => {
  return (
    <section className="main-grid-columns grid">
      <div className="col-content mx-auto flex w-[min(100%,_68.75rem)] flex-col items-stretch justify-start gap-y-9 md:gap-y-12 lg:gap-y-14 xl:gap-y-16">
        <div className="flex flex-col items-start justify-start lg:items-center">
          <div className="flex items-center justify-start space-x-2">
            {article.author && (
              <p className="space-x-2 text-xs font-medium italic text-black-600 lg:text-sm">
                <span>by</span>
                <span className="font-bold not-italic text-primary lg:ml-2">
                  {article.author}
                </span>
                <span className="not-italic">on</span>
              </p>
            )}
            <time className="text-left font-sans text-xs font-semibold tracking-wider text-black-700 lg:text-center lg:text-sm">
              {formatDate(article.publishedDate)}
            </time>
          </div>
          <PrimaryHeading
            alignment="center"
            className="mb-3 text-left lg:text-center"
          >
            {article.title}
          </PrimaryHeading>
          <div className="flex items-start justify-start gap-3 lg:justify-center">
            {article.tags.map((tag) => (
              <Link
                href={`/blog?tag=${tag}#articles-grid`}
                key={tag}
                className="rounded border border-water-200 bg-water-100 px-3 py-2 font-sans text-xs font-semibold text-water lg:text-sm"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-stretch justify-start gap-y-6 md:gap-y-8 lg:gap-y-10 xl:gap-y-12">
          <QuaternaryHeading intent="secondary" alignment="left">
            {article.previewContent}
          </QuaternaryHeading>

          <Paragraph alignment="left">{article.content}</Paragraph>
        </div>

        <div className="flex flex-col items-start justify-start gap-y-3 rounded border border-white-300 bg-white-100 p-5 lg:gap-y-5">
          <QuinaryHeading alignment="left" intent="secondary">
            Share this article
          </QuinaryHeading>
          <div className="flex flex-wrap items-start justify-start gap-x-3 gap-y-2">
            <EmailShareButton
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full lg:h-12 lg:w-12"
              url={
                new URL(`/blog/${article.id}`, env.NEXT_PUBLIC_SITE_URL).href
              }
              subject={article.title}
              body={article.previewContent}
              separator=":?:"
            >
              <EmailIcon />
            </EmailShareButton>
            <FacebookShareButton
              url={
                new URL(`/blog/${article.id}`, env.NEXT_PUBLIC_SITE_URL).href
              }
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full lg:h-12 lg:w-12"
              quote={article.previewContent}
              hashtag="#DAEBlog"
            >
              <FacebookIcon />
            </FacebookShareButton>
            <LinkedinShareButton
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full lg:h-12 lg:w-12"
              url={
                new URL(`/blog/${article.id}`, env.NEXT_PUBLIC_SITE_URL).href
              }
              title={article.title}
              summary={article.previewContent}
              source={env.NEXT_PUBLIC_SITE_URL}
            >
              <LinkedinIcon />
            </LinkedinShareButton>
            <TwitterShareButton
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full lg:h-12 lg:w-12"
              url={
                new URL(`/blog/${article.id}`, env.NEXT_PUBLIC_SITE_URL).href
              }
              title={article.title}
              hashtags={["#DAE", "#DAEblog", " #DebugAutoExclusive"]}
            >
              <TwitterIcon />
            </TwitterShareButton>
            <WhatsappShareButton
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full lg:h-12 lg:w-12"
              url={
                new URL(`/blog/${article.id}`, env.NEXT_PUBLIC_SITE_URL).href
              }
              title={article.title}
              separator=":?:"
            >
              <WhatsappIcon />
            </WhatsappShareButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ArticleBody };
