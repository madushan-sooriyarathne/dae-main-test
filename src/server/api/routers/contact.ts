import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@server/api/trpc";

import {
  sendContactNotification,
  sendCustomerAcknowledgement,
} from "@utils/courier-api";

export const contactRouter = createTRPCRouter({
  contactInquiry: publicProcedure
    .input(
      z.object({
        name: z.string({ required_error: "field 'name' is required." }),
        email: z
          .string({ required_error: "field 'email' is required." })
          .email({ message: "invalid email format." }),
        contact: z
          .string({ required_error: "field 'contact' is required." })
          .min(10, {
            message: "field 'contact' should contain at least 10 digits.",
          }),
        message: z.optional(z.string()),
      })
    )
    .output(
      z.object({
        status: z.enum(["error", "success"]),
        message: z.string().nullable(),
        data: z.record(z.string().min(1), z.any()).nullable(),
      })
    )
    .mutation(async ({ input }) => {
      // Do the processing
      // Send the inquiry data to the operations
      const adminNotification = await sendContactNotification(input);

      // send the acknowledgement to the user.
      const userAcknowledgement = await sendCustomerAcknowledgement({
        name: input.name,
        email: input.email,
      });

      if (adminNotification && userAcknowledgement) {
        return {
          status: "success",
          message: null,
          data: null,
        };
      } else {
        return {
          status: "error",
          message: "An error occurred while submitting the inquiry.",
          data: null,
        };
      }
    }),
});
