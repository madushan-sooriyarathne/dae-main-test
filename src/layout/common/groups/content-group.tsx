import { cva } from "class-variance-authority";

import { HeadingGroup } from "@layout/common/groups/heading-group";

import { Button } from "@components/button";
import { Paragraph } from "@components/paragraph";

import type { ButtonType } from "@components/button";
import type { HeadingGroupType } from "@layout/common/groups/heading-group";
import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

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

interface Props extends VariantProps<typeof contentWrapper>, HeadingGroupType {
  content: string;
  button?: ButtonType;
  otherNodes?: ReactNode;
}

const ContentGroup: React.FC<Props> = ({
  content,
  otherNodes,
  alignment = "left",
  bottom,
  button,
  heading,
  subHeading,
  displayHeading,
  intent,
}: Props): JSX.Element => {
  return (
    <div className={contentWrapper({ alignment })}>
      <HeadingGroup
        alignment={alignment}
        bottom={bottom}
        displayHeading={displayHeading}
        heading={heading}
        subHeading={subHeading}
        intent={intent}
      />
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
