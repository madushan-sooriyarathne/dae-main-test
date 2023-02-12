import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

import { cva, type VariantProps } from "class-variance-authority";

import type { ComponentProps } from "react";
import { cn } from "@lib/clsx";

const inputField = cva(
  [
    "block w-full rounded-sm border bg-transparent px-2 py-3 font-sans text-sm  lg:text-base font-normal outline-none placeholder:font-sans placeholder:text-sm lg:placeholder:text-base placeholder:font-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
  ],
  {
    variants: {
      intent: {
        white:
          "text-white border-white placeholder:text-white-700 focus-visible:outline-white",
        black:
          "text-black border-black-900 placeholder:text-black-400 focus-visible:outline-black",
      },
    },
    defaultVariants: {
      intent: "black",
    },
  }
);

interface Props
  extends ComponentProps<"input">,
    VariantProps<typeof inputField> {
  name: string;
  label?: string;
}

const InputField = forwardRef<HTMLInputElement, Props>(
  (props, ref): JSX.Element => {
    const form = useFormContext();
    const state = form.getFieldState(props.name);

    return (
      <div className="flex flex-col items-start justify-start gap-y-1">
        {props.label && (
          <label
            htmlFor={props.name}
            className={cn(
              "block text-sm font-semibold tracking-wider",
              props.intent === "white" ? "text-white" : "text-black"
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
        <input
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
InputField.displayName = "InputField";

export { InputField };
