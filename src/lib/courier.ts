import { CourierClient } from "@trycourier/courier";

import { env } from "@env/client.mjs";

const courierClient = CourierClient({
  authorizationToken: env.NEXT_PUBLIC_COURIER_AUTH_TOKEN,
});

export { courierClient };
