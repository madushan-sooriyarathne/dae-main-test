import type { ComponentProps } from "react";
import {
  FormProvider,
  type FieldValues,
  type UseFormReturn,
  type SubmitHandler,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props<T extends FieldValues>
  extends Omit<ComponentProps<"form">, "onSubmit"> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  className?: string;
}

const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  ...props
}: Props<T>) => (
  <FormProvider {...form}>
    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
    <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
      <fieldset
        disabled={form.formState.isSubmitting}
        className={twMerge("flex flex-col gap-y-6", className)}
      >
        {children}
      </fieldset>
    </form>
  </FormProvider>
);

export default Form;
