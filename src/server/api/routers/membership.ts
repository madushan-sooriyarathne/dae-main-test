import { createTRPCRouter, publicProcedure } from "@server/api/trpc";
import { z } from "zod";

export const applyMembershipRouter = createTRPCRouter({
  apply: publicProcedure
    .input(
      z
        .object({
          name: z.string({ required_error: "field 'name' is required." }),
          email: z
            .string({ required_error: "field 'email' is required." })
            .email({ message: "invalid email format." }),
          contact: z
            .string({ required_error: "field 'contact' is required." })
            .min(10, {
              message: "field 'contact' should contain at least 10 digits.",
            }),
          ownsAWatercraft: z.boolean().default(false),
          model: z.string().optional(),
        })
        .refine(
          (data) =>
            data.ownsAWatercraft === true ? data.model !== undefined : true,
          {
            path: ["model"],
            message: "water vehicle model is required.",
          }
        )
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
