import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Controller } from "react-hook-form";
import { z } from "zod";

import { type IOfferFields } from "@cms/generated/types";

import { Button } from "@components/button";
import { DatePicker } from "@components/date-picker";
import { Form } from "@components/form";
import { SecondaryHeading } from "@components/headings/secondary-heading";
import { InputField } from "@components/input-field";
import { LoadingSpinner } from "@components/loading-spinner";
import { PaxPicker } from "@components/pax-picker";
import { SelectField } from "@components/select-field";
import { TextAreaField } from "@components/text-area-field";
import { useZodForm } from "@hooks/useZodForm";
import { cn } from "@lib/clsx";
import { contentfulClient } from "@lib/contentful";
import { formatDate } from "@utils/base";

const getOfferData = async (): Promise<
  Omit<Offer, "description" | "images">[]
> => {
  const data = await contentfulClient.getEntries<IOfferFields>({
    content_type: "offer",
  });

  return data.items.map((offer) => ({
    id: offer.fields.id,
    name: offer.fields.name,
    currency: offer.fields.currency,
    pricing: offer.fields.pricing,
    pricingType: offer.fields.pricingType,
    expireDate: offer.fields.expireDate,
  }));
};

const offerFormSchema = z.object({
  name: z.string({ required_error: "Name is required." }),
  email: z
    .string({ required_error: "Email address is required." })
    .email({ message: "Invalid Email format." }),
  contact: z
    .string({ required_error: "Contact Number is required." })
    .min(10, { message: "Contact number should contain at least 10 digits." }),
  offer: z.string({ required_error: "Offer is required." }),
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

const OffersForm: React.FC = (): JSX.Element => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["offers"],
    queryFn: getOfferData,
  });

  const form = useZodForm({
    schema: offerFormSchema,
    defaultValues: {
      pax: {
        adults: 2,
        children: 0,
      },
    },
  });

  // form.setValue("adults", 10);
  const offerValue = form.watch("offer");
  const offerExpireDate = useMemo(() => {
    if (isLoading || isError) {
      return undefined;
    } else {
      return data.find((item) => item.name === offerValue)?.expireDate;
    }
  }, [data, isError, isLoading, offerValue]);

  if (isLoading) return <LoadingSpinner message="Loading Offers" />;
  if (isError) return <></>;

  return (
    <div className="grid auto-rows-min grid-cols-1 gap-y-6 mlg:grid-cols-3 ">
      <div className="flex w-full flex-col items-start justify-end rounded-md bg-lightWater px-4 pt-12 pb-4 mlg:col-start-1 mlg:py-12 lg:px-9">
        <span className="text-xs font-bold uppercase tracking-wider text-black-600">
          Reserve
        </span>
        <SecondaryHeading alignment="left" intent="secondary">
          Offers & Packages
        </SecondaryHeading>
      </div>
      <div className="w-full mlg:col-span-2 mlg:col-start-2 mlg:py-6 mlg:pl-9 mlg:pr-0">
        {data && (
          <div className="w-full">
            <Form
              form={form}
              onSubmit={(data) => {
                alert(
                  JSON.stringify({
                    ...data,
                    date: data.date
                      ? formatDate(data.date.toISOString())
                      : null,
                  })
                );
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
                name="offer"
                render={({
                  field: { name, onChange, value },
                  formState: { errors },
                }) => (
                  <SelectField
                    name={name}
                    onValueChange={onChange}
                    value={value}
                    label="Offer"
                    intent="black"
                    error={errors.offer?.message}
                    placeholder="Select a Offer"
                    options={data.map((offer) => offer.name)}
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
                    disabled={offerValue === undefined}
                    minDate={new Date()}
                    maxDate={
                      offerExpireDate ? new Date(offerExpireDate) : undefined
                    }
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

              <Button type="submit" intent="primary" fullWidth>
                Submit
              </Button>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export { OffersForm };
