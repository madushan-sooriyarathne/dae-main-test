import { useRef } from "react";
import { useScroll, useTransform, m } from "framer-motion";

import { ArticleCard } from "@components/article-card";
import { Carousel } from "@components/carousel";
import { HeadingGroup } from "@layout/common/groups/heading-group";

interface Props {
  articles: ArticlePreview[];
}

const SafetyGuidesSection: React.FC<Props> = ({
  articles,
}: Props): JSX.Element => {
  const firstRow: ArticlePreview[] = [];
  const secondRow: ArticlePreview[] = [];
  const thirdRow: ArticlePreview[] = [];

  articles.forEach((article, index) => {
    if (index % 3 == 0) {
      firstRow.push(article);
    } else if (index % 3 == 1) {
      secondRow.push(article);
    } else if (index % 3 === 2) {
      thirdRow.push(article);
    }
  });

  //   scroll parallax
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "start start"],
  });
  const secondRowY = useTransform(scrollYProgress, [0, 1], ["64px", "0px"]);
  const thirdRowY = useTransform(scrollYProgress, [0, 1], ["36px", "0px"]);

  return (
    <section
      className="main-grid-columns grid auto-rows-min gap-y-9"
      ref={sectionRef}
    >
      <div className="col-content">
        <HeadingGroup
          heading="D.A.E Safety Guides"
          subHeading="Be Educated about safety"
          alignment="center"
          intent="primary"
        />
      </div>
      <div className="col-content row-span-1 row-start-2 lg:hidden">
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
      <div className="col-content hidden grid-cols-3 gap-x-6 lg:grid xl:gap-x-8">
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
    </section>
  );
};

export { SafetyGuidesSection };
