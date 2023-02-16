import { ImageComponent } from "@components/image-component";
import { Paragraph } from "@components/paragraph";

interface Props {
  features: string[];
  coverImage: Image;
}

const BoatFeatures: React.FC<Props> = ({
  features,
  coverImage,
}: Props): JSX.Element => {
  return (
    <section className="md:main-grid-columns grid auto-rows-min grid-cols-1 gap-y-8 lg:gap-y-12">
      <div className="aspect-[4/3] w-full rounded-sm md:col-content md:aspect-video lg:aspect-[3/1.3]">
        <ImageComponent image={coverImage} sizes="100vw" />
      </div>
      <ul className="grid w-full auto-rows-min grid-cols-1 gap-y-4 px-4 md:col-content lg:grid-cols-2 lg:gap-x-10">
        {features.map((feat, index) => (
          <li key={index} className="flex items-start justify-start gap-x-2">
            <svg className="mt-1 h-4 w-4 fill-primary">
              <use xlinkHref="/assets/svg/sprites.svg#icon-anchor" />
            </svg>
            <Paragraph alignment="left" intent="black">
              {feat}
            </Paragraph>
          </li>
        ))}
      </ul>
    </section>
  );
};

export { BoatFeatures };
