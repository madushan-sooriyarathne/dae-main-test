import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@server/api/trpc";

import {
  sendCustomerAcknowledgement,
  sendMembershipNotification,
} from "@utils/courier-api";

export const membershipRouter = createTRPCRouter({
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
    .output(
      z.object({
        status: z.enum(["success", "error"]),
        message: z.string().min(1).nullable(),
        data: z.record(z.string().min(1), z.any()).nullable(),
      })
    )
    .mutation(async ({ input }) => {
      // Do the processing
      const adminNotification = await sendMembershipNotification(input);
      // Send the inquiry data to the operations

      // send the acknowledgement to the user.
      const userAcknowledgement = await sendCustomerAcknowledgement({
        email: input.email,
        name: input.name,
        company: "Debug Auto Exclusive",
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
          message: "An error occurred while processing the inquiry.",
          data: null,
        };
      }
    }),
});
