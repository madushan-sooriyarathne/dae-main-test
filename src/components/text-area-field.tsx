import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

import { cva, type VariantProps } from "cva";

import type { ComponentProps } from "react";

const inputField = cva(
  [
    "block w-full resize-y min-h-[9.375rem] lg:min-h-[12.5rem] rounded-sm border bg-transparent px-2 py-3 font-sans text-base font-normal outline-none placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-white-400  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
  ],
  {
    variants: {
      intent: {
        white:
          "text-white border-white placeholder:text-white-700 focus-visible:outline-white",
        black:
          "text-black border-black-900 placeholder:text-black-800 focus-visible:outline-black",
      },
    },
    defaultVariants: {
      intent: "black",
    },
  }
);

interface Props
  extends ComponentProps<"textarea">,
    VariantProps<typeof inputField> {
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
            className={`block ${
              props.intent === "white" ? "text-white" : "text-black"
            } text-sm font-semibold tracking-wider`}
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
          className={inputField({
            intent: props.intent,
          })}
        />
        {state.error && (
          <p className="block text-left font-sans text-xs font-medium text-primary">
            {state.error?.message}
          </p>
        )}
      </div>
    );
  }
);
TextAreaField.displayName = "TextAreaField";

export { TextAreaField };
