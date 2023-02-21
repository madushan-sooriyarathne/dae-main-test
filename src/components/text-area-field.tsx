import { forwardRef, type ComponentProps } from "react";
import { useFormContext } from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/clsx";

const inputFieldVariants = cva(
  [
    "block w-full resize-y min-h-[9.375rem] lg:min-h-[12.5rem] rounded-sm border bg-transparent px-2 py-3 font-sans text-base font-normal outline-none placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-white-400  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:outline-none disabled:cursor-not-allowed",
  ],
  {
    variants: {
      intent: {
        white:
          "text-white border-white placeholder:text-white-700 focus-visible:outline-white disabled:text-white-400 disabled:border-white-400 disabled:placeholder:text-white-400",
        black:
          "text-black border-black-900 placeholder:text-black-800 focus-visible:outline-black disabled:text-black-500 disabled:border-black-500 disabled:placeholder:text-black-500",
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
  extends ComponentProps<"textarea">,
    VariantProps<typeof inputFieldVariants>,
    Omit<VariantProps<typeof inputLabelVariants>, "disabled"> {
  name: string;
  label?: string;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, Props>(
  (props, ref): JSX.Element => {
    const form = useFormContext();
    const state = form.getFieldState(props.name);

    return (
      <div className="flex w-full flex-col items-start justify-start gap-y-1">
        {props.label && (
          <label
            htmlFor={props.name}
            className={cn(
              inputLabelVariants({
                intent: props.intent,
                disabled: props.disabled,
              })
            )}
          >
            {props.label}
            {props.required && (
              <svg className="ml-1 inline h-2 w-2 fill-primary">
                <use xlinkHref="/assets/svg/sprites.svg#icon-asterisk" />
              </svg>
            )}
          </label>
        )}
        <textarea
          {...props}
          ref={ref}
          id={props.name}
          className={inputFieldVariants({
            intent: props.intent,
          })}
        />
        {state.error && (
          <p
            className={cn(
              "block text-left font-sans text-xs font-medium text-primary",
              { "text-primary-400": props.disabled }
            )}
          >
            {state.error?.message}
          </p>
        )}
      </div>
    );
  }
);
TextAreaField.displayName = "TextAreaField";

export { TextAreaField };
