import { eventTypes, trainingCourses } from "site-data";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@server/api/trpc";

export const inquiriesRouter = createTRPCRouter({
  offerInquiry: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        contact: z.string().min(10),
        offer: z.string(),
        date: z.string(),
        noOfGuests: z.object({
          adults: z.number().min(1),
          children: z.number().min(0),
        }),
        requests: z.optional(z.string()),
      })
    )
    .mutation(({ input }) => {
      // Do the processing
      // Send the inquiry data to the operations
      const adminNotification = true;

      // send the acknowledgement to the user.
      const userAcknowledgement = true;

      if (adminNotification && userAcknowledgement) {
        return {
          status: "success",
          message: null,
          data: null,
        } satisfies APIResponseType;
      } else {
        return {
          status: "failed",
          message: "An error occurred while processing the inquiry.",
          data: null,
        } satisfies APIResponseType;
      }
    }),
  trainingCenterInquiry: publicProcedure
    .input(
      z.object({
        name: z
          .string({ required_error: "field 'name' is required" })
          .min(2, { message: "field 'name' must have at least 2 characters." }),
        email: z
          .string({ required_error: "filed 'email' is required" })
          .email({ message: "incorrect email format" }),
        contact: z
          .string({ required_error: "filed 'contact' is required" })
          .min(10, { message: "field 'contact' must have at least 10 digits" }),
        date: z.string({ required_error: "filed 'date' is required" }),
        pax: z.object({
          adults: z
            .number({ required_error: "filed 'pax.adults' is required" })
            .min(1, { message: "at least 1 adult is required." }),
          children: z.number().min(0, {
            message: "field 'pax.children'children cannot be a minus value",
          }),
        }),
        trainingCourse: z.enum(trainingCourses, {
          required_error: "field 'trainingCourse' is required",
        }),
        requests: z.optional(z.string()),
      })
    )
    .mutation(({ input }) => {
      // Do the processing
      // Send the inquiry data to the operations
      const adminNotification = true;

      // send the acknowledgement to the user.
      const userAcknowledgement = true;

      if (adminNotification && userAcknowledgement) {
        return {
          status: "success",
          message: null,
          data: null,
        } satisfies APIResponseType;
      } else {
        return {
          status: "failed",
          message: "An error occurred while processing the inquiry.",
          data: null,
        } satisfies APIResponseType;
      }
    }),
  eventsInquiry: publicProcedure
    .input(
      z.object({
        name: z
          .string({ required_error: "field name is required" })
          .min(2, { message: "field 'name' must have at least 2 characters" }),
        email: z
          .string({ required_error: "field 'email' is required" })
          .email({ message: "email format is incorrect" }),
        contact: z
          .string({
            required_error: "field 'phone' is required",
            invalid_type_error: "filed 'phone' must be a string",
          })
          .min(10, { message: "phone must have at least 10 digits" }),
        eventType: z.enum(eventTypes, {
          required_error: "filed 'eventType' is required",
        }),
        date: z.string({ required_error: "field 'date' is required" }),
        pax: z.object({
          adults: z
            .number({
              invalid_type_error: "field 'pax.adults' must be a number",
              required_error: "field 'pax.adults' is required",
            })
            .min(1, { message: "at least 1 adult is required" }),
          children: z
            .number({
              invalid_type_error: "field 'pax.children' must be a number",
              required_error: "field 'pax.children' is required",
            })
            .min(0),
        }),
      })
    )
    .mutation(({ input }) => {
      // Do the processing
      // Send the inquiry data to the operations
      const adminNotification = true;

      // send the acknowledgement to the user.
      const userAcknowledgement = true;

      console.log(input);

      if (adminNotification && userAcknowledgement) {
        return {
          status: "success",
          message: null,
          data: null,
        } satisfies APIResponseType;
      } else {
        return {
          status: "failed",
          message: "An error occurred while processing the inquiry.",
          data: null,
        } satisfies APIResponseType;
      }
    }),
});
