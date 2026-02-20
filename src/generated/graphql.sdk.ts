// @ts-nocheck
import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
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

/** A filter to be used against BigFloat fields. All fields are combined with a logical ‘and.’ */
export type BigFloatFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['BigFloat']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
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

/** All input for the create `EventRoutingRule` mutation. */
export type CreateEventRoutingRuleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `EventRoutingRule` to be created by this mutation. */
  eventRoutingRule: EventRoutingRuleInput;
};

/** The output of our create `EventRoutingRule` mutation. */
export type CreateEventRoutingRulePayload = {
  __typename?: 'CreateEventRoutingRulePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `EventRoutingRule` that was created by this mutation. */
  eventRoutingRule?: Maybe<EventRoutingRule>;
  /** An edge for our `EventRoutingRule`. May be used by Relay 1. */
  eventRoutingRuleEdge?: Maybe<EventRoutingRuleEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `EventRoutingRule` mutation. */
export type CreateEventRoutingRulePayloadEventRoutingRuleEdgeArgs = {
  orderBy?: Array<EventRoutingRuleOrderBy>;
};

/** All input for the create `IntegrationDefinition` mutation. */
export type CreateIntegrationDefinitionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `IntegrationDefinition` to be created by this mutation. */
  integrationDefinition: IntegrationDefinitionInput;
};

