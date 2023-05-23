import { useContext, useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import Link from "next/link";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { m } from "framer-motion";
import { acceptedFileTypes } from "site-data";
import { z } from "zod";

import { env } from "@env/client.mjs";
import { triggerGTMEvent } from "@lib/gtm";

import { useZodForm } from "@hooks/useZodForm";
import { NotificationDispatchContext } from "@context/notification";
import { api } from "@utils/api";
import { encodeFile } from "@utils/base";

import { Button } from "@components/button";
import { FileUploadField } from "@components/file-upload";
import { Form } from "@components/form";
import { PrimaryHeading } from "@components/headings/primary-heading";
import { QuaternaryHeading } from "@components/headings/quaternary-heading";
import { TertiaryHeading } from "@components/headings/tertiary-heading";
import { InputField } from "@components/input-field";
import { Paragraph } from "@components/paragraph";

import { fadeIn } from "@styles/animations";

interface Props {
  opening: JobPost;
}

const applicationFormSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, { message: "Name should have at least 2 characters" }),
  email: z
    .string({ required_error: "Email address is required" })
    .email({ message: "Invalid email format" }),
  contact: z
    .string({ required_error: "Contact number is required" })
    .min(10, { message: "Contact number should have at least 10 digits" }),
  coverLetter: z
    .custom<File>((file) => file instanceof File, {
      message: "Cover Letter must be a valid file",
    })
    .refine((val) => val.name !== "" && val.size > 0, {
      message: "Cover letter is required.",
    })
    .refine(
      (val) => val instanceof File && !acceptedFileTypes.includes(val.type),
      {
        message: "Cover letter must be a pdf / word document type",
      }
    )
    .refine((val) => val instanceof File && val.size < 1000000, {
      message: "File size must be less than 1mb",
    })
    .nullable(),
  resume:
    typeof window === "undefined"
      ? z.custom<File>((file) => file instanceof File)
      : z
          .instanceof(File, { message: "Resume must be file", fatal: true })
          .refine((val) => val.name !== "" && val.size > 0, {
            message: "Resume is required",
          })
          .refine((val) => !acceptedFileTypes.includes(val.type), {
            message: "Resume must be a pdf / word document type",
          })
          .refine((val) => val.size < 1000000, {
            message: "File size must be less than 1mb",
          }),
});

