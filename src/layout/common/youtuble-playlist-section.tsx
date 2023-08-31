import { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { m } from "framer-motion";
import { useKeenSlider } from "keen-slider/react";

import { cn } from "@lib/clsx";

import { ImageComponent } from "@components/image-component";

interface Props {
  videos: YoutubeVideo[];
}

const YoutubePlaylistSection: React.FC<Props> = ({
  videos,
}: Props): JSX.Element => {
  const [activeVideo, setActiveVideo] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  const [carouselLoaded, setCarouselLoaded] = useState<boolean>(false);

  const [thumbnailRef, thumbnailInstanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: 4,
      spacing: 10,
    },
    created: (slider) => {
      setCarouselLoaded(true);
      setTimeout(() => slider.update(), 500);
    },

    breakpoints: {
      "(min-width: 240px)": {
        slides: {
          perView: 2.5,
          spacing: 4,
        },
      },

      "(min-width: 400px)": {
        slides: {
          perView: 3,
          spacing: 4,
        },
      },

      "(min-width: 500px)": {
        slides: {
          perView: 3.5,
          spacing: 10,
        },
      },
      "(min-width: 600px)": {
        slides: {
          perView: 4,
          spacing: 16,
        },
      },
    },
  });

  const handleThumbnailPrev = () => {
    thumbnailInstanceRef.current?.prev();
  };
  const handleThumbnailNext = () => {
    thumbnailInstanceRef.current?.next();
  };

  const handleVideoSelect = useCallback((index: number) => {
    setActiveVideo(index);
    setVideoLoading(true);
    setTimeout(() => setVideoLoading(false), 700);
  }, []);

  // an hydration error occurres when rendering the Youtube videos
  // Thus only render the youtube player on Client
  useEffect(() => {
    if (typeof window === undefined) {
      setIsClient(false);
    } else {
      setIsClient(true);
    }
  }, []);

  return (
    <section className="md:main-grid-columns isolate grid  grid-cols-1">
      <div
        className={cn(
          "col-content grid h-auto w-full grid-cols-1",
          "grid-rows-[repeat(2,_min-content)] gap-4"
        )}
      >
        {}
        <div className="relative isolate aspect-[4/3] h-auto w-full md:aspect-video">
          {(videoLoading || !isClient) && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 z-10 grid place-content-center bg-white"
            >
              <div className="flex flex-col items-center justify-center gap-y-3">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary-200 border-t-primary" />
                <span className="text-center font-sans text-xs font-semibold uppercase tracking-wider text-primary md:text-sm">
                  Loading video...
                </span>
              </div>
            </m.div>
          )}
          {isClient &&
            videos.map(
              (vid, index) =>
                index === activeVideo && (
                  <div key={vid.id} className="h-full w-full">
                    <ReactPlayer
                      muted={false}
                      url={vid.url}
                      width="100%"
                      height="100%"
                      volume={1}
                      controls
                    />
                  </div>
                )
            )}
        </div>
        <div className="w-full px-3 sm:px-4 md:px-0">
          <div
            className="keen-slider group relative isolate box-border h-auto w-full max-w-full"
            ref={thumbnailRef}
          >
            {!carouselLoaded && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 z-20 grid place-content-center bg-white"
              >
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary-200 border-t-primary" />
              </m.div>
            )}
            <button
              className={cn(
                "absolute left-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded bg-white",
                "opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100",
                "grid place-content-center rounded-full p-2 shadow-lg"
              )}
              type="button"
              aria-label="Previous thumnails"
              onClick={handleThumbnailPrev}
            >
              <svg className="h-5 w-5 fill-black-700">
                <use xlinkHref="/assets/svg/sprites.svg#icon-arrow-left-short" />
              </svg>
            </button>
            {videos.map((vid, index) => (
              <div
                key={`thumb-${vid.id}`}
                className={cn(
                  "keen-slider__slide",
                  "relative aspect-video h-auto w-full border-2 border-transparent md:border-4",
                  "overflow-hidden rounded transition-[border-color] duration-200 ease-in-out",
                  { "border-primary": activeVideo === index }
                )}
                onClick={() => handleVideoSelect(index)}
              >
                <ImageComponent image={vid.thumbnail} />
              </div>
            ))}
            <button
              className={cn(
                "absolute right-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded bg-white",
                "opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100",
                "grid place-content-center rounded-full p-2 shadow-lg"
              )}
              type="button"
              aria-label="Previous thumnails"
              onClick={handleThumbnailNext}
            >
              <svg className="h-5 w-5 fill-black-700">
                <use xlinkHref="/assets/svg/sprites.svg#icon-arrow-right-short" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { YoutubePlaylistSection };
