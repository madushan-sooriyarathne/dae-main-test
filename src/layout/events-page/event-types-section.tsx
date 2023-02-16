import { SubHeading } from "@components/headings/sub-heading";
import { TertiaryHeading } from "@components/headings/tertiary-heading";
import { ImageComponent } from "@components/image-component";
import { Paragraph } from "@components/paragraph";
import { cn } from "@lib/clsx";

interface Props {
  eventTypes: EventType[];
}

const EventTypesSection: React.FC<Props> = ({
  eventTypes,
}: Props): JSX.Element => {
  return (
    <section
      className={cn(
        "grid auto-rows-min grid-cols-1 gap-y-6 px-4 mlg:grid-cols-2 mlg:gap-x-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-18 4xl:!px-32"
      )}
    >
      {eventTypes.map((event) => (
        <div
          key={event.id}
          className="relative grid w-full grid-cols-1 grid-rows-[min-content_1fr] overflow-hidden rounded @container"
        >
          <div className="aspect-video w-full @lg:absolute @lg:inset-0 @lg:-z-10 @lg:aspect-auto @lg:h-full">
            <ImageComponent
              image={event.image}
              sizes="(max-width: 820px) 100vw, 50vw"
            />
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-y-4 bg-water p-4 @lg:aspect-[4/3] @lg:justify-end @lg:bg-transparent @lg:bg-overlayShade @lg:p-6">
            <div className="space-x-1">
              <SubHeading
                alignment="left"
                type="primary"
                intent="white"
                className="text-sm"
              >
                {event.tagLine}
              </SubHeading>
              <TertiaryHeading alignment="left" intent="white">
                {event.name}
              </TertiaryHeading>
            </div>
            <div className="w-[min(37.5rem,_100%)]">
              <Paragraph
                alignment="left"
                intent="white"
                className="@lg:[&_p]:text-base"
                small
              >
                {event.description}
              </Paragraph>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default EventTypesSection;
