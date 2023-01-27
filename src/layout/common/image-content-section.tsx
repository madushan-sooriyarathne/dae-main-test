import { cva } from "cva";

import { ContentGroup } from "@layout/common/groups/content-group";

import { ImageComponent } from "@components/image-component";

import type { ContentGroupType } from "@layout/common/groups/content-group";
import type { VariantProps } from "cva";

const section = cva(["w-full grid main-grid-columns auto-rows-min gap-y-9"], {
  variants: {
    withBg: {
      true: "2xl:bg-black-100 shadow-[0_0_0_100vmax] shadow-black-100 [clip-path:inset(0_-100vmax)]",
    },
  },
  defaultVariants: {
    withBg: false,
  },
});

interface Props extends VariantProps<typeof section>, ContentGroupType {
  image: Image;
}

const ImageContentSection: React.FC<Props> = ({
  image,
  withBg,
  ...contentGroupProps
}: Props): JSX.Element => {
  return (
    <section className={section({ withBg })}>
      <div className="col-[full-start_/_full-end] h-full w-full md:col-[content-start_/_content-end] lg:col-[content-start_/col-end_4] lg:py-12 lg:pr-12 xl:py-14 xl:pr-14 2xl:py-24 2xl:pr-16">
        <ContentGroup {...contentGroupProps} />
      </div>
      <div className="col-[content-start_/_content-end] aspect-square w-full sm:aspect-[4_/_3] md:aspect-video lg:col-[col-start_5_/_full-end] lg:aspect-auto lg:h-full xxl:col-[col-start_5_/_content-end]">
        <ImageComponent image={image} />
      </div>
    </section>
  );
};

export type { Props as ImageContentSectionType };
export { ImageContentSection };
