import { cva, type VariantProps } from "class-variance-authority";

const heading = cva(
  [
    "font-sans font-semibold text-[2.625rem] leading-tight -tracking-tight md:text-[3rem] md:font-bold lg:text-[3.5rem] 3xl:text-[4rem]",
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
}

const DisplayHeading: React.FC<Props> = ({
  children,
  intent,
  uppercase,
  alignment,
}: Props): JSX.Element => {
  return (
    <h1 className={heading({ intent, uppercase, alignment })}>{children}</h1>
  );
};

export type { Props as DisplayHeadingType };
export { DisplayHeading };
