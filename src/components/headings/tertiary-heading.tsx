import { cva } from "cva";

import type { VariantProps } from "cva";

const heading = cva(
  [
    "font-sans font-semibold text-[1.375rem] leading-tight tracking-normal md:text-[1.625rem] md:font-bold lg:text-[1.75rem] 3xl:text-[2rem]",
  ],
  {
    variants: {
      intent: {
        primary: "text-primary",
        secondary: "text-water",
        tertiary: "text-land",
        white: "text-white",
        black: "text-black",
      },
      alignment: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      uppercase: {
        true: "uppercase",
      },
    },
    defaultVariants: {
      intent: "primary",
      alignment: "left",
      uppercase: false,
    },
  }
);

interface Props extends VariantProps<typeof heading> {
  children: string;
  className?: string;
}

const TertiaryHeading: React.FC<Props> = ({
  children,
  intent,
  uppercase,
  alignment,
  className,
}: Props): JSX.Element => {
  return (
    <h4 className={heading({ intent, uppercase, alignment, className })}>
      {children}
    </h4>
  );
};

export type { Props as TertiaryHeadingType };
export { TertiaryHeading };
