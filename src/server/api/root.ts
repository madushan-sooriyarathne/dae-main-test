import { reservationRouter } from "@server/api/routers/reservations";
import { createTRPCRouter } from "@server/api/trpc";

import { contactRouter } from "@server/api/routers/contact";
import { membershipRouter } from "@server/api/routers/membership";
import { newsletterRouter } from "@server/api/routers/newsletter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  reservations: reservationRouter,
  membership: membershipRouter,
  contact: contactRouter,
  newsletter: newsletterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
