import { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, m } from "framer-motion";

import { cn } from "@lib/clsx";

import { clamp } from "@utils/base";

import { OutsideClickHandler } from "@components/outside-click-handler";

import { fadeInBottom } from "@styles/animations";

const fieldVariants = cva(
  [
    "w-full flex items-center justify-start rounded-sm border bg-transparent px-2 py-3 font-sans text-sm  lg:text-base font-normal outline-none placeholder:font-sans placeholder:text-sm lg:placeholder:text-base placeholder:font-normal placeholder:text-white-400  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:outline-none disabled:cursor-not-allowed",
  ],
  {
    variants: {
      intent: {
        white:
          "border-white text-white focus-visible:outline-white disabled:text-white-400 disabled:border-white-400 ",
        black:
          "text-black border-black-900 focus-visible:outline-black disabled:text-black-500 disabled:border-black-500",
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
  extends VariantProps<typeof fieldVariants>,
    VariantProps<typeof inputLabelVariants> {
  onTimeChange: (time: {
    hour: number;
    mins: number;
    meridiem: "AM" | "PM";
  }) => void;
  value: {
    hour: number;
    mins: number;
    meridiem: "AM" | "PM";
  };
  label: string;
  name: string;
  error?: string;
  required?: boolean;
}

const TimePicker: React.FC<Props> = ({
  onTimeChange,
  value,
  intent,
  label,
  name,
  disabled,
  error,
  required,
}: Props): JSX.Element => {
  console.log(value);

  const [portalOpen, setPortalOpen] = useState<boolean>(false);

  const togglePortal = () => setPortalOpen((prev) => !prev);

  return (
    <div className="flex flex-col items-start justify-start gap-y-1">
      {label && (
        <label
          htmlFor={name}
          className={cn(inputLabelVariants({ intent, disabled }))}
        >
          {label}
          {required && (
            <svg className="ml-1 inline h-2 w-2 fill-primary">
              <use xlinkHref="/assets/svg/sprites.svg#icon-asterisk" />
            </svg>
          )}
        </label>
      )}
      <div className="relative w-full" id="time-picker-portal">
        <button
          id={name}
          type="button"
          role="button"
          disabled={Boolean(disabled)}
          className={fieldVariants({
            intent: intent,
          })}
          onClick={togglePortal}
        >
          <span>{`${value.hour.toString().padStart(2, "0")}:${value.mins
            .toString()
            .padStart(2, "0")} ${value.meridiem}`}</span>
        </button>
        <AnimatePresence>
          <OutsideClickHandler
            id="time-picker-portal"
            onOutsideClick={() => setPortalOpen(false)}
          >
            {portalOpen && (
              <m.div
                className="absolute top-full left-0 z-[200] flex items-center justify-start gap-x-5 rounded-md bg-white-100 p-4 shadow-lg"
                variants={fadeInBottom}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="flex items-center justify-start gap-x-3">
                  <div className="flex flex-col items-center justify-start gap-y-3">
                    <button
                      role="button"
                      type="button"
                      aria-label="Increase Hour by one"
                      onClick={() => {
                        onTimeChange({
                          ...value,
                          hour: clamp(0, 13, value.hour + 1),
                        });
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-black-400 p-2 outline-black-800 transition-colors  duration-200 ease-in-out hover:bg-black-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <svg className="h-5 w-5 fill-black-800">
                        <use xlinkHref="/assets/svg/sprites.svg#icon-plus" />
                      </svg>
                    </button>
                    <input
                      tabIndex={-1}
                      type="text"
                      value={value.hour.toString().padStart(2, "0")}
                      inputMode="numeric"
                      min={0}
                      readOnly
                      placeholder="00"
                      className="w-8 appearance-none border-none bg-transparent text-center font-sans text-base font-medium tracking-wide text-black-900 outline-none"
                    />
                    <button
                      onClick={() => {
                        onTimeChange({
                          ...value,
                          hour: clamp(0, 13, value.hour - 1),
                        });
                      }}
                      className="group flex h-8 w-8 items-center justify-center rounded-full border border-black-400 p-2 outline-black-800  transition-colors duration-200 ease-in-out hover:bg-black-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:border-black-200 disabled:outline-none"
                      role="button"
                      type="button"
                      aria-label="Decrease Hour by one"
                    >
                      <svg className="h-5 w-5 fill-black-800 group-disabled:fill-black-300">
                        <use xlinkHref="/assets/svg/sprites.svg#icon-minus" />
                      </svg>
                    </button>
                  </div>
                  <span>:</span>
                  <div className="flex flex-col items-center justify-start gap-y-3">
                    <button
                      role="button"
                      type="button"
                      aria-label="Increase Minute by one"
                      onClick={() => {
                        onTimeChange({
                          ...value,
                          mins: clamp(0, 60, value.mins + 1),
                        });
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-black-400 p-2 outline-black-800 transition-colors  duration-200 ease-in-out hover:bg-black-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <svg className="h-5 w-5 fill-black-800">
                        <use xlinkHref="/assets/svg/sprites.svg#icon-plus" />
                      </svg>
                    </button>
                    <input
                      tabIndex={-1}
                      type="text"
                      value={value.mins.toString().padStart(2, "0")}
                      inputMode="numeric"
                      min={0}
                      readOnly
                      placeholder="00"
                      className="w-8 appearance-none border-none bg-transparent text-center font-sans text-base font-medium tracking-wide text-black-900 outline-none"
                    />
                    <button
                      role="button"
                      type="button"
                      aria-label="Decrease Minute by one"
                      onClick={() => {
                        onTimeChange({
                          ...value,
                          mins: clamp(0, 60, value.mins - 1),
                        });
                      }}
                      className="group flex h-8 w-8 items-center justify-center rounded-full border border-black-400 p-2 outline-black-800  transition-colors duration-200 ease-in-out hover:bg-black-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:border-black-200 disabled:outline-none"
                    >
                      <svg className="h-5 w-5 fill-black-800 group-disabled:fill-black-300">
                        <use xlinkHref="/assets/svg/sprites.svg#icon-minus" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-stretch justify-center gap-y-3">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={value.meridiem === "AM"}
                    aria-label="AM Selector"
                    className={cn(
                      "rounded-sm border border-black px-4 py-2 font-sans text-sm font-bold uppercase tracking-wider transition-colors duration-200",
                      { "bg-black text-white": value.meridiem === "AM" }
                    )}
                    onClick={() => {
                      onTimeChange({ ...value, meridiem: "AM" });
                    }}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={value.meridiem === "PM"}
                    aria-label="PM Selector"
                    className={cn(
                      "rounded-sm border border-black px-4 py-2 font-sans text-sm font-bold uppercase tracking-wider transition-colors duration-200",
                      { "bg-black text-white": value.meridiem === "PM" }
                    )}
                    onClick={() => {
                      onTimeChange({ ...value, meridiem: "PM" });
                    }}
                  >
                    PM
                  </button>
                </div>
              </m.div>
            )}
          </OutsideClickHandler>
        </AnimatePresence>
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

export { TimePicker };
