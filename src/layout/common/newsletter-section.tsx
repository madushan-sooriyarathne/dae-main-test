import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { cn } from "@lib/clsx";
import { triggerGTMEvent } from "@lib/gtm";

import { useZodForm } from "@hooks/useZodForm";
import { NotificationDispatchContext } from "@context/notification";
import { api } from "@utils/api";

import { getImage } from "@cms/client-utils";

import { HeadingGroup } from "@layout/common/groups/heading-group";

import { Button } from "@components/button";
import { Form } from "@components/form";
import { ImageComponent } from "@components/image-component";
import { InputField } from "@components/input-field";
import { LoadingSpinner } from "@components/loading-spinner";
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
  const { data: newsletterImage } = useQuery<Image>({
    queryKey: ["newsletter-image"],
    queryFn: () => getImage("N6cXPOVQeLurcvdkwiYvG"),
  });

  const mutation = api.newsletter.subscribeToNewsletter.useMutation();

  return (
    <section
      className={cn("lg:main-grid-columns w-full bg-lightWater", {
        "trim-bottom": trim,
      })}
    >
      {newsletterImage ? (
        <div className="aspect-square sm:aspect-[4_/_3] md:aspect-video lg:col-full-start-half lg:aspect-[4/3] lg:h-auto lg:w-full">
          <ImageComponent
            image={newsletterImage}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      <div className="flex w-full flex-col items-stretch gap-y-9 py-12 px-4 md:px-6 lg:col-full-end-half lg:justify-center lg:p-12 2xl:p-16">
        <HeadingGroup
          intent="primary"
          heading="Never miss an update!"
          subHeading="Sign up for our newsletter"
          bottom
        />
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
