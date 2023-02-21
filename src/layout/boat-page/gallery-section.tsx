import { useCallback, useMemo, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, m } from "framer-motion";

import useMediaQuery from "@hooks/useMediaQuery";

import { Carousel } from "@components/carousel";
import { ImageComponent } from "@components/image-component";

import { fadeIn } from "@styles/animations";

interface Props {
  images: Image[];
}

const GallerySection: React.FC<Props> = ({ images }: Props): JSX.Element => {
  const [splitIndex, setSplitIndex] = useState<number>(
    images.length > 6 ? 6 : images.length
  );
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewIndex, setPreviewIndex] = useState<number>(0);
  const showNav = useMediaQuery("(min-width: 1024px)");

  const shownImages = useMemo(() => {
    return images.slice(0, splitIndex);
  }, [images, splitIndex]);

  const handleLoadMore = useCallback(() => {
    if (images.length > shownImages.length) {
      setSplitIndex((prev) => prev + 3);
    }
  }, [images.length, shownImages.length]);

  const handlePreview = useCallback((index: number) => {
    setPreviewOpen(true);
    setPreviewIndex(index);
  }, []);

  return (
    <section className="main-grid-columns relative grid items-start justify-center">
      <div className="auto-row-min col-content grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:gap-6">
        {shownImages.map((img, index) => (
          <div
            className="group relative isolate aspect-square w-full"
            key={index}
            onClick={() => handlePreview(index)}
          >
            <ImageComponent image={img} />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
              <span className="flex h-10 w-10 items-center justify-center rounded bg-white/50 p-2">
                <svg className="h-6 w-6 fill-white">
                  <use xlinkHref="/assets/svg/sprites.svg#icon-fullscreen" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
      {shownImages.length < images.length && (
        <div className="absolute left-0 bottom-0 right-0 z-10 flex items-center justify-center bg-darkOverlay px-4 py-5">
          <button
            onClick={handleLoadMore}
            type="button"
            role="button"
            className="rounded border-2 border-white px-3 py-2 font-sans text-xs font-semibold text-white"
          >
            Load More
          </button>
        </div>
      )}
      <DialogPrimitive.Root
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        modal
      >
        <AnimatePresence>
          {previewOpen && (
            <DialogPrimitive.Portal
              forceMount
              container={document.getElementById("app")}
            >
              <DialogPrimitive.DialogContent asChild>
                <m.div
                  variants={fadeIn}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 pt-10 md:px-10 lg:px-20 "
                >
                  <button
                    role="button"
                    type="button"
                    className="absolute right-4 top-4 z-10 rounded border-2 border-white bg-white px-3 py-2 font-sans text-xs font-semibold tracking-wider text-black shadow-md shadow-black/50"
                    onClick={() => setPreviewOpen(false)}
                  >
                    Close
                  </button>
                  <div className="h-full w-full">
                    <Carousel
                      withFraction
                      withNavigation={showNav}
                      loop
                      initial={previewIndex}
                      fullHeight
                      breakpoints={{
                        "(min-width: 320px)": {
                          slides: { perView: 1, spacing: 16 },
                        },
                      }}
                    >
                      {images.map((img, index) => (
                        <div
                          key={index}
                          className="h-full w-full"
                          // className="aspect-[1/1.6]  w-full sm:aspect-[1/1.2]  md:aspect-[1/1] mlg:aspect-[1/0.8] lg:aspect-[3/1.3] 2xl:aspect-[3/1.2]"
                        >
                          <ImageComponent image={img} objectFit="contain" />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </m.div>
              </DialogPrimitive.DialogContent>
            </DialogPrimitive.Portal>
          )}
        </AnimatePresence>
      </DialogPrimitive.Root>
    </section>
  );
};

export { GallerySection };
