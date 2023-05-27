import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, m } from "framer-motion";
import { inquiryTypes } from "site-data";

import { cn } from "@lib/clsx";

import { EventsForm } from "@layout/inquiries-page/events-form";
import { TrainingCenterForm } from "@layout/inquiries-page/training-center";

import { SecondaryHeading } from "@components/headings/secondary-heading";
import { ImageComponent } from "@components/image-component";

import { fadeIn } from "@styles/animations";

const InquiryContainer: React.FC = (): JSX.Element => {
  const router = useRouter();

  const inquiryType = useMemo(() => {
    return router.query.type ? (router.query.type as string) : null;
  }, [router.query]);

  return (
    <section className="main-grid-columns grid">
      <div className="col-content mt-32 mb-18 w-full">
        <AnimatePresence mode="wait">
          {inquiryType === null && (
            <m.div
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mx-auto flex w-[min(100%,_62.5rem)] flex-col items-stretch gap-y-8 md:gap-y-12 xl:gap-y-16"
              key="selection-screen"
            >
              <SecondaryHeading alignment="center" intent="primary">
                Select the Inquiry type your are looking for
              </SecondaryHeading>
              <div className="grid w-full grid-cols-1 items-center justify-center gap-5 md:grid-cols-2">
                {inquiryTypes.map((type) =>
                  type.type === "in-site" ? (
                    <Link
                      href={`/inquiries/?type=${type.id}`}
                      key={type.id}
                      className={cn(
                        "grid aspect-video w-full grid-cols-1 grid-rows-[1fr_min-content] outline-water-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      )}
                    >
                      <div className="h-full w-full">
                        <ImageComponent image={type.image} sizes="300px" />
                      </div>
                      <div
                        className={cn(
                          "flex items-center justify-start gap-x-3 bg-primary p-4"
                        )}
                      >
                        <span className="text-left text-lg font-bold text-white">
                          {type.name}
                        </span>
                        <svg className="h-3 w-8 fill-white">
                          <use xlinkHref="/assets/svg/sprites.svg#arrow-right-long" />
                        </svg>
                      </div>
                    </Link>
                  ) : (
                    <a
                      href={type.link}
                      rel="noreferrer"
                      target="_blank"
                      key={type.id}
                      className={cn(
                        "grid aspect-video w-full grid-cols-1 grid-rows-[1fr_min-content] outline-water-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      )}
                    >
                      <div className="h-full w-full">
                        <ImageComponent image={type.image} sizes="300px" />
                      </div>
                      <div
                        className={cn(
                          "flex items-center justify-start gap-x-3 bg-water p-4"
                        )}
                      >
                        <span className="text-left text-lg font-bold text-white">
                          {type.name}
                        </span>
                        <svg className="h-6 w-6 fill-white">
                          <use xlinkHref="/assets/svg/sprites.svg#icon-external" />
                        </svg>
                      </div>
                    </a>
                  )
                )}
              </div>
            </m.div>
          )}
          {inquiryType === "training-center" && <TrainingCenterForm />}
          {inquiryType === "events" && <EventsForm />}
        </AnimatePresence>
      </div>
      <div className="grid w-full grid-cols-1 items-start justify-items-center"></div>
    </section>
  );
};

export { InquiryContainer };
