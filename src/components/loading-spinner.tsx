import { cva, type VariantProps } from "cva";

const spinnerVariants = cva(
  "mx-auto h-12 w-12 animate-spin rounded-full border-2 border-white-600  bg-transparent",
  {
    variants: {
      intent: {
        primary: "border-b-primary",
        secondary: "border-b-water",
        tertiary: "border-b-land",
        black: "border-b-black",
        white: "border-b-white",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

const messageVariants = cva(
  "font-sans text-lg text-center font-semibold tracking-wide",
  {
    variants: {
      intent: {
        primary: "text-primary",
        secondary: "text-water",
        tertiary: "text-land",
        black: "text-black",
        white: "text-white",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

interface Props
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof messageVariants> {
  message?: string;
}

const LoadingSpinner: React.FC<Props> = ({ message, intent }): JSX.Element => {
  return (
    <div className="mx-auto flex w-[min(37.5rem,_100%)] flex-col items-center justify-center gap-y-6">
      <div className={spinnerVariants({ intent })} />
      {message && (
        <span className={messageVariants({ intent })}>{message}</span>
      )}
    </div>
  );
};

export { LoadingSpinner };
