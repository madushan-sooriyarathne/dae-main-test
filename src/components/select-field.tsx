import * as SelectPrimitive from "@radix-ui/react-select";

import { cn } from "@lib/clsx";
import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChangeHandler } from "react-hook-form";

// Root
const Select = SelectPrimitive.Root;

// Trigger
const triggerVariants = cva(
  [
    "flex items-center min-h-[50px] justify-between gap-x-2 placeholder:text-base border w-full rounded-sm bg-transparent px-2 py-2 font-sans text-base font-normal outline-none focus:outline focus:outline-2 outline-offset-2 placeholder:font-normal placeholder:font-sans ",
  ],
  {
    variants: {
      intent: {
        white:
          "border-white text-white placeholder:text-white focus:outline-white data-[placeholder]:text-white-700",
        black:
          "text-black border-black-900 placeholder:text-black-800 focus:outline-black-800 data-[placeholder]:text-black-400",
      },
    },
    defaultVariants: {
      intent: "white",
    },
  }
);

interface TriggerProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof triggerVariants> {
  placeholder?: string;
}

const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  TriggerProps
>(({ className, children, placeholder, intent, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(triggerVariants({ intent }), className)}
    {...props}
  >
    <SelectPrimitive.Value placeholder={placeholder}>
      {children}
    </SelectPrimitive.Value>
    <svg className="h-4 w-4 fill-black-400">
      <use xlinkHref="/assets/svg/sprites.svg#icon-chevron-down" />
    </svg>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

// Content Wrapper
const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal container={document.getElementById("app")}>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "animate-in relative z-50 mx-4 min-w-[8rem] overflow-hidden rounded-sm border border-black-300 bg-white text-black-800 shadow-md",
        className
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className=" p-1">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

// Option Item
const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 font-sans text-base font-medium outline-none transition-colors hover:bg-white-100 focus:bg-black-200 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <svg className="h-4 w-4 fill-black-600">
          <use xlinkHref="/assets/svg/sprites.svg#icon-check" />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

// SelectFiled
interface Props extends ComponentPropsWithoutRef<typeof SelectTrigger> {
  options: string[];
  label: string;
  name: string;
  value: string | undefined;
  error?: string;
  placeholder?: string;
  required?: boolean;
  onValueChange: (val: string) => void;
}

const SelectField: React.FC<Props> = ({
  label,
  name,
  intent,
  value,
  error,
  placeholder,
  options,
  required,
  onValueChange,
}: Props): JSX.Element => {
  return (
    <div className="flex flex-col items-start justify-start gap-y-1">
      <label
        htmlFor={name}
        className={`block ${
          intent === "white" ? "text-white" : "text-black"
        } text-sm font-semibold tracking-wider`}
      >
        {label}
        {required && (
          <svg className="ml-1 inline h-2 w-2 fill-primary">
            <use xlinkHref="/assets/svg/sprites.svg#icon-asterisk" />
          </svg>
        )}
      </label>
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger placeholder={placeholder} intent={intent} />
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.toLowerCase().replace(" ", "-")}
              value={option}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="block text-left font-sans text-xs font-medium text-primary">
          {error}
        </p>
      )}
    </div>
  );
};

export { SelectField };

export { Select, SelectTrigger, SelectContent, SelectItem };
