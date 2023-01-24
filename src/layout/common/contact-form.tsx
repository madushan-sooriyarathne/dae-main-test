import { Button } from "@components/button";
import Form from "@components/form";
import { InputField } from "@components/input-field";
import { Paragraph } from "@components/paragraph";
import { useZodForm } from "@hooks/useZodForm";
import { z } from "zod";
import { HeadingGroup } from "./groups/heading-group";

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3, "Name must contain at least 3 characters"),
  phone: z.string().min(10),
});

const ContactFormSection: React.FC = (): JSX.Element => {
  const form = useZodForm({ schema: formSchema });

  return (
    <div className="main-grid-columns trim-bottom grid bg-water bg-[url('/assets/svg/bg-waves.svg')] bg-[size:200%] bg-bottom bg-no-repeat py-12 md:bg-contain md:py-16 lg:py-18 xl:py-24 2xl:py-32">
      <div className="col-[content-start_/_content-end] mx-auto flex w-[min(100%,_37.5rem)] flex-col items-stretch justify-start gap-y-9 ">
        <HeadingGroup
          heading="Have Any Questions?"
          subHeading="Reach out to us"
          intent="white"
          alignment="center"
          bottom
        />
        <Form
          form={form}
          onSubmit={(data) => alert(JSON.stringify(data))}
          className="grid md:grid-cols-2 md:gap-x-6 md:[&>*:nth-child(1)]:col-span-2 md:[&>*:nth-child(2)]:col-span-2 md:[&>*:nth-child(3)]:col-span-2"
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
          <Button type="submit" intent="white" withArrow>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export { ContactFormSection };
