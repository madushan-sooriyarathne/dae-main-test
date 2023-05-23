import { useEffect, useState } from "react";

import { formatDate } from "@utils/base";

import { Button } from "@components/button";
import { QuaternaryHeading } from "@components/headings/quaternary-heading";
import { ImageComponent } from "@components/image-component";

interface Props {
  article: Article;
}

const ArticleCard: React.FC<Props> = ({ article }: Props): JSX.Element => {
  const [publishedDate, setPublishedDate] = useState<string | null>(null);

  useEffect(() => {
    setPublishedDate(formatDate(article.publishedDate));
  }, [article.publishedDate]);
  return (
    <figure className="w-full overflow-hidden rounded-sm @container">
      <div className="aspect-video w-full @[23.75rem]:aspect-[4/3]">
        <ImageComponent
          image={article.image}
          sizes="(max-width: 680px) 75vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex w-full flex-col items-stretch justify-start gap-y-4 bg-white-200 px-2 py-3 md:p-4">
        <div>
          <time className="text-xs font-semibold uppercase tracking-widest text-black-700">
            {publishedDate}
          </time>
          <QuaternaryHeading
            alignment="left"
            intent="primary"
            className="line-clamp-2"
          >
            {article.title}
          </QuaternaryHeading>
        </div>
        <div className="flex flex-col items-stretch justify-start gap-y-4">
          <div className="hidden @xs:block">
            <p className="text-left font-sans text-base tracking-wide text-black-900 line-clamp-3">
              {article.previewContent}
            </p>
          </div>
          <Button
            type="route"
            route={`/blog/${article.id}`}
            intent="primary"
            fullWidth
            withArrow
            small
          >
            Read More
          </Button>
        </div>
      </div>
    </figure>
  );
};

export { ArticleCard };
