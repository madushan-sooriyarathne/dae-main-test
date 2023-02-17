import { useEffect, useRef, useState } from "react";

import { fadeIn } from "@styles/animations";
import { AnimatePresence, m, type Variants } from "framer-motion";

import { Button } from "@components/button";
import { DisplayHeading } from "@components/headings/display-heading";
import { ImageComponent } from "@components/image-component";
import { Paragraph } from "@components/paragraph";
import { clamp } from "@utils/base";

const slideVariants: Variants = {
  initial: {
    opacity: 0,

    y: 20,
  },
  animate: (x: number) => ({
    opacity: 1,

    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      delay: x * 0.1,
    },
  }),
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

interface Props {
  video: Video;
  slides: HeroSlide[];
}

const Hero: React.FC<Props> = ({ video, slides }: Props): JSX.Element => {
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [componentMounted, setComponentMounted] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setComponentMounted(true), 3000);
    return () => {
      setComponentMounted(false);
    };
  }, []);

  useEffect(() => {
    const paginateSlides = () => {
      setActiveSlide((prev) => clamp(0, slides.length, prev + 1));
    };

    const interval = setInterval(paginateSlides, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <header className="mt:relative mt-18 grid w-full grid-cols-1 grid-rows-[min-content_min-content] bg-black lg:mt-0">
      <div className="relative isolate aspect-square w-full overflow-hidden sm:aspect-[4/3] md:aspect-video lg:aspect-auto lg:h-screen">
        {componentMounted && (
          <m.video
            className="h-full w-full object-cover"
            loop
            autoPlay
            muted
            poster={video.fallbackImage.src}
            ref={videoPlayerRef}
            variants={fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {video.files.map((file) => (
              <source src={file.src} type={file.type} key={file.id} />
            ))}
          </m.video>
        )}

        <div className="absolute inset-0 z-[-1] aspect-square w-full sm:aspect-[4/3] md:aspect-video lg:aspect-[4/3]">
          <ImageComponent image={video.fallbackImage} sizes="100vw" />
        </div>
        <div className="absolute inset-0 z-[1] h-full w-full bg-[image:linear-gradient(0deg,_rgba(2,48,75,1)_0%,_rgba(2,48,75,0)_100%)]" />
      </div>

      <div className="bg-water px-4 pb-12 lg:absolute lg:inset-0 lg:flex lg:w-full lg:items-end lg:bg-transparent lg:px-12 3xl:px-16 3xl:py-16">
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              activeSlide === index && (
                <div
                  key={`slide-${index}`}
                  className="mx-auto flex w-[min(100%,_50rem)] flex-col items-center justify-end gap-y-9 lg:mx-0 lg:mr-auto lg:items-start [&_p]:text-center lg:[&_p]:!text-left [&_h1]:text-center lg:[&_h1]:!text-left"
                >
                  <div className="flex flex-col items-start justify-end gap-y-2">
                    <m.div
                      key={`main-heading-${index}`}
                      variants={slideVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={0}
                      className="w-full"
                    >
                      <DisplayHeading intent="white" alignment="left">
                        {slide.heading}
                      </DisplayHeading>
                    </m.div>
                    <m.div
                      variants={slideVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={2}
                      className="w-full"
                    >
                      <Paragraph
                        intent="white"
                        alignment="left"
                        className=""
                        titleParagraph
                      >
                        {slide.subText}
                      </Paragraph>
                    </m.div>
                  </div>
                  {slide.ctaLink && slide.ctaText && (
                    <m.div
                      variants={slideVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={3}
                    >
                      {slide.externalLink ? (
                        <Button
                          type="link"
                          link={slide.ctaLink}
                          solid
                          mobileAdapt
                          withArrow
                          external
                        >
                          {slide.ctaText}
                        </Button>
                      ) : (
                        <Button
                          type="route"
                          route={slide.ctaLink}
                          solid
                          mobileAdapt
                          withArrow
                        >
                          {slide.ctaText}
                        </Button>
                      )}
                    </m.div>
                  )}
                </div>
              )
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export { Hero };
