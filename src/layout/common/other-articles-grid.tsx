import { useMemo, useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";

import { TitleContentSection } from "@layout/common/title-content-section";

import { ArticleCard } from "@components/article-card";
import { Carousel } from "@components/carousel";

interface Props {
  articles: Article[];
  heading: string;
}

const OtherArticlesGrid: React.FC<Props> = ({
  articles,
  heading,
}: Props): JSX.Element => {
  //   scroll parallax
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "start start"],
  });
  const secondRowY = useTransform(scrollYProgress, [0, 1], ["64px", "0px"]);
  const thirdRowY = useTransform(scrollYProgress, [0, 1], ["36px", "0px"]);

  const { firstRow, secondRow, thirdRow } = useMemo(() => {
    const firstRow: Article[] = [];
    const secondRow: Article[] = [];
    const thirdRow: Article[] = [];

    articles.forEach((article, index) => {
      if (index % 3 == 0) {
        firstRow.push(article);
      } else if (index % 3 == 1) {
        secondRow.push(article);
      } else if (index % 3 === 2) {
        thirdRow.push(article);
      }
    });

    return { firstRow, secondRow, thirdRow };
  }, [articles]);

  return (
    <TitleContentSection heading={heading} ref={sectionRef}>
      <div className="lg:hidden">
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
                perView: 1.4,
                spacing: 24,
              },
            },
            "(min-width: 580px)": {
              slides: {
                perView: 1.6,
                spacing: 24,
              },
            },
            "(min-width: 680px)": {
              slides: {
                perView: 2,
                spacing: 24,
              },
            },
            "(min-width: 800px)": {
              slides: {
                perView: 2.2,
                spacing: 24,
              },
            },
          }}
        >
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </Carousel>
      </div>
      <div className="hidden grid-cols-3 gap-x-6 lg:grid xl:gap-x-8">
        <div className="flex flex-col items-stretch justify-start gap-y-6">
          {firstRow.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        <m.div
          className="flex flex-col items-stretch justify-start gap-y-6"
          style={{ y: secondRowY }}
        >
          {secondRow.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </m.div>
        <m.div
          className="flex flex-col items-stretch justify-start gap-y-6"
          style={{ y: thirdRowY }}
        >
          {thirdRow.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </m.div>
      </div>
    </TitleContentSection>
  );
};

export { OtherArticlesGrid };
