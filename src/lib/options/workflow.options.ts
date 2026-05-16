import { queryOptions } from "@tanstack/react-query";

import { useWorkflowQuery } from "@/generated/graphql";

import type { WorkflowQueryVariables } from "@/generated/graphql";

const workflowOptions = (variables: WorkflowQueryVariables) =>
  queryOptions({
    queryKey: useWorkflowQuery.getKey(variables),
    queryFn: useWorkflowQuery.fetcher(variables),
  });

export default workflowOptions;
