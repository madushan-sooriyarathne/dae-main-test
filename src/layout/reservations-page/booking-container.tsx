import { useRouter } from "next/router";
import { useMemo } from "react";
import { AnimatePresence, m } from "framer-motion";

import { cn } from "@lib/clsx";

import { SecondaryHeading } from "@components/headings/secondary-heading";
import { ImageComponent } from "@components/image-component";
import { OffersForm } from "@layout/reservations-page/offers-form";
import { CruisesForm } from "@layout/reservations-page/cruises-form";
import { EventsForm } from "@layout/reservations-page/events-form";

import { reservationTypes } from "site-data";
import { fadeIn } from "@styles/animations";
import Link from "next/link";

const ReservationContainer: React.FC = (): JSX.Element => {
  const router = useRouter();

  const reservationType = useMemo(() => {
    return router.query.type ? (router.query.type as string) : null;
  }, [router.query]);

  return (
    <section className="main-grid-columns grid">
      <div className="col-content mt-32 mb-18 w-full">
        <AnimatePresence mode="wait">
          {reservationType === null && (
            <m.div
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex w-full flex-col items-stretch gap-y-8 md:gap-y-12 xl:gap-y-16"
              key="selection-screen"
            >
              <SecondaryHeading alignment="center" intent="primary">
                Select the reservation type your are looking for
              </SecondaryHeading>
              <div className="flex w-full flex-col items-center justify-center gap-5 mlg:flex-row mlg:flex-wrap">
                {reservationTypes.map((type) => (
                  <Link
                    href={`/reservations/?type=${type.id}`}
                    key={type.id}
                    className={cn(
                      "relative isolate h-[150px] min-h-[150px] w-full max-w-[300px] rounded-md border border-black-400",
                      "outline-water-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    )}
                  >
                    <div className="grid h-full place-content-center bg-black/60 p-4">
                      <span className="text-center text-lg font-bold text-white">
                        {type.name}
                      </span>
                    </div>
                    <div className="absolute inset-0 -z-10">
                      <ImageComponent image={type.image} sizes="300px" />
                    </div>
                  </Link>
                ))}
              </div>
            </m.div>
          )}
          {reservationType === "packages-and-offers" && (
            <OffersForm offer={router.query.offer} />
          )}
          {reservationType === "cruises" && <CruisesForm />}
          {reservationType === "events" && <EventsForm />}
        </AnimatePresence>
      </div>
    </section>
  );
};

export { ReservationContainer };
