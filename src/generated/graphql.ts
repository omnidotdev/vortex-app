// @ts-nocheck
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { useMutation, useQuery, useSuspenseQuery, useInfiniteQuery, useSuspenseInfiniteQuery, UseMutationOptions, UseQueryOptions, UseSuspenseQueryOptions, UseInfiniteQueryOptions, InfiniteData, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetch } from '@/lib/graphql/graphqlFetch';
/** All input for the create `Integration` mutation. */
export type CreateIntegrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  /** The `Integration` to be created by this mutation. */
  integration: IntegrationInput;
};

/** All input for the create `McpServer` mutation. */
export type CreateMcpServerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  /** The `McpServer` to be created by this mutation. */
  mcpServer: McpServerInput;
};

/** All input for the create `Workflow` mutation. */
export type CreateWorkflowInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  /** The `Workflow` to be created by this mutation. */
  workflow: WorkflowInput;
};

/** All input for the `deleteIntegration` mutation. */
export type DeleteIntegrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  rowId: string;
};

/** All input for the `deleteMcpServer` mutation. */
export type DeleteMcpServerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  rowId: string;
};

/** All input for the `deleteWorkflow` mutation. */
export type DeleteWorkflowInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  rowId: string;
};

/** An input for mutations affecting `Integration` */
export type IntegrationInput = {
  authMethod?: string | null | undefined;
  config?: Record<string, unknown> | null | undefined;
  createdAt?: Date | null | undefined;
  definitionId?: string | null | undefined;
  isEnabled?: boolean | null | undefined;
  mcpServerId?: string | null | undefined;
  name: string;
  oauthConnectedAt?: Date | null | undefined;
  oauthStatus?: string | null | undefined;
  organizationId: string;
  rowId?: string | null | undefined;
  type: string;
  updatedAt?: Date | null | undefined;
};

/** Represents an update to a `Integration`. Fields that are set will be updated. */
export type IntegrationPatch = {
  authMethod?: string | null | undefined;
  config?: Record<string, unknown> | null | undefined;
  createdAt?: Date | null | undefined;
  definitionId?: string | null | undefined;
  isEnabled?: boolean | null | undefined;
  mcpServerId?: string | null | undefined;
  name?: string | null | undefined;
  oauthConnectedAt?: Date | null | undefined;
  oauthStatus?: string | null | undefined;
  rowId?: string | null | undefined;
  type?: string | null | undefined;
  updatedAt?: Date | null | undefined;
};

/** An input for mutations affecting `McpServer` */
export type McpServerInput = {
  args?: Record<string, unknown> | null | undefined;
  command?: string | null | undefined;
  createdAt?: Date | null | undefined;
  cwd?: string | null | undefined;
  env?: Record<string, unknown> | null | undefined;
  headers?: Record<string, unknown> | null | undefined;
  isEnabled?: boolean | null | undefined;
  name: string;
  organizationId: string;
  rowId?: string | null | undefined;
  transport?: string | null | undefined;
  type?: string | null | undefined;
  updatedAt?: Date | null | undefined;
  url?: string | null | undefined;
};

/** Represents an update to a `McpServer`. Fields that are set will be updated. */
export type McpServerPatch = {
  args?: Record<string, unknown> | null | undefined;
  command?: string | null | undefined;
  createdAt?: Date | null | undefined;
  cwd?: string | null | undefined;
  env?: Record<string, unknown> | null | undefined;
  headers?: Record<string, unknown> | null | undefined;
  isEnabled?: boolean | null | undefined;
  name?: string | null | undefined;
  rowId?: string | null | undefined;
  transport?: string | null | undefined;
  type?: string | null | undefined;
  updatedAt?: Date | null | undefined;
  url?: string | null | undefined;
};

/** Input for publishing an event to trigger workflows */
export type PublishEventInput = {
  /** Optional correlation ID for tracing related events */
  correlationId?: string | null | undefined;
  /** Event data payload as JSON */
  data?: Record<string, unknown> | null | undefined;
  /** Optional idempotency key for deduplication */
  idempotencyKey?: string | null | undefined;
  /** Organization ID that owns the event routing rules */
  organizationId: string;
  /** Optional event subject (e.g., user ID, subscription ID) */
  subject?: string | null | undefined;
  /** Event type (e.g., "user.created", "subscription.updated") */
  type: string;
};

/** All input for the `updateIntegration` mutation. */
export type UpdateIntegrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  /** An object where the defined keys will be set on the `Integration` being updated. */
  patch: IntegrationPatch;
  rowId: string;
};

/** All input for the `updateMcpServer` mutation. */
export type UpdateMcpServerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  /** An object where the defined keys will be set on the `McpServer` being updated. */
  patch: McpServerPatch;
  rowId: string;
};

/** All input for the `updateWorkflow` mutation. */
export type UpdateWorkflowInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: string | null | undefined;
  /** An object where the defined keys will be set on the `Workflow` being updated. */
  patch: WorkflowPatch;
  rowId: string;
};

/** An input for mutations affecting `Workflow` */
export type WorkflowInput = {
  createdAt?: Date | null | undefined;
  createdBy?: string | null | undefined;
  cronExpression?: string | null | undefined;
  definition: Record<string, unknown>;
  description?: string | null | undefined;
  executor?: string | null | undefined;
  isActive?: boolean | null | undefined;
  lastRunAt?: Date | null | undefined;
  lastRunStatus?: string | null | undefined;
  name: string;
  organizationId: string;
  rowId?: string | null | undefined;
  updatedAt?: Date | null | undefined;
  version?: number | null | undefined;
  webhookSecret?: string | null | undefined;
};

