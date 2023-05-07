import { useContext } from "react";
import { Controller } from "react-hook-form";
import Link from "next/link";
import { m } from "framer-motion";
import { eventTypes } from "site-data";
import { z } from "zod";

import { cn } from "@lib/clsx";
import { triggerGTMEvent } from "@lib/gtm";

import { useZodForm } from "@hooks/useZodForm";
import { NotificationDispatchContext } from "@context/notification";
import { api } from "@utils/api";

import { Button } from "@components/button";
import { DatePicker } from "@components/date-picker";
import { Form } from "@components/form";
import { SecondaryHeading } from "@components/headings/secondary-heading";
import { InputField } from "@components/input-field";
import { PaxPicker } from "@components/pax-picker";
import { SelectField } from "@components/select-field";
import { TextAreaField } from "@components/text-area-field";

import { fadeIn } from "@styles/animations";

const eventsFormSchema = z.object({
  name: z.string({ required_error: "Name is required." }),
  email: z
    .string({ required_error: "Email address is required." })
    .email({ message: "Invalid Email format." }),
  contact: z
    .string({ required_error: "Contact Number is required." })
    .min(10, { message: "Contact number should contain at least 10 digits." }),
  eventType: z.enum(eventTypes, {
    required_error: "A event type must be selected.",
  }),
  date: z
    .date({ required_error: "The Date is required." })
    .min(new Date(), { message: "The date must be a future date." })
    .nullable(),
  pax: z.object({
    adults: z
      .number({ required_error: "Number of adults is required." })
      .min(1),
    children: z
      .number({ required_error: "Number of adults is required." })
      .min(0),
  }),
  requests: z.optional(z.string()),
});

const EventsForm: React.FC = (): JSX.Element => {
  const mutation = api.inquiries.eventsInquiry.useMutation();

  const dispatchNotification = useContext(NotificationDispatchContext);

  const form = useZodForm({
    schema: eventsFormSchema,
    defaultValues: {
      pax: {
        adults: 2,
        children: 0,
      },
    },
  });

  return (
    <m.div
      key="events-form"
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
      className="grid auto-rows-min grid-cols-1 gap-y-6 mlg:grid-cols-3 "
    >
      <div className="flex h-48 w-full flex-col items-start justify-between rounded-md bg-lightWater px-4 py-4 mlg:col-start-1 mlg:h-full mlg:py-12 lg:px-9">
        <Link
          href="/inquiries"
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
            Events
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
                  triggerGTMEvent("event-form-submission", {
                    name: data.name,
                    email: data.email,
                    phone: data.contact,
                    eventType: data.eventType,
                  });

                  dispatchNotification({
                    title: "Success!",
                    message: "Inquiry successfully submitted.",
                  });
                  form.reset();
                } else {
                  dispatchNotification({
                    title: "Something went wrong!",
                    message:
                      "An error occurred while submitting your inquiry. Please try again later.",
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
              name="eventType"
              render={({
                field: { name, onChange, value },
                formState: { errors },
              }) => (
                <SelectField
                  name={name}
                  onValueChange={onChange}
                  value={value}
                  label="Event Type"
                  intent="black"
                  error={errors.eventType?.message}
                  placeholder="Select a preferred event type"
                  options={eventTypes as unknown as string[]}
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

export { EventsForm };
