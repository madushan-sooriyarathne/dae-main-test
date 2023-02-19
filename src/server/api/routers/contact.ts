import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@server/api/trpc";

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
          message: "An error occurred while submitting the inquiry.",
          data: null,
        } satisfies APIResponseType;
      }
    }),
});
