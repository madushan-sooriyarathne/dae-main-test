import { cva } from "class-variance-authority";

import { DisplayHeading } from "@components/headings/display-heading";
import { PrimaryHeading } from "@components/headings/primary-heading";
import { SubHeading } from "@components/headings/sub-heading";

import type { PrimaryHeadingType } from "@components/headings/primary-heading";
import type { VariantProps } from "class-variance-authority";

const headingWrapper = cva(["w-full flex flex-col justify-start"], {
  variants: {
    alignment: {
      left: "items-start",
      center: "items-center",
      right: "items-end",
    },
  },
});

interface Props
  extends VariantProps<typeof headingWrapper>,
    Omit<PrimaryHeadingType, "children"> {
  heading: string;
  subHeading: string | null;
  displayHeading?: true;
  bottom?: true;
}

const HeadingGroup: React.FC<Props> = ({
  bottom,
  displayHeading,
  alignment,
  heading,
  subHeading,
  intent,
}: Props): JSX.Element => {
  return (
    <div className={headingWrapper({ alignment })}>
      {subHeading && !bottom && (
        <SubHeading
          alignment={alignment}
          intent={intent}
          type={displayHeading ? "display" : "primary"}
        >
          {subHeading}
        </SubHeading>
      )}
      {displayHeading ? (
        <DisplayHeading alignment={alignment} intent={intent}>
          {heading}
        </DisplayHeading>
      ) : (
        <PrimaryHeading alignment={alignment} intent={intent}>
          {heading}
        </PrimaryHeading>
      )}
      {subHeading && bottom && (
        <SubHeading alignment={alignment} intent={intent}>
          {subHeading}
        </SubHeading>
      )}
    </div>
  );
};

export type { Props as HeadingGroupType };
export { HeadingGroup };
