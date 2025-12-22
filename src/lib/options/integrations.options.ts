import { queryOptions } from "@tanstack/react-query";

import { useIntegrationsQuery } from "@/generated/graphql";

import type { IntegrationsQueryVariables } from "@/generated/graphql";

const integrationsOptions = (variables: IntegrationsQueryVariables) =>
  queryOptions({
    queryKey: useIntegrationsQuery.getKey(variables),
    queryFn: useIntegrationsQuery.fetcher(variables),
  });

export default integrationsOptions;
