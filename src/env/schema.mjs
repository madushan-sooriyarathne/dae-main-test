// @ts-check
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  SITE_URL: z.string().min(1).startsWith("https://"),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js
 * middleware, so you have to do it manually here.
 * @type {{ [k in keyof z.infer<typeof serverSchema>]: z.infer<typeof serverSchema>[k] | undefined }}
 */
export const serverEnv = {
  NODE_ENV: process.env.NODE_ENV,
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
};

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN: z.string().min(1),
  NEXT_PUBLIC_CONTENTFUL_SPACE_ID: z.string().min(1),
  NEXT_PUBLIC_MAPBOX_API_KEY: z.string().min(1),
  NEXT_PUBLIC_GTM_ID: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().min(1),
  NEXT_PUBLIC_COURIER_AUTH_TOKEN: z.string().min(1),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */

export const clientEnv = {
  NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN:
    process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN,
  NEXT_PUBLIC_CONTENTFUL_SPACE_ID: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  NEXT_PUBLIC_MAPBOX_API_KEY: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_COURIER_AUTH_TOKEN: process.env.NEXT_PUBLIC_COURIER_AUTH_TOKEN,
};
