import { Button, type ButtonType } from "@components/button";
import { PrimaryHeading } from "@components/headings/primary-heading";
import { ImageComponent } from "@components/image-component";
import { Paragraph } from "@components/paragraph";

interface Props {
  heading: string;
  description: string;
  button?: ButtonType;
  image: Image | null;
}

const PageSummerySection: React.FC<Props> = ({
  image,
  heading,
  description,
  button,
}: Props): JSX.Element => {
  return (
    <section className="relative isolate flex w-full flex-col items-center justify-start gap-y-4 px-4 md:gap-y-12 md:px-5 lg:gap-y-16 lg:px-9">
      <div className="flex w-[min(100%,_68.75em)] flex-col items-start justify-center gap-y-6 lg:items-center lg:[&>*]:text-center">
        <PrimaryHeading alignment="left" intent="primary">
          {heading}
        </PrimaryHeading>
        <Paragraph alignment="left" intent="black" titleParagraph>
          {description}
        </Paragraph>
        {button && <Button {...button} />}
      </div>
      {image && (
        <div className="aspect-square w-[min(100%,_75em)] overflow-hidden rounded-sm sm:aspect-[4/3] md:col-content md:aspect-video lg:aspect-[3/1.3]">
          <ImageComponent image={image} sizes="100vw" />
        </div>
      )}
    </section>
  );
};

export type { Props as PageSummerySectionType };
export { PageSummerySection };
