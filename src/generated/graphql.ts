// @ts-nocheck
import { useMutation, useQuery, useSuspenseQuery, useInfiniteQuery, useSuspenseInfiniteQuery, UseMutationOptions, UseQueryOptions, UseSuspenseQueryOptions, UseInfiniteQueryOptions, InfiniteData, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetch } from '@/lib/graphql/graphqlFetch';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigFloat: { input: any; output: any; }
  BigInt: { input: string; output: string; }
  Cursor: { input: string; output: string; }
  Datetime: { input: Date; output: Date; }
  JSON: { input: Record<string, unknown>; output: Record<string, unknown>; }
  UUID: { input: string; output: string; }
};

/** A filter to be used against BigInt fields. All fields are combined with a logical ‘and.’ */
export type BigIntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['BigInt']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['BigInt']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['BigInt']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['BigInt']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Boolean']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Boolean']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Boolean']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** All input for the create `_DrizzleMigration` mutation. */
export type CreateDrizzleMigrationInput = {
  /** The `_DrizzleMigration` to be created by this mutation. */
  _drizzleMigration: _DrizzleMigrationInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `_DrizzleMigration` mutation. */
export type CreateDrizzleMigrationPayload = {
  __typename?: 'CreateDrizzleMigrationPayload';
  /** The `_DrizzleMigration` that was created by this mutation. */
  _drizzleMigration?: Maybe<_DrizzleMigration>;
  /** An edge for our `_DrizzleMigration`. May be used by Relay 1. */
  _drizzleMigrationEdge?: Maybe<_DrizzleMigrationEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `_DrizzleMigration` mutation. */
export type CreateDrizzleMigrationPayload_DrizzleMigrationEdgeArgs = {
  orderBy?: Array<_DrizzleMigrationOrderBy>;
};

/** All input for the create `Integration` mutation. */
export type CreateIntegrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Integration` to be created by this mutation. */
  integration: IntegrationInput;
};

/** The output of our create `Integration` mutation. */
export type CreateIntegrationPayload = {
  __typename?: 'CreateIntegrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Integration` that was created by this mutation. */
  integration?: Maybe<Integration>;
  /** An edge for our `Integration`. May be used by Relay 1. */
  integrationEdge?: Maybe<IntegrationEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Integration` mutation. */
export type CreateIntegrationPayloadIntegrationEdgeArgs = {
  orderBy?: Array<IntegrationOrderBy>;
};

/** All input for the create `Invitation` mutation. */
export type CreateInvitationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Invitation` to be created by this mutation. */
  invitation: InvitationInput;
};

/** The output of our create `Invitation` mutation. */
export type CreateInvitationPayload = {
  __typename?: 'CreateInvitationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Invitation` that was created by this mutation. */
  invitation?: Maybe<Invitation>;
  /** An edge for our `Invitation`. May be used by Relay 1. */
  invitationEdge?: Maybe<InvitationEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Invitation` mutation. */
export type CreateInvitationPayloadInvitationEdgeArgs = {
  orderBy?: Array<InvitationOrderBy>;
};

/** All input for the create `Plugin` mutation. */
export type CreatePluginInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Plugin` to be created by this mutation. */
  plugin: PluginInput;
};

/** The output of our create `Plugin` mutation. */
export type CreatePluginPayload = {
  __typename?: 'CreatePluginPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Plugin` that was created by this mutation. */
  plugin?: Maybe<Plugin>;
  /** An edge for our `Plugin`. May be used by Relay 1. */
  pluginEdge?: Maybe<PluginEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Plugin` mutation. */
export type CreatePluginPayloadPluginEdgeArgs = {
  orderBy?: Array<PluginOrderBy>;
};

/** All input for the create `User` mutation. */
export type CreateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `User` to be created by this mutation. */
  user: UserInput;
};

/** The output of our create `User` mutation. */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was created by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UserEdge>;
};


/** The output of our create `User` mutation. */
export type CreateUserPayloadUserEdgeArgs = {
  orderBy?: Array<UserOrderBy>;
};

/** All input for the create `Workflow` mutation. */
export type CreateWorkflowInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Workflow` to be created by this mutation. */
  workflow: WorkflowInput;
};

/** The output of our create `Workflow` mutation. */
export type CreateWorkflowPayload = {
  __typename?: 'CreateWorkflowPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Workflow` that was created by this mutation. */
  workflow?: Maybe<Workflow>;
  /** An edge for our `Workflow`. May be used by Relay 1. */
  workflowEdge?: Maybe<WorkflowEdge>;
};


/** The output of our create `Workflow` mutation. */
export type CreateWorkflowPayloadWorkflowEdgeArgs = {
  orderBy?: Array<WorkflowOrderBy>;
};

/** All input for the create `WorkflowRun` mutation. */
export type CreateWorkflowRunInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `WorkflowRun` to be created by this mutation. */
  workflowRun: WorkflowRunInput;
};

/** The output of our create `WorkflowRun` mutation. */
export type CreateWorkflowRunPayload = {
  __typename?: 'CreateWorkflowRunPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `WorkflowRun` that was created by this mutation. */
  workflowRun?: Maybe<WorkflowRun>;
  /** An edge for our `WorkflowRun`. May be used by Relay 1. */
  workflowRunEdge?: Maybe<WorkflowRunEdge>;
};


/** The output of our create `WorkflowRun` mutation. */
export type CreateWorkflowRunPayloadWorkflowRunEdgeArgs = {
  orderBy?: Array<WorkflowRunOrderBy>;
};

/** All input for the create `WorkflowStepLog` mutation. */
export type CreateWorkflowStepLogInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `WorkflowStepLog` to be created by this mutation. */
  workflowStepLog: WorkflowStepLogInput;
};

/** The output of our create `WorkflowStepLog` mutation. */
export type CreateWorkflowStepLogPayload = {
  __typename?: 'CreateWorkflowStepLogPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `WorkflowStepLog` that was created by this mutation. */
  workflowStepLog?: Maybe<WorkflowStepLog>;
  /** An edge for our `WorkflowStepLog`. May be used by Relay 1. */
  workflowStepLogEdge?: Maybe<WorkflowStepLogEdge>;
};


/** The output of our create `WorkflowStepLog` mutation. */
export type CreateWorkflowStepLogPayloadWorkflowStepLogEdgeArgs = {
  orderBy?: Array<WorkflowStepLogOrderBy>;
};

/** All input for the create `Workspace` mutation. */
export type CreateWorkspaceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Workspace` to be created by this mutation. */
  workspace: WorkspaceInput;
};

/** The output of our create `Workspace` mutation. */
export type CreateWorkspacePayload = {
  __typename?: 'CreateWorkspacePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Workspace` that was created by this mutation. */
  workspace?: Maybe<Workspace>;
  /** An edge for our `Workspace`. May be used by Relay 1. */
  workspaceEdge?: Maybe<WorkspaceEdge>;
};


/** The output of our create `Workspace` mutation. */
export type CreateWorkspacePayloadWorkspaceEdgeArgs = {
  orderBy?: Array<WorkspaceOrderBy>;
};

/** All input for the create `WorkspaceUser` mutation. */
export type CreateWorkspaceUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `WorkspaceUser` to be created by this mutation. */
  workspaceUser: WorkspaceUserInput;
};

/** The output of our create `WorkspaceUser` mutation. */
export type CreateWorkspaceUserPayload = {
  __typename?: 'CreateWorkspaceUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `WorkspaceUser` that was created by this mutation. */
  workspaceUser?: Maybe<WorkspaceUser>;
  /** An edge for our `WorkspaceUser`. May be used by Relay 1. */
  workspaceUserEdge?: Maybe<WorkspaceUserEdge>;
};


/** The output of our create `WorkspaceUser` mutation. */
export type CreateWorkspaceUserPayloadWorkspaceUserEdgeArgs = {
  orderBy?: Array<WorkspaceUserOrderBy>;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']['input']>>;
};

/** All input for the `deleteDrizzleMigrationById` mutation. */
export type DeleteDrizzleMigrationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `_DrizzleMigration` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteDrizzleMigration` mutation. */
export type DeleteDrizzleMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['Int']['input'];
};

/** The output of our delete `_DrizzleMigration` mutation. */
export type DeleteDrizzleMigrationPayload = {
  __typename?: 'DeleteDrizzleMigrationPayload';
  /** The `_DrizzleMigration` that was deleted by this mutation. */
  _drizzleMigration?: Maybe<_DrizzleMigration>;
  /** An edge for our `_DrizzleMigration`. May be used by Relay 1. */
  _drizzleMigrationEdge?: Maybe<_DrizzleMigrationEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedDrizzleMigrationId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `_DrizzleMigration` mutation. */
export type DeleteDrizzleMigrationPayload_DrizzleMigrationEdgeArgs = {
  orderBy?: Array<_DrizzleMigrationOrderBy>;
};

/** All input for the `deleteIntegrationById` mutation. */
export type DeleteIntegrationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Integration` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteIntegration` mutation. */
export type DeleteIntegrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Integration` mutation. */
export type DeleteIntegrationPayload = {
  __typename?: 'DeleteIntegrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedIntegrationId?: Maybe<Scalars['ID']['output']>;
  /** The `Integration` that was deleted by this mutation. */
  integration?: Maybe<Integration>;
  /** An edge for our `Integration`. May be used by Relay 1. */
  integrationEdge?: Maybe<IntegrationEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Integration` mutation. */
export type DeleteIntegrationPayloadIntegrationEdgeArgs = {
  orderBy?: Array<IntegrationOrderBy>;
};

/** All input for the `deleteInvitationById` mutation. */
export type DeleteInvitationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Invitation` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteInvitation` mutation. */
export type DeleteInvitationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Invitation` mutation. */
export type DeleteInvitationPayload = {
  __typename?: 'DeleteInvitationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedInvitationId?: Maybe<Scalars['ID']['output']>;
  /** The `Invitation` that was deleted by this mutation. */
  invitation?: Maybe<Invitation>;
  /** An edge for our `Invitation`. May be used by Relay 1. */
  invitationEdge?: Maybe<InvitationEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Invitation` mutation. */
export type DeleteInvitationPayloadInvitationEdgeArgs = {
  orderBy?: Array<InvitationOrderBy>;
};

/** All input for the `deletePluginById` mutation. */
export type DeletePluginByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Plugin` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deletePlugin` mutation. */
export type DeletePluginInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Plugin` mutation. */
export type DeletePluginPayload = {
  __typename?: 'DeletePluginPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedPluginId?: Maybe<Scalars['ID']['output']>;
  /** The `Plugin` that was deleted by this mutation. */
  plugin?: Maybe<Plugin>;
  /** An edge for our `Plugin`. May be used by Relay 1. */
  pluginEdge?: Maybe<PluginEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Plugin` mutation. */
export type DeletePluginPayloadPluginEdgeArgs = {
  orderBy?: Array<PluginOrderBy>;
};

/** All input for the `deleteUserByEmail` mutation. */
export type DeleteUserByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
};

/** All input for the `deleteUserById` mutation. */
export type DeleteUserByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `User` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteUserByIdentityProviderId` mutation. */
export type DeleteUserByIdentityProviderIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  identityProviderId: Scalars['UUID']['input'];
};

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedUserId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UserEdge>;
};


/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: Array<UserOrderBy>;
};

/** All input for the `deleteWorkflowById` mutation. */
export type DeleteWorkflowByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Workflow` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteWorkflow` mutation. */
export type DeleteWorkflowInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Workflow` mutation. */
export type DeleteWorkflowPayload = {
  __typename?: 'DeleteWorkflowPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedWorkflowId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Workflow` that was deleted by this mutation. */
  workflow?: Maybe<Workflow>;
  /** An edge for our `Workflow`. May be used by Relay 1. */
  workflowEdge?: Maybe<WorkflowEdge>;
};


/** The output of our delete `Workflow` mutation. */
export type DeleteWorkflowPayloadWorkflowEdgeArgs = {
  orderBy?: Array<WorkflowOrderBy>;
};

/** All input for the `deleteWorkflowRunById` mutation. */
export type DeleteWorkflowRunByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `WorkflowRun` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteWorkflowRun` mutation. */
export type DeleteWorkflowRunInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `WorkflowRun` mutation. */
export type DeleteWorkflowRunPayload = {
  __typename?: 'DeleteWorkflowRunPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedWorkflowRunId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `WorkflowRun` that was deleted by this mutation. */
  workflowRun?: Maybe<WorkflowRun>;
  /** An edge for our `WorkflowRun`. May be used by Relay 1. */
  workflowRunEdge?: Maybe<WorkflowRunEdge>;
};


/** The output of our delete `WorkflowRun` mutation. */
export type DeleteWorkflowRunPayloadWorkflowRunEdgeArgs = {
  orderBy?: Array<WorkflowRunOrderBy>;
};

/** All input for the `deleteWorkflowStepLogById` mutation. */
export type DeleteWorkflowStepLogByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `WorkflowStepLog` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteWorkflowStepLog` mutation. */
export type DeleteWorkflowStepLogInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `WorkflowStepLog` mutation. */
export type DeleteWorkflowStepLogPayload = {
  __typename?: 'DeleteWorkflowStepLogPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedWorkflowStepLogId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `WorkflowStepLog` that was deleted by this mutation. */
  workflowStepLog?: Maybe<WorkflowStepLog>;
  /** An edge for our `WorkflowStepLog`. May be used by Relay 1. */
  workflowStepLogEdge?: Maybe<WorkflowStepLogEdge>;
};


/** The output of our delete `WorkflowStepLog` mutation. */
export type DeleteWorkflowStepLogPayloadWorkflowStepLogEdgeArgs = {
  orderBy?: Array<WorkflowStepLogOrderBy>;
};

/** All input for the `deleteWorkspaceById` mutation. */
export type DeleteWorkspaceByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Workspace` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteWorkspaceBySlug` mutation. */
export type DeleteWorkspaceBySlugInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
};

/** All input for the `deleteWorkspace` mutation. */
export type DeleteWorkspaceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Workspace` mutation. */
export type DeleteWorkspacePayload = {
  __typename?: 'DeleteWorkspacePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedWorkspaceId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Workspace` that was deleted by this mutation. */
  workspace?: Maybe<Workspace>;
  /** An edge for our `Workspace`. May be used by Relay 1. */
  workspaceEdge?: Maybe<WorkspaceEdge>;
};


/** The output of our delete `Workspace` mutation. */
export type DeleteWorkspacePayloadWorkspaceEdgeArgs = {
  orderBy?: Array<WorkspaceOrderBy>;
};

/** All input for the `deleteWorkspaceUserById` mutation. */
export type DeleteWorkspaceUserByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `WorkspaceUser` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteWorkspaceUser` mutation. */
export type DeleteWorkspaceUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['UUID']['input'];
  workspaceId: Scalars['UUID']['input'];
};

/** The output of our delete `WorkspaceUser` mutation. */
export type DeleteWorkspaceUserPayload = {
  __typename?: 'DeleteWorkspaceUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedWorkspaceUserId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `WorkspaceUser` that was deleted by this mutation. */
  workspaceUser?: Maybe<WorkspaceUser>;
  /** An edge for our `WorkspaceUser`. May be used by Relay 1. */
  workspaceUserEdge?: Maybe<WorkspaceUserEdge>;
};


/** The output of our delete `WorkspaceUser` mutation. */
export type DeleteWorkspaceUserPayloadWorkspaceUserEdgeArgs = {
  orderBy?: Array<WorkspaceUserOrderBy>;
};

export type HavingBigintFilter = {
  equalTo?: InputMaybe<Scalars['BigInt']['input']>;
  greaterThan?: InputMaybe<Scalars['BigInt']['input']>;
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
  lessThan?: InputMaybe<Scalars['BigInt']['input']>;
  lessThanOrEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
  notEqualTo?: InputMaybe<Scalars['BigInt']['input']>;
};

export type HavingDatetimeFilter = {
  equalTo?: InputMaybe<Scalars['Datetime']['input']>;
  greaterThan?: InputMaybe<Scalars['Datetime']['input']>;
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  lessThan?: InputMaybe<Scalars['Datetime']['input']>;
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  notEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
};

export type HavingIntFilter = {
  equalTo?: InputMaybe<Scalars['Int']['input']>;
  greaterThan?: InputMaybe<Scalars['Int']['input']>;
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  lessThan?: InputMaybe<Scalars['Int']['input']>;
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  notEqualTo?: InputMaybe<Scalars['Int']['input']>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Int']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Int']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Int']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Int']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Int']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Integration = Node & {
  __typename?: 'Integration';
  config: Scalars['JSON']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Workspace` that is related to this `Integration`. */
  workspace?: Maybe<Workspace>;
  workspaceId: Scalars['UUID']['output'];
};

