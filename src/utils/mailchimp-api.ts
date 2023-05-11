import { createHash } from "crypto";

import { env } from "@env/server.mjs";
import { mailchimp } from "@lib/mailchimp";

type Subscriber = {
  email: string;
  firstName?: string;
  lastName?: string;
  contact?: string;
};

export const addUser = async (user: Subscriber) => {
  try {
    // generate md5 hash for the user email address.
    const emailHash = createHash("md5").update(user.email).digest("hex");

    await mailchimp.lists.updateListMember(
      env.MAILCHIMP_AUDIENCE_ID,
      emailHash,
      {
        email_address: user.email,
        status: "subscribed",
        merge_fields: {
          FNAME: user.firstName,
          LNAME: user.lastName,
          PHONE: user.contact,
        },
      }
    );
    return true;
  } catch (err: unknown) {
    console.error(
      `An error occurred while subscribing ${user.email} - ${
        (err as Error).message
      }`
    );
  }
};
