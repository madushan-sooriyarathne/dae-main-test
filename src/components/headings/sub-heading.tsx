import { type ComponentPropsWithRef, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/clsx";

const subHeading = cva(["font-serif italic font-normal tracking-wider"], {
  variants: {
    type: {
      display:
        "text-[1.40625rem] md:text-[1.5625rem] lg:text-[1.75rem] 3xl:text-[2rem]",
      primary:
        "text-[1.25em] md:text-[1.40625rem] lg:text-[1.5625rem] 3xl:text-[1.75rem]",
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

interface Props
  extends VariantProps<typeof subHeading>,
    ComponentPropsWithRef<"span"> {
  children: string;
}

const SubHeading = forwardRef<HTMLSpanElement, Props>(
  ({
    children,
    type,
    intent,
    alignment,
    className,
    ...props
  }: Props): JSX.Element => {
    return (
      <span
        className={cn(subHeading({ type, intent, alignment, className }))}
        {...props}
      >
        {children}
      </span>
    );
  }
);

SubHeading.displayName = "SubHeading";

export type { Props as SubHeadingType };
export { SubHeading };
