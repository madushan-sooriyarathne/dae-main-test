import { useContext } from "react";
import { z } from "zod";

import { cn } from "@lib/clsx";
import { triggerGTMEvent } from "@lib/gtm";

import { useZodForm } from "@hooks/useZodForm";
import { NotificationDispatchContext } from "@context/notification";
import { api } from "@utils/api";

import { Button } from "@components/button";
import { Form } from "@components/form";
import { PrimaryHeading } from "@components/headings/primary-heading";
import { InputField } from "@components/input-field";
import { Paragraph } from "@components/paragraph";

interface Props {
  trim?: true;
}

const newsletterSchema = z.object({
  email: z.string().email(),
});

const NewsletterSection: React.FC<Props> = ({ trim }): JSX.Element => {
  const newsletterForm = useZodForm({ schema: newsletterSchema });
  const dispatchNotification = useContext(NotificationDispatchContext);

  const mutation = api.newsletter.subscribeToNewsletter.useMutation();

  return (
    <section
      className={cn("flex w-full items-center justify-center bg-lightWater", {
        "trim-bottom": trim,
      })}
    >
      <div className="flex w-[min(100%,_68.75em)] flex-col items-center gap-y-9 py-12 px-4 md:px-6 lg:col-full-end-half lg:justify-center lg:p-12 2xl:p-16">
        <PrimaryHeading intent="primary" alignment="center">
          Never miss an update
        </PrimaryHeading>
        <div>
          <Form
            form={newsletterForm}
            onSubmit={async (data) => {
              try {
                const response = await mutation.mutateAsync({
                  email: data.email,
                });

                if (response.status === "success") {
                  // trigger GTM event
                  triggerGTMEvent("newsletter-subscription", {
                    email: data.email,
                    timestamp: new Intl.DateTimeFormat("en-LK", {
                      dateStyle: "medium",
                      timeStyle: "medium",
                    }).format(new Date()),
                  });

                  dispatchNotification({
                    message: "Subscribed to newsletter",
                    title: "Success!",
                  });

                  newsletterForm.reset();
                } else {
                  dispatchNotification({
                    message: response.message,
                    title: "Something went wrong!",
                    type: "error",
                  });
                }
              } catch (error: unknown) {
                dispatchNotification({
                  message:
                    "An error occurred while subscribing to the newsletter.",
                  title: "Something went wrong!",
                  type: "error",
                });
              }
            }}
            className="flex max-w-[37.5rem] items-stretch justify-start gap-y-6"
          >
            <div className="flex w-full flex-col justify-start gap-y-2 md:grid md:grid-cols-[minmax(min-content_,_1fr)_min-content]  md:items-center md:gap-x-2">
              <InputField
                {...newsletterForm.register("email")}
                placeholder="Your Email Address"
                required
                type="email"
                intent="black"
              />
              <Button
                type="submit"
                intent="primary"
                loading={newsletterForm.formState.isSubmitting}
              >
                Subscribe
              </Button>
            </div>
            <Paragraph small intent="black" alignment="left">
              By clicking “Subscribe” Button, you agree to [D.A.E personal data
              processing policy](/privacy-policy).
            </Paragraph>
          </Form>
        </div>
      </div>
    </section>
  );
};

export { NewsletterSection };
