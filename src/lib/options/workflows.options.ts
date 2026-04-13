import { queryOptions } from "@tanstack/react-query";

import { useWorkflowsQuery } from "@/generated/graphql";

import type { WorkflowsQueryVariables } from "@/generated/graphql";

const workflowsOptions = (variables: WorkflowsQueryVariables) =>
  queryOptions({
    queryKey: useWorkflowsQuery.getKey(variables),
    queryFn: useWorkflowsQuery.fetcher(variables),
  });

export default workflowsOptions;
