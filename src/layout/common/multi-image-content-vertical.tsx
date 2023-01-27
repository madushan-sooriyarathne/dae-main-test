import useMediaQuery from "@hooks/useMediaQuery";

import { Carousel } from "@components/carousel";
import { ImageComponent } from "@components/image-component";

import { ContentGroup } from "./groups/content-group";

import type { ContentGroupType } from "./groups/content-group";

interface Props extends ContentGroupType {
  images: [Image, Image, Image];
}

const MultiIMageContentVertical: React.FC<Props> = ({
  images,
  ...contentGroupProps
}: Props): JSX.Element => {
  const centered = useMediaQuery("(min-width: 1024px)");

  return (
    <section className="main-grid-columns grid auto-rows-min gap-y-9">
      <div className="col-[content-start_/_content-end] w-[min(56.25rem,100%)] lg:mx-auto">
        <ContentGroup
          {...contentGroupProps}
          alignment={centered ? "center" : "left"}
        />
      </div>

      <div className="col-[content-start_/_content-end] row-span-1 row-start-2 lg:hidden">
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
      <div className="col-[content-start_/_content-end] hidden w-full grid-cols-3 gap-x-6 lg:grid [&>*:nth-child(2)]:translate-y-12  3xl:[&>*:nth-child(2)]:translate-y-18 [&>*:nth-child(3)]:translate-y-8 3xl:[&>*:nth-child(3)]:translate-y-12">
        {images.map((image, index) => (
          <div className="aspect-[3/4] w-full rounded-sm" key={index}>
            <ImageComponent image={image} />
          </div>
        ))}
      </div>
    </section>
  );
};

export { MultiIMageContentVertical };
