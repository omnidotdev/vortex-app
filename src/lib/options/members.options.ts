import { queryOptions } from "@tanstack/react-query";

import { listOrganizationMembers } from "@/server/functions/organizations";

/**
 * Query options for fetching workspace members from Gatekeeper
 */
const membersOptions = (organizationId: string, accessToken: string) =>
  queryOptions({
    queryKey: ["organizationMembers", organizationId],
    queryFn: () =>
      listOrganizationMembers({ data: { organizationId, accessToken } }),
    enabled: !!organizationId && !!accessToken,
  });

export { membersOptions };
