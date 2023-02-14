import { Controller } from "react-hook-form";
import { z } from "zod";

import { cn } from "@lib/clsx";
import { api } from "@utils/api";
import { useZodForm } from "@hooks/useZodForm";

import { Button } from "@components/button";
import { Form } from "@components/form";
import { InputField } from "@components/input-field";
import { Checkbox } from "@components/checkbox";
import { PrimaryHeading } from "@components/headings/primary-heading";
import { TertiaryHeading } from "@components/headings/tertiary-heading";
import { ImageComponent } from "@components/image-component";
import { SubHeading } from "@components/headings/sub-heading";

const membershipFormSchema = z
  .object({
    name: z.string({ required_error: "Name is required." }),
    email: z
      .string({ required_error: "Email address is required." })
      .email({ message: "Invalid Email format." }),
    contact: z
      .string({ required_error: "Contact Number is required." })
      .min(10, {
        message: "Contact number should contain at least 10 digits.",
      }),
    ownsAWatercraft: z.boolean().default(false),
    model: z.string().optional(),
  })
  .refine(
    (data) => (data.ownsAWatercraft === true ? data.model !== undefined : true),
    {
      path: ["model"],
      message: "Water vehicle model is required.",
    }
  );

const MarinaJoinForm: React.FC = (): JSX.Element => {
  const mutation = api.membership.apply.useMutation();

  const form = useZodForm({
    schema: membershipFormSchema,
    defaultValues: {
      ownsAWatercraft: false,
    },
  });

  return (
    <section className="sm:main-grid-columns w-full sm:grid ">
      <div className="w-[min(100%,_600px))] col-content mx-auto mt-32 mb-18 grid auto-rows-min grid-cols-1 overflow-hidden bg-white-200 sm:rounded-md xl:w-full xl:grid-cols-2 xl:p-0">
        <div className="relative isolate xl:h-full">
          <div className="absolute inset-0 -z-10 hidden xl:block">
            <ImageComponent
              image={{
                src: "https://images.ctfassets.net/5uyx9ygtaaqf/25w4yr2fU3oO42WKEgATrZ/d9f20712b4dee8509f45bae8abf6e9ef/SEA-MY23-SPAT-19658-RGB-4096x2304.jpg",
                blurUrl: "",
                alt: "Explorers Collective membership sign-in form cover.",
              }}
            />
          </div>
          <div className="flex h-full flex-col items-start justify-start bg-water p-9 xl:justify-end xl:bg-transparent xl:bg-overlayShade xl:p-9">
            <SubHeading type="primary" alignment="left" intent="white">
              Join
            </SubHeading>
            <PrimaryHeading alignment="left" intent="white">
              The Explorers Collective
            </PrimaryHeading>
            <TertiaryHeading alignment="left" intent="white">
              by Debug Auto Exclusive
            </TertiaryHeading>
          </div>
        </div>
        <div className="w-full px-4 py-9 sm:p-9 xl:p-12">
          <Form
            form={form}
            onSubmit={async (data) => {
              const response = await mutation.mutateAsync(data);
              alert(response.status);
            }}
            className={cn("grid auto-rows-min grid-cols-1 gap-6")}
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
              name="ownsAWatercraft"
              render={({
                field: { value, name, onChange },
                formState: { errors },
              }) => (
                <Checkbox
                  label="Owns a Water Vehicle (Boat, Jet Ski, etc...)"
                  required
                  name={name}
                  pressed={value}
                  onValueChange={onChange}
                  error={errors.ownsAWatercraft?.message}
                />
              )}
            />

            <InputField
              type="text"
              {...form.register("model")}
              placeholder="Sea Doo Spark Trixx"
              label="Water Vehicle Model"
              required={form.watch("ownsAWatercraft")}
              disabled={!form.watch("ownsAWatercraft")}
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
    </section>
  );
};

export { MarinaJoinForm };
