import { useEffect, useState } from "react";

import { cn } from "@lib/clsx";

import { formatDate } from "@utils/base";

import { Button } from "./button";
import { SecondaryHeading } from "./headings/secondary-heading";
import { ImageComponent } from "./image-component";

interface Props {
  article: Article;
  index: number;
}

const ArticlePreviewCard: React.FC<Props> = ({
  article,
  index,
}: Props): JSX.Element => {
  const [publishedDate, setPublishedDate] = useState<string | null>(null);

  useEffect(() => {
    setPublishedDate(formatDate(article.publishedDate));
  }, [article.publishedDate]);
  return (
    <figure
      key={article.id}
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-sm @container",
        {
          "col-span-2 col-start-1 row-span-2 row-start-1": index === 0,
        }
      )}
    >
      <div className="absolute inset-0 -z-10">
        <ImageComponent image={article.image} />
      </div>
      <div className="flex h-full w-full flex-col items-start justify-end gap-y-5 bg-darkOverlay p-4 @md:p-8 @xl:gap-y-8 @xl:p-12">
        <div className="w-[min(100%,_37.5rem)]">
          <span className="text-xs font-bold uppercase text-white-400">
            {publishedDate}
          </span>
          <SecondaryHeading
            alignment="left"
            intent="white"
            className="!text-xl line-clamp-2 @md:!text-2xl @xl:!text-3xl @2xl:!text-4xl"
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
        >
          Read the Article
        </Button>
      </div>
    </figure>
  );
};

export { ArticlePreviewCard };
