import { ContentGroup } from "@layout/common/groups/content-group";

import { ImageComponent } from "@components/image-component";

import type { ContentGroupType } from "@layout/common/groups/content-group";

interface Props extends ContentGroupType {
  image: Image;
}

const LocationSection: React.FC<Props> = ({
  image,
  ...contentGroupProps
}: Props): JSX.Element => {
  return (
    <div className=" mlg:main-grid-columns isolate grid w-full auto-rows-min grid-cols-1 mlg:bg-water-100">
      <div className="-z-10  aspect-square w-full bg-water-100 md:aspect-video mlg:col-[col-start_4/_full-end] mlg:row-start-1 mlg:aspect-auto mlg:h-full 2xl:aspect-square 2xl:h-auto">
        <ImageComponent
          image={image}
          objectFit="contain"
          pos={{ x: "right", y: "center" }}
          sizes="(max-width: 820px) 100vw, 60vw"
        />
      </div>
      <div className="flex flex-col items-start justify-center px-4 py-9 mlg:col-content-start-half mlg:row-start-1 mlg:px-0 mlg:py-12">
        <ContentGroup {...contentGroupProps} />
      </div>
    </div>
  );
};

export { LocationSection };
