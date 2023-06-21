import { m } from "framer-motion";

import { cn } from "@lib/clsx";

import { Button } from "@components/button";
import { PrimaryHeading } from "@components/headings/primary-heading";
import { ImageComponent } from "@components/image-component";

interface Props {
  childSites: ChildSite[];
}

const ChildSitesSection: React.FC<Props> = ({
  childSites,
}: Props): JSX.Element => {
  return (
    <section className="relative isolate ">
      <div className="grid w-full grid-cols-1 items-start justify-items-start @container/wrapper md:grid-cols-2 md:grid-rows-2 md:gap-4 md:px-4">
        {childSites.map((sites, index) => (
          <m.div
            className="relative isolate aspect-square w-full border-b border-black/50 @container/block last:border-r-0 lg:aspect-[4/3] xl:border-r"
            key={index}
          >
            <div className="absolute inset-0 -z-10">
              <ImageComponent image={sites.image} sizes="100vw" />
            </div>
            <div className="flex h-full w-full flex-col items-stretch justify-end gap-y-5 bg-darkOverlay px-4 py-6 @sm:p-6 @lg/block:px-9 @lg/block:py-8 lg:gap-y-9">
              <div className="flex flex-col items-center justify-start @md:items-center @md:[&>*]:text-center">
                <PrimaryHeading alignment="left" intent="white">
                  {sites.name}
                </PrimaryHeading>
                <span className="font-xs text-left font-sans font-semibold tracking-wide text-white md:text-sm">
                  {sites.tagLine}
                </span>
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
