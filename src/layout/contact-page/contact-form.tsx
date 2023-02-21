import { useContext } from "react";
import { Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import { z } from "zod";

import { triggerGTMEvent } from "@lib/gtm";

import { useZodForm } from "@hooks/useZodForm";
import { NotificationDispatchContext } from "@context/notification";
import { api } from "@utils/api";

import type { ImageContentSectionType } from "@layout/common/image-content-section";

import { Button } from "@components/button";
import { Form } from "@components/form";
import { PrimaryHeading } from "@components/headings/primary-heading";
import { ImageComponent } from "@components/image-component";
import { InputField } from "@components/input-field";
import { Paragraph } from "@components/paragraph";
import { TextAreaField } from "@components/text-area-field";

const SelectField = dynamic(
  () => import("@components/select-field").then((mod) => mod.SelectField),
  { ssr: false }
);

const contactFormSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
      required_error: "Name is required.",
    })
    .min(2, { message: "Name must be more than 2 characters." })
    .max(100, { message: "Name must be less than 100 characters." }),
  contactNumber: z
    .string({ required_error: "Contact number is required." })
    .min(2),
  email: z
    .string({ required_error: "Email address is required." })
    .email({ message: "Incorrect email format" }),
  interest: z.optional(z.string()),
  message: z.optional(z.string()),
});

const ContactForm: React.FC<ImageContentSectionType> = ({
  heading,
  content,
  image,
}): JSX.Element => {
  const form = useZodForm({ schema: contactFormSchema });

  const notificationDispatch = useContext(NotificationDispatchContext);
  const mutation = api.contact.contactInquiry.useMutation();

  return (
    <section className="trim-bottom lg:main-grid-columns grid auto-rows-min grid-cols-1 bg-water">
      <div className="aspect-square md:aspect-video lg:col-full-end-half lg:row-start-1 lg:aspect-auto lg:h-full">
        <ImageComponent image={image} sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>
      <div className="flex flex-col items-start justify-start gap-y-9 py-8 px-4 md:py-12 md:px-8 lg:col-full-start-half lg:row-start-1 lg:px-8 xl:py-16 xl:!px-16 2xl:py-18">
        <div className="flex flex-col items-start justify-start gap-y-2">
          <PrimaryHeading alignment="left" intent="white">
            {heading}
          </PrimaryHeading>
          <Paragraph alignment="left" intent="white">
            {content}
          </Paragraph>
        </div>
        <Form
          form={form}
          onSubmit={async (data) => {
            try {
              const response = await mutation.mutateAsync({
                name: data.name,
                email: data.email,
                contact: data.contactNumber,
                message: data.message || "Not Provided",
              });

              if (response.status === "success") {
                triggerGTMEvent("contact-form-submission", {
                  name: data.name,
                  email: data.email,
                  phone: data.contactNumber,
                });

                notificationDispatch({
                  title: "Success!",
                  message: "Inquiry successfully submitted.",
                });

                form.reset();
              } else {
                notificationDispatch({
                  title: "Something went wrong!",
                  message: response.message,
                  type: "error",
                });
              }
            } catch (error: unknown) {
              notificationDispatch({
                title: "Something went wrong!",
                message: "An error occurred while submitting the inquiry.",
                type: "error",
              });
            }
          }}
          className="grid w-full auto-rows-min grid-cols-1 gap-y-3 gap-x-3 md:grid-cols-2 md:[&>*:nth-child(5)]:col-span-2"
        >
          <InputField
            label="Full Name"
            placeholder="John Doe"
            type="text"
            intent="white"
            {...form.register("name")}
            required
            aria-required
          />
          <InputField
            label="Contact Number"
            placeholder="+94 77 123 4567"
            type="tel"
            intent="white"
            {...form.register("contactNumber")}
            required
            aria-required
          />
          <InputField
            label="Email Address"
            placeholder="johndoe@sample.com"
            type="email"
            intent="white"
            {...form.register("email")}
            required
            aria-required
          />
          <Controller
            control={form.control}
            name="interest"
            render={({
              field: { name, onChange, value },
              formState: { errors },
            }) => (
              <SelectField
                options={["Water Sports", "Restaurant"]}
                onValueChange={onChange}
                value={value}
                name={name}
                label="Reason"
                placeholder="I'm Interested in"
                intent="white"
                error={errors.interest?.message}
              />
            )}
          />

          <TextAreaField
            label="Message"
            intent="white"
            {...form.register("message")}
          />
          <div className="md:col-start-2 md:row-start-4 md:justify-self-end ">
            <Button
              type="submit"
              intent="white"
              loading={form.formState.isSubmitting}
              fullWidth
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export { ContactForm };
