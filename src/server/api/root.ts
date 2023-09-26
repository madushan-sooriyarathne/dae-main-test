import { contactRouter } from "@server/api/routers/contact";
import { inquiriesRouter } from "@server/api/routers/inquiries";
import { jobApplicationRouter } from "@server/api/routers/jobApplication";
import { membershipRouter } from "@server/api/routers/membership";
import { newsletterRouter } from "@server/api/routers/newsletter";
import { createTRPCRouter } from "@server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  inquiries: inquiriesRouter,
  contact: contactRouter,
  jobApplication: jobApplicationRouter,
  newsletter: newsletterRouter,
  membership: membershipRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
