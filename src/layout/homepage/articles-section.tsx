import { cn } from "@lib/clsx";

import { formatDate } from "@utils/base";

import { TitleContentSection } from "@layout/common/title-content-section";

import { Button } from "@components/button";
import { Carousel } from "@components/carousel";
import { SecondaryHeading } from "@components/headings/secondary-heading";
import { ImageComponent } from "@components/image-component";

interface Props {
  articles: Article[];
}

const ArticlesSection: React.FC<Props> = ({ articles }: Props): JSX.Element => {
  return (
    <TitleContentSection
      fullWidth
      alignment="center"
      heading="Latest News & Stories"
      subHeading="Stay Updated"
    >
      <div className="w-full md:px-4 xl:hidden">
        <Carousel
          withDots
          breakpoints={{
            "(min-width: 320px)": {
              slides: {
                perView: 1.2,
                spacing: 16,
              },
            },
            "(min-width: 480px)": {
              slides: {
                perView: 1.5,
                spacing: 16,
              },
            },
            "(min-width: 600px)": {
              slides: {
                perView: 1.8,
                spacing: 16,
              },
            },
            "(min-width: 700px)": {
              slides: {
                perView: 2,
                spacing: 16,
              },
            },
            "(min-width: 900px)": {
              slides: {
                perView: 2.3,
                spacing: 16,
              },
            },
            "(min-width: 1000px)": {
              slides: {
                perView: 2.6,
                spacing: 16,
              },
            },
            "(min-width: 1100px)": {
              slides: {
                perView: 3,
                spacing: 20,
              },
            },
          }}
        >
          {articles.map((article) => (
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
                    {formatDate(article.publishedDate)}
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
          ))}
        </Carousel>
      </div>
      <div className="hidden w-full grid-cols-4 grid-rows-2 gap-3 px-4 xl:grid">
        {articles.map((article, index) => (
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
                  {formatDate(article.publishedDate)}
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
        ))}
      </div>
    </TitleContentSection>
  );
};

export { ArticlesSection };
