import { TertiaryHeading } from "@components/headings/tertiary-heading";
import { ImageComponent } from "@components/image-component";
import { Paragraph } from "@components/paragraph";

interface Props {
  cruises: CruiseType[];
}

const CruisesSection: React.FC<Props> = ({ cruises }: Props): JSX.Element => {
  return (
    <section className="grid w-full grid-cols-1 items-start justify-items-start">
      {cruises.map((cruise, index) => (
        <div className=" relative isolate aspect-square w-full" key={index}>
          <div className="absolute inset-0 -z-10">
            <ImageComponent image={cruise.image} sizes="100vw" />
          </div>
          <div className="flex h-full w-full flex-col items-start justify-end gap-y-3 p-4">
            <div>
              <span>{cruise.tagLine}</span>
              <TertiaryHeading alignment="left" intent="white">
                {cruise.name}
              </TertiaryHeading>
            </div>
            <Paragraph alignment="center" intent="white">
              {cruise.description}
            </Paragraph>
          </div>
        </div>
      ))}
    </section>
  );
};

export { CruisesSection };
