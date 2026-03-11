import { fetchSession } from "@/server/functions/auth";

/**
 * Fetch a fresh access token via server function and return auth headers.
 * Used for direct REST/fetch calls that bypass graphqlFetch.
 */
const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const { session } = await fetchSession();
  if (!session?.accessToken) return {};
  return { Authorization: `Bearer ${session.accessToken}` };
};

export default getAuthHeaders;
