import { m, useScroll, useTransform } from "framer-motion";
import useMediaQuery from "@hooks/useMediaQuery";

import { Carousel } from "@components/carousel";
import { ImageComponent } from "@components/image-component";
import { Blob } from "@components/blob";

import { ContentGroup } from "./groups/content-group";

import type { ContentGroupType } from "./groups/content-group";
import { useRef } from "react";

interface Props extends ContentGroupType {
  images: [Image, Image, Image];
}

const MultiIMageContentVertical: React.FC<Props> = ({
  images,
  ...contentGroupProps
}: Props): JSX.Element => {
  const centered = useMediaQuery("(min-width: 1024px)");

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "center start"],
  });
  const imageTwoY = useTransform(scrollYProgress, [0, 1], ["72px", "0px"]);
  const imageThreeY = useTransform(scrollYProgress, [0, 1], ["48px", "0px"]);
  const blobY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      className="main-grid-columns relative grid auto-rows-min gap-y-9"
      ref={ref}
    >
      <Blob
        className="right-10 top-52 -z-10"
        intent="primaryWater"
        style={{ y: blobY }}
      />
      <div className="col-content w-[min(56.25rem,100%)] lg:mx-auto">
        <ContentGroup
          {...contentGroupProps}
          alignment={centered ? "center" : "left"}
        />
      </div>

      <div className="col-content row-span-1 row-start-2 lg:hidden">
        <Carousel
          breakpoints={{
            "(min-width: 320px)": {
              slides: {
                perView: 1.3,
                spacing: 16,
              },
            },
            "(min-width: 480px)": {
              slides: {
                perView: 1.6,
                spacing: 16,
              },
            },
            "(min-width: 580px)": {
              slides: {
                perView: 2,
                spacing: 16,
              },
            },
            "(min-width: 680px)": {
              slides: {
                perView: 2.5,
                spacing: 16,
              },
            },
            "(min-width: 800px)": {
              slides: {
                perView: 2.8,
                spacing: 16,
              },
            },
          }}
        >
          {images.map((image, index) => (
            <div className="aspect-square w-full" key={index}>
              <ImageComponent image={image} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="col-content hidden w-full grid-cols-3 gap-x-6 lg:grid [&>*:nth-child(2)]:translate-y-12  3xl:[&>*:nth-child(2)]:translate-y-18 [&>*:nth-child(3)]:translate-y-8 3xl:[&>*:nth-child(3)]:translate-y-12">
        {images.map((image, index) => (
          <m.div
            className="aspect-[3/4] w-full overflow-hidden rounded-sm"
            key={index}
            style={{
              y: index === 1 ? imageTwoY : index === 2 ? imageThreeY : 0,
            }}
          >
            <ImageComponent image={image} />
          </m.div>
        ))}
      </div>
    </section>
  );
};

export { MultiIMageContentVertical };
