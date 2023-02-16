import { useEffect, useState } from "react";

import { AnimatePresence, m } from "framer-motion";

import { clamp } from "@utils/base";

import { ImageComponent } from "@components/image-component";
import { Button, type ButtonType } from "@components/button";
import { HeadingGroup } from "@layout/common/groups/heading-group";

import { sliderVariants } from "@styles/animations";

interface Props {
  heading: string;
  subHeading: string;
  images: Image[];
  button?: ButtonType;
}

const PageHeader: React.FC<Props> = ({
  heading,
  subHeading,
  images,
  button,
}: Props): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => clamp(0, images.length, prev + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <header className="relative isolate w-full lg:h-[70vh]">
      <div className="relative isolate aspect-square w-full overflow-hidden sm:aspect-[4/3] md:aspect-video lg:aspect-auto lg:h-full">
        <div className="absolute inset-0 z-[-1] aspect-square w-full sm:aspect-[4/3] md:aspect-video lg:aspect-[4/3]">
          <AnimatePresence>
            {images.map(
              (image, index) =>
                index === activeIndex && (
                  <m.div
                    key={index}
                    variants={sliderVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 h-full w-full"
                  >
                    <ImageComponent image={image} sizes="100vw" />
                  </m.div>
                )
            )}
          </AnimatePresence>
        </div>

        <div className="inset-0 z-[1] h-full w-full bg-[image:linear-gradient(0deg,_rgba(2,48,75,1)_0%,_rgba(2,48,75,0)_100%)]" />
      </div>

      <div className="main-grid-columns grid auto-rows-fr items-end justify-items-start bg-water py-9 md:py-12 lg:absolute lg:inset-0 lg:w-full lg:bg-transparent lg:py-16 ">
        <div className="col-content mx-auto flex w-[min(100%,_50rem)] flex-col items-start justify-end gap-y-6 lg:mx-0 lg:mr-auto lg:items-start lg:gap-y-9">
          <HeadingGroup
            heading={heading}
            subHeading={subHeading}
            intent="white"
            displayHeading
            alignment="left"
          />
          {button && <Button {...button} />}
        </div>
      </div>
    </header>
  );
};

export type { Props as PageHeaderType };
export { PageHeader };
