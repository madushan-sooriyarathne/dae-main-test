import { forwardRef, type ComponentPropsWithRef } from "react";

import { cn } from "@lib/clsx";

import { QuaternaryHeading } from "@components/headings/quaternary-heading";
import { ImageComponent } from "@components/image-component";
import { Paragraph } from "@components/paragraph";

interface Props extends ComponentPropsWithRef<"section"> {
  stats: Stat[];
}

const StatsGrid = forwardRef<HTMLElement, Props>(
  ({ stats, className, ...props }, ref): JSX.Element => {
    return (
      <section
        className={cn("main-grid-columns grid w-full", className)}
        {...props}
        ref={ref}
      >
        <div className="col-content mx-auto flex flex-row flex-wrap items-stretch justify-center gap-4 md:w-full">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex w-[min(100%,_25rem)] flex-col items-start gap-y-4 border-2 border-dashed border-primary-200 px-9 py-12"
            >
              {stat.icon && (
                <div className="h-16 w-16">
                  <ImageComponent
                    image={{ src: stat.icon, alt: stat.title, blurUrl: "" }}
                    sizes="10vw"
                  />
                </div>
              )}
              <QuaternaryHeading alignment="left" intent="primary">
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
  }
);

StatsGrid.displayName = "StatsGrid";

export { StatsGrid };
