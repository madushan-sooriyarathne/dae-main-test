import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const heading = cva(
  [
    "font-sans font-semibold text-[1rem] leading-tight tracking-normal md:text-[1.125rem] 3xl:text-[1.25rem]",
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

interface Props
  extends VariantProps<typeof heading>,
    ComponentPropsWithoutRef<"h6"> {}

const QuinaryHeading = forwardRef<HTMLHeadingElement, Props>(
  (
    { children, intent, uppercase, alignment, className, ...props },
    ref
  ): JSX.Element => {
    return (
      <h6
        className={heading({ intent, uppercase, alignment, className })}
        ref={ref}
        {...props}
      >
        {children}
      </h6>
    );
  }
);

QuinaryHeading.displayName = "QuinaryHeading";

export type { Props as QuinaryHeadingType };
export { QuinaryHeading };
