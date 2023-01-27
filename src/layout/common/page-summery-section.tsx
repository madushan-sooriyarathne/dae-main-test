import { Button } from "@components/button";
import { PrimaryHeading } from "@components/headings/primary-heading";
import { ImageComponent } from "@components/image-component";
import { Paragraph } from "@components/paragraph";

import type { ButtonType } from "@components/button";

interface Props {
  image: Image;
  heading: string;
  subHeading?: string;
  content: string;
  button?: ButtonType;
}

const PageSummerySection: React.FC<Props> = ({
  image,
  heading,
  subHeading,
  content,
  button,
}: Props): JSX.Element => {
  return (
    <section className="main-grid-columns grid w-full items-stretch justify-start gap-y-9 md:gap-y-12 lg:gap-y-16">
      <div className="col-[full-start_/_full-end] row-start-1 row-end-2 flex w-full flex-col items-start gap-y-6 md:col-[content-start_/_col-end_4] md:pr-9 lg:pr-12 xl:pr-14 2xl:pr-16">
        <PrimaryHeading alignment="left" intent="primary">
          {heading}
        </PrimaryHeading>
        {subHeading && (
          <Paragraph alignment="left" intent="black" titleParagraph>
            {subHeading}
          </Paragraph>
        )}
        {button && <Button {...button} />}
      </div>
      <div className="col-[full-start_/_full-end] row-start-2 row-end-3 md:col-[col-start_5_/_content-end] md:row-start-1 md:row-end-2 md:py-4">
        <Paragraph alignment="left" intent="black">
          {content}
        </Paragraph>
      </div>
      <div className="col-[full-start_/_full-end] aspect-square w-full overflow-hidden rounded-sm sm:aspect-[4/3] md:col-[content-start_/_content-end] md:aspect-video lg:aspect-[3/1.3]">
        <ImageComponent image={image} />
      </div>
    </section>
  );
};

export { PageSummerySection };