/** Represents an update to a `Workflow`. Fields that are set will be updated. */
export type WorkflowPatch = {
  createdAt?: Date | null | undefined;
  createdBy?: string | null | undefined;
  cronExpression?: string | null | undefined;
  definition?: Record<string, unknown> | null | undefined;
  description?: string | null | undefined;
  executor?: string | null | undefined;
  isActive?: boolean | null | undefined;
  lastRunAt?: Date | null | undefined;
  lastRunStatus?: string | null | undefined;
  name?: string | null | undefined;
  rowId?: string | null | undefined;
  updatedAt?: Date | null | undefined;
  version?: number | null | undefined;
  webhookSecret?: string | null | undefined;
};

export type PublishEventMutationVariables = Exact<{
  input: PublishEventInput;
}>;


export type PublishEventMutation = { publishEvent: { eventId: string, workflowsTriggered: Array<{ workflowId: string, workflowName: string, runId: string, status: string }> } | null };

export type CreateIntegrationMutationVariables = Exact<{
  input: CreateIntegrationInput;
}>;


export type CreateIntegrationMutation = { createIntegration: { integration: { rowId: string, name: string, type: string, isEnabled: boolean, createdAt: Date | null } | null } | null };

export type UpdateIntegrationMutationVariables = Exact<{
  input: UpdateIntegrationInput;
}>;


export type UpdateIntegrationMutation = { updateIntegration: { integration: { rowId: string, name: string, type: string, isEnabled: boolean, updatedAt: Date | null } | null } | null };

export type DeleteIntegrationMutationVariables = Exact<{
  input: DeleteIntegrationInput;
}>;


export type DeleteIntegrationMutation = { deleteIntegration: { integration: { rowId: string, name: string } | null } | null };

export type CreateMcpServerMutationVariables = Exact<{
  input: CreateMcpServerInput;
}>;


export type CreateMcpServerMutation = { createMcpServer: { mcpServer: { rowId: string, name: string, type: string, command: string | null, args: Record<string, unknown>, isEnabled: boolean, createdAt: Date | null } | null } | null };

export type UpdateMcpServerMutationVariables = Exact<{
  input: UpdateMcpServerInput;
}>;


export type UpdateMcpServerMutation = { updateMcpServer: { mcpServer: { rowId: string, name: string, type: string, command: string | null, args: Record<string, unknown>, isEnabled: boolean, updatedAt: Date | null } | null } | null };

export type DeleteMcpServerMutationVariables = Exact<{
  input: DeleteMcpServerInput;
}>;


export type DeleteMcpServerMutation = { deleteMcpServer: { mcpServer: { rowId: string, name: string } | null } | null };

export type CreateWorkflowMutationVariables = Exact<{
  input: CreateWorkflowInput;
}>;


export type CreateWorkflowMutation = { createWorkflow: { workflow: { rowId: string, organizationId: string, name: string, description: string | null, definition: Record<string, unknown>, cronExpression: string | null, isActive: boolean, createdAt: Date | null } | null } | null };

export type DeleteWorkflowMutationVariables = Exact<{
  input: DeleteWorkflowInput;
}>;


export type DeleteWorkflowMutation = { deleteWorkflow: { workflow: { rowId: string } | null } | null };

export type UpdateWorkflowMutationVariables = Exact<{
  input: UpdateWorkflowInput;
}>;


export type UpdateWorkflowMutation = { updateWorkflow: { workflow: { rowId: string, organizationId: string, name: string, description: string | null, definition: Record<string, unknown>, cronExpression: string | null, isActive: boolean, updatedAt: Date | null } | null } | null };

export type IntegrationDefinitionsQueryVariables = Exact<{
  isFeatured?: boolean | null | undefined;
}>;


export type IntegrationDefinitionsQuery = { integrationDefinitions: { totalCount: number, nodes: Array<{ id: string, rowId: string, name: string, description: string | null, iconUrl: string | null, category: string, authType: string, authFields: Record<string, unknown>, isFeatured: boolean, keepAlive: boolean, setupSteps: Record<string, unknown> | null, docsUrl: string | null, supportsOAuth: boolean }> } | null };

export type IntegrationDefinitionQueryVariables = Exact<{
  rowId: string;
}>;


export type IntegrationDefinitionQuery = { integrationDefinition: { id: string, rowId: string, name: string, description: string | null, iconUrl: string | null, category: string, authType: string, authFields: Record<string, unknown>, mcpPackage: string, mcpCommand: string, mcpArgs: Record<string, unknown>, keepAlive: boolean, idleTimeoutMs: number, isFeatured: boolean, isEnabled: boolean, setupSteps: Record<string, unknown> | null, docsUrl: string | null, supportsOAuth: boolean } | null };

export type IntegrationsQueryVariables = Exact<{
  organizationId: string;
  limit?: number | null | undefined;
}>;


export type IntegrationsQuery = { integrations: { totalCount: number, nodes: Array<{ rowId: string, name: string, type: string, isEnabled: boolean, mcpServerId: string | null, createdAt: Date | null, updatedAt: Date | null }> } | null };

export type IntegrationQueryVariables = Exact<{
  id: string;
}>;


export type IntegrationQuery = { integration: { rowId: string, name: string, type: string, isEnabled: boolean, config: Record<string, unknown>, createdAt: Date | null, updatedAt: Date | null } | null };

export type PluginsQueryVariables = Exact<{
  organizationId: string;
  limit?: number | null | undefined;
}>;


