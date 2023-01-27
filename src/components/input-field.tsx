import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

import { cva, VariantProps } from "cva";

import type { ComponentProps } from "react";

const inputField = cva(
  [
    "block w-full rounded-sm border bg-transparent px-2 py-3 font-sans text-base font-normal outline-none placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-white-400  focus:outline-1 focus:outline-offset-2 focus:outline-white-300",
  ],
  {
    variants: {
      intent: {
        white:
          "text-white border-white placeholder:text-white-700 focus:outline-water-400",
        black:
          "text-black border-black-900 placeholder:text-black-800 focus:outline-water-800",
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

// eslint-disable-next-line react/display-name
const InputField = forwardRef<HTMLInputElement, Props>(
  (props, ref): JSX.Element => {
    const form = useFormContext();
    const state = form.getFieldState(props.name);

    return (
      <div className="flex flex-col items-start justify-start gap-y-1">
        {props.label && (
          <label
            htmlFor={props.name}
            className={`block ${
              props.intent === "white" ? "text-white" : "text-black"
            } text-sm font-semibold tracking-wider`}
          >
            {props.label}
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

export { InputField };
