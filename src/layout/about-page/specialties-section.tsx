
import { Button } from "@components/button";
import { ImageComponent } from "@components/image-component";
import { PrimaryHeading } from "@components/headings/primary-heading";

const SpecialtiesSection: React.FC = (): JSX.Element => {
  return (
    <section className="grid auto-rows-min grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 lg:gap-5 lg:px-5">
      <div className="relative aspect-square w-full @container md:aspect-video lg:col-start-1 lg:col-end-2 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:h-full">
        <div className="absolute inset-0 -z-10">
          <ImageComponent
            image={{
              src: "https://images.ctfassets.net/z812u03kxpvy/6PAPhQTaIG5UcIAhithHH2/42442b8ae6bb87567b1d2eba68403cec/dae-fun-runs.jpg",
              alt: "A Man riding a Jet Ski by D.A.E",
                blurUrl: "",
              }}
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
              image={{
                src: "https://images.ctfassets.net/z812u03kxpvy/5FN3VkORVdWlEWxVeuUHEg/0da00dac01adeaafe61afbcb3d840260/dae-marina-services.jpg",
              alt: "Boat & Jet Ski Storage by D.A.E Marina",
              blurUrl: "",
            }}
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
            image={{
              src: "https://images.ctfassets.net/z812u03kxpvy/3VagEjI1rvtFxq4IsCvUkT/ba654e151449e546f2d24a5fd53d8524/dae-marina.jpg",
              alt: "A Catamaran charter boat by D.A.E Charter - charter.dae.fun",
              blurUrl: "",
            }}
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
