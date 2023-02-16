import { z } from "zod";

import { useZodForm } from "@hooks/useZodForm";

import { Button } from "@components/button";
import { Form } from "@components/form";
import { InputField } from "@components/input-field";
import { Paragraph } from "@components/paragraph";

import { HeadingGroup } from "./groups/heading-group";
import { triggerGTMEvent } from "@lib/gtm";
import { api } from "@utils/api";
import { useContext } from "react";
import { NotificationDispatchContext } from "@context/notification";

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3, "Name must contain at least 3 characters"),
  phone: z.string().min(10),
});

const ContactFormSection: React.FC = (): JSX.Element => {
  const form = useZodForm({ schema: formSchema });
  const dispatchNotification = useContext(NotificationDispatchContext);

  const mutation = api.contact.contactInquiry.useMutation();

  return (
    <div className="main-grid-columns  grid bg-water  py-12 md:bg-contain md:py-16 lg:py-18 xl:py-24 2xl:py-32">
      <div className="col-content mx-auto flex w-[min(100%,_42.5rem)] flex-col items-stretch justify-start gap-y-9 ">
        <HeadingGroup
          heading="Have Any Questions?"
          subHeading="Reach out to us"
          intent="white"
          alignment="center"
          bottom
        />
        <Form
          form={form}
          onSubmit={async (data) => {
            try {
              const response = await mutation.mutateAsync({
                name: data.name,
                email: data.email,
                contact: data.phone,
                message: "Not Provided",
              });

              if (response.status === "success") {
                // trigger GTM event
                triggerGTMEvent("contact-form-submission", {
                  name: data.name,
                  email: data.email,
                  phone: data.phone,
                });

                dispatchNotification({
                  title: "Success!",
                  message: "Inquiry successfully submitted.",
                });

                form.reset();
              } else {
                dispatchNotification({
                  title: "Something went wrong!",
                  message: response.message,
                  type: "error",
                });
              }
            } catch (err: unknown) {
              dispatchNotification({
                title: "Something went wrong!",
                message: "An error occurred while submitting the inquiry.",
                type: "error",
              });
            }
          }}
          className="grid grid-cols-1 items-center  md:grid-cols-[minmax(min-content,_1fr)_min-content] md:gap-x-8 md:[&>*:nth-child(2)]:col-span-2 md:[&>*:nth-child(3)]:col-span-2 md:[&>*:nth-child(1)]:col-span-2"
        >
          <InputField
            label="Name"
            placeholder="John Doe"
            type="text"
            intent="white"
            {...form.register("name")}
            required
            aria-required
          />
          <InputField
            label="Email"
            type="email"
            placeholder="johndoe@sample.com"
            {...form.register("email")}
            required
            intent="white"
            aria-required
          />
          <InputField
            label="Phone"
            type="tel"
            placeholder="+94 77 123 4567"
            {...form.register("phone")}
            intent="white"
            required
            aria-required
          />
          <Paragraph small intent="white" alignment="left">
            One of our D.A.E representative will contact you during 09.00 AM -
            05.00 PM (+05.30 GMT India Standard time)
          </Paragraph>
          <Button
            type="submit"
            intent="white"
            loading={form.formState.isSubmitting}
            withArrow
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export { ContactFormSection };
