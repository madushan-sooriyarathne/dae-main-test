import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";

import { cn } from "@lib/clsx";

import { Button } from "@components/button";
import { PrimaryHeading } from "@components/headings/primary-heading";
import { SecondaryHeading } from "@components/headings/secondary-heading";
import { SubHeading } from "@components/headings/sub-heading";
import { ImageComponent } from "@components/image-component";

import { fadeIn } from "@styles/animations";

interface Props {
  childSites: ChildSite[];
}

const ChildSitesSection: React.FC<Props> = ({
  childSites,
}: Props): JSX.Element => {
  const [selectedCruise, setSelectedCruise] = useState<
    string | undefined | null
  >(childSites[0]?.id);
  const [previousSelected, setPreviousSelected] = useState<ChildSite | null>(
    null
  );

  return (
    <section className="relative isolate ">
      <div className="grid w-full grid-cols-1 items-start justify-items-start @container/wrapper md:grid-cols-2 md:grid-rows-2 md:gap-4 md:px-4">
        {childSites.map((sites, index) => (
          <m.div
            className="relative isolate aspect-square w-full border-b border-black/50 @container/block last:border-r-0 lg:aspect-[4/3] xl:border-r"
            key={index}
            onMouseEnter={() => {
              setSelectedCruise(sites.id);
              setPreviousSelected(sites);
            }}
            onMouseLeave={() => setSelectedCruise(null)}
          >
            <div className="absolute inset-0 -z-10">
              <ImageComponent image={sites.image} sizes="100vw" />
            </div>
            <div className="flex h-full w-full flex-col items-stretch justify-end gap-y-5 bg-darkOverlay px-4 py-6 @sm:p-6 @lg/block:px-9 @lg/block:py-8">
              <div className="flex flex-col items-center justify-start @md:items-center @md:[&>*]:text-center">
                {/* <span className="font-sm text-left font-serif italic tracking-wide text-white md:text-base lg:text-lg">
                  {sites.tagLine}
                </span> */}
                <SubHeading alignment="center" intent="white">
                  {sites.tagLine}
                </SubHeading>
                <PrimaryHeading alignment="left" intent="white">
                  {sites.name}
                </PrimaryHeading>
              </div>
              <div
                className={cn(
                  "mx-auto w-[min(100%,_420px)] transition-opacity delay-200 duration-500 ease-in-out @md:items-center"
                )}
              >
                <Button
                  type="link"
                  link={sites.url}
                  withArrow
                  intent="primary"
                  solid
                >
                  {sites.buttonText}
                </Button>
              </div>
            </div>
          </m.div>
        ))}
      </div>
    </section>
  );
};

export { ChildSitesSection };