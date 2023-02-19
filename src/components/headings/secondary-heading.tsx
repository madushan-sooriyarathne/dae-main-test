import { cva, type VariantProps } from "class-variance-authority";

const heading = cva(
  [
    "font-sans font-semibold text-[1.75rem] leading-tight tracking-normal md:text-[2rem] md:font-bold lg:text-[2.25rem] 3xl:text-[2.5rem]",
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

const SecondaryHeading: React.FC<Props> = ({
  children,
  intent,
  uppercase,
  alignment,
  className,
}: Props): JSX.Element => {
  return (
    <h3 className={heading({ intent, uppercase, alignment, className })}>
      {children}
    </h3>
  );
};

export type { Props as SecondaryHeadingType };
export { SecondaryHeading };
