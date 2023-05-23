import { TitleContentSection } from "@layout/common/title-content-section";

import { ArticleCarouselCard } from "@components/article-carouse-card";
import { ArticlePreviewCard } from "@components/article-preview-card";
import { Carousel } from "@components/carousel";

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
            <ArticleCarouselCard article={article} key={article.id} />
          ))}
        </Carousel>
      </div>
      <div className="hidden w-full grid-cols-4 grid-rows-2 gap-3 px-4 xl:grid">
        {articles.map((article, index) => (
          <ArticlePreviewCard
            article={article}
            index={index}
            key={article.id}
          />
        ))}
      </div>
    </TitleContentSection>
  );
};

export { ArticlesSection };