export type IntegrationAggregates = {
  __typename?: 'IntegrationAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<IntegrationDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `Integration` object types. */
export type IntegrationAggregatesFilter = {
  /** Distinct count aggregate over matching `Integration` objects. */
  distinctCount?: InputMaybe<IntegrationDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Integration` object to be included within the aggregate. */
  filter?: InputMaybe<IntegrationFilter>;
};

/**
 * A condition to be used against `Integration` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type IntegrationCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `isEnabled` field. */
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `workspaceId` field. */
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Integration` values. */
export type IntegrationConnection = {
  __typename?: 'IntegrationConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<IntegrationAggregates>;
  /** A list of edges which contains the `Integration` and cursor to aid in pagination. */
  edges: Array<IntegrationEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<IntegrationAggregates>>;
  /** A list of `Integration` objects. */
  nodes: Array<Integration>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Integration` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Integration` values. */
export type IntegrationConnectionGroupedAggregatesArgs = {
  groupBy: Array<IntegrationGroupBy>;
  having?: InputMaybe<IntegrationHavingInput>;
};

export type IntegrationDistinctCountAggregateFilter = {
  config?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  isEnabled?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  type?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  workspaceId?: InputMaybe<BigIntFilter>;
};

export type IntegrationDistinctCountAggregates = {
  __typename?: 'IntegrationDistinctCountAggregates';
  /** Distinct count of config across the matching connection */
  config?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of isEnabled across the matching connection */
  isEnabled?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of type across the matching connection */
  type?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of workspaceId across the matching connection */
  workspaceId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Integration` edge in the connection. */
export type IntegrationEdge = {
  __typename?: 'IntegrationEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Integration` at the end of the edge. */
  node: Integration;
};

/** A filter to be used against `Integration` object types. All fields are combined with a logical ‘and.’ */
export type IntegrationFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<IntegrationFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `isEnabled` field. */
  isEnabled?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<IntegrationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<IntegrationFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `workspace` relation. */
  workspace?: InputMaybe<WorkspaceFilter>;
  /** Filter by the object’s `workspaceId` field. */
  workspaceId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `Integration` for usage during aggregation. */
export enum IntegrationGroupBy {
  Config = 'CONFIG',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  IsEnabled = 'IS_ENABLED',
  Name = 'NAME',
  Type = 'TYPE',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  WorkspaceId = 'WORKSPACE_ID'
}

export type IntegrationHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `Integration` aggregates. */
export type IntegrationHavingInput = {
  AND?: InputMaybe<Array<IntegrationHavingInput>>;
  OR?: InputMaybe<Array<IntegrationHavingInput>>;
  average?: InputMaybe<IntegrationHavingAverageInput>;
  distinctCount?: InputMaybe<IntegrationHavingDistinctCountInput>;
  max?: InputMaybe<IntegrationHavingMaxInput>;
  min?: InputMaybe<IntegrationHavingMinInput>;
  stddevPopulation?: InputMaybe<IntegrationHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<IntegrationHavingStddevSampleInput>;
  sum?: InputMaybe<IntegrationHavingSumInput>;
  variancePopulation?: InputMaybe<IntegrationHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<IntegrationHavingVarianceSampleInput>;
};

export type IntegrationHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Integration` */
export type IntegrationInput = {
  config?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  type: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  workspaceId: Scalars['UUID']['input'];
};

/** Methods to use when ordering `Integration`. */
export enum IntegrationOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IsEnabledAsc = 'IS_ENABLED_ASC',
  IsEnabledDesc = 'IS_ENABLED_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  WorkspaceIdAsc = 'WORKSPACE_ID_ASC',
  WorkspaceIdDesc = 'WORKSPACE_ID_DESC'
}

/** Represents an update to a `Integration`. Fields that are set will be updated. */
export type IntegrationPatch = {
  config?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

export type Invitation = Node & {
  __typename?: 'Invitation';
  acceptedAt?: Maybe<Scalars['Datetime']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  email: Scalars['String']['output'];
  expiresAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  invitedBy: Scalars['UUID']['output'];
  role: WorkspaceRole;
  rowId: Scalars['UUID']['output'];
  /** Reads a single `User` that is related to this `Invitation`. */
  user?: Maybe<User>;
  /** Reads a single `Workspace` that is related to this `Invitation`. */
  workspace?: Maybe<Workspace>;
  workspaceId: Scalars['UUID']['output'];
};

export type InvitationAggregates = {
  __typename?: 'InvitationAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<InvitationDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `Invitation` object types. */
export type InvitationAggregatesFilter = {
  /** Distinct count aggregate over matching `Invitation` objects. */
  distinctCount?: InputMaybe<InvitationDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Invitation` object to be included within the aggregate. */
  filter?: InputMaybe<InvitationFilter>;
};

/**
 * A condition to be used against `Invitation` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type InvitationCondition = {
  /** Checks for equality with the object’s `acceptedAt` field. */
  acceptedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `expiresAt` field. */
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `invitedBy` field. */
  invitedBy?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `role` field. */
  role?: InputMaybe<WorkspaceRole>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `workspaceId` field. */
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Invitation` values. */
export type InvitationConnection = {
  __typename?: 'InvitationConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<InvitationAggregates>;
  /** A list of edges which contains the `Invitation` and cursor to aid in pagination. */
  edges: Array<InvitationEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<InvitationAggregates>>;
  /** A list of `Invitation` objects. */
  nodes: Array<Invitation>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Invitation` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Invitation` values. */
export type InvitationConnectionGroupedAggregatesArgs = {
  groupBy: Array<InvitationGroupBy>;
  having?: InputMaybe<InvitationHavingInput>;
};

export type InvitationDistinctCountAggregateFilter = {
  acceptedAt?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  email?: InputMaybe<BigIntFilter>;
  expiresAt?: InputMaybe<BigIntFilter>;
  invitedBy?: InputMaybe<BigIntFilter>;
  role?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  workspaceId?: InputMaybe<BigIntFilter>;
};

export type InvitationDistinctCountAggregates = {
  __typename?: 'InvitationDistinctCountAggregates';
  /** Distinct count of acceptedAt across the matching connection */
  acceptedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of email across the matching connection */
  email?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of expiresAt across the matching connection */
  expiresAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of invitedBy across the matching connection */
  invitedBy?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of role across the matching connection */
  role?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of workspaceId across the matching connection */
  workspaceId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Invitation` edge in the connection. */
export type InvitationEdge = {
  __typename?: 'InvitationEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Invitation` at the end of the edge. */
  node: Invitation;
};

/** A filter to be used against `Invitation` object types. All fields are combined with a logical ‘and.’ */
export type InvitationFilter = {
  /** Filter by the object’s `acceptedAt` field. */
  acceptedAt?: InputMaybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<InvitationFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `email` field. */
  email?: InputMaybe<StringFilter>;
  /** Filter by the object’s `expiresAt` field. */
  expiresAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `invitedBy` field. */
  invitedBy?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<InvitationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<InvitationFilter>>;
  /** Filter by the object’s `role` field. */
  role?: InputMaybe<WorkspaceRoleFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** Filter by the object’s `workspace` relation. */
  workspace?: InputMaybe<WorkspaceFilter>;
  /** Filter by the object’s `workspaceId` field. */
  workspaceId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `Invitation` for usage during aggregation. */
export enum InvitationGroupBy {
  AcceptedAt = 'ACCEPTED_AT',
  AcceptedAtTruncatedToDay = 'ACCEPTED_AT_TRUNCATED_TO_DAY',
  AcceptedAtTruncatedToHour = 'ACCEPTED_AT_TRUNCATED_TO_HOUR',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Email = 'EMAIL',
  ExpiresAt = 'EXPIRES_AT',
  ExpiresAtTruncatedToDay = 'EXPIRES_AT_TRUNCATED_TO_DAY',
  ExpiresAtTruncatedToHour = 'EXPIRES_AT_TRUNCATED_TO_HOUR',
  InvitedBy = 'INVITED_BY',
  Role = 'ROLE',
  WorkspaceId = 'WORKSPACE_ID'
}

export type InvitationHavingAverageInput = {
  acceptedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
};

export type InvitationHavingDistinctCountInput = {
  acceptedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `Invitation` aggregates. */
export type InvitationHavingInput = {
  AND?: InputMaybe<Array<InvitationHavingInput>>;
  OR?: InputMaybe<Array<InvitationHavingInput>>;
  average?: InputMaybe<InvitationHavingAverageInput>;
  distinctCount?: InputMaybe<InvitationHavingDistinctCountInput>;
  max?: InputMaybe<InvitationHavingMaxInput>;
  min?: InputMaybe<InvitationHavingMinInput>;
  stddevPopulation?: InputMaybe<InvitationHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<InvitationHavingStddevSampleInput>;
  sum?: InputMaybe<InvitationHavingSumInput>;
  variancePopulation?: InputMaybe<InvitationHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<InvitationHavingVarianceSampleInput>;
};

export type InvitationHavingMaxInput = {
  acceptedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
};

export type InvitationHavingMinInput = {
  acceptedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
};

export type InvitationHavingStddevPopulationInput = {
  acceptedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
};

export type InvitationHavingStddevSampleInput = {
  acceptedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
};

export type InvitationHavingSumInput = {
  acceptedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
};

export type InvitationHavingVariancePopulationInput = {
  acceptedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
};

export type InvitationHavingVarianceSampleInput = {
  acceptedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Invitation` */
export type InvitationInput = {
  acceptedAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email: Scalars['String']['input'];
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  invitedBy: Scalars['UUID']['input'];
  role?: InputMaybe<WorkspaceRole>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  workspaceId: Scalars['UUID']['input'];
};

/** Methods to use when ordering `Invitation`. */
export enum InvitationOrderBy {
  AcceptedAtAsc = 'ACCEPTED_AT_ASC',
  AcceptedAtDesc = 'ACCEPTED_AT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  ExpiresAtAsc = 'EXPIRES_AT_ASC',
  ExpiresAtDesc = 'EXPIRES_AT_DESC',
  InvitedByAsc = 'INVITED_BY_ASC',
  InvitedByDesc = 'INVITED_BY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  WorkspaceIdAsc = 'WORKSPACE_ID_ASC',
  WorkspaceIdDesc = 'WORKSPACE_ID_DESC'
}

/** Represents an update to a `Invitation`. Fields that are set will be updated. */
export type InvitationPatch = {
  acceptedAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  invitedBy?: InputMaybe<Scalars['UUID']['input']>;
  role?: InputMaybe<WorkspaceRole>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `_DrizzleMigration`. */
  createDrizzleMigration?: Maybe<CreateDrizzleMigrationPayload>;
  /** Creates a single `Integration`. */
  createIntegration?: Maybe<CreateIntegrationPayload>;
  /** Creates a single `Invitation`. */
  createInvitation?: Maybe<CreateInvitationPayload>;
  /** Creates a single `Plugin`. */
  createPlugin?: Maybe<CreatePluginPayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Creates a single `Workflow`. */
  createWorkflow?: Maybe<CreateWorkflowPayload>;
  /** Creates a single `WorkflowRun`. */
  createWorkflowRun?: Maybe<CreateWorkflowRunPayload>;
  /** Creates a single `WorkflowStepLog`. */
  createWorkflowStepLog?: Maybe<CreateWorkflowStepLogPayload>;
  /** Creates a single `Workspace`. */
  createWorkspace?: Maybe<CreateWorkspacePayload>;
  /** Creates a single `WorkspaceUser`. */
  createWorkspaceUser?: Maybe<CreateWorkspaceUserPayload>;
  /** Deletes a single `_DrizzleMigration` using a unique key. */
  deleteDrizzleMigration?: Maybe<DeleteDrizzleMigrationPayload>;
  /** Deletes a single `_DrizzleMigration` using its globally unique id. */
  deleteDrizzleMigrationById?: Maybe<DeleteDrizzleMigrationPayload>;
  /** Deletes a single `Integration` using a unique key. */
  deleteIntegration?: Maybe<DeleteIntegrationPayload>;
  /** Deletes a single `Integration` using its globally unique id. */
  deleteIntegrationById?: Maybe<DeleteIntegrationPayload>;
  /** Deletes a single `Invitation` using a unique key. */
  deleteInvitation?: Maybe<DeleteInvitationPayload>;
  /** Deletes a single `Invitation` using its globally unique id. */
  deleteInvitationById?: Maybe<DeleteInvitationPayload>;
  /** Deletes a single `Plugin` using a unique key. */
  deletePlugin?: Maybe<DeletePluginPayload>;
  /** Deletes a single `Plugin` using its globally unique id. */
  deletePluginById?: Maybe<DeletePluginPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByEmail?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using its globally unique id. */
  deleteUserById?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByIdentityProviderId?: Maybe<DeleteUserPayload>;
  /** Deletes a single `Workflow` using a unique key. */
  deleteWorkflow?: Maybe<DeleteWorkflowPayload>;
  /** Deletes a single `Workflow` using its globally unique id. */
  deleteWorkflowById?: Maybe<DeleteWorkflowPayload>;
  /** Deletes a single `WorkflowRun` using a unique key. */
  deleteWorkflowRun?: Maybe<DeleteWorkflowRunPayload>;
  /** Deletes a single `WorkflowRun` using its globally unique id. */
  deleteWorkflowRunById?: Maybe<DeleteWorkflowRunPayload>;
  /** Deletes a single `WorkflowStepLog` using a unique key. */
  deleteWorkflowStepLog?: Maybe<DeleteWorkflowStepLogPayload>;
  /** Deletes a single `WorkflowStepLog` using its globally unique id. */
  deleteWorkflowStepLogById?: Maybe<DeleteWorkflowStepLogPayload>;
  /** Deletes a single `Workspace` using a unique key. */
  deleteWorkspace?: Maybe<DeleteWorkspacePayload>;
  /** Deletes a single `Workspace` using its globally unique id. */
  deleteWorkspaceById?: Maybe<DeleteWorkspacePayload>;
  /** Deletes a single `Workspace` using a unique key. */
  deleteWorkspaceBySlug?: Maybe<DeleteWorkspacePayload>;
  /** Deletes a single `WorkspaceUser` using a unique key. */
  deleteWorkspaceUser?: Maybe<DeleteWorkspaceUserPayload>;
  /** Deletes a single `WorkspaceUser` using its globally unique id. */
  deleteWorkspaceUserById?: Maybe<DeleteWorkspaceUserPayload>;
  /** Updates a single `_DrizzleMigration` using a unique key and a patch. */
  updateDrizzleMigration?: Maybe<UpdateDrizzleMigrationPayload>;
  /** Updates a single `_DrizzleMigration` using its globally unique id and a patch. */
  updateDrizzleMigrationById?: Maybe<UpdateDrizzleMigrationPayload>;
  /** Updates a single `Integration` using a unique key and a patch. */
  updateIntegration?: Maybe<UpdateIntegrationPayload>;
  /** Updates a single `Integration` using its globally unique id and a patch. */
  updateIntegrationById?: Maybe<UpdateIntegrationPayload>;
  /** Updates a single `Invitation` using a unique key and a patch. */
  updateInvitation?: Maybe<UpdateInvitationPayload>;
  /** Updates a single `Invitation` using its globally unique id and a patch. */
  updateInvitationById?: Maybe<UpdateInvitationPayload>;
  /** Updates a single `Plugin` using a unique key and a patch. */
  updatePlugin?: Maybe<UpdatePluginPayload>;
  /** Updates a single `Plugin` using its globally unique id and a patch. */
  updatePluginById?: Maybe<UpdatePluginPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByEmail?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using its globally unique id and a patch. */
  updateUserById?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByIdentityProviderId?: Maybe<UpdateUserPayload>;
  /** Updates a single `Workflow` using a unique key and a patch. */
  updateWorkflow?: Maybe<UpdateWorkflowPayload>;
  /** Updates a single `Workflow` using its globally unique id and a patch. */
  updateWorkflowById?: Maybe<UpdateWorkflowPayload>;
  /** Updates a single `WorkflowRun` using a unique key and a patch. */
  updateWorkflowRun?: Maybe<UpdateWorkflowRunPayload>;
  /** Updates a single `WorkflowRun` using its globally unique id and a patch. */
  updateWorkflowRunById?: Maybe<UpdateWorkflowRunPayload>;
  /** Updates a single `WorkflowStepLog` using a unique key and a patch. */
  updateWorkflowStepLog?: Maybe<UpdateWorkflowStepLogPayload>;
  /** Updates a single `WorkflowStepLog` using its globally unique id and a patch. */
  updateWorkflowStepLogById?: Maybe<UpdateWorkflowStepLogPayload>;
  /** Updates a single `Workspace` using a unique key and a patch. */
  updateWorkspace?: Maybe<UpdateWorkspacePayload>;
  /** Updates a single `Workspace` using its globally unique id and a patch. */
  updateWorkspaceById?: Maybe<UpdateWorkspacePayload>;
  /** Updates a single `Workspace` using a unique key and a patch. */
  updateWorkspaceBySlug?: Maybe<UpdateWorkspacePayload>;
  /** Updates a single `WorkspaceUser` using a unique key and a patch. */
  updateWorkspaceUser?: Maybe<UpdateWorkspaceUserPayload>;
  /** Updates a single `WorkspaceUser` using its globally unique id and a patch. */
  updateWorkspaceUserById?: Maybe<UpdateWorkspaceUserPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateDrizzleMigrationArgs = {
  input: CreateDrizzleMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateIntegrationArgs = {
  input: CreateIntegrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateInvitationArgs = {
  input: CreateInvitationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePluginArgs = {
  input: CreatePluginInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWorkflowArgs = {
  input: CreateWorkflowInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWorkflowRunArgs = {
  input: CreateWorkflowRunInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWorkflowStepLogArgs = {
  input: CreateWorkflowStepLogInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWorkspaceArgs = {
  input: CreateWorkspaceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWorkspaceUserArgs = {
  input: CreateWorkspaceUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDrizzleMigrationArgs = {
  input: DeleteDrizzleMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDrizzleMigrationByIdArgs = {
  input: DeleteDrizzleMigrationByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteIntegrationArgs = {
  input: DeleteIntegrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteIntegrationByIdArgs = {
  input: DeleteIntegrationByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteInvitationArgs = {
  input: DeleteInvitationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteInvitationByIdArgs = {
  input: DeleteInvitationByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePluginArgs = {
  input: DeletePluginInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePluginByIdArgs = {
  input: DeletePluginByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByEmailArgs = {
  input: DeleteUserByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByIdArgs = {
  input: DeleteUserByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByIdentityProviderIdArgs = {
  input: DeleteUserByIdentityProviderIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkflowArgs = {
  input: DeleteWorkflowInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkflowByIdArgs = {
  input: DeleteWorkflowByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkflowRunArgs = {
  input: DeleteWorkflowRunInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkflowRunByIdArgs = {
  input: DeleteWorkflowRunByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkflowStepLogArgs = {
  input: DeleteWorkflowStepLogInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkflowStepLogByIdArgs = {
  input: DeleteWorkflowStepLogByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkspaceArgs = {
  input: DeleteWorkspaceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkspaceByIdArgs = {
  input: DeleteWorkspaceByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkspaceBySlugArgs = {
  input: DeleteWorkspaceBySlugInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkspaceUserArgs = {
  input: DeleteWorkspaceUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkspaceUserByIdArgs = {
  input: DeleteWorkspaceUserByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDrizzleMigrationArgs = {
  input: UpdateDrizzleMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDrizzleMigrationByIdArgs = {
  input: UpdateDrizzleMigrationByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateIntegrationArgs = {
  input: UpdateIntegrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateIntegrationByIdArgs = {
  input: UpdateIntegrationByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateInvitationArgs = {
  input: UpdateInvitationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateInvitationByIdArgs = {
  input: UpdateInvitationByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePluginArgs = {
  input: UpdatePluginInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePluginByIdArgs = {
  input: UpdatePluginByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByEmailArgs = {
  input: UpdateUserByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByIdArgs = {
  input: UpdateUserByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByIdentityProviderIdArgs = {
  input: UpdateUserByIdentityProviderIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkflowArgs = {
  input: UpdateWorkflowInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkflowByIdArgs = {
  input: UpdateWorkflowByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkflowRunArgs = {
  input: UpdateWorkflowRunInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkflowRunByIdArgs = {
  input: UpdateWorkflowRunByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkflowStepLogArgs = {
  input: UpdateWorkflowStepLogInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkflowStepLogByIdArgs = {
  input: UpdateWorkflowStepLogByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkspaceArgs = {
  input: UpdateWorkspaceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkspaceByIdArgs = {
  input: UpdateWorkspaceByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkspaceBySlugArgs = {
  input: UpdateWorkspaceBySlugInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkspaceUserArgs = {
  input: UpdateWorkspaceUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkspaceUserByIdArgs = {
  input: UpdateWorkspaceUserByIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

export type Plugin = Node & {
  __typename?: 'Plugin';
  /** Reads a single `User` that is related to this `Plugin`. */
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['UUID']['output']>;
  config?: Maybe<Scalars['JSON']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  isVerified: Scalars['Boolean']['output'];
  manifest: Scalars['JSON']['output'];
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  version: Scalars['String']['output'];
  wasmHash: Scalars['String']['output'];
  wasmUrl: Scalars['String']['output'];
  /** Reads a single `Workspace` that is related to this `Plugin`. */
  workspace?: Maybe<Workspace>;
  workspaceId: Scalars['UUID']['output'];
};

export type PluginAggregates = {
  __typename?: 'PluginAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<PluginDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `Plugin` object types. */
export type PluginAggregatesFilter = {
  /** Distinct count aggregate over matching `Plugin` objects. */
  distinctCount?: InputMaybe<PluginDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Plugin` object to be included within the aggregate. */
  filter?: InputMaybe<PluginFilter>;
};

/** A condition to be used against `Plugin` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PluginCondition = {
  /** Checks for equality with the object’s `authorId` field. */
  authorId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `isEnabled` field. */
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `isVerified` field. */
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `version` field. */
  version?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `wasmHash` field. */
  wasmHash?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `wasmUrl` field. */
  wasmUrl?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `workspaceId` field. */
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Plugin` values. */
export type PluginConnection = {
  __typename?: 'PluginConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<PluginAggregates>;
  /** A list of edges which contains the `Plugin` and cursor to aid in pagination. */
  edges: Array<PluginEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<PluginAggregates>>;
  /** A list of `Plugin` objects. */
  nodes: Array<Plugin>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Plugin` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Plugin` values. */
export type PluginConnectionGroupedAggregatesArgs = {
  groupBy: Array<PluginGroupBy>;
  having?: InputMaybe<PluginHavingInput>;
};

export type PluginDistinctCountAggregateFilter = {
  authorId?: InputMaybe<BigIntFilter>;
  config?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  description?: InputMaybe<BigIntFilter>;
  isEnabled?: InputMaybe<BigIntFilter>;
  isVerified?: InputMaybe<BigIntFilter>;
  manifest?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  version?: InputMaybe<BigIntFilter>;
  wasmHash?: InputMaybe<BigIntFilter>;
  wasmUrl?: InputMaybe<BigIntFilter>;
  workspaceId?: InputMaybe<BigIntFilter>;
};

export type PluginDistinctCountAggregates = {
  __typename?: 'PluginDistinctCountAggregates';
  /** Distinct count of authorId across the matching connection */
  authorId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of config across the matching connection */
  config?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of isEnabled across the matching connection */
  isEnabled?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of isVerified across the matching connection */
  isVerified?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of manifest across the matching connection */
  manifest?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of version across the matching connection */
  version?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of wasmHash across the matching connection */
  wasmHash?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of wasmUrl across the matching connection */
  wasmUrl?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of workspaceId across the matching connection */
  workspaceId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Plugin` edge in the connection. */
export type PluginEdge = {
  __typename?: 'PluginEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Plugin` at the end of the edge. */
  node: Plugin;
};

/** A filter to be used against `Plugin` object types. All fields are combined with a logical ‘and.’ */
export type PluginFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PluginFilter>>;
  /** Filter by the object’s `author` relation. */
  author?: InputMaybe<UserFilter>;
  /** A related `author` exists. */
  authorExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `authorId` field. */
  authorId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `isEnabled` field. */
  isEnabled?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `isVerified` field. */
  isVerified?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PluginFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PluginFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `version` field. */
  version?: InputMaybe<StringFilter>;
  /** Filter by the object’s `wasmHash` field. */
  wasmHash?: InputMaybe<StringFilter>;
  /** Filter by the object’s `wasmUrl` field. */
  wasmUrl?: InputMaybe<StringFilter>;
  /** Filter by the object’s `workspace` relation. */
  workspace?: InputMaybe<WorkspaceFilter>;
  /** Filter by the object’s `workspaceId` field. */
  workspaceId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `Plugin` for usage during aggregation. */
export enum PluginGroupBy {
  AuthorId = 'AUTHOR_ID',
  Config = 'CONFIG',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Description = 'DESCRIPTION',
  IsEnabled = 'IS_ENABLED',
  IsVerified = 'IS_VERIFIED',
  Manifest = 'MANIFEST',
  Name = 'NAME',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  Version = 'VERSION',
  WasmHash = 'WASM_HASH',
  WasmUrl = 'WASM_URL',
  WorkspaceId = 'WORKSPACE_ID'
}

export type PluginHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `Plugin` aggregates. */
export type PluginHavingInput = {
  AND?: InputMaybe<Array<PluginHavingInput>>;
  OR?: InputMaybe<Array<PluginHavingInput>>;
  average?: InputMaybe<PluginHavingAverageInput>;
  distinctCount?: InputMaybe<PluginHavingDistinctCountInput>;
  max?: InputMaybe<PluginHavingMaxInput>;
  min?: InputMaybe<PluginHavingMinInput>;
  stddevPopulation?: InputMaybe<PluginHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<PluginHavingStddevSampleInput>;
  sum?: InputMaybe<PluginHavingSumInput>;
  variancePopulation?: InputMaybe<PluginHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<PluginHavingVarianceSampleInput>;
};

export type PluginHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Plugin` */
export type PluginInput = {
  authorId?: InputMaybe<Scalars['UUID']['input']>;
  config?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  manifest: Scalars['JSON']['input'];
  name: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  version: Scalars['String']['input'];
  wasmHash: Scalars['String']['input'];
  wasmUrl: Scalars['String']['input'];
  workspaceId: Scalars['UUID']['input'];
};

/** Methods to use when ordering `Plugin`. */
export enum PluginOrderBy {
  AuthorIdAsc = 'AUTHOR_ID_ASC',
  AuthorIdDesc = 'AUTHOR_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  IsEnabledAsc = 'IS_ENABLED_ASC',
  IsEnabledDesc = 'IS_ENABLED_DESC',
  IsVerifiedAsc = 'IS_VERIFIED_ASC',
  IsVerifiedDesc = 'IS_VERIFIED_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  VersionAsc = 'VERSION_ASC',
  VersionDesc = 'VERSION_DESC',
  WasmHashAsc = 'WASM_HASH_ASC',
  WasmHashDesc = 'WASM_HASH_DESC',
  WasmUrlAsc = 'WASM_URL_ASC',
  WasmUrlDesc = 'WASM_URL_DESC',
  WorkspaceIdAsc = 'WORKSPACE_ID_ASC',
  WorkspaceIdDesc = 'WORKSPACE_ID_DESC'
}

/** Represents an update to a `Plugin`. Fields that are set will be updated. */
export type PluginPatch = {
  authorId?: InputMaybe<Scalars['UUID']['input']>;
  config?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  manifest?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
  wasmHash?: InputMaybe<Scalars['String']['input']>;
  wasmUrl?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Get a single `_DrizzleMigration`. */
  _drizzleMigration?: Maybe<_DrizzleMigration>;
  /** Reads a single `_DrizzleMigration` using its globally unique `ID`. */
  _drizzleMigrationById?: Maybe<_DrizzleMigration>;
  /** Reads and enables pagination through a set of `_DrizzleMigration`. */
  _drizzleMigrations?: Maybe<_DrizzleMigrationConnection>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  id: Scalars['ID']['output'];
  /** Get a single `Integration`. */
  integration?: Maybe<Integration>;
  /** Reads a single `Integration` using its globally unique `ID`. */
  integrationById?: Maybe<Integration>;
  /** Reads and enables pagination through a set of `Integration`. */
  integrations?: Maybe<IntegrationConnection>;
  /** Get a single `Invitation`. */
  invitation?: Maybe<Invitation>;
  /** Reads a single `Invitation` using its globally unique `ID`. */
  invitationById?: Maybe<Invitation>;
  /** Reads and enables pagination through a set of `Invitation`. */
  invitations?: Maybe<InvitationConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Get a single `Plugin`. */
  plugin?: Maybe<Plugin>;
  /** Reads a single `Plugin` using its globally unique `ID`. */
  pluginById?: Maybe<Plugin>;
  /** Reads and enables pagination through a set of `Plugin`. */
  plugins?: Maybe<PluginConnection>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Get a single `User`. */
  user?: Maybe<User>;
  /** Get a single `User`. */
  userByEmail?: Maybe<User>;
  /** Reads a single `User` using its globally unique `ID`. */
  userById?: Maybe<User>;
  /** Get a single `User`. */
  userByIdentityProviderId?: Maybe<User>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UserConnection>;
  /** Get a single `Workflow`. */
  workflow?: Maybe<Workflow>;
  /** Reads a single `Workflow` using its globally unique `ID`. */
  workflowById?: Maybe<Workflow>;
  /** Get a single `WorkflowRun`. */
  workflowRun?: Maybe<WorkflowRun>;
  /** Reads a single `WorkflowRun` using its globally unique `ID`. */
  workflowRunById?: Maybe<WorkflowRun>;
  /** Reads and enables pagination through a set of `WorkflowRun`. */
  workflowRuns?: Maybe<WorkflowRunConnection>;
  /** Get a single `WorkflowStepLog`. */
  workflowStepLog?: Maybe<WorkflowStepLog>;
  /** Reads a single `WorkflowStepLog` using its globally unique `ID`. */
  workflowStepLogById?: Maybe<WorkflowStepLog>;
  /** Reads and enables pagination through a set of `WorkflowStepLog`. */
  workflowStepLogs?: Maybe<WorkflowStepLogConnection>;
  /** Reads and enables pagination through a set of `Workflow`. */
  workflows?: Maybe<WorkflowConnection>;
  /** Get a single `Workspace`. */
  workspace?: Maybe<Workspace>;
  /** Reads a single `Workspace` using its globally unique `ID`. */
  workspaceById?: Maybe<Workspace>;
  /** Get a single `Workspace`. */
  workspaceBySlug?: Maybe<Workspace>;
  /** Get a single `WorkspaceUser`. */
  workspaceUser?: Maybe<WorkspaceUser>;
  /** Reads a single `WorkspaceUser` using its globally unique `ID`. */
  workspaceUserById?: Maybe<WorkspaceUser>;
  /** Reads and enables pagination through a set of `WorkspaceUser`. */
  workspaceUsers?: Maybe<WorkspaceUserConnection>;
  /** Reads and enables pagination through a set of `Workspace`. */
  workspaces?: Maybe<WorkspaceConnection>;
};


/** The root query type which gives access points into the data universe. */
export type Query_DrizzleMigrationArgs = {
  rowId: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type Query_DrizzleMigrationByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type Query_DrizzleMigrationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<_DrizzleMigrationCondition>;
  filter?: InputMaybe<_DrizzleMigrationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<_DrizzleMigrationOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryIntegrationArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryIntegrationByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryIntegrationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<IntegrationCondition>;
  filter?: InputMaybe<IntegrationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<IntegrationOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryInvitationArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryInvitationByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryInvitationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InvitationCondition>;
  filter?: InputMaybe<InvitationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvitationOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPluginArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPluginByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPluginsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PluginCondition>;
  filter?: InputMaybe<PluginFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PluginOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByIdentityProviderIdArgs = {
  identityProviderId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserCondition>;
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkflowArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkflowByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkflowRunArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkflowRunByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkflowRunsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkflowRunCondition>;
  filter?: InputMaybe<WorkflowRunFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkflowRunOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkflowStepLogArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkflowStepLogByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkflowStepLogsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkflowStepLogCondition>;
  filter?: InputMaybe<WorkflowStepLogFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkflowStepLogOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkflowsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkflowCondition>;
  filter?: InputMaybe<WorkflowFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkflowOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkspaceArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkspaceByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkspaceBySlugArgs = {
  slug: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkspaceUserArgs = {
  userId: Scalars['UUID']['input'];
  workspaceId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkspaceUserByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkspaceUsersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkspaceUserCondition>;
  filter?: InputMaybe<WorkspaceUserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkspaceUserOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkspacesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkspaceCondition>;
  filter?: InputMaybe<WorkspaceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkspaceOrderBy>>;
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']['input']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']['input']>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']['input']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
};

export enum Tier {
  Basic = 'basic',
  Free = 'free',
  Team = 'team'
}

/** A filter to be used against Tier fields. All fields are combined with a logical ‘and.’ */
export type TierFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Tier>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Tier>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Tier>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Tier>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Tier>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Tier>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Tier>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Tier>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Tier>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Tier>>;
};

/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export type UuidFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['UUID']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['UUID']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['UUID']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['UUID']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

/** All input for the `updateDrizzleMigrationById` mutation. */
export type UpdateDrizzleMigrationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `_DrizzleMigration` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `_DrizzleMigration` being updated. */
  patch: _DrizzleMigrationPatch;
};

/** All input for the `updateDrizzleMigration` mutation. */
export type UpdateDrizzleMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `_DrizzleMigration` being updated. */
  patch: _DrizzleMigrationPatch;
  rowId: Scalars['Int']['input'];
};

/** The output of our update `_DrizzleMigration` mutation. */
export type UpdateDrizzleMigrationPayload = {
  __typename?: 'UpdateDrizzleMigrationPayload';
  /** The `_DrizzleMigration` that was updated by this mutation. */
  _drizzleMigration?: Maybe<_DrizzleMigration>;
  /** An edge for our `_DrizzleMigration`. May be used by Relay 1. */
  _drizzleMigrationEdge?: Maybe<_DrizzleMigrationEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `_DrizzleMigration` mutation. */
export type UpdateDrizzleMigrationPayload_DrizzleMigrationEdgeArgs = {
  orderBy?: Array<_DrizzleMigrationOrderBy>;
};

/** All input for the `updateIntegrationById` mutation. */
export type UpdateIntegrationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Integration` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Integration` being updated. */
  patch: IntegrationPatch;
};

/** All input for the `updateIntegration` mutation. */
export type UpdateIntegrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Integration` being updated. */
  patch: IntegrationPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Integration` mutation. */
export type UpdateIntegrationPayload = {
  __typename?: 'UpdateIntegrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Integration` that was updated by this mutation. */
  integration?: Maybe<Integration>;
  /** An edge for our `Integration`. May be used by Relay 1. */
  integrationEdge?: Maybe<IntegrationEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Integration` mutation. */
export type UpdateIntegrationPayloadIntegrationEdgeArgs = {
  orderBy?: Array<IntegrationOrderBy>;
};

/** All input for the `updateInvitationById` mutation. */
export type UpdateInvitationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Invitation` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Invitation` being updated. */
  patch: InvitationPatch;
};

/** All input for the `updateInvitation` mutation. */
export type UpdateInvitationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Invitation` being updated. */
  patch: InvitationPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Invitation` mutation. */
export type UpdateInvitationPayload = {
  __typename?: 'UpdateInvitationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Invitation` that was updated by this mutation. */
  invitation?: Maybe<Invitation>;
  /** An edge for our `Invitation`. May be used by Relay 1. */
  invitationEdge?: Maybe<InvitationEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Invitation` mutation. */
export type UpdateInvitationPayloadInvitationEdgeArgs = {
  orderBy?: Array<InvitationOrderBy>;
};

/** All input for the `updatePluginById` mutation. */
export type UpdatePluginByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Plugin` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Plugin` being updated. */
  patch: PluginPatch;
};

/** All input for the `updatePlugin` mutation. */
export type UpdatePluginInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Plugin` being updated. */
  patch: PluginPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Plugin` mutation. */
export type UpdatePluginPayload = {
  __typename?: 'UpdatePluginPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Plugin` that was updated by this mutation. */
  plugin?: Maybe<Plugin>;
  /** An edge for our `Plugin`. May be used by Relay 1. */
  pluginEdge?: Maybe<PluginEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Plugin` mutation. */
export type UpdatePluginPayloadPluginEdgeArgs = {
  orderBy?: Array<PluginOrderBy>;
};

/** All input for the `updateUserByEmail` mutation. */
export type UpdateUserByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** All input for the `updateUserById` mutation. */
export type UpdateUserByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `User` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** All input for the `updateUserByIdentityProviderId` mutation. */
export type UpdateUserByIdentityProviderIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  identityProviderId: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UserEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: Array<UserOrderBy>;
};

/** All input for the `updateWorkflowById` mutation. */
export type UpdateWorkflowByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Workflow` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Workflow` being updated. */
  patch: WorkflowPatch;
};

/** All input for the `updateWorkflow` mutation. */
export type UpdateWorkflowInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Workflow` being updated. */
  patch: WorkflowPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Workflow` mutation. */
export type UpdateWorkflowPayload = {
  __typename?: 'UpdateWorkflowPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Workflow` that was updated by this mutation. */
  workflow?: Maybe<Workflow>;
  /** An edge for our `Workflow`. May be used by Relay 1. */
  workflowEdge?: Maybe<WorkflowEdge>;
};


/** The output of our update `Workflow` mutation. */
export type UpdateWorkflowPayloadWorkflowEdgeArgs = {
  orderBy?: Array<WorkflowOrderBy>;
};

/** All input for the `updateWorkflowRunById` mutation. */
export type UpdateWorkflowRunByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `WorkflowRun` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `WorkflowRun` being updated. */
  patch: WorkflowRunPatch;
};

/** All input for the `updateWorkflowRun` mutation. */
export type UpdateWorkflowRunInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `WorkflowRun` being updated. */
  patch: WorkflowRunPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `WorkflowRun` mutation. */
export type UpdateWorkflowRunPayload = {
  __typename?: 'UpdateWorkflowRunPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `WorkflowRun` that was updated by this mutation. */
  workflowRun?: Maybe<WorkflowRun>;
  /** An edge for our `WorkflowRun`. May be used by Relay 1. */
  workflowRunEdge?: Maybe<WorkflowRunEdge>;
};


/** The output of our update `WorkflowRun` mutation. */
export type UpdateWorkflowRunPayloadWorkflowRunEdgeArgs = {
  orderBy?: Array<WorkflowRunOrderBy>;
};

/** All input for the `updateWorkflowStepLogById` mutation. */
export type UpdateWorkflowStepLogByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `WorkflowStepLog` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `WorkflowStepLog` being updated. */
  patch: WorkflowStepLogPatch;
};

/** All input for the `updateWorkflowStepLog` mutation. */
export type UpdateWorkflowStepLogInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `WorkflowStepLog` being updated. */
  patch: WorkflowStepLogPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `WorkflowStepLog` mutation. */
export type UpdateWorkflowStepLogPayload = {
  __typename?: 'UpdateWorkflowStepLogPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `WorkflowStepLog` that was updated by this mutation. */
  workflowStepLog?: Maybe<WorkflowStepLog>;
  /** An edge for our `WorkflowStepLog`. May be used by Relay 1. */
  workflowStepLogEdge?: Maybe<WorkflowStepLogEdge>;
};


/** The output of our update `WorkflowStepLog` mutation. */
export type UpdateWorkflowStepLogPayloadWorkflowStepLogEdgeArgs = {
  orderBy?: Array<WorkflowStepLogOrderBy>;
};

/** All input for the `updateWorkspaceById` mutation. */
export type UpdateWorkspaceByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Workspace` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Workspace` being updated. */
  patch: WorkspacePatch;
};

