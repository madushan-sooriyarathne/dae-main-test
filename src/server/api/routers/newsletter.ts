import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@server/api/trpc";

import { addUser } from "@utils/mailchimp-api";

export const newsletterRouter = createTRPCRouter({
  subscribeToNewsletter: publicProcedure
    .input(
      z.object({
        email: z
          .string({ required_error: "field 'email' is required." })
          .email({ message: "invalid email format." }),
      })
    )
    .mutation(async ({ input }) => {
      // TODO add email subscription logic
      const subscribed = await addUser({ email: input.email });
      if (subscribed) {
        return {
          status: "success",
          message: null,
          data: null,
        } satisfies APIResponseType;
      } else {
        return {
          status: "failed",
          message: "An error occurred while subscribing to the newsletter.",
          data: null,
        } satisfies APIResponseType;
      }
    }),
});