export type PluginsQuery = { plugins: { totalCount: number, nodes: Array<{ rowId: string, name: string, version: string, manifest: Record<string, unknown>, wasmUrl: string, isEnabled: boolean, isVerified: boolean, createdAt: Date | null, updatedAt: Date | null }> } | null };

export type WorkflowQueryVariables = Exact<{
  rowId: string;
}>;


export type WorkflowQuery = { workflow: { rowId: string, organizationId: string, name: string, description: string | null, definition: Record<string, unknown>, cronExpression: string | null, webhookSecret: string | null, isActive: boolean, createdAt: Date | null, updatedAt: Date | null, workflowRuns: { totalCount: number, nodes: Array<{ rowId: string, engineWorkflowId: string, status: string, startedAt: Date | null, completedAt: Date | null, input: Record<string, unknown> | null, output: Record<string, unknown> | null, error: string | null, createdAt: Date | null, workflowStepLogs: { nodes: Array<{ rowId: string, stepId: string, stepName: string, stepType: string, status: string, input: Record<string, unknown> | null, output: Record<string, unknown> | null, error: string | null, startedAt: Date | null, completedAt: Date | null }> } }> } } | null };

export type WorkflowsQueryVariables = Exact<{
  organizationId: string;
  limit?: number | null | undefined;
}>;


export type WorkflowsQuery = { workflows: { totalCount: number, nodes: Array<{ rowId: string, name: string, description: string | null, cronExpression: string | null, isActive: boolean, createdAt: Date | null, updatedAt: Date | null, workflowRuns: { nodes: Array<{ rowId: string, status: string, createdAt: Date | null }> } }> } | null };


export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const PublishEventDocument = new TypedDocumentString(`
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
    `);

export const usePublishEventMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<PublishEventMutation, TError, PublishEventMutationVariables, TContext>) => {
    
    return useMutation<PublishEventMutation, TError, PublishEventMutationVariables, TContext>(
      {
    mutationKey: ['PublishEvent'],
    mutationFn: (variables?: PublishEventMutationVariables) => graphqlFetch<PublishEventMutation, PublishEventMutationVariables>(PublishEventDocument, variables)(),
    ...options
  }
    )};

usePublishEventMutation.getKey = () => ['PublishEvent'];


usePublishEventMutation.fetcher = (variables: PublishEventMutationVariables, options?: RequestInit['headers']) => graphqlFetch<PublishEventMutation, PublishEventMutationVariables>(PublishEventDocument, variables, options);

export const CreateIntegrationDocument = new TypedDocumentString(`
    mutation CreateIntegration($input: CreateIntegrationInput!) {
  createIntegration(input: $input) {
    integration {
      rowId
      name
      type
      isEnabled
      createdAt
    }
  }
}
    `);

export const useCreateIntegrationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateIntegrationMutation, TError, CreateIntegrationMutationVariables, TContext>) => {
    
    return useMutation<CreateIntegrationMutation, TError, CreateIntegrationMutationVariables, TContext>(
      {
    mutationKey: ['CreateIntegration'],
    mutationFn: (variables?: CreateIntegrationMutationVariables) => graphqlFetch<CreateIntegrationMutation, CreateIntegrationMutationVariables>(CreateIntegrationDocument, variables)(),
    ...options
  }
    )};

useCreateIntegrationMutation.getKey = () => ['CreateIntegration'];


useCreateIntegrationMutation.fetcher = (variables: CreateIntegrationMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateIntegrationMutation, CreateIntegrationMutationVariables>(CreateIntegrationDocument, variables, options);

export const UpdateIntegrationDocument = new TypedDocumentString(`
    mutation UpdateIntegration($input: UpdateIntegrationInput!) {
  updateIntegration(input: $input) {
    integration {
      rowId
      name
      type
      isEnabled
      updatedAt
    }
  }
}
    `);

export const useUpdateIntegrationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateIntegrationMutation, TError, UpdateIntegrationMutationVariables, TContext>) => {
    
    return useMutation<UpdateIntegrationMutation, TError, UpdateIntegrationMutationVariables, TContext>(
      {
    mutationKey: ['UpdateIntegration'],
    mutationFn: (variables?: UpdateIntegrationMutationVariables) => graphqlFetch<UpdateIntegrationMutation, UpdateIntegrationMutationVariables>(UpdateIntegrationDocument, variables)(),
    ...options
  }
    )};

useUpdateIntegrationMutation.getKey = () => ['UpdateIntegration'];


useUpdateIntegrationMutation.fetcher = (variables: UpdateIntegrationMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdateIntegrationMutation, UpdateIntegrationMutationVariables>(UpdateIntegrationDocument, variables, options);

export const DeleteIntegrationDocument = new TypedDocumentString(`
    mutation DeleteIntegration($input: DeleteIntegrationInput!) {
  deleteIntegration(input: $input) {
    integration {
      rowId
      name
    }
  }
}
    `);

export const useDeleteIntegrationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteIntegrationMutation, TError, DeleteIntegrationMutationVariables, TContext>) => {
    
    return useMutation<DeleteIntegrationMutation, TError, DeleteIntegrationMutationVariables, TContext>(
      {
    mutationKey: ['DeleteIntegration'],
    mutationFn: (variables?: DeleteIntegrationMutationVariables) => graphqlFetch<DeleteIntegrationMutation, DeleteIntegrationMutationVariables>(DeleteIntegrationDocument, variables)(),
    ...options
  }
    )};

useDeleteIntegrationMutation.getKey = () => ['DeleteIntegration'];


