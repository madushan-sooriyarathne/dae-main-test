import { forwardRef, type ReactNode } from "react";

import { cn } from "@lib/clsx";

import {
  HeadingGroup,
  type HeadingGroupType,
} from "@layout/common/groups/heading-group";

interface Props extends Omit<HeadingGroupType, "subHeading"> {
  children: ReactNode | ReactNode[];
  subHeading?: string;
  fullWidth?: true;
}

const TitleContentSection = forwardRef<HTMLElement, Props>(
  ({ children, subHeading, fullWidth, ...headingProps }, ref): JSX.Element => {
    return (
      <section
        className="main-grid-columns grid gap-y-8 lg:gap-y-10 xl:gap-y-12"
        ref={ref}
      >
        <div className={cn("col-content w-full", { "col-full": fullWidth })}>
          <HeadingGroup {...headingProps} subHeading={subHeading || null} />
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
