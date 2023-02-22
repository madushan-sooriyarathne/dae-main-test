import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { m, useScroll, useTransform } from "framer-motion";

import { ResizablePanel } from "@layout/common/resizable-panel";

import { ArticleCard } from "@components/article-card";
import { Carousel } from "@components/carousel";
import { LoadingSpinner } from "@components/loading-spinner";
import { SelectorChip } from "@components/selector-chip";

import { fadeIn } from "@styles/animations";

interface Props {
  articles: Article[];
}

const ArticlesGrid: React.FC<Props> = ({ articles }: Props): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  //   scroll parallax
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "start start"],
  });
  const secondRowY = useTransform(scrollYProgress, [0, 1], ["64px", "0px"]);
  const thirdRowY = useTransform(scrollYProgress, [0, 1], ["36px", "0px"]);

  const tags = useMemo(() => {
    const tagList: string[] = ["All"];

    articles.forEach((article) => {
      article.tags.forEach((tag) => {
        if (!tagList.includes(tag)) {
          tagList.push(tag);
        }
      });
    });

    return tagList;
  }, [articles]);

  const [selectedTag, setSelectedTag] = useState<string | undefined>(tags[0]);

  const { firstRow, secondRow, thirdRow } = useMemo(() => {
    const selectedArticles = articles.filter(
      (article) =>
        selectedTag === "All" ||
        (selectedTag && article.tags.includes(selectedTag))
    );

    const firstRow: Article[] = [];
    const secondRow: Article[] = [];
    const thirdRow: Article[] = [];

    selectedArticles.forEach((article, index) => {
      if (index % 3 == 0) {
        firstRow.push(article);
      } else if (index % 3 == 1) {
        secondRow.push(article);
      } else if (index % 3 === 2) {
        thirdRow.push(article);
      }
    });

    return { firstRow, secondRow, thirdRow };
  }, [articles, selectedTag]);

  const handleTagSelect = useCallback((tag: string) => {
    setLoading(true);
    setSelectedTag(tag);
    void new Promise((resolve) => setTimeout(resolve, 500)).then(() =>
      setLoading(false)
    );
  }, []);

  useEffect(() => {
    if (
      router.query.tag &&
      !(router.query.tag instanceof Array) &&
      tags.includes(router.query.tag)
    ) {
      setSelectedTag(router.query.tag);
    }
  }, []);

  return (
    <section
      className="main-grid-columns grid scroll-mt-24 gap-y-8"
      ref={sectionRef}
      id="articles-grid"
    >
      <div className="col-content flex flex-col items-start justify-start gap-y-2">
        <span className="text-left text-xs font-semibold tracking-wider text-black-700 lg:text-sm lg:font-bold">
          Filter by Tags:
        </span>
        <div className=" flex flex-wrap items-start justify-start gap-3">
          {tags.map((tag) => (
            <SelectorChip
              key={tag}
              value={tag}
              selected={selectedTag === tag}
              onSelect={handleTagSelect}
            />
          ))}
        </div>
      </div>
      <div className="col-content">
        <ResizablePanel>
          {loading ? (
            <m.div
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex min-h-[31.25rem] items-center justify-center"
            >
              <LoadingSpinner
                key="article-loading-spinner"
                message="Loading articles..."
              />
            </m.div>
          ) : (
            <m.div
              className="w-full "
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              key="articles-grid"
            >
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
            </m.div>
          )}
        </ResizablePanel>
      </div>
    </section>
  );
};

export { ArticlesGrid };
