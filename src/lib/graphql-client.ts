import { GraphQLClient } from "graphql-request";

// GraphQL endpoint - should match your PostGraphile v5 API
const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://api.vortex.omni.dev/graphql" // Update with your production URL
    : "http://localhost:5555/graphql";

// Create GraphQL client instance
export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  // Add headers for authentication when needed
  headers: {},
  // Enable credentials if using cookies for auth
  credentials: "include",
});

// Function to set auth token dynamically
export const setAuthToken = (token: string | null) => {
  if (token) {
    graphqlClient.setHeader("authorization", `Bearer ${token}`);
  } else {
    graphqlClient.setHeader("authorization", "");
  }
};

// Enhanced request function with better error handling
export const request = async (query: string, variables?: any) => {
  try {
    return await graphqlClient.request(query, variables);
  } catch (error: any) {
    // Handle GraphQL errors
    if (error.response?.errors) {
      const graphqlError = error.response.errors[0];
      throw new Error(graphqlError.message || "GraphQL request failed");
    }

    // Handle network errors
    if (error.message.includes("fetch")) {
      throw new Error("Network error: Unable to connect to API");
    }

    throw error;
  }
};

export default graphqlClient;
