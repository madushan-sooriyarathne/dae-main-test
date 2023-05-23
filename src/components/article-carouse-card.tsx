import { useEffect, useState } from "react";

import { formatDate } from "@utils/base";

import { Button } from "./button";
import { SecondaryHeading } from "./headings/secondary-heading";
import { ImageComponent } from "./image-component";

interface Props {
  article: Article;
}

const ArticleCarouselCard: React.FC<Props> = ({
  article,
}: Props): JSX.Element => {
  const [publishedDate, setPublishedDate] = useState<string | null>(null);

  useEffect(() => {
    setPublishedDate(formatDate(article.publishedDate));
  }, [article.publishedDate]);
  return (
    <figure
      key={article.id}
      className="relative grid h-full w-full grid-cols-1 grid-rows-[min-content_1fr] overflow-hidden rounded-sm"
    >
      <div className="aspect-[4/3] w-full">
        <ImageComponent image={article.image} />
      </div>
      <div className="flex w-full flex-col items-start justify-between gap-y-5 bg-water p-4">
        <div>
          <span className="text-xs font-bold uppercase text-white-400">
            {publishedDate}
          </span>
          <SecondaryHeading
            alignment="left"
            intent="white"
            className="text-xl line-clamp-2 md:text-2xl lg:text-2xl"
          >
            {article.title}
          </SecondaryHeading>
        </div>
        <Button
          type="route"
          route={`/blog/${article.id}`}
          withArrow
          intent="white"
          solid
          small
          fullWidth
        >
          Read the Article
        </Button>
      </div>
    </figure>
  );
};

export { ArticleCarouselCard };
