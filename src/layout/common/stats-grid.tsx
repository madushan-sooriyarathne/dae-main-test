import { QuaternaryHeading } from "@components/headings/quaternary-heading";
import { ImageComponent } from "@components/image-component";
import { Paragraph } from "@components/paragraph";

interface Props {
  stats: Stat[];
}

const StatsGrid: React.FC<Props> = ({ stats }: Props): JSX.Element => {
  return (
    <section className="main-grid-columns grid w-full">
      <div className="col-content mx-auto flex flex-row flex-wrap items-stretch justify-center gap-4 md:w-full">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex w-[min(100%,_25rem)] flex-col items-start gap-y-4 border border-dashed border-primary-200 px-9 py-12"
          >
            {stat.icon && (
              <div className="h-16 w-16">
                <ImageComponent
                  image={{ src: stat.icon, alt: stat.title, blurUrl: "" }}
                />
              </div>
            )}
            <QuaternaryHeading alignment="left" intent="black">
              {stat.title}
            </QuaternaryHeading>
            <Paragraph alignment="left" intent="black">
              {stat.description}
            </Paragraph>
          </div>
        ))}
      </div>
    </section>
  );
};

export { StatsGrid };
