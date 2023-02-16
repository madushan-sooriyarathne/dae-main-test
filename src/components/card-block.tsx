import { QuaternaryHeading } from "./headings/quaternary-heading";
import { ImageComponent } from "./image-component";
import { Paragraph } from "./paragraph";

interface Props {
  image: Image;
  title: string;
  subTitle: string | null;
  description: string;
}

const CardBlock: React.FC<Props> = ({
  image,
  title,
  description,
}: Props): JSX.Element => {
  return (
    <figure className="flex h-full w-full flex-col items-stretch justify-start gap-y-3 lg:w-[min(20rem,_100%)]">
      <div className="aspect-square w-full overflow-hidden rounded-sm">
        <ImageComponent
          image={image}
          sizes="(max-width: 680px) 75vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="flex flex-col items-start justify-start gap-y-2 ">
        <QuaternaryHeading alignment="left" intent="secondary">
          {title}
        </QuaternaryHeading>
        <Paragraph alignment="left">{description}</Paragraph>
      </div>
    </figure>
  );
};

export type { Props as CardBlockType };
export { CardBlock };
