// @ts-nocheck
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { GraphQLClient, type RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
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


export const PublishEventDocument = gql`
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
export const CreateIntegrationDocument = gql`
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
    `;
export const UpdateIntegrationDocument = gql`
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
    `;
export const DeleteIntegrationDocument = gql`
    mutation DeleteIntegration($input: DeleteIntegrationInput!) {
  deleteIntegration(input: $input) {
    integration {
      rowId
      name
    }
  }
}
    `;
export const CreateMcpServerDocument = gql`
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
    `;
export const UpdateMcpServerDocument = gql`
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
    `;
export const DeleteMcpServerDocument = gql`
    mutation DeleteMcpServer($input: DeleteMcpServerInput!) {
  deleteMcpServer(input: $input) {
    mcpServer {
      rowId
      name
    }
  }
}
    `;
export const CreateWorkflowDocument = gql`
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
    `;
export const DeleteWorkflowDocument = gql`
    mutation DeleteWorkflow($input: DeleteWorkflowInput!) {
  deleteWorkflow(input: $input) {
    workflow {
      rowId
    }
  }
}
    `;
export const UpdateWorkflowDocument = gql`
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
    `;
export const IntegrationDefinitionsDocument = gql`
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
    `;
export const IntegrationDefinitionDocument = gql`
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
    `;
export const IntegrationsDocument = gql`
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
    `;
export const IntegrationDocument = gql`
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
    `;
export const PluginsDocument = gql`
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
    `;
export const WorkflowDocument = gql`
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
    `;
export const WorkflowsDocument = gql`
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
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    PublishEvent(variables: PublishEventMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<PublishEventMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PublishEventMutation>({ document: PublishEventDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'PublishEvent', 'mutation', variables);
    },
    CreateIntegration(variables: CreateIntegrationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateIntegrationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateIntegrationMutation>({ document: CreateIntegrationDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateIntegration', 'mutation', variables);
    },
    UpdateIntegration(variables: UpdateIntegrationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateIntegrationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateIntegrationMutation>({ document: UpdateIntegrationDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateIntegration', 'mutation', variables);
    },
    DeleteIntegration(variables: DeleteIntegrationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteIntegrationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteIntegrationMutation>({ document: DeleteIntegrationDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteIntegration', 'mutation', variables);
    },
    CreateMcpServer(variables: CreateMcpServerMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateMcpServerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateMcpServerMutation>({ document: CreateMcpServerDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateMcpServer', 'mutation', variables);
    },
    UpdateMcpServer(variables: UpdateMcpServerMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateMcpServerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateMcpServerMutation>({ document: UpdateMcpServerDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateMcpServer', 'mutation', variables);
    },
    DeleteMcpServer(variables: DeleteMcpServerMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteMcpServerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteMcpServerMutation>({ document: DeleteMcpServerDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteMcpServer', 'mutation', variables);
    },
    CreateWorkflow(variables: CreateWorkflowMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateWorkflowMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateWorkflowMutation>({ document: CreateWorkflowDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateWorkflow', 'mutation', variables);
    },
    DeleteWorkflow(variables: DeleteWorkflowMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteWorkflowMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteWorkflowMutation>({ document: DeleteWorkflowDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteWorkflow', 'mutation', variables);
    },
    UpdateWorkflow(variables: UpdateWorkflowMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateWorkflowMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateWorkflowMutation>({ document: UpdateWorkflowDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateWorkflow', 'mutation', variables);
    },
    IntegrationDefinitions(variables?: IntegrationDefinitionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<IntegrationDefinitionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<IntegrationDefinitionsQuery>({ document: IntegrationDefinitionsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'IntegrationDefinitions', 'query', variables);
    },
    IntegrationDefinition(variables: IntegrationDefinitionQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<IntegrationDefinitionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<IntegrationDefinitionQuery>({ document: IntegrationDefinitionDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'IntegrationDefinition', 'query', variables);
    },
    Integrations(variables: IntegrationsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<IntegrationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<IntegrationsQuery>({ document: IntegrationsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Integrations', 'query', variables);
    },
    Integration(variables: IntegrationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<IntegrationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<IntegrationQuery>({ document: IntegrationDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Integration', 'query', variables);
    },
    Plugins(variables: PluginsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<PluginsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PluginsQuery>({ document: PluginsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Plugins', 'query', variables);
    },
    Workflow(variables: WorkflowQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<WorkflowQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<WorkflowQuery>({ document: WorkflowDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Workflow', 'query', variables);
    },
    Workflows(variables: WorkflowsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<WorkflowsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<WorkflowsQuery>({ document: WorkflowsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Workflows', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;