const OpeningDetailsSection: React.FC<Props> = ({
  opening,
}: Props): JSX.Element => {
  const [shareWindowOpen, setShareWindowOpen] = useState<boolean>(false);
  const ref = useRef<HTMLElement | null>();

  const applicationForm = useZodForm({
    schema: applicationFormSchema,
    defaultValues: {
      coverLetter: null,
    },
  });
  const mutation = api.jobApplication.application.useMutation();
  const dispatchNotification = useContext(NotificationDispatchContext);

  useEffect(() => {
    ref.current = document.getElementById("app");
  }, []);

  return (
    <section className="main-grid-columns grid gap-y-8 ">
      <div className="col-content flex flex-col items-start justify-start gap-y-12 lg:col-[content-start_/_col-end_5] lg:pr-8 xl:pr-12 2xl:pr-16">
        <div className="flex flex-col items-start justify-start gap-y-3">
          <PrimaryHeading alignment="left" intent="primary">
            {opening.title}
          </PrimaryHeading>
          <div className="flex flex-wrap items-center justify-start gap-x-5 gap-y-4">
            <span className="flex items-center justify-start gap-x-1 fill-black-700 text-left font-sans text-xs font-semibold tracking-wide text-black-700 lg:gap-x-2 lg:text-sm">
              <svg className="h-4 w-4">
                <use xlinkHref="/assets/svg/sprites.svg#icon-clock" />
              </svg>
              {opening.type}
            </span>
            <span className="flex items-center justify-start gap-x-1 fill-black-700 text-left font-sans text-xs font-semibold tracking-wide text-black-700 lg:gap-x-2 lg:text-sm">
              <svg className="h-4 w-4">
                <use xlinkHref="/assets/svg/sprites.svg#icon-location-pin" />
              </svg>
              {opening.location}
            </span>
            <Link
              href={`/careers?dep=${opening.department}#latest-openings`}
              className="cursor-pointer rounded border border-primary-300 bg-primary-100 px-3 py-1.5 text-xs font-semibold tracking-wide text-primary transition-colors duration-200 ease-in-out hover:border-primary hover:bg-primary hover:text-white lg:text-sm"
            >
              {opening.department}
            </Link>
            <PopoverPrimitive.Root
              open={shareWindowOpen}
              onOpenChange={setShareWindowOpen}
            >
              <PopoverPrimitive.Trigger asChild>
                <button
                  type="button"
                  role="button"
                  aria-label="job opening share button"
                  className="flex items-center justify-start gap-x-1 rounded fill-water px-3 py-1.5 font-sans text-xs font-semibold tracking-wide text-water transition-colors duration-200 ease-in-out hover:bg-white-300 data-[state=open]:bg-white-300 lg:gap-x-2 lg:text-sm"
                >
                  <svg className="h-4 w-4">
                    <use xlinkHref="/assets/svg/sprites.svg#icon-share" />
                  </svg>
                  Share this opening
                </button>
              </PopoverPrimitive.Trigger>
              <PopoverPrimitive.Portal forceMount container={ref.current}>
                {shareWindowOpen && (
                  <PopoverPrimitive.Content asChild>
                    <m.div
                      variants={fadeIn}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="max-w-80 mt-3 flex flex-col items-start justify-start gap-y-4 rounded-lg border border-white-500 bg-white p-3 shadow-lg shadow-black/20 lg:p-5"
                    >
                      <QuaternaryHeading alignment="left" intent="secondary">
                        Share this on
                      </QuaternaryHeading>
                      <div className="flex flex-wrap items-start justify-start gap-x-3 gap-y-2">
                        <EmailShareButton
                          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full lg:h-12 lg:w-12"
                          url={
                            new URL(
                              `/careers/${opening.id}`,
                              env.NEXT_PUBLIC_SITE_URL
                            ).href
                          }
                          subject={`${opening.title} at ${opening.location} - Debug Auto Exclusive`}
                          body={`New ${opening.type} ${opening.title} position at ${opening.location} by Debug Auto Exclusive`}
                          separator=":?:"
                        >
                          <EmailIcon />
                        </EmailShareButton>
                        <FacebookShareButton
                          url={
                            new URL(
                              `/careers/${opening.id}`,
                              env.NEXT_PUBLIC_SITE_URL
                            ).href
                          }
                          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full lg:h-12 lg:w-12"
                          quote={`New ${opening.type} ${opening.title} position at ${opening.location} by Debug Auto Exclusive`}
                          hashtag="#DAECareers"
                        >
                          <FacebookIcon />
                        </FacebookShareButton>
                        <LinkedinShareButton
                          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full lg:h-12 lg:w-12"
                          url={
                            new URL(
                              `/careers/${opening.id}`,
                              env.NEXT_PUBLIC_SITE_URL
                            ).href
                          }
                          title={`${opening.title} at ${opening.location} - Debug Auto Exclusive`}
                          summary={`New ${opening.type} ${opening.title} position at ${opening.location} by Debug Auto Exclusive`}
                          source={env.NEXT_PUBLIC_SITE_URL}
                        >
                          <LinkedinIcon />
                        </LinkedinShareButton>
                        <TwitterShareButton
                          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full lg:h-12 lg:w-12"
                          url={
                            new URL(
                              `/careers/${opening.id}`,
                              env.NEXT_PUBLIC_SITE_URL
                            ).href
                          }
                          title={`${opening.title} at ${opening.location} - Debug Auto Exclusive`}
                          hashtags={[
                            "#DAE",
                            "#DAECareers",
                            " #DebugAutoExclusive",
                          ]}
                        >
                          <TwitterIcon />
                        </TwitterShareButton>
                        <WhatsappShareButton
                          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full lg:h-12 lg:w-12"
                          url={
                            new URL(
                              `/careers/${opening.id}`,
                              env.NEXT_PUBLIC_SITE_URL
                            ).href
                          }
                          title={`${opening.title} at ${opening.location} - Debug Auto Exclusive`}
                          separator=":?:"
                        >
                          <WhatsappIcon />
                        </WhatsappShareButton>
                      </div>
                    </m.div>
                  </PopoverPrimitive.Content>
                )}
              </PopoverPrimitive.Portal>
            </PopoverPrimitive.Root>
          </div>
        </div>
        <Paragraph alignment="left">{opening.description}</Paragraph>
      </div>
      <div className="col-content flex h-min w-full max-w-[37.5rem] flex-col items-start justify-start gap-y-7 rounded border border-white-500 p-4 sm:py-6 md:px-6 md:py-8 lg:sticky lg:top-28 lg:col-[col-start_6_/_content-end]">
        <TertiaryHeading>Apply to this opening</TertiaryHeading>
        <Form
          form={applicationForm}
          onSubmit={async (data) => {
            try {
              const response = await mutation.mutateAsync({
                ...data,
                coverLetter: data.coverLetter
                  ? {
                      filename: data.coverLetter.name,
                      contentType: data.coverLetter.type,
                      data: await encodeFile(data.coverLetter),
                    }
                  : null,
                resume: {
                  filename: data.resume.name,
                  contentType: data.resume.type,
                  data: await encodeFile(data.resume),
                },
                position: opening.title,
              });

              if (response.status === "success") {
                triggerGTMEvent("job-application-submission", {
                  name: data.name,
                  email: data.email,
                  phone: data.contact,
                });

                dispatchNotification({
                  message: "Application submitted successfully!",
                  title: "Success",
                });
                applicationForm.reset();
              } else {
                dispatchNotification({
                  message:
                    "An error occurred while submitting your application. Please try again later.",
                  title: "Something went wrong",
                  type: "error",
                });
              }
            } catch (error: unknown) {
              dispatchNotification({
                title: "Something went wrong!",
                message: "An error occurred while submitting your application.",
                type: "error",
              });
            }
          }}
          className="w-full"
        >
          <InputField
            label="Full name"
            required
            aria-required="true"
            {...applicationForm.register("name")}
            placeholder="John Doe"
            type="text"
          />
          <InputField
            label="Email Address"
            required
            aria-required="true"
            {...applicationForm.register("email")}
            placeholder="johndoe@sample.com"
            type="email"
          />
          <InputField
            label="Contact Number"
            required
            aria-required="true"
            {...applicationForm.register("contact")}
            placeholder="+94 71 123 6789"
            type="tel"
          />
          <Controller
            control={applicationForm.control}
            name="resume"
            render={({
              field: { name, onChange, value },
              formState: { errors, isSubmitting },
            }) => (
              <FileUploadField
                name={name}
                value={value}
                onValueChange={onChange}
                error={errors.resume?.message}
                label="Resume"
                disabled={isSubmitting}
                placeholder="Upload your resume"
                intent="black"
                required
              />
            )}
          />

          <Controller
            control={applicationForm.control}
            name="coverLetter"
            render={({
              field: { name, onChange, value },
              formState: { errors, isSubmitting },
            }) => (
              <FileUploadField
                name={name}
                value={value}
                onValueChange={onChange}
                error={errors.coverLetter?.message}
                label="Cover Letter"
                disabled={isSubmitting}
                placeholder="Upload your cover letter"
                intent="black"
              />
            )}
          />
          <Button
            fullWidth
            withArrow
            type="submit"
            loading={applicationForm.formState.isSubmitting}
          >
            Submit
          </Button>
        </Form>
      </div>
    </section>
  );
};

export { OpeningDetailsSection };
