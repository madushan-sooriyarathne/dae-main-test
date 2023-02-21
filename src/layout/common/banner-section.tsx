import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";

import { clamp } from "@utils/base";

import type { ContentGroupType } from "@layout/common/groups/content-group";
import { HeadingGroup } from "@layout/common/groups/heading-group";

import { Button, type ButtonType } from "@components/button";
import { ImageComponent } from "@components/image-component";
import { Paragraph } from "@components/paragraph";

import { sliderVariants } from "@styles/animations";

interface Props extends Omit<ContentGroupType, "content"> {
  images: Image[];
  content: string | null;
  button?: ButtonType;
}

const BannerSection: React.FC<Props> = ({
  images,
  button,
  content,
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
                  <ImageComponent image={image} sizes="100vw" />
                </m.div>
              )
          )}
        </AnimatePresence>
      </div>
      <div className="main-grid-columns flex w-full items-end justify-start bg-water py-9 lg:h-full lg:bg-transparent lg:bg-overlayShade lg:px-12 lg:py-12 xl:p-16">
        <div className="col-content flex w-[min(100%,_37.5rem)] flex-col items-start justify-end gap-y-8 lg:col-full">
          <HeadingGroup {...headingGroupProps} intent="white" />
          {content && (
            <Paragraph alignment="left" intent="white">
              {content}
            </Paragraph>
          )}
          {button && <Button {...button} />}
        </div>
      </div>
    </section>
  );
};

export type { Props as BannerType };
export { BannerSection };
