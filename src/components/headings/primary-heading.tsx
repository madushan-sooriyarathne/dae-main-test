import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/clsx";

const heading = cva(
  [
    "font-sans font-semibold text-[2.125rem] leading-tight tracking-normal md:text-[2.375rem] lg:font-medium lg:text-[2.75rem] 3xl:text-[3rem]",
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
    ComponentPropsWithoutRef<"h2"> {
  children: string;
  className?: string;
}

const PrimaryHeading = forwardRef<HTMLHeadingElement, Props>(
  (
    { children, intent, uppercase, alignment, className, ...props },
    ref
  ): JSX.Element => {
    return (
      <h2
        ref={ref}
        className={cn(
          heading({
            intent,
            uppercase,
            alignment,
            className,
          })
        )}
        {...props}
      >
        {children}
      </h2>
    );
  }
);

PrimaryHeading.displayName = "PrimaryHeading";

export type { Props as PrimaryHeadingType };
export { PrimaryHeading };
