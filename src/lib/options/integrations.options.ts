import { queryOptions } from "@tanstack/react-query";

import {
  useIntegrationDefinitionQuery,
  useIntegrationDefinitionsQuery,
  useIntegrationQuery,
  useIntegrationsQuery,
} from "@/generated/graphql";

import type {
  IntegrationDefinitionQueryVariables,
  IntegrationDefinitionsQueryVariables,
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

export const integrationDefinitionsOptions = (
  variables: IntegrationDefinitionsQueryVariables = {},
) =>
  queryOptions({
    queryKey: useIntegrationDefinitionsQuery.getKey(variables),
    queryFn: useIntegrationDefinitionsQuery.fetcher(variables),
  });

export const integrationDefinitionOptions = (
  variables: IntegrationDefinitionQueryVariables,
) =>
  queryOptions({
    queryKey: useIntegrationDefinitionQuery.getKey(variables),
    queryFn: useIntegrationDefinitionQuery.fetcher(variables),
  });
