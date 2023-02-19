import { Button, type ButtonType } from "@components/button";
import { SubHeading } from "@components/headings/sub-heading";
import { ImageComponent } from "@components/image-component";
import { Paragraph } from "@components/paragraph";

import { SecondaryHeading } from "./headings/secondary-heading";

interface Props {
  id: string;
  heading: string;
  subHeading: string;
  content: string | null;
  image: Image;
  button?: ButtonType;
}

const BannerCard: React.FC<Props> = ({
  heading,
  subHeading,
  content,
  image,
  button,
}: Props): JSX.Element => {
  return (
    <div className="relative grid w-full grid-cols-1 grid-rows-[min-content_1fr] overflow-hidden rounded @container">
      <div className="aspect-video w-full @lg:absolute @lg:inset-0 @lg:-z-10 @lg:aspect-auto @lg:h-full">
        <ImageComponent image={image} sizes="(max-width: 820px) 100vw, 50vw" />
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-y-4 bg-water p-4 @lg:aspect-[4/3] @lg:justify-end @lg:bg-transparent @lg:bg-overlayShade @lg:p-6 @xl:py-9 @2xl:p-9">
        <div className="space-x-1">
          <SubHeading
            alignment="left"
            type="primary"
            intent="white"
            className="text-sm md:text-base lg:text-lg"
          >
            {subHeading}
          </SubHeading>
          <SecondaryHeading alignment="left" intent="white">
            {heading}
          </SecondaryHeading>
        </div>
        {content && (
          <div className="w-[min(37.5rem,_100%)]">
            <Paragraph
              alignment="left"
              intent="white"
              className="@lg:[&_p]:!text-base"
              small
            >
              {content}
            </Paragraph>
          </div>
        )}
        {button && <Button {...button} />}
      </div>
    </div>
  );
};

export type { Props as BannerCardType };
export { BannerCard };
