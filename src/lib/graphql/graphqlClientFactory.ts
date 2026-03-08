import { GraphQLClient } from "graphql-request";

import {
  API_GRAPHQL_URL,
  API_INTERNAL_GRAPHQL_URL,
} from "@/lib/config/env.config";

/** Use internal URL for server-side requests to bypass reverse proxy */
const graphqlUrl =
  typeof window === "undefined" ? API_INTERNAL_GRAPHQL_URL : API_GRAPHQL_URL;

let client: GraphQLClient | null = null;
let accessToken: string | null = null;

const getAuthHeaders = (): Record<string, string> => {
  if (!accessToken) return {};
  return { Authorization: `Bearer ${accessToken}` };
};

export const getGraphQLClient = (): GraphQLClient => {
  if (!client) {
    client = new GraphQLClient(graphqlUrl!, {
      headers: { "Content-Type": "application/json" },
    });
  }
  return client;
};

export const setAccessToken = (token: string | null | undefined): void => {
  accessToken = token ?? null;
  if (client) {
    client.setHeaders({
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    });
  }
};

export const getCurrentAuthHeaders = (): Record<string, string> =>
  getAuthHeaders();
