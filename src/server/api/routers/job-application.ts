import { z } from "zod";

import {
  sendJobApplicationAcknowledgement,
  // sendJobApplicationNotification,
} from "@utils/courier-api";

import { createTRPCRouter, publicProcedure } from "@server/api/trpc";

export const jobApplicationRouter = createTRPCRouter({
  apply: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().min(5),
        contact: z.string().min(10),
        position: z.string().min(1),
        coverLetter: z.custom<File>((file) => file instanceof File),
        resume: z.custom<File>((file) => file instanceof File),
      })
    )
    .output(
      z.object({
        status: z.enum(["success", "error"]),
        message: z.string().min(1).nullable(),
        data: z.record(z.string().min(1), z.any()).nullable(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const adminNotification = true;
        const userAcknowledgement = await sendJobApplicationAcknowledgement({
          name: input.name,
          email: input.email,
          position: input.position,
        });
        if (adminNotification && userAcknowledgement) {
          return {
            status: "success",
            message: "Successfully sent the application",
            data: {
              messageId: adminNotification,
            },
          };
        } else {
          return {
            status: "error",
            message: "An error occurred while sending the application.",
            data: null,
          };
        }
      } catch (error: unknown) {
        return {
          status: "error",
          message: null,
          data: null,
        };
      }
    }),
});
