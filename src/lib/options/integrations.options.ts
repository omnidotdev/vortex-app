import { queryOptions } from "@tanstack/react-query";

import { useIntegrationQuery, useIntegrationsQuery } from "@/generated/graphql";

import type {
  IntegrationQueryVariables,
  IntegrationsQueryVariables,
} from "@/generated/graphql";

export const integrationsOptions = (variables: IntegrationsQueryVariables) =>
  queryOptions({
    queryKey: useIntegrationsQuery.getKey(variables),
    queryFn: useIntegrationsQuery.fetcher(variables),
  });

export const integrationOptions = (variables: IntegrationQueryVariables) =>
  queryOptions({
    queryKey: useIntegrationQuery.getKey(variables),
    queryFn: useIntegrationQuery.fetcher(variables),
  });