useDeleteIntegrationMutation.fetcher = (variables: DeleteIntegrationMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteIntegrationMutation, DeleteIntegrationMutationVariables>(DeleteIntegrationDocument, variables, options);

export const CreateMcpServerDocument = new TypedDocumentString(`
    mutation CreateMcpServer($input: CreateMcpServerInput!) {
  createMcpServer(input: $input) {
    mcpServer {
      rowId
      name
      type
      command
      args
      isEnabled
      createdAt
    }
  }
}
    `);

export const useCreateMcpServerMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateMcpServerMutation, TError, CreateMcpServerMutationVariables, TContext>) => {
    
    return useMutation<CreateMcpServerMutation, TError, CreateMcpServerMutationVariables, TContext>(
      {
    mutationKey: ['CreateMcpServer'],
    mutationFn: (variables?: CreateMcpServerMutationVariables) => graphqlFetch<CreateMcpServerMutation, CreateMcpServerMutationVariables>(CreateMcpServerDocument, variables)(),
    ...options
  }
    )};

useCreateMcpServerMutation.getKey = () => ['CreateMcpServer'];


useCreateMcpServerMutation.fetcher = (variables: CreateMcpServerMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateMcpServerMutation, CreateMcpServerMutationVariables>(CreateMcpServerDocument, variables, options);

export const UpdateMcpServerDocument = new TypedDocumentString(`
    mutation UpdateMcpServer($input: UpdateMcpServerInput!) {
  updateMcpServer(input: $input) {
    mcpServer {
      rowId
      name
      type
      command
      args
      isEnabled
      updatedAt
    }
  }
}
    `);

export const useUpdateMcpServerMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateMcpServerMutation, TError, UpdateMcpServerMutationVariables, TContext>) => {
    
    return useMutation<UpdateMcpServerMutation, TError, UpdateMcpServerMutationVariables, TContext>(
      {
    mutationKey: ['UpdateMcpServer'],
    mutationFn: (variables?: UpdateMcpServerMutationVariables) => graphqlFetch<UpdateMcpServerMutation, UpdateMcpServerMutationVariables>(UpdateMcpServerDocument, variables)(),
    ...options
  }
    )};

useUpdateMcpServerMutation.getKey = () => ['UpdateMcpServer'];


useUpdateMcpServerMutation.fetcher = (variables: UpdateMcpServerMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdateMcpServerMutation, UpdateMcpServerMutationVariables>(UpdateMcpServerDocument, variables, options);

export const DeleteMcpServerDocument = new TypedDocumentString(`
    mutation DeleteMcpServer($input: DeleteMcpServerInput!) {
  deleteMcpServer(input: $input) {
    mcpServer {
      rowId
      name
    }
  }
}
    `);

export const useDeleteMcpServerMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteMcpServerMutation, TError, DeleteMcpServerMutationVariables, TContext>) => {
    
    return useMutation<DeleteMcpServerMutation, TError, DeleteMcpServerMutationVariables, TContext>(
      {
    mutationKey: ['DeleteMcpServer'],
    mutationFn: (variables?: DeleteMcpServerMutationVariables) => graphqlFetch<DeleteMcpServerMutation, DeleteMcpServerMutationVariables>(DeleteMcpServerDocument, variables)(),
    ...options
  }
    )};

useDeleteMcpServerMutation.getKey = () => ['DeleteMcpServer'];


useDeleteMcpServerMutation.fetcher = (variables: DeleteMcpServerMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteMcpServerMutation, DeleteMcpServerMutationVariables>(DeleteMcpServerDocument, variables, options);

export const CreateWorkflowDocument = new TypedDocumentString(`
    mutation CreateWorkflow($input: CreateWorkflowInput!) {
  createWorkflow(input: $input) {
    workflow {
      rowId
      organizationId
      name
      description
      definition
      cronExpression
      isActive
      createdAt
    }
  }
}
    `);

export const useCreateWorkflowMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateWorkflowMutation, TError, CreateWorkflowMutationVariables, TContext>) => {
    
    return useMutation<CreateWorkflowMutation, TError, CreateWorkflowMutationVariables, TContext>(
      {
    mutationKey: ['CreateWorkflow'],
    mutationFn: (variables?: CreateWorkflowMutationVariables) => graphqlFetch<CreateWorkflowMutation, CreateWorkflowMutationVariables>(CreateWorkflowDocument, variables)(),
    ...options
  }
    )};

useCreateWorkflowMutation.getKey = () => ['CreateWorkflow'];


useCreateWorkflowMutation.fetcher = (variables: CreateWorkflowMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateWorkflowMutation, CreateWorkflowMutationVariables>(CreateWorkflowDocument, variables, options);

export const DeleteWorkflowDocument = new TypedDocumentString(`
    mutation DeleteWorkflow($input: DeleteWorkflowInput!) {
  deleteWorkflow(input: $input) {
    workflow {
      rowId
    }
  }
}
    `);

export const useDeleteWorkflowMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteWorkflowMutation, TError, DeleteWorkflowMutationVariables, TContext>) => {
    
    return useMutation<DeleteWorkflowMutation, TError, DeleteWorkflowMutationVariables, TContext>(
      {
    mutationKey: ['DeleteWorkflow'],
    mutationFn: (variables?: DeleteWorkflowMutationVariables) => graphqlFetch<DeleteWorkflowMutation, DeleteWorkflowMutationVariables>(DeleteWorkflowDocument, variables)(),
    ...options
  }
    )};

useDeleteWorkflowMutation.getKey = () => ['DeleteWorkflow'];


