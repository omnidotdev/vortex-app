/**
 * Stub types and hooks for the event schema feature.
 *
 * TODO: Remove this file once `eventSchemas` query is added to the API
 * GraphQL schema and codegen regenerates the hooks in `@/generated/graphql`.
 */

import { useMutation, useQuery } from "@tanstack/react-query";

import { graphqlFetch } from "@/lib/graphql/graphqlFetch";

import type { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

// -- Event schema node type (mirrors the expected GraphQL query shape) --

export type EventSchemaNode = {
  rowId: string;
  name: string;
  source: string;
  description: string | null;
  payloadSchema: Record<string, unknown> | null;
  enforcement: string;
  version: number;
  compatibilityMode: string;
  previousVersionId: string | null;
  migrationTransform: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
};

// -- EventSchemas query stubs --

export type EventSchemasQueryVariables = {
  first?: number;
  offset?: number;
  orderBy?: unknown[];
  filter?: unknown;
};

export type EventSchemasQuery = {
  eventSchemas: {
    nodes: EventSchemaNode[];
    totalCount: number;
  };
};

const EventSchemasDocument = `
  query EventSchemas($first: Int, $offset: Int, $orderBy: [EventSchemasOrderBy!], $filter: EventSchemaFilter) {
    eventSchemas(first: $first, offset: $offset, orderBy: $orderBy, filter: $filter) {
      nodes {
        rowId
        name
        source
        description
        payloadSchema
        enforcement
        version
        compatibilityMode
        previousVersionId
        migrationTransform
        createdAt
        updatedAt
      }
      totalCount
    }
  }
`;

export const useEventSchemasQuery = <
  TData = EventSchemasQuery,
  TError = unknown,
>(
  variables: EventSchemasQueryVariables,
  options?: Omit<
    UseQueryOptions<EventSchemasQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<EventSchemasQuery, TError, TData>["queryKey"];
  },
) =>
  useQuery<EventSchemasQuery, TError, TData>({
    queryKey: ["EventSchemas", variables],
    queryFn: graphqlFetch<EventSchemasQuery, EventSchemasQueryVariables>(
      EventSchemasDocument,
      variables,
    ),
    ...options,
  });

useEventSchemasQuery.getKey = (variables: EventSchemasQueryVariables) => [
  "EventSchemas",
  variables,
];

useEventSchemasQuery.fetcher = (
  variables: EventSchemasQueryVariables,
  options?: RequestInit["headers"],
) =>
  graphqlFetch<EventSchemasQuery, EventSchemasQueryVariables>(
    EventSchemasDocument,
    variables,
    options,
  );

// -- PublishEvent mutation stubs --

export type PublishEventInput = {
  type: string;
  organizationId: string;
  data: Record<string, unknown>;
};

export type PublishEventMutationVariables = {
  input: PublishEventInput;
};

export type PublishEventMutation = {
  publishEvent: {
    eventId: string;
    workflowsTriggered: Array<{
      workflowId: string;
      workflowName: string;
      runId: string;
      status: string;
    }>;
  } | null;
};

const PublishEventDocument = `
  mutation PublishEvent($input: PublishEventInput!) {
    publishEvent(input: $input) {
      eventId
      workflowsTriggered {
        workflowId
        workflowName
        runId
        status
      }
    }
  }
`;

export const usePublishEventMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    PublishEventMutation,
    TError,
    PublishEventMutationVariables,
    TContext
  >,
) =>
  useMutation<
    PublishEventMutation,
    TError,
    PublishEventMutationVariables,
    TContext
  >({
    mutationKey: ["PublishEvent"],
    mutationFn: (variables?: PublishEventMutationVariables) =>
      graphqlFetch<PublishEventMutation, PublishEventMutationVariables>(
        PublishEventDocument,
        variables,
      )(),
    ...options,
  });
