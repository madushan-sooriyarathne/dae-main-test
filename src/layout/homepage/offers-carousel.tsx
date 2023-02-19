import Link from "next/link";

import { formatDate } from "@utils/base";

import {
  ContentGroup,
  ContentGroupType,
} from "@layout/common/groups/content-group";

import { Carousel } from "@components/carousel";
import { QuaternaryHeading } from "@components/headings/quaternary-heading";
import { ImageComponent } from "@components/image-component";

interface Props extends ContentGroupType {
  offers: Offer[];
}

const OffersCarousel: React.FC<Props> = ({
  offers,
  ...contentGroupProps
}: Props): JSX.Element => {
  return (
    <section className="main-grid-columns grid justify-items-start gap-y-9 lg:items-center ">
      <div className="col-content lg:col-[content-start_/_col-end_4] lg:pr-9 xl:col-[content-start_/_col-end_3] xl:pr-12 2xl:pr-16">
        <ContentGroup
          {...contentGroupProps}
          alignment="left"
          button={{
            children: "Explore Packages & Offers",
            type: "route",
            route: "/offers",
            withArrow: true,
          }}
        />
      </div>
      <div className="col-content w-full lg:col-[col-start_5_/_full-end] xl:!col-[col-start_4_/_full-end]">
        <Carousel
          breakpoints={{
            "(min-width: 320px)": {
              slides: {
                perView: 1.2,
                spacing: 16,
              },
            },
            "(min-width: 420px)": {
              slides: {
                perView: 1.4,
                spacing: 16,
              },
            },
            "(min-width: 480px)": {
              slides: {
                perView: 1.5,
                spacing: 16,
              },
            },
            "(min-width: 580px)": {
              slides: {
                perView: 1.8,
                spacing: 16,
              },
            },
            "(min-width: 680px)": {
              slides: {
                perView: 2,
                spacing: 24,
              },
            },
            "(min-width: 800px)": {
              slides: {
                perView: 2.4,
                spacing: 24,
              },
            },
            "(min-width: 900px)": {
              slides: {
                perView: 2.6,
                spacing: 24,
              },
            },
            "(min-width: 1024px)": {
              slides: {
                perView: 1.6,
                spacing: 24,
              },
            },
            "(min-width: 1200px)": {
              slides: {
                perView: 1.8,
                spacing: 24,
              },
            },
            "(min-width: 1280px)": {
              slides: {
                perView: 2,
                spacing: 32,
              },
            },
            "(min-width: 1380px)": {
              slides: {
                perView: 2.4,
                spacing: 32,
              },
            },
            "(min-width: 1440px)": {
              slides: {
                perView: 2.8,
                spacing: 32,
              },
            },
            "(min-width: 1600px)": {
              slides: {
                perView: 3,
                spacing: 32,
              },
            },
          }}
        >
          {offers.map((offer) => (
            <Link
              href={`/offers#${offer.id}`}
              key={offer.id}
              className="grid h-full w-full grid-cols-1 grid-rows-[min-content_1fr] gap-y-3"
            >
              <div className="aspect-square w-full overflow-hidden rounded-sm">
                <ImageComponent image={offer.images[0] as Image} />
              </div>
              <div className="flex h-full flex-col items-start justify-between gap-2">
                <QuaternaryHeading alignment="left" intent="secondary">
                  {offer.name}
                </QuaternaryHeading>
                <div className="flex items-center justify-start gap-x-2">
                  <span className="rounded bg-water-200 px-3 py-2 text-left font-sans text-xs font-bold uppercase tracking-wider text-water ">
                    {offer.pricingType === "fixed"
                      ? `From ${offer.currency} ${offer.pricing}`
                      : `${offer.pricing}% Off`}
                  </span>
                  {offer.expireDate && (
                    <span className="text-left font-sans text-xs font-bold tracking-wide text-black-700">{`Valid till ${formatDate(
                      offer.expireDate
                    )}`}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export { OffersCarousel };
