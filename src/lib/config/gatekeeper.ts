import { GatekeeperOrgClient } from "@omnidotdev/providers/auth";

import { SERVER_AUTH_BASE_URL } from "./env.config";

const gatekeeperOrg = new GatekeeperOrgClient(
  SERVER_AUTH_BASE_URL || "https://unconfigured.invalid",
);

export default gatekeeperOrg;
