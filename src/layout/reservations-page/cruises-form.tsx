import { useContext } from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";
import { m } from "framer-motion";
import Link from "next/link";

import { api } from "@utils/api";
import { useZodForm } from "@hooks/useZodForm";
import { NotificationDispatchContext } from "@context/notification";
import { cn } from "@lib/clsx";
import { triggerGTMEvent } from "@lib/gtm";

import { Button } from "@components/button";
import { DatePicker } from "@components/date-picker";
import { Form } from "@components/form";
import { SecondaryHeading } from "@components/headings/secondary-heading";
import { InputField } from "@components/input-field";
import { PaxPicker } from "@components/pax-picker";
import { TextAreaField } from "@components/text-area-field";
import { TimePicker } from "@components/time-picker";

import { fadeIn } from "@styles/animations";
import { cruiseTypes } from "site-data";
import { SelectField } from "@components/select-field";

const cruisesFormSchema = z.object({
  name: z.string({ required_error: "Name is required." }),
  email: z
    .string({ required_error: "Email address is required." })
    .email({ message: "Invalid Email format." }),
  contact: z
    .string({ required_error: "Contact Number is required." })
    .min(10, { message: "Contact number should contain at least 10 digits." }),
  pax: z.object({
    adults: z
      .number({ required_error: "Number of adults is required." })
      .min(1),
    children: z
      .number({ required_error: "Number of adults is required." })
      .min(0),
  }),
  date: z
    .date({ required_error: "The Date is required." })
    .min(new Date(), { message: "The date must be a future date." })
    .nullable(),
  cruiseType: z.enum(cruiseTypes, {
    required_error: "Cruise type is required.",
  }),
  requests: z.optional(z.string()),
});

const CruisesForm: React.FC = (): JSX.Element => {
  const mutation = api.reservations.cruisesInquiry.useMutation();

  const dispatchNotification = useContext(NotificationDispatchContext);

  const form = useZodForm({
    schema: cruisesFormSchema,
    defaultValues: {
      pax: {
        adults: 2,
        children: 0,
      },
    },
  });

  return (
    <m.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
      key="restaurant-form"
      className="grid auto-rows-min grid-cols-1 gap-y-6 mlg:grid-cols-3 "
    >
      <div className="flex h-48 w-full flex-col items-start justify-between rounded-md bg-lightWater px-4 py-4 mlg:col-start-1 mlg:h-full mlg:py-12 lg:px-9">
        <Link
          href="/reservations"
          className="flex items-center justify-start gap-x-2 rounded-md border-2 border-water bg-water fill-white px-2 py-3 font-sans text-sm font-semibold text-white transition-colors duration-200 hover:bg-transparent hover:fill-water hover:text-water"
        >
          <svg className="h-2 w-7 rotate-180 transform">
            <use xlinkHref="/assets/svg/sprites.svg#arrow-right-long" />
          </svg>
          Back to Selection
        </Link>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-black-600">
            Reserve
          </span>
          <SecondaryHeading alignment="left" intent="secondary">
            A Cruise
          </SecondaryHeading>
        </div>
      </div>
      <div className="w-full mlg:col-span-2 mlg:col-start-2 mlg:py-6 mlg:pl-9 mlg:pr-0">
        <div className="w-full">
          <Form
            form={form}
            onSubmit={async (data) => {
              try {
                const response = await mutation.mutateAsync({
                  ...data,

                  date: (data.date as Date).toISOString(),
                });

                if (response.status === "success") {
                  triggerGTMEvent("restaurant-form-submission", {
                    name: data.name,
                    email: data.email,
                    phone: data.contact,
                  });

                  dispatchNotification({
                    title: "Success!",
                    message: "Inquiry successfully submitted",
                  });

                  form.reset();
                } else {
                  dispatchNotification({
                    title: "Something went wrong!",
                    message: response.message,
                    type: "error",
                  });
                }
              } catch (error: unknown) {
                dispatchNotification({
                  title: "Something went wrong!",
                  message: "An error occurred while submitting the inquiry.",
                  type: "error",
                });
              }
            }}
            className={cn(
              "grid auto-rows-min grid-cols-1 gap-6 mlg:grid-cols-2",
              "mlg:[&>*:nth-child(1)]:col-span-2 mlg:[&>*:nth-child(4)]:col-span-2 mlg:[&>*:nth-child(7)]:col-span-2 mlg:[&>*:nth-child(8)]:col-span-2",
              "xl:[&>*:nth-child(1)]:col-span-1 xl:[&>*:nth-child(4)]:col-span-1"
            )}
          >
            <InputField
              type="text"
              {...form.register("name")}
              placeholder="Jane Doe"
              label="Name"
              required
            />
            <InputField
              type="email"
              {...form.register("email")}
              placeholder="janedoe@smaple.com"
              label="Email Address"
              required
            />
            <InputField
              type="tel"
              {...form.register("contact")}
              placeholder="+94 11 234 5678"
              label="Contact Number"
              required
            />
            <Controller
              control={form.control}
              name="pax"
              render={({
                field: { value, name, onChange },
                formState: { errors },
              }) => (
                <PaxPicker
                  value={value}
                  onPaxChange={onChange}
                  name={name}
                  label="No of Guests"
                  intent="black"
                  error={errors.pax?.message}
                  required
                />
              )}
            />
            <Controller
              control={form.control}
              name="date"
              render={({
                field: { name, onChange, value },
                formState: { errors },
              }) => (
                <DatePicker
                  label="Date"
                  name={name}
                  minDate={new Date()}
                  value={value}
                  error={errors.date?.message}
                  onDateChange={onChange}
                  required
                />
              )}
            />
            <Controller
              control={form.control}
              name="cruiseType"
              render={({
                field: { name, onChange, value },
                formState: { errors },
              }) => (
                <SelectField
                  label="Cruise Type"
                  name={name}
                  value={value}
                  onValueChange={onChange}
                  error={errors.cruiseType?.message}
                  options={cruiseTypes as unknown as string[]}
                  intent="black"
                  placeholder="Select your preferred cruise type"
                />
              )}
            />

            <TextAreaField
              {...form.register("requests")}
              label="Special Requests"
              placeholder="Your Request"
              intent="black"
            />

            <Button
              type="submit"
              intent="primary"
              fullWidth
              loading={form.formState.isSubmitting}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </m.div>
  );
};

export { CruisesForm };