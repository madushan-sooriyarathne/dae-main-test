import { Button, type ButtonType } from "@components/button";
import { PrimaryHeading } from "@components/headings/primary-heading";
import { ImageComponent } from "@components/image-component";
import { Paragraph } from "@components/paragraph";

interface Props {
  heading: string;
  subHeading: string;
  button?: ButtonType;
  image: Image | null;
}

const PageSummerySection: React.FC<Props> = ({
  image,
  heading,
  subHeading,
  button,
}: Props): JSX.Element => {
  return (
    <section className="main-grid-columns relative isolate grid w-full items-stretch justify-start gap-y-4 md:gap-y-12 lg:gap-y-16">
      <div className="col-full row-start-1 row-end-2 flex w-full flex-col items-start justify-center gap-y-6  md:col-content-start-half ">
        <PrimaryHeading alignment="left" intent="primary">
          {heading}
        </PrimaryHeading>
      </div>
      <div className="col-full row-start-2 row-end-3 flex flex-col items-start justify-center gap-y-6 md:col-content-end-half md:row-start-1 md:row-end-2 md:py-4 md:pl-9 lg:pl-12 xl:pl-14 2xl:pl-16">
        {subHeading && (
          <Paragraph alignment="left" intent="black" titleParagraph>
            {subHeading}
          </Paragraph>
        )}
        {button && <Button {...button} />}
      </div>
      {image && (
        <div className="col-full aspect-square w-full overflow-hidden rounded-sm sm:aspect-[4/3] md:col-content md:aspect-video lg:aspect-[3/1.3]">
          <ImageComponent image={image} sizes="100vw" />
        </div>
      )}
    </section>
  );
};

export type { Props as PageSummerySectionType };
export { PageSummerySection };
