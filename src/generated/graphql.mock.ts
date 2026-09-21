// @ts-nocheck
import * as Types from './generated';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPublishEventMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { publishEvent }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockPublishEventMutation = (resolver: GraphQLResponseResolver<Types.PublishEventMutation, Types.PublishEventMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.PublishEventMutation, Types.PublishEventMutationVariables>(
    'PublishEvent',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateIntegrationMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createIntegration }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateIntegrationMutation = (resolver: GraphQLResponseResolver<Types.CreateIntegrationMutation, Types.CreateIntegrationMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateIntegrationMutation, Types.CreateIntegrationMutationVariables>(
    'CreateIntegration',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateIntegrationMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { updateIntegration }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateIntegrationMutation = (resolver: GraphQLResponseResolver<Types.UpdateIntegrationMutation, Types.UpdateIntegrationMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.UpdateIntegrationMutation, Types.UpdateIntegrationMutationVariables>(
    'UpdateIntegration',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteIntegrationMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { deleteIntegration }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteIntegrationMutation = (resolver: GraphQLResponseResolver<Types.DeleteIntegrationMutation, Types.DeleteIntegrationMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteIntegrationMutation, Types.DeleteIntegrationMutationVariables>(
    'DeleteIntegration',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateMcpServerMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createMcpServer }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateMcpServerMutation = (resolver: GraphQLResponseResolver<Types.CreateMcpServerMutation, Types.CreateMcpServerMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateMcpServerMutation, Types.CreateMcpServerMutationVariables>(
    'CreateMcpServer',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateMcpServerMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { updateMcpServer }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateMcpServerMutation = (resolver: GraphQLResponseResolver<Types.UpdateMcpServerMutation, Types.UpdateMcpServerMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.UpdateMcpServerMutation, Types.UpdateMcpServerMutationVariables>(
    'UpdateMcpServer',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteMcpServerMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { deleteMcpServer }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteMcpServerMutation = (resolver: GraphQLResponseResolver<Types.DeleteMcpServerMutation, Types.DeleteMcpServerMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteMcpServerMutation, Types.DeleteMcpServerMutationVariables>(
    'DeleteMcpServer',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateWorkflowMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createWorkflow }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateWorkflowMutation = (resolver: GraphQLResponseResolver<Types.CreateWorkflowMutation, Types.CreateWorkflowMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateWorkflowMutation, Types.CreateWorkflowMutationVariables>(
    'CreateWorkflow',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteWorkflowMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { deleteWorkflow }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteWorkflowMutation = (resolver: GraphQLResponseResolver<Types.DeleteWorkflowMutation, Types.DeleteWorkflowMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteWorkflowMutation, Types.DeleteWorkflowMutationVariables>(
    'DeleteWorkflow',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateWorkflowMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { updateWorkflow }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateWorkflowMutation = (resolver: GraphQLResponseResolver<Types.UpdateWorkflowMutation, Types.UpdateWorkflowMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.UpdateWorkflowMutation, Types.UpdateWorkflowMutationVariables>(
    'UpdateWorkflow',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockIntegrationDefinitionsQuery(
 *   ({ query, variables }) => {
 *     const { isFeatured } = variables;
 *     return HttpResponse.json({
 *       data: { integrationDefinitions }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockIntegrationDefinitionsQuery = (resolver: GraphQLResponseResolver<Types.IntegrationDefinitionsQuery, Types.IntegrationDefinitionsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.IntegrationDefinitionsQuery, Types.IntegrationDefinitionsQueryVariables>(
    'IntegrationDefinitions',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockIntegrationDefinitionQuery(
 *   ({ query, variables }) => {
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { integrationDefinition }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockIntegrationDefinitionQuery = (resolver: GraphQLResponseResolver<Types.IntegrationDefinitionQuery, Types.IntegrationDefinitionQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.IntegrationDefinitionQuery, Types.IntegrationDefinitionQueryVariables>(
    'IntegrationDefinition',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockIntegrationsQuery(
 *   ({ query, variables }) => {
 *     const { organizationId, limit } = variables;
 *     return HttpResponse.json({
 *       data: { integrations }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockIntegrationsQuery = (resolver: GraphQLResponseResolver<Types.IntegrationsQuery, Types.IntegrationsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.IntegrationsQuery, Types.IntegrationsQueryVariables>(
    'Integrations',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockIntegrationQuery(
 *   ({ query, variables }) => {
 *     const { id } = variables;
 *     return HttpResponse.json({
 *       data: { integration }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockIntegrationQuery = (resolver: GraphQLResponseResolver<Types.IntegrationQuery, Types.IntegrationQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.IntegrationQuery, Types.IntegrationQueryVariables>(
    'Integration',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPluginsQuery(
 *   ({ query, variables }) => {
 *     const { organizationId, limit } = variables;
 *     return HttpResponse.json({
 *       data: { plugins }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockPluginsQuery = (resolver: GraphQLResponseResolver<Types.PluginsQuery, Types.PluginsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.PluginsQuery, Types.PluginsQueryVariables>(
    'Plugins',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockWorkflowQuery(
 *   ({ query, variables }) => {
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { workflow }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockWorkflowQuery = (resolver: GraphQLResponseResolver<Types.WorkflowQuery, Types.WorkflowQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.WorkflowQuery, Types.WorkflowQueryVariables>(
    'Workflow',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockWorkflowsQuery(
 *   ({ query, variables }) => {
 *     const { organizationId, limit } = variables;
 *     return HttpResponse.json({
 *       data: { workflows }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockWorkflowsQuery = (resolver: GraphQLResponseResolver<Types.WorkflowsQuery, Types.WorkflowsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.WorkflowsQuery, Types.WorkflowsQueryVariables>(
    'Workflows',
    resolver,
    options
  )
