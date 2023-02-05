import { useRef, useEffect } from "react";
import { env } from "@env/client.mjs";
import { brand } from "site-data";

const mapConfigs = {
  large: {
    zoom: 12,
    minZoom: 7,
    maxZoom: 18,
  },

  medium: {
    zoom: 8,
    minZoom: 6,
    maxZoom: 18,
  },

  small: {
    zoom: 7,
    minZoom: 6,
    maxZoom: 18,
  },
};

const MapsSection: React.FC = (): JSX.Element => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("mapbox-gl")
      .then(({ default: mapboxgl }) => {
        mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOX_API_KEY;

        const screenSize = window.innerWidth;

        const config =
          screenSize < 500
            ? mapConfigs.small
            : screenSize < 1100
            ? mapConfigs.medium
            : mapConfigs.large;

        const mapInstance = new mapboxgl.Map({
          container: mapRef.current as HTMLElement,
          style: "mapbox://styles/mapbox/light-v11",
          center: brand.location,
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

          // add marker
          const mainMarker = document.createElement("div");
          mainMarker.className = "marker";
          mainMarker.id = "main-marker";
          new mapboxgl.Marker(mainMarker)
            .setLngLat(brand.location)
            .addTo(mapEvent.target);
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="relative">
      <div
        ref={mapRef}
        className="h-[max(70vh,_43.75rem)] w-full md:h-[31.25]"
      ></div>
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
    </section>
  );
};

export { MapsSection };