useDeleteWorkflowMutation.fetcher = (variables: DeleteWorkflowMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteWorkflowMutation, DeleteWorkflowMutationVariables>(DeleteWorkflowDocument, variables, options);

export const UpdateWorkflowDocument = new TypedDocumentString(`
    mutation UpdateWorkflow($input: UpdateWorkflowInput!) {
  updateWorkflow(input: $input) {
    workflow {
      rowId
      organizationId
      name
      description
      definition
      cronExpression
      isActive
      updatedAt
    }
  }
}
    `);

export const useUpdateWorkflowMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateWorkflowMutation, TError, UpdateWorkflowMutationVariables, TContext>) => {
    
    return useMutation<UpdateWorkflowMutation, TError, UpdateWorkflowMutationVariables, TContext>(
      {
    mutationKey: ['UpdateWorkflow'],
    mutationFn: (variables?: UpdateWorkflowMutationVariables) => graphqlFetch<UpdateWorkflowMutation, UpdateWorkflowMutationVariables>(UpdateWorkflowDocument, variables)(),
    ...options
  }
    )};

useUpdateWorkflowMutation.getKey = () => ['UpdateWorkflow'];


useUpdateWorkflowMutation.fetcher = (variables: UpdateWorkflowMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdateWorkflowMutation, UpdateWorkflowMutationVariables>(UpdateWorkflowDocument, variables, options);

export const IntegrationDefinitionsDocument = new TypedDocumentString(`
    query IntegrationDefinitions($isFeatured: Boolean) {
  integrationDefinitions(
    condition: {isFeatured: $isFeatured, isEnabled: true}
    orderBy: NAME_ASC
  ) {
    nodes {
      id
      rowId
      name
      description
      iconUrl
      category
      authType
      authFields
      isFeatured
      keepAlive
      setupSteps
      docsUrl
      supportsOAuth
    }
    totalCount
  }
}
    `);

export const useIntegrationDefinitionsQuery = <
      TData = IntegrationDefinitionsQuery,
      TError = unknown
    >(
      variables?: IntegrationDefinitionsQueryVariables,
      options?: Omit<UseQueryOptions<IntegrationDefinitionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<IntegrationDefinitionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<IntegrationDefinitionsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['IntegrationDefinitions'] : ['IntegrationDefinitions', variables],
    queryFn: graphqlFetch<IntegrationDefinitionsQuery, IntegrationDefinitionsQueryVariables>(IntegrationDefinitionsDocument, variables),
    ...options
  }
    )};

useIntegrationDefinitionsQuery.getKey = (variables?: IntegrationDefinitionsQueryVariables) => variables === undefined ? ['IntegrationDefinitions'] : ['IntegrationDefinitions', variables];

export const useSuspenseIntegrationDefinitionsQuery = <
      TData = IntegrationDefinitionsQuery,
      TError = unknown
    >(
      variables?: IntegrationDefinitionsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<IntegrationDefinitionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<IntegrationDefinitionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<IntegrationDefinitionsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['IntegrationDefinitions'] : ['IntegrationDefinitions', variables],
    queryFn: graphqlFetch<IntegrationDefinitionsQuery, IntegrationDefinitionsQueryVariables>(IntegrationDefinitionsDocument, variables),
    ...options
  }
    )};

useSuspenseIntegrationDefinitionsQuery.getKey = (variables?: IntegrationDefinitionsQueryVariables) => variables === undefined ? ['IntegrationDefinitions'] : ['IntegrationDefinitions', variables];

