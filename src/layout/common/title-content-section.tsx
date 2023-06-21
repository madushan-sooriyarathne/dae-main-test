import { forwardRef, type ReactNode } from "react";

import { cn } from "@lib/clsx";

import {
  PrimaryHeading,
  type PrimaryHeadingType,
} from "@components/headings/primary-heading";

interface Props extends Omit<PrimaryHeadingType, "children"> {
  children: ReactNode | ReactNode[];
  fullWidth?: true;
  heading: string;
}

const TitleContentSection = forwardRef<HTMLElement, Props>(
  ({ children, fullWidth, heading, intent, alignment }, ref): JSX.Element => {
    return (
      <section
        className="main-grid-columns grid gap-y-8 lg:gap-y-10 xl:gap-y-12"
        ref={ref}
      >
        <div className={cn("col-content w-full", { "col-full": fullWidth })}>
          <PrimaryHeading alignment={alignment} intent={intent}>
            {heading}
          </PrimaryHeading>
        </div>
        <div className={cn("col-content w-full", { "col-full": fullWidth })}>
          {children}
        </div>
      </section>
    );
  }
);

TitleContentSection.displayName = "TitleContentSection";

export { TitleContentSection };
