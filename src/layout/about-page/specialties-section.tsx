
import { Button } from "@components/button";
import { ImageComponent } from "@components/image-component";
import { PrimaryHeading } from "@components/headings/primary-heading";

interface Props {
  safariImage: Image;
  marinaImage: Image;
  charterImage: Image;

}

const SpecialtiesSection: React.FC<Props> = ({marinaImage, safariImage, charterImage}): JSX.Element => {
  return (
    <section className="grid auto-rows-min grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 lg:gap-5 lg:px-5">
      <div className="relative aspect-square w-full @container md:aspect-video lg:col-start-1 lg:col-end-2 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:h-full">
        <div className="absolute inset-0 -z-10">
          <ImageComponent
            image={safariImage}
            />
          </div>
          <div className="w-ful flex h-full flex-col items-start justify-end gap-y-5 bg-darkOverlay p-4 @md:p-6 @2xl:p-8 @3xl:p-10">
            <PrimaryHeading intent="white" alignment="left">Fun Runs and Safari Events</PrimaryHeading>
            <Button
              intent="white"
              solid
              withArrow
              type="link"
              link="https://safari.dae.fun"
            >
              Explore Fun Runs and Safaris
            </Button>
          </div>
        </div>
        <div className="relative aspect-square w-full @container md:aspect-video lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2 lg:aspect-auto lg:h-full">
          <div className="absolute inset-0 -z-10">
            <ImageComponent
              image={marinaImage}
          />
        </div>
        <div className="w-ful flex h-full flex-col items-start justify-end gap-y-5 bg-darkOverlay p-4 @md:p-6 @2xl:p-8 @3xl:p-10">
            <PrimaryHeading intent="white" alignment="left">Marina Facilities</PrimaryHeading>
          <Button
            intent="white"
            solid
            withArrow
            type="link"
            link="https://marina.dae.fun"
          >
            Explore The Marina
          </Button>
        </div>
      </div>
      <div className="relative aspect-square w-full @container md:aspect-video lg:col-start-2 lg:col-end-3 lg:row-span-1 lg:row-start-2">
        <div className="absolute inset-0 -z-10">
          <ImageComponent
            image={charterImage}
          />
        </div>
        <div className="w-ful flex h-full flex-col items-start justify-end gap-y-5 bg-darkOverlay p-4 @md:p-6 @2xl:p-8 @3xl:p-10">
            <PrimaryHeading intent="white" alignment="left">Exclusive Charters</PrimaryHeading>
          <Button
            intent="white"
            solid
            withArrow
            type="link"
            link="https://charter.dae.fun"
          >
            Explore Charters
          </Button>
        </div>
      </div>
    </section>
  );
};

export { SpecialtiesSection };
