import { queryOptions } from "@tanstack/react-query";

import { API_BASE_URL } from "@/lib/config/env.config";
import getAuthHeaders from "@/lib/graphql/getAuthHeaders";

import type { MembersResponse } from "@/lib/types/members";

/**
 * Query options for fetching workspace members.
 * @param organizationId - Organization to fetch members for
 */
const membersOptions = (organizationId: string) =>
  queryOptions<MembersResponse>({
    queryKey: ["members", organizationId],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/organizations/${organizationId}/members`,
        { headers: await getAuthHeaders() },
      );

      if (!response.ok) throw new Error("Failed to fetch members");

      return response.json();
    },
  });

export { membersOptions };
