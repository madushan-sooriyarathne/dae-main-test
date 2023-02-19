import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";

import { cn } from "@lib/clsx";

import { Button } from "@components/button";
import { SecondaryHeading } from "@components/headings/secondary-heading";
import { ImageComponent } from "@components/image-component";
import { Paragraph } from "@components/paragraph";
import { fadeIn } from "@styles/animations";

interface Props {
  cruises: CruiseType[];
}

const CruisesSection: React.FC<Props> = ({ cruises }: Props): JSX.Element => {
  const [selectedCruise, setSelectedCruise] = useState<
    string | undefined | null
  >(cruises[0]?.id);
  const [previousSelected, setPreviousSelected] = useState<CruiseType | null>(
    null
  );

  return (
    <section className="relative isolate ">
      <div className="grid w-full grid-cols-1 items-start justify-items-start @container/wrapper xl:grid-cols-3">
        {cruises.map((cruise, index) => (
          <m.div
            className="relative isolate aspect-[3/3.5] w-full border-b border-black/50 @container/block last:border-r-0 @md/wrapper:aspect-square @2xl/wrapper:aspect-video @7xl/wrapper:aspect-[3/3.5] xl:border-r"
            key={index}
            onMouseEnter={() => {
              setSelectedCruise(cruise.id);
              setPreviousSelected(cruise);
            }}
            onMouseLeave={() => setSelectedCruise(null)}
          >
            <div className="absolute inset-0 -z-10 @5xl/wrapper:@md/block:hidden">
              <ImageComponent image={cruise.image} sizes="100vw" />
            </div>
            <div className="flex h-full w-full flex-col items-start justify-end gap-y-5 bg-black/70 px-4 py-6 @sm:p-6 @md/block:items-center  @md/block:justify-center @md/block:py-12 @md/block:px-10 @xl/wrapper:justify-center @xl/wrapper:pt-12 @7xl/wrapper:@lg/block:pt-[40%] @7xl/wrapper:@md:pt-[30%] @7xl/wrapper:@md:!justify-start @7xl/wrapper:justify-end">
              <div className="flex flex-col items-start justify-start @md:items-center @md:after:mt-2 @md:after:h-[1px] @md:after:w-1/2 @md:after:bg-white @md:[&>*]:text-center">
                <span className="font-sm text-left font-serif italic tracking-wide text-white">
                  {cruise.tagLine}
                </span>
                <SecondaryHeading alignment="left" intent="white">
                  {cruise.name}
                </SecondaryHeading>
              </div>
              <div
                className={cn(
                  "flex w-[min(100%,_540px)] flex-col items-start justify-end gap-y-6 transition-opacity delay-200 duration-500 ease-in-out @md:items-center @md:[&_*]:text-center @7xl/wrapper:@md/block:opacity-0",
                  {
                    "@7xl/wrapper:@md/block:opacity-100":
                      selectedCruise === cruise.id,
                  }
                )}
              >
                <Paragraph alignment="left" intent="white">
                  {cruise.description}
                </Paragraph>
                <Button
                  type="route"
                  route={`/reservations?type=cruises&cruise=${cruise.id}`}
                  withArrow
                  intent="white"
                  solid
                >
                  Reserve Now
                </Button>
              </div>
            </div>
          </m.div>
        ))}
      </div>

      <AnimatePresence>
        {cruises.map(
          (cruise) =>
            cruise.id === selectedCruise && (
              <m.div
                variants={fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 -z-10"
                key={cruise.id}
              >
                <ImageComponent image={cruise.image} />
              </m.div>
            )
        )}
      </AnimatePresence>
      {previousSelected && (
        <m.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 -z-20"
          key={"placeholder"}
        >
          <ImageComponent image={previousSelected.image} />
        </m.div>
      )}
    </section>
  );
};

export { CruisesSection };
