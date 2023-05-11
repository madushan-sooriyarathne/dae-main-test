import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@server/api/trpc";

import {
  sendJobApplicationAcknowledgement,
  sendJobApplicationNotification,
} from "@utils/courier-api";

export const jobApplicationRouter = createTRPCRouter({
  application: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().min(5),
        contact: z.string().min(10),
        position: z.string().min(1),
        coverLetter: z
          .object(
            {
              filename: z
                .string({
                  required_error: "filed 'coverLetter.filename' is required",
                })
                .min(1, "field 'coverLetter.filename' cannot be empty"),
              contentType: z
                .string({
                  required_error: "filed 'coverLetter.contentType' is required",
                })
                .min(1, "field 'coverLetter.contentType' cannot be empty"),
              data: z
                .string({
                  required_error: "filed 'coverLetter.data' is required",
                })
                .min(4, "field 'coverLetter.data' cannot be empty"),
            },
            { required_error: "field 'coverLetter' is required" }
          )
          .nullable(),
        resume: z.object(
          {
            filename: z
              .string({ required_error: "filed 'resume.filename' is required" })
              .min(1, "field 'resume.filename' cannot be empty"),
            contentType: z
              .string({
                required_error: "filed 'resume.contentType' is required",
              })
              .min(1, "field 'resume.contentType' cannot be empty"),
            data: z
              .string({ required_error: "filed 'resume.data' is required" })
              .min(4, "field 'resume.data' cannot be empty"),
          },
          { required_error: "field 'resume' is required" }
        ),
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
        const adminNotification = await sendJobApplicationNotification(input);
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