/** All input for the `updateWorkspaceBySlug` mutation. */
export type UpdateWorkspaceBySlugInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Workspace` being updated. */
  patch: WorkspacePatch;
  slug: Scalars['String']['input'];
};

/** All input for the `updateWorkspace` mutation. */
export type UpdateWorkspaceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Workspace` being updated. */
  patch: WorkspacePatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Workspace` mutation. */
export type UpdateWorkspacePayload = {
  __typename?: 'UpdateWorkspacePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Workspace` that was updated by this mutation. */
  workspace?: Maybe<Workspace>;
  /** An edge for our `Workspace`. May be used by Relay 1. */
  workspaceEdge?: Maybe<WorkspaceEdge>;
};


/** The output of our update `Workspace` mutation. */
export type UpdateWorkspacePayloadWorkspaceEdgeArgs = {
  orderBy?: Array<WorkspaceOrderBy>;
};

/** All input for the `updateWorkspaceUserById` mutation. */
export type UpdateWorkspaceUserByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `WorkspaceUser` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `WorkspaceUser` being updated. */
  patch: WorkspaceUserPatch;
};

/** All input for the `updateWorkspaceUser` mutation. */
export type UpdateWorkspaceUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `WorkspaceUser` being updated. */
  patch: WorkspaceUserPatch;
  userId: Scalars['UUID']['input'];
  workspaceId: Scalars['UUID']['input'];
};

/** The output of our update `WorkspaceUser` mutation. */
export type UpdateWorkspaceUserPayload = {
  __typename?: 'UpdateWorkspaceUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `WorkspaceUser` that was updated by this mutation. */
  workspaceUser?: Maybe<WorkspaceUser>;
  /** An edge for our `WorkspaceUser`. May be used by Relay 1. */
  workspaceUserEdge?: Maybe<WorkspaceUserEdge>;
};


/** The output of our update `WorkspaceUser` mutation. */
export type UpdateWorkspaceUserPayloadWorkspaceUserEdgeArgs = {
  orderBy?: Array<WorkspaceUserOrderBy>;
};

export type User = Node & {
  __typename?: 'User';
  /** Reads and enables pagination through a set of `Plugin`. */
  authoredPlugins: PluginConnection;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  email: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  identityProviderId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Invitation`. */
  invitationsByInvitedBy: InvitationConnection;
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `Workflow`. */
  workflowsByCreatedBy: WorkflowConnection;
  /** Reads and enables pagination through a set of `WorkspaceUser`. */
  workspaceUsers: WorkspaceUserConnection;
};


export type UserAuthoredPluginsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PluginCondition>;
  filter?: InputMaybe<PluginFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PluginOrderBy>>;
};


export type UserInvitationsByInvitedByArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InvitationCondition>;
  filter?: InputMaybe<InvitationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvitationOrderBy>>;
};


export type UserWorkflowsByCreatedByArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkflowCondition>;
  filter?: InputMaybe<WorkflowFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkflowOrderBy>>;
};


export type UserWorkspaceUsersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkspaceUserCondition>;
  filter?: InputMaybe<WorkspaceUserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkspaceUserOrderBy>>;
};

export type UserAggregates = {
  __typename?: 'UserAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<UserDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `avatarUrl` field. */
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `identityProviderId` field. */
  identityProviderId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `User` values. */
export type UserConnection = {
  __typename?: 'UserConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<UserAggregates>;
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UserEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<UserAggregates>>;
  /** A list of `User` objects. */
  nodes: Array<User>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `User` values. */
export type UserConnectionGroupedAggregatesArgs = {
  groupBy: Array<UserGroupBy>;
  having?: InputMaybe<UserHavingInput>;
};

export type UserDistinctCountAggregates = {
  __typename?: 'UserDistinctCountAggregates';
  /** Distinct count of avatarUrl across the matching connection */
  avatarUrl?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of email across the matching connection */
  email?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of identityProviderId across the matching connection */
  identityProviderId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
};

/** A `User` edge in the connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `User` at the end of the edge. */
  node: User;
};

/** A filter to be used against `User` object types. All fields are combined with a logical ‘and.’ */
export type UserFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UserFilter>>;
  /** Filter by the object’s `authoredPlugins` relation. */
  authoredPlugins?: InputMaybe<UserToManyPluginFilter>;
  /** Some related `authoredPlugins` exist. */
  authoredPluginsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `avatarUrl` field. */
  avatarUrl?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `email` field. */
  email?: InputMaybe<StringFilter>;
  /** Filter by the object’s `identityProviderId` field. */
  identityProviderId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `invitationsByInvitedBy` relation. */
  invitationsByInvitedBy?: InputMaybe<UserToManyInvitationFilter>;
  /** Some related `invitationsByInvitedBy` exist. */
  invitationsByInvitedByExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<UserFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UserFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `workflowsByCreatedBy` relation. */
  workflowsByCreatedBy?: InputMaybe<UserToManyWorkflowFilter>;
  /** Some related `workflowsByCreatedBy` exist. */
  workflowsByCreatedByExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `workspaceUsers` relation. */
  workspaceUsers?: InputMaybe<UserToManyWorkspaceUserFilter>;
  /** Some related `workspaceUsers` exist. */
  workspaceUsersExist?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Grouping methods for `User` for usage during aggregation. */
export enum UserGroupBy {
  AvatarUrl = 'AVATAR_URL',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Name = 'NAME',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type UserHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `User` aggregates. */
export type UserHavingInput = {
  AND?: InputMaybe<Array<UserHavingInput>>;
  OR?: InputMaybe<Array<UserHavingInput>>;
  average?: InputMaybe<UserHavingAverageInput>;
  distinctCount?: InputMaybe<UserHavingDistinctCountInput>;
  max?: InputMaybe<UserHavingMaxInput>;
  min?: InputMaybe<UserHavingMinInput>;
  stddevPopulation?: InputMaybe<UserHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<UserHavingStddevSampleInput>;
  sum?: InputMaybe<UserHavingSumInput>;
  variancePopulation?: InputMaybe<UserHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<UserHavingVarianceSampleInput>;
};

export type UserHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `User` */
export type UserInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email: Scalars['String']['input'];
  identityProviderId: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `User`. */
export enum UserOrderBy {
  AuthoredPluginsCountAsc = 'AUTHORED_PLUGINS_COUNT_ASC',
  AuthoredPluginsCountDesc = 'AUTHORED_PLUGINS_COUNT_DESC',
  AuthoredPluginsDistinctCountAuthorIdAsc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_AUTHOR_ID_ASC',
  AuthoredPluginsDistinctCountAuthorIdDesc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_AUTHOR_ID_DESC',
  AuthoredPluginsDistinctCountConfigAsc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_CONFIG_ASC',
  AuthoredPluginsDistinctCountConfigDesc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_CONFIG_DESC',
  AuthoredPluginsDistinctCountCreatedAtAsc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_CREATED_AT_ASC',
  AuthoredPluginsDistinctCountCreatedAtDesc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_CREATED_AT_DESC',
  AuthoredPluginsDistinctCountDescriptionAsc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_DESCRIPTION_ASC',
  AuthoredPluginsDistinctCountDescriptionDesc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_DESCRIPTION_DESC',
  AuthoredPluginsDistinctCountIsEnabledAsc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_IS_ENABLED_ASC',
  AuthoredPluginsDistinctCountIsEnabledDesc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_IS_ENABLED_DESC',
  AuthoredPluginsDistinctCountIsVerifiedAsc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_IS_VERIFIED_ASC',
  AuthoredPluginsDistinctCountIsVerifiedDesc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_IS_VERIFIED_DESC',
  AuthoredPluginsDistinctCountManifestAsc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_MANIFEST_ASC',
  AuthoredPluginsDistinctCountManifestDesc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_MANIFEST_DESC',
  AuthoredPluginsDistinctCountNameAsc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_NAME_ASC',
  AuthoredPluginsDistinctCountNameDesc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_NAME_DESC',
  AuthoredPluginsDistinctCountRowIdAsc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_ROW_ID_ASC',
  AuthoredPluginsDistinctCountRowIdDesc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_ROW_ID_DESC',
  AuthoredPluginsDistinctCountUpdatedAtAsc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_UPDATED_AT_ASC',
  AuthoredPluginsDistinctCountUpdatedAtDesc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_UPDATED_AT_DESC',
  AuthoredPluginsDistinctCountVersionAsc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_VERSION_ASC',
  AuthoredPluginsDistinctCountVersionDesc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_VERSION_DESC',
  AuthoredPluginsDistinctCountWasmHashAsc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_WASM_HASH_ASC',
  AuthoredPluginsDistinctCountWasmHashDesc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_WASM_HASH_DESC',
  AuthoredPluginsDistinctCountWasmUrlAsc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_WASM_URL_ASC',
  AuthoredPluginsDistinctCountWasmUrlDesc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_WASM_URL_DESC',
  AuthoredPluginsDistinctCountWorkspaceIdAsc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_WORKSPACE_ID_ASC',
  AuthoredPluginsDistinctCountWorkspaceIdDesc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_WORKSPACE_ID_DESC',
  AvatarUrlAsc = 'AVATAR_URL_ASC',
  AvatarUrlDesc = 'AVATAR_URL_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  IdentityProviderIdAsc = 'IDENTITY_PROVIDER_ID_ASC',
  IdentityProviderIdDesc = 'IDENTITY_PROVIDER_ID_DESC',
  InvitationsByInvitedByCountAsc = 'INVITATIONS_BY_INVITED_BY_COUNT_ASC',
  InvitationsByInvitedByCountDesc = 'INVITATIONS_BY_INVITED_BY_COUNT_DESC',
  InvitationsByInvitedByDistinctCountAcceptedAtAsc = 'INVITATIONS_BY_INVITED_BY_DISTINCT_COUNT_ACCEPTED_AT_ASC',
  InvitationsByInvitedByDistinctCountAcceptedAtDesc = 'INVITATIONS_BY_INVITED_BY_DISTINCT_COUNT_ACCEPTED_AT_DESC',
  InvitationsByInvitedByDistinctCountCreatedAtAsc = 'INVITATIONS_BY_INVITED_BY_DISTINCT_COUNT_CREATED_AT_ASC',
  InvitationsByInvitedByDistinctCountCreatedAtDesc = 'INVITATIONS_BY_INVITED_BY_DISTINCT_COUNT_CREATED_AT_DESC',
  InvitationsByInvitedByDistinctCountEmailAsc = 'INVITATIONS_BY_INVITED_BY_DISTINCT_COUNT_EMAIL_ASC',
  InvitationsByInvitedByDistinctCountEmailDesc = 'INVITATIONS_BY_INVITED_BY_DISTINCT_COUNT_EMAIL_DESC',
  InvitationsByInvitedByDistinctCountExpiresAtAsc = 'INVITATIONS_BY_INVITED_BY_DISTINCT_COUNT_EXPIRES_AT_ASC',
  InvitationsByInvitedByDistinctCountExpiresAtDesc = 'INVITATIONS_BY_INVITED_BY_DISTINCT_COUNT_EXPIRES_AT_DESC',
  InvitationsByInvitedByDistinctCountInvitedByAsc = 'INVITATIONS_BY_INVITED_BY_DISTINCT_COUNT_INVITED_BY_ASC',
  InvitationsByInvitedByDistinctCountInvitedByDesc = 'INVITATIONS_BY_INVITED_BY_DISTINCT_COUNT_INVITED_BY_DESC',
  InvitationsByInvitedByDistinctCountRoleAsc = 'INVITATIONS_BY_INVITED_BY_DISTINCT_COUNT_ROLE_ASC',
  InvitationsByInvitedByDistinctCountRoleDesc = 'INVITATIONS_BY_INVITED_BY_DISTINCT_COUNT_ROLE_DESC',
  InvitationsByInvitedByDistinctCountRowIdAsc = 'INVITATIONS_BY_INVITED_BY_DISTINCT_COUNT_ROW_ID_ASC',
  InvitationsByInvitedByDistinctCountRowIdDesc = 'INVITATIONS_BY_INVITED_BY_DISTINCT_COUNT_ROW_ID_DESC',
  InvitationsByInvitedByDistinctCountWorkspaceIdAsc = 'INVITATIONS_BY_INVITED_BY_DISTINCT_COUNT_WORKSPACE_ID_ASC',
  InvitationsByInvitedByDistinctCountWorkspaceIdDesc = 'INVITATIONS_BY_INVITED_BY_DISTINCT_COUNT_WORKSPACE_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  WorkflowsByCreatedByCountAsc = 'WORKFLOWS_BY_CREATED_BY_COUNT_ASC',
  WorkflowsByCreatedByCountDesc = 'WORKFLOWS_BY_CREATED_BY_COUNT_DESC',
  WorkflowsByCreatedByDistinctCountCreatedAtAsc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_CREATED_AT_ASC',
  WorkflowsByCreatedByDistinctCountCreatedAtDesc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_CREATED_AT_DESC',
  WorkflowsByCreatedByDistinctCountCreatedByAsc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_CREATED_BY_ASC',
  WorkflowsByCreatedByDistinctCountCreatedByDesc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_CREATED_BY_DESC',
  WorkflowsByCreatedByDistinctCountCronExpressionAsc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_CRON_EXPRESSION_ASC',
  WorkflowsByCreatedByDistinctCountCronExpressionDesc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_CRON_EXPRESSION_DESC',
  WorkflowsByCreatedByDistinctCountDefinitionAsc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_DEFINITION_ASC',
  WorkflowsByCreatedByDistinctCountDefinitionDesc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_DEFINITION_DESC',
  WorkflowsByCreatedByDistinctCountDescriptionAsc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_DESCRIPTION_ASC',
  WorkflowsByCreatedByDistinctCountDescriptionDesc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_DESCRIPTION_DESC',
  WorkflowsByCreatedByDistinctCountIsActiveAsc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_IS_ACTIVE_ASC',
  WorkflowsByCreatedByDistinctCountIsActiveDesc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_IS_ACTIVE_DESC',
  WorkflowsByCreatedByDistinctCountLastRunAtAsc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_LAST_RUN_AT_ASC',
  WorkflowsByCreatedByDistinctCountLastRunAtDesc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_LAST_RUN_AT_DESC',
  WorkflowsByCreatedByDistinctCountLastRunStatusAsc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_LAST_RUN_STATUS_ASC',
  WorkflowsByCreatedByDistinctCountLastRunStatusDesc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_LAST_RUN_STATUS_DESC',
  WorkflowsByCreatedByDistinctCountNameAsc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_NAME_ASC',
  WorkflowsByCreatedByDistinctCountNameDesc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_NAME_DESC',
  WorkflowsByCreatedByDistinctCountRowIdAsc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_ROW_ID_ASC',
  WorkflowsByCreatedByDistinctCountRowIdDesc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_ROW_ID_DESC',
  WorkflowsByCreatedByDistinctCountUpdatedAtAsc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_UPDATED_AT_ASC',
  WorkflowsByCreatedByDistinctCountUpdatedAtDesc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_UPDATED_AT_DESC',
  WorkflowsByCreatedByDistinctCountWebhookSecretAsc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_WEBHOOK_SECRET_ASC',
  WorkflowsByCreatedByDistinctCountWebhookSecretDesc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_WEBHOOK_SECRET_DESC',
  WorkflowsByCreatedByDistinctCountWorkspaceIdAsc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_WORKSPACE_ID_ASC',
  WorkflowsByCreatedByDistinctCountWorkspaceIdDesc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_WORKSPACE_ID_DESC',
  WorkspaceUsersCountAsc = 'WORKSPACE_USERS_COUNT_ASC',
  WorkspaceUsersCountDesc = 'WORKSPACE_USERS_COUNT_DESC',
  WorkspaceUsersDistinctCountCreatedAtAsc = 'WORKSPACE_USERS_DISTINCT_COUNT_CREATED_AT_ASC',
  WorkspaceUsersDistinctCountCreatedAtDesc = 'WORKSPACE_USERS_DISTINCT_COUNT_CREATED_AT_DESC',
  WorkspaceUsersDistinctCountRoleAsc = 'WORKSPACE_USERS_DISTINCT_COUNT_ROLE_ASC',
  WorkspaceUsersDistinctCountRoleDesc = 'WORKSPACE_USERS_DISTINCT_COUNT_ROLE_DESC',
  WorkspaceUsersDistinctCountUpdatedAtAsc = 'WORKSPACE_USERS_DISTINCT_COUNT_UPDATED_AT_ASC',
  WorkspaceUsersDistinctCountUpdatedAtDesc = 'WORKSPACE_USERS_DISTINCT_COUNT_UPDATED_AT_DESC',
  WorkspaceUsersDistinctCountUserIdAsc = 'WORKSPACE_USERS_DISTINCT_COUNT_USER_ID_ASC',
  WorkspaceUsersDistinctCountUserIdDesc = 'WORKSPACE_USERS_DISTINCT_COUNT_USER_ID_DESC',
  WorkspaceUsersDistinctCountWorkspaceIdAsc = 'WORKSPACE_USERS_DISTINCT_COUNT_WORKSPACE_ID_ASC',
  WorkspaceUsersDistinctCountWorkspaceIdDesc = 'WORKSPACE_USERS_DISTINCT_COUNT_WORKSPACE_ID_DESC'
}

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  identityProviderId?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against many `Invitation` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyInvitationFilter = {
  /** Aggregates across related `Invitation` match the filter criteria. */
  aggregates?: InputMaybe<InvitationAggregatesFilter>;
  /** Every related `Invitation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<InvitationFilter>;
  /** No related `Invitation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<InvitationFilter>;
  /** Some related `Invitation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<InvitationFilter>;
};

/** A filter to be used against many `Plugin` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyPluginFilter = {
  /** Aggregates across related `Plugin` match the filter criteria. */
  aggregates?: InputMaybe<PluginAggregatesFilter>;
  /** Every related `Plugin` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PluginFilter>;
  /** No related `Plugin` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PluginFilter>;
  /** Some related `Plugin` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PluginFilter>;
};

/** A filter to be used against many `Workflow` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyWorkflowFilter = {
  /** Aggregates across related `Workflow` match the filter criteria. */
  aggregates?: InputMaybe<WorkflowAggregatesFilter>;
  /** Every related `Workflow` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<WorkflowFilter>;
  /** No related `Workflow` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<WorkflowFilter>;
  /** Some related `Workflow` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<WorkflowFilter>;
};

/** A filter to be used against many `WorkspaceUser` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyWorkspaceUserFilter = {
  /** Aggregates across related `WorkspaceUser` match the filter criteria. */
  aggregates?: InputMaybe<WorkspaceUserAggregatesFilter>;
  /** Every related `WorkspaceUser` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<WorkspaceUserFilter>;
  /** No related `WorkspaceUser` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<WorkspaceUserFilter>;
  /** Some related `WorkspaceUser` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<WorkspaceUserFilter>;
};

export type Workflow = Node & {
  __typename?: 'Workflow';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  createdBy?: Maybe<Scalars['UUID']['output']>;
  cronExpression?: Maybe<Scalars['String']['output']>;
  definition: Scalars['JSON']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lastRunAt?: Maybe<Scalars['Datetime']['output']>;
  lastRunStatus?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `User` that is related to this `Workflow`. */
  user?: Maybe<User>;
  webhookSecret?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `WorkflowRun`. */
  workflowRuns: WorkflowRunConnection;
  /** Reads a single `Workspace` that is related to this `Workflow`. */
  workspace?: Maybe<Workspace>;
  workspaceId: Scalars['UUID']['output'];
};


export type WorkflowWorkflowRunsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkflowRunCondition>;
  filter?: InputMaybe<WorkflowRunFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkflowRunOrderBy>>;
};

export type WorkflowAggregates = {
  __typename?: 'WorkflowAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<WorkflowDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `Workflow` object types. */
export type WorkflowAggregatesFilter = {
  /** Distinct count aggregate over matching `Workflow` objects. */
  distinctCount?: InputMaybe<WorkflowDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Workflow` object to be included within the aggregate. */
  filter?: InputMaybe<WorkflowFilter>;
};

/**
 * A condition to be used against `Workflow` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type WorkflowCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `cronExpression` field. */
  cronExpression?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `isActive` field. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `lastRunAt` field. */
  lastRunAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `lastRunStatus` field. */
  lastRunStatus?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `webhookSecret` field. */
  webhookSecret?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `workspaceId` field. */
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Workflow` values. */
export type WorkflowConnection = {
  __typename?: 'WorkflowConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<WorkflowAggregates>;
  /** A list of edges which contains the `Workflow` and cursor to aid in pagination. */
  edges: Array<WorkflowEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<WorkflowAggregates>>;
  /** A list of `Workflow` objects. */
  nodes: Array<Workflow>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Workflow` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Workflow` values. */
export type WorkflowConnectionGroupedAggregatesArgs = {
  groupBy: Array<WorkflowGroupBy>;
  having?: InputMaybe<WorkflowHavingInput>;
};

export type WorkflowDistinctCountAggregateFilter = {
  createdAt?: InputMaybe<BigIntFilter>;
  createdBy?: InputMaybe<BigIntFilter>;
  cronExpression?: InputMaybe<BigIntFilter>;
  definition?: InputMaybe<BigIntFilter>;
  description?: InputMaybe<BigIntFilter>;
  isActive?: InputMaybe<BigIntFilter>;
  lastRunAt?: InputMaybe<BigIntFilter>;
  lastRunStatus?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  webhookSecret?: InputMaybe<BigIntFilter>;
  workspaceId?: InputMaybe<BigIntFilter>;
};

export type WorkflowDistinctCountAggregates = {
  __typename?: 'WorkflowDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdBy across the matching connection */
  createdBy?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of cronExpression across the matching connection */
  cronExpression?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of definition across the matching connection */
  definition?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of isActive across the matching connection */
  isActive?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of lastRunAt across the matching connection */
  lastRunAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of lastRunStatus across the matching connection */
  lastRunStatus?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of webhookSecret across the matching connection */
  webhookSecret?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of workspaceId across the matching connection */
  workspaceId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Workflow` edge in the connection. */
export type WorkflowEdge = {
  __typename?: 'WorkflowEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Workflow` at the end of the edge. */
  node: Workflow;
};

/** A filter to be used against `Workflow` object types. All fields are combined with a logical ‘and.’ */
export type WorkflowFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<WorkflowFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `createdBy` field. */
  createdBy?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `cronExpression` field. */
  cronExpression?: InputMaybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `isActive` field. */
  isActive?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `lastRunAt` field. */
  lastRunAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `lastRunStatus` field. */
  lastRunStatus?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<WorkflowFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<WorkflowFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** A related `user` exists. */
  userExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `webhookSecret` field. */
  webhookSecret?: InputMaybe<StringFilter>;
  /** Filter by the object’s `workflowRuns` relation. */
  workflowRuns?: InputMaybe<WorkflowToManyWorkflowRunFilter>;
  /** Some related `workflowRuns` exist. */
  workflowRunsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `workspace` relation. */
  workspace?: InputMaybe<WorkspaceFilter>;
  /** Filter by the object’s `workspaceId` field. */
  workspaceId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `Workflow` for usage during aggregation. */
export enum WorkflowGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  CreatedBy = 'CREATED_BY',
  CronExpression = 'CRON_EXPRESSION',
  Definition = 'DEFINITION',
  Description = 'DESCRIPTION',
  IsActive = 'IS_ACTIVE',
  LastRunAt = 'LAST_RUN_AT',
  LastRunAtTruncatedToDay = 'LAST_RUN_AT_TRUNCATED_TO_DAY',
  LastRunAtTruncatedToHour = 'LAST_RUN_AT_TRUNCATED_TO_HOUR',
  LastRunStatus = 'LAST_RUN_STATUS',
  Name = 'NAME',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  WebhookSecret = 'WEBHOOK_SECRET',
  WorkspaceId = 'WORKSPACE_ID'
}

export type WorkflowHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastRunAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastRunAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `Workflow` aggregates. */
export type WorkflowHavingInput = {
  AND?: InputMaybe<Array<WorkflowHavingInput>>;
  OR?: InputMaybe<Array<WorkflowHavingInput>>;
  average?: InputMaybe<WorkflowHavingAverageInput>;
  distinctCount?: InputMaybe<WorkflowHavingDistinctCountInput>;
  max?: InputMaybe<WorkflowHavingMaxInput>;
  min?: InputMaybe<WorkflowHavingMinInput>;
  stddevPopulation?: InputMaybe<WorkflowHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<WorkflowHavingStddevSampleInput>;
  sum?: InputMaybe<WorkflowHavingSumInput>;
  variancePopulation?: InputMaybe<WorkflowHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<WorkflowHavingVarianceSampleInput>;
};

export type WorkflowHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastRunAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastRunAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastRunAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastRunAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastRunAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastRunAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastRunAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Workflow` */
export type WorkflowInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdBy?: InputMaybe<Scalars['UUID']['input']>;
  cronExpression?: InputMaybe<Scalars['String']['input']>;
  definition: Scalars['JSON']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastRunAt?: InputMaybe<Scalars['Datetime']['input']>;
  lastRunStatus?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  webhookSecret?: InputMaybe<Scalars['String']['input']>;
  workspaceId: Scalars['UUID']['input'];
};

/** Methods to use when ordering `Workflow`. */
export enum WorkflowOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  CreatedByAsc = 'CREATED_BY_ASC',
  CreatedByDesc = 'CREATED_BY_DESC',
  CronExpressionAsc = 'CRON_EXPRESSION_ASC',
  CronExpressionDesc = 'CRON_EXPRESSION_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  IsActiveAsc = 'IS_ACTIVE_ASC',
  IsActiveDesc = 'IS_ACTIVE_DESC',
  LastRunAtAsc = 'LAST_RUN_AT_ASC',
  LastRunAtDesc = 'LAST_RUN_AT_DESC',
  LastRunStatusAsc = 'LAST_RUN_STATUS_ASC',
  LastRunStatusDesc = 'LAST_RUN_STATUS_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  WebhookSecretAsc = 'WEBHOOK_SECRET_ASC',
  WebhookSecretDesc = 'WEBHOOK_SECRET_DESC',
  WorkflowRunsCountAsc = 'WORKFLOW_RUNS_COUNT_ASC',
  WorkflowRunsCountDesc = 'WORKFLOW_RUNS_COUNT_DESC',
  WorkflowRunsDistinctCountCompletedAtAsc = 'WORKFLOW_RUNS_DISTINCT_COUNT_COMPLETED_AT_ASC',
  WorkflowRunsDistinctCountCompletedAtDesc = 'WORKFLOW_RUNS_DISTINCT_COUNT_COMPLETED_AT_DESC',
  WorkflowRunsDistinctCountCreatedAtAsc = 'WORKFLOW_RUNS_DISTINCT_COUNT_CREATED_AT_ASC',
  WorkflowRunsDistinctCountCreatedAtDesc = 'WORKFLOW_RUNS_DISTINCT_COUNT_CREATED_AT_DESC',
  WorkflowRunsDistinctCountEngineRunIdAsc = 'WORKFLOW_RUNS_DISTINCT_COUNT_ENGINE_RUN_ID_ASC',
  WorkflowRunsDistinctCountEngineRunIdDesc = 'WORKFLOW_RUNS_DISTINCT_COUNT_ENGINE_RUN_ID_DESC',
  WorkflowRunsDistinctCountEngineWorkflowIdAsc = 'WORKFLOW_RUNS_DISTINCT_COUNT_ENGINE_WORKFLOW_ID_ASC',
  WorkflowRunsDistinctCountEngineWorkflowIdDesc = 'WORKFLOW_RUNS_DISTINCT_COUNT_ENGINE_WORKFLOW_ID_DESC',
  WorkflowRunsDistinctCountErrorAsc = 'WORKFLOW_RUNS_DISTINCT_COUNT_ERROR_ASC',
  WorkflowRunsDistinctCountErrorDesc = 'WORKFLOW_RUNS_DISTINCT_COUNT_ERROR_DESC',
  WorkflowRunsDistinctCountInputAsc = 'WORKFLOW_RUNS_DISTINCT_COUNT_INPUT_ASC',
  WorkflowRunsDistinctCountInputDesc = 'WORKFLOW_RUNS_DISTINCT_COUNT_INPUT_DESC',
  WorkflowRunsDistinctCountOutputAsc = 'WORKFLOW_RUNS_DISTINCT_COUNT_OUTPUT_ASC',
  WorkflowRunsDistinctCountOutputDesc = 'WORKFLOW_RUNS_DISTINCT_COUNT_OUTPUT_DESC',
  WorkflowRunsDistinctCountRowIdAsc = 'WORKFLOW_RUNS_DISTINCT_COUNT_ROW_ID_ASC',
  WorkflowRunsDistinctCountRowIdDesc = 'WORKFLOW_RUNS_DISTINCT_COUNT_ROW_ID_DESC',
  WorkflowRunsDistinctCountStartedAtAsc = 'WORKFLOW_RUNS_DISTINCT_COUNT_STARTED_AT_ASC',
  WorkflowRunsDistinctCountStartedAtDesc = 'WORKFLOW_RUNS_DISTINCT_COUNT_STARTED_AT_DESC',
  WorkflowRunsDistinctCountStatusAsc = 'WORKFLOW_RUNS_DISTINCT_COUNT_STATUS_ASC',
  WorkflowRunsDistinctCountStatusDesc = 'WORKFLOW_RUNS_DISTINCT_COUNT_STATUS_DESC',
  WorkflowRunsDistinctCountWorkflowIdAsc = 'WORKFLOW_RUNS_DISTINCT_COUNT_WORKFLOW_ID_ASC',
  WorkflowRunsDistinctCountWorkflowIdDesc = 'WORKFLOW_RUNS_DISTINCT_COUNT_WORKFLOW_ID_DESC',
  WorkspaceIdAsc = 'WORKSPACE_ID_ASC',
  WorkspaceIdDesc = 'WORKSPACE_ID_DESC'
}

/** Represents an update to a `Workflow`. Fields that are set will be updated. */
export type WorkflowPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdBy?: InputMaybe<Scalars['UUID']['input']>;
  cronExpression?: InputMaybe<Scalars['String']['input']>;
  definition?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastRunAt?: InputMaybe<Scalars['Datetime']['input']>;
  lastRunStatus?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  webhookSecret?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

export type WorkflowRun = Node & {
  __typename?: 'WorkflowRun';
  completedAt?: Maybe<Scalars['Datetime']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  engineRunId: Scalars['String']['output'];
  engineWorkflowId: Scalars['String']['output'];
  error?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  input?: Maybe<Scalars['JSON']['output']>;
  output?: Maybe<Scalars['JSON']['output']>;
  rowId: Scalars['UUID']['output'];
  startedAt?: Maybe<Scalars['Datetime']['output']>;
  status: Scalars['String']['output'];
  /** Reads a single `Workflow` that is related to this `WorkflowRun`. */
  workflow?: Maybe<Workflow>;
  workflowId?: Maybe<Scalars['UUID']['output']>;
  /** Reads and enables pagination through a set of `WorkflowStepLog`. */
  workflowStepLogs: WorkflowStepLogConnection;
};


export type WorkflowRunWorkflowStepLogsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkflowStepLogCondition>;
  filter?: InputMaybe<WorkflowStepLogFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkflowStepLogOrderBy>>;
};

export type WorkflowRunAggregates = {
  __typename?: 'WorkflowRunAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<WorkflowRunDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `WorkflowRun` object types. */
export type WorkflowRunAggregatesFilter = {
  /** Distinct count aggregate over matching `WorkflowRun` objects. */
  distinctCount?: InputMaybe<WorkflowRunDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `WorkflowRun` object to be included within the aggregate. */
  filter?: InputMaybe<WorkflowRunFilter>;
};

/**
 * A condition to be used against `WorkflowRun` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type WorkflowRunCondition = {
  /** Checks for equality with the object’s `completedAt` field. */
  completedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `engineRunId` field. */
  engineRunId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `engineWorkflowId` field. */
  engineWorkflowId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `error` field. */
  error?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `startedAt` field. */
  startedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `workflowId` field. */
  workflowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `WorkflowRun` values. */
export type WorkflowRunConnection = {
  __typename?: 'WorkflowRunConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<WorkflowRunAggregates>;
  /** A list of edges which contains the `WorkflowRun` and cursor to aid in pagination. */
  edges: Array<WorkflowRunEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<WorkflowRunAggregates>>;
  /** A list of `WorkflowRun` objects. */
  nodes: Array<WorkflowRun>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `WorkflowRun` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `WorkflowRun` values. */
export type WorkflowRunConnectionGroupedAggregatesArgs = {
  groupBy: Array<WorkflowRunGroupBy>;
  having?: InputMaybe<WorkflowRunHavingInput>;
};

export type WorkflowRunDistinctCountAggregateFilter = {
  completedAt?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  engineRunId?: InputMaybe<BigIntFilter>;
  engineWorkflowId?: InputMaybe<BigIntFilter>;
  error?: InputMaybe<BigIntFilter>;
  input?: InputMaybe<BigIntFilter>;
  output?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  startedAt?: InputMaybe<BigIntFilter>;
  status?: InputMaybe<BigIntFilter>;
  workflowId?: InputMaybe<BigIntFilter>;
};

export type WorkflowRunDistinctCountAggregates = {
  __typename?: 'WorkflowRunDistinctCountAggregates';
  /** Distinct count of completedAt across the matching connection */
  completedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of engineRunId across the matching connection */
  engineRunId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of engineWorkflowId across the matching connection */
  engineWorkflowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of error across the matching connection */
  error?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of input across the matching connection */
  input?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of output across the matching connection */
  output?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of startedAt across the matching connection */
  startedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of status across the matching connection */
  status?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of workflowId across the matching connection */
  workflowId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `WorkflowRun` edge in the connection. */
export type WorkflowRunEdge = {
  __typename?: 'WorkflowRunEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `WorkflowRun` at the end of the edge. */
  node: WorkflowRun;
};

/** A filter to be used against `WorkflowRun` object types. All fields are combined with a logical ‘and.’ */
export type WorkflowRunFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<WorkflowRunFilter>>;
  /** Filter by the object’s `completedAt` field. */
  completedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `engineRunId` field. */
  engineRunId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `engineWorkflowId` field. */
  engineWorkflowId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `error` field. */
  error?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<WorkflowRunFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<WorkflowRunFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `startedAt` field. */
  startedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
  /** Filter by the object’s `workflow` relation. */
  workflow?: InputMaybe<WorkflowFilter>;
  /** A related `workflow` exists. */
  workflowExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `workflowId` field. */
  workflowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `workflowStepLogs` relation. */
  workflowStepLogs?: InputMaybe<WorkflowRunToManyWorkflowStepLogFilter>;
  /** Some related `workflowStepLogs` exist. */
  workflowStepLogsExist?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Grouping methods for `WorkflowRun` for usage during aggregation. */
export enum WorkflowRunGroupBy {
  CompletedAt = 'COMPLETED_AT',
  CompletedAtTruncatedToDay = 'COMPLETED_AT_TRUNCATED_TO_DAY',
  CompletedAtTruncatedToHour = 'COMPLETED_AT_TRUNCATED_TO_HOUR',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  EngineRunId = 'ENGINE_RUN_ID',
  EngineWorkflowId = 'ENGINE_WORKFLOW_ID',
  Error = 'ERROR',
  Input = 'INPUT',
  Output = 'OUTPUT',
  StartedAt = 'STARTED_AT',
  StartedAtTruncatedToDay = 'STARTED_AT_TRUNCATED_TO_DAY',
  StartedAtTruncatedToHour = 'STARTED_AT_TRUNCATED_TO_HOUR',
  Status = 'STATUS',
  WorkflowId = 'WORKFLOW_ID'
}

export type WorkflowRunHavingAverageInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowRunHavingDistinctCountInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `WorkflowRun` aggregates. */
export type WorkflowRunHavingInput = {
  AND?: InputMaybe<Array<WorkflowRunHavingInput>>;
  OR?: InputMaybe<Array<WorkflowRunHavingInput>>;
  average?: InputMaybe<WorkflowRunHavingAverageInput>;
  distinctCount?: InputMaybe<WorkflowRunHavingDistinctCountInput>;
  max?: InputMaybe<WorkflowRunHavingMaxInput>;
  min?: InputMaybe<WorkflowRunHavingMinInput>;
  stddevPopulation?: InputMaybe<WorkflowRunHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<WorkflowRunHavingStddevSampleInput>;
  sum?: InputMaybe<WorkflowRunHavingSumInput>;
  variancePopulation?: InputMaybe<WorkflowRunHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<WorkflowRunHavingVarianceSampleInput>;
};

export type WorkflowRunHavingMaxInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowRunHavingMinInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowRunHavingStddevPopulationInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowRunHavingStddevSampleInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowRunHavingSumInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowRunHavingVariancePopulationInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowRunHavingVarianceSampleInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `WorkflowRun` */
export type WorkflowRunInput = {
  completedAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  engineRunId: Scalars['String']['input'];
  engineWorkflowId: Scalars['String']['input'];
  error?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Scalars['JSON']['input']>;
  output?: InputMaybe<Scalars['JSON']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  startedAt?: InputMaybe<Scalars['Datetime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  workflowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** Methods to use when ordering `WorkflowRun`. */
export enum WorkflowRunOrderBy {
  CompletedAtAsc = 'COMPLETED_AT_ASC',
  CompletedAtDesc = 'COMPLETED_AT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EngineRunIdAsc = 'ENGINE_RUN_ID_ASC',
  EngineRunIdDesc = 'ENGINE_RUN_ID_DESC',
  EngineWorkflowIdAsc = 'ENGINE_WORKFLOW_ID_ASC',
  EngineWorkflowIdDesc = 'ENGINE_WORKFLOW_ID_DESC',
  ErrorAsc = 'ERROR_ASC',
  ErrorDesc = 'ERROR_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StartedAtAsc = 'STARTED_AT_ASC',
  StartedAtDesc = 'STARTED_AT_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  WorkflowIdAsc = 'WORKFLOW_ID_ASC',
  WorkflowIdDesc = 'WORKFLOW_ID_DESC',
  WorkflowStepLogsCountAsc = 'WORKFLOW_STEP_LOGS_COUNT_ASC',
  WorkflowStepLogsCountDesc = 'WORKFLOW_STEP_LOGS_COUNT_DESC',
  WorkflowStepLogsDistinctCountCompletedAtAsc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_COMPLETED_AT_ASC',
  WorkflowStepLogsDistinctCountCompletedAtDesc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_COMPLETED_AT_DESC',
  WorkflowStepLogsDistinctCountCreatedAtAsc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_CREATED_AT_ASC',
  WorkflowStepLogsDistinctCountCreatedAtDesc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_CREATED_AT_DESC',
  WorkflowStepLogsDistinctCountErrorAsc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_ERROR_ASC',
  WorkflowStepLogsDistinctCountErrorDesc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_ERROR_DESC',
  WorkflowStepLogsDistinctCountInputAsc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_INPUT_ASC',
  WorkflowStepLogsDistinctCountInputDesc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_INPUT_DESC',
  WorkflowStepLogsDistinctCountOutputAsc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_OUTPUT_ASC',
  WorkflowStepLogsDistinctCountOutputDesc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_OUTPUT_DESC',
  WorkflowStepLogsDistinctCountRowIdAsc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_ROW_ID_ASC',
  WorkflowStepLogsDistinctCountRowIdDesc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_ROW_ID_DESC',
  WorkflowStepLogsDistinctCountStartedAtAsc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_STARTED_AT_ASC',
  WorkflowStepLogsDistinctCountStartedAtDesc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_STARTED_AT_DESC',
  WorkflowStepLogsDistinctCountStatusAsc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_STATUS_ASC',
  WorkflowStepLogsDistinctCountStatusDesc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_STATUS_DESC',
  WorkflowStepLogsDistinctCountStepIdAsc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_STEP_ID_ASC',
  WorkflowStepLogsDistinctCountStepIdDesc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_STEP_ID_DESC',
  WorkflowStepLogsDistinctCountStepNameAsc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_STEP_NAME_ASC',
  WorkflowStepLogsDistinctCountStepNameDesc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_STEP_NAME_DESC',
  WorkflowStepLogsDistinctCountStepTypeAsc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_STEP_TYPE_ASC',
  WorkflowStepLogsDistinctCountStepTypeDesc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_STEP_TYPE_DESC',
  WorkflowStepLogsDistinctCountWorkflowRunIdAsc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_WORKFLOW_RUN_ID_ASC',
  WorkflowStepLogsDistinctCountWorkflowRunIdDesc = 'WORKFLOW_STEP_LOGS_DISTINCT_COUNT_WORKFLOW_RUN_ID_DESC'
}

/** Represents an update to a `WorkflowRun`. Fields that are set will be updated. */
export type WorkflowRunPatch = {
  completedAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  engineRunId?: InputMaybe<Scalars['String']['input']>;
  engineWorkflowId?: InputMaybe<Scalars['String']['input']>;
  error?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Scalars['JSON']['input']>;
  output?: InputMaybe<Scalars['JSON']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  startedAt?: InputMaybe<Scalars['Datetime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  workflowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A filter to be used against many `WorkflowStepLog` object types. All fields are combined with a logical ‘and.’ */
export type WorkflowRunToManyWorkflowStepLogFilter = {
  /** Aggregates across related `WorkflowStepLog` match the filter criteria. */
  aggregates?: InputMaybe<WorkflowStepLogAggregatesFilter>;
  /** Every related `WorkflowStepLog` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<WorkflowStepLogFilter>;
  /** No related `WorkflowStepLog` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<WorkflowStepLogFilter>;
  /** Some related `WorkflowStepLog` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<WorkflowStepLogFilter>;
};

export type WorkflowStepLog = Node & {
  __typename?: 'WorkflowStepLog';
  completedAt?: Maybe<Scalars['Datetime']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  input?: Maybe<Scalars['JSON']['output']>;
  output?: Maybe<Scalars['JSON']['output']>;
  rowId: Scalars['UUID']['output'];
  startedAt?: Maybe<Scalars['Datetime']['output']>;
  status: Scalars['String']['output'];
  stepId: Scalars['String']['output'];
  stepName: Scalars['String']['output'];
  stepType: Scalars['String']['output'];
  /** Reads a single `WorkflowRun` that is related to this `WorkflowStepLog`. */
  workflowRun?: Maybe<WorkflowRun>;
  workflowRunId: Scalars['UUID']['output'];
};

export type WorkflowStepLogAggregates = {
  __typename?: 'WorkflowStepLogAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<WorkflowStepLogDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `WorkflowStepLog` object types. */
export type WorkflowStepLogAggregatesFilter = {
  /** Distinct count aggregate over matching `WorkflowStepLog` objects. */
  distinctCount?: InputMaybe<WorkflowStepLogDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `WorkflowStepLog` object to be included within the aggregate. */
  filter?: InputMaybe<WorkflowStepLogFilter>;
};

/**
 * A condition to be used against `WorkflowStepLog` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type WorkflowStepLogCondition = {
  /** Checks for equality with the object’s `completedAt` field. */
  completedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `error` field. */
  error?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `startedAt` field. */
  startedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `stepId` field. */
  stepId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `stepName` field. */
  stepName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `stepType` field. */
  stepType?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `workflowRunId` field. */
  workflowRunId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `WorkflowStepLog` values. */
export type WorkflowStepLogConnection = {
  __typename?: 'WorkflowStepLogConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<WorkflowStepLogAggregates>;
  /** A list of edges which contains the `WorkflowStepLog` and cursor to aid in pagination. */
  edges: Array<WorkflowStepLogEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<WorkflowStepLogAggregates>>;
  /** A list of `WorkflowStepLog` objects. */
  nodes: Array<WorkflowStepLog>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `WorkflowStepLog` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `WorkflowStepLog` values. */
export type WorkflowStepLogConnectionGroupedAggregatesArgs = {
  groupBy: Array<WorkflowStepLogGroupBy>;
  having?: InputMaybe<WorkflowStepLogHavingInput>;
};

export type WorkflowStepLogDistinctCountAggregateFilter = {
  completedAt?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  error?: InputMaybe<BigIntFilter>;
  input?: InputMaybe<BigIntFilter>;
  output?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  startedAt?: InputMaybe<BigIntFilter>;
  status?: InputMaybe<BigIntFilter>;
  stepId?: InputMaybe<BigIntFilter>;
  stepName?: InputMaybe<BigIntFilter>;
  stepType?: InputMaybe<BigIntFilter>;
  workflowRunId?: InputMaybe<BigIntFilter>;
};

export type WorkflowStepLogDistinctCountAggregates = {
  __typename?: 'WorkflowStepLogDistinctCountAggregates';
  /** Distinct count of completedAt across the matching connection */
  completedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of error across the matching connection */
  error?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of input across the matching connection */
  input?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of output across the matching connection */
  output?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of startedAt across the matching connection */
  startedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of status across the matching connection */
  status?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of stepId across the matching connection */
  stepId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of stepName across the matching connection */
  stepName?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of stepType across the matching connection */
  stepType?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of workflowRunId across the matching connection */
  workflowRunId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `WorkflowStepLog` edge in the connection. */
export type WorkflowStepLogEdge = {
  __typename?: 'WorkflowStepLogEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `WorkflowStepLog` at the end of the edge. */
  node: WorkflowStepLog;
};

/** A filter to be used against `WorkflowStepLog` object types. All fields are combined with a logical ‘and.’ */
export type WorkflowStepLogFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<WorkflowStepLogFilter>>;
  /** Filter by the object’s `completedAt` field. */
  completedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `error` field. */
  error?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<WorkflowStepLogFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<WorkflowStepLogFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `startedAt` field. */
  startedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
  /** Filter by the object’s `stepId` field. */
  stepId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `stepName` field. */
  stepName?: InputMaybe<StringFilter>;
  /** Filter by the object’s `stepType` field. */
  stepType?: InputMaybe<StringFilter>;
  /** Filter by the object’s `workflowRun` relation. */
  workflowRun?: InputMaybe<WorkflowRunFilter>;
  /** Filter by the object’s `workflowRunId` field. */
  workflowRunId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `WorkflowStepLog` for usage during aggregation. */
export enum WorkflowStepLogGroupBy {
  CompletedAt = 'COMPLETED_AT',
  CompletedAtTruncatedToDay = 'COMPLETED_AT_TRUNCATED_TO_DAY',
  CompletedAtTruncatedToHour = 'COMPLETED_AT_TRUNCATED_TO_HOUR',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Error = 'ERROR',
  Input = 'INPUT',
  Output = 'OUTPUT',
  StartedAt = 'STARTED_AT',
  StartedAtTruncatedToDay = 'STARTED_AT_TRUNCATED_TO_DAY',
  StartedAtTruncatedToHour = 'STARTED_AT_TRUNCATED_TO_HOUR',
  Status = 'STATUS',
  StepId = 'STEP_ID',
  StepName = 'STEP_NAME',
  StepType = 'STEP_TYPE',
  WorkflowRunId = 'WORKFLOW_RUN_ID'
}

export type WorkflowStepLogHavingAverageInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowStepLogHavingDistinctCountInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `WorkflowStepLog` aggregates. */
export type WorkflowStepLogHavingInput = {
  AND?: InputMaybe<Array<WorkflowStepLogHavingInput>>;
  OR?: InputMaybe<Array<WorkflowStepLogHavingInput>>;
  average?: InputMaybe<WorkflowStepLogHavingAverageInput>;
  distinctCount?: InputMaybe<WorkflowStepLogHavingDistinctCountInput>;
  max?: InputMaybe<WorkflowStepLogHavingMaxInput>;
  min?: InputMaybe<WorkflowStepLogHavingMinInput>;
  stddevPopulation?: InputMaybe<WorkflowStepLogHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<WorkflowStepLogHavingStddevSampleInput>;
  sum?: InputMaybe<WorkflowStepLogHavingSumInput>;
  variancePopulation?: InputMaybe<WorkflowStepLogHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<WorkflowStepLogHavingVarianceSampleInput>;
};

export type WorkflowStepLogHavingMaxInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowStepLogHavingMinInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowStepLogHavingStddevPopulationInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowStepLogHavingStddevSampleInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowStepLogHavingSumInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowStepLogHavingVariancePopulationInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowStepLogHavingVarianceSampleInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `WorkflowStepLog` */
export type WorkflowStepLogInput = {
  completedAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  error?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Scalars['JSON']['input']>;
  output?: InputMaybe<Scalars['JSON']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  startedAt?: InputMaybe<Scalars['Datetime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  stepId: Scalars['String']['input'];
  stepName: Scalars['String']['input'];
  stepType: Scalars['String']['input'];
  workflowRunId: Scalars['UUID']['input'];
};

/** Methods to use when ordering `WorkflowStepLog`. */
export enum WorkflowStepLogOrderBy {
  CompletedAtAsc = 'COMPLETED_AT_ASC',
  CompletedAtDesc = 'COMPLETED_AT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  ErrorAsc = 'ERROR_ASC',
  ErrorDesc = 'ERROR_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StartedAtAsc = 'STARTED_AT_ASC',
  StartedAtDesc = 'STARTED_AT_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  StepIdAsc = 'STEP_ID_ASC',
  StepIdDesc = 'STEP_ID_DESC',
  StepNameAsc = 'STEP_NAME_ASC',
  StepNameDesc = 'STEP_NAME_DESC',
  StepTypeAsc = 'STEP_TYPE_ASC',
  StepTypeDesc = 'STEP_TYPE_DESC',
  WorkflowRunIdAsc = 'WORKFLOW_RUN_ID_ASC',
  WorkflowRunIdDesc = 'WORKFLOW_RUN_ID_DESC'
}

/** Represents an update to a `WorkflowStepLog`. Fields that are set will be updated. */
export type WorkflowStepLogPatch = {
  completedAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  error?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Scalars['JSON']['input']>;
  output?: InputMaybe<Scalars['JSON']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  startedAt?: InputMaybe<Scalars['Datetime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  stepId?: InputMaybe<Scalars['String']['input']>;
  stepName?: InputMaybe<Scalars['String']['input']>;
  stepType?: InputMaybe<Scalars['String']['input']>;
  workflowRunId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A filter to be used against many `WorkflowRun` object types. All fields are combined with a logical ‘and.’ */
export type WorkflowToManyWorkflowRunFilter = {
  /** Aggregates across related `WorkflowRun` match the filter criteria. */
  aggregates?: InputMaybe<WorkflowRunAggregatesFilter>;
  /** Every related `WorkflowRun` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<WorkflowRunFilter>;
  /** No related `WorkflowRun` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<WorkflowRunFilter>;
  /** Some related `WorkflowRun` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<WorkflowRunFilter>;
};

export type Workspace = Node & {
  __typename?: 'Workspace';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Integration`. */
  integrations: IntegrationConnection;
  /** Reads and enables pagination through a set of `Invitation`. */
  invitations: InvitationConnection;
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Plugin`. */
  plugins: PluginConnection;
  rowId: Scalars['UUID']['output'];
  slug: Scalars['String']['output'];
  subscriptionId?: Maybe<Scalars['String']['output']>;
  tier: Tier;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `Workflow`. */
  workflows: WorkflowConnection;
  /** Reads and enables pagination through a set of `WorkspaceUser`. */
  workspaceUsers: WorkspaceUserConnection;
};


export type WorkspaceIntegrationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<IntegrationCondition>;
  filter?: InputMaybe<IntegrationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<IntegrationOrderBy>>;
};


export type WorkspaceInvitationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<InvitationCondition>;
  filter?: InputMaybe<InvitationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InvitationOrderBy>>;
};


export type WorkspacePluginsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PluginCondition>;
  filter?: InputMaybe<PluginFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PluginOrderBy>>;
};


export type WorkspaceWorkflowsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkflowCondition>;
  filter?: InputMaybe<WorkflowFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkflowOrderBy>>;
};


export type WorkspaceWorkspaceUsersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkspaceUserCondition>;
  filter?: InputMaybe<WorkspaceUserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkspaceUserOrderBy>>;
};

export type WorkspaceAggregates = {
  __typename?: 'WorkspaceAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<WorkspaceDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/**
 * A condition to be used against `Workspace` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type WorkspaceCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `subscriptionId` field. */
  subscriptionId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `tier` field. */
  tier?: InputMaybe<Tier>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `Workspace` values. */
export type WorkspaceConnection = {
  __typename?: 'WorkspaceConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<WorkspaceAggregates>;
  /** A list of edges which contains the `Workspace` and cursor to aid in pagination. */
  edges: Array<WorkspaceEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<WorkspaceAggregates>>;
  /** A list of `Workspace` objects. */
  nodes: Array<Workspace>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Workspace` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Workspace` values. */
export type WorkspaceConnectionGroupedAggregatesArgs = {
  groupBy: Array<WorkspaceGroupBy>;
  having?: InputMaybe<WorkspaceHavingInput>;
};

export type WorkspaceDistinctCountAggregates = {
  __typename?: 'WorkspaceDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of slug across the matching connection */
  slug?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of subscriptionId across the matching connection */
  subscriptionId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of tier across the matching connection */
  tier?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Workspace` edge in the connection. */
export type WorkspaceEdge = {
  __typename?: 'WorkspaceEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Workspace` at the end of the edge. */
  node: Workspace;
};

/** A filter to be used against `Workspace` object types. All fields are combined with a logical ‘and.’ */
export type WorkspaceFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<WorkspaceFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `integrations` relation. */
  integrations?: InputMaybe<WorkspaceToManyIntegrationFilter>;
  /** Some related `integrations` exist. */
  integrationsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `invitations` relation. */
  invitations?: InputMaybe<WorkspaceToManyInvitationFilter>;
  /** Some related `invitations` exist. */
  invitationsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<WorkspaceFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<WorkspaceFilter>>;
  /** Filter by the object’s `plugins` relation. */
  plugins?: InputMaybe<WorkspaceToManyPluginFilter>;
  /** Some related `plugins` exist. */
  pluginsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
  /** Filter by the object’s `subscriptionId` field. */
  subscriptionId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `tier` field. */
  tier?: InputMaybe<TierFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `workflows` relation. */
  workflows?: InputMaybe<WorkspaceToManyWorkflowFilter>;
  /** Some related `workflows` exist. */
  workflowsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `workspaceUsers` relation. */
  workspaceUsers?: InputMaybe<WorkspaceToManyWorkspaceUserFilter>;
  /** Some related `workspaceUsers` exist. */
  workspaceUsersExist?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Grouping methods for `Workspace` for usage during aggregation. */
export enum WorkspaceGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Name = 'NAME',
  SubscriptionId = 'SUBSCRIPTION_ID',
  Tier = 'TIER',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type WorkspaceHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `Workspace` aggregates. */
export type WorkspaceHavingInput = {
  AND?: InputMaybe<Array<WorkspaceHavingInput>>;
  OR?: InputMaybe<Array<WorkspaceHavingInput>>;
  average?: InputMaybe<WorkspaceHavingAverageInput>;
  distinctCount?: InputMaybe<WorkspaceHavingDistinctCountInput>;
  max?: InputMaybe<WorkspaceHavingMaxInput>;
  min?: InputMaybe<WorkspaceHavingMinInput>;
  stddevPopulation?: InputMaybe<WorkspaceHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<WorkspaceHavingStddevSampleInput>;
  sum?: InputMaybe<WorkspaceHavingSumInput>;
  variancePopulation?: InputMaybe<WorkspaceHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<WorkspaceHavingVarianceSampleInput>;
};

export type WorkspaceHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Workspace` */
export type WorkspaceInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  name: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  slug: Scalars['String']['input'];
  subscriptionId?: InputMaybe<Scalars['String']['input']>;
  tier?: InputMaybe<Tier>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `Workspace`. */
export enum WorkspaceOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IntegrationsCountAsc = 'INTEGRATIONS_COUNT_ASC',
  IntegrationsCountDesc = 'INTEGRATIONS_COUNT_DESC',
  IntegrationsDistinctCountConfigAsc = 'INTEGRATIONS_DISTINCT_COUNT_CONFIG_ASC',
  IntegrationsDistinctCountConfigDesc = 'INTEGRATIONS_DISTINCT_COUNT_CONFIG_DESC',
  IntegrationsDistinctCountCreatedAtAsc = 'INTEGRATIONS_DISTINCT_COUNT_CREATED_AT_ASC',
  IntegrationsDistinctCountCreatedAtDesc = 'INTEGRATIONS_DISTINCT_COUNT_CREATED_AT_DESC',
  IntegrationsDistinctCountIsEnabledAsc = 'INTEGRATIONS_DISTINCT_COUNT_IS_ENABLED_ASC',
  IntegrationsDistinctCountIsEnabledDesc = 'INTEGRATIONS_DISTINCT_COUNT_IS_ENABLED_DESC',
  IntegrationsDistinctCountNameAsc = 'INTEGRATIONS_DISTINCT_COUNT_NAME_ASC',
  IntegrationsDistinctCountNameDesc = 'INTEGRATIONS_DISTINCT_COUNT_NAME_DESC',
  IntegrationsDistinctCountRowIdAsc = 'INTEGRATIONS_DISTINCT_COUNT_ROW_ID_ASC',
  IntegrationsDistinctCountRowIdDesc = 'INTEGRATIONS_DISTINCT_COUNT_ROW_ID_DESC',
  IntegrationsDistinctCountTypeAsc = 'INTEGRATIONS_DISTINCT_COUNT_TYPE_ASC',
  IntegrationsDistinctCountTypeDesc = 'INTEGRATIONS_DISTINCT_COUNT_TYPE_DESC',
  IntegrationsDistinctCountUpdatedAtAsc = 'INTEGRATIONS_DISTINCT_COUNT_UPDATED_AT_ASC',
  IntegrationsDistinctCountUpdatedAtDesc = 'INTEGRATIONS_DISTINCT_COUNT_UPDATED_AT_DESC',
  IntegrationsDistinctCountWorkspaceIdAsc = 'INTEGRATIONS_DISTINCT_COUNT_WORKSPACE_ID_ASC',
  IntegrationsDistinctCountWorkspaceIdDesc = 'INTEGRATIONS_DISTINCT_COUNT_WORKSPACE_ID_DESC',
  InvitationsCountAsc = 'INVITATIONS_COUNT_ASC',
  InvitationsCountDesc = 'INVITATIONS_COUNT_DESC',
  InvitationsDistinctCountAcceptedAtAsc = 'INVITATIONS_DISTINCT_COUNT_ACCEPTED_AT_ASC',
  InvitationsDistinctCountAcceptedAtDesc = 'INVITATIONS_DISTINCT_COUNT_ACCEPTED_AT_DESC',
  InvitationsDistinctCountCreatedAtAsc = 'INVITATIONS_DISTINCT_COUNT_CREATED_AT_ASC',
  InvitationsDistinctCountCreatedAtDesc = 'INVITATIONS_DISTINCT_COUNT_CREATED_AT_DESC',
  InvitationsDistinctCountEmailAsc = 'INVITATIONS_DISTINCT_COUNT_EMAIL_ASC',
  InvitationsDistinctCountEmailDesc = 'INVITATIONS_DISTINCT_COUNT_EMAIL_DESC',
  InvitationsDistinctCountExpiresAtAsc = 'INVITATIONS_DISTINCT_COUNT_EXPIRES_AT_ASC',
  InvitationsDistinctCountExpiresAtDesc = 'INVITATIONS_DISTINCT_COUNT_EXPIRES_AT_DESC',
  InvitationsDistinctCountInvitedByAsc = 'INVITATIONS_DISTINCT_COUNT_INVITED_BY_ASC',
  InvitationsDistinctCountInvitedByDesc = 'INVITATIONS_DISTINCT_COUNT_INVITED_BY_DESC',
  InvitationsDistinctCountRoleAsc = 'INVITATIONS_DISTINCT_COUNT_ROLE_ASC',
  InvitationsDistinctCountRoleDesc = 'INVITATIONS_DISTINCT_COUNT_ROLE_DESC',
  InvitationsDistinctCountRowIdAsc = 'INVITATIONS_DISTINCT_COUNT_ROW_ID_ASC',
  InvitationsDistinctCountRowIdDesc = 'INVITATIONS_DISTINCT_COUNT_ROW_ID_DESC',
  InvitationsDistinctCountWorkspaceIdAsc = 'INVITATIONS_DISTINCT_COUNT_WORKSPACE_ID_ASC',
  InvitationsDistinctCountWorkspaceIdDesc = 'INVITATIONS_DISTINCT_COUNT_WORKSPACE_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PluginsCountAsc = 'PLUGINS_COUNT_ASC',
  PluginsCountDesc = 'PLUGINS_COUNT_DESC',
  PluginsDistinctCountAuthorIdAsc = 'PLUGINS_DISTINCT_COUNT_AUTHOR_ID_ASC',
  PluginsDistinctCountAuthorIdDesc = 'PLUGINS_DISTINCT_COUNT_AUTHOR_ID_DESC',
  PluginsDistinctCountConfigAsc = 'PLUGINS_DISTINCT_COUNT_CONFIG_ASC',
  PluginsDistinctCountConfigDesc = 'PLUGINS_DISTINCT_COUNT_CONFIG_DESC',
  PluginsDistinctCountCreatedAtAsc = 'PLUGINS_DISTINCT_COUNT_CREATED_AT_ASC',
  PluginsDistinctCountCreatedAtDesc = 'PLUGINS_DISTINCT_COUNT_CREATED_AT_DESC',
  PluginsDistinctCountDescriptionAsc = 'PLUGINS_DISTINCT_COUNT_DESCRIPTION_ASC',
  PluginsDistinctCountDescriptionDesc = 'PLUGINS_DISTINCT_COUNT_DESCRIPTION_DESC',
  PluginsDistinctCountIsEnabledAsc = 'PLUGINS_DISTINCT_COUNT_IS_ENABLED_ASC',
  PluginsDistinctCountIsEnabledDesc = 'PLUGINS_DISTINCT_COUNT_IS_ENABLED_DESC',
  PluginsDistinctCountIsVerifiedAsc = 'PLUGINS_DISTINCT_COUNT_IS_VERIFIED_ASC',
  PluginsDistinctCountIsVerifiedDesc = 'PLUGINS_DISTINCT_COUNT_IS_VERIFIED_DESC',
  PluginsDistinctCountManifestAsc = 'PLUGINS_DISTINCT_COUNT_MANIFEST_ASC',
  PluginsDistinctCountManifestDesc = 'PLUGINS_DISTINCT_COUNT_MANIFEST_DESC',
  PluginsDistinctCountNameAsc = 'PLUGINS_DISTINCT_COUNT_NAME_ASC',
  PluginsDistinctCountNameDesc = 'PLUGINS_DISTINCT_COUNT_NAME_DESC',
  PluginsDistinctCountRowIdAsc = 'PLUGINS_DISTINCT_COUNT_ROW_ID_ASC',
  PluginsDistinctCountRowIdDesc = 'PLUGINS_DISTINCT_COUNT_ROW_ID_DESC',
  PluginsDistinctCountUpdatedAtAsc = 'PLUGINS_DISTINCT_COUNT_UPDATED_AT_ASC',
  PluginsDistinctCountUpdatedAtDesc = 'PLUGINS_DISTINCT_COUNT_UPDATED_AT_DESC',
  PluginsDistinctCountVersionAsc = 'PLUGINS_DISTINCT_COUNT_VERSION_ASC',
  PluginsDistinctCountVersionDesc = 'PLUGINS_DISTINCT_COUNT_VERSION_DESC',
  PluginsDistinctCountWasmHashAsc = 'PLUGINS_DISTINCT_COUNT_WASM_HASH_ASC',
  PluginsDistinctCountWasmHashDesc = 'PLUGINS_DISTINCT_COUNT_WASM_HASH_DESC',
  PluginsDistinctCountWasmUrlAsc = 'PLUGINS_DISTINCT_COUNT_WASM_URL_ASC',
  PluginsDistinctCountWasmUrlDesc = 'PLUGINS_DISTINCT_COUNT_WASM_URL_DESC',
  PluginsDistinctCountWorkspaceIdAsc = 'PLUGINS_DISTINCT_COUNT_WORKSPACE_ID_ASC',
  PluginsDistinctCountWorkspaceIdDesc = 'PLUGINS_DISTINCT_COUNT_WORKSPACE_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  SubscriptionIdAsc = 'SUBSCRIPTION_ID_ASC',
  SubscriptionIdDesc = 'SUBSCRIPTION_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  WorkflowsCountAsc = 'WORKFLOWS_COUNT_ASC',
  WorkflowsCountDesc = 'WORKFLOWS_COUNT_DESC',
  WorkflowsDistinctCountCreatedAtAsc = 'WORKFLOWS_DISTINCT_COUNT_CREATED_AT_ASC',
  WorkflowsDistinctCountCreatedAtDesc = 'WORKFLOWS_DISTINCT_COUNT_CREATED_AT_DESC',
  WorkflowsDistinctCountCreatedByAsc = 'WORKFLOWS_DISTINCT_COUNT_CREATED_BY_ASC',
  WorkflowsDistinctCountCreatedByDesc = 'WORKFLOWS_DISTINCT_COUNT_CREATED_BY_DESC',
  WorkflowsDistinctCountCronExpressionAsc = 'WORKFLOWS_DISTINCT_COUNT_CRON_EXPRESSION_ASC',
  WorkflowsDistinctCountCronExpressionDesc = 'WORKFLOWS_DISTINCT_COUNT_CRON_EXPRESSION_DESC',
  WorkflowsDistinctCountDefinitionAsc = 'WORKFLOWS_DISTINCT_COUNT_DEFINITION_ASC',
  WorkflowsDistinctCountDefinitionDesc = 'WORKFLOWS_DISTINCT_COUNT_DEFINITION_DESC',
  WorkflowsDistinctCountDescriptionAsc = 'WORKFLOWS_DISTINCT_COUNT_DESCRIPTION_ASC',
  WorkflowsDistinctCountDescriptionDesc = 'WORKFLOWS_DISTINCT_COUNT_DESCRIPTION_DESC',
  WorkflowsDistinctCountIsActiveAsc = 'WORKFLOWS_DISTINCT_COUNT_IS_ACTIVE_ASC',
  WorkflowsDistinctCountIsActiveDesc = 'WORKFLOWS_DISTINCT_COUNT_IS_ACTIVE_DESC',
  WorkflowsDistinctCountLastRunAtAsc = 'WORKFLOWS_DISTINCT_COUNT_LAST_RUN_AT_ASC',
  WorkflowsDistinctCountLastRunAtDesc = 'WORKFLOWS_DISTINCT_COUNT_LAST_RUN_AT_DESC',
  WorkflowsDistinctCountLastRunStatusAsc = 'WORKFLOWS_DISTINCT_COUNT_LAST_RUN_STATUS_ASC',
  WorkflowsDistinctCountLastRunStatusDesc = 'WORKFLOWS_DISTINCT_COUNT_LAST_RUN_STATUS_DESC',
  WorkflowsDistinctCountNameAsc = 'WORKFLOWS_DISTINCT_COUNT_NAME_ASC',
  WorkflowsDistinctCountNameDesc = 'WORKFLOWS_DISTINCT_COUNT_NAME_DESC',
  WorkflowsDistinctCountRowIdAsc = 'WORKFLOWS_DISTINCT_COUNT_ROW_ID_ASC',
  WorkflowsDistinctCountRowIdDesc = 'WORKFLOWS_DISTINCT_COUNT_ROW_ID_DESC',
  WorkflowsDistinctCountUpdatedAtAsc = 'WORKFLOWS_DISTINCT_COUNT_UPDATED_AT_ASC',
  WorkflowsDistinctCountUpdatedAtDesc = 'WORKFLOWS_DISTINCT_COUNT_UPDATED_AT_DESC',
  WorkflowsDistinctCountWebhookSecretAsc = 'WORKFLOWS_DISTINCT_COUNT_WEBHOOK_SECRET_ASC',
  WorkflowsDistinctCountWebhookSecretDesc = 'WORKFLOWS_DISTINCT_COUNT_WEBHOOK_SECRET_DESC',
  WorkflowsDistinctCountWorkspaceIdAsc = 'WORKFLOWS_DISTINCT_COUNT_WORKSPACE_ID_ASC',
  WorkflowsDistinctCountWorkspaceIdDesc = 'WORKFLOWS_DISTINCT_COUNT_WORKSPACE_ID_DESC',
  WorkspaceUsersCountAsc = 'WORKSPACE_USERS_COUNT_ASC',
  WorkspaceUsersCountDesc = 'WORKSPACE_USERS_COUNT_DESC',
  WorkspaceUsersDistinctCountCreatedAtAsc = 'WORKSPACE_USERS_DISTINCT_COUNT_CREATED_AT_ASC',
  WorkspaceUsersDistinctCountCreatedAtDesc = 'WORKSPACE_USERS_DISTINCT_COUNT_CREATED_AT_DESC',
  WorkspaceUsersDistinctCountRoleAsc = 'WORKSPACE_USERS_DISTINCT_COUNT_ROLE_ASC',
  WorkspaceUsersDistinctCountRoleDesc = 'WORKSPACE_USERS_DISTINCT_COUNT_ROLE_DESC',
  WorkspaceUsersDistinctCountUpdatedAtAsc = 'WORKSPACE_USERS_DISTINCT_COUNT_UPDATED_AT_ASC',
  WorkspaceUsersDistinctCountUpdatedAtDesc = 'WORKSPACE_USERS_DISTINCT_COUNT_UPDATED_AT_DESC',
  WorkspaceUsersDistinctCountUserIdAsc = 'WORKSPACE_USERS_DISTINCT_COUNT_USER_ID_ASC',
  WorkspaceUsersDistinctCountUserIdDesc = 'WORKSPACE_USERS_DISTINCT_COUNT_USER_ID_DESC',
  WorkspaceUsersDistinctCountWorkspaceIdAsc = 'WORKSPACE_USERS_DISTINCT_COUNT_WORKSPACE_ID_ASC',
  WorkspaceUsersDistinctCountWorkspaceIdDesc = 'WORKSPACE_USERS_DISTINCT_COUNT_WORKSPACE_ID_DESC'
}

/** Represents an update to a `Workspace`. Fields that are set will be updated. */
export type WorkspacePatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  subscriptionId?: InputMaybe<Scalars['String']['input']>;
  tier?: InputMaybe<Tier>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export enum WorkspaceRole {
  Admin = 'admin',
  Member = 'member',
  Owner = 'owner'
}

/** A filter to be used against WorkspaceRole fields. All fields are combined with a logical ‘and.’ */
export type WorkspaceRoleFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<WorkspaceRole>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<WorkspaceRole>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<WorkspaceRole>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<WorkspaceRole>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<WorkspaceRole>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<WorkspaceRole>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<WorkspaceRole>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<WorkspaceRole>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<WorkspaceRole>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<WorkspaceRole>>;
};

/** A filter to be used against many `Integration` object types. All fields are combined with a logical ‘and.’ */
export type WorkspaceToManyIntegrationFilter = {
  /** Aggregates across related `Integration` match the filter criteria. */
  aggregates?: InputMaybe<IntegrationAggregatesFilter>;
  /** Every related `Integration` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<IntegrationFilter>;
  /** No related `Integration` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<IntegrationFilter>;
  /** Some related `Integration` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<IntegrationFilter>;
};

/** A filter to be used against many `Invitation` object types. All fields are combined with a logical ‘and.’ */
export type WorkspaceToManyInvitationFilter = {
  /** Aggregates across related `Invitation` match the filter criteria. */
  aggregates?: InputMaybe<InvitationAggregatesFilter>;
  /** Every related `Invitation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<InvitationFilter>;
  /** No related `Invitation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<InvitationFilter>;
  /** Some related `Invitation` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<InvitationFilter>;
};

/** A filter to be used against many `Plugin` object types. All fields are combined with a logical ‘and.’ */
export type WorkspaceToManyPluginFilter = {
  /** Aggregates across related `Plugin` match the filter criteria. */
  aggregates?: InputMaybe<PluginAggregatesFilter>;
  /** Every related `Plugin` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PluginFilter>;
  /** No related `Plugin` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PluginFilter>;
  /** Some related `Plugin` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PluginFilter>;
};

/** A filter to be used against many `Workflow` object types. All fields are combined with a logical ‘and.’ */
export type WorkspaceToManyWorkflowFilter = {
  /** Aggregates across related `Workflow` match the filter criteria. */
  aggregates?: InputMaybe<WorkflowAggregatesFilter>;
  /** Every related `Workflow` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<WorkflowFilter>;
  /** No related `Workflow` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<WorkflowFilter>;
  /** Some related `Workflow` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<WorkflowFilter>;
};

/** A filter to be used against many `WorkspaceUser` object types. All fields are combined with a logical ‘and.’ */
export type WorkspaceToManyWorkspaceUserFilter = {
  /** Aggregates across related `WorkspaceUser` match the filter criteria. */
  aggregates?: InputMaybe<WorkspaceUserAggregatesFilter>;
  /** Every related `WorkspaceUser` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<WorkspaceUserFilter>;
  /** No related `WorkspaceUser` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<WorkspaceUserFilter>;
  /** Some related `WorkspaceUser` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<WorkspaceUserFilter>;
};

export type WorkspaceUser = Node & {
  __typename?: 'WorkspaceUser';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  role: WorkspaceRole;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `User` that is related to this `WorkspaceUser`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
  /** Reads a single `Workspace` that is related to this `WorkspaceUser`. */
  workspace?: Maybe<Workspace>;
  workspaceId: Scalars['UUID']['output'];
};

export type WorkspaceUserAggregates = {
  __typename?: 'WorkspaceUserAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<WorkspaceUserDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `WorkspaceUser` object types. */
export type WorkspaceUserAggregatesFilter = {
  /** Distinct count aggregate over matching `WorkspaceUser` objects. */
  distinctCount?: InputMaybe<WorkspaceUserDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `WorkspaceUser` object to be included within the aggregate. */
  filter?: InputMaybe<WorkspaceUserFilter>;
};

/**
 * A condition to be used against `WorkspaceUser` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type WorkspaceUserCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `role` field. */
  role?: InputMaybe<WorkspaceRole>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `workspaceId` field. */
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `WorkspaceUser` values. */
export type WorkspaceUserConnection = {
  __typename?: 'WorkspaceUserConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<WorkspaceUserAggregates>;
  /** A list of edges which contains the `WorkspaceUser` and cursor to aid in pagination. */
  edges: Array<WorkspaceUserEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<WorkspaceUserAggregates>>;
  /** A list of `WorkspaceUser` objects. */
  nodes: Array<WorkspaceUser>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `WorkspaceUser` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `WorkspaceUser` values. */
export type WorkspaceUserConnectionGroupedAggregatesArgs = {
  groupBy: Array<WorkspaceUserGroupBy>;
  having?: InputMaybe<WorkspaceUserHavingInput>;
};

export type WorkspaceUserDistinctCountAggregateFilter = {
  createdAt?: InputMaybe<BigIntFilter>;
  role?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  userId?: InputMaybe<BigIntFilter>;
  workspaceId?: InputMaybe<BigIntFilter>;
};

export type WorkspaceUserDistinctCountAggregates = {
  __typename?: 'WorkspaceUserDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of role across the matching connection */
  role?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of userId across the matching connection */
  userId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of workspaceId across the matching connection */
  workspaceId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `WorkspaceUser` edge in the connection. */
export type WorkspaceUserEdge = {
  __typename?: 'WorkspaceUserEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `WorkspaceUser` at the end of the edge. */
  node: WorkspaceUser;
};

/** A filter to be used against `WorkspaceUser` object types. All fields are combined with a logical ‘and.’ */
export type WorkspaceUserFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<WorkspaceUserFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<WorkspaceUserFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<WorkspaceUserFilter>>;
  /** Filter by the object’s `role` field. */
  role?: InputMaybe<WorkspaceRoleFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `workspace` relation. */
  workspace?: InputMaybe<WorkspaceFilter>;
  /** Filter by the object’s `workspaceId` field. */
  workspaceId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `WorkspaceUser` for usage during aggregation. */
export enum WorkspaceUserGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Role = 'ROLE',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  UserId = 'USER_ID',
  WorkspaceId = 'WORKSPACE_ID'
}

export type WorkspaceUserHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceUserHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `WorkspaceUser` aggregates. */
export type WorkspaceUserHavingInput = {
  AND?: InputMaybe<Array<WorkspaceUserHavingInput>>;
  OR?: InputMaybe<Array<WorkspaceUserHavingInput>>;
  average?: InputMaybe<WorkspaceUserHavingAverageInput>;
  distinctCount?: InputMaybe<WorkspaceUserHavingDistinctCountInput>;
  max?: InputMaybe<WorkspaceUserHavingMaxInput>;
  min?: InputMaybe<WorkspaceUserHavingMinInput>;
  stddevPopulation?: InputMaybe<WorkspaceUserHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<WorkspaceUserHavingStddevSampleInput>;
  sum?: InputMaybe<WorkspaceUserHavingSumInput>;
  variancePopulation?: InputMaybe<WorkspaceUserHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<WorkspaceUserHavingVarianceSampleInput>;
};

export type WorkspaceUserHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceUserHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceUserHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceUserHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceUserHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceUserHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkspaceUserHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `WorkspaceUser` */
export type WorkspaceUserInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  role?: InputMaybe<WorkspaceRole>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId: Scalars['UUID']['input'];
  workspaceId: Scalars['UUID']['input'];
};

/** Methods to use when ordering `WorkspaceUser`. */
export enum WorkspaceUserOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  WorkspaceIdAsc = 'WORKSPACE_ID_ASC',
  WorkspaceIdDesc = 'WORKSPACE_ID_DESC'
}

/** Represents an update to a `WorkspaceUser`. Fields that are set will be updated. */
export type WorkspaceUserPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  role?: InputMaybe<WorkspaceRole>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

export type _DrizzleMigration = Node & {
  __typename?: '_DrizzleMigration';
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  hash: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  rowId: Scalars['Int']['output'];
};

export type _DrizzleMigrationAggregates = {
  __typename?: '_DrizzleMigrationAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<_DrizzleMigrationAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<_DrizzleMigrationDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<_DrizzleMigrationMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<_DrizzleMigrationMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<_DrizzleMigrationStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<_DrizzleMigrationStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<_DrizzleMigrationSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<_DrizzleMigrationVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<_DrizzleMigrationVarianceSampleAggregates>;
};

export type _DrizzleMigrationAverageAggregates = {
  __typename?: '_DrizzleMigrationAverageAggregates';
  /** Mean average of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `_DrizzleMigration` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type _DrizzleMigrationCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  /** Checks for equality with the object’s `hash` field. */
  hash?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `_DrizzleMigration` values. */
export type _DrizzleMigrationConnection = {
  __typename?: '_DrizzleMigrationConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<_DrizzleMigrationAggregates>;
  /** A list of edges which contains the `_DrizzleMigration` and cursor to aid in pagination. */
  edges: Array<_DrizzleMigrationEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<_DrizzleMigrationAggregates>>;
  /** A list of `_DrizzleMigration` objects. */
  nodes: Array<_DrizzleMigration>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `_DrizzleMigration` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `_DrizzleMigration` values. */
export type _DrizzleMigrationConnectionGroupedAggregatesArgs = {
  groupBy: Array<_DrizzleMigrationGroupBy>;
  having?: InputMaybe<_DrizzleMigrationHavingInput>;
};

export type _DrizzleMigrationDistinctCountAggregates = {
  __typename?: '_DrizzleMigrationDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of hash across the matching connection */
  hash?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `_DrizzleMigration` edge in the connection. */
export type _DrizzleMigrationEdge = {
  __typename?: '_DrizzleMigrationEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `_DrizzleMigration` at the end of the edge. */
  node: _DrizzleMigration;
};

/** A filter to be used against `_DrizzleMigration` object types. All fields are combined with a logical ‘and.’ */
export type _DrizzleMigrationFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<_DrizzleMigrationFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `hash` field. */
  hash?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<_DrizzleMigrationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<_DrizzleMigrationFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<IntFilter>;
};

/** Grouping methods for `_DrizzleMigration` for usage during aggregation. */
export enum _DrizzleMigrationGroupBy {
  CreatedAt = 'CREATED_AT',
  Hash = 'HASH'
}

export type _DrizzleMigrationHavingAverageInput = {
  createdAt?: InputMaybe<HavingBigintFilter>;
  rowId?: InputMaybe<HavingIntFilter>;
};

export type _DrizzleMigrationHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingBigintFilter>;
  rowId?: InputMaybe<HavingIntFilter>;
};

/** Conditions for `_DrizzleMigration` aggregates. */
export type _DrizzleMigrationHavingInput = {
  AND?: InputMaybe<Array<_DrizzleMigrationHavingInput>>;
  OR?: InputMaybe<Array<_DrizzleMigrationHavingInput>>;
  average?: InputMaybe<_DrizzleMigrationHavingAverageInput>;
  distinctCount?: InputMaybe<_DrizzleMigrationHavingDistinctCountInput>;
  max?: InputMaybe<_DrizzleMigrationHavingMaxInput>;
  min?: InputMaybe<_DrizzleMigrationHavingMinInput>;
  stddevPopulation?: InputMaybe<_DrizzleMigrationHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<_DrizzleMigrationHavingStddevSampleInput>;
  sum?: InputMaybe<_DrizzleMigrationHavingSumInput>;
  variancePopulation?: InputMaybe<_DrizzleMigrationHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<_DrizzleMigrationHavingVarianceSampleInput>;
};

export type _DrizzleMigrationHavingMaxInput = {
  createdAt?: InputMaybe<HavingBigintFilter>;
  rowId?: InputMaybe<HavingIntFilter>;
};

export type _DrizzleMigrationHavingMinInput = {
  createdAt?: InputMaybe<HavingBigintFilter>;
  rowId?: InputMaybe<HavingIntFilter>;
};

export type _DrizzleMigrationHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingBigintFilter>;
  rowId?: InputMaybe<HavingIntFilter>;
};

export type _DrizzleMigrationHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingBigintFilter>;
  rowId?: InputMaybe<HavingIntFilter>;
};

export type _DrizzleMigrationHavingSumInput = {
  createdAt?: InputMaybe<HavingBigintFilter>;
  rowId?: InputMaybe<HavingIntFilter>;
};

export type _DrizzleMigrationHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingBigintFilter>;
  rowId?: InputMaybe<HavingIntFilter>;
};

export type _DrizzleMigrationHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingBigintFilter>;
  rowId?: InputMaybe<HavingIntFilter>;
};

/** An input for mutations affecting `_DrizzleMigration` */
export type _DrizzleMigrationInput = {
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  hash: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['Int']['input']>;
};

export type _DrizzleMigrationMaxAggregates = {
  __typename?: '_DrizzleMigrationMaxAggregates';
  /** Maximum of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Maximum of rowId across the matching connection */
  rowId?: Maybe<Scalars['Int']['output']>;
};

export type _DrizzleMigrationMinAggregates = {
  __typename?: '_DrizzleMigrationMinAggregates';
  /** Minimum of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Minimum of rowId across the matching connection */
  rowId?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `_DrizzleMigration`. */
export enum _DrizzleMigrationOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  HashAsc = 'HASH_ASC',
  HashDesc = 'HASH_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Represents an update to a `_DrizzleMigration`. Fields that are set will be updated. */
export type _DrizzleMigrationPatch = {
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['Int']['input']>;
};

export type _DrizzleMigrationStddevPopulationAggregates = {
  __typename?: '_DrizzleMigrationStddevPopulationAggregates';
  /** Population standard deviation of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigFloat']['output']>;
};

export type _DrizzleMigrationStddevSampleAggregates = {
  __typename?: '_DrizzleMigrationStddevSampleAggregates';
  /** Sample standard deviation of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigFloat']['output']>;
};

export type _DrizzleMigrationSumAggregates = {
  __typename?: '_DrizzleMigrationSumAggregates';
  /** Sum of createdAt across the matching connection */
  createdAt: Scalars['BigFloat']['output'];
  /** Sum of rowId across the matching connection */
  rowId: Scalars['BigInt']['output'];
};

export type _DrizzleMigrationVariancePopulationAggregates = {
  __typename?: '_DrizzleMigrationVariancePopulationAggregates';
  /** Population variance of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigFloat']['output']>;
};

export type _DrizzleMigrationVarianceSampleAggregates = {
  __typename?: '_DrizzleMigrationVarianceSampleAggregates';
  /** Sample variance of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigFloat']['output']>;
};

export type CreateInvitationMutationVariables = Exact<{
  input: CreateInvitationInput;
}>;


export type CreateInvitationMutation = { __typename?: 'Mutation', createInvitation?: { __typename?: 'CreateInvitationPayload', invitation?: { __typename?: 'Invitation', rowId: string } | null } | null };

export type DeleteInvitationMutationVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type DeleteInvitationMutation = { __typename?: 'Mutation', deleteInvitation?: { __typename?: 'DeleteInvitationPayload', invitation?: { __typename?: 'Invitation', rowId: string } | null } | null };

export type CreateWorkflowMutationVariables = Exact<{
  input: CreateWorkflowInput;
}>;


export type CreateWorkflowMutation = { __typename?: 'Mutation', createWorkflow?: { __typename?: 'CreateWorkflowPayload', workflow?: { __typename?: 'Workflow', rowId: string, workspaceId: string, name: string, description?: string | null, definition: Record<string, unknown>, cronExpression?: string | null, isActive: boolean, createdAt?: Date | null } | null } | null };

export type DeleteWorkflowMutationVariables = Exact<{
  input: DeleteWorkflowInput;
}>;


export type DeleteWorkflowMutation = { __typename?: 'Mutation', deleteWorkflow?: { __typename?: 'DeleteWorkflowPayload', workflow?: { __typename?: 'Workflow', rowId: string } | null } | null };

export type UpdateWorkflowMutationVariables = Exact<{
  input: UpdateWorkflowInput;
}>;


export type UpdateWorkflowMutation = { __typename?: 'Mutation', updateWorkflow?: { __typename?: 'UpdateWorkflowPayload', workflow?: { __typename?: 'Workflow', rowId: string, workspaceId: string, name: string, description?: string | null, definition: Record<string, unknown>, cronExpression?: string | null, isActive: boolean, updatedAt?: Date | null } | null } | null };

export type CreateWorkspaceUserMutationVariables = Exact<{
  input: CreateWorkspaceUserInput;
}>;


export type CreateWorkspaceUserMutation = { __typename?: 'Mutation', createWorkspaceUser?: { __typename?: 'CreateWorkspaceUserPayload', workspaceUser?: { __typename?: 'WorkspaceUser', workspaceId: string, userId: string, role: WorkspaceRole } | null } | null };

export type DeleteWorkspaceUserMutationVariables = Exact<{
  userId: Scalars['UUID']['input'];
  workspaceId: Scalars['UUID']['input'];
}>;


export type DeleteWorkspaceUserMutation = { __typename?: 'Mutation', deleteWorkspaceUser?: { __typename?: 'DeleteWorkspaceUserPayload', clientMutationId?: string | null } | null };

export type UpdateWorkspaceUserMutationVariables = Exact<{
  input: UpdateWorkspaceUserInput;
}>;


export type UpdateWorkspaceUserMutation = { __typename?: 'Mutation', updateWorkspaceUser?: { __typename?: 'UpdateWorkspaceUserPayload', clientMutationId?: string | null } | null };

export type CreateWorkspaceMutationVariables = Exact<{
  input: CreateWorkspaceInput;
}>;


export type CreateWorkspaceMutation = { __typename?: 'Mutation', createWorkspace?: { __typename?: 'CreateWorkspacePayload', workspace?: { __typename?: 'Workspace', rowId: string, name: string, slug: string, tier: Tier } | null } | null };

export type DeleteWorkspaceMutationVariables = Exact<{
  input: DeleteWorkspaceInput;
}>;


export type DeleteWorkspaceMutation = { __typename?: 'Mutation', deleteWorkspace?: { __typename?: 'DeleteWorkspacePayload', workspace?: { __typename?: 'Workspace', rowId: string } | null } | null };

export type UpdateWorkspaceMutationVariables = Exact<{
  input: UpdateWorkspaceInput;
}>;


export type UpdateWorkspaceMutation = { __typename?: 'Mutation', updateWorkspace?: { __typename?: 'UpdateWorkspacePayload', workspace?: { __typename?: 'Workspace', rowId: string, name: string, slug: string, tier: Tier } | null } | null };

export type IntegrationsQueryVariables = Exact<{
  workspaceId: Scalars['UUID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type IntegrationsQuery = { __typename?: 'Query', integrations?: { __typename?: 'IntegrationConnection', totalCount: number, nodes: Array<{ __typename?: 'Integration', rowId: string, name: string, type: string, isEnabled: boolean, createdAt?: Date | null, updatedAt?: Date | null }> } | null };

export type InvitationsQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type InvitationsQuery = { __typename?: 'Query', invitations?: { __typename?: 'InvitationConnection', nodes: Array<{ __typename?: 'Invitation', rowId: string, email: string, role: WorkspaceRole, createdAt?: Date | null, workspace?: { __typename?: 'Workspace', rowId: string, name: string, slug: string, workspaceUsers: { __typename?: 'WorkspaceUserConnection', totalCount: number } } | null }> } | null };

export type PluginsQueryVariables = Exact<{
  workspaceId: Scalars['UUID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PluginsQuery = { __typename?: 'Query', plugins?: { __typename?: 'PluginConnection', totalCount: number, nodes: Array<{ __typename?: 'Plugin', rowId: string, name: string, version: string, manifest: Record<string, unknown>, wasmUrl: string, isEnabled: boolean, isVerified: boolean, createdAt?: Date | null, updatedAt?: Date | null }> } | null };

export type UserByIdentityProviderIdQueryVariables = Exact<{
  identityProviderId: Scalars['UUID']['input'];
}>;


export type UserByIdentityProviderIdQuery = { __typename?: 'Query', userByIdentityProviderId?: { __typename?: 'User', rowId: string, email: string, name: string, avatarUrl?: string | null, createdAt?: Date | null } | null };

export type WorkflowQueryVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type WorkflowQuery = { __typename?: 'Query', workflow?: { __typename?: 'Workflow', rowId: string, workspaceId: string, name: string, description?: string | null, definition: Record<string, unknown>, cronExpression?: string | null, webhookSecret?: string | null, isActive: boolean, createdAt?: Date | null, updatedAt?: Date | null, workspace?: { __typename?: 'Workspace', rowId: string, name: string, slug: string, tier: Tier } | null, workflowRuns: { __typename?: 'WorkflowRunConnection', totalCount: number, nodes: Array<{ __typename?: 'WorkflowRun', rowId: string, engineWorkflowId: string, status: string, startedAt?: Date | null, completedAt?: Date | null, error?: string | null, createdAt?: Date | null, workflowStepLogs: { __typename?: 'WorkflowStepLogConnection', nodes: Array<{ __typename?: 'WorkflowStepLog', rowId: string, stepId: string, stepType: string, status: string, input?: Record<string, unknown> | null, output?: Record<string, unknown> | null, error?: string | null, startedAt?: Date | null, completedAt?: Date | null }> } }> } } | null };

export type WorkflowsQueryVariables = Exact<{
  workspaceId: Scalars['UUID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type WorkflowsQuery = { __typename?: 'Query', workflows?: { __typename?: 'WorkflowConnection', totalCount: number, nodes: Array<{ __typename?: 'Workflow', rowId: string, name: string, description?: string | null, cronExpression?: string | null, isActive: boolean, createdAt?: Date | null, updatedAt?: Date | null, workflowRuns: { __typename?: 'WorkflowRunConnection', nodes: Array<{ __typename?: 'WorkflowRun', rowId: string, status: string, createdAt?: Date | null }> } }> } | null };

export type WorkspaceUsersQueryVariables = Exact<{
  workspaceId: Scalars['UUID']['input'];
  filter?: InputMaybe<WorkspaceUserFilter>;
  orderBy?: InputMaybe<Array<WorkspaceUserOrderBy> | WorkspaceUserOrderBy>;
}>;


export type WorkspaceUsersQuery = { __typename?: 'Query', workspaceUsers?: { __typename?: 'WorkspaceUserConnection', nodes: Array<{ __typename?: 'WorkspaceUser', role: WorkspaceRole, createdAt?: Date | null, user?: { __typename?: 'User', rowId: string, name: string, email: string, avatarUrl?: string | null } | null }> } | null };

export type WorkspaceQueryVariables = Exact<{
  rowId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
}>;


export type WorkspaceQuery = { __typename?: 'Query', workspace?: { __typename?: 'Workspace', rowId: string, name: string, slug: string, tier: Tier, subscriptionId?: string | null, workspaceUsers: { __typename?: 'WorkspaceUserConnection', nodes: Array<{ __typename?: 'WorkspaceUser', role: WorkspaceRole }> }, workflows: { __typename?: 'WorkflowConnection', totalCount: number, nodes: Array<{ __typename?: 'Workflow', rowId: string, name: string, isActive: boolean, createdAt?: Date | null, updatedAt?: Date | null }> }, integrations: { __typename?: 'IntegrationConnection', totalCount: number, nodes: Array<{ __typename?: 'Integration', rowId: string, name: string, type: string, isEnabled: boolean }> }, plugins: { __typename?: 'PluginConnection', totalCount: number, nodes: Array<{ __typename?: 'Plugin', rowId: string, name: string, version: string, isEnabled: boolean }> } } | null };

export type WorkspaceBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  userId: Scalars['UUID']['input'];
}>;


export type WorkspaceBySlugQuery = { __typename?: 'Query', workspaceBySlug?: { __typename?: 'Workspace', rowId: string, name: string, slug: string, tier: Tier, subscriptionId?: string | null, workspaceUsers: { __typename?: 'WorkspaceUserConnection', nodes: Array<{ __typename?: 'WorkspaceUser', role: WorkspaceRole }> }, workflows: { __typename?: 'WorkflowConnection', totalCount: number, nodes: Array<{ __typename?: 'Workflow', rowId: string, name: string, isActive: boolean, createdAt?: Date | null, updatedAt?: Date | null }> }, integrations: { __typename?: 'IntegrationConnection', totalCount: number, nodes: Array<{ __typename?: 'Integration', rowId: string, name: string, type: string, isEnabled: boolean }> }, plugins: { __typename?: 'PluginConnection', totalCount: number, nodes: Array<{ __typename?: 'Plugin', rowId: string, name: string, version: string, isEnabled: boolean }> } } | null };

export type WorkspacesQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type WorkspacesQuery = { __typename?: 'Query', workspaces?: { __typename?: 'WorkspaceConnection', nodes: Array<{ __typename?: 'Workspace', rowId: string, name: string, slug: string, subscriptionId?: string | null, tier: Tier, workspaceUsers: { __typename?: 'WorkspaceUserConnection', totalCount: number }, currentUser: { __typename?: 'WorkspaceUserConnection', nodes: Array<{ __typename?: 'WorkspaceUser', role: WorkspaceRole }> } }> } | null };



export const CreateInvitationDocument = `
    mutation CreateInvitation($input: CreateInvitationInput!) {
  createInvitation(input: $input) {
    invitation {
      rowId
    }
  }
}
    `;

export const useCreateInvitationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateInvitationMutation, TError, CreateInvitationMutationVariables, TContext>) => {
    
    return useMutation<CreateInvitationMutation, TError, CreateInvitationMutationVariables, TContext>(
      {
    mutationKey: ['CreateInvitation'],
    mutationFn: (variables?: CreateInvitationMutationVariables) => graphqlFetch<CreateInvitationMutation, CreateInvitationMutationVariables>(CreateInvitationDocument, variables)(),
    ...options
  }
    )};

useCreateInvitationMutation.getKey = () => ['CreateInvitation'];


useCreateInvitationMutation.fetcher = (variables: CreateInvitationMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateInvitationMutation, CreateInvitationMutationVariables>(CreateInvitationDocument, variables, options);

export const DeleteInvitationDocument = `
    mutation DeleteInvitation($rowId: UUID!) {
  deleteInvitation(input: {rowId: $rowId}) {
    invitation {
      rowId
    }
  }
}
    `;

export const useDeleteInvitationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteInvitationMutation, TError, DeleteInvitationMutationVariables, TContext>) => {
    
    return useMutation<DeleteInvitationMutation, TError, DeleteInvitationMutationVariables, TContext>(
      {
    mutationKey: ['DeleteInvitation'],
    mutationFn: (variables?: DeleteInvitationMutationVariables) => graphqlFetch<DeleteInvitationMutation, DeleteInvitationMutationVariables>(DeleteInvitationDocument, variables)(),
    ...options
  }
    )};

useDeleteInvitationMutation.getKey = () => ['DeleteInvitation'];


useDeleteInvitationMutation.fetcher = (variables: DeleteInvitationMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteInvitationMutation, DeleteInvitationMutationVariables>(DeleteInvitationDocument, variables, options);

export const CreateWorkflowDocument = `
    mutation CreateWorkflow($input: CreateWorkflowInput!) {
  createWorkflow(input: $input) {
    workflow {
      rowId
      workspaceId
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

export const DeleteWorkflowDocument = `
    mutation DeleteWorkflow($input: DeleteWorkflowInput!) {
  deleteWorkflow(input: $input) {
    workflow {
      rowId
    }
  }
}
    `;

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

export const UpdateWorkflowDocument = `
    mutation UpdateWorkflow($input: UpdateWorkflowInput!) {
  updateWorkflow(input: $input) {
    workflow {
      rowId
      workspaceId
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

export const CreateWorkspaceUserDocument = `
    mutation CreateWorkspaceUser($input: CreateWorkspaceUserInput!) {
  createWorkspaceUser(input: $input) {
    workspaceUser {
      workspaceId
      userId
      role
    }
  }
}
    `;

export const useCreateWorkspaceUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateWorkspaceUserMutation, TError, CreateWorkspaceUserMutationVariables, TContext>) => {
    
    return useMutation<CreateWorkspaceUserMutation, TError, CreateWorkspaceUserMutationVariables, TContext>(
      {
    mutationKey: ['CreateWorkspaceUser'],
    mutationFn: (variables?: CreateWorkspaceUserMutationVariables) => graphqlFetch<CreateWorkspaceUserMutation, CreateWorkspaceUserMutationVariables>(CreateWorkspaceUserDocument, variables)(),
    ...options
  }
    )};

useCreateWorkspaceUserMutation.getKey = () => ['CreateWorkspaceUser'];


useCreateWorkspaceUserMutation.fetcher = (variables: CreateWorkspaceUserMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateWorkspaceUserMutation, CreateWorkspaceUserMutationVariables>(CreateWorkspaceUserDocument, variables, options);

export const DeleteWorkspaceUserDocument = `
    mutation DeleteWorkspaceUser($userId: UUID!, $workspaceId: UUID!) {
  deleteWorkspaceUser(input: {userId: $userId, workspaceId: $workspaceId}) {
    clientMutationId
  }
}
    `;

export const useDeleteWorkspaceUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteWorkspaceUserMutation, TError, DeleteWorkspaceUserMutationVariables, TContext>) => {
    
    return useMutation<DeleteWorkspaceUserMutation, TError, DeleteWorkspaceUserMutationVariables, TContext>(
      {
    mutationKey: ['DeleteWorkspaceUser'],
    mutationFn: (variables?: DeleteWorkspaceUserMutationVariables) => graphqlFetch<DeleteWorkspaceUserMutation, DeleteWorkspaceUserMutationVariables>(DeleteWorkspaceUserDocument, variables)(),
    ...options
  }
    )};

useDeleteWorkspaceUserMutation.getKey = () => ['DeleteWorkspaceUser'];


useDeleteWorkspaceUserMutation.fetcher = (variables: DeleteWorkspaceUserMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteWorkspaceUserMutation, DeleteWorkspaceUserMutationVariables>(DeleteWorkspaceUserDocument, variables, options);

export const UpdateWorkspaceUserDocument = `
    mutation UpdateWorkspaceUser($input: UpdateWorkspaceUserInput!) {
  updateWorkspaceUser(input: $input) {
    clientMutationId
  }
}
    `;

export const useUpdateWorkspaceUserMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateWorkspaceUserMutation, TError, UpdateWorkspaceUserMutationVariables, TContext>) => {
    
    return useMutation<UpdateWorkspaceUserMutation, TError, UpdateWorkspaceUserMutationVariables, TContext>(
      {
    mutationKey: ['UpdateWorkspaceUser'],
    mutationFn: (variables?: UpdateWorkspaceUserMutationVariables) => graphqlFetch<UpdateWorkspaceUserMutation, UpdateWorkspaceUserMutationVariables>(UpdateWorkspaceUserDocument, variables)(),
    ...options
  }
    )};

useUpdateWorkspaceUserMutation.getKey = () => ['UpdateWorkspaceUser'];


useUpdateWorkspaceUserMutation.fetcher = (variables: UpdateWorkspaceUserMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdateWorkspaceUserMutation, UpdateWorkspaceUserMutationVariables>(UpdateWorkspaceUserDocument, variables, options);

export const CreateWorkspaceDocument = `
    mutation CreateWorkspace($input: CreateWorkspaceInput!) {
  createWorkspace(input: $input) {
    workspace {
      rowId
      name
      slug
      tier
    }
  }
}
    `;

export const useCreateWorkspaceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateWorkspaceMutation, TError, CreateWorkspaceMutationVariables, TContext>) => {
    
    return useMutation<CreateWorkspaceMutation, TError, CreateWorkspaceMutationVariables, TContext>(
      {
    mutationKey: ['CreateWorkspace'],
    mutationFn: (variables?: CreateWorkspaceMutationVariables) => graphqlFetch<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>(CreateWorkspaceDocument, variables)(),
    ...options
  }
    )};

useCreateWorkspaceMutation.getKey = () => ['CreateWorkspace'];


useCreateWorkspaceMutation.fetcher = (variables: CreateWorkspaceMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>(CreateWorkspaceDocument, variables, options);

export const DeleteWorkspaceDocument = `
    mutation DeleteWorkspace($input: DeleteWorkspaceInput!) {
  deleteWorkspace(input: $input) {
    workspace {
      rowId
    }
  }
}
    `;

export const useDeleteWorkspaceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteWorkspaceMutation, TError, DeleteWorkspaceMutationVariables, TContext>) => {
    
    return useMutation<DeleteWorkspaceMutation, TError, DeleteWorkspaceMutationVariables, TContext>(
      {
    mutationKey: ['DeleteWorkspace'],
    mutationFn: (variables?: DeleteWorkspaceMutationVariables) => graphqlFetch<DeleteWorkspaceMutation, DeleteWorkspaceMutationVariables>(DeleteWorkspaceDocument, variables)(),
    ...options
  }
    )};

useDeleteWorkspaceMutation.getKey = () => ['DeleteWorkspace'];


useDeleteWorkspaceMutation.fetcher = (variables: DeleteWorkspaceMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteWorkspaceMutation, DeleteWorkspaceMutationVariables>(DeleteWorkspaceDocument, variables, options);

export const UpdateWorkspaceDocument = `
    mutation UpdateWorkspace($input: UpdateWorkspaceInput!) {
  updateWorkspace(input: $input) {
    workspace {
      rowId
      name
      slug
      tier
    }
  }
}
    `;

export const useUpdateWorkspaceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateWorkspaceMutation, TError, UpdateWorkspaceMutationVariables, TContext>) => {
    
    return useMutation<UpdateWorkspaceMutation, TError, UpdateWorkspaceMutationVariables, TContext>(
      {
    mutationKey: ['UpdateWorkspace'],
    mutationFn: (variables?: UpdateWorkspaceMutationVariables) => graphqlFetch<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>(UpdateWorkspaceDocument, variables)(),
    ...options
  }
    )};

useUpdateWorkspaceMutation.getKey = () => ['UpdateWorkspace'];


useUpdateWorkspaceMutation.fetcher = (variables: UpdateWorkspaceMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdateWorkspaceMutation, UpdateWorkspaceMutationVariables>(UpdateWorkspaceDocument, variables, options);

export const IntegrationsDocument = `
    query Integrations($workspaceId: UUID!, $limit: Int) {
  integrations(
    condition: {workspaceId: $workspaceId}
    orderBy: NAME_ASC
    first: $limit
  ) {
    nodes {
      rowId
      name
      type
      isEnabled
      createdAt
      updatedAt
    }
    totalCount
  }
}
    `;

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
    queryKey: ['IntegrationsSuspense', variables],
    queryFn: graphqlFetch<IntegrationsQuery, IntegrationsQueryVariables>(IntegrationsDocument, variables),
    ...options
  }
    )};

useSuspenseIntegrationsQuery.getKey = (variables: IntegrationsQueryVariables) => ['IntegrationsSuspense', variables];

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
      queryKey: optionsQueryKey ?? ['Integrations.infiniteSuspense', variables],
      queryFn: (metaData) => graphqlFetch<IntegrationsQuery, IntegrationsQueryVariables>(IntegrationsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteIntegrationsQuery.getKey = (variables: IntegrationsQueryVariables) => ['Integrations.infiniteSuspense', variables];


useIntegrationsQuery.fetcher = (variables: IntegrationsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<IntegrationsQuery, IntegrationsQueryVariables>(IntegrationsDocument, variables, options);

export const InvitationsDocument = `
    query Invitations($email: String) {
  invitations(condition: {email: $email}) {
    nodes {
      rowId
      email
      role
      createdAt
      workspace {
        rowId
        name
        slug
        workspaceUsers {
          totalCount
        }
      }
    }
  }
}
    `;

export const useInvitationsQuery = <
      TData = InvitationsQuery,
      TError = unknown
    >(
      variables?: InvitationsQueryVariables,
      options?: Omit<UseQueryOptions<InvitationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<InvitationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<InvitationsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Invitations'] : ['Invitations', variables],
    queryFn: graphqlFetch<InvitationsQuery, InvitationsQueryVariables>(InvitationsDocument, variables),
    ...options
  }
    )};

useInvitationsQuery.getKey = (variables?: InvitationsQueryVariables) => variables === undefined ? ['Invitations'] : ['Invitations', variables];

export const useSuspenseInvitationsQuery = <
      TData = InvitationsQuery,
      TError = unknown
    >(
      variables?: InvitationsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<InvitationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<InvitationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<InvitationsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['InvitationsSuspense'] : ['InvitationsSuspense', variables],
    queryFn: graphqlFetch<InvitationsQuery, InvitationsQueryVariables>(InvitationsDocument, variables),
    ...options
  }
    )};

useSuspenseInvitationsQuery.getKey = (variables?: InvitationsQueryVariables) => variables === undefined ? ['InvitationsSuspense'] : ['InvitationsSuspense', variables];

export const useInfiniteInvitationsQuery = <
      TData = InfiniteData<InvitationsQuery>,
      TError = unknown
    >(
      variables: InvitationsQueryVariables,
      options: Omit<UseInfiniteQueryOptions<InvitationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<InvitationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<InvitationsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['Invitations.infinite'] : ['Invitations.infinite', variables],
      queryFn: (metaData) => graphqlFetch<InvitationsQuery, InvitationsQueryVariables>(InvitationsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteInvitationsQuery.getKey = (variables?: InvitationsQueryVariables) => variables === undefined ? ['Invitations.infinite'] : ['Invitations.infinite', variables];

export const useSuspenseInfiniteInvitationsQuery = <
      TData = InfiniteData<InvitationsQuery>,
      TError = unknown
    >(
      variables: InvitationsQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<InvitationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<InvitationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<InvitationsQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['Invitations.infiniteSuspense'] : ['Invitations.infiniteSuspense', variables],
      queryFn: (metaData) => graphqlFetch<InvitationsQuery, InvitationsQueryVariables>(InvitationsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteInvitationsQuery.getKey = (variables?: InvitationsQueryVariables) => variables === undefined ? ['Invitations.infiniteSuspense'] : ['Invitations.infiniteSuspense', variables];


useInvitationsQuery.fetcher = (variables?: InvitationsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<InvitationsQuery, InvitationsQueryVariables>(InvitationsDocument, variables, options);

export const PluginsDocument = `
    query Plugins($workspaceId: UUID!, $limit: Int) {
  plugins(
    condition: {workspaceId: $workspaceId, isEnabled: true}
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
    queryKey: ['PluginsSuspense', variables],
    queryFn: graphqlFetch<PluginsQuery, PluginsQueryVariables>(PluginsDocument, variables),
    ...options
  }
    )};

useSuspensePluginsQuery.getKey = (variables: PluginsQueryVariables) => ['PluginsSuspense', variables];

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
      queryKey: optionsQueryKey ?? ['Plugins.infiniteSuspense', variables],
      queryFn: (metaData) => graphqlFetch<PluginsQuery, PluginsQueryVariables>(PluginsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfinitePluginsQuery.getKey = (variables: PluginsQueryVariables) => ['Plugins.infiniteSuspense', variables];


usePluginsQuery.fetcher = (variables: PluginsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<PluginsQuery, PluginsQueryVariables>(PluginsDocument, variables, options);

export const UserByIdentityProviderIdDocument = `
    query UserByIdentityProviderId($identityProviderId: UUID!) {
  userByIdentityProviderId(identityProviderId: $identityProviderId) {
    rowId
    email
    name
    avatarUrl
    createdAt
  }
}
    `;

export const useUserByIdentityProviderIdQuery = <
      TData = UserByIdentityProviderIdQuery,
      TError = unknown
    >(
      variables: UserByIdentityProviderIdQueryVariables,
      options?: Omit<UseQueryOptions<UserByIdentityProviderIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserByIdentityProviderIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserByIdentityProviderIdQuery, TError, TData>(
      {
    queryKey: ['UserByIdentityProviderId', variables],
    queryFn: graphqlFetch<UserByIdentityProviderIdQuery, UserByIdentityProviderIdQueryVariables>(UserByIdentityProviderIdDocument, variables),
    ...options
  }
    )};

useUserByIdentityProviderIdQuery.getKey = (variables: UserByIdentityProviderIdQueryVariables) => ['UserByIdentityProviderId', variables];

export const useSuspenseUserByIdentityProviderIdQuery = <
      TData = UserByIdentityProviderIdQuery,
      TError = unknown
    >(
      variables: UserByIdentityProviderIdQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<UserByIdentityProviderIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<UserByIdentityProviderIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<UserByIdentityProviderIdQuery, TError, TData>(
      {
    queryKey: ['UserByIdentityProviderIdSuspense', variables],
    queryFn: graphqlFetch<UserByIdentityProviderIdQuery, UserByIdentityProviderIdQueryVariables>(UserByIdentityProviderIdDocument, variables),
    ...options
  }
    )};

useSuspenseUserByIdentityProviderIdQuery.getKey = (variables: UserByIdentityProviderIdQueryVariables) => ['UserByIdentityProviderIdSuspense', variables];

export const useInfiniteUserByIdentityProviderIdQuery = <
      TData = InfiniteData<UserByIdentityProviderIdQuery>,
      TError = unknown
    >(
      variables: UserByIdentityProviderIdQueryVariables,
      options: Omit<UseInfiniteQueryOptions<UserByIdentityProviderIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<UserByIdentityProviderIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<UserByIdentityProviderIdQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['UserByIdentityProviderId.infinite', variables],
      queryFn: (metaData) => graphqlFetch<UserByIdentityProviderIdQuery, UserByIdentityProviderIdQueryVariables>(UserByIdentityProviderIdDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteUserByIdentityProviderIdQuery.getKey = (variables: UserByIdentityProviderIdQueryVariables) => ['UserByIdentityProviderId.infinite', variables];

export const useSuspenseInfiniteUserByIdentityProviderIdQuery = <
      TData = InfiniteData<UserByIdentityProviderIdQuery>,
      TError = unknown
    >(
      variables: UserByIdentityProviderIdQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<UserByIdentityProviderIdQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<UserByIdentityProviderIdQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<UserByIdentityProviderIdQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['UserByIdentityProviderId.infiniteSuspense', variables],
      queryFn: (metaData) => graphqlFetch<UserByIdentityProviderIdQuery, UserByIdentityProviderIdQueryVariables>(UserByIdentityProviderIdDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteUserByIdentityProviderIdQuery.getKey = (variables: UserByIdentityProviderIdQueryVariables) => ['UserByIdentityProviderId.infiniteSuspense', variables];


useUserByIdentityProviderIdQuery.fetcher = (variables: UserByIdentityProviderIdQueryVariables, options?: RequestInit['headers']) => graphqlFetch<UserByIdentityProviderIdQuery, UserByIdentityProviderIdQueryVariables>(UserByIdentityProviderIdDocument, variables, options);

export const WorkflowDocument = `
    query Workflow($rowId: UUID!) {
  workflow(rowId: $rowId) {
    rowId
    workspaceId
    name
    description
    definition
    cronExpression
    webhookSecret
    isActive
    createdAt
    updatedAt
    workspace {
      rowId
      name
      slug
      tier
    }
    workflowRuns(orderBy: CREATED_AT_DESC, first: 10) {
      nodes {
        rowId
        engineWorkflowId
        status
        startedAt
        completedAt
        error
        createdAt
        workflowStepLogs(orderBy: STARTED_AT_ASC) {
          nodes {
            rowId
            stepId
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
    queryKey: ['WorkflowSuspense', variables],
    queryFn: graphqlFetch<WorkflowQuery, WorkflowQueryVariables>(WorkflowDocument, variables),
    ...options
  }
    )};

useSuspenseWorkflowQuery.getKey = (variables: WorkflowQueryVariables) => ['WorkflowSuspense', variables];

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
      queryKey: optionsQueryKey ?? ['Workflow.infiniteSuspense', variables],
      queryFn: (metaData) => graphqlFetch<WorkflowQuery, WorkflowQueryVariables>(WorkflowDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteWorkflowQuery.getKey = (variables: WorkflowQueryVariables) => ['Workflow.infiniteSuspense', variables];


useWorkflowQuery.fetcher = (variables: WorkflowQueryVariables, options?: RequestInit['headers']) => graphqlFetch<WorkflowQuery, WorkflowQueryVariables>(WorkflowDocument, variables, options);

export const WorkflowsDocument = `
    query Workflows($workspaceId: UUID!, $limit: Int) {
  workflows(
    condition: {workspaceId: $workspaceId}
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
    queryKey: ['WorkflowsSuspense', variables],
    queryFn: graphqlFetch<WorkflowsQuery, WorkflowsQueryVariables>(WorkflowsDocument, variables),
    ...options
  }
    )};

useSuspenseWorkflowsQuery.getKey = (variables: WorkflowsQueryVariables) => ['WorkflowsSuspense', variables];

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
      queryKey: optionsQueryKey ?? ['Workflows.infiniteSuspense', variables],
      queryFn: (metaData) => graphqlFetch<WorkflowsQuery, WorkflowsQueryVariables>(WorkflowsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteWorkflowsQuery.getKey = (variables: WorkflowsQueryVariables) => ['Workflows.infiniteSuspense', variables];


useWorkflowsQuery.fetcher = (variables: WorkflowsQueryVariables, options?: RequestInit['headers']) => graphqlFetch<WorkflowsQuery, WorkflowsQueryVariables>(WorkflowsDocument, variables, options);

export const WorkspaceUsersDocument = `
    query WorkspaceUsers($workspaceId: UUID!, $filter: WorkspaceUserFilter, $orderBy: [WorkspaceUserOrderBy!] = [CREATED_AT_ASC]) {
  workspaceUsers(
    condition: {workspaceId: $workspaceId}
    filter: $filter
    orderBy: $orderBy
  ) {
    nodes {
      role
      createdAt
      user {
        rowId
        name
        email
        avatarUrl
      }
    }
  }
}
    `;

export const useWorkspaceUsersQuery = <
      TData = WorkspaceUsersQuery,
      TError = unknown
    >(
      variables: WorkspaceUsersQueryVariables,
      options?: Omit<UseQueryOptions<WorkspaceUsersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<WorkspaceUsersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<WorkspaceUsersQuery, TError, TData>(
      {
    queryKey: ['WorkspaceUsers', variables],
    queryFn: graphqlFetch<WorkspaceUsersQuery, WorkspaceUsersQueryVariables>(WorkspaceUsersDocument, variables),
    ...options
  }
    )};

useWorkspaceUsersQuery.getKey = (variables: WorkspaceUsersQueryVariables) => ['WorkspaceUsers', variables];

export const useSuspenseWorkspaceUsersQuery = <
      TData = WorkspaceUsersQuery,
      TError = unknown
    >(
      variables: WorkspaceUsersQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<WorkspaceUsersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<WorkspaceUsersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<WorkspaceUsersQuery, TError, TData>(
      {
    queryKey: ['WorkspaceUsersSuspense', variables],
    queryFn: graphqlFetch<WorkspaceUsersQuery, WorkspaceUsersQueryVariables>(WorkspaceUsersDocument, variables),
    ...options
  }
    )};

useSuspenseWorkspaceUsersQuery.getKey = (variables: WorkspaceUsersQueryVariables) => ['WorkspaceUsersSuspense', variables];

export const useInfiniteWorkspaceUsersQuery = <
      TData = InfiniteData<WorkspaceUsersQuery>,
      TError = unknown
    >(
      variables: WorkspaceUsersQueryVariables,
      options: Omit<UseInfiniteQueryOptions<WorkspaceUsersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<WorkspaceUsersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<WorkspaceUsersQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['WorkspaceUsers.infinite', variables],
      queryFn: (metaData) => graphqlFetch<WorkspaceUsersQuery, WorkspaceUsersQueryVariables>(WorkspaceUsersDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteWorkspaceUsersQuery.getKey = (variables: WorkspaceUsersQueryVariables) => ['WorkspaceUsers.infinite', variables];

export const useSuspenseInfiniteWorkspaceUsersQuery = <
      TData = InfiniteData<WorkspaceUsersQuery>,
      TError = unknown
    >(
      variables: WorkspaceUsersQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<WorkspaceUsersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<WorkspaceUsersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<WorkspaceUsersQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['WorkspaceUsers.infiniteSuspense', variables],
      queryFn: (metaData) => graphqlFetch<WorkspaceUsersQuery, WorkspaceUsersQueryVariables>(WorkspaceUsersDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteWorkspaceUsersQuery.getKey = (variables: WorkspaceUsersQueryVariables) => ['WorkspaceUsers.infiniteSuspense', variables];


useWorkspaceUsersQuery.fetcher = (variables: WorkspaceUsersQueryVariables, options?: RequestInit['headers']) => graphqlFetch<WorkspaceUsersQuery, WorkspaceUsersQueryVariables>(WorkspaceUsersDocument, variables, options);

export const WorkspaceDocument = `
    query Workspace($rowId: UUID!, $userId: UUID!) {
  workspace(rowId: $rowId) {
    rowId
    name
    slug
    tier
    subscriptionId
    workspaceUsers(condition: {userId: $userId}) {
      nodes {
        role
      }
    }
    workflows(orderBy: NAME_ASC) {
      totalCount
      nodes {
        rowId
        name
        isActive
        createdAt
        updatedAt
      }
    }
    integrations(orderBy: NAME_ASC) {
      totalCount
      nodes {
        rowId
        name
        type
        isEnabled
      }
    }
    plugins(orderBy: NAME_ASC) {
      totalCount
      nodes {
        rowId
        name
        version
        isEnabled
      }
    }
  }
}
    `;

export const useWorkspaceQuery = <
      TData = WorkspaceQuery,
      TError = unknown
    >(
      variables: WorkspaceQueryVariables,
      options?: Omit<UseQueryOptions<WorkspaceQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<WorkspaceQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<WorkspaceQuery, TError, TData>(
      {
    queryKey: ['Workspace', variables],
    queryFn: graphqlFetch<WorkspaceQuery, WorkspaceQueryVariables>(WorkspaceDocument, variables),
    ...options
  }
    )};

useWorkspaceQuery.getKey = (variables: WorkspaceQueryVariables) => ['Workspace', variables];

export const useSuspenseWorkspaceQuery = <
      TData = WorkspaceQuery,
      TError = unknown
    >(
      variables: WorkspaceQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<WorkspaceQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<WorkspaceQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<WorkspaceQuery, TError, TData>(
      {
    queryKey: ['WorkspaceSuspense', variables],
    queryFn: graphqlFetch<WorkspaceQuery, WorkspaceQueryVariables>(WorkspaceDocument, variables),
    ...options
  }
    )};

useSuspenseWorkspaceQuery.getKey = (variables: WorkspaceQueryVariables) => ['WorkspaceSuspense', variables];

export const useInfiniteWorkspaceQuery = <
      TData = InfiniteData<WorkspaceQuery>,
      TError = unknown
    >(
      variables: WorkspaceQueryVariables,
      options: Omit<UseInfiniteQueryOptions<WorkspaceQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<WorkspaceQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<WorkspaceQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Workspace.infinite', variables],
      queryFn: (metaData) => graphqlFetch<WorkspaceQuery, WorkspaceQueryVariables>(WorkspaceDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteWorkspaceQuery.getKey = (variables: WorkspaceQueryVariables) => ['Workspace.infinite', variables];

export const useSuspenseInfiniteWorkspaceQuery = <
      TData = InfiniteData<WorkspaceQuery>,
      TError = unknown
    >(
      variables: WorkspaceQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<WorkspaceQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<WorkspaceQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<WorkspaceQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Workspace.infiniteSuspense', variables],
      queryFn: (metaData) => graphqlFetch<WorkspaceQuery, WorkspaceQueryVariables>(WorkspaceDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteWorkspaceQuery.getKey = (variables: WorkspaceQueryVariables) => ['Workspace.infiniteSuspense', variables];


useWorkspaceQuery.fetcher = (variables: WorkspaceQueryVariables, options?: RequestInit['headers']) => graphqlFetch<WorkspaceQuery, WorkspaceQueryVariables>(WorkspaceDocument, variables, options);

export const WorkspaceBySlugDocument = `
    query WorkspaceBySlug($slug: String!, $userId: UUID!) {
  workspaceBySlug(slug: $slug) {
    rowId
    name
    slug
    tier
    subscriptionId
    workspaceUsers(condition: {userId: $userId}) {
      nodes {
        role
      }
    }
    workflows(orderBy: NAME_ASC) {
      totalCount
      nodes {
        rowId
        name
        isActive
        createdAt
        updatedAt
      }
    }
    integrations(orderBy: NAME_ASC) {
      totalCount
      nodes {
        rowId
        name
        type
        isEnabled
      }
    }
    plugins(orderBy: NAME_ASC) {
      totalCount
      nodes {
        rowId
        name
        version
        isEnabled
      }
    }
  }
}
    `;

export const useWorkspaceBySlugQuery = <
      TData = WorkspaceBySlugQuery,
      TError = unknown
    >(
      variables: WorkspaceBySlugQueryVariables,
      options?: Omit<UseQueryOptions<WorkspaceBySlugQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<WorkspaceBySlugQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<WorkspaceBySlugQuery, TError, TData>(
      {
    queryKey: ['WorkspaceBySlug', variables],
    queryFn: graphqlFetch<WorkspaceBySlugQuery, WorkspaceBySlugQueryVariables>(WorkspaceBySlugDocument, variables),
    ...options
  }
    )};

useWorkspaceBySlugQuery.getKey = (variables: WorkspaceBySlugQueryVariables) => ['WorkspaceBySlug', variables];

export const useSuspenseWorkspaceBySlugQuery = <
      TData = WorkspaceBySlugQuery,
      TError = unknown
    >(
      variables: WorkspaceBySlugQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<WorkspaceBySlugQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<WorkspaceBySlugQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<WorkspaceBySlugQuery, TError, TData>(
      {
    queryKey: ['WorkspaceBySlugSuspense', variables],
    queryFn: graphqlFetch<WorkspaceBySlugQuery, WorkspaceBySlugQueryVariables>(WorkspaceBySlugDocument, variables),
    ...options
  }
    )};

useSuspenseWorkspaceBySlugQuery.getKey = (variables: WorkspaceBySlugQueryVariables) => ['WorkspaceBySlugSuspense', variables];

export const useInfiniteWorkspaceBySlugQuery = <
      TData = InfiniteData<WorkspaceBySlugQuery>,
      TError = unknown
    >(
      variables: WorkspaceBySlugQueryVariables,
      options: Omit<UseInfiniteQueryOptions<WorkspaceBySlugQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<WorkspaceBySlugQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<WorkspaceBySlugQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['WorkspaceBySlug.infinite', variables],
      queryFn: (metaData) => graphqlFetch<WorkspaceBySlugQuery, WorkspaceBySlugQueryVariables>(WorkspaceBySlugDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteWorkspaceBySlugQuery.getKey = (variables: WorkspaceBySlugQueryVariables) => ['WorkspaceBySlug.infinite', variables];

export const useSuspenseInfiniteWorkspaceBySlugQuery = <
      TData = InfiniteData<WorkspaceBySlugQuery>,
      TError = unknown
    >(
      variables: WorkspaceBySlugQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<WorkspaceBySlugQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<WorkspaceBySlugQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<WorkspaceBySlugQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['WorkspaceBySlug.infiniteSuspense', variables],
      queryFn: (metaData) => graphqlFetch<WorkspaceBySlugQuery, WorkspaceBySlugQueryVariables>(WorkspaceBySlugDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteWorkspaceBySlugQuery.getKey = (variables: WorkspaceBySlugQueryVariables) => ['WorkspaceBySlug.infiniteSuspense', variables];


useWorkspaceBySlugQuery.fetcher = (variables: WorkspaceBySlugQueryVariables, options?: RequestInit['headers']) => graphqlFetch<WorkspaceBySlugQuery, WorkspaceBySlugQueryVariables>(WorkspaceBySlugDocument, variables, options);

export const WorkspacesDocument = `
    query Workspaces($userId: UUID!, $limit: Int) {
  workspaces(
    filter: {workspaceUsers: {some: {userId: {equalTo: $userId}}}}
    orderBy: NAME_ASC
    first: $limit
  ) {
    nodes {
      rowId
      name
      slug
      subscriptionId
      tier
      workspaceUsers {
        totalCount
      }
      currentUser: workspaceUsers(condition: {userId: $userId}) {
        nodes {
          role
        }
      }
    }
  }
}
    `;

export const useWorkspacesQuery = <
      TData = WorkspacesQuery,
      TError = unknown
    >(
      variables: WorkspacesQueryVariables,
      options?: Omit<UseQueryOptions<WorkspacesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<WorkspacesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<WorkspacesQuery, TError, TData>(
      {
    queryKey: ['Workspaces', variables],
    queryFn: graphqlFetch<WorkspacesQuery, WorkspacesQueryVariables>(WorkspacesDocument, variables),
    ...options
  }
    )};

useWorkspacesQuery.getKey = (variables: WorkspacesQueryVariables) => ['Workspaces', variables];

export const useSuspenseWorkspacesQuery = <
      TData = WorkspacesQuery,
      TError = unknown
    >(
      variables: WorkspacesQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<WorkspacesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<WorkspacesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<WorkspacesQuery, TError, TData>(
      {
    queryKey: ['WorkspacesSuspense', variables],
    queryFn: graphqlFetch<WorkspacesQuery, WorkspacesQueryVariables>(WorkspacesDocument, variables),
    ...options
  }
    )};

useSuspenseWorkspacesQuery.getKey = (variables: WorkspacesQueryVariables) => ['WorkspacesSuspense', variables];

export const useInfiniteWorkspacesQuery = <
      TData = InfiniteData<WorkspacesQuery>,
      TError = unknown
    >(
      variables: WorkspacesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<WorkspacesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<WorkspacesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<WorkspacesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Workspaces.infinite', variables],
      queryFn: (metaData) => graphqlFetch<WorkspacesQuery, WorkspacesQueryVariables>(WorkspacesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteWorkspacesQuery.getKey = (variables: WorkspacesQueryVariables) => ['Workspaces.infinite', variables];

export const useSuspenseInfiniteWorkspacesQuery = <
      TData = InfiniteData<WorkspacesQuery>,
      TError = unknown
    >(
      variables: WorkspacesQueryVariables,
      options: Omit<UseSuspenseInfiniteQueryOptions<WorkspacesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseInfiniteQueryOptions<WorkspacesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseInfiniteQuery<WorkspacesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Workspaces.infiniteSuspense', variables],
      queryFn: (metaData) => graphqlFetch<WorkspacesQuery, WorkspacesQueryVariables>(WorkspacesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useSuspenseInfiniteWorkspacesQuery.getKey = (variables: WorkspacesQueryVariables) => ['Workspaces.infiniteSuspense', variables];


useWorkspacesQuery.fetcher = (variables: WorkspacesQueryVariables, options?: RequestInit['headers']) => graphqlFetch<WorkspacesQuery, WorkspacesQueryVariables>(WorkspacesDocument, variables, options);
