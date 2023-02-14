import {
  eventsInquiryRouter,
  offerInquiryRouter,
  restaurantInquiryRouter,
  waterSportsInquiryRouter,
} from "@server/api/routers/reservations";
import { createTRPCRouter } from "@server/api/trpc";
import { applyMembershipRouter } from "./routers/membership";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  offer: offerInquiryRouter,
  restaurant: restaurantInquiryRouter,
  events: eventsInquiryRouter,
  waterSports: waterSportsInquiryRouter,
  membership: applyMembershipRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
