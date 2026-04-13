import { queryOptions } from "@tanstack/react-query";

import { listOrganizationMembers } from "@/server/functions/organizations";

/**
 * Query options for fetching workspace members from Gatekeeper
 */
const membersOptions = (organizationId: string) =>
  queryOptions({
    queryKey: ["organizationMembers", organizationId],
    queryFn: () => listOrganizationMembers({ data: { organizationId } }),
    enabled: !!organizationId,
  });

export { membersOptions };
