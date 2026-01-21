import { queryOptions } from "@tanstack/react-query";

export type WorkspacesQueryVariables = {
  userId: string;
  limit?: number;
};

export type Workspace = {
  rowId: string;
  name: string;
  slug: string;
  tier: string;
  workspaceUsers: {
    totalCount: number;
  };
  currentUser: {
    nodes: Array<{ role: string }>;
  };
};

export type WorkspacesData = {
  workspaces: {
    nodes: Workspace[];
  };
};

// TODO: Implement workspace queries when vortex-api has workspace support
// For now, return empty workspaces
const workspacesOptions = (variables: WorkspacesQueryVariables) =>
  queryOptions({
    queryKey: ["workspaces", variables],
    queryFn: async (): Promise<WorkspacesData> => {
      return {
        workspaces: {
          nodes: [],
        },
      };
    },
  });

export default workspacesOptions;
