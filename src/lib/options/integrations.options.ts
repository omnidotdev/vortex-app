import { queryOptions } from "@tanstack/react-query";

import {
  useIntegrationQuery,
  useIntegrationsQuery,
  useIntegrationDefinitionsQuery,
} from "@/generated/graphql";

import type {
  IntegrationQueryVariables,
  IntegrationsQueryVariables,
  IntegrationDefinitionsQueryVariables,
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

export const integrationDefinitionsOptions = (
  variables: IntegrationDefinitionsQueryVariables = {},
) =>
  queryOptions({
    queryKey: useIntegrationDefinitionsQuery.getKey(variables),
    queryFn: useIntegrationDefinitionsQuery.fetcher(variables),
  });
