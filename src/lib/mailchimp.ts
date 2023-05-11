import mailchimp from "@mailchimp/mailchimp_marketing";

import { env } from "@env/server.mjs";

mailchimp.setConfig({
  apiKey: env.MAILCHIMP_API_KEY,
  server: env.MAILCHIMP_SERVER_PREFIX,
});

export { mailchimp };
