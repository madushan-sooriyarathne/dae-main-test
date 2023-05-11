import { CourierClient } from "@trycourier/courier";

import { env } from "@env/server.mjs";

const courierClient = CourierClient({
  authorizationToken: env.COURIER_AUTH_TOKEN,
});

export { courierClient };