/** The output of our create `IntegrationDefinition` mutation. */
export type CreateIntegrationDefinitionPayload = {
  __typename?: 'CreateIntegrationDefinitionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `IntegrationDefinition` that was created by this mutation. */
  integrationDefinition?: Maybe<IntegrationDefinition>;
  /** An edge for our `IntegrationDefinition`. May be used by Relay 1. */
  integrationDefinitionEdge?: Maybe<IntegrationDefinitionEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `IntegrationDefinition` mutation. */
export type CreateIntegrationDefinitionPayloadIntegrationDefinitionEdgeArgs = {
  orderBy?: Array<IntegrationDefinitionOrderBy>;
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

/** All input for the create `McpServer` mutation. */
export type CreateMcpServerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `McpServer` to be created by this mutation. */
  mcpServer: McpServerInput;
};

/** The output of our create `McpServer` mutation. */
export type CreateMcpServerPayload = {
  __typename?: 'CreateMcpServerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `McpServer` that was created by this mutation. */
  mcpServer?: Maybe<McpServer>;
  /** An edge for our `McpServer`. May be used by Relay 1. */
  mcpServerEdge?: Maybe<McpServerEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `McpServer` mutation. */
export type CreateMcpServerPayloadMcpServerEdgeArgs = {
  orderBy?: Array<McpServerOrderBy>;
};

/** All input for the create `OauthState` mutation. */
export type CreateOauthStateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `OauthState` to be created by this mutation. */
  oauthState: OauthStateInput;
};

/** The output of our create `OauthState` mutation. */
export type CreateOauthStatePayload = {
  __typename?: 'CreateOauthStatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `OauthState` that was created by this mutation. */
  oauthState?: Maybe<OauthState>;
  /** An edge for our `OauthState`. May be used by Relay 1. */
  oauthStateEdge?: Maybe<OauthStateEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `OauthState` mutation. */
export type CreateOauthStatePayloadOauthStateEdgeArgs = {
  orderBy?: Array<OauthStateOrderBy>;
};

/** All input for the create `OauthToken` mutation. */
export type CreateOauthTokenInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `OauthToken` to be created by this mutation. */
  oauthToken: OauthTokenInput;
};

/** The output of our create `OauthToken` mutation. */
export type CreateOauthTokenPayload = {
  __typename?: 'CreateOauthTokenPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `OauthToken` that was created by this mutation. */
  oauthToken?: Maybe<OauthToken>;
  /** An edge for our `OauthToken`. May be used by Relay 1. */
  oauthTokenEdge?: Maybe<OauthTokenEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `OauthToken` mutation. */
export type CreateOauthTokenPayloadOauthTokenEdgeArgs = {
  orderBy?: Array<OauthTokenOrderBy>;
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

/** All input for the create `UserOrganization` mutation. */
export type CreateUserOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `UserOrganization` to be created by this mutation. */
  userOrganization: UserOrganizationInput;
};

/** The output of our create `UserOrganization` mutation. */
export type CreateUserOrganizationPayload = {
  __typename?: 'CreateUserOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `UserOrganization` that was created by this mutation. */
  userOrganization?: Maybe<UserOrganization>;
  /** An edge for our `UserOrganization`. May be used by Relay 1. */
  userOrganizationEdge?: Maybe<UserOrganizationEdge>;
};


/** The output of our create `UserOrganization` mutation. */
export type CreateUserOrganizationPayloadUserOrganizationEdgeArgs = {
  orderBy?: Array<UserOrganizationOrderBy>;
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

/** All input for the create `WorkflowTemplate` mutation. */
export type CreateWorkflowTemplateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `WorkflowTemplate` to be created by this mutation. */
  workflowTemplate: WorkflowTemplateInput;
};

/** The output of our create `WorkflowTemplate` mutation. */
export type CreateWorkflowTemplatePayload = {
  __typename?: 'CreateWorkflowTemplatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `WorkflowTemplate` that was created by this mutation. */
  workflowTemplate?: Maybe<WorkflowTemplate>;
  /** An edge for our `WorkflowTemplate`. May be used by Relay 1. */
  workflowTemplateEdge?: Maybe<WorkflowTemplateEdge>;
};


/** The output of our create `WorkflowTemplate` mutation. */
export type CreateWorkflowTemplatePayloadWorkflowTemplateEdgeArgs = {
  orderBy?: Array<WorkflowTemplateOrderBy>;
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

/** All input for the `deleteEventRoutingRuleById` mutation. */
export type DeleteEventRoutingRuleByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `EventRoutingRule` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteEventRoutingRule` mutation. */
export type DeleteEventRoutingRuleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `EventRoutingRule` mutation. */
export type DeleteEventRoutingRulePayload = {
  __typename?: 'DeleteEventRoutingRulePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedEventRoutingRuleId?: Maybe<Scalars['ID']['output']>;
  /** The `EventRoutingRule` that was deleted by this mutation. */
  eventRoutingRule?: Maybe<EventRoutingRule>;
  /** An edge for our `EventRoutingRule`. May be used by Relay 1. */
  eventRoutingRuleEdge?: Maybe<EventRoutingRuleEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `EventRoutingRule` mutation. */
export type DeleteEventRoutingRulePayloadEventRoutingRuleEdgeArgs = {
  orderBy?: Array<EventRoutingRuleOrderBy>;
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

/** All input for the `deleteIntegrationDefinitionById` mutation. */
export type DeleteIntegrationDefinitionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `IntegrationDefinition` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteIntegrationDefinition` mutation. */
export type DeleteIntegrationDefinitionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

/** The output of our delete `IntegrationDefinition` mutation. */
export type DeleteIntegrationDefinitionPayload = {
  __typename?: 'DeleteIntegrationDefinitionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedIntegrationDefinitionId?: Maybe<Scalars['ID']['output']>;
  /** The `IntegrationDefinition` that was deleted by this mutation. */
  integrationDefinition?: Maybe<IntegrationDefinition>;
  /** An edge for our `IntegrationDefinition`. May be used by Relay 1. */
  integrationDefinitionEdge?: Maybe<IntegrationDefinitionEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `IntegrationDefinition` mutation. */
export type DeleteIntegrationDefinitionPayloadIntegrationDefinitionEdgeArgs = {
  orderBy?: Array<IntegrationDefinitionOrderBy>;
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

/** All input for the `deleteMcpServerById` mutation. */
export type DeleteMcpServerByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `McpServer` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteMcpServer` mutation. */
export type DeleteMcpServerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `McpServer` mutation. */
export type DeleteMcpServerPayload = {
  __typename?: 'DeleteMcpServerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedMcpServerId?: Maybe<Scalars['ID']['output']>;
  /** The `McpServer` that was deleted by this mutation. */
  mcpServer?: Maybe<McpServer>;
  /** An edge for our `McpServer`. May be used by Relay 1. */
  mcpServerEdge?: Maybe<McpServerEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `McpServer` mutation. */
export type DeleteMcpServerPayloadMcpServerEdgeArgs = {
  orderBy?: Array<McpServerOrderBy>;
};

/** All input for the `deleteOauthStateById` mutation. */
export type DeleteOauthStateByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `OauthState` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteOauthState` mutation. */
export type DeleteOauthStateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `OauthState` mutation. */
export type DeleteOauthStatePayload = {
  __typename?: 'DeleteOauthStatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedOauthStateId?: Maybe<Scalars['ID']['output']>;
  /** The `OauthState` that was deleted by this mutation. */
  oauthState?: Maybe<OauthState>;
  /** An edge for our `OauthState`. May be used by Relay 1. */
  oauthStateEdge?: Maybe<OauthStateEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `OauthState` mutation. */
export type DeleteOauthStatePayloadOauthStateEdgeArgs = {
  orderBy?: Array<OauthStateOrderBy>;
};

/** All input for the `deleteOauthTokenById` mutation. */
export type DeleteOauthTokenByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `OauthToken` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteOauthToken` mutation. */
export type DeleteOauthTokenInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `OauthToken` mutation. */
export type DeleteOauthTokenPayload = {
  __typename?: 'DeleteOauthTokenPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedOauthTokenId?: Maybe<Scalars['ID']['output']>;
  /** The `OauthToken` that was deleted by this mutation. */
  oauthToken?: Maybe<OauthToken>;
  /** An edge for our `OauthToken`. May be used by Relay 1. */
  oauthTokenEdge?: Maybe<OauthTokenEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `OauthToken` mutation. */
export type DeleteOauthTokenPayloadOauthTokenEdgeArgs = {
  orderBy?: Array<OauthTokenOrderBy>;
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

/** All input for the `deleteUserOrganizationById` mutation. */
export type DeleteUserOrganizationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `UserOrganization` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteUserOrganizationByUserIdAndOrganizationId` mutation. */
export type DeleteUserOrganizationByUserIdAndOrganizationIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['String']['input'];
  userId: Scalars['UUID']['input'];
};

/** All input for the `deleteUserOrganization` mutation. */
export type DeleteUserOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `UserOrganization` mutation. */
export type DeleteUserOrganizationPayload = {
  __typename?: 'DeleteUserOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedUserOrganizationId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `UserOrganization` that was deleted by this mutation. */
  userOrganization?: Maybe<UserOrganization>;
  /** An edge for our `UserOrganization`. May be used by Relay 1. */
  userOrganizationEdge?: Maybe<UserOrganizationEdge>;
};


/** The output of our delete `UserOrganization` mutation. */
export type DeleteUserOrganizationPayloadUserOrganizationEdgeArgs = {
  orderBy?: Array<UserOrganizationOrderBy>;
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

/** All input for the `deleteWorkflowTemplateById` mutation. */
export type DeleteWorkflowTemplateByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `WorkflowTemplate` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteWorkflowTemplate` mutation. */
export type DeleteWorkflowTemplateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `WorkflowTemplate` mutation. */
export type DeleteWorkflowTemplatePayload = {
  __typename?: 'DeleteWorkflowTemplatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedWorkflowTemplateId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `WorkflowTemplate` that was deleted by this mutation. */
  workflowTemplate?: Maybe<WorkflowTemplate>;
  /** An edge for our `WorkflowTemplate`. May be used by Relay 1. */
  workflowTemplateEdge?: Maybe<WorkflowTemplateEdge>;
};


/** The output of our delete `WorkflowTemplate` mutation. */
export type DeleteWorkflowTemplatePayloadWorkflowTemplateEdgeArgs = {
  orderBy?: Array<WorkflowTemplateOrderBy>;
};

export type EventRoutingRule = Node & {
  __typename?: 'EventRoutingRule';
  condition?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  enabled: Scalars['Boolean']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  organizationId: Scalars['String']['output'];
  priority: Scalars['Int']['output'];
  rowId: Scalars['UUID']['output'];
  sourcePattern?: Maybe<Scalars['String']['output']>;
  transform?: Maybe<Scalars['String']['output']>;
  typePattern: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `Workflow` that is related to this `EventRoutingRule`. */
  workflow?: Maybe<Workflow>;
  workflowId: Scalars['UUID']['output'];
};

export type EventRoutingRuleAggregates = {
  __typename?: 'EventRoutingRuleAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<EventRoutingRuleAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<EventRoutingRuleDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<EventRoutingRuleMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<EventRoutingRuleMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<EventRoutingRuleStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<EventRoutingRuleStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<EventRoutingRuleSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<EventRoutingRuleVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<EventRoutingRuleVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `EventRoutingRule` object types. */
export type EventRoutingRuleAggregatesFilter = {
  /** Mean average aggregate over matching `EventRoutingRule` objects. */
  average?: InputMaybe<EventRoutingRuleAverageAggregateFilter>;
  /** Distinct count aggregate over matching `EventRoutingRule` objects. */
  distinctCount?: InputMaybe<EventRoutingRuleDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `EventRoutingRule` object to be included within the aggregate. */
  filter?: InputMaybe<EventRoutingRuleFilter>;
  /** Maximum aggregate over matching `EventRoutingRule` objects. */
  max?: InputMaybe<EventRoutingRuleMaxAggregateFilter>;
  /** Minimum aggregate over matching `EventRoutingRule` objects. */
  min?: InputMaybe<EventRoutingRuleMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `EventRoutingRule` objects. */
  stddevPopulation?: InputMaybe<EventRoutingRuleStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `EventRoutingRule` objects. */
  stddevSample?: InputMaybe<EventRoutingRuleStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `EventRoutingRule` objects. */
  sum?: InputMaybe<EventRoutingRuleSumAggregateFilter>;
  /** Population variance aggregate over matching `EventRoutingRule` objects. */
  variancePopulation?: InputMaybe<EventRoutingRuleVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `EventRoutingRule` objects. */
  varianceSample?: InputMaybe<EventRoutingRuleVarianceSampleAggregateFilter>;
};

export type EventRoutingRuleAverageAggregateFilter = {
  priority?: InputMaybe<BigFloatFilter>;
};

export type EventRoutingRuleAverageAggregates = {
  __typename?: 'EventRoutingRuleAverageAggregates';
  /** Mean average of priority across the matching connection */
  priority?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `EventRoutingRule` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type EventRoutingRuleCondition = {
  /** Checks for equality with the object’s `condition` field. */
  condition?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `enabled` field. */
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `priority` field. */
  priority?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `sourcePattern` field. */
  sourcePattern?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `transform` field. */
  transform?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `typePattern` field. */
  typePattern?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `workflowId` field. */
  workflowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `EventRoutingRule` values. */
export type EventRoutingRuleConnection = {
  __typename?: 'EventRoutingRuleConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<EventRoutingRuleAggregates>;
  /** A list of edges which contains the `EventRoutingRule` and cursor to aid in pagination. */
  edges: Array<EventRoutingRuleEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<EventRoutingRuleAggregates>>;
  /** A list of `EventRoutingRule` objects. */
  nodes: Array<EventRoutingRule>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EventRoutingRule` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `EventRoutingRule` values. */
export type EventRoutingRuleConnectionGroupedAggregatesArgs = {
  groupBy: Array<EventRoutingRuleGroupBy>;
  having?: InputMaybe<EventRoutingRuleHavingInput>;
};

export type EventRoutingRuleDistinctCountAggregateFilter = {
  condition?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  enabled?: InputMaybe<BigIntFilter>;
  organizationId?: InputMaybe<BigIntFilter>;
  priority?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  sourcePattern?: InputMaybe<BigIntFilter>;
  transform?: InputMaybe<BigIntFilter>;
  typePattern?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  workflowId?: InputMaybe<BigIntFilter>;
};

export type EventRoutingRuleDistinctCountAggregates = {
  __typename?: 'EventRoutingRuleDistinctCountAggregates';
  /** Distinct count of condition across the matching connection */
  condition?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of enabled across the matching connection */
  enabled?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of priority across the matching connection */
  priority?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of sourcePattern across the matching connection */
  sourcePattern?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of transform across the matching connection */
  transform?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of typePattern across the matching connection */
  typePattern?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of workflowId across the matching connection */
  workflowId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `EventRoutingRule` edge in the connection. */
export type EventRoutingRuleEdge = {
  __typename?: 'EventRoutingRuleEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `EventRoutingRule` at the end of the edge. */
  node: EventRoutingRule;
};

/** A filter to be used against `EventRoutingRule` object types. All fields are combined with a logical ‘and.’ */
export type EventRoutingRuleFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EventRoutingRuleFilter>>;
  /** Filter by the object’s `condition` field. */
  condition?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `enabled` field. */
  enabled?: InputMaybe<BooleanFilter>;
  /** Negates the expression. */
  not?: InputMaybe<EventRoutingRuleFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EventRoutingRuleFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `priority` field. */
  priority?: InputMaybe<IntFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `sourcePattern` field. */
  sourcePattern?: InputMaybe<StringFilter>;
  /** Filter by the object’s `transform` field. */
  transform?: InputMaybe<StringFilter>;
  /** Filter by the object’s `typePattern` field. */
  typePattern?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `workflow` relation. */
  workflow?: InputMaybe<WorkflowFilter>;
  /** Filter by the object’s `workflowId` field. */
  workflowId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `EventRoutingRule` for usage during aggregation. */
export enum EventRoutingRuleGroupBy {
  Condition = 'CONDITION',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Enabled = 'ENABLED',
  OrganizationId = 'ORGANIZATION_ID',
  Priority = 'PRIORITY',
  SourcePattern = 'SOURCE_PATTERN',
  Transform = 'TRANSFORM',
  TypePattern = 'TYPE_PATTERN',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  WorkflowId = 'WORKFLOW_ID'
}

export type EventRoutingRuleHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  priority?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventRoutingRuleHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  priority?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `EventRoutingRule` aggregates. */
export type EventRoutingRuleHavingInput = {
  AND?: InputMaybe<Array<EventRoutingRuleHavingInput>>;
  OR?: InputMaybe<Array<EventRoutingRuleHavingInput>>;
  average?: InputMaybe<EventRoutingRuleHavingAverageInput>;
  distinctCount?: InputMaybe<EventRoutingRuleHavingDistinctCountInput>;
  max?: InputMaybe<EventRoutingRuleHavingMaxInput>;
  min?: InputMaybe<EventRoutingRuleHavingMinInput>;
  stddevPopulation?: InputMaybe<EventRoutingRuleHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<EventRoutingRuleHavingStddevSampleInput>;
  sum?: InputMaybe<EventRoutingRuleHavingSumInput>;
  variancePopulation?: InputMaybe<EventRoutingRuleHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<EventRoutingRuleHavingVarianceSampleInput>;
};

export type EventRoutingRuleHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  priority?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventRoutingRuleHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  priority?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventRoutingRuleHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  priority?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventRoutingRuleHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  priority?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventRoutingRuleHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  priority?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventRoutingRuleHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  priority?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventRoutingRuleHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  priority?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `EventRoutingRule` */
export type EventRoutingRuleInput = {
  condition?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  organizationId: Scalars['String']['input'];
  priority?: InputMaybe<Scalars['Int']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  sourcePattern?: InputMaybe<Scalars['String']['input']>;
  transform?: InputMaybe<Scalars['String']['input']>;
  typePattern: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  workflowId: Scalars['UUID']['input'];
};

export type EventRoutingRuleMaxAggregateFilter = {
  priority?: InputMaybe<IntFilter>;
};

export type EventRoutingRuleMaxAggregates = {
  __typename?: 'EventRoutingRuleMaxAggregates';
  /** Maximum of priority across the matching connection */
  priority?: Maybe<Scalars['Int']['output']>;
};

export type EventRoutingRuleMinAggregateFilter = {
  priority?: InputMaybe<IntFilter>;
};

export type EventRoutingRuleMinAggregates = {
  __typename?: 'EventRoutingRuleMinAggregates';
  /** Minimum of priority across the matching connection */
  priority?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `EventRoutingRule`. */
export enum EventRoutingRuleOrderBy {
  ConditionAsc = 'CONDITION_ASC',
  ConditionDesc = 'CONDITION_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EnabledAsc = 'ENABLED_ASC',
  EnabledDesc = 'ENABLED_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  PriorityAsc = 'PRIORITY_ASC',
  PriorityDesc = 'PRIORITY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SourcePatternAsc = 'SOURCE_PATTERN_ASC',
  SourcePatternDesc = 'SOURCE_PATTERN_DESC',
  TransformAsc = 'TRANSFORM_ASC',
  TransformDesc = 'TRANSFORM_DESC',
  TypePatternAsc = 'TYPE_PATTERN_ASC',
  TypePatternDesc = 'TYPE_PATTERN_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  WorkflowIdAsc = 'WORKFLOW_ID_ASC',
  WorkflowIdDesc = 'WORKFLOW_ID_DESC'
}

/** Represents an update to a `EventRoutingRule`. Fields that are set will be updated. */
export type EventRoutingRulePatch = {
  condition?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  sourcePattern?: InputMaybe<Scalars['String']['input']>;
  transform?: InputMaybe<Scalars['String']['input']>;
  typePattern?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  workflowId?: InputMaybe<Scalars['UUID']['input']>;
};

export type EventRoutingRuleStddevPopulationAggregateFilter = {
  priority?: InputMaybe<BigFloatFilter>;
};

export type EventRoutingRuleStddevPopulationAggregates = {
  __typename?: 'EventRoutingRuleStddevPopulationAggregates';
  /** Population standard deviation of priority across the matching connection */
  priority?: Maybe<Scalars['BigFloat']['output']>;
};

export type EventRoutingRuleStddevSampleAggregateFilter = {
  priority?: InputMaybe<BigFloatFilter>;
};

export type EventRoutingRuleStddevSampleAggregates = {
  __typename?: 'EventRoutingRuleStddevSampleAggregates';
  /** Sample standard deviation of priority across the matching connection */
  priority?: Maybe<Scalars['BigFloat']['output']>;
};

export type EventRoutingRuleSumAggregateFilter = {
  priority?: InputMaybe<BigIntFilter>;
};

export type EventRoutingRuleSumAggregates = {
  __typename?: 'EventRoutingRuleSumAggregates';
  /** Sum of priority across the matching connection */
  priority: Scalars['BigInt']['output'];
};

export type EventRoutingRuleVariancePopulationAggregateFilter = {
  priority?: InputMaybe<BigFloatFilter>;
};

export type EventRoutingRuleVariancePopulationAggregates = {
  __typename?: 'EventRoutingRuleVariancePopulationAggregates';
  /** Population variance of priority across the matching connection */
  priority?: Maybe<Scalars['BigFloat']['output']>;
};

export type EventRoutingRuleVarianceSampleAggregateFilter = {
  priority?: InputMaybe<BigFloatFilter>;
};

export type EventRoutingRuleVarianceSampleAggregates = {
  __typename?: 'EventRoutingRuleVarianceSampleAggregates';
  /** Sample variance of priority across the matching connection */
  priority?: Maybe<Scalars['BigFloat']['output']>;
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
  authMethod: Scalars['String']['output'];
  config: Scalars['JSON']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `IntegrationDefinition` that is related to this `Integration`. */
  definition?: Maybe<IntegrationDefinition>;
  definitionId?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  /** Reads a single `McpServer` that is related to this `Integration`. */
  mcpServer?: Maybe<McpServer>;
  mcpServerId?: Maybe<Scalars['UUID']['output']>;
  name: Scalars['String']['output'];
  oauthConnectedAt?: Maybe<Scalars['Datetime']['output']>;
  oauthStatus?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `OauthToken`. */
  oauthTokens: OauthTokenConnection;
  organizationId: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type IntegrationOauthTokensArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<OauthTokenCondition>;
  filter?: InputMaybe<OauthTokenFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OauthTokenOrderBy>>;
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
  /** Checks for equality with the object’s `authMethod` field. */
  authMethod?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `definitionId` field. */
  definitionId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `isEnabled` field. */
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `mcpServerId` field. */
  mcpServerId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `oauthConnectedAt` field. */
  oauthConnectedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `oauthStatus` field. */
  oauthStatus?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
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

export type IntegrationDefinition = Node & {
  __typename?: 'IntegrationDefinition';
  authFields: Scalars['JSON']['output'];
  authType: Scalars['String']['output'];
  category: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  docsUrl?: Maybe<Scalars['String']['output']>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  idleTimeoutMs: Scalars['Int']['output'];
  /** Reads and enables pagination through a set of `Integration`. */
  integrationsByDefinitionId: IntegrationConnection;
  isEnabled: Scalars['Boolean']['output'];
  isFeatured: Scalars['Boolean']['output'];
  keepAlive: Scalars['Boolean']['output'];
  mcpArgs: Scalars['JSON']['output'];
  mcpCommand: Scalars['String']['output'];
  mcpPackage: Scalars['String']['output'];
  name: Scalars['String']['output'];
  rowId: Scalars['String']['output'];
  setupSteps?: Maybe<Scalars['JSON']['output']>;
  supportsOAuth: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type IntegrationDefinitionIntegrationsByDefinitionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<IntegrationCondition>;
  filter?: InputMaybe<IntegrationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<IntegrationOrderBy>>;
};

export type IntegrationDefinitionAggregates = {
  __typename?: 'IntegrationDefinitionAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<IntegrationDefinitionAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<IntegrationDefinitionDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<IntegrationDefinitionMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<IntegrationDefinitionMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<IntegrationDefinitionStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<IntegrationDefinitionStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<IntegrationDefinitionSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<IntegrationDefinitionVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<IntegrationDefinitionVarianceSampleAggregates>;
};

export type IntegrationDefinitionAverageAggregates = {
  __typename?: 'IntegrationDefinitionAverageAggregates';
  /** Mean average of idleTimeoutMs across the matching connection */
  idleTimeoutMs?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `IntegrationDefinition` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type IntegrationDefinitionCondition = {
  /** Checks for equality with the object’s `authType` field. */
  authType?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `category` field. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `docsUrl` field. */
  docsUrl?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `iconUrl` field. */
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `idleTimeoutMs` field. */
  idleTimeoutMs?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `isEnabled` field. */
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `isFeatured` field. */
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `keepAlive` field. */
  keepAlive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `mcpCommand` field. */
  mcpCommand?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `mcpPackage` field. */
  mcpPackage?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `supportsOAuth` field. */
  supportsOAuth?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `IntegrationDefinition` values. */
export type IntegrationDefinitionConnection = {
  __typename?: 'IntegrationDefinitionConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<IntegrationDefinitionAggregates>;
  /** A list of edges which contains the `IntegrationDefinition` and cursor to aid in pagination. */
  edges: Array<IntegrationDefinitionEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<IntegrationDefinitionAggregates>>;
  /** A list of `IntegrationDefinition` objects. */
  nodes: Array<IntegrationDefinition>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `IntegrationDefinition` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `IntegrationDefinition` values. */
export type IntegrationDefinitionConnectionGroupedAggregatesArgs = {
  groupBy: Array<IntegrationDefinitionGroupBy>;
  having?: InputMaybe<IntegrationDefinitionHavingInput>;
};

export type IntegrationDefinitionDistinctCountAggregates = {
  __typename?: 'IntegrationDefinitionDistinctCountAggregates';
  /** Distinct count of authFields across the matching connection */
  authFields?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of authType across the matching connection */
  authType?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of category across the matching connection */
  category?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of docsUrl across the matching connection */
  docsUrl?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of iconUrl across the matching connection */
  iconUrl?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of idleTimeoutMs across the matching connection */
  idleTimeoutMs?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of isEnabled across the matching connection */
  isEnabled?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of isFeatured across the matching connection */
  isFeatured?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of keepAlive across the matching connection */
  keepAlive?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of mcpArgs across the matching connection */
  mcpArgs?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of mcpCommand across the matching connection */
  mcpCommand?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of mcpPackage across the matching connection */
  mcpPackage?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of setupSteps across the matching connection */
  setupSteps?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of supportsOAuth across the matching connection */
  supportsOAuth?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
};

/** A `IntegrationDefinition` edge in the connection. */
export type IntegrationDefinitionEdge = {
  __typename?: 'IntegrationDefinitionEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `IntegrationDefinition` at the end of the edge. */
  node: IntegrationDefinition;
};

/** A filter to be used against `IntegrationDefinition` object types. All fields are combined with a logical ‘and.’ */
export type IntegrationDefinitionFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<IntegrationDefinitionFilter>>;
  /** Filter by the object’s `authType` field. */
  authType?: InputMaybe<StringFilter>;
  /** Filter by the object’s `category` field. */
  category?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `docsUrl` field. */
  docsUrl?: InputMaybe<StringFilter>;
  /** Filter by the object’s `iconUrl` field. */
  iconUrl?: InputMaybe<StringFilter>;
  /** Filter by the object’s `idleTimeoutMs` field. */
  idleTimeoutMs?: InputMaybe<IntFilter>;
  /** Filter by the object’s `integrationsByDefinitionId` relation. */
  integrationsByDefinitionId?: InputMaybe<IntegrationDefinitionToManyIntegrationFilter>;
  /** Some related `integrationsByDefinitionId` exist. */
  integrationsByDefinitionIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `isEnabled` field. */
  isEnabled?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `isFeatured` field. */
  isFeatured?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `keepAlive` field. */
  keepAlive?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `mcpCommand` field. */
  mcpCommand?: InputMaybe<StringFilter>;
  /** Filter by the object’s `mcpPackage` field. */
  mcpPackage?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<IntegrationDefinitionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<IntegrationDefinitionFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `supportsOAuth` field. */
  supportsOAuth?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** Grouping methods for `IntegrationDefinition` for usage during aggregation. */
export enum IntegrationDefinitionGroupBy {
  AuthFields = 'AUTH_FIELDS',
  AuthType = 'AUTH_TYPE',
  Category = 'CATEGORY',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Description = 'DESCRIPTION',
  DocsUrl = 'DOCS_URL',
  IconUrl = 'ICON_URL',
  IdleTimeoutMs = 'IDLE_TIMEOUT_MS',
  IsEnabled = 'IS_ENABLED',
  IsFeatured = 'IS_FEATURED',
  KeepAlive = 'KEEP_ALIVE',
  McpArgs = 'MCP_ARGS',
  McpCommand = 'MCP_COMMAND',
  McpPackage = 'MCP_PACKAGE',
  Name = 'NAME',
  SetupSteps = 'SETUP_STEPS',
  SupportsOAuth = 'SUPPORTS_O_AUTH',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type IntegrationDefinitionHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  idleTimeoutMs?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationDefinitionHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  idleTimeoutMs?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `IntegrationDefinition` aggregates. */
export type IntegrationDefinitionHavingInput = {
  AND?: InputMaybe<Array<IntegrationDefinitionHavingInput>>;
  OR?: InputMaybe<Array<IntegrationDefinitionHavingInput>>;
  average?: InputMaybe<IntegrationDefinitionHavingAverageInput>;
  distinctCount?: InputMaybe<IntegrationDefinitionHavingDistinctCountInput>;
  max?: InputMaybe<IntegrationDefinitionHavingMaxInput>;
  min?: InputMaybe<IntegrationDefinitionHavingMinInput>;
  stddevPopulation?: InputMaybe<IntegrationDefinitionHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<IntegrationDefinitionHavingStddevSampleInput>;
  sum?: InputMaybe<IntegrationDefinitionHavingSumInput>;
  variancePopulation?: InputMaybe<IntegrationDefinitionHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<IntegrationDefinitionHavingVarianceSampleInput>;
};

export type IntegrationDefinitionHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  idleTimeoutMs?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationDefinitionHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  idleTimeoutMs?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationDefinitionHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  idleTimeoutMs?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationDefinitionHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  idleTimeoutMs?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationDefinitionHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  idleTimeoutMs?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationDefinitionHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  idleTimeoutMs?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationDefinitionHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  idleTimeoutMs?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `IntegrationDefinition` */
export type IntegrationDefinitionInput = {
  authFields?: InputMaybe<Scalars['JSON']['input']>;
  authType?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  docsUrl?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  idleTimeoutMs?: InputMaybe<Scalars['Int']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  keepAlive?: InputMaybe<Scalars['Boolean']['input']>;
  mcpArgs?: InputMaybe<Scalars['JSON']['input']>;
  mcpCommand?: InputMaybe<Scalars['String']['input']>;
  mcpPackage: Scalars['String']['input'];
  name: Scalars['String']['input'];
  rowId: Scalars['String']['input'];
  setupSteps?: InputMaybe<Scalars['JSON']['input']>;
  supportsOAuth?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type IntegrationDefinitionMaxAggregates = {
  __typename?: 'IntegrationDefinitionMaxAggregates';
  /** Maximum of idleTimeoutMs across the matching connection */
  idleTimeoutMs?: Maybe<Scalars['Int']['output']>;
};

export type IntegrationDefinitionMinAggregates = {
  __typename?: 'IntegrationDefinitionMinAggregates';
  /** Minimum of idleTimeoutMs across the matching connection */
  idleTimeoutMs?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `IntegrationDefinition`. */
export enum IntegrationDefinitionOrderBy {
  AuthTypeAsc = 'AUTH_TYPE_ASC',
  AuthTypeDesc = 'AUTH_TYPE_DESC',
  CategoryAsc = 'CATEGORY_ASC',
  CategoryDesc = 'CATEGORY_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  DocsUrlAsc = 'DOCS_URL_ASC',
  DocsUrlDesc = 'DOCS_URL_DESC',
  IconUrlAsc = 'ICON_URL_ASC',
  IconUrlDesc = 'ICON_URL_DESC',
  IdleTimeoutMsAsc = 'IDLE_TIMEOUT_MS_ASC',
  IdleTimeoutMsDesc = 'IDLE_TIMEOUT_MS_DESC',
  IntegrationsByDefinitionIdCountAsc = 'INTEGRATIONS_BY_DEFINITION_ID_COUNT_ASC',
  IntegrationsByDefinitionIdCountDesc = 'INTEGRATIONS_BY_DEFINITION_ID_COUNT_DESC',
  IntegrationsByDefinitionIdDistinctCountAuthMethodAsc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_AUTH_METHOD_ASC',
  IntegrationsByDefinitionIdDistinctCountAuthMethodDesc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_AUTH_METHOD_DESC',
  IntegrationsByDefinitionIdDistinctCountConfigAsc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_CONFIG_ASC',
  IntegrationsByDefinitionIdDistinctCountConfigDesc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_CONFIG_DESC',
  IntegrationsByDefinitionIdDistinctCountCreatedAtAsc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_CREATED_AT_ASC',
  IntegrationsByDefinitionIdDistinctCountCreatedAtDesc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_CREATED_AT_DESC',
  IntegrationsByDefinitionIdDistinctCountDefinitionIdAsc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_DEFINITION_ID_ASC',
  IntegrationsByDefinitionIdDistinctCountDefinitionIdDesc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_DEFINITION_ID_DESC',
  IntegrationsByDefinitionIdDistinctCountIsEnabledAsc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_IS_ENABLED_ASC',
  IntegrationsByDefinitionIdDistinctCountIsEnabledDesc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_IS_ENABLED_DESC',
  IntegrationsByDefinitionIdDistinctCountMcpServerIdAsc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_MCP_SERVER_ID_ASC',
  IntegrationsByDefinitionIdDistinctCountMcpServerIdDesc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_MCP_SERVER_ID_DESC',
  IntegrationsByDefinitionIdDistinctCountNameAsc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_NAME_ASC',
  IntegrationsByDefinitionIdDistinctCountNameDesc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_NAME_DESC',
  IntegrationsByDefinitionIdDistinctCountOauthConnectedAtAsc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_OAUTH_CONNECTED_AT_ASC',
  IntegrationsByDefinitionIdDistinctCountOauthConnectedAtDesc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_OAUTH_CONNECTED_AT_DESC',
  IntegrationsByDefinitionIdDistinctCountOauthStatusAsc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_OAUTH_STATUS_ASC',
  IntegrationsByDefinitionIdDistinctCountOauthStatusDesc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_OAUTH_STATUS_DESC',
  IntegrationsByDefinitionIdDistinctCountOrganizationIdAsc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  IntegrationsByDefinitionIdDistinctCountOrganizationIdDesc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  IntegrationsByDefinitionIdDistinctCountRowIdAsc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_ROW_ID_ASC',
  IntegrationsByDefinitionIdDistinctCountRowIdDesc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_ROW_ID_DESC',
  IntegrationsByDefinitionIdDistinctCountTypeAsc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_TYPE_ASC',
  IntegrationsByDefinitionIdDistinctCountTypeDesc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_TYPE_DESC',
  IntegrationsByDefinitionIdDistinctCountUpdatedAtAsc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_UPDATED_AT_ASC',
  IntegrationsByDefinitionIdDistinctCountUpdatedAtDesc = 'INTEGRATIONS_BY_DEFINITION_ID_DISTINCT_COUNT_UPDATED_AT_DESC',
  IsEnabledAsc = 'IS_ENABLED_ASC',
  IsEnabledDesc = 'IS_ENABLED_DESC',
  IsFeaturedAsc = 'IS_FEATURED_ASC',
  IsFeaturedDesc = 'IS_FEATURED_DESC',
  KeepAliveAsc = 'KEEP_ALIVE_ASC',
  KeepAliveDesc = 'KEEP_ALIVE_DESC',
  McpCommandAsc = 'MCP_COMMAND_ASC',
  McpCommandDesc = 'MCP_COMMAND_DESC',
  McpPackageAsc = 'MCP_PACKAGE_ASC',
  McpPackageDesc = 'MCP_PACKAGE_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SupportsOAuthAsc = 'SUPPORTS_O_AUTH_ASC',
  SupportsOAuthDesc = 'SUPPORTS_O_AUTH_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `IntegrationDefinition`. Fields that are set will be updated. */
export type IntegrationDefinitionPatch = {
  authFields?: InputMaybe<Scalars['JSON']['input']>;
  authType?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  docsUrl?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  idleTimeoutMs?: InputMaybe<Scalars['Int']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  keepAlive?: InputMaybe<Scalars['Boolean']['input']>;
  mcpArgs?: InputMaybe<Scalars['JSON']['input']>;
  mcpCommand?: InputMaybe<Scalars['String']['input']>;
  mcpPackage?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['String']['input']>;
  setupSteps?: InputMaybe<Scalars['JSON']['input']>;
  supportsOAuth?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type IntegrationDefinitionStddevPopulationAggregates = {
  __typename?: 'IntegrationDefinitionStddevPopulationAggregates';
  /** Population standard deviation of idleTimeoutMs across the matching connection */
  idleTimeoutMs?: Maybe<Scalars['BigFloat']['output']>;
};

export type IntegrationDefinitionStddevSampleAggregates = {
  __typename?: 'IntegrationDefinitionStddevSampleAggregates';
  /** Sample standard deviation of idleTimeoutMs across the matching connection */
  idleTimeoutMs?: Maybe<Scalars['BigFloat']['output']>;
};

export type IntegrationDefinitionSumAggregates = {
  __typename?: 'IntegrationDefinitionSumAggregates';
  /** Sum of idleTimeoutMs across the matching connection */
  idleTimeoutMs: Scalars['BigInt']['output'];
};

/** A filter to be used against many `Integration` object types. All fields are combined with a logical ‘and.’ */
export type IntegrationDefinitionToManyIntegrationFilter = {
  /** Aggregates across related `Integration` match the filter criteria. */
  aggregates?: InputMaybe<IntegrationAggregatesFilter>;
  /** Every related `Integration` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<IntegrationFilter>;
  /** No related `Integration` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<IntegrationFilter>;
  /** Some related `Integration` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<IntegrationFilter>;
};

export type IntegrationDefinitionVariancePopulationAggregates = {
  __typename?: 'IntegrationDefinitionVariancePopulationAggregates';
  /** Population variance of idleTimeoutMs across the matching connection */
  idleTimeoutMs?: Maybe<Scalars['BigFloat']['output']>;
};

export type IntegrationDefinitionVarianceSampleAggregates = {
  __typename?: 'IntegrationDefinitionVarianceSampleAggregates';
  /** Sample variance of idleTimeoutMs across the matching connection */
  idleTimeoutMs?: Maybe<Scalars['BigFloat']['output']>;
};

export type IntegrationDistinctCountAggregateFilter = {
  authMethod?: InputMaybe<BigIntFilter>;
  config?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  definitionId?: InputMaybe<BigIntFilter>;
  isEnabled?: InputMaybe<BigIntFilter>;
  mcpServerId?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<BigIntFilter>;
  oauthConnectedAt?: InputMaybe<BigIntFilter>;
  oauthStatus?: InputMaybe<BigIntFilter>;
  organizationId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  type?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
};

export type IntegrationDistinctCountAggregates = {
  __typename?: 'IntegrationDistinctCountAggregates';
  /** Distinct count of authMethod across the matching connection */
  authMethod?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of config across the matching connection */
  config?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of definitionId across the matching connection */
  definitionId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of isEnabled across the matching connection */
  isEnabled?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of mcpServerId across the matching connection */
  mcpServerId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of oauthConnectedAt across the matching connection */
  oauthConnectedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of oauthStatus across the matching connection */
  oauthStatus?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of type across the matching connection */
  type?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `authMethod` field. */
  authMethod?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `definition` relation. */
  definition?: InputMaybe<IntegrationDefinitionFilter>;
  /** A related `definition` exists. */
  definitionExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `definitionId` field. */
  definitionId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `isEnabled` field. */
  isEnabled?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `mcpServer` relation. */
  mcpServer?: InputMaybe<McpServerFilter>;
  /** A related `mcpServer` exists. */
  mcpServerExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `mcpServerId` field. */
  mcpServerId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<IntegrationFilter>;
  /** Filter by the object’s `oauthConnectedAt` field. */
  oauthConnectedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `oauthStatus` field. */
  oauthStatus?: InputMaybe<StringFilter>;
  /** Filter by the object’s `oauthTokens` relation. */
  oauthTokens?: InputMaybe<IntegrationToManyOauthTokenFilter>;
  /** Some related `oauthTokens` exist. */
  oauthTokensExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<IntegrationFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** Grouping methods for `Integration` for usage during aggregation. */
export enum IntegrationGroupBy {
  AuthMethod = 'AUTH_METHOD',
  Config = 'CONFIG',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  DefinitionId = 'DEFINITION_ID',
  IsEnabled = 'IS_ENABLED',
  McpServerId = 'MCP_SERVER_ID',
  Name = 'NAME',
  OauthConnectedAt = 'OAUTH_CONNECTED_AT',
  OauthConnectedAtTruncatedToDay = 'OAUTH_CONNECTED_AT_TRUNCATED_TO_DAY',
  OauthConnectedAtTruncatedToHour = 'OAUTH_CONNECTED_AT_TRUNCATED_TO_HOUR',
  OauthStatus = 'OAUTH_STATUS',
  OrganizationId = 'ORGANIZATION_ID',
  Type = 'TYPE',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type IntegrationHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  oauthConnectedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  oauthConnectedAt?: InputMaybe<HavingDatetimeFilter>;
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
  oauthConnectedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  oauthConnectedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  oauthConnectedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  oauthConnectedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  oauthConnectedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  oauthConnectedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type IntegrationHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  oauthConnectedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `Integration` */
export type IntegrationInput = {
  authMethod?: InputMaybe<Scalars['String']['input']>;
  config?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  definitionId?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  mcpServerId?: InputMaybe<Scalars['UUID']['input']>;
  name: Scalars['String']['input'];
  oauthConnectedAt?: InputMaybe<Scalars['Datetime']['input']>;
  oauthStatus?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  type: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `Integration`. */
export enum IntegrationOrderBy {
  AuthMethodAsc = 'AUTH_METHOD_ASC',
  AuthMethodDesc = 'AUTH_METHOD_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DefinitionIdAsc = 'DEFINITION_ID_ASC',
  DefinitionIdDesc = 'DEFINITION_ID_DESC',
  IsEnabledAsc = 'IS_ENABLED_ASC',
  IsEnabledDesc = 'IS_ENABLED_DESC',
  McpServerIdAsc = 'MCP_SERVER_ID_ASC',
  McpServerIdDesc = 'MCP_SERVER_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OauthConnectedAtAsc = 'OAUTH_CONNECTED_AT_ASC',
  OauthConnectedAtDesc = 'OAUTH_CONNECTED_AT_DESC',
  OauthStatusAsc = 'OAUTH_STATUS_ASC',
  OauthStatusDesc = 'OAUTH_STATUS_DESC',
  OauthTokensCountAsc = 'OAUTH_TOKENS_COUNT_ASC',
  OauthTokensCountDesc = 'OAUTH_TOKENS_COUNT_DESC',
  OauthTokensDistinctCountAccessTokenAsc = 'OAUTH_TOKENS_DISTINCT_COUNT_ACCESS_TOKEN_ASC',
  OauthTokensDistinctCountAccessTokenDesc = 'OAUTH_TOKENS_DISTINCT_COUNT_ACCESS_TOKEN_DESC',
  OauthTokensDistinctCountCreatedAtAsc = 'OAUTH_TOKENS_DISTINCT_COUNT_CREATED_AT_ASC',
  OauthTokensDistinctCountCreatedAtDesc = 'OAUTH_TOKENS_DISTINCT_COUNT_CREATED_AT_DESC',
  OauthTokensDistinctCountExpiresAtAsc = 'OAUTH_TOKENS_DISTINCT_COUNT_EXPIRES_AT_ASC',
  OauthTokensDistinctCountExpiresAtDesc = 'OAUTH_TOKENS_DISTINCT_COUNT_EXPIRES_AT_DESC',
  OauthTokensDistinctCountIntegrationIdAsc = 'OAUTH_TOKENS_DISTINCT_COUNT_INTEGRATION_ID_ASC',
  OauthTokensDistinctCountIntegrationIdDesc = 'OAUTH_TOKENS_DISTINCT_COUNT_INTEGRATION_ID_DESC',
  OauthTokensDistinctCountOrganizationIdAsc = 'OAUTH_TOKENS_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  OauthTokensDistinctCountOrganizationIdDesc = 'OAUTH_TOKENS_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  OauthTokensDistinctCountProviderAsc = 'OAUTH_TOKENS_DISTINCT_COUNT_PROVIDER_ASC',
  OauthTokensDistinctCountProviderDesc = 'OAUTH_TOKENS_DISTINCT_COUNT_PROVIDER_DESC',
  OauthTokensDistinctCountRefreshTokenAsc = 'OAUTH_TOKENS_DISTINCT_COUNT_REFRESH_TOKEN_ASC',
  OauthTokensDistinctCountRefreshTokenDesc = 'OAUTH_TOKENS_DISTINCT_COUNT_REFRESH_TOKEN_DESC',
  OauthTokensDistinctCountRowIdAsc = 'OAUTH_TOKENS_DISTINCT_COUNT_ROW_ID_ASC',
  OauthTokensDistinctCountRowIdDesc = 'OAUTH_TOKENS_DISTINCT_COUNT_ROW_ID_DESC',
  OauthTokensDistinctCountScopeAsc = 'OAUTH_TOKENS_DISTINCT_COUNT_SCOPE_ASC',
  OauthTokensDistinctCountScopeDesc = 'OAUTH_TOKENS_DISTINCT_COUNT_SCOPE_DESC',
  OauthTokensDistinctCountTokenTypeAsc = 'OAUTH_TOKENS_DISTINCT_COUNT_TOKEN_TYPE_ASC',
  OauthTokensDistinctCountTokenTypeDesc = 'OAUTH_TOKENS_DISTINCT_COUNT_TOKEN_TYPE_DESC',
  OauthTokensDistinctCountUpdatedAtAsc = 'OAUTH_TOKENS_DISTINCT_COUNT_UPDATED_AT_ASC',
  OauthTokensDistinctCountUpdatedAtDesc = 'OAUTH_TOKENS_DISTINCT_COUNT_UPDATED_AT_DESC',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `Integration`. Fields that are set will be updated. */
export type IntegrationPatch = {
  authMethod?: InputMaybe<Scalars['String']['input']>;
  config?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  definitionId?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  mcpServerId?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  oauthConnectedAt?: InputMaybe<Scalars['Datetime']['input']>;
  oauthStatus?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against many `OauthToken` object types. All fields are combined with a logical ‘and.’ */
export type IntegrationToManyOauthTokenFilter = {
  /** Aggregates across related `OauthToken` match the filter criteria. */
  aggregates?: InputMaybe<OauthTokenAggregatesFilter>;
  /** Every related `OauthToken` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<OauthTokenFilter>;
  /** No related `OauthToken` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<OauthTokenFilter>;
  /** Some related `OauthToken` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<OauthTokenFilter>;
};

export type McpServer = Node & {
  __typename?: 'McpServer';
  args: Scalars['JSON']['output'];
  command: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  cwd?: Maybe<Scalars['String']['output']>;
  env: Scalars['JSON']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Integration`. */
  integrations: IntegrationConnection;
  isEnabled: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  organizationId: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type McpServerIntegrationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<IntegrationCondition>;
  filter?: InputMaybe<IntegrationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<IntegrationOrderBy>>;
};

export type McpServerAggregates = {
  __typename?: 'McpServerAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<McpServerDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/**
 * A condition to be used against `McpServer` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type McpServerCondition = {
  /** Checks for equality with the object’s `command` field. */
  command?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `cwd` field. */
  cwd?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `isEnabled` field. */
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `McpServer` values. */
export type McpServerConnection = {
  __typename?: 'McpServerConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<McpServerAggregates>;
  /** A list of edges which contains the `McpServer` and cursor to aid in pagination. */
  edges: Array<McpServerEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<McpServerAggregates>>;
  /** A list of `McpServer` objects. */
  nodes: Array<McpServer>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `McpServer` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `McpServer` values. */
export type McpServerConnectionGroupedAggregatesArgs = {
  groupBy: Array<McpServerGroupBy>;
  having?: InputMaybe<McpServerHavingInput>;
};

export type McpServerDistinctCountAggregates = {
  __typename?: 'McpServerDistinctCountAggregates';
  /** Distinct count of args across the matching connection */
  args?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of command across the matching connection */
  command?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of cwd across the matching connection */
  cwd?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of env across the matching connection */
  env?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of isEnabled across the matching connection */
  isEnabled?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of type across the matching connection */
  type?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
};

/** A `McpServer` edge in the connection. */
export type McpServerEdge = {
  __typename?: 'McpServerEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `McpServer` at the end of the edge. */
  node: McpServer;
};

/** A filter to be used against `McpServer` object types. All fields are combined with a logical ‘and.’ */
export type McpServerFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<McpServerFilter>>;
  /** Filter by the object’s `command` field. */
  command?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `cwd` field. */
  cwd?: InputMaybe<StringFilter>;
  /** Filter by the object’s `integrations` relation. */
  integrations?: InputMaybe<McpServerToManyIntegrationFilter>;
  /** Some related `integrations` exist. */
  integrationsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `isEnabled` field. */
  isEnabled?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<McpServerFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<McpServerFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** Grouping methods for `McpServer` for usage during aggregation. */
export enum McpServerGroupBy {
  Args = 'ARGS',
  Command = 'COMMAND',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Cwd = 'CWD',
  Env = 'ENV',
  IsEnabled = 'IS_ENABLED',
  Name = 'NAME',
  OrganizationId = 'ORGANIZATION_ID',
  Type = 'TYPE',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type McpServerHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type McpServerHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `McpServer` aggregates. */
export type McpServerHavingInput = {
  AND?: InputMaybe<Array<McpServerHavingInput>>;
  OR?: InputMaybe<Array<McpServerHavingInput>>;
  average?: InputMaybe<McpServerHavingAverageInput>;
  distinctCount?: InputMaybe<McpServerHavingDistinctCountInput>;
  max?: InputMaybe<McpServerHavingMaxInput>;
  min?: InputMaybe<McpServerHavingMinInput>;
  stddevPopulation?: InputMaybe<McpServerHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<McpServerHavingStddevSampleInput>;
  sum?: InputMaybe<McpServerHavingSumInput>;
  variancePopulation?: InputMaybe<McpServerHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<McpServerHavingVarianceSampleInput>;
};

export type McpServerHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type McpServerHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type McpServerHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type McpServerHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type McpServerHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type McpServerHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type McpServerHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `McpServer` */
export type McpServerInput = {
  args?: InputMaybe<Scalars['JSON']['input']>;
  command: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  cwd?: InputMaybe<Scalars['String']['input']>;
  env?: InputMaybe<Scalars['JSON']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `McpServer`. */
export enum McpServerOrderBy {
  CommandAsc = 'COMMAND_ASC',
  CommandDesc = 'COMMAND_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  CwdAsc = 'CWD_ASC',
  CwdDesc = 'CWD_DESC',
  IntegrationsCountAsc = 'INTEGRATIONS_COUNT_ASC',
  IntegrationsCountDesc = 'INTEGRATIONS_COUNT_DESC',
  IntegrationsDistinctCountAuthMethodAsc = 'INTEGRATIONS_DISTINCT_COUNT_AUTH_METHOD_ASC',
  IntegrationsDistinctCountAuthMethodDesc = 'INTEGRATIONS_DISTINCT_COUNT_AUTH_METHOD_DESC',
  IntegrationsDistinctCountConfigAsc = 'INTEGRATIONS_DISTINCT_COUNT_CONFIG_ASC',
  IntegrationsDistinctCountConfigDesc = 'INTEGRATIONS_DISTINCT_COUNT_CONFIG_DESC',
  IntegrationsDistinctCountCreatedAtAsc = 'INTEGRATIONS_DISTINCT_COUNT_CREATED_AT_ASC',
  IntegrationsDistinctCountCreatedAtDesc = 'INTEGRATIONS_DISTINCT_COUNT_CREATED_AT_DESC',
  IntegrationsDistinctCountDefinitionIdAsc = 'INTEGRATIONS_DISTINCT_COUNT_DEFINITION_ID_ASC',
  IntegrationsDistinctCountDefinitionIdDesc = 'INTEGRATIONS_DISTINCT_COUNT_DEFINITION_ID_DESC',
  IntegrationsDistinctCountIsEnabledAsc = 'INTEGRATIONS_DISTINCT_COUNT_IS_ENABLED_ASC',
  IntegrationsDistinctCountIsEnabledDesc = 'INTEGRATIONS_DISTINCT_COUNT_IS_ENABLED_DESC',
  IntegrationsDistinctCountMcpServerIdAsc = 'INTEGRATIONS_DISTINCT_COUNT_MCP_SERVER_ID_ASC',
  IntegrationsDistinctCountMcpServerIdDesc = 'INTEGRATIONS_DISTINCT_COUNT_MCP_SERVER_ID_DESC',
  IntegrationsDistinctCountNameAsc = 'INTEGRATIONS_DISTINCT_COUNT_NAME_ASC',
  IntegrationsDistinctCountNameDesc = 'INTEGRATIONS_DISTINCT_COUNT_NAME_DESC',
  IntegrationsDistinctCountOauthConnectedAtAsc = 'INTEGRATIONS_DISTINCT_COUNT_OAUTH_CONNECTED_AT_ASC',
  IntegrationsDistinctCountOauthConnectedAtDesc = 'INTEGRATIONS_DISTINCT_COUNT_OAUTH_CONNECTED_AT_DESC',
  IntegrationsDistinctCountOauthStatusAsc = 'INTEGRATIONS_DISTINCT_COUNT_OAUTH_STATUS_ASC',
  IntegrationsDistinctCountOauthStatusDesc = 'INTEGRATIONS_DISTINCT_COUNT_OAUTH_STATUS_DESC',
  IntegrationsDistinctCountOrganizationIdAsc = 'INTEGRATIONS_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  IntegrationsDistinctCountOrganizationIdDesc = 'INTEGRATIONS_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  IntegrationsDistinctCountRowIdAsc = 'INTEGRATIONS_DISTINCT_COUNT_ROW_ID_ASC',
  IntegrationsDistinctCountRowIdDesc = 'INTEGRATIONS_DISTINCT_COUNT_ROW_ID_DESC',
  IntegrationsDistinctCountTypeAsc = 'INTEGRATIONS_DISTINCT_COUNT_TYPE_ASC',
  IntegrationsDistinctCountTypeDesc = 'INTEGRATIONS_DISTINCT_COUNT_TYPE_DESC',
  IntegrationsDistinctCountUpdatedAtAsc = 'INTEGRATIONS_DISTINCT_COUNT_UPDATED_AT_ASC',
  IntegrationsDistinctCountUpdatedAtDesc = 'INTEGRATIONS_DISTINCT_COUNT_UPDATED_AT_DESC',
  IsEnabledAsc = 'IS_ENABLED_ASC',
  IsEnabledDesc = 'IS_ENABLED_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `McpServer`. Fields that are set will be updated. */
export type McpServerPatch = {
  args?: InputMaybe<Scalars['JSON']['input']>;
  command?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  cwd?: InputMaybe<Scalars['String']['input']>;
  env?: InputMaybe<Scalars['JSON']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against many `Integration` object types. All fields are combined with a logical ‘and.’ */
export type McpServerToManyIntegrationFilter = {
  /** Aggregates across related `Integration` match the filter criteria. */
  aggregates?: InputMaybe<IntegrationAggregatesFilter>;
  /** Every related `Integration` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<IntegrationFilter>;
  /** No related `Integration` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<IntegrationFilter>;
  /** Some related `Integration` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<IntegrationFilter>;
};

export enum MemberRole {
  Admin = 'admin',
  Member = 'member',
  Owner = 'owner'
}

/** A filter to be used against MemberRole fields. All fields are combined with a logical ‘and.’ */
export type MemberRoleFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<MemberRole>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<MemberRole>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<MemberRole>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<MemberRole>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<MemberRole>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<MemberRole>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<MemberRole>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<MemberRole>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<MemberRole>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<MemberRole>>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `EventRoutingRule`. */
  createEventRoutingRule?: Maybe<CreateEventRoutingRulePayload>;
  /** Creates a single `Integration`. */
  createIntegration?: Maybe<CreateIntegrationPayload>;
  /** Creates a single `IntegrationDefinition`. */
  createIntegrationDefinition?: Maybe<CreateIntegrationDefinitionPayload>;
  /** Creates a single `McpServer`. */
  createMcpServer?: Maybe<CreateMcpServerPayload>;
  /** Creates a single `OauthState`. */
  createOauthState?: Maybe<CreateOauthStatePayload>;
  /** Creates a single `OauthToken`. */
  createOauthToken?: Maybe<CreateOauthTokenPayload>;
  /** Creates a single `Plugin`. */
  createPlugin?: Maybe<CreatePluginPayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Creates a single `UserOrganization`. */
  createUserOrganization?: Maybe<CreateUserOrganizationPayload>;
  /** Creates a single `Workflow`. */
  createWorkflow?: Maybe<CreateWorkflowPayload>;
  /** Creates a single `WorkflowRun`. */
  createWorkflowRun?: Maybe<CreateWorkflowRunPayload>;
  /** Creates a single `WorkflowStepLog`. */
  createWorkflowStepLog?: Maybe<CreateWorkflowStepLogPayload>;
  /** Creates a single `WorkflowTemplate`. */
  createWorkflowTemplate?: Maybe<CreateWorkflowTemplatePayload>;
  /** Deletes a single `EventRoutingRule` using a unique key. */
  deleteEventRoutingRule?: Maybe<DeleteEventRoutingRulePayload>;
  /** Deletes a single `EventRoutingRule` using its globally unique id. */
  deleteEventRoutingRuleById?: Maybe<DeleteEventRoutingRulePayload>;
  /** Deletes a single `Integration` using a unique key. */
  deleteIntegration?: Maybe<DeleteIntegrationPayload>;
  /** Deletes a single `Integration` using its globally unique id. */
  deleteIntegrationById?: Maybe<DeleteIntegrationPayload>;
  /** Deletes a single `IntegrationDefinition` using a unique key. */
  deleteIntegrationDefinition?: Maybe<DeleteIntegrationDefinitionPayload>;
  /** Deletes a single `IntegrationDefinition` using its globally unique id. */
  deleteIntegrationDefinitionById?: Maybe<DeleteIntegrationDefinitionPayload>;
  /** Deletes a single `McpServer` using a unique key. */
  deleteMcpServer?: Maybe<DeleteMcpServerPayload>;
  /** Deletes a single `McpServer` using its globally unique id. */
  deleteMcpServerById?: Maybe<DeleteMcpServerPayload>;
  /** Deletes a single `OauthState` using a unique key. */
  deleteOauthState?: Maybe<DeleteOauthStatePayload>;
  /** Deletes a single `OauthState` using its globally unique id. */
  deleteOauthStateById?: Maybe<DeleteOauthStatePayload>;
  /** Deletes a single `OauthToken` using a unique key. */
  deleteOauthToken?: Maybe<DeleteOauthTokenPayload>;
  /** Deletes a single `OauthToken` using its globally unique id. */
  deleteOauthTokenById?: Maybe<DeleteOauthTokenPayload>;
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
  /** Deletes a single `UserOrganization` using a unique key. */
  deleteUserOrganization?: Maybe<DeleteUserOrganizationPayload>;
  /** Deletes a single `UserOrganization` using its globally unique id. */
  deleteUserOrganizationById?: Maybe<DeleteUserOrganizationPayload>;
  /** Deletes a single `UserOrganization` using a unique key. */
  deleteUserOrganizationByUserIdAndOrganizationId?: Maybe<DeleteUserOrganizationPayload>;
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
  /** Deletes a single `WorkflowTemplate` using a unique key. */
  deleteWorkflowTemplate?: Maybe<DeleteWorkflowTemplatePayload>;
  /** Deletes a single `WorkflowTemplate` using its globally unique id. */
  deleteWorkflowTemplateById?: Maybe<DeleteWorkflowTemplatePayload>;
  /**
   * Publish an event to trigger matching workflows.
   *
   * Finds event routing rules that match the event type and triggers
   * the associated workflows via Hatchet.
   */
  publishEvent?: Maybe<PublishEventPayload>;
  /** Updates a single `EventRoutingRule` using a unique key and a patch. */
  updateEventRoutingRule?: Maybe<UpdateEventRoutingRulePayload>;
  /** Updates a single `EventRoutingRule` using its globally unique id and a patch. */
  updateEventRoutingRuleById?: Maybe<UpdateEventRoutingRulePayload>;
  /** Updates a single `Integration` using a unique key and a patch. */
  updateIntegration?: Maybe<UpdateIntegrationPayload>;
  /** Updates a single `Integration` using its globally unique id and a patch. */
  updateIntegrationById?: Maybe<UpdateIntegrationPayload>;
  /** Updates a single `IntegrationDefinition` using a unique key and a patch. */
  updateIntegrationDefinition?: Maybe<UpdateIntegrationDefinitionPayload>;
  /** Updates a single `IntegrationDefinition` using its globally unique id and a patch. */
  updateIntegrationDefinitionById?: Maybe<UpdateIntegrationDefinitionPayload>;
  /** Updates a single `McpServer` using a unique key and a patch. */
  updateMcpServer?: Maybe<UpdateMcpServerPayload>;
  /** Updates a single `McpServer` using its globally unique id and a patch. */
  updateMcpServerById?: Maybe<UpdateMcpServerPayload>;
  /** Updates a single `OauthState` using a unique key and a patch. */
  updateOauthState?: Maybe<UpdateOauthStatePayload>;
  /** Updates a single `OauthState` using its globally unique id and a patch. */
  updateOauthStateById?: Maybe<UpdateOauthStatePayload>;
  /** Updates a single `OauthToken` using a unique key and a patch. */
  updateOauthToken?: Maybe<UpdateOauthTokenPayload>;
  /** Updates a single `OauthToken` using its globally unique id and a patch. */
  updateOauthTokenById?: Maybe<UpdateOauthTokenPayload>;
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
  /** Updates a single `UserOrganization` using a unique key and a patch. */
  updateUserOrganization?: Maybe<UpdateUserOrganizationPayload>;
  /** Updates a single `UserOrganization` using its globally unique id and a patch. */
  updateUserOrganizationById?: Maybe<UpdateUserOrganizationPayload>;
  /** Updates a single `UserOrganization` using a unique key and a patch. */
  updateUserOrganizationByUserIdAndOrganizationId?: Maybe<UpdateUserOrganizationPayload>;
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
  /** Updates a single `WorkflowTemplate` using a unique key and a patch. */
  updateWorkflowTemplate?: Maybe<UpdateWorkflowTemplatePayload>;
  /** Updates a single `WorkflowTemplate` using its globally unique id and a patch. */
  updateWorkflowTemplateById?: Maybe<UpdateWorkflowTemplatePayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEventRoutingRuleArgs = {
  input: CreateEventRoutingRuleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateIntegrationArgs = {
  input: CreateIntegrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateIntegrationDefinitionArgs = {
  input: CreateIntegrationDefinitionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMcpServerArgs = {
  input: CreateMcpServerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateOauthStateArgs = {
  input: CreateOauthStateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateOauthTokenArgs = {
  input: CreateOauthTokenInput;
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
export type MutationCreateUserOrganizationArgs = {
  input: CreateUserOrganizationInput;
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
export type MutationCreateWorkflowTemplateArgs = {
  input: CreateWorkflowTemplateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventRoutingRuleArgs = {
  input: DeleteEventRoutingRuleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventRoutingRuleByIdArgs = {
  input: DeleteEventRoutingRuleByIdInput;
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
export type MutationDeleteIntegrationDefinitionArgs = {
  input: DeleteIntegrationDefinitionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteIntegrationDefinitionByIdArgs = {
  input: DeleteIntegrationDefinitionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMcpServerArgs = {
  input: DeleteMcpServerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMcpServerByIdArgs = {
  input: DeleteMcpServerByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOauthStateArgs = {
  input: DeleteOauthStateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOauthStateByIdArgs = {
  input: DeleteOauthStateByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOauthTokenArgs = {
  input: DeleteOauthTokenInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOauthTokenByIdArgs = {
  input: DeleteOauthTokenByIdInput;
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
export type MutationDeleteUserOrganizationArgs = {
  input: DeleteUserOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserOrganizationByIdArgs = {
  input: DeleteUserOrganizationByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserOrganizationByUserIdAndOrganizationIdArgs = {
  input: DeleteUserOrganizationByUserIdAndOrganizationIdInput;
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
export type MutationDeleteWorkflowTemplateArgs = {
  input: DeleteWorkflowTemplateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkflowTemplateByIdArgs = {
  input: DeleteWorkflowTemplateByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationPublishEventArgs = {
  input: PublishEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventRoutingRuleArgs = {
  input: UpdateEventRoutingRuleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventRoutingRuleByIdArgs = {
  input: UpdateEventRoutingRuleByIdInput;
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
export type MutationUpdateIntegrationDefinitionArgs = {
  input: UpdateIntegrationDefinitionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateIntegrationDefinitionByIdArgs = {
  input: UpdateIntegrationDefinitionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMcpServerArgs = {
  input: UpdateMcpServerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMcpServerByIdArgs = {
  input: UpdateMcpServerByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOauthStateArgs = {
  input: UpdateOauthStateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOauthStateByIdArgs = {
  input: UpdateOauthStateByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOauthTokenArgs = {
  input: UpdateOauthTokenInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOauthTokenByIdArgs = {
  input: UpdateOauthTokenByIdInput;
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
export type MutationUpdateUserOrganizationArgs = {
  input: UpdateUserOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserOrganizationByIdArgs = {
  input: UpdateUserOrganizationByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserOrganizationByUserIdAndOrganizationIdArgs = {
  input: UpdateUserOrganizationByUserIdAndOrganizationIdInput;
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
export type MutationUpdateWorkflowTemplateArgs = {
  input: UpdateWorkflowTemplateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkflowTemplateByIdArgs = {
  input: UpdateWorkflowTemplateByIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
};

export type OauthState = Node & {
  __typename?: 'OauthState';
  codeChallenge?: Maybe<Scalars['String']['output']>;
  codeVerifier?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  definitionId: Scalars['String']['output'];
  expiresAt: Scalars['Datetime']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  organizationId: Scalars['String']['output'];
  provider: Scalars['String']['output'];
  redirectUri: Scalars['String']['output'];
  returnUrl?: Maybe<Scalars['String']['output']>;
  rowId: Scalars['UUID']['output'];
  scopes: Array<Maybe<Scalars['String']['output']>>;
  state: Scalars['String']['output'];
};

export type OauthStateAggregates = {
  __typename?: 'OauthStateAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<OauthStateDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/**
 * A condition to be used against `OauthState` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type OauthStateCondition = {
  /** Checks for equality with the object’s `codeChallenge` field. */
  codeChallenge?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `codeVerifier` field. */
  codeVerifier?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `definitionId` field. */
  definitionId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `expiresAt` field. */
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `provider` field. */
  provider?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `redirectUri` field. */
  redirectUri?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `returnUrl` field. */
  returnUrl?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `state` field. */
  state?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `OauthState` values. */
export type OauthStateConnection = {
  __typename?: 'OauthStateConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<OauthStateAggregates>;
  /** A list of edges which contains the `OauthState` and cursor to aid in pagination. */
  edges: Array<OauthStateEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<OauthStateAggregates>>;
  /** A list of `OauthState` objects. */
  nodes: Array<OauthState>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `OauthState` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `OauthState` values. */
export type OauthStateConnectionGroupedAggregatesArgs = {
  groupBy: Array<OauthStateGroupBy>;
  having?: InputMaybe<OauthStateHavingInput>;
};

export type OauthStateDistinctCountAggregates = {
  __typename?: 'OauthStateDistinctCountAggregates';
  /** Distinct count of codeChallenge across the matching connection */
  codeChallenge?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of codeVerifier across the matching connection */
  codeVerifier?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of definitionId across the matching connection */
  definitionId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of expiresAt across the matching connection */
  expiresAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of provider across the matching connection */
  provider?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of redirectUri across the matching connection */
  redirectUri?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of returnUrl across the matching connection */
  returnUrl?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of scopes across the matching connection */
  scopes?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of state across the matching connection */
  state?: Maybe<Scalars['BigInt']['output']>;
};

/** A `OauthState` edge in the connection. */
export type OauthStateEdge = {
  __typename?: 'OauthStateEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `OauthState` at the end of the edge. */
  node: OauthState;
};

/** A filter to be used against `OauthState` object types. All fields are combined with a logical ‘and.’ */
export type OauthStateFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<OauthStateFilter>>;
  /** Filter by the object’s `codeChallenge` field. */
  codeChallenge?: InputMaybe<StringFilter>;
  /** Filter by the object’s `codeVerifier` field. */
  codeVerifier?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `definitionId` field. */
  definitionId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `expiresAt` field. */
  expiresAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<OauthStateFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<OauthStateFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `provider` field. */
  provider?: InputMaybe<StringFilter>;
  /** Filter by the object’s `redirectUri` field. */
  redirectUri?: InputMaybe<StringFilter>;
  /** Filter by the object’s `returnUrl` field. */
  returnUrl?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `scopes` field. */
  scopes?: InputMaybe<StringListFilter>;
  /** Filter by the object’s `state` field. */
  state?: InputMaybe<StringFilter>;
};

/** Grouping methods for `OauthState` for usage during aggregation. */
export enum OauthStateGroupBy {
  CodeChallenge = 'CODE_CHALLENGE',
  CodeVerifier = 'CODE_VERIFIER',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  DefinitionId = 'DEFINITION_ID',
  ExpiresAt = 'EXPIRES_AT',
  ExpiresAtTruncatedToDay = 'EXPIRES_AT_TRUNCATED_TO_DAY',
  ExpiresAtTruncatedToHour = 'EXPIRES_AT_TRUNCATED_TO_HOUR',
  OrganizationId = 'ORGANIZATION_ID',
  Provider = 'PROVIDER',
  RedirectUri = 'REDIRECT_URI',
  ReturnUrl = 'RETURN_URL',
  Scopes = 'SCOPES',
  State = 'STATE'
}

export type OauthStateHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OauthStateHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `OauthState` aggregates. */
export type OauthStateHavingInput = {
  AND?: InputMaybe<Array<OauthStateHavingInput>>;
  OR?: InputMaybe<Array<OauthStateHavingInput>>;
  average?: InputMaybe<OauthStateHavingAverageInput>;
  distinctCount?: InputMaybe<OauthStateHavingDistinctCountInput>;
  max?: InputMaybe<OauthStateHavingMaxInput>;
  min?: InputMaybe<OauthStateHavingMinInput>;
  stddevPopulation?: InputMaybe<OauthStateHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<OauthStateHavingStddevSampleInput>;
  sum?: InputMaybe<OauthStateHavingSumInput>;
  variancePopulation?: InputMaybe<OauthStateHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<OauthStateHavingVarianceSampleInput>;
};

export type OauthStateHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OauthStateHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OauthStateHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OauthStateHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OauthStateHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OauthStateHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OauthStateHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `OauthState` */
export type OauthStateInput = {
  codeChallenge?: InputMaybe<Scalars['String']['input']>;
  codeVerifier?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  definitionId: Scalars['String']['input'];
  expiresAt: Scalars['Datetime']['input'];
  organizationId: Scalars['String']['input'];
  provider: Scalars['String']['input'];
  redirectUri: Scalars['String']['input'];
  returnUrl?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  scopes: Array<InputMaybe<Scalars['String']['input']>>;
  state: Scalars['String']['input'];
};

/** Methods to use when ordering `OauthState`. */
export enum OauthStateOrderBy {
  CodeChallengeAsc = 'CODE_CHALLENGE_ASC',
  CodeChallengeDesc = 'CODE_CHALLENGE_DESC',
  CodeVerifierAsc = 'CODE_VERIFIER_ASC',
  CodeVerifierDesc = 'CODE_VERIFIER_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DefinitionIdAsc = 'DEFINITION_ID_ASC',
  DefinitionIdDesc = 'DEFINITION_ID_DESC',
  ExpiresAtAsc = 'EXPIRES_AT_ASC',
  ExpiresAtDesc = 'EXPIRES_AT_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProviderAsc = 'PROVIDER_ASC',
  ProviderDesc = 'PROVIDER_DESC',
  RedirectUriAsc = 'REDIRECT_URI_ASC',
  RedirectUriDesc = 'REDIRECT_URI_DESC',
  ReturnUrlAsc = 'RETURN_URL_ASC',
  ReturnUrlDesc = 'RETURN_URL_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StateAsc = 'STATE_ASC',
  StateDesc = 'STATE_DESC'
}

/** Represents an update to a `OauthState`. Fields that are set will be updated. */
export type OauthStatePatch = {
  codeChallenge?: InputMaybe<Scalars['String']['input']>;
  codeVerifier?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  definitionId?: InputMaybe<Scalars['String']['input']>;
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  redirectUri?: InputMaybe<Scalars['String']['input']>;
  returnUrl?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  scopes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type OauthToken = Node & {
  __typename?: 'OauthToken';
  accessToken: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  expiresAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Integration` that is related to this `OauthToken`. */
  integration?: Maybe<Integration>;
  integrationId: Scalars['UUID']['output'];
  organizationId: Scalars['String']['output'];
  provider: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  rowId: Scalars['UUID']['output'];
  scope: Scalars['String']['output'];
  tokenType: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

export type OauthTokenAggregates = {
  __typename?: 'OauthTokenAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<OauthTokenDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `OauthToken` object types. */
export type OauthTokenAggregatesFilter = {
  /** Distinct count aggregate over matching `OauthToken` objects. */
  distinctCount?: InputMaybe<OauthTokenDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `OauthToken` object to be included within the aggregate. */
  filter?: InputMaybe<OauthTokenFilter>;
};

/**
 * A condition to be used against `OauthToken` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type OauthTokenCondition = {
  /** Checks for equality with the object’s `accessToken` field. */
  accessToken?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `expiresAt` field. */
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `integrationId` field. */
  integrationId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `provider` field. */
  provider?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `refreshToken` field. */
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `scope` field. */
  scope?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `tokenType` field. */
  tokenType?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `OauthToken` values. */
export type OauthTokenConnection = {
  __typename?: 'OauthTokenConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<OauthTokenAggregates>;
  /** A list of edges which contains the `OauthToken` and cursor to aid in pagination. */
  edges: Array<OauthTokenEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<OauthTokenAggregates>>;
  /** A list of `OauthToken` objects. */
  nodes: Array<OauthToken>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `OauthToken` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `OauthToken` values. */
export type OauthTokenConnectionGroupedAggregatesArgs = {
  groupBy: Array<OauthTokenGroupBy>;
  having?: InputMaybe<OauthTokenHavingInput>;
};

export type OauthTokenDistinctCountAggregateFilter = {
  accessToken?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  expiresAt?: InputMaybe<BigIntFilter>;
  integrationId?: InputMaybe<BigIntFilter>;
  organizationId?: InputMaybe<BigIntFilter>;
  provider?: InputMaybe<BigIntFilter>;
  refreshToken?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  scope?: InputMaybe<BigIntFilter>;
  tokenType?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
};

export type OauthTokenDistinctCountAggregates = {
  __typename?: 'OauthTokenDistinctCountAggregates';
  /** Distinct count of accessToken across the matching connection */
  accessToken?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of expiresAt across the matching connection */
  expiresAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of integrationId across the matching connection */
  integrationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of provider across the matching connection */
  provider?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of refreshToken across the matching connection */
  refreshToken?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of scope across the matching connection */
  scope?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of tokenType across the matching connection */
  tokenType?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
};

/** A `OauthToken` edge in the connection. */
export type OauthTokenEdge = {
  __typename?: 'OauthTokenEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `OauthToken` at the end of the edge. */
  node: OauthToken;
};

/** A filter to be used against `OauthToken` object types. All fields are combined with a logical ‘and.’ */
export type OauthTokenFilter = {
  /** Filter by the object’s `accessToken` field. */
  accessToken?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<OauthTokenFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `expiresAt` field. */
  expiresAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `integration` relation. */
  integration?: InputMaybe<IntegrationFilter>;
  /** Filter by the object’s `integrationId` field. */
  integrationId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<OauthTokenFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<OauthTokenFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `provider` field. */
  provider?: InputMaybe<StringFilter>;
  /** Filter by the object’s `refreshToken` field. */
  refreshToken?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `scope` field. */
  scope?: InputMaybe<StringFilter>;
  /** Filter by the object’s `tokenType` field. */
  tokenType?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** Grouping methods for `OauthToken` for usage during aggregation. */
export enum OauthTokenGroupBy {
  AccessToken = 'ACCESS_TOKEN',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  ExpiresAt = 'EXPIRES_AT',
  ExpiresAtTruncatedToDay = 'EXPIRES_AT_TRUNCATED_TO_DAY',
  ExpiresAtTruncatedToHour = 'EXPIRES_AT_TRUNCATED_TO_HOUR',
  IntegrationId = 'INTEGRATION_ID',
  OrganizationId = 'ORGANIZATION_ID',
  Provider = 'PROVIDER',
  RefreshToken = 'REFRESH_TOKEN',
  Scope = 'SCOPE',
  TokenType = 'TOKEN_TYPE',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type OauthTokenHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OauthTokenHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `OauthToken` aggregates. */
export type OauthTokenHavingInput = {
  AND?: InputMaybe<Array<OauthTokenHavingInput>>;
  OR?: InputMaybe<Array<OauthTokenHavingInput>>;
  average?: InputMaybe<OauthTokenHavingAverageInput>;
  distinctCount?: InputMaybe<OauthTokenHavingDistinctCountInput>;
  max?: InputMaybe<OauthTokenHavingMaxInput>;
  min?: InputMaybe<OauthTokenHavingMinInput>;
  stddevPopulation?: InputMaybe<OauthTokenHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<OauthTokenHavingStddevSampleInput>;
  sum?: InputMaybe<OauthTokenHavingSumInput>;
  variancePopulation?: InputMaybe<OauthTokenHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<OauthTokenHavingVarianceSampleInput>;
};

export type OauthTokenHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OauthTokenHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OauthTokenHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OauthTokenHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OauthTokenHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OauthTokenHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type OauthTokenHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  expiresAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `OauthToken` */
export type OauthTokenInput = {
  accessToken: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  integrationId: Scalars['UUID']['input'];
  organizationId: Scalars['String']['input'];
  provider: Scalars['String']['input'];
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  scope: Scalars['String']['input'];
  tokenType?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `OauthToken`. */
export enum OauthTokenOrderBy {
  AccessTokenAsc = 'ACCESS_TOKEN_ASC',
  AccessTokenDesc = 'ACCESS_TOKEN_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  ExpiresAtAsc = 'EXPIRES_AT_ASC',
  ExpiresAtDesc = 'EXPIRES_AT_DESC',
  IntegrationIdAsc = 'INTEGRATION_ID_ASC',
  IntegrationIdDesc = 'INTEGRATION_ID_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProviderAsc = 'PROVIDER_ASC',
  ProviderDesc = 'PROVIDER_DESC',
  RefreshTokenAsc = 'REFRESH_TOKEN_ASC',
  RefreshTokenDesc = 'REFRESH_TOKEN_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  ScopeAsc = 'SCOPE_ASC',
  ScopeDesc = 'SCOPE_DESC',
  TokenTypeAsc = 'TOKEN_TYPE_ASC',
  TokenTypeDesc = 'TOKEN_TYPE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `OauthToken`. Fields that are set will be updated. */
export type OauthTokenPatch = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  integrationId?: InputMaybe<Scalars['UUID']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  tokenType?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export enum OrganizationType {
  Personal = 'personal',
  Team = 'team'
}

/** A filter to be used against OrganizationType fields. All fields are combined with a logical ‘and.’ */
export type OrganizationTypeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<OrganizationType>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<OrganizationType>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<OrganizationType>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<OrganizationType>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<OrganizationType>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<OrganizationType>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<OrganizationType>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<OrganizationType>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<OrganizationType>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<OrganizationType>>;
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
  organizationId: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  version: Scalars['String']['output'];
  wasmHash: Scalars['String']['output'];
  wasmUrl: Scalars['String']['output'];
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
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
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
  organizationId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  version?: InputMaybe<BigIntFilter>;
  wasmHash?: InputMaybe<BigIntFilter>;
  wasmUrl?: InputMaybe<BigIntFilter>;
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
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
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
  OrganizationId = 'ORGANIZATION_ID',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  Version = 'VERSION',
  WasmHash = 'WASM_HASH',
  WasmUrl = 'WASM_URL'
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
  organizationId: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  version: Scalars['String']['input'];
  wasmHash: Scalars['String']['input'];
  wasmUrl: Scalars['String']['input'];
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
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
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
  WasmUrlDesc = 'WASM_URL_DESC'
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
  organizationId?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
  wasmHash?: InputMaybe<Scalars['String']['input']>;
  wasmUrl?: InputMaybe<Scalars['String']['input']>;
};

/** Input for publishing an event to trigger workflows */
export type PublishEventInput = {
  /** Optional correlation ID for tracing related events */
  correlationId?: InputMaybe<Scalars['String']['input']>;
  /** Event data payload as JSON */
  data?: InputMaybe<Scalars['JSON']['input']>;
  /** Optional idempotency key for deduplication */
  idempotencyKey?: InputMaybe<Scalars['String']['input']>;
  /** Organization ID that owns the event routing rules */
  organizationId: Scalars['String']['input'];
  /** Optional event subject (e.g., user ID, subscription ID) */
  subject?: InputMaybe<Scalars['String']['input']>;
  /** Event type (e.g., "user.created", "subscription.updated") */
  type: Scalars['String']['input'];
};

/** Result of publishing an event */
export type PublishEventPayload = {
  __typename?: 'PublishEventPayload';
  /** Unique ID for this event (UUID) */
  eventId: Scalars['UUID']['output'];
  /** List of workflows that were triggered by this event */
  workflowsTriggered: Array<TriggeredWorkflow>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Get a single `EventRoutingRule`. */
  eventRoutingRule?: Maybe<EventRoutingRule>;
  /** Reads a single `EventRoutingRule` using its globally unique `ID`. */
  eventRoutingRuleById?: Maybe<EventRoutingRule>;
  /** Reads and enables pagination through a set of `EventRoutingRule`. */
  eventRoutingRules?: Maybe<EventRoutingRuleConnection>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  id: Scalars['ID']['output'];
  /** Get a single `Integration`. */
  integration?: Maybe<Integration>;
  /** Reads a single `Integration` using its globally unique `ID`. */
  integrationById?: Maybe<Integration>;
  /** Get a single `IntegrationDefinition`. */
  integrationDefinition?: Maybe<IntegrationDefinition>;
  /** Reads a single `IntegrationDefinition` using its globally unique `ID`. */
  integrationDefinitionById?: Maybe<IntegrationDefinition>;
  /** Reads and enables pagination through a set of `IntegrationDefinition`. */
  integrationDefinitions?: Maybe<IntegrationDefinitionConnection>;
  /** Reads and enables pagination through a set of `Integration`. */
  integrations?: Maybe<IntegrationConnection>;
  /** Get a single `McpServer`. */
  mcpServer?: Maybe<McpServer>;
  /** Reads a single `McpServer` using its globally unique `ID`. */
  mcpServerById?: Maybe<McpServer>;
  /** Reads and enables pagination through a set of `McpServer`. */
  mcpServers?: Maybe<McpServerConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Get a single `OauthState`. */
  oauthState?: Maybe<OauthState>;
  /** Reads a single `OauthState` using its globally unique `ID`. */
  oauthStateById?: Maybe<OauthState>;
  /** Reads and enables pagination through a set of `OauthState`. */
  oauthStates?: Maybe<OauthStateConnection>;
  /** Get a single `OauthToken`. */
  oauthToken?: Maybe<OauthToken>;
  /** Reads a single `OauthToken` using its globally unique `ID`. */
  oauthTokenById?: Maybe<OauthToken>;
  /** Reads and enables pagination through a set of `OauthToken`. */
  oauthTokens?: Maybe<OauthTokenConnection>;
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
  /** Get a single `UserOrganization`. */
  userOrganization?: Maybe<UserOrganization>;
  /** Reads a single `UserOrganization` using its globally unique `ID`. */
  userOrganizationById?: Maybe<UserOrganization>;
  /** Get a single `UserOrganization`. */
  userOrganizationByUserIdAndOrganizationId?: Maybe<UserOrganization>;
  /** Reads and enables pagination through a set of `UserOrganization`. */
  userOrganizations?: Maybe<UserOrganizationConnection>;
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
  /** Get a single `WorkflowTemplate`. */
  workflowTemplate?: Maybe<WorkflowTemplate>;
  /** Reads a single `WorkflowTemplate` using its globally unique `ID`. */
  workflowTemplateById?: Maybe<WorkflowTemplate>;
  /** Reads and enables pagination through a set of `WorkflowTemplate`. */
  workflowTemplates?: Maybe<WorkflowTemplateConnection>;
  /** Reads and enables pagination through a set of `Workflow`. */
  workflows?: Maybe<WorkflowConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEventRoutingRuleArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventRoutingRuleByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventRoutingRulesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EventRoutingRuleCondition>;
  filter?: InputMaybe<EventRoutingRuleFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventRoutingRuleOrderBy>>;
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
export type QueryIntegrationDefinitionArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryIntegrationDefinitionByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryIntegrationDefinitionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<IntegrationDefinitionCondition>;
  filter?: InputMaybe<IntegrationDefinitionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<IntegrationDefinitionOrderBy>>;
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
export type QueryMcpServerArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMcpServerByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMcpServersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<McpServerCondition>;
  filter?: InputMaybe<McpServerFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<McpServerOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOauthStateArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOauthStateByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOauthStatesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<OauthStateCondition>;
  filter?: InputMaybe<OauthStateFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OauthStateOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryOauthTokenArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOauthTokenByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOauthTokensArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<OauthTokenCondition>;
  filter?: InputMaybe<OauthTokenFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OauthTokenOrderBy>>;
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
export type QueryUserOrganizationArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserOrganizationByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserOrganizationByUserIdAndOrganizationIdArgs = {
  organizationId: Scalars['String']['input'];
  userId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserOrganizationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserOrganizationCondition>;
  filter?: InputMaybe<UserOrganizationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserOrganizationOrderBy>>;
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
export type QueryWorkflowTemplateArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkflowTemplateByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkflowTemplatesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkflowTemplateCondition>;
  filter?: InputMaybe<WorkflowTemplateFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkflowTemplateOrderBy>>;
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

/** A filter to be used against String List fields. All fields are combined with a logical ‘and.’ */
export type StringListFilter = {
  /** Any array item is equal to the specified value. */
  anyEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Any array item is greater than the specified value. */
  anyGreaterThan?: InputMaybe<Scalars['String']['input']>;
  /** Any array item is greater than or equal to the specified value. */
  anyGreaterThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Any array item is less than the specified value. */
  anyLessThan?: InputMaybe<Scalars['String']['input']>;
  /** Any array item is less than or equal to the specified value. */
  anyLessThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Any array item is not equal to the specified value. */
  anyNotEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Contained by the specified list of values. */
  containedBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Contains the specified list of values. */
  contains?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Overlaps the specified list of values. */
  overlaps?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Information about a workflow that was triggered by an event */
export type TriggeredWorkflow = {
  __typename?: 'TriggeredWorkflow';
  /** ID of the workflow run */
  runId: Scalars['UUID']['output'];
  /** Status of the triggered workflow run */
  status: Scalars['String']['output'];
  /** ID of the workflow that was triggered */
  workflowId: Scalars['UUID']['output'];
  /** Name of the workflow */
  workflowName: Scalars['String']['output'];
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

/** All input for the `updateEventRoutingRuleById` mutation. */
export type UpdateEventRoutingRuleByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `EventRoutingRule` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `EventRoutingRule` being updated. */
  patch: EventRoutingRulePatch;
};

/** All input for the `updateEventRoutingRule` mutation. */
export type UpdateEventRoutingRuleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `EventRoutingRule` being updated. */
  patch: EventRoutingRulePatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `EventRoutingRule` mutation. */
export type UpdateEventRoutingRulePayload = {
  __typename?: 'UpdateEventRoutingRulePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `EventRoutingRule` that was updated by this mutation. */
  eventRoutingRule?: Maybe<EventRoutingRule>;
  /** An edge for our `EventRoutingRule`. May be used by Relay 1. */
  eventRoutingRuleEdge?: Maybe<EventRoutingRuleEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `EventRoutingRule` mutation. */
export type UpdateEventRoutingRulePayloadEventRoutingRuleEdgeArgs = {
  orderBy?: Array<EventRoutingRuleOrderBy>;
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

/** All input for the `updateIntegrationDefinitionById` mutation. */
export type UpdateIntegrationDefinitionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `IntegrationDefinition` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `IntegrationDefinition` being updated. */
  patch: IntegrationDefinitionPatch;
};

/** All input for the `updateIntegrationDefinition` mutation. */
export type UpdateIntegrationDefinitionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `IntegrationDefinition` being updated. */
  patch: IntegrationDefinitionPatch;
  rowId: Scalars['String']['input'];
};

/** The output of our update `IntegrationDefinition` mutation. */
export type UpdateIntegrationDefinitionPayload = {
  __typename?: 'UpdateIntegrationDefinitionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `IntegrationDefinition` that was updated by this mutation. */
  integrationDefinition?: Maybe<IntegrationDefinition>;
  /** An edge for our `IntegrationDefinition`. May be used by Relay 1. */
  integrationDefinitionEdge?: Maybe<IntegrationDefinitionEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `IntegrationDefinition` mutation. */
export type UpdateIntegrationDefinitionPayloadIntegrationDefinitionEdgeArgs = {
  orderBy?: Array<IntegrationDefinitionOrderBy>;
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

/** All input for the `updateMcpServerById` mutation. */
export type UpdateMcpServerByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `McpServer` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `McpServer` being updated. */
  patch: McpServerPatch;
};

/** All input for the `updateMcpServer` mutation. */
export type UpdateMcpServerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `McpServer` being updated. */
  patch: McpServerPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `McpServer` mutation. */
export type UpdateMcpServerPayload = {
  __typename?: 'UpdateMcpServerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `McpServer` that was updated by this mutation. */
  mcpServer?: Maybe<McpServer>;
  /** An edge for our `McpServer`. May be used by Relay 1. */
  mcpServerEdge?: Maybe<McpServerEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `McpServer` mutation. */
export type UpdateMcpServerPayloadMcpServerEdgeArgs = {
  orderBy?: Array<McpServerOrderBy>;
};

/** All input for the `updateOauthStateById` mutation. */
export type UpdateOauthStateByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `OauthState` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `OauthState` being updated. */
  patch: OauthStatePatch;
};

/** All input for the `updateOauthState` mutation. */
export type UpdateOauthStateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `OauthState` being updated. */
  patch: OauthStatePatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `OauthState` mutation. */
export type UpdateOauthStatePayload = {
  __typename?: 'UpdateOauthStatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `OauthState` that was updated by this mutation. */
  oauthState?: Maybe<OauthState>;
  /** An edge for our `OauthState`. May be used by Relay 1. */
  oauthStateEdge?: Maybe<OauthStateEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `OauthState` mutation. */
export type UpdateOauthStatePayloadOauthStateEdgeArgs = {
  orderBy?: Array<OauthStateOrderBy>;
};

/** All input for the `updateOauthTokenById` mutation. */
export type UpdateOauthTokenByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `OauthToken` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `OauthToken` being updated. */
  patch: OauthTokenPatch;
};

/** All input for the `updateOauthToken` mutation. */
export type UpdateOauthTokenInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `OauthToken` being updated. */
  patch: OauthTokenPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `OauthToken` mutation. */
export type UpdateOauthTokenPayload = {
  __typename?: 'UpdateOauthTokenPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `OauthToken` that was updated by this mutation. */
  oauthToken?: Maybe<OauthToken>;
  /** An edge for our `OauthToken`. May be used by Relay 1. */
  oauthTokenEdge?: Maybe<OauthTokenEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `OauthToken` mutation. */
export type UpdateOauthTokenPayloadOauthTokenEdgeArgs = {
  orderBy?: Array<OauthTokenOrderBy>;
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

/** All input for the `updateUserOrganizationById` mutation. */
export type UpdateUserOrganizationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `UserOrganization` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `UserOrganization` being updated. */
  patch: UserOrganizationPatch;
};

/** All input for the `updateUserOrganizationByUserIdAndOrganizationId` mutation. */
export type UpdateUserOrganizationByUserIdAndOrganizationIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `UserOrganization` being updated. */
  patch: UserOrganizationPatch;
  userId: Scalars['UUID']['input'];
};

/** All input for the `updateUserOrganization` mutation. */
export type UpdateUserOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `UserOrganization` being updated. */
  patch: UserOrganizationPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `UserOrganization` mutation. */
export type UpdateUserOrganizationPayload = {
  __typename?: 'UpdateUserOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `UserOrganization` that was updated by this mutation. */
  userOrganization?: Maybe<UserOrganization>;
  /** An edge for our `UserOrganization`. May be used by Relay 1. */
  userOrganizationEdge?: Maybe<UserOrganizationEdge>;
};


/** The output of our update `UserOrganization` mutation. */
export type UpdateUserOrganizationPayloadUserOrganizationEdgeArgs = {
  orderBy?: Array<UserOrganizationOrderBy>;
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

/** All input for the `updateWorkflowTemplateById` mutation. */
export type UpdateWorkflowTemplateByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `WorkflowTemplate` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `WorkflowTemplate` being updated. */
  patch: WorkflowTemplatePatch;
};

/** All input for the `updateWorkflowTemplate` mutation. */
export type UpdateWorkflowTemplateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `WorkflowTemplate` being updated. */
  patch: WorkflowTemplatePatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `WorkflowTemplate` mutation. */
export type UpdateWorkflowTemplatePayload = {
  __typename?: 'UpdateWorkflowTemplatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `WorkflowTemplate` that was updated by this mutation. */
  workflowTemplate?: Maybe<WorkflowTemplate>;
  /** An edge for our `WorkflowTemplate`. May be used by Relay 1. */
  workflowTemplateEdge?: Maybe<WorkflowTemplateEdge>;
};


/** The output of our update `WorkflowTemplate` mutation. */
export type UpdateWorkflowTemplatePayloadWorkflowTemplateEdgeArgs = {
  orderBy?: Array<WorkflowTemplateOrderBy>;
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
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `UserOrganization`. */
  userOrganizations: UserOrganizationConnection;
  /** Reads and enables pagination through a set of `Workflow`. */
  workflowsByCreatedBy: WorkflowConnection;
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


export type UserUserOrganizationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserOrganizationCondition>;
  filter?: InputMaybe<UserOrganizationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserOrganizationOrderBy>>;
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
  /** Filter by the object’s `userOrganizations` relation. */
  userOrganizations?: InputMaybe<UserToManyUserOrganizationFilter>;
  /** Some related `userOrganizations` exist. */
  userOrganizationsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `workflowsByCreatedBy` relation. */
  workflowsByCreatedBy?: InputMaybe<UserToManyWorkflowFilter>;
  /** Some related `workflowsByCreatedBy` exist. */
  workflowsByCreatedByExist?: InputMaybe<Scalars['Boolean']['input']>;
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
  AuthoredPluginsDistinctCountOrganizationIdAsc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  AuthoredPluginsDistinctCountOrganizationIdDesc = 'AUTHORED_PLUGINS_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
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
  AvatarUrlAsc = 'AVATAR_URL_ASC',
  AvatarUrlDesc = 'AVATAR_URL_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  IdentityProviderIdAsc = 'IDENTITY_PROVIDER_ID_ASC',
  IdentityProviderIdDesc = 'IDENTITY_PROVIDER_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserOrganizationsCountAsc = 'USER_ORGANIZATIONS_COUNT_ASC',
  UserOrganizationsCountDesc = 'USER_ORGANIZATIONS_COUNT_DESC',
  UserOrganizationsDistinctCountCreatedAtAsc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_CREATED_AT_ASC',
  UserOrganizationsDistinctCountCreatedAtDesc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_CREATED_AT_DESC',
  UserOrganizationsDistinctCountNameAsc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_NAME_ASC',
  UserOrganizationsDistinctCountNameDesc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_NAME_DESC',
  UserOrganizationsDistinctCountOrganizationIdAsc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  UserOrganizationsDistinctCountOrganizationIdDesc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  UserOrganizationsDistinctCountRoleAsc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_ROLE_ASC',
  UserOrganizationsDistinctCountRoleDesc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_ROLE_DESC',
  UserOrganizationsDistinctCountRowIdAsc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_ROW_ID_ASC',
  UserOrganizationsDistinctCountRowIdDesc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_ROW_ID_DESC',
  UserOrganizationsDistinctCountSlugAsc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_SLUG_ASC',
  UserOrganizationsDistinctCountSlugDesc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_SLUG_DESC',
  UserOrganizationsDistinctCountSyncedAtAsc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_SYNCED_AT_ASC',
  UserOrganizationsDistinctCountSyncedAtDesc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_SYNCED_AT_DESC',
  UserOrganizationsDistinctCountTypeAsc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_TYPE_ASC',
  UserOrganizationsDistinctCountTypeDesc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_TYPE_DESC',
  UserOrganizationsDistinctCountUpdatedAtAsc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_UPDATED_AT_ASC',
  UserOrganizationsDistinctCountUpdatedAtDesc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_UPDATED_AT_DESC',
  UserOrganizationsDistinctCountUserIdAsc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_USER_ID_ASC',
  UserOrganizationsDistinctCountUserIdDesc = 'USER_ORGANIZATIONS_DISTINCT_COUNT_USER_ID_DESC',
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
  WorkflowsByCreatedByDistinctCountOrganizationIdAsc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  WorkflowsByCreatedByDistinctCountOrganizationIdDesc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  WorkflowsByCreatedByDistinctCountRowIdAsc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_ROW_ID_ASC',
  WorkflowsByCreatedByDistinctCountRowIdDesc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_ROW_ID_DESC',
  WorkflowsByCreatedByDistinctCountUpdatedAtAsc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_UPDATED_AT_ASC',
  WorkflowsByCreatedByDistinctCountUpdatedAtDesc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_UPDATED_AT_DESC',
  WorkflowsByCreatedByDistinctCountWebhookSecretAsc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_WEBHOOK_SECRET_ASC',
  WorkflowsByCreatedByDistinctCountWebhookSecretDesc = 'WORKFLOWS_BY_CREATED_BY_DISTINCT_COUNT_WEBHOOK_SECRET_DESC'
}

export type UserOrganization = Node & {
  __typename?: 'UserOrganization';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  organizationId: Scalars['String']['output'];
  role: MemberRole;
  rowId: Scalars['UUID']['output'];
  slug: Scalars['String']['output'];
  syncedAt?: Maybe<Scalars['Datetime']['output']>;
  type: OrganizationType;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `User` that is related to this `UserOrganization`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
};

export type UserOrganizationAggregates = {
  __typename?: 'UserOrganizationAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<UserOrganizationDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `UserOrganization` object types. */
export type UserOrganizationAggregatesFilter = {
  /** Distinct count aggregate over matching `UserOrganization` objects. */
  distinctCount?: InputMaybe<UserOrganizationDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `UserOrganization` object to be included within the aggregate. */
  filter?: InputMaybe<UserOrganizationFilter>;
};

/**
 * A condition to be used against `UserOrganization` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type UserOrganizationCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `role` field. */
  role?: InputMaybe<MemberRole>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `syncedAt` field. */
  syncedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<OrganizationType>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `UserOrganization` values. */
export type UserOrganizationConnection = {
  __typename?: 'UserOrganizationConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<UserOrganizationAggregates>;
  /** A list of edges which contains the `UserOrganization` and cursor to aid in pagination. */
  edges: Array<UserOrganizationEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<UserOrganizationAggregates>>;
  /** A list of `UserOrganization` objects. */
  nodes: Array<UserOrganization>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserOrganization` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `UserOrganization` values. */
export type UserOrganizationConnectionGroupedAggregatesArgs = {
  groupBy: Array<UserOrganizationGroupBy>;
  having?: InputMaybe<UserOrganizationHavingInput>;
};

export type UserOrganizationDistinctCountAggregateFilter = {
  createdAt?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<BigIntFilter>;
  organizationId?: InputMaybe<BigIntFilter>;
  role?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  slug?: InputMaybe<BigIntFilter>;
  syncedAt?: InputMaybe<BigIntFilter>;
  type?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  userId?: InputMaybe<BigIntFilter>;
};

export type UserOrganizationDistinctCountAggregates = {
  __typename?: 'UserOrganizationDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of role across the matching connection */
  role?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of slug across the matching connection */
  slug?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of syncedAt across the matching connection */
  syncedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of type across the matching connection */
  type?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of userId across the matching connection */
  userId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `UserOrganization` edge in the connection. */
export type UserOrganizationEdge = {
  __typename?: 'UserOrganizationEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `UserOrganization` at the end of the edge. */
  node: UserOrganization;
};

/** A filter to be used against `UserOrganization` object types. All fields are combined with a logical ‘and.’ */
export type UserOrganizationFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UserOrganizationFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<UserOrganizationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UserOrganizationFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `role` field. */
  role?: InputMaybe<MemberRoleFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
  /** Filter by the object’s `syncedAt` field. */
  syncedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<OrganizationTypeFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `UserOrganization` for usage during aggregation. */
export enum UserOrganizationGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Name = 'NAME',
  OrganizationId = 'ORGANIZATION_ID',
  Role = 'ROLE',
  Slug = 'SLUG',
  SyncedAt = 'SYNCED_AT',
  SyncedAtTruncatedToDay = 'SYNCED_AT_TRUNCATED_TO_DAY',
  SyncedAtTruncatedToHour = 'SYNCED_AT_TRUNCATED_TO_HOUR',
  Type = 'TYPE',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  UserId = 'USER_ID'
}

export type UserOrganizationHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  syncedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserOrganizationHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  syncedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `UserOrganization` aggregates. */
export type UserOrganizationHavingInput = {
  AND?: InputMaybe<Array<UserOrganizationHavingInput>>;
  OR?: InputMaybe<Array<UserOrganizationHavingInput>>;
  average?: InputMaybe<UserOrganizationHavingAverageInput>;
  distinctCount?: InputMaybe<UserOrganizationHavingDistinctCountInput>;
  max?: InputMaybe<UserOrganizationHavingMaxInput>;
  min?: InputMaybe<UserOrganizationHavingMinInput>;
  stddevPopulation?: InputMaybe<UserOrganizationHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<UserOrganizationHavingStddevSampleInput>;
  sum?: InputMaybe<UserOrganizationHavingSumInput>;
  variancePopulation?: InputMaybe<UserOrganizationHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<UserOrganizationHavingVarianceSampleInput>;
};

export type UserOrganizationHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  syncedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserOrganizationHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  syncedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserOrganizationHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  syncedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserOrganizationHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  syncedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserOrganizationHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  syncedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserOrganizationHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  syncedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserOrganizationHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  syncedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `UserOrganization` */
export type UserOrganizationInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['String']['input'];
  role?: InputMaybe<MemberRole>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  slug: Scalars['String']['input'];
  syncedAt?: InputMaybe<Scalars['Datetime']['input']>;
  type?: InputMaybe<OrganizationType>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId: Scalars['UUID']['input'];
};

/** Methods to use when ordering `UserOrganization`. */
export enum UserOrganizationOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  SyncedAtAsc = 'SYNCED_AT_ASC',
  SyncedAtDesc = 'SYNCED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Represents an update to a `UserOrganization`. Fields that are set will be updated. */
export type UserOrganizationPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<MemberRole>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  syncedAt?: InputMaybe<Scalars['Datetime']['input']>;
  type?: InputMaybe<OrganizationType>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

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

/** A filter to be used against many `UserOrganization` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyUserOrganizationFilter = {
  /** Aggregates across related `UserOrganization` match the filter criteria. */
  aggregates?: InputMaybe<UserOrganizationAggregatesFilter>;
  /** Every related `UserOrganization` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<UserOrganizationFilter>;
  /** No related `UserOrganization` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<UserOrganizationFilter>;
  /** Some related `UserOrganization` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<UserOrganizationFilter>;
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

export type Workflow = Node & {
  __typename?: 'Workflow';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  createdBy?: Maybe<Scalars['UUID']['output']>;
  cronExpression?: Maybe<Scalars['String']['output']>;
  definition: Scalars['JSON']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `EventRoutingRule`. */
  eventRoutingRules: EventRoutingRuleConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lastRunAt?: Maybe<Scalars['Datetime']['output']>;
  lastRunStatus?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  organizationId: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `User` that is related to this `Workflow`. */
  user?: Maybe<User>;
  webhookSecret?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `WorkflowRun`. */
  workflowRuns: WorkflowRunConnection;
};


export type WorkflowEventRoutingRulesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EventRoutingRuleCondition>;
  filter?: InputMaybe<EventRoutingRuleFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventRoutingRuleOrderBy>>;
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
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `webhookSecret` field. */
  webhookSecret?: InputMaybe<Scalars['String']['input']>;
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
  organizationId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  webhookSecret?: InputMaybe<BigIntFilter>;
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
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of webhookSecret across the matching connection */
  webhookSecret?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `eventRoutingRules` relation. */
  eventRoutingRules?: InputMaybe<WorkflowToManyEventRoutingRuleFilter>;
  /** Some related `eventRoutingRules` exist. */
  eventRoutingRulesExist?: InputMaybe<Scalars['Boolean']['input']>;
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
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
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
  OrganizationId = 'ORGANIZATION_ID',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  WebhookSecret = 'WEBHOOK_SECRET'
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
  organizationId: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  webhookSecret?: InputMaybe<Scalars['String']['input']>;
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
  EventRoutingRulesAveragePriorityAsc = 'EVENT_ROUTING_RULES_AVERAGE_PRIORITY_ASC',
  EventRoutingRulesAveragePriorityDesc = 'EVENT_ROUTING_RULES_AVERAGE_PRIORITY_DESC',
  EventRoutingRulesCountAsc = 'EVENT_ROUTING_RULES_COUNT_ASC',
  EventRoutingRulesCountDesc = 'EVENT_ROUTING_RULES_COUNT_DESC',
  EventRoutingRulesDistinctCountConditionAsc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_CONDITION_ASC',
  EventRoutingRulesDistinctCountConditionDesc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_CONDITION_DESC',
  EventRoutingRulesDistinctCountCreatedAtAsc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_CREATED_AT_ASC',
  EventRoutingRulesDistinctCountCreatedAtDesc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_CREATED_AT_DESC',
  EventRoutingRulesDistinctCountEnabledAsc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_ENABLED_ASC',
  EventRoutingRulesDistinctCountEnabledDesc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_ENABLED_DESC',
  EventRoutingRulesDistinctCountOrganizationIdAsc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  EventRoutingRulesDistinctCountOrganizationIdDesc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  EventRoutingRulesDistinctCountPriorityAsc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_PRIORITY_ASC',
  EventRoutingRulesDistinctCountPriorityDesc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_PRIORITY_DESC',
  EventRoutingRulesDistinctCountRowIdAsc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_ROW_ID_ASC',
  EventRoutingRulesDistinctCountRowIdDesc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_ROW_ID_DESC',
  EventRoutingRulesDistinctCountSourcePatternAsc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_SOURCE_PATTERN_ASC',
  EventRoutingRulesDistinctCountSourcePatternDesc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_SOURCE_PATTERN_DESC',
  EventRoutingRulesDistinctCountTransformAsc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_TRANSFORM_ASC',
  EventRoutingRulesDistinctCountTransformDesc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_TRANSFORM_DESC',
  EventRoutingRulesDistinctCountTypePatternAsc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_TYPE_PATTERN_ASC',
  EventRoutingRulesDistinctCountTypePatternDesc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_TYPE_PATTERN_DESC',
  EventRoutingRulesDistinctCountUpdatedAtAsc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_UPDATED_AT_ASC',
  EventRoutingRulesDistinctCountUpdatedAtDesc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_UPDATED_AT_DESC',
  EventRoutingRulesDistinctCountWorkflowIdAsc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_WORKFLOW_ID_ASC',
  EventRoutingRulesDistinctCountWorkflowIdDesc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_WORKFLOW_ID_DESC',
  EventRoutingRulesMaxPriorityAsc = 'EVENT_ROUTING_RULES_MAX_PRIORITY_ASC',
  EventRoutingRulesMaxPriorityDesc = 'EVENT_ROUTING_RULES_MAX_PRIORITY_DESC',
  EventRoutingRulesMinPriorityAsc = 'EVENT_ROUTING_RULES_MIN_PRIORITY_ASC',
  EventRoutingRulesMinPriorityDesc = 'EVENT_ROUTING_RULES_MIN_PRIORITY_DESC',
  EventRoutingRulesStddevPopulationPriorityAsc = 'EVENT_ROUTING_RULES_STDDEV_POPULATION_PRIORITY_ASC',
  EventRoutingRulesStddevPopulationPriorityDesc = 'EVENT_ROUTING_RULES_STDDEV_POPULATION_PRIORITY_DESC',
  EventRoutingRulesStddevSamplePriorityAsc = 'EVENT_ROUTING_RULES_STDDEV_SAMPLE_PRIORITY_ASC',
  EventRoutingRulesStddevSamplePriorityDesc = 'EVENT_ROUTING_RULES_STDDEV_SAMPLE_PRIORITY_DESC',
  EventRoutingRulesSumPriorityAsc = 'EVENT_ROUTING_RULES_SUM_PRIORITY_ASC',
  EventRoutingRulesSumPriorityDesc = 'EVENT_ROUTING_RULES_SUM_PRIORITY_DESC',
  EventRoutingRulesVariancePopulationPriorityAsc = 'EVENT_ROUTING_RULES_VARIANCE_POPULATION_PRIORITY_ASC',
  EventRoutingRulesVariancePopulationPriorityDesc = 'EVENT_ROUTING_RULES_VARIANCE_POPULATION_PRIORITY_DESC',
  EventRoutingRulesVarianceSamplePriorityAsc = 'EVENT_ROUTING_RULES_VARIANCE_SAMPLE_PRIORITY_ASC',
  EventRoutingRulesVarianceSamplePriorityDesc = 'EVENT_ROUTING_RULES_VARIANCE_SAMPLE_PRIORITY_DESC',
  IsActiveAsc = 'IS_ACTIVE_ASC',
  IsActiveDesc = 'IS_ACTIVE_DESC',
  LastRunAtAsc = 'LAST_RUN_AT_ASC',
  LastRunAtDesc = 'LAST_RUN_AT_DESC',
  LastRunStatusAsc = 'LAST_RUN_STATUS_ASC',
  LastRunStatusDesc = 'LAST_RUN_STATUS_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
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
  WorkflowRunsDistinctCountWorkflowIdDesc = 'WORKFLOW_RUNS_DISTINCT_COUNT_WORKFLOW_ID_DESC'
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
  organizationId?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  webhookSecret?: InputMaybe<Scalars['String']['input']>;
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

export type WorkflowTemplate = Node & {
  __typename?: 'WorkflowTemplate';
  category: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  definition: Scalars['JSON']['output'];
  description?: Maybe<Scalars['String']['output']>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isFeatured: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  longDescription?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  requiredIntegrations: Array<Maybe<Scalars['String']['output']>>;
  rowId: Scalars['UUID']['output'];
  slug: Scalars['String']['output'];
  sortOrder?: Maybe<Scalars['String']['output']>;
  tags: Array<Maybe<Scalars['String']['output']>>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

export type WorkflowTemplateAggregates = {
  __typename?: 'WorkflowTemplateAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<WorkflowTemplateDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/**
 * A condition to be used against `WorkflowTemplate` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type WorkflowTemplateCondition = {
  /** Checks for equality with the object’s `category` field. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `iconUrl` field. */
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `isFeatured` field. */
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `isPublic` field. */
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `longDescription` field. */
  longDescription?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `sortOrder` field. */
  sortOrder?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `WorkflowTemplate` values. */
export type WorkflowTemplateConnection = {
  __typename?: 'WorkflowTemplateConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<WorkflowTemplateAggregates>;
  /** A list of edges which contains the `WorkflowTemplate` and cursor to aid in pagination. */
  edges: Array<WorkflowTemplateEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<WorkflowTemplateAggregates>>;
  /** A list of `WorkflowTemplate` objects. */
  nodes: Array<WorkflowTemplate>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `WorkflowTemplate` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `WorkflowTemplate` values. */
export type WorkflowTemplateConnectionGroupedAggregatesArgs = {
  groupBy: Array<WorkflowTemplateGroupBy>;
  having?: InputMaybe<WorkflowTemplateHavingInput>;
};

export type WorkflowTemplateDistinctCountAggregates = {
  __typename?: 'WorkflowTemplateDistinctCountAggregates';
  /** Distinct count of category across the matching connection */
  category?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of definition across the matching connection */
  definition?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of iconUrl across the matching connection */
  iconUrl?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of isFeatured across the matching connection */
  isFeatured?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of isPublic across the matching connection */
  isPublic?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of longDescription across the matching connection */
  longDescription?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of requiredIntegrations across the matching connection */
  requiredIntegrations?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of slug across the matching connection */
  slug?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of sortOrder across the matching connection */
  sortOrder?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of tags across the matching connection */
  tags?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
};

/** A `WorkflowTemplate` edge in the connection. */
export type WorkflowTemplateEdge = {
  __typename?: 'WorkflowTemplateEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `WorkflowTemplate` at the end of the edge. */
  node: WorkflowTemplate;
};

/** A filter to be used against `WorkflowTemplate` object types. All fields are combined with a logical ‘and.’ */
export type WorkflowTemplateFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<WorkflowTemplateFilter>>;
  /** Filter by the object’s `category` field. */
  category?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `iconUrl` field. */
  iconUrl?: InputMaybe<StringFilter>;
  /** Filter by the object’s `isFeatured` field. */
  isFeatured?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `isPublic` field. */
  isPublic?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `longDescription` field. */
  longDescription?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<WorkflowTemplateFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<WorkflowTemplateFilter>>;
  /** Filter by the object’s `requiredIntegrations` field. */
  requiredIntegrations?: InputMaybe<StringListFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
  /** Filter by the object’s `sortOrder` field. */
  sortOrder?: InputMaybe<StringFilter>;
  /** Filter by the object’s `tags` field. */
  tags?: InputMaybe<StringListFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** Grouping methods for `WorkflowTemplate` for usage during aggregation. */
export enum WorkflowTemplateGroupBy {
  Category = 'CATEGORY',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Definition = 'DEFINITION',
  Description = 'DESCRIPTION',
  IconUrl = 'ICON_URL',
  IsFeatured = 'IS_FEATURED',
  IsPublic = 'IS_PUBLIC',
  LongDescription = 'LONG_DESCRIPTION',
  Name = 'NAME',
  RequiredIntegrations = 'REQUIRED_INTEGRATIONS',
  Slug = 'SLUG',
  SortOrder = 'SORT_ORDER',
  Tags = 'TAGS',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type WorkflowTemplateHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowTemplateHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `WorkflowTemplate` aggregates. */
export type WorkflowTemplateHavingInput = {
  AND?: InputMaybe<Array<WorkflowTemplateHavingInput>>;
  OR?: InputMaybe<Array<WorkflowTemplateHavingInput>>;
  average?: InputMaybe<WorkflowTemplateHavingAverageInput>;
  distinctCount?: InputMaybe<WorkflowTemplateHavingDistinctCountInput>;
  max?: InputMaybe<WorkflowTemplateHavingMaxInput>;
  min?: InputMaybe<WorkflowTemplateHavingMinInput>;
  stddevPopulation?: InputMaybe<WorkflowTemplateHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<WorkflowTemplateHavingStddevSampleInput>;
  sum?: InputMaybe<WorkflowTemplateHavingSumInput>;
  variancePopulation?: InputMaybe<WorkflowTemplateHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<WorkflowTemplateHavingVarianceSampleInput>;
};

export type WorkflowTemplateHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowTemplateHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowTemplateHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowTemplateHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowTemplateHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowTemplateHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowTemplateHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `WorkflowTemplate` */
export type WorkflowTemplateInput = {
  category: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  definition: Scalars['JSON']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  longDescription?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  requiredIntegrations?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  slug: Scalars['String']['input'];
  sortOrder?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `WorkflowTemplate`. */
export enum WorkflowTemplateOrderBy {
  CategoryAsc = 'CATEGORY_ASC',
  CategoryDesc = 'CATEGORY_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  IconUrlAsc = 'ICON_URL_ASC',
  IconUrlDesc = 'ICON_URL_DESC',
  IsFeaturedAsc = 'IS_FEATURED_ASC',
  IsFeaturedDesc = 'IS_FEATURED_DESC',
  IsPublicAsc = 'IS_PUBLIC_ASC',
  IsPublicDesc = 'IS_PUBLIC_DESC',
  LongDescriptionAsc = 'LONG_DESCRIPTION_ASC',
  LongDescriptionDesc = 'LONG_DESCRIPTION_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  SortOrderAsc = 'SORT_ORDER_ASC',
  SortOrderDesc = 'SORT_ORDER_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `WorkflowTemplate`. Fields that are set will be updated. */
export type WorkflowTemplatePatch = {
  category?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  definition?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  longDescription?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  requiredIntegrations?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against many `EventRoutingRule` object types. All fields are combined with a logical ‘and.’ */
export type WorkflowToManyEventRoutingRuleFilter = {
  /** Aggregates across related `EventRoutingRule` match the filter criteria. */
  aggregates?: InputMaybe<EventRoutingRuleAggregatesFilter>;
  /** Every related `EventRoutingRule` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<EventRoutingRuleFilter>;
  /** No related `EventRoutingRule` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<EventRoutingRuleFilter>;
  /** Some related `EventRoutingRule` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<EventRoutingRuleFilter>;
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

export type CreateIntegrationMutationVariables = Exact<{
  input: CreateIntegrationInput;
}>;


export type CreateIntegrationMutation = { __typename?: 'Mutation', createIntegration?: { __typename?: 'CreateIntegrationPayload', integration?: { __typename?: 'Integration', rowId: string, name: string, type: string, isEnabled: boolean, createdAt?: Date | null } | null } | null };

export type UpdateIntegrationMutationVariables = Exact<{
  input: UpdateIntegrationInput;
}>;


export type UpdateIntegrationMutation = { __typename?: 'Mutation', updateIntegration?: { __typename?: 'UpdateIntegrationPayload', integration?: { __typename?: 'Integration', rowId: string, name: string, type: string, isEnabled: boolean, updatedAt?: Date | null } | null } | null };

export type DeleteIntegrationMutationVariables = Exact<{
  input: DeleteIntegrationInput;
}>;


export type DeleteIntegrationMutation = { __typename?: 'Mutation', deleteIntegration?: { __typename?: 'DeleteIntegrationPayload', integration?: { __typename?: 'Integration', rowId: string, name: string } | null } | null };

export type CreateMcpServerMutationVariables = Exact<{
  input: CreateMcpServerInput;
}>;


export type CreateMcpServerMutation = { __typename?: 'Mutation', createMcpServer?: { __typename?: 'CreateMcpServerPayload', mcpServer?: { __typename?: 'McpServer', rowId: string, name: string, type: string, command: string, args: Record<string, unknown>, isEnabled: boolean, createdAt?: Date | null } | null } | null };

export type UpdateMcpServerMutationVariables = Exact<{
  input: UpdateMcpServerInput;
}>;


export type UpdateMcpServerMutation = { __typename?: 'Mutation', updateMcpServer?: { __typename?: 'UpdateMcpServerPayload', mcpServer?: { __typename?: 'McpServer', rowId: string, name: string, type: string, command: string, args: Record<string, unknown>, isEnabled: boolean, updatedAt?: Date | null } | null } | null };

export type DeleteMcpServerMutationVariables = Exact<{
  input: DeleteMcpServerInput;
}>;


export type DeleteMcpServerMutation = { __typename?: 'Mutation', deleteMcpServer?: { __typename?: 'DeleteMcpServerPayload', mcpServer?: { __typename?: 'McpServer', rowId: string, name: string } | null } | null };

export type CreateWorkflowMutationVariables = Exact<{
  input: CreateWorkflowInput;
}>;


export type CreateWorkflowMutation = { __typename?: 'Mutation', createWorkflow?: { __typename?: 'CreateWorkflowPayload', workflow?: { __typename?: 'Workflow', rowId: string, organizationId: string, name: string, description?: string | null, definition: Record<string, unknown>, cronExpression?: string | null, isActive: boolean, createdAt?: Date | null } | null } | null };

export type DeleteWorkflowMutationVariables = Exact<{
  input: DeleteWorkflowInput;
}>;


export type DeleteWorkflowMutation = { __typename?: 'Mutation', deleteWorkflow?: { __typename?: 'DeleteWorkflowPayload', workflow?: { __typename?: 'Workflow', rowId: string } | null } | null };

export type UpdateWorkflowMutationVariables = Exact<{
  input: UpdateWorkflowInput;
}>;


export type UpdateWorkflowMutation = { __typename?: 'Mutation', updateWorkflow?: { __typename?: 'UpdateWorkflowPayload', workflow?: { __typename?: 'Workflow', rowId: string, organizationId: string, name: string, description?: string | null, definition: Record<string, unknown>, cronExpression?: string | null, isActive: boolean, updatedAt?: Date | null } | null } | null };

export type IntegrationDefinitionsQueryVariables = Exact<{
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type IntegrationDefinitionsQuery = { __typename?: 'Query', integrationDefinitions?: { __typename?: 'IntegrationDefinitionConnection', totalCount: number, nodes: Array<{ __typename?: 'IntegrationDefinition', id: string, rowId: string, name: string, description?: string | null, iconUrl?: string | null, category: string, authType: string, authFields: Record<string, unknown>, isFeatured: boolean, keepAlive: boolean, setupSteps?: Record<string, unknown> | null, docsUrl?: string | null, supportsOAuth: boolean }> } | null };

export type IntegrationDefinitionQueryVariables = Exact<{
  rowId: Scalars['String']['input'];
}>;


export type IntegrationDefinitionQuery = { __typename?: 'Query', integrationDefinition?: { __typename?: 'IntegrationDefinition', id: string, rowId: string, name: string, description?: string | null, iconUrl?: string | null, category: string, authType: string, authFields: Record<string, unknown>, mcpPackage: string, mcpCommand: string, mcpArgs: Record<string, unknown>, keepAlive: boolean, idleTimeoutMs: number, isFeatured: boolean, isEnabled: boolean, setupSteps?: Record<string, unknown> | null, docsUrl?: string | null, supportsOAuth: boolean } | null };

export type IntegrationsQueryVariables = Exact<{
  organizationId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type IntegrationsQuery = { __typename?: 'Query', integrations?: { __typename?: 'IntegrationConnection', totalCount: number, nodes: Array<{ __typename?: 'Integration', rowId: string, name: string, type: string, isEnabled: boolean, mcpServerId?: string | null, createdAt?: Date | null, updatedAt?: Date | null }> } | null };

export type IntegrationQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type IntegrationQuery = { __typename?: 'Query', integration?: { __typename?: 'Integration', rowId: string, name: string, type: string, isEnabled: boolean, config: Record<string, unknown>, createdAt?: Date | null, updatedAt?: Date | null } | null };

export type PluginsQueryVariables = Exact<{
  organizationId: Scalars['String']['input'];
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


export type WorkflowQuery = { __typename?: 'Query', workflow?: { __typename?: 'Workflow', rowId: string, organizationId: string, name: string, description?: string | null, definition: Record<string, unknown>, cronExpression?: string | null, webhookSecret?: string | null, isActive: boolean, createdAt?: Date | null, updatedAt?: Date | null, workflowRuns: { __typename?: 'WorkflowRunConnection', totalCount: number, nodes: Array<{ __typename?: 'WorkflowRun', rowId: string, engineWorkflowId: string, status: string, startedAt?: Date | null, completedAt?: Date | null, input?: Record<string, unknown> | null, output?: Record<string, unknown> | null, error?: string | null, createdAt?: Date | null, workflowStepLogs: { __typename?: 'WorkflowStepLogConnection', nodes: Array<{ __typename?: 'WorkflowStepLog', rowId: string, stepId: string, stepName: string, stepType: string, status: string, input?: Record<string, unknown> | null, output?: Record<string, unknown> | null, error?: string | null, startedAt?: Date | null, completedAt?: Date | null }> } }> } } | null };

export type WorkflowsQueryVariables = Exact<{
  organizationId: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type WorkflowsQuery = { __typename?: 'Query', workflows?: { __typename?: 'WorkflowConnection', totalCount: number, nodes: Array<{ __typename?: 'Workflow', rowId: string, name: string, description?: string | null, cronExpression?: string | null, isActive: boolean, createdAt?: Date | null, updatedAt?: Date | null, workflowRuns: { __typename?: 'WorkflowRunConnection', nodes: Array<{ __typename?: 'WorkflowRun', rowId: string, status: string, createdAt?: Date | null }> } }> } | null };


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
    condition: {organizationId: $organizationId, isEnabled: true}
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
export const UserByIdentityProviderIdDocument = gql`
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
    UserByIdentityProviderId(variables: UserByIdentityProviderIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UserByIdentityProviderIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserByIdentityProviderIdQuery>({ document: UserByIdentityProviderIdDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UserByIdentityProviderId', 'query', variables);
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