import { ComponentPropsWithoutRef, forwardRef, type ReactNode } from "react";

import {
  HeadingGroup,
  type HeadingGroupType,
} from "@layout/common/groups/heading-group";

interface Props extends Omit<HeadingGroupType, "subHeading"> {
  children: ReactNode | ReactNode[];
  subHeading?: string;
}

const TitleContentSection = forwardRef<HTMLElement, Props>(
  ({ children, subHeading, ...headingProps }, ref): JSX.Element => {
    return (
      <section
        className="main-grid-columns grid gap-y-8 lg:gap-y-10 xl:gap-y-12"
        ref={ref}
      >
        <div className="col-content w-full">
          <HeadingGroup {...headingProps} subHeading={subHeading || null} />
        </div>
        <div className="col-content w-full">{children}</div>
      </section>
    );
  }
);

TitleContentSection.displayName = "TitleContentSection";

export { TitleContentSection };
