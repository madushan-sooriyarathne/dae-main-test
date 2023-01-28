import { cva } from "cva";

import { ContentGroup } from "@layout/common/groups/content-group";

import { Carousel } from "@components/carousel";
import { ImageComponent } from "@components/image-component";

import type { ContentGroupType } from "@layout/common/groups/content-group";
import type { VariantProps } from "cva";

const section = cva(
  [
    "w-full grid main-grid-columns gap-y-9 bg-white  lg:items-center bg-lightArtifacts",
  ],

  {
    variants: {
      withBg: {
        true: "py-16 bg-water bg-darkWater",
      },
    },
  }
);

interface Props extends ContentGroupType, VariantProps<typeof section> {
  images: [Image, Image, Image];
}

const MultiImageHorizontal: React.FC<Props> = ({
  images,
  withBg,
  ...contentGroupProps
}): JSX.Element => {
  return (
    <section className={section({ withBg })}>
      <div className="col-content row-span-1 row-start-1 lg:col-content-end-half">
        <ContentGroup
          {...contentGroupProps}
          intent={withBg ? "white" : undefined}
        />
      </div>
      <div className="col-content row-span-1 row-start-2 lg:hidden">
        <Carousel
          breakpoints={{
            "(min-width: 320px)": {
              slides: {
                perView: 1.3,
                spacing: 16,
              },
            },
            "(min-width: 480px)": {
              slides: {
                perView: 1.6,
                spacing: 16,
              },
            },
            "(min-width: 580px)": {
              slides: {
                perView: 2,
                spacing: 16,
              },
            },
            "(min-width: 680px)": {
              slides: {
                perView: 2.5,
                spacing: 16,
              },
            },
            "(min-width: 800px)": {
              slides: {
                perView: 2.8,
                spacing: 16,
              },
            },
          }}
        >
          {images.map((image, index) => (
            <div className="aspect-square w-full" key={index}>
              <ImageComponent image={image} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="col-content-start-half row-start-1 row-end-1 hidden w-full auto-rows-min grid-cols-2 items-center justify-center gap-6 pr-12 lg:grid xl:pr-14 2xl:col-full-start-half 2xl:px-16 [&>*:nth-child(2)]:col-[2/3] [&>*:nth-child(2)]:row-[1/2] [&>*:nth-child(3)]:col-[2/3] [&>*:nth-child(3)]:row-[2/3] [&>*:nth-child(1)]:col-[1/2] [&>*:nth-child(1)]:row-[1/3]">
        {images.map((image, index) => (
          <div key={index} className="aspect-[1_/_1.2] w-full">
            <ImageComponent image={image} />
          </div>
        ))}
      </div>
    </section>
  );
};

export type { Props as MultiImageContentSectionType };
export { MultiImageHorizontal };
