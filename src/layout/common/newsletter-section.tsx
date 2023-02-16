import { z } from "zod";

import { useZodForm } from "@hooks/useZodForm";

import { Button } from "@components/button";
import { Form } from "@components/form";
import { ImageComponent } from "@components/image-component";
import { InputField } from "@components/input-field";
import { Paragraph } from "@components/paragraph";

import { HeadingGroup } from "./groups/heading-group";
import { cn } from "@lib/clsx";
import { triggerGTMEvent } from "@lib/gtm";

interface Props {
  trim?: true;
}

const newsletterSchema = z.object({
  email: z.string().email(),
});

const NewsletterSection: React.FC<Props> = ({ trim }): JSX.Element => {
  const newsletterForm = useZodForm({ schema: newsletterSchema });

  return (
    <section
      className={cn("lg:main-grid-columns w-full bg-lightWater", {
        "trim-bottom": trim,
      })}
    >
      <div className="aspect-square sm:aspect-[4_/_3] md:aspect-video lg:col-full-start-half lg:aspect-[4/3] lg:h-auto lg:w-full">
        <ImageComponent
          image={{
            src: "https://images.unsplash.com/photo-1541777594744-addc2de9d110?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            alt: "Newsletter",
            blurUrl: "",
          }}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
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
            onSubmit={(data) => {
              // trigger GTM event
              triggerGTMEvent("newsletter-subscription", {
                email: data.email,
              });

              alert(`Subscribed to newsletter ${data.email}`);
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
              <Button type="submit" intent="primary">
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
