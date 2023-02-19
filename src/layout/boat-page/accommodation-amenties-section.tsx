import Image from "next/image";

interface Props {
  amenities: Amenity[];
}

const AccommodationAmenitiesSection: React.FC<Props> = ({
  amenities,
}: Props): JSX.Element => {
  return (
    <section className="main-grid-columns trim-top grid pt-16">
      <div className="col-content flex flex-wrap items-start justify-center gap-6 ">
        {amenities.map((amenity) => (
          <div
            key={amenity.id}
            className="flex aspect-square w-32 flex-col items-center justify-start gap-y-3"
          >
            <div className="relative h-16 w-16 ">
              <Image
                src={amenity.icon}
                alt={amenity.name}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <span className="font-sans text-sm font-semibold tracking-wide text-black-700">
              {amenity.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export { AccommodationAmenitiesSection };
