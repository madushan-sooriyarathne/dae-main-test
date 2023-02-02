import { Carousel } from "@components/carousel";
import { useScroll, useTransform, m } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { ContentGroup, type ContentGroupType } from "./groups/content-group";

interface Props extends ContentGroupType {
  children: ReactNode[]; // or ReactNode
}

const MultiItemSection: React.FC<Props> = ({
  children,
  ...contentGroupProps
}: Props): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "start start"],
  });

  const imageTwoY = useTransform(scrollYProgress, [0, 1], ["48px", "0px"]);
  const imageThreeY = useTransform(scrollYProgress, [0, 1], ["64px", "0px"]);
  const imageFourY = useTransform(scrollYProgress, [0, 1], ["24px", "0px"]);
  const translateValues = [undefined, imageTwoY, imageThreeY, imageFourY];

  return (
    <section
      className="main-grid-columns w-full auto-rows-min items-start justify-items-center gap-y-9"
      ref={sectionRef}
    >
      <div className="col-content mx-auto w-[min(100%,_56.25rem)]">
        <ContentGroup {...contentGroupProps} alignment="center" />
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
          {children}
        </Carousel>
      </div>
      <div className="col-full hidden items-start justify-center gap-x-5 px-6 lg:flex xl:px-9">
        {children.map((child, index) => {
          const y =
            index <= translateValues.length ? translateValues[index] : 0;

          return (
            <m.div
              key={`item-${index}`}
              className="lg:w-[min(20rem,_100%)]"
              style={{
                y,
              }}
            >
              {child}
            </m.div>
          );
        })}
      </div>
    </section>
  );
};

export { MultiItemSection };
