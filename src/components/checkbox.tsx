import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/clsx";

const checkBoxVariants = cva(
  "col-start-1 flex h-6 w-6 items-center justify-center rounded-md border-2 bg-transparent p-[2px] group",
  {
    variants: {
      intent: {
        black: "border-black disabled:border-black-500 ",
        white: "border-white  disabled:border-white-400 ",
      },
    },
    defaultVariants: {
      intent: "black",
    },
  }
);

const inputLabelVariants = cva("block text-sm font-semibold tracking-wider", {
  variants: {
    intent: {
      black: "text-black",
      white: "text-white",
    },
    disabled: {
      true: "cursor-not-allowed",
    },
  },
  compoundVariants: [
    {
      intent: "black",
      disabled: true,
      className: "text-black-500",
    },
    {
      intent: "white",
      disabled: true,
      className: "text-white-400",
    },
  ],
  defaultVariants: {
    intent: "black",
    disabled: false,
  },
});

interface Props
  extends ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    Omit<VariantProps<typeof inputLabelVariants>, "disabled">,
    VariantProps<typeof checkBoxVariants> {
  required: boolean;
  label: string;
  pressed: boolean;
  name: string;
  onValueChange: (pressed: boolean) => void;
  error?: string;
}

const Checkbox = forwardRef<ElementRef<typeof TogglePrimitive.Root>, Props>(
  (
    {
      required,
      label,
      pressed,
      name,
      error,
      intent = "black",
      onValueChange,
      ...props
    },
    ref
  ) => {
    return (
      <div className="grid w-full auto-rows-min grid-cols-[min-content_1fr] items-center justify-items-start gap-x-2 self-center">
        <TogglePrimitive.Root
          ref={ref}
          {...props}
          id={name.replace(" ", "-")}
          onPressedChange={onValueChange}
          pressed={pressed}
          className={cn(checkBoxVariants({ intent }))}
        >
          {pressed && (
            <div
              className={cn(
                "h-full w-full rounded-[4px]",
                { "bg-black group-disabled:bg-black-500": props.disabled },
                { "bg-white group-disabled:bg-white-400": props.disabled }
              )}
            />
          )}
        </TogglePrimitive.Root>
        <label
          htmlFor={name.replace(" ", "-")}
          className={cn(
            inputLabelVariants({ intent, disabled: props.disabled })
          )}
        >
          {label}
          {required && (
            <svg className="ml-1 inline h-2 w-2 fill-primary">
              <use xlinkHref="/assets/svg/sprites.svg#icon-asterisk" />
            </svg>
          )}
        </label>
        {error && (
          <p
            className={cn(
              "col-span-2 col-start-1 row-start-2 block text-left font-sans text-xs font-medium text-primary",
              { "text-primary-400": props.disabled }
            )}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "CheckBox";

export { Checkbox };
