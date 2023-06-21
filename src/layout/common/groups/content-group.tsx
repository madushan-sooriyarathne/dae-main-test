import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Button, type ButtonType } from "@components/button";
import {
  DisplayHeading,
  type DisplayHeadingType,
} from "@components/headings/display-heading";
import {
  PrimaryHeading,
  type PrimaryHeadingType,
} from "@components/headings/primary-heading";
import { Paragraph } from "@components/paragraph";

const contentWrapper = cva(
  ["w-full flex flex-col justify-start gap-y-6 lg:gap-x-8"],
  {
    variants: {
      alignment: {
        left: "items-start",
        center: "items-center",
        right: "items-end",
      },
    },
  }
);

interface Props
  extends VariantProps<typeof contentWrapper>,
    Omit<PrimaryHeadingType, "children">,
    Omit<DisplayHeadingType, "children"> {
  content: string;
  heading: string;
  displayHeading?: true;
  button?: ButtonType;
  otherNodes?: ReactNode;
}

const ContentGroup: React.FC<Props> = ({
  content,
  otherNodes,
  alignment = "left",
  button,
  heading,
  displayHeading,
  intent,
}: Props): JSX.Element => {
  return (
    <div className={contentWrapper({ alignment })}>
      {displayHeading ? (
        <DisplayHeading alignment={alignment} intent={intent}>
          {heading}
        </DisplayHeading>
      ) : (
        <PrimaryHeading alignment={alignment} intent={intent}>
          {heading}
        </PrimaryHeading>
      )}

      <Paragraph alignment={alignment} intent={intent}>
        {content}
      </Paragraph>
      {otherNodes && otherNodes}
      {button && <Button intent={intent} {...button} />}
    </div>
  );
};

export { ContentGroup };
export type { Props as ContentGroupType };
