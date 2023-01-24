import { Button } from "@components/button";
import Form from "@components/form";
import { ImageComponent } from "@components/image-component";
import { InputField } from "@components/input-field";
import { Paragraph } from "@components/paragraph";
import { useZodForm } from "@hooks/useZodForm";
import { z } from "zod";
import { HeadingGroup } from "./groups/heading-group";

const newsletterSchema = z.object({
  email: z.string().email(),
});

const NewsletterSection: React.FC = (): JSX.Element => {
  const newsletterForm = useZodForm({ schema: newsletterSchema });

  return (
    <section className=" trim-bottom lg:main-grid-columns w-full">
      <div className="aspect-square sm:aspect-[4_/_3] md:aspect-video lg:col-[full-start_/_col-end_4] lg:aspect-auto lg:w-full">
        <ImageComponent
          image={{
            src: "https://images.unsplash.com/photo-1541777594744-addc2de9d110?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            alt: "Newsletter",
            blurUrl: "",
          }}
        />
      </div>
      <div className=" flex w-full flex-col items-stretch gap-y-9 bg-lightArtifacts py-12 px-4 lg:col-[col-start_5_/_full-end]">
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