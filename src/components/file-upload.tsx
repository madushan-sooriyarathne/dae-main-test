import { useRef, type ChangeEvent } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/clsx";

const inputFieldVariants = cva(
  [
    "flex items-center justify-start gap-x-2 rounded-sm border bg-transparent px-2 py-3 font-sans text-sm lg:text-base font-normal outline-none placeholder:font-sans [&>p]:text-sm lg:[&>p]:text-base [&>p]:font-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
  ],
  {
    variants: {
      intent: {
        white:
          "text-white border-white [&>p]:text-white-700 focus-visible:outline-white [&>svg]:fill-white-700",
        black:
          "text-black border-black-900 [&>p]:text-black-400 focus-visible:outline-black [&>svg]:fill-black-400",
      },

      disabled: {
        true: "outline-none cursor-not-allowed",
      },
      selected: {
        true: "",
      },
    },
    compoundVariants: [
      {
        intent: "white",
        disabled: true,
        className:
          "border-white-400 [&>p]:text-white-400 text-white-400 [&>svg]:fill-white-400",
      },
      {
        intent: "black",
        disabled: true,
        className:
          "text-black-500 [&>p]:text-black-500 border-black-500 [&>svg]:fill-black-500",
      },
      { intent: "white", selected: true, className: "bg-black-800" },
      { intent: "black", selected: true, className: "bg-white-100" },
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

interface Props
  extends VariantProps<typeof inputFieldVariants>,
    VariantProps<typeof inputLabelVariants> {
  value: File | null | undefined;
  onValueChange: (file: File | null) => void;
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  acceptedTypes?: string;
}

const FileUploadField: React.FC<Props> = ({
  value,
  onValueChange,
  label,
  intent,
  disabled,
  placeholder,
  name,
  error,
  required,
  acceptedTypes = "application/pdf, .doc, docx, .jpg",
}: Props): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onValueChange(event.target.files.item(0));
    } else {
      onValueChange(null);
    }
  };

  const handleClear = () => {
    if (inputRef.current?.files) {
      inputRef.current.value = "";
    }
    onValueChange(null);
  };

  return (
    <div className="flex flex-col items-start justify-start gap-y-1 @container">
      <label
        htmlFor={name}
        className={inputLabelVariants({ disabled, intent })}
      >
        {label}

        {required && (
          <svg className="ml-1 inline h-2 w-2 fill-primary">
            <use xlinkHref="/assets/svg/sprites.svg#icon-asterisk" />
          </svg>
        )}
      </label>

      <div className="flex flex-col items-start justify-start gap-y-3 gap-x-3 @sm:flex-row @sm:items-center @sm:justify-start ">
        <label
          htmlFor={name}
          className="flex flex-col items-start justify-start gap-y-1"
        >
          <input
            ref={inputRef}
            style={{ display: "none" }}
            type="file"
            id={name}
            name={name}
            onChange={handleFileChange}
            accept={acceptedTypes}
          />
          <div
            className={inputFieldVariants({
              intent,
              disabled,
              selected: value ? true : false,
            })}
          >
            <svg className="h-4 w-4 fill-black-700">
              <use xlinkHref="/assets/svg/sprites.svg#icon-upload" />
            </svg>
            <p className="font-sans text-sm text-black-600 lg:text-base ">
              {placeholder || label}
            </p>
          </div>
        </label>
        {value && (
          <div className="flex items-center justify-start gap-x-2 border border-black-500 bg-black-100 px-3 py-2">
            <span className="font-sans text-sm text-black-700">
              {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
              {`${value.name.slice(0, 10)}....${value.name
                .split(".")
                .slice(-1)}`}
            </span>
            <svg className="h-4 w-4 fill-danger" onClick={handleClear}>
              <use xlinkHref="/assets/svg/sprites.svg#icon-close" />
            </svg>
          </div>
        )}
        <div></div>
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

export { FileUploadField };
