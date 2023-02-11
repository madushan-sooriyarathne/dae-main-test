import { SecondaryHeading } from "@components/headings/secondary-heading";
import { ImageComponent } from "@components/image-component";
import { cn } from "@lib/clsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { reservationTypes } from "site-data";
import { OffersForm } from "./offers-form";

const ReservationContainer: React.FC = (): JSX.Element => {
  const router = useRouter();

  const [reservationType, setReservationType] = useState<string | null>();

  useEffect(() => {
    if (router.query.type) {
      setReservationType(router.query.type as string);
    }
  }, []);

  return (
    <section className="main-grid-columns grid">
      <div className="col-content mt-32 mb-18 w-full">
        {reservationType === undefined && (
          <div className="flex w-full flex-col items-stretch gap-y-8">
            <SecondaryHeading alignment="center" intent="primary">
              Select the reservation type your are looking for
            </SecondaryHeading>
            <div className="flex w-full flex-col items-center justify-center gap-5 mlg:flex-row mlg:flex-wrap">
              {reservationTypes.map((type) => (
                <button
                  key={type.id}
                  className={cn(
                    "relative isolate h-[150px] min-h-[150px] w-full max-w-[300px] rounded-md border border-black-400",
                    "outline-water-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  )}
                  onClick={() => setReservationType(type.id)}
                >
                  <div className="grid h-full place-content-center bg-black/60 p-4">
                    <span className="text-center text-lg font-bold text-white">
                      {type.name}
                    </span>
                  </div>
                  <div className="absolute inset-0 -z-10">
                    <ImageComponent image={type.image} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        {reservationType === "package-and-offers" && <OffersForm />}
      </div>
    </section>
  );
};

export { ReservationContainer };