export const useInfiniteIntegrationDefinitionsQuery = <
      TData = InfiniteData<IntegrationDefinitionsQuery>,
      TError = unknown
    >(
      variables: IntegrationDefinitionsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<IntegrationDefinitionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<IntegrationDefinitionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<IntegrationDefinitionsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['IntegrationDefinitions.infinite'] : ['IntegrationDefinitions.infinite', variables],
      queryFn: (metaData) => graphqlFetch<IntegrationDefinitionsQuery, IntegrationDefinitionsQueryVariables>(IntegrationDefinitionsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteIntegrationDefinitionsQuery.getKey = (variables?: IntegrationDefinitionsQueryVariables) => variables === undefined ? ['IntegrationDefinitions.infinite'] : ['IntegrationDefinitions.infinite', variables];

export const useSuspenseInfiniteIntegrationDefinitionsQuery = <
      TData = InfiniteData<IntegrationDefinitionsQuery>,
      TError = unknown
    >(
      variables: IntegrationDefinitionsQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<IntegrationDefinitionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<IntegrationDefinitionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<IntegrationDefinitionsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['IntegrationDefinitions.infinite'] : ['IntegrationDefinitions.infinite', variables],
      queryFn: (metaData) => graphqlFetch<IntegrationDefinitionsQuery, IntegrationDefinitionsQueryVariables>(IntegrationDefinitionsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteIntegrationDefinitionsQuery.getKey = (variables?: IntegrationDefinitionsQueryVariables) => variables === undefined ? ['IntegrationDefinitions.infinite'] : ['IntegrationDefinitions.infinite', variables];


useIntegrationDefinitionsQuery.fetcher = (variables?: IntegrationDefinitionsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<IntegrationDefinitionsQuery, IntegrationDefinitionsQueryVariables>(IntegrationDefinitionsDocument, variables, options);

export const IntegrationDefinitionDocument = new TypedDocumentString(`
    query IntegrationDefinition($rowId: String!) {
  integrationDefinition(rowId: $rowId) {
    id
    rowId
    name
    description
    iconUrl
    category
    authType
    authFields
    mcpPackage
    mcpCommand
    mcpArgs
    keepAlive
    idleTimeoutMs
    isFeatured
    isEnabled
    setupSteps
    docsUrl
    supportsOAuth
  }
}
    `);

export const useIntegrationDefinitionQuery = <
      TData = IntegrationDefinitionQuery,
      TError = unknown
    >(
      variables: IntegrationDefinitionQueryVariables,
      options?: Omit<UseQueryOptions<IntegrationDefinitionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<IntegrationDefinitionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<IntegrationDefinitionQuery, TError, TData>(
      {
    queryKey: ['IntegrationDefinition', variables],
    queryFn: graphqlFetch<IntegrationDefinitionQuery, IntegrationDefinitionQueryVariables>(IntegrationDefinitionDocument, variables),
    ...options
  }
    )};

useIntegrationDefinitionQuery.getKey = (variables: IntegrationDefinitionQueryVariables) => ['IntegrationDefinition', variables];

export const useSuspenseIntegrationDefinitionQuery = <
      TData = IntegrationDefinitionQuery,
      TError = unknown
    >(
      variables: IntegrationDefinitionQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<IntegrationDefinitionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<IntegrationDefinitionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<IntegrationDefinitionQuery, TError, TData>(
      {
    queryKey: ['IntegrationDefinition', variables],
    queryFn: graphqlFetch<IntegrationDefinitionQuery, IntegrationDefinitionQueryVariables>(IntegrationDefinitionDocument, variables),
    ...options
  }
    )};

useSuspenseIntegrationDefinitionQuery.getKey = (variables: IntegrationDefinitionQueryVariables) => ['IntegrationDefinition', variables];

export const useInfiniteIntegrationDefinitionQuery = <
      TData = InfiniteData<IntegrationDefinitionQuery>,
      TError = unknown
    >(
      variables: IntegrationDefinitionQueryVariables,
      options: Omit<UseInfiniteQueryOptions<IntegrationDefinitionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<IntegrationDefinitionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<IntegrationDefinitionQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['IntegrationDefinition.infinite', variables],
      queryFn: (metaData) => graphqlFetch<IntegrationDefinitionQuery, IntegrationDefinitionQueryVariables>(IntegrationDefinitionDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteIntegrationDefinitionQuery.getKey = (variables: IntegrationDefinitionQueryVariables) => ['IntegrationDefinition.infinite', variables];

export const useSuspenseInfiniteIntegrationDefinitionQuery = <
      TData = InfiniteData<IntegrationDefinitionQuery>,
      TError = unknown
    >(
      variables: IntegrationDefinitionQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<IntegrationDefinitionQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<IntegrationDefinitionQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<IntegrationDefinitionQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['IntegrationDefinition.infinite', variables],
      queryFn: (metaData) => graphqlFetch<IntegrationDefinitionQuery, IntegrationDefinitionQueryVariables>(IntegrationDefinitionDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteIntegrationDefinitionQuery.getKey = (variables: IntegrationDefinitionQueryVariables) => ['IntegrationDefinition.infinite', variables];


useIntegrationDefinitionQuery.fetcher = (variables: IntegrationDefinitionQueryVariables, options?: RequestInit['headers']) => graphqlFetch<IntegrationDefinitionQuery, IntegrationDefinitionQueryVariables>(IntegrationDefinitionDocument, variables, options);

export const IntegrationsDocument = new TypedDocumentString(`
    query Integrations($organizationId: String!, $limit: Int) {
  integrations(
    condition: {organizationId: $organizationId}
    orderBy: NAME_ASC
    first: $limit
  ) {
    nodes {
      rowId
      name
      type
      isEnabled
      mcpServerId
      createdAt
      updatedAt
    }
    totalCount
  }
}
    `);

export const useIntegrationsQuery = <
      TData = IntegrationsQuery,
      TError = unknown
    >(
      variables: IntegrationsQueryVariables,
      options?: Omit<UseQueryOptions<IntegrationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<IntegrationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<IntegrationsQuery, TError, TData>(
      {
    queryKey: ['Integrations', variables],
    queryFn: graphqlFetch<IntegrationsQuery, IntegrationsQueryVariables>(IntegrationsDocument, variables),
    ...options
  }
    )};

useIntegrationsQuery.getKey = (variables: IntegrationsQueryVariables) => ['Integrations', variables];

export const useSuspenseIntegrationsQuery = <
      TData = IntegrationsQuery,
      TError = unknown
    >(
      variables: IntegrationsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<IntegrationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<IntegrationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<IntegrationsQuery, TError, TData>(
      {
    queryKey: ['Integrations', variables],
    queryFn: graphqlFetch<IntegrationsQuery, IntegrationsQueryVariables>(IntegrationsDocument, variables),
    ...options
  }
    )};

useSuspenseIntegrationsQuery.getKey = (variables: IntegrationsQueryVariables) => ['Integrations', variables];

export const useInfiniteIntegrationsQuery = <
      TData = InfiniteData<IntegrationsQuery>,
      TError = unknown
    >(
      variables: IntegrationsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<IntegrationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<IntegrationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<IntegrationsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Integrations.infinite', variables],
      queryFn: (metaData) => graphqlFetch<IntegrationsQuery, IntegrationsQueryVariables>(IntegrationsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteIntegrationsQuery.getKey = (variables: IntegrationsQueryVariables) => ['Integrations.infinite', variables];

export const useSuspenseInfiniteIntegrationsQuery = <
      TData = InfiniteData<IntegrationsQuery>,
      TError = unknown
    >(
      variables: IntegrationsQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<IntegrationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<IntegrationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<IntegrationsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Integrations.infinite', variables],
      queryFn: (metaData) => graphqlFetch<IntegrationsQuery, IntegrationsQueryVariables>(IntegrationsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteIntegrationsQuery.getKey = (variables: IntegrationsQueryVariables) => ['Integrations.infinite', variables];


useIntegrationsQuery.fetcher = (variables: IntegrationsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<IntegrationsQuery, IntegrationsQueryVariables>(IntegrationsDocument, variables, options);

export const IntegrationDocument = new TypedDocumentString(`
    query Integration($id: UUID!) {
  integration(rowId: $id) {
    rowId
    name
    type
    isEnabled
    config
    createdAt
    updatedAt
  }
}
    `);

export const useIntegrationQuery = <
      TData = IntegrationQuery,
      TError = unknown
    >(
      variables: IntegrationQueryVariables,
      options?: Omit<UseQueryOptions<IntegrationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<IntegrationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<IntegrationQuery, TError, TData>(
      {
    queryKey: ['Integration', variables],
    queryFn: graphqlFetch<IntegrationQuery, IntegrationQueryVariables>(IntegrationDocument, variables),
    ...options
  }
    )};

useIntegrationQuery.getKey = (variables: IntegrationQueryVariables) => ['Integration', variables];

export const useSuspenseIntegrationQuery = <
      TData = IntegrationQuery,
      TError = unknown
    >(
      variables: IntegrationQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<IntegrationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<IntegrationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<IntegrationQuery, TError, TData>(
      {
    queryKey: ['Integration', variables],
    queryFn: graphqlFetch<IntegrationQuery, IntegrationQueryVariables>(IntegrationDocument, variables),
    ...options
  }
    )};

useSuspenseIntegrationQuery.getKey = (variables: IntegrationQueryVariables) => ['Integration', variables];

export const useInfiniteIntegrationQuery = <
      TData = InfiniteData<IntegrationQuery>,
      TError = unknown
    >(
      variables: IntegrationQueryVariables,
      options: Omit<UseInfiniteQueryOptions<IntegrationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<IntegrationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<IntegrationQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Integration.infinite', variables],
      queryFn: (metaData) => graphqlFetch<IntegrationQuery, IntegrationQueryVariables>(IntegrationDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteIntegrationQuery.getKey = (variables: IntegrationQueryVariables) => ['Integration.infinite', variables];

export const useSuspenseInfiniteIntegrationQuery = <
      TData = InfiniteData<IntegrationQuery>,
      TError = unknown
    >(
      variables: IntegrationQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<IntegrationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<IntegrationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<IntegrationQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Integration.infinite', variables],
      queryFn: (metaData) => graphqlFetch<IntegrationQuery, IntegrationQueryVariables>(IntegrationDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteIntegrationQuery.getKey = (variables: IntegrationQueryVariables) => ['Integration.infinite', variables];


useIntegrationQuery.fetcher = (variables: IntegrationQueryVariables, options?: RequestInit['headers']) => graphqlFetch<IntegrationQuery, IntegrationQueryVariables>(IntegrationDocument, variables, options);

export const PluginsDocument = new TypedDocumentString(`
    query Plugins($organizationId: String!, $limit: Int) {
  plugins(
    condition: {organizationId: $organizationId}
    orderBy: NAME_ASC
    first: $limit
  ) {
    nodes {
      rowId
      name
      version
      manifest
      wasmUrl
      isEnabled
      isVerified
      createdAt
      updatedAt
    }
    totalCount
  }
}
    `);

export const usePluginsQuery = <
      TData = PluginsQuery,
      TError = unknown
    >(
      variables: PluginsQueryVariables,
      options?: Omit<UseQueryOptions<PluginsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<PluginsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<PluginsQuery, TError, TData>(
      {
    queryKey: ['Plugins', variables],
    queryFn: graphqlFetch<PluginsQuery, PluginsQueryVariables>(PluginsDocument, variables),
    ...options
  }
    )};

usePluginsQuery.getKey = (variables: PluginsQueryVariables) => ['Plugins', variables];

export const useSuspensePluginsQuery = <
      TData = PluginsQuery,
      TError = unknown
    >(
      variables: PluginsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<PluginsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<PluginsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<PluginsQuery, TError, TData>(
      {
    queryKey: ['Plugins', variables],
    queryFn: graphqlFetch<PluginsQuery, PluginsQueryVariables>(PluginsDocument, variables),
    ...options
  }
    )};

useSuspensePluginsQuery.getKey = (variables: PluginsQueryVariables) => ['Plugins', variables];

export const useInfinitePluginsQuery = <
      TData = InfiniteData<PluginsQuery>,
      TError = unknown
    >(
      variables: PluginsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<PluginsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<PluginsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<PluginsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Plugins.infinite', variables],
      queryFn: (metaData) => graphqlFetch<PluginsQuery, PluginsQueryVariables>(PluginsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfinitePluginsQuery.getKey = (variables: PluginsQueryVariables) => ['Plugins.infinite', variables];

export const useSuspenseInfinitePluginsQuery = <
      TData = InfiniteData<PluginsQuery>,
      TError = unknown
    >(
      variables: PluginsQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<PluginsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<PluginsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<PluginsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Plugins.infinite', variables],
      queryFn: (metaData) => graphqlFetch<PluginsQuery, PluginsQueryVariables>(PluginsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfinitePluginsQuery.getKey = (variables: PluginsQueryVariables) => ['Plugins.infinite', variables];


usePluginsQuery.fetcher = (variables: PluginsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<PluginsQuery, PluginsQueryVariables>(PluginsDocument, variables, options);

export const WorkflowDocument = new TypedDocumentString(`
    query Workflow($rowId: UUID!) {
  workflow(rowId: $rowId) {
    rowId
    organizationId
    name
    description
    definition
    cronExpression
    webhookSecret
    isActive
    createdAt
    updatedAt
    workflowRuns(orderBy: CREATED_AT_DESC, first: 10) {
      nodes {
        rowId
        engineWorkflowId
        status
        startedAt
        completedAt
        input
        output
        error
        createdAt
        workflowStepLogs(orderBy: STARTED_AT_ASC) {
          nodes {
            rowId
            stepId
            stepName
            stepType
            status
            input
            output
            error
            startedAt
            completedAt
          }
        }
      }
      totalCount
    }
  }
}
    `);

export const useWorkflowQuery = <
      TData = WorkflowQuery,
      TError = unknown
    >(
      variables: WorkflowQueryVariables,
      options?: Omit<UseQueryOptions<WorkflowQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<WorkflowQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<WorkflowQuery, TError, TData>(
      {
    queryKey: ['Workflow', variables],
    queryFn: graphqlFetch<WorkflowQuery, WorkflowQueryVariables>(WorkflowDocument, variables),
    ...options
  }
    )};

useWorkflowQuery.getKey = (variables: WorkflowQueryVariables) => ['Workflow', variables];

export const useSuspenseWorkflowQuery = <
      TData = WorkflowQuery,
      TError = unknown
    >(
      variables: WorkflowQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<WorkflowQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<WorkflowQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<WorkflowQuery, TError, TData>(
      {
    queryKey: ['Workflow', variables],
    queryFn: graphqlFetch<WorkflowQuery, WorkflowQueryVariables>(WorkflowDocument, variables),
    ...options
  }
    )};

useSuspenseWorkflowQuery.getKey = (variables: WorkflowQueryVariables) => ['Workflow', variables];

export const useInfiniteWorkflowQuery = <
      TData = InfiniteData<WorkflowQuery>,
      TError = unknown
    >(
      variables: WorkflowQueryVariables,
      options: Omit<UseInfiniteQueryOptions<WorkflowQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<WorkflowQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<WorkflowQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Workflow.infinite', variables],
      queryFn: (metaData) => graphqlFetch<WorkflowQuery, WorkflowQueryVariables>(WorkflowDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteWorkflowQuery.getKey = (variables: WorkflowQueryVariables) => ['Workflow.infinite', variables];

export const useSuspenseInfiniteWorkflowQuery = <
      TData = InfiniteData<WorkflowQuery>,
      TError = unknown
    >(
      variables: WorkflowQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<WorkflowQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<WorkflowQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<WorkflowQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Workflow.infinite', variables],
      queryFn: (metaData) => graphqlFetch<WorkflowQuery, WorkflowQueryVariables>(WorkflowDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteWorkflowQuery.getKey = (variables: WorkflowQueryVariables) => ['Workflow.infinite', variables];


useWorkflowQuery.fetcher = (variables: WorkflowQueryVariables, options?: RequestInit['headers']) => graphqlFetch<WorkflowQuery, WorkflowQueryVariables>(WorkflowDocument, variables, options);

export const WorkflowsDocument = new TypedDocumentString(`
    query Workflows($organizationId: String!, $limit: Int) {
  workflows(
    condition: {organizationId: $organizationId}
    orderBy: NAME_ASC
    first: $limit
  ) {
    nodes {
      rowId
      name
      description
      cronExpression
      isActive
      createdAt
      updatedAt
      workflowRuns(orderBy: CREATED_AT_DESC, first: 1) {
        nodes {
          rowId
          status
          createdAt
        }
      }
    }
    totalCount
  }
}
    `);

export const useWorkflowsQuery = <
      TData = WorkflowsQuery,
      TError = unknown
    >(
      variables: WorkflowsQueryVariables,
      options?: Omit<UseQueryOptions<WorkflowsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<WorkflowsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<WorkflowsQuery, TError, TData>(
      {
    queryKey: ['Workflows', variables],
    queryFn: graphqlFetch<WorkflowsQuery, WorkflowsQueryVariables>(WorkflowsDocument, variables),
    ...options
  }
    )};

useWorkflowsQuery.getKey = (variables: WorkflowsQueryVariables) => ['Workflows', variables];

export const useSuspenseWorkflowsQuery = <
      TData = WorkflowsQuery,
      TError = unknown
    >(
      variables: WorkflowsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<WorkflowsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<WorkflowsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<WorkflowsQuery, TError, TData>(
      {
    queryKey: ['Workflows', variables],
    queryFn: graphqlFetch<WorkflowsQuery, WorkflowsQueryVariables>(WorkflowsDocument, variables),
    ...options
  }
    )};

useSuspenseWorkflowsQuery.getKey = (variables: WorkflowsQueryVariables) => ['Workflows', variables];

export const useInfiniteWorkflowsQuery = <
      TData = InfiniteData<WorkflowsQuery>,
      TError = unknown
    >(
      variables: WorkflowsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<WorkflowsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<WorkflowsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<WorkflowsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Workflows.infinite', variables],
      queryFn: (metaData) => graphqlFetch<WorkflowsQuery, WorkflowsQueryVariables>(WorkflowsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteWorkflowsQuery.getKey = (variables: WorkflowsQueryVariables) => ['Workflows.infinite', variables];

export const useSuspenseInfiniteWorkflowsQuery = <
      TData = InfiniteData<WorkflowsQuery>,
      TError = unknown
    >(
      variables: WorkflowsQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<WorkflowsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<WorkflowsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<WorkflowsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Workflows.infinite', variables],
      queryFn: (metaData) => graphqlFetch<WorkflowsQuery, WorkflowsQueryVariables>(WorkflowsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteWorkflowsQuery.getKey = (variables: WorkflowsQueryVariables) => ['Workflows.infinite', variables];


useWorkflowsQuery.fetcher = (variables: WorkflowsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<WorkflowsQuery, WorkflowsQueryVariables>(WorkflowsDocument, variables, options);
