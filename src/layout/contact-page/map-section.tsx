import { useCallback, useEffect, useRef, useState } from "react";

import { env } from "@env/client.mjs";

import { QuaternaryHeading } from "@components/headings/quaternary-heading";

interface Props {
  places: Place[];
}

const MapsSection: React.FC<Props> = ({ places }): JSX.Element => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [focusedPlace, setFocusedPlace] = useState<Place>(places[0] as Place);

  const handlePlaceSelect = useCallback((place: Place) => {
    setFocusedPlace(place);

    // scroll to the top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    import("mapbox-gl")
      .then(({ default: mapboxgl }) => {
        mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOX_API_KEY;

        const config = {
          zoom: 12,
          minZoom: 7,
          maxZoom: 18,
        };

        const mapInstance = new mapboxgl.Map({
          container: mapRef.current as HTMLElement,
          style: "mapbox://styles/mapbox/light-v11",
          center: focusedPlace.coords,
          ...config,
        });

        mapInstance.on("load", (mapEvent) => {
          // disable mouse scroll
          mapEvent.target.scrollZoom.disable();

          // add map controls (eg: zoom and rotation, etc...)
          mapEvent.target.addControl(
            new mapboxgl.NavigationControl(),
            "bottom-left"
          );

          // add markers
          places.map((place) => {
            const marker = document.createElement("div");
            marker.id = place.id;
            marker.classList.add("marker");
            marker.style.setProperty("--logo", place.mapIcon);
            new mapboxgl.Marker(marker)
              .setLngLat(place.coords)
              .addTo(mapEvent.target);
          });
        });
      })
      .catch((err) => console.error(err));
  }, [focusedPlace.coords, places]);

  return (
    <section className="flex flex-col items-stretch justify-start">
      <div className="relative">
        <div
          ref={mapRef}
          className="h-[max(70vh,_43.75rem)] w-full md:h-[31.25]"
        />
        <a
          href="https://goo.gl/maps/g2YWra2dwyE4ysEk7"
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-6  right-6 flex w-max items-center justify-end gap-x-2 rounded-sm bg-water px-3 py-2 md:bottom-8 md:right-8"
        >
          <span className="font-sans text-sm font-semibold text-white ">
            View on Google Maps
          </span>
          <svg className="h-5 w-5 fill-white">
            <use xlinkHref="/assets/svg/sprites.svg#icon-external" />
          </svg>
        </a>
      </div>
      <div className="flex w-full flex-wrap items-stretch justify-center gap-3 px-2 py-3">
        {places.map((place) => (
          <button
            type="button"
            role="button"
            aria-label={`${place.name} Selector`}
            onClick={() => handlePlaceSelect(place)}
            key={place.id}
            className="group/card group w-full max-w-[480px] rounded border border-white-300 bg-white-100 p-4 outline-none transition-colors duration-200 ease-in-out hover:border-water hover:bg-water focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-water lg:p-8"
          >
            <QuaternaryHeading
              intent="secondary"
              className="transition-colors duration-200 ease-in-out group-hover/card:text-white"
            >
              {place.name}
            </QuaternaryHeading>
            <address className="text-left font-sans text-sm tracking-wide text-black transition-colors duration-200 ease-in-out group-hover/card:text-white lg:text-base">
              {place.address}
            </address>
            <div className="mt-3 flex flex-col items-start justify-start gap-y-1">
              <a
                className="flex items-center justify-start gap-x-2 fill-black text-sm font-semibold tracking-wider text-black no-underline transition-colors duration-200 ease-in-out group-hover/card:fill-white group-hover/card:text-white lg:text-base"
                href={`tel:${place.phone.replace(" ", "")}`}
                target="_blank"
                rel="noreferrer"
              >
                <svg className="h-4 w-4">
                  <use xlinkHref="/assets/svg/sprites.svg#icon-phone" />
                </svg>
                {place.phone}
              </a>
              <a
                className="flex items-center justify-start gap-x-2 fill-black text-sm font-semibold tracking-wider text-black no-underline transition-colors duration-200 ease-in-out group-hover/card:fill-white group-hover/card:text-white lg:text-base"
                href={`mailto:${place.email}`}
                target="_blank"
                rel="noreferrer"
              >
                <svg className="h-4 w-4">
                  <use xlinkHref="/assets/svg/sprites.svg#icon-email" />
                </svg>
                {place.email}
              </a>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export { MapsSection };
