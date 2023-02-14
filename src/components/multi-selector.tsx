import { useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/clsx";

const selectorVariants = cva(
  "rounded-md border bg-transparent px-3 py-2 font-sans text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:outline-none",
  {
    variants: {
      intent: {
        white:
          "border-white text-white outline-white disabled:border-white-400 disabled:text-white-400 ",
        black:
          "border-black-900 text-black-900 disabled:border-black-500 disabled:text-black-500",
      },
      selected: {
        true: "",
      },
    },
    compoundVariants: [
      {
        intent: "black",
        selected: true,
        className: "bg-black-900 text-white disabled:bg-black-300",
      },
      {
        intent: "white",
        selected: true,
        className: "bg-white text-black-900 disabled:bg-white-200",
      },
    ],
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

// SelectFiled
interface Props
  extends Omit<VariantProps<typeof selectorVariants>, "selected">,
    VariantProps<typeof inputLabelVariants> {
  options: string[];
  label: string;
  name: string;
  value: string[] | undefined;
  error?: string;
  placeholder?: string;
  required?: boolean;
  onValueChange: (val: string[]) => void;
}

const MultiSelectGroup: React.FC<Props> = ({
  label,
  name,
  value,
  error,
  options,
  disabled,
  required,
  intent,
  onValueChange,
}: Props): JSX.Element => {
  const handleSelect = useCallback(
    (option: string) => {
      if (value?.includes(option)) {
        onValueChange(value.filter((val) => val !== option));
      } else {
        if (value) {
          onValueChange([...value, option]);
        } else {
          onValueChange([option]);
        }
      }
    },
    [onValueChange, value]
  );

  return (
    <div className="flex flex-col items-start justify-start gap-y-1">
      <label
        htmlFor={name}
        className={cn(inputLabelVariants({ disabled, intent }))}
      >
        {label}
        {required && (
          <svg className="ml-1 inline h-2 w-2 fill-primary">
            <use xlinkHref="/assets/svg/sprites.svg#icon-asterisk" />
          </svg>
        )}
      </label>
      <div className="flex flex-row flex-wrap items-center justify-start gap-2">
        {options.map((option) => (
          <button
            type="button"
            role="radio"
            disabled={Boolean(disabled)}
            aria-checked={value?.includes(option)}
            key={option.replace(" ", "-")}
            onClick={() => handleSelect(option)}
            className={cn(
              selectorVariants({
                intent,
                selected: value?.includes(option),
              })
            )}
          >
            {option}
          </button>
        ))}
      </div>
      {error && (
        <p
          className={cn(
            "block text-left font-sans text-xs font-medium text-primary",
            { "text-primary-400": disabled }
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export { MultiSelectGroup };
