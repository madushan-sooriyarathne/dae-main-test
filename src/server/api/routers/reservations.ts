import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@server/api/trpc";
import { eventTypes, waterSports } from "site-data";

export const offerInquiryRouter = createTRPCRouter({
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
    .mutation(({ input }): APIResponseType => {
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
        };
      } else {
        return {
          status: "failed",
          message: "Error occurred while processing the inquiry",
          data: null,
        };
      }
    }),
});

export const restaurantInquiryRouter = createTRPCRouter({
  restaurantInquiry: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        contact: z.string().min(10),
        date: z.string(),
        pax: z.object({
          adults: z.number().min(1),
          children: z.number().min(0),
        }),
        time: z.string(),
        requests: z.optional(z.string()),
      })
    )
    .mutation(({ input }): APIResponseType => {
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
        };
      } else {
        return {
          status: "failed",
          message: "Error occurred while processing the inquiry",
          data: null,
        };
      }
    }),
});

export const eventsInquiryRouter = createTRPCRouter({
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
    .mutation(({ input }): APIResponseType => {
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
        };
      } else {
        return {
          status: "failed",
          message: "Error occurred while processing the inquiry",
          data: null,
        };
      }
    }),
});

export const waterSportsInquiryRouter = createTRPCRouter({
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
        selectedWaterSports: z.enum(waterSports).array().nonempty({
          message: "At least one option must be selected.",
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
    .mutation(({ input }): APIResponseType => {
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
        };
      } else {
        return {
          status: "failed",
          message: "Error occurred while processing the inquiry",
          data: null,
        };
      }
    }),
});
