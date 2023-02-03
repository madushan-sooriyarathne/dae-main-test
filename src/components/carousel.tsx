import { useState } from "react";

import { useKeenSlider } from "keen-slider/react";

import type { KeenSliderPlugin, WebOptions } from "keen-slider";
import type { MouseEvent, ReactNode } from "react";

type BreakpointType = {
  [key: string]: Omit<WebOptions<Record<string, never>>, "breakpoints">;
};
type SliderConfig = Pick<WebOptions<Record<string, never>>, "slides">;

interface Props {
  children: ReactNode[];
  breakpoints?: BreakpointType;
  sliderConfig?: SliderConfig;
  withNavigation?: boolean;
  loop?: boolean;
  freeMode?: boolean;
  withDots?: boolean;
  withFraction?: boolean;
  initial?: number;
  centered?: boolean;
  autoPlay?: boolean;
  onSlideChange?: (activeSlide: number) => void;
}

const defaultBreakpoints: BreakpointType = {
  "(min-width: 400px)": {
    slides: {
      perView: 1,
      spacing: 10,
    },
  },
  "(min-width: 800px)": {
    slides: {
      perView: 2,
      spacing: 15,
    },
  },
  "(min-width: 1366px)": {
    slides: {
      perView: 3,
      spacing: 15,
    },
  },
  "(min-width: 1800px)": {
    slides: {
      perView: 4,
      spacing: 20,
    },
  },
};

const Carousel: React.FC<Props> = ({
  children,
  breakpoints = defaultBreakpoints,
  freeMode,
  onSlideChange,
  sliderConfig,
  withDots,
  withFraction = false,
  initial = 0,
  loop = false,
  centered = false,
  autoPlay = false,
  withNavigation,
}: Props): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselLoaded, setCarouselLoaded] = useState<boolean>(false);

  const autoPlayHandler: KeenSliderPlugin = (slider) => {
    if (autoPlay) {
      let timeout: ReturnType<typeof setTimeout>;
      let mouseOver = false;

      const clearNextTimeout = () => {
        clearTimeout(timeout);
      };

      const nextTimeout = () => {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => {
          slider.next();
        }, 5000);
      };

      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true;
          clearNextTimeout();
        });

        slider.container.addEventListener("mouseout", () => {
          mouseOver = false;
          clearNextTimeout();
        });

        nextTimeout();
      });

      slider.on("dragStarted", clearNextTimeout);
      slider.on("animationEnded", nextTimeout);
      slider.on("dragStarted", nextTimeout);
    }
  };

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: initial,
      loop: loop,

      mode: freeMode ? "free-snap" : "snap",
      slides: sliderConfig?.slides || {
        perView: 1,
        spacing: 10,
        origin: centered ? "center" : "auto",
      },

      breakpoints: breakpoints,
      slideChanged: (s) => {
        setCurrentSlide(s.track.details.rel);
        if (onSlideChange) {
          onSlideChange(s.track.details.rel);
        }
      },
      created: (slider) => {
        setTimeout(() => slider.update(), 500);
        setCarouselLoaded(true);
      },
    },
    [autoPlayHandler]
  );

  const handleClickNext = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    instanceRef.current?.next();
  };

  const handleClickPrev = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    instanceRef.current?.prev();
  };

  return (
    <div className="relative z-0 w-full">
      <div className="relative grid w-full auto-rows-min grid-cols-1 items-start justify-center gap-y-6">
        {withNavigation && (
          <button
            className="absolute top-1/2 left-0 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-sm shadow-water-500"
            onClick={handleClickPrev}
            aria-label="View previous slide"
          >
            <svg className="h-6 w-6 fill-primary">
              <use xlinkHref="/assets/svg/sprites.svg#icon-arrow-left-short" />
            </svg>
          </button>
        )}
        <div className="w-full overflow-hidden">
          <div ref={sliderRef} className="keen-slider">
            {children.map((child, index) => (
              <div
                className="keen-slider__slide flex items-center justify-center"
                key={index}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
        {withDots && carouselLoaded && (
          <div className="flex h-4 flex-wrap items-center justify-center gap-x-2 px-8">
            {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              [...Array(instanceRef.current?.track.details.slides.length)].map(
                (_, index) => (
                  <button
                    className={`${
                      currentSlide === index ? "h-3 w-3" : "h-2 w-2"
                    } rounded-full border-0 bg-primary outline-none  outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary`}
                    onClick={() => instanceRef.current?.moveToIdx(index)}
                    key={index}
                  />
                )
              )
            }
          </div>
        )}
        {withFraction && carouselLoaded && instanceRef.current && (
          <div className="flex h-auto items-center justify-center gap-x-2 ">
            <span className="flex min-w-[3.75rem] items-center justify-center rounded-md bg-white-200 px-2 py-1 text-center text-sm font-medium tracking-wide text-primary">
              {`${currentSlide + 1} /
              ${instanceRef.current?.track.details.slides.length}`}
            </span>
          </div>
        )}

        {withNavigation && (
          <button
            className="absolute top-1/2 right-0 z-10 flex h-16 w-16 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-sm shadow-water-500"
            onClick={handleClickNext}
            aria-label="View next slide"
          >
            <svg className="h-6 w-6 fill-primary">
              <use xlinkHref="/assets/svg/sprites.svg#icon-arrow-right-short" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export { Carousel };
