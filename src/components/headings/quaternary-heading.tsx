import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/clsx";

const headingVariants = cva(
  [
    "font-sans font-semibold text-[1.125rem] leading-tight tracking-normal md:text-[1.25rem]  lg:text-[1.375rem] 3xl:text-[1.625rem]",
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
  extends VariantProps<typeof headingVariants>,
    ComponentPropsWithoutRef<"h5"> {}

const QuaternaryHeading = forwardRef<HTMLHeadingElement, Props>(
  ({ children, intent, uppercase, alignment, className }, ref): JSX.Element => {
    return (
      <h5
        ref={ref}
        className={cn(
          headingVariants({
            intent,
            uppercase,
            alignment,
            className,
          })
        )}
      >
        {children}
      </h5>
    );
  }
);

QuaternaryHeading.displayName = "QuaternaryHeading";

export type { Props as QuaternaryHeadingType };
export { QuaternaryHeading };
