import { queryOptions } from "@tanstack/react-query";

import { API_BASE_URL, API_INTERNAL_URL } from "@/lib/config/env.config";
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
      const baseUrl =
        typeof window === "undefined" ? API_INTERNAL_URL : API_BASE_URL;

      const response = await fetch(
        `${baseUrl}/api/v1/organizations/${organizationId}/members`,
        { headers: await getAuthHeaders() },
      );

      if (!response.ok) throw new Error("Failed to fetch members");

      return response.json();
    },
  });

export { membersOptions };
