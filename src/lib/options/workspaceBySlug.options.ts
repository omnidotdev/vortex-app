import { queryOptions } from "@tanstack/react-query";

export type WorkspaceBySlugQueryVariables = {
  slug: string;
  userId: string;
};

export type WorkspaceBySlugData = {
  workspaceBySlug: {
    rowId: string;
    name: string;
    slug: string;
    tier: string;
  } | null;
};

// TODO: Implement workspace queries when vortex-api has workspace support
// For now, stub the data based on the slug
const workspaceBySlugOptions = (variables: WorkspaceBySlugQueryVariables) =>
  queryOptions({
    queryKey: ["workspaceBySlug", variables],
    queryFn: async (): Promise<WorkspaceBySlugData> => {
      // Stub: return a workspace based on the slug
      return {
        workspaceBySlug: {
          rowId: variables.slug,
          name:
            variables.slug.charAt(0).toUpperCase() + variables.slug.slice(1),
          slug: variables.slug,
          tier: "FREE",
        },
      };
    },
  });

export default workspaceBySlugOptions;
