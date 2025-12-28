// @ts-nocheck
import * as Types from './generated';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'

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
 * mockCreateInvitationMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createInvitation }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateInvitationMutation = (resolver: GraphQLResponseResolver<Types.CreateInvitationMutation, Types.CreateInvitationMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateInvitationMutation, Types.CreateInvitationMutationVariables>(
    'CreateInvitation',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteInvitationMutation(
 *   ({ query, variables }) => {
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteInvitation }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteInvitationMutation = (resolver: GraphQLResponseResolver<Types.DeleteInvitationMutation, Types.DeleteInvitationMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteInvitationMutation, Types.DeleteInvitationMutationVariables>(
    'DeleteInvitation',
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
 * mockCreateWorkspaceUserMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createWorkspaceUser }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateWorkspaceUserMutation = (resolver: GraphQLResponseResolver<Types.CreateWorkspaceUserMutation, Types.CreateWorkspaceUserMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateWorkspaceUserMutation, Types.CreateWorkspaceUserMutationVariables>(
    'CreateWorkspaceUser',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteWorkspaceUserMutation(
 *   ({ query, variables }) => {
 *     const { userId, workspaceId } = variables;
 *     return HttpResponse.json({
 *       data: { deleteWorkspaceUser }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteWorkspaceUserMutation = (resolver: GraphQLResponseResolver<Types.DeleteWorkspaceUserMutation, Types.DeleteWorkspaceUserMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteWorkspaceUserMutation, Types.DeleteWorkspaceUserMutationVariables>(
    'DeleteWorkspaceUser',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateWorkspaceUserMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { updateWorkspaceUser }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateWorkspaceUserMutation = (resolver: GraphQLResponseResolver<Types.UpdateWorkspaceUserMutation, Types.UpdateWorkspaceUserMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.UpdateWorkspaceUserMutation, Types.UpdateWorkspaceUserMutationVariables>(
    'UpdateWorkspaceUser',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateWorkspaceMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createWorkspace }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateWorkspaceMutation = (resolver: GraphQLResponseResolver<Types.CreateWorkspaceMutation, Types.CreateWorkspaceMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateWorkspaceMutation, Types.CreateWorkspaceMutationVariables>(
    'CreateWorkspace',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteWorkspaceMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { deleteWorkspace }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteWorkspaceMutation = (resolver: GraphQLResponseResolver<Types.DeleteWorkspaceMutation, Types.DeleteWorkspaceMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteWorkspaceMutation, Types.DeleteWorkspaceMutationVariables>(
    'DeleteWorkspace',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateWorkspaceMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { updateWorkspace }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateWorkspaceMutation = (resolver: GraphQLResponseResolver<Types.UpdateWorkspaceMutation, Types.UpdateWorkspaceMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.UpdateWorkspaceMutation, Types.UpdateWorkspaceMutationVariables>(
    'UpdateWorkspace',
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
 *     const { workspaceId, limit } = variables;
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
 * mockInvitationsQuery(
 *   ({ query, variables }) => {
 *     const { email } = variables;
 *     return HttpResponse.json({
 *       data: { invitations }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockInvitationsQuery = (resolver: GraphQLResponseResolver<Types.InvitationsQuery, Types.InvitationsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.InvitationsQuery, Types.InvitationsQueryVariables>(
    'Invitations',
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
 *     const { workspaceId, limit } = variables;
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
 * mockUserByIdentityProviderIdQuery(
 *   ({ query, variables }) => {
 *     const { identityProviderId } = variables;
 *     return HttpResponse.json({
 *       data: { userByIdentityProviderId }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUserByIdentityProviderIdQuery = (resolver: GraphQLResponseResolver<Types.UserByIdentityProviderIdQuery, Types.UserByIdentityProviderIdQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.UserByIdentityProviderIdQuery, Types.UserByIdentityProviderIdQueryVariables>(
    'UserByIdentityProviderId',
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
 *     const { workspaceId, limit } = variables;
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

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockWorkspaceUsersQuery(
 *   ({ query, variables }) => {
 *     const { workspaceId, filter, orderBy } = variables;
 *     return HttpResponse.json({
 *       data: { workspaceUsers }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockWorkspaceUsersQuery = (resolver: GraphQLResponseResolver<Types.WorkspaceUsersQuery, Types.WorkspaceUsersQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.WorkspaceUsersQuery, Types.WorkspaceUsersQueryVariables>(
    'WorkspaceUsers',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockWorkspaceQuery(
 *   ({ query, variables }) => {
 *     const { rowId, userId } = variables;
 *     return HttpResponse.json({
 *       data: { workspace }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockWorkspaceQuery = (resolver: GraphQLResponseResolver<Types.WorkspaceQuery, Types.WorkspaceQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.WorkspaceQuery, Types.WorkspaceQueryVariables>(
    'Workspace',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockWorkspaceBySlugQuery(
 *   ({ query, variables }) => {
 *     const { slug, userId } = variables;
 *     return HttpResponse.json({
 *       data: { workspaceBySlug }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockWorkspaceBySlugQuery = (resolver: GraphQLResponseResolver<Types.WorkspaceBySlugQuery, Types.WorkspaceBySlugQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.WorkspaceBySlugQuery, Types.WorkspaceBySlugQueryVariables>(
    'WorkspaceBySlug',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockWorkspacesQuery(
 *   ({ query, variables }) => {
 *     const { userId, limit } = variables;
 *     return HttpResponse.json({
 *       data: { workspaces }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockWorkspacesQuery = (resolver: GraphQLResponseResolver<Types.WorkspacesQuery, Types.WorkspacesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.WorkspacesQuery, Types.WorkspacesQueryVariables>(
    'Workspaces',
    resolver,
    options
  )
