import { Button } from "@components/button";
import { PrimaryHeading } from "@components/headings/primary-heading";
import { ImageComponent } from "@components/image-component";
import { Paragraph } from "@components/paragraph";
import { cn } from "@lib/clsx";
import { sliderVariants } from "@styles/animations";
import { clamp, formatDate } from "@utils/base";
import { AnimatePresence, m } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

interface Props {
  offer: Offer;
  invert: boolean;
}

const OfferCard: React.FC<Props> = ({ offer, invert }: Props): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const interval = useRef<NodeJS.Timer>();

  useEffect(() => {
    interval.current = setInterval(() => {
      setActiveIndex((prev) => clamp(0, offer.images.length, prev + 1));
    }, 10000);

    return () => clearInterval(interval.current);
  }, [offer.images.length]);

  const handleDotClick = useCallback(
    (index: number) => {
      setActiveIndex(index);

      // reset the interval
      clearInterval(interval.current);
      interval.current = setInterval(() => {
        setActiveIndex((prev) => clamp(0, offer.images.length, prev + 1));
      }, 10000);
    },
    [offer.images.length]
  );

  return (
    <section className="main-grid-columns grid auto-rows-min bg-lightWater lg:bg-[image:none]">
      <div
        className={cn(
          "relative isolate z-0 col-full aspect-video overflow-hidden lg:aspect-auto lg:min-h-[31.25rem]",
          invert ? "lg:col-content-end-half" : "lg:col-content-start-half"
        )}
      >
        <div className="absolute inset-0 z-10 flex items-end justify-center bg-[image:linear-gradient(0deg,_rgba(0,0,0,0.5)_0%,_rgba(0,0,0,0)_100%)] p-4">
          <div className="flex h-5 items-center gap-x-5">
            {offer.images.map((_, index) => (
              <div
                key={`control-dot-${index}`}
                onClick={() => handleDotClick(index)}
                className={cn(
                  index === activeIndex ? "h-4 w-4" : "h-3 w-3",
                  "rotate-45 bg-black-100"
                )}
              />
            ))}
          </div>
        </div>
        <AnimatePresence>
          {offer.images.map(
            (image, index) =>
              index === activeIndex && (
                <m.div
                  key={`${offer.id}-${index}`}
                  variants={sliderVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0 h-full w-full"
                >
                  <ImageComponent image={image} />
                </m.div>
              )
          )}
        </AnimatePresence>
      </div>
      <div
        className={cn(
          "col-full flex flex-col items-start gap-y-6 px-4 py-9 lg:row-start-1",
          invert ? "lg:col-content-start-half" : "lg:col-content-end-half",
          "lg:h-full lg:justify-center lg:bg-lightWater lg:px-9 lg:py-12",
          "2xl:px-12 2xl:py-16"
        )}
      >
        <div className="space-y-4">
          <div className="space-y-[2px]">
            {offer.expireDate && (
              <span className="rounded-sm border border-primary bg-primary-200 px-2 py-1 font-sans text-xs font-semibold tracking-wide text-primary">{`Offer Valid till ${formatDate(
                offer.expireDate
              )}`}</span>
            )}

            <PrimaryHeading alignment="left" intent="primary">
              {offer.name}
            </PrimaryHeading>
          </div>
          <Paragraph alignment="left" intent="black">
            {offer.description}
          </Paragraph>
        </div>
        <div className="flex w-full items-end justify-between gap-x-3">
          <div>
            {offer.pricingType === "fixed" ? (
              <>
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-black-700">
                  Starting from
                </span>
                <p className="font-sans text-3xl font-bold tracking-wide text-black-800">{`${offer.currency.toUpperCase()} ${
                  offer.pricing
                }`}</p>
              </>
            ) : (
              <p className="font-sans text-3xl font-bold tracking-wide text-black-800">{`${offer.pricing} Off`}</p>
            )}
          </div>
          <Button
            type="route"
            route={`/reserve?offer=${offer.id}`}
            intent="primary"
            withArrow
          >
            Reserve
          </Button>
        </div>
      </div>
    </section>
  );
};

export { OfferCard };
