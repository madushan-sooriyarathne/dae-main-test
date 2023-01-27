import { useEffect, useState } from "react";

import { AnimatePresence, m } from "framer-motion";

import { clamp } from "@utils/base";

import { Button, ButtonType } from "@components/button";
import { ImageComponent } from "@components/image-component";

import { HeadingGroup } from "./groups/heading-group";

import type { Variants } from "framer-motion";

import type { HeadingGroupType } from "./groups/heading-group";

interface Props extends HeadingGroupType {
  images: Image[];
  button?: ButtonType;
}

const sliderVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const BannerSection: React.FC<Props> = ({
  images,
  button,
  ...headingGroupProps
}: Props): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => clamp(0, images.length, prev + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative isolate w-full  lg:h-[80vh] 2xl:aspect-[3/1.3]">
      <div className="relative aspect-video w-full lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto">
        <AnimatePresence>
          {images.map(
            (image, index) =>
              index === activeIndex && (
                <m.div
                  className="absolute inset-0"
                  variants={sliderVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key={`slide-${index}`}
                >
                  <ImageComponent image={image} />
                </m.div>
              )
          )}
        </AnimatePresence>
      </div>
      <div className="main-grid-columns flex w-full items-end justify-start bg-water py-9 lg:h-full lg:bg-transparent lg:bg-overlayShade lg:px-12 lg:py-12 xl:p-16">
        <div className="col-[content-start_/_content-end] flex w-[min(100%,_37.5rem)] flex-col items-start justify-end gap-y-8 lg:col-[full-start_/_full-end]">
          <HeadingGroup {...headingGroupProps} intent="white" />
          {button && <Button {...button} />}
        </div>
      </div>
    </section>
  );
};

export type { Props as BannerType };
export { BannerSection };
