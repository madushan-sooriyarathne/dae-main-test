import { cva } from "cva";

import type { VariantProps } from "cva";

const subHeading = cva(["font-serif italic font-normal tracking-wider"], {
  variants: {
    type: {
      display:
        "text-[1.125rem] md:text-[1.25rem] lg:text-[1.375rem] 3xl:text-[1.625rem]",
      primary:
        "text-[0.9375] md:text-[1rem] lg:text-[1.125] 3xl:text-[1.25rem]",
    },
    intent: {
      primary: "text-black-700",
      secondary: "text-black-700",
      tertiary: "text-black-700",
      black: "text-black-700",
      white: "text-white",
    },
    alignment: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    alignment: "left",
    type: "primary",
    intent: "primary",
  },
});

interface Props extends VariantProps<typeof subHeading> {
  children: string;
}

const SubHeading: React.FC<Props> = ({
  children,
  type,
  intent,
  alignment,
}: Props): JSX.Element => {
  return (
    <span className={subHeading({ type, intent, alignment })}>{children}</span>
  );
};

export type { Props as SubHeadingType };
export { SubHeading };
