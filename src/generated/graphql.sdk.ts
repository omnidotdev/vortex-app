// @ts-nocheck
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigFloat: { input: unknown; output: unknown; }
  BigInt: { input: string; output: string; }
  Cursor: { input: string; output: string; }
  Datetime: { input: Date; output: Date; }
  JSON: { input: Record<string, unknown>; output: Record<string, unknown>; }
  UUID: { input: string; output: string; }
};

export type ApprovalRequest = Node & {
  __typename?: 'ApprovalRequest';
  approvers?: Maybe<Scalars['JSON']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  decidedAt?: Maybe<Scalars['Datetime']['output']>;
  decidedBy?: Maybe<Scalars['String']['output']>;
  gateType: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  organizationId: Scalars['String']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  rowId: Scalars['UUID']['output'];
  runId: Scalars['String']['output'];
  signalData?: Maybe<Scalars['JSON']['output']>;
  signalName?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  stepId: Scalars['String']['output'];
  timeoutAction?: Maybe<Scalars['String']['output']>;
  timeoutMs?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Workflow` that is related to this `ApprovalRequest`. */
  workflow?: Maybe<Workflow>;
  workflowId: Scalars['UUID']['output'];
};

export type ApprovalRequestAggregates = {
  __typename?: 'ApprovalRequestAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<ApprovalRequestDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `ApprovalRequest` object types. */
export type ApprovalRequestAggregatesFilter = {
  /** Distinct count aggregate over matching `ApprovalRequest` objects. */
  distinctCount?: InputMaybe<ApprovalRequestDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `ApprovalRequest` object to be included within the aggregate. */
  filter?: InputMaybe<ApprovalRequestFilter>;
};

/**
 * A condition to be used against `ApprovalRequest` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ApprovalRequestCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `decidedAt` field. */
  decidedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `decidedBy` field. */
  decidedBy?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `gateType` field. */
  gateType?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `reason` field. */
  reason?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `runId` field. */
  runId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `signalName` field. */
  signalName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `stepId` field. */
  stepId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timeoutAction` field. */
  timeoutAction?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timeoutMs` field. */
  timeoutMs?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `title` field. */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `workflowId` field. */
  workflowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `ApprovalRequest` values. */
export type ApprovalRequestConnection = {
  __typename?: 'ApprovalRequestConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<ApprovalRequestAggregates>;
  /** A list of edges which contains the `ApprovalRequest` and cursor to aid in pagination. */
  edges: Array<ApprovalRequestEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<ApprovalRequestAggregates>>;
  /** A list of `ApprovalRequest` objects. */
  nodes: Array<ApprovalRequest>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ApprovalRequest` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `ApprovalRequest` values. */
export type ApprovalRequestConnectionGroupedAggregatesArgs = {
  groupBy: Array<ApprovalRequestGroupBy>;
  having?: InputMaybe<ApprovalRequestHavingInput>;
};

export type ApprovalRequestDistinctCountAggregateFilter = {
  approvers?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  decidedAt?: InputMaybe<BigIntFilter>;
  decidedBy?: InputMaybe<BigIntFilter>;
  gateType?: InputMaybe<BigIntFilter>;
  organizationId?: InputMaybe<BigIntFilter>;
  reason?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  runId?: InputMaybe<BigIntFilter>;
  signalData?: InputMaybe<BigIntFilter>;
  signalName?: InputMaybe<BigIntFilter>;
  status?: InputMaybe<BigIntFilter>;
  stepId?: InputMaybe<BigIntFilter>;
  timeoutAction?: InputMaybe<BigIntFilter>;
  timeoutMs?: InputMaybe<BigIntFilter>;
  title?: InputMaybe<BigIntFilter>;
  workflowId?: InputMaybe<BigIntFilter>;
};

export type ApprovalRequestDistinctCountAggregates = {
  __typename?: 'ApprovalRequestDistinctCountAggregates';
  /** Distinct count of approvers across the matching connection */
  approvers?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of decidedAt across the matching connection */
  decidedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of decidedBy across the matching connection */
  decidedBy?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of gateType across the matching connection */
  gateType?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of reason across the matching connection */
  reason?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of runId across the matching connection */
  runId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of signalData across the matching connection */
  signalData?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of signalName across the matching connection */
  signalName?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of status across the matching connection */
  status?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of stepId across the matching connection */
  stepId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of timeoutAction across the matching connection */
  timeoutAction?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of timeoutMs across the matching connection */
  timeoutMs?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of title across the matching connection */
  title?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of workflowId across the matching connection */
  workflowId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `ApprovalRequest` edge in the connection. */
export type ApprovalRequestEdge = {
  __typename?: 'ApprovalRequestEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `ApprovalRequest` at the end of the edge. */
  node: ApprovalRequest;
};

/** A filter to be used against `ApprovalRequest` object types. All fields are combined with a logical ‘and.’ */
export type ApprovalRequestFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ApprovalRequestFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `decidedAt` field. */
  decidedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `decidedBy` field. */
  decidedBy?: InputMaybe<StringFilter>;
  /** Filter by the object’s `gateType` field. */
  gateType?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ApprovalRequestFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ApprovalRequestFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `reason` field. */
  reason?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `runId` field. */
  runId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `signalName` field. */
  signalName?: InputMaybe<StringFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
  /** Filter by the object’s `stepId` field. */
  stepId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `timeoutAction` field. */
  timeoutAction?: InputMaybe<StringFilter>;
  /** Filter by the object’s `timeoutMs` field. */
  timeoutMs?: InputMaybe<StringFilter>;
  /** Filter by the object’s `title` field. */
  title?: InputMaybe<StringFilter>;
  /** Filter by the object’s `workflow` relation. */
  workflow?: InputMaybe<WorkflowFilter>;
  /** Filter by the object’s `workflowId` field. */
  workflowId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `ApprovalRequest` for usage during aggregation. */
export enum ApprovalRequestGroupBy {
  Approvers = 'APPROVERS',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  DecidedAt = 'DECIDED_AT',
  DecidedAtTruncatedToDay = 'DECIDED_AT_TRUNCATED_TO_DAY',
  DecidedAtTruncatedToHour = 'DECIDED_AT_TRUNCATED_TO_HOUR',
  DecidedBy = 'DECIDED_BY',
  GateType = 'GATE_TYPE',
  OrganizationId = 'ORGANIZATION_ID',
  Reason = 'REASON',
  RunId = 'RUN_ID',
  SignalData = 'SIGNAL_DATA',
  SignalName = 'SIGNAL_NAME',
  Status = 'STATUS',
  StepId = 'STEP_ID',
  TimeoutAction = 'TIMEOUT_ACTION',
  TimeoutMs = 'TIMEOUT_MS',
  Title = 'TITLE',
  WorkflowId = 'WORKFLOW_ID'
}

export type ApprovalRequestHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  decidedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ApprovalRequestHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  decidedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `ApprovalRequest` aggregates. */
export type ApprovalRequestHavingInput = {
  AND?: InputMaybe<Array<ApprovalRequestHavingInput>>;
  OR?: InputMaybe<Array<ApprovalRequestHavingInput>>;
  average?: InputMaybe<ApprovalRequestHavingAverageInput>;
  distinctCount?: InputMaybe<ApprovalRequestHavingDistinctCountInput>;
  max?: InputMaybe<ApprovalRequestHavingMaxInput>;
  min?: InputMaybe<ApprovalRequestHavingMinInput>;
  stddevPopulation?: InputMaybe<ApprovalRequestHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<ApprovalRequestHavingStddevSampleInput>;
  sum?: InputMaybe<ApprovalRequestHavingSumInput>;
  variancePopulation?: InputMaybe<ApprovalRequestHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<ApprovalRequestHavingVarianceSampleInput>;
};

export type ApprovalRequestHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  decidedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ApprovalRequestHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  decidedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ApprovalRequestHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  decidedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ApprovalRequestHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  decidedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ApprovalRequestHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  decidedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ApprovalRequestHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  decidedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ApprovalRequestHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  decidedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Methods to use when ordering `ApprovalRequest`. */
export enum ApprovalRequestOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DecidedAtAsc = 'DECIDED_AT_ASC',
  DecidedAtDesc = 'DECIDED_AT_DESC',
  DecidedByAsc = 'DECIDED_BY_ASC',
  DecidedByDesc = 'DECIDED_BY_DESC',
  GateTypeAsc = 'GATE_TYPE_ASC',
  GateTypeDesc = 'GATE_TYPE_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ReasonAsc = 'REASON_ASC',
  ReasonDesc = 'REASON_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  RunIdAsc = 'RUN_ID_ASC',
  RunIdDesc = 'RUN_ID_DESC',
  SignalNameAsc = 'SIGNAL_NAME_ASC',
  SignalNameDesc = 'SIGNAL_NAME_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  StepIdAsc = 'STEP_ID_ASC',
  StepIdDesc = 'STEP_ID_DESC',
  TimeoutActionAsc = 'TIMEOUT_ACTION_ASC',
  TimeoutActionDesc = 'TIMEOUT_ACTION_DESC',
  TimeoutMsAsc = 'TIMEOUT_MS_ASC',
  TimeoutMsDesc = 'TIMEOUT_MS_DESC',
  TitleAsc = 'TITLE_ASC',
  TitleDesc = 'TITLE_DESC',
  WorkflowIdAsc = 'WORKFLOW_ID_ASC',
  WorkflowIdDesc = 'WORKFLOW_ID_DESC'
}

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

/** All input for the create `EventSchema` mutation. */
export type CreateEventSchemaInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `EventSchema` to be created by this mutation. */
  eventSchema: EventSchemaInput;
};

/** The output of our create `EventSchema` mutation. */
export type CreateEventSchemaPayload = {
  __typename?: 'CreateEventSchemaPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `EventSchema` that was created by this mutation. */
  eventSchema?: Maybe<EventSchema>;
  /** An edge for our `EventSchema`. May be used by Relay 1. */
  eventSchemaEdge?: Maybe<EventSchemaEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `EventSchema` mutation. */
export type CreateEventSchemaPayloadEventSchemaEdgeArgs = {
  orderBy?: Array<EventSchemaOrderBy>;
};

/** All input for the create `EventSubscription` mutation. */
export type CreateEventSubscriptionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `EventSubscription` to be created by this mutation. */
  eventSubscription: EventSubscriptionInput;
};

/** The output of our create `EventSubscription` mutation. */
export type CreateEventSubscriptionPayload = {
  __typename?: 'CreateEventSubscriptionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `EventSubscription` that was created by this mutation. */
  eventSubscription?: Maybe<EventSubscription>;
  /** An edge for our `EventSubscription`. May be used by Relay 1. */
  eventSubscriptionEdge?: Maybe<EventSubscriptionEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `EventSubscription` mutation. */
export type CreateEventSubscriptionPayloadEventSubscriptionEdgeArgs = {
  orderBy?: Array<EventSubscriptionOrderBy>;
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

export type DeadLetterEvent = Node & {
  __typename?: 'DeadLetterEvent';
  attempts: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  error: Scalars['String']['output'];
  errorCode: Scalars['String']['output'];
  eventData: Scalars['JSON']['output'];
  eventSource: Scalars['String']['output'];
  eventType: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  lastAttemptAt?: Maybe<Scalars['Datetime']['output']>;
  organizationId: Scalars['String']['output'];
  originalEventId: Scalars['String']['output'];
  resolvedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `EventRoutingRule` that is related to this `DeadLetterEvent`. */
  routingRule?: Maybe<EventRoutingRule>;
  routingRuleId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
};

export type DeadLetterEventAggregates = {
  __typename?: 'DeadLetterEventAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<DeadLetterEventAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<DeadLetterEventDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<DeadLetterEventMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<DeadLetterEventMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<DeadLetterEventStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<DeadLetterEventStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<DeadLetterEventSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<DeadLetterEventVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<DeadLetterEventVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `DeadLetterEvent` object types. */
export type DeadLetterEventAggregatesFilter = {
  /** Mean average aggregate over matching `DeadLetterEvent` objects. */
  average?: InputMaybe<DeadLetterEventAverageAggregateFilter>;
  /** Distinct count aggregate over matching `DeadLetterEvent` objects. */
  distinctCount?: InputMaybe<DeadLetterEventDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `DeadLetterEvent` object to be included within the aggregate. */
  filter?: InputMaybe<DeadLetterEventFilter>;
  /** Maximum aggregate over matching `DeadLetterEvent` objects. */
  max?: InputMaybe<DeadLetterEventMaxAggregateFilter>;
  /** Minimum aggregate over matching `DeadLetterEvent` objects. */
  min?: InputMaybe<DeadLetterEventMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `DeadLetterEvent` objects. */
  stddevPopulation?: InputMaybe<DeadLetterEventStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `DeadLetterEvent` objects. */
  stddevSample?: InputMaybe<DeadLetterEventStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `DeadLetterEvent` objects. */
  sum?: InputMaybe<DeadLetterEventSumAggregateFilter>;
  /** Population variance aggregate over matching `DeadLetterEvent` objects. */
  variancePopulation?: InputMaybe<DeadLetterEventVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `DeadLetterEvent` objects. */
  varianceSample?: InputMaybe<DeadLetterEventVarianceSampleAggregateFilter>;
};

export type DeadLetterEventAverageAggregateFilter = {
  attempts?: InputMaybe<BigFloatFilter>;
};

export type DeadLetterEventAverageAggregates = {
  __typename?: 'DeadLetterEventAverageAggregates';
  /** Mean average of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `DeadLetterEvent` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type DeadLetterEventCondition = {
  /** Checks for equality with the object’s `attempts` field. */
  attempts?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `error` field. */
  error?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `errorCode` field. */
  errorCode?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `eventSource` field. */
  eventSource?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `eventType` field. */
  eventType?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `lastAttemptAt` field. */
  lastAttemptAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `originalEventId` field. */
  originalEventId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `resolvedAt` field. */
  resolvedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `routingRuleId` field. */
  routingRuleId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `DeadLetterEvent` values. */
export type DeadLetterEventConnection = {
  __typename?: 'DeadLetterEventConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<DeadLetterEventAggregates>;
  /** A list of edges which contains the `DeadLetterEvent` and cursor to aid in pagination. */
  edges: Array<DeadLetterEventEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<DeadLetterEventAggregates>>;
  /** A list of `DeadLetterEvent` objects. */
  nodes: Array<DeadLetterEvent>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `DeadLetterEvent` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `DeadLetterEvent` values. */
export type DeadLetterEventConnectionGroupedAggregatesArgs = {
  groupBy: Array<DeadLetterEventGroupBy>;
  having?: InputMaybe<DeadLetterEventHavingInput>;
};

export type DeadLetterEventDistinctCountAggregateFilter = {
  attempts?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  error?: InputMaybe<BigIntFilter>;
  errorCode?: InputMaybe<BigIntFilter>;
  eventData?: InputMaybe<BigIntFilter>;
  eventSource?: InputMaybe<BigIntFilter>;
  eventType?: InputMaybe<BigIntFilter>;
  lastAttemptAt?: InputMaybe<BigIntFilter>;
  organizationId?: InputMaybe<BigIntFilter>;
  originalEventId?: InputMaybe<BigIntFilter>;
  resolvedAt?: InputMaybe<BigIntFilter>;
  routingRuleId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
};

export type DeadLetterEventDistinctCountAggregates = {
  __typename?: 'DeadLetterEventDistinctCountAggregates';
  /** Distinct count of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of error across the matching connection */
  error?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of errorCode across the matching connection */
  errorCode?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of eventData across the matching connection */
  eventData?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of eventSource across the matching connection */
  eventSource?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of eventType across the matching connection */
  eventType?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of lastAttemptAt across the matching connection */
  lastAttemptAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of originalEventId across the matching connection */
  originalEventId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of resolvedAt across the matching connection */
  resolvedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of routingRuleId across the matching connection */
  routingRuleId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `DeadLetterEvent` edge in the connection. */
export type DeadLetterEventEdge = {
  __typename?: 'DeadLetterEventEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `DeadLetterEvent` at the end of the edge. */
  node: DeadLetterEvent;
};

/** A filter to be used against `DeadLetterEvent` object types. All fields are combined with a logical ‘and.’ */
export type DeadLetterEventFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<DeadLetterEventFilter>>;
  /** Filter by the object’s `attempts` field. */
  attempts?: InputMaybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `error` field. */
  error?: InputMaybe<StringFilter>;
  /** Filter by the object’s `errorCode` field. */
  errorCode?: InputMaybe<StringFilter>;
  /** Filter by the object’s `eventSource` field. */
  eventSource?: InputMaybe<StringFilter>;
  /** Filter by the object’s `eventType` field. */
  eventType?: InputMaybe<StringFilter>;
  /** Filter by the object’s `lastAttemptAt` field. */
  lastAttemptAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<DeadLetterEventFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<DeadLetterEventFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `originalEventId` field. */
  originalEventId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `resolvedAt` field. */
  resolvedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `routingRule` relation. */
  routingRule?: InputMaybe<EventRoutingRuleFilter>;
  /** Filter by the object’s `routingRuleId` field. */
  routingRuleId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `DeadLetterEvent` for usage during aggregation. */
export enum DeadLetterEventGroupBy {
  Attempts = 'ATTEMPTS',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Error = 'ERROR',
  ErrorCode = 'ERROR_CODE',
  EventData = 'EVENT_DATA',
  EventSource = 'EVENT_SOURCE',
  EventType = 'EVENT_TYPE',
  LastAttemptAt = 'LAST_ATTEMPT_AT',
  LastAttemptAtTruncatedToDay = 'LAST_ATTEMPT_AT_TRUNCATED_TO_DAY',
  LastAttemptAtTruncatedToHour = 'LAST_ATTEMPT_AT_TRUNCATED_TO_HOUR',
  OrganizationId = 'ORGANIZATION_ID',
  OriginalEventId = 'ORIGINAL_EVENT_ID',
  ResolvedAt = 'RESOLVED_AT',
  ResolvedAtTruncatedToDay = 'RESOLVED_AT_TRUNCATED_TO_DAY',
  ResolvedAtTruncatedToHour = 'RESOLVED_AT_TRUNCATED_TO_HOUR',
  RoutingRuleId = 'ROUTING_RULE_ID'
}

export type DeadLetterEventHavingAverageInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastAttemptAt?: InputMaybe<HavingDatetimeFilter>;
  resolvedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type DeadLetterEventHavingDistinctCountInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastAttemptAt?: InputMaybe<HavingDatetimeFilter>;
  resolvedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `DeadLetterEvent` aggregates. */
export type DeadLetterEventHavingInput = {
  AND?: InputMaybe<Array<DeadLetterEventHavingInput>>;
  OR?: InputMaybe<Array<DeadLetterEventHavingInput>>;
  average?: InputMaybe<DeadLetterEventHavingAverageInput>;
  distinctCount?: InputMaybe<DeadLetterEventHavingDistinctCountInput>;
  max?: InputMaybe<DeadLetterEventHavingMaxInput>;
  min?: InputMaybe<DeadLetterEventHavingMinInput>;
  stddevPopulation?: InputMaybe<DeadLetterEventHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<DeadLetterEventHavingStddevSampleInput>;
  sum?: InputMaybe<DeadLetterEventHavingSumInput>;
  variancePopulation?: InputMaybe<DeadLetterEventHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<DeadLetterEventHavingVarianceSampleInput>;
};

export type DeadLetterEventHavingMaxInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastAttemptAt?: InputMaybe<HavingDatetimeFilter>;
  resolvedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type DeadLetterEventHavingMinInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastAttemptAt?: InputMaybe<HavingDatetimeFilter>;
  resolvedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type DeadLetterEventHavingStddevPopulationInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastAttemptAt?: InputMaybe<HavingDatetimeFilter>;
  resolvedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type DeadLetterEventHavingStddevSampleInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastAttemptAt?: InputMaybe<HavingDatetimeFilter>;
  resolvedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type DeadLetterEventHavingSumInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastAttemptAt?: InputMaybe<HavingDatetimeFilter>;
  resolvedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type DeadLetterEventHavingVariancePopulationInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastAttemptAt?: InputMaybe<HavingDatetimeFilter>;
  resolvedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type DeadLetterEventHavingVarianceSampleInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastAttemptAt?: InputMaybe<HavingDatetimeFilter>;
  resolvedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type DeadLetterEventMaxAggregateFilter = {
  attempts?: InputMaybe<IntFilter>;
};

export type DeadLetterEventMaxAggregates = {
  __typename?: 'DeadLetterEventMaxAggregates';
  /** Maximum of attempts across the matching connection */
  attempts?: Maybe<Scalars['Int']['output']>;
};

export type DeadLetterEventMinAggregateFilter = {
  attempts?: InputMaybe<IntFilter>;
};

export type DeadLetterEventMinAggregates = {
  __typename?: 'DeadLetterEventMinAggregates';
  /** Minimum of attempts across the matching connection */
  attempts?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `DeadLetterEvent`. */
export enum DeadLetterEventOrderBy {
  AttemptsAsc = 'ATTEMPTS_ASC',
  AttemptsDesc = 'ATTEMPTS_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  ErrorAsc = 'ERROR_ASC',
  ErrorCodeAsc = 'ERROR_CODE_ASC',
  ErrorCodeDesc = 'ERROR_CODE_DESC',
  ErrorDesc = 'ERROR_DESC',
  EventSourceAsc = 'EVENT_SOURCE_ASC',
  EventSourceDesc = 'EVENT_SOURCE_DESC',
  EventTypeAsc = 'EVENT_TYPE_ASC',
  EventTypeDesc = 'EVENT_TYPE_DESC',
  LastAttemptAtAsc = 'LAST_ATTEMPT_AT_ASC',
  LastAttemptAtDesc = 'LAST_ATTEMPT_AT_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  OriginalEventIdAsc = 'ORIGINAL_EVENT_ID_ASC',
  OriginalEventIdDesc = 'ORIGINAL_EVENT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ResolvedAtAsc = 'RESOLVED_AT_ASC',
  ResolvedAtDesc = 'RESOLVED_AT_DESC',
  RoutingRuleIdAsc = 'ROUTING_RULE_ID_ASC',
  RoutingRuleIdDesc = 'ROUTING_RULE_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

export type DeadLetterEventStddevPopulationAggregateFilter = {
  attempts?: InputMaybe<BigFloatFilter>;
};

export type DeadLetterEventStddevPopulationAggregates = {
  __typename?: 'DeadLetterEventStddevPopulationAggregates';
  /** Population standard deviation of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
};

export type DeadLetterEventStddevSampleAggregateFilter = {
  attempts?: InputMaybe<BigFloatFilter>;
};

export type DeadLetterEventStddevSampleAggregates = {
  __typename?: 'DeadLetterEventStddevSampleAggregates';
  /** Sample standard deviation of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
};

export type DeadLetterEventSumAggregateFilter = {
  attempts?: InputMaybe<BigIntFilter>;
};

export type DeadLetterEventSumAggregates = {
  __typename?: 'DeadLetterEventSumAggregates';
  /** Sum of attempts across the matching connection */
  attempts: Scalars['BigInt']['output'];
};

export type DeadLetterEventVariancePopulationAggregateFilter = {
  attempts?: InputMaybe<BigFloatFilter>;
};

export type DeadLetterEventVariancePopulationAggregates = {
  __typename?: 'DeadLetterEventVariancePopulationAggregates';
  /** Population variance of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
};

export type DeadLetterEventVarianceSampleAggregateFilter = {
  attempts?: InputMaybe<BigFloatFilter>;
};

export type DeadLetterEventVarianceSampleAggregates = {
  __typename?: 'DeadLetterEventVarianceSampleAggregates';
  /** Sample variance of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
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

/** All input for the `deleteEventSchema` mutation. */
export type DeleteEventSchemaInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `EventSchema` mutation. */
export type DeleteEventSchemaPayload = {
  __typename?: 'DeleteEventSchemaPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedEventSchemaId?: Maybe<Scalars['ID']['output']>;
  /** The `EventSchema` that was deleted by this mutation. */
  eventSchema?: Maybe<EventSchema>;
  /** An edge for our `EventSchema`. May be used by Relay 1. */
  eventSchemaEdge?: Maybe<EventSchemaEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `EventSchema` mutation. */
export type DeleteEventSchemaPayloadEventSchemaEdgeArgs = {
  orderBy?: Array<EventSchemaOrderBy>;
};

/** All input for the `deleteEventSubscription` mutation. */
export type DeleteEventSubscriptionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `EventSubscription` mutation. */
export type DeleteEventSubscriptionPayload = {
  __typename?: 'DeleteEventSubscriptionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedEventSubscriptionId?: Maybe<Scalars['ID']['output']>;
  /** The `EventSubscription` that was deleted by this mutation. */
  eventSubscription?: Maybe<EventSubscription>;
  /** An edge for our `EventSubscription`. May be used by Relay 1. */
  eventSubscriptionEdge?: Maybe<EventSubscriptionEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `EventSubscription` mutation. */
export type DeleteEventSubscriptionPayloadEventSubscriptionEdgeArgs = {
  orderBy?: Array<EventSubscriptionOrderBy>;
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

export type EmailSuppression = Node & {
  __typename?: 'EmailSuppression';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  email: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  reason: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  source?: Maybe<Scalars['String']['output']>;
};

export type EmailSuppressionAggregates = {
  __typename?: 'EmailSuppressionAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<EmailSuppressionDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/**
 * A condition to be used against `EmailSuppression` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type EmailSuppressionCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `reason` field. */
  reason?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `source` field. */
  source?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `EmailSuppression` values. */
export type EmailSuppressionConnection = {
  __typename?: 'EmailSuppressionConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<EmailSuppressionAggregates>;
  /** A list of edges which contains the `EmailSuppression` and cursor to aid in pagination. */
  edges: Array<EmailSuppressionEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<EmailSuppressionAggregates>>;
  /** A list of `EmailSuppression` objects. */
  nodes: Array<EmailSuppression>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EmailSuppression` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `EmailSuppression` values. */
export type EmailSuppressionConnectionGroupedAggregatesArgs = {
  groupBy: Array<EmailSuppressionGroupBy>;
  having?: InputMaybe<EmailSuppressionHavingInput>;
};

export type EmailSuppressionDistinctCountAggregates = {
  __typename?: 'EmailSuppressionDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of email across the matching connection */
  email?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of reason across the matching connection */
  reason?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of source across the matching connection */
  source?: Maybe<Scalars['BigInt']['output']>;
};

/** A `EmailSuppression` edge in the connection. */
export type EmailSuppressionEdge = {
  __typename?: 'EmailSuppressionEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `EmailSuppression` at the end of the edge. */
  node: EmailSuppression;
};

/** A filter to be used against `EmailSuppression` object types. All fields are combined with a logical ‘and.’ */
export type EmailSuppressionFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EmailSuppressionFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `email` field. */
  email?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<EmailSuppressionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EmailSuppressionFilter>>;
  /** Filter by the object’s `reason` field. */
  reason?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `source` field. */
  source?: InputMaybe<StringFilter>;
};

/** Grouping methods for `EmailSuppression` for usage during aggregation. */
export enum EmailSuppressionGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Email = 'EMAIL',
  Reason = 'REASON',
  Source = 'SOURCE'
}

export type EmailSuppressionHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EmailSuppressionHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `EmailSuppression` aggregates. */
export type EmailSuppressionHavingInput = {
  AND?: InputMaybe<Array<EmailSuppressionHavingInput>>;
  OR?: InputMaybe<Array<EmailSuppressionHavingInput>>;
  average?: InputMaybe<EmailSuppressionHavingAverageInput>;
  distinctCount?: InputMaybe<EmailSuppressionHavingDistinctCountInput>;
  max?: InputMaybe<EmailSuppressionHavingMaxInput>;
  min?: InputMaybe<EmailSuppressionHavingMinInput>;
  stddevPopulation?: InputMaybe<EmailSuppressionHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<EmailSuppressionHavingStddevSampleInput>;
  sum?: InputMaybe<EmailSuppressionHavingSumInput>;
  variancePopulation?: InputMaybe<EmailSuppressionHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<EmailSuppressionHavingVarianceSampleInput>;
};

export type EmailSuppressionHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EmailSuppressionHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EmailSuppressionHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EmailSuppressionHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EmailSuppressionHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EmailSuppressionHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EmailSuppressionHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Methods to use when ordering `EmailSuppression`. */
export enum EmailSuppressionOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ReasonAsc = 'REASON_ASC',
  ReasonDesc = 'REASON_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SourceAsc = 'SOURCE_ASC',
  SourceDesc = 'SOURCE_DESC'
}

export type EventLog = Node & {
  __typename?: 'EventLog';
  correlationId?: Maybe<Scalars['String']['output']>;
  data: Scalars['JSON']['output'];
  dataschema?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  organizationId: Scalars['String']['output'];
  recordedAt?: Maybe<Scalars['Datetime']['output']>;
  rowId: Scalars['UUID']['output'];
  schemaId?: Maybe<Scalars['String']['output']>;
  source: Scalars['String']['output'];
  specversion?: Maybe<Scalars['String']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type EventLogAggregates = {
  __typename?: 'EventLogAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<EventLogDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/**
 * A condition to be used against `EventLog` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type EventLogCondition = {
  /** Checks for equality with the object’s `correlationId` field. */
  correlationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `dataschema` field. */
  dataschema?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `recordedAt` field. */
  recordedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `schemaId` field. */
  schemaId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `source` field. */
  source?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `specversion` field. */
  specversion?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `subject` field. */
  subject?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `timestamp` field. */
  timestamp?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `EventLog` values. */
export type EventLogConnection = {
  __typename?: 'EventLogConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<EventLogAggregates>;
  /** A list of edges which contains the `EventLog` and cursor to aid in pagination. */
  edges: Array<EventLogEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<EventLogAggregates>>;
  /** A list of `EventLog` objects. */
  nodes: Array<EventLog>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EventLog` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `EventLog` values. */
export type EventLogConnectionGroupedAggregatesArgs = {
  groupBy: Array<EventLogGroupBy>;
  having?: InputMaybe<EventLogHavingInput>;
};

export type EventLogDistinctCountAggregates = {
  __typename?: 'EventLogDistinctCountAggregates';
  /** Distinct count of correlationId across the matching connection */
  correlationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of data across the matching connection */
  data?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of dataschema across the matching connection */
  dataschema?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of recordedAt across the matching connection */
  recordedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of schemaId across the matching connection */
  schemaId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of source across the matching connection */
  source?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of specversion across the matching connection */
  specversion?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of subject across the matching connection */
  subject?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of timestamp across the matching connection */
  timestamp?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of type across the matching connection */
  type?: Maybe<Scalars['BigInt']['output']>;
};

/** A `EventLog` edge in the connection. */
export type EventLogEdge = {
  __typename?: 'EventLogEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `EventLog` at the end of the edge. */
  node: EventLog;
};

/** A filter to be used against `EventLog` object types. All fields are combined with a logical ‘and.’ */
export type EventLogFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EventLogFilter>>;
  /** Filter by the object’s `correlationId` field. */
  correlationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `dataschema` field. */
  dataschema?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<EventLogFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EventLogFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `recordedAt` field. */
  recordedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `schemaId` field. */
  schemaId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `source` field. */
  source?: InputMaybe<StringFilter>;
  /** Filter by the object’s `specversion` field. */
  specversion?: InputMaybe<StringFilter>;
  /** Filter by the object’s `subject` field. */
  subject?: InputMaybe<StringFilter>;
  /** Filter by the object’s `timestamp` field. */
  timestamp?: InputMaybe<StringFilter>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<StringFilter>;
};

/** Grouping methods for `EventLog` for usage during aggregation. */
export enum EventLogGroupBy {
  CorrelationId = 'CORRELATION_ID',
  Data = 'DATA',
  Dataschema = 'DATASCHEMA',
  OrganizationId = 'ORGANIZATION_ID',
  RecordedAt = 'RECORDED_AT',
  RecordedAtTruncatedToDay = 'RECORDED_AT_TRUNCATED_TO_DAY',
  RecordedAtTruncatedToHour = 'RECORDED_AT_TRUNCATED_TO_HOUR',
  SchemaId = 'SCHEMA_ID',
  Source = 'SOURCE',
  Specversion = 'SPECVERSION',
  Subject = 'SUBJECT',
  Timestamp = 'TIMESTAMP',
  Type = 'TYPE'
}

export type EventLogHavingAverageInput = {
  recordedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventLogHavingDistinctCountInput = {
  recordedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `EventLog` aggregates. */
export type EventLogHavingInput = {
  AND?: InputMaybe<Array<EventLogHavingInput>>;
  OR?: InputMaybe<Array<EventLogHavingInput>>;
  average?: InputMaybe<EventLogHavingAverageInput>;
  distinctCount?: InputMaybe<EventLogHavingDistinctCountInput>;
  max?: InputMaybe<EventLogHavingMaxInput>;
  min?: InputMaybe<EventLogHavingMinInput>;
  stddevPopulation?: InputMaybe<EventLogHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<EventLogHavingStddevSampleInput>;
  sum?: InputMaybe<EventLogHavingSumInput>;
  variancePopulation?: InputMaybe<EventLogHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<EventLogHavingVarianceSampleInput>;
};

export type EventLogHavingMaxInput = {
  recordedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventLogHavingMinInput = {
  recordedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventLogHavingStddevPopulationInput = {
  recordedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventLogHavingStddevSampleInput = {
  recordedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventLogHavingSumInput = {
  recordedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventLogHavingVariancePopulationInput = {
  recordedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventLogHavingVarianceSampleInput = {
  recordedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Methods to use when ordering `EventLog`. */
export enum EventLogOrderBy {
  CorrelationIdAsc = 'CORRELATION_ID_ASC',
  CorrelationIdDesc = 'CORRELATION_ID_DESC',
  DataschemaAsc = 'DATASCHEMA_ASC',
  DataschemaDesc = 'DATASCHEMA_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RecordedAtAsc = 'RECORDED_AT_ASC',
  RecordedAtDesc = 'RECORDED_AT_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SchemaIdAsc = 'SCHEMA_ID_ASC',
  SchemaIdDesc = 'SCHEMA_ID_DESC',
  SourceAsc = 'SOURCE_ASC',
  SourceDesc = 'SOURCE_DESC',
  SpecversionAsc = 'SPECVERSION_ASC',
  SpecversionDesc = 'SPECVERSION_DESC',
  SubjectAsc = 'SUBJECT_ASC',
  SubjectDesc = 'SUBJECT_DESC',
  TimestampAsc = 'TIMESTAMP_ASC',
  TimestampDesc = 'TIMESTAMP_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC'
}

export type EventRoutingRule = Node & {
  __typename?: 'EventRoutingRule';
  batch?: Maybe<Scalars['JSON']['output']>;
  celCondition?: Maybe<Scalars['String']['output']>;
  condition?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `DeadLetterEvent`. */
  deadLetterEventsByRoutingRuleId: DeadLetterEventConnection;
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


export type EventRoutingRuleDeadLetterEventsByRoutingRuleIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DeadLetterEventCondition>;
  filter?: InputMaybe<DeadLetterEventFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DeadLetterEventOrderBy>>;
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
  /** Checks for equality with the object’s `celCondition` field. */
  celCondition?: InputMaybe<Scalars['String']['input']>;
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
  batch?: InputMaybe<BigIntFilter>;
  celCondition?: InputMaybe<BigIntFilter>;
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
  /** Distinct count of batch across the matching connection */
  batch?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of celCondition across the matching connection */
  celCondition?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `celCondition` field. */
  celCondition?: InputMaybe<StringFilter>;
  /** Filter by the object’s `condition` field. */
  condition?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `deadLetterEventsByRoutingRuleId` relation. */
  deadLetterEventsByRoutingRuleId?: InputMaybe<EventRoutingRuleToManyDeadLetterEventFilter>;
  /** Some related `deadLetterEventsByRoutingRuleId` exist. */
  deadLetterEventsByRoutingRuleIdExist?: InputMaybe<Scalars['Boolean']['input']>;
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
  Batch = 'BATCH',
  CelCondition = 'CEL_CONDITION',
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
  batch?: InputMaybe<Scalars['JSON']['input']>;
  celCondition?: InputMaybe<Scalars['String']['input']>;
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
  CelConditionAsc = 'CEL_CONDITION_ASC',
  CelConditionDesc = 'CEL_CONDITION_DESC',
  ConditionAsc = 'CONDITION_ASC',
  ConditionDesc = 'CONDITION_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DeadLetterEventsByRoutingRuleIdAverageAttemptsAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_AVERAGE_ATTEMPTS_ASC',
  DeadLetterEventsByRoutingRuleIdAverageAttemptsDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_AVERAGE_ATTEMPTS_DESC',
  DeadLetterEventsByRoutingRuleIdCountAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_COUNT_ASC',
  DeadLetterEventsByRoutingRuleIdCountDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_COUNT_DESC',
  DeadLetterEventsByRoutingRuleIdDistinctCountAttemptsAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_ATTEMPTS_ASC',
  DeadLetterEventsByRoutingRuleIdDistinctCountAttemptsDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_ATTEMPTS_DESC',
  DeadLetterEventsByRoutingRuleIdDistinctCountCreatedAtAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_CREATED_AT_ASC',
  DeadLetterEventsByRoutingRuleIdDistinctCountCreatedAtDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_CREATED_AT_DESC',
  DeadLetterEventsByRoutingRuleIdDistinctCountErrorAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_ERROR_ASC',
  DeadLetterEventsByRoutingRuleIdDistinctCountErrorCodeAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_ERROR_CODE_ASC',
  DeadLetterEventsByRoutingRuleIdDistinctCountErrorCodeDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_ERROR_CODE_DESC',
  DeadLetterEventsByRoutingRuleIdDistinctCountErrorDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_ERROR_DESC',
  DeadLetterEventsByRoutingRuleIdDistinctCountEventDataAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_EVENT_DATA_ASC',
  DeadLetterEventsByRoutingRuleIdDistinctCountEventDataDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_EVENT_DATA_DESC',
  DeadLetterEventsByRoutingRuleIdDistinctCountEventSourceAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_EVENT_SOURCE_ASC',
  DeadLetterEventsByRoutingRuleIdDistinctCountEventSourceDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_EVENT_SOURCE_DESC',
  DeadLetterEventsByRoutingRuleIdDistinctCountEventTypeAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_EVENT_TYPE_ASC',
  DeadLetterEventsByRoutingRuleIdDistinctCountEventTypeDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_EVENT_TYPE_DESC',
  DeadLetterEventsByRoutingRuleIdDistinctCountLastAttemptAtAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_LAST_ATTEMPT_AT_ASC',
  DeadLetterEventsByRoutingRuleIdDistinctCountLastAttemptAtDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_LAST_ATTEMPT_AT_DESC',
  DeadLetterEventsByRoutingRuleIdDistinctCountOrganizationIdAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  DeadLetterEventsByRoutingRuleIdDistinctCountOrganizationIdDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  DeadLetterEventsByRoutingRuleIdDistinctCountOriginalEventIdAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_ORIGINAL_EVENT_ID_ASC',
  DeadLetterEventsByRoutingRuleIdDistinctCountOriginalEventIdDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_ORIGINAL_EVENT_ID_DESC',
  DeadLetterEventsByRoutingRuleIdDistinctCountResolvedAtAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_RESOLVED_AT_ASC',
  DeadLetterEventsByRoutingRuleIdDistinctCountResolvedAtDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_RESOLVED_AT_DESC',
  DeadLetterEventsByRoutingRuleIdDistinctCountRoutingRuleIdAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_ROUTING_RULE_ID_ASC',
  DeadLetterEventsByRoutingRuleIdDistinctCountRoutingRuleIdDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_ROUTING_RULE_ID_DESC',
  DeadLetterEventsByRoutingRuleIdDistinctCountRowIdAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_ROW_ID_ASC',
  DeadLetterEventsByRoutingRuleIdDistinctCountRowIdDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_DISTINCT_COUNT_ROW_ID_DESC',
  DeadLetterEventsByRoutingRuleIdMaxAttemptsAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_MAX_ATTEMPTS_ASC',
  DeadLetterEventsByRoutingRuleIdMaxAttemptsDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_MAX_ATTEMPTS_DESC',
  DeadLetterEventsByRoutingRuleIdMinAttemptsAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_MIN_ATTEMPTS_ASC',
  DeadLetterEventsByRoutingRuleIdMinAttemptsDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_MIN_ATTEMPTS_DESC',
  DeadLetterEventsByRoutingRuleIdStddevPopulationAttemptsAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_STDDEV_POPULATION_ATTEMPTS_ASC',
  DeadLetterEventsByRoutingRuleIdStddevPopulationAttemptsDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_STDDEV_POPULATION_ATTEMPTS_DESC',
  DeadLetterEventsByRoutingRuleIdStddevSampleAttemptsAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_STDDEV_SAMPLE_ATTEMPTS_ASC',
  DeadLetterEventsByRoutingRuleIdStddevSampleAttemptsDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_STDDEV_SAMPLE_ATTEMPTS_DESC',
  DeadLetterEventsByRoutingRuleIdSumAttemptsAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_SUM_ATTEMPTS_ASC',
  DeadLetterEventsByRoutingRuleIdSumAttemptsDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_SUM_ATTEMPTS_DESC',
  DeadLetterEventsByRoutingRuleIdVariancePopulationAttemptsAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_VARIANCE_POPULATION_ATTEMPTS_ASC',
  DeadLetterEventsByRoutingRuleIdVariancePopulationAttemptsDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_VARIANCE_POPULATION_ATTEMPTS_DESC',
  DeadLetterEventsByRoutingRuleIdVarianceSampleAttemptsAsc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_VARIANCE_SAMPLE_ATTEMPTS_ASC',
  DeadLetterEventsByRoutingRuleIdVarianceSampleAttemptsDesc = 'DEAD_LETTER_EVENTS_BY_ROUTING_RULE_ID_VARIANCE_SAMPLE_ATTEMPTS_DESC',
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
  batch?: InputMaybe<Scalars['JSON']['input']>;
  celCondition?: InputMaybe<Scalars['String']['input']>;
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

/** A filter to be used against many `DeadLetterEvent` object types. All fields are combined with a logical ‘and.’ */
export type EventRoutingRuleToManyDeadLetterEventFilter = {
  /** Aggregates across related `DeadLetterEvent` match the filter criteria. */
  aggregates?: InputMaybe<DeadLetterEventAggregatesFilter>;
  /** Every related `DeadLetterEvent` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<DeadLetterEventFilter>;
  /** No related `DeadLetterEvent` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<DeadLetterEventFilter>;
  /** Some related `DeadLetterEvent` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<DeadLetterEventFilter>;
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

export type EventSchema = Node & {
  __typename?: 'EventSchema';
  compatibilityMode: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  enforcement: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  migrationTransform?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  organizationId: Scalars['String']['output'];
  payloadSchema?: Maybe<Scalars['JSON']['output']>;
  previousVersionId?: Maybe<Scalars['UUID']['output']>;
  rowId: Scalars['UUID']['output'];
  source: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  version: Scalars['Int']['output'];
  visibility: Scalars['String']['output'];
};

export type EventSchemaAggregates = {
  __typename?: 'EventSchemaAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<EventSchemaAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<EventSchemaDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<EventSchemaMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<EventSchemaMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<EventSchemaStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<EventSchemaStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<EventSchemaSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<EventSchemaVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<EventSchemaVarianceSampleAggregates>;
};

export type EventSchemaAverageAggregates = {
  __typename?: 'EventSchemaAverageAggregates';
  /** Mean average of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `EventSchema` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type EventSchemaCondition = {
  /** Checks for equality with the object’s `compatibilityMode` field. */
  compatibilityMode?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `enforcement` field. */
  enforcement?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `migrationTransform` field. */
  migrationTransform?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `previousVersionId` field. */
  previousVersionId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `source` field. */
  source?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `version` field. */
  version?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `visibility` field. */
  visibility?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `EventSchema` values. */
export type EventSchemaConnection = {
  __typename?: 'EventSchemaConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<EventSchemaAggregates>;
  /** A list of edges which contains the `EventSchema` and cursor to aid in pagination. */
  edges: Array<EventSchemaEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<EventSchemaAggregates>>;
  /** A list of `EventSchema` objects. */
  nodes: Array<EventSchema>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EventSchema` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `EventSchema` values. */
export type EventSchemaConnectionGroupedAggregatesArgs = {
  groupBy: Array<EventSchemaGroupBy>;
  having?: InputMaybe<EventSchemaHavingInput>;
};

export type EventSchemaDistinctCountAggregates = {
  __typename?: 'EventSchemaDistinctCountAggregates';
  /** Distinct count of compatibilityMode across the matching connection */
  compatibilityMode?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of enforcement across the matching connection */
  enforcement?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of migrationTransform across the matching connection */
  migrationTransform?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of payloadSchema across the matching connection */
  payloadSchema?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of previousVersionId across the matching connection */
  previousVersionId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of source across the matching connection */
  source?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of version across the matching connection */
  version?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of visibility across the matching connection */
  visibility?: Maybe<Scalars['BigInt']['output']>;
};

/** A `EventSchema` edge in the connection. */
export type EventSchemaEdge = {
  __typename?: 'EventSchemaEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `EventSchema` at the end of the edge. */
  node: EventSchema;
};

/** A filter to be used against `EventSchema` object types. All fields are combined with a logical ‘and.’ */
export type EventSchemaFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EventSchemaFilter>>;
  /** Filter by the object’s `compatibilityMode` field. */
  compatibilityMode?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `enforcement` field. */
  enforcement?: InputMaybe<StringFilter>;
  /** Filter by the object’s `migrationTransform` field. */
  migrationTransform?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<EventSchemaFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EventSchemaFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `previousVersionId` field. */
  previousVersionId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `source` field. */
  source?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `version` field. */
  version?: InputMaybe<IntFilter>;
  /** Filter by the object’s `visibility` field. */
  visibility?: InputMaybe<StringFilter>;
};

/** Grouping methods for `EventSchema` for usage during aggregation. */
export enum EventSchemaGroupBy {
  CompatibilityMode = 'COMPATIBILITY_MODE',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Description = 'DESCRIPTION',
  Enforcement = 'ENFORCEMENT',
  MigrationTransform = 'MIGRATION_TRANSFORM',
  Name = 'NAME',
  OrganizationId = 'ORGANIZATION_ID',
  PayloadSchema = 'PAYLOAD_SCHEMA',
  PreviousVersionId = 'PREVIOUS_VERSION_ID',
  Source = 'SOURCE',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  Version = 'VERSION',
  Visibility = 'VISIBILITY'
}

export type EventSchemaHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type EventSchemaHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

/** Conditions for `EventSchema` aggregates. */
export type EventSchemaHavingInput = {
  AND?: InputMaybe<Array<EventSchemaHavingInput>>;
  OR?: InputMaybe<Array<EventSchemaHavingInput>>;
  average?: InputMaybe<EventSchemaHavingAverageInput>;
  distinctCount?: InputMaybe<EventSchemaHavingDistinctCountInput>;
  max?: InputMaybe<EventSchemaHavingMaxInput>;
  min?: InputMaybe<EventSchemaHavingMinInput>;
  stddevPopulation?: InputMaybe<EventSchemaHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<EventSchemaHavingStddevSampleInput>;
  sum?: InputMaybe<EventSchemaHavingSumInput>;
  variancePopulation?: InputMaybe<EventSchemaHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<EventSchemaHavingVarianceSampleInput>;
};

export type EventSchemaHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type EventSchemaHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type EventSchemaHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type EventSchemaHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type EventSchemaHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type EventSchemaHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type EventSchemaHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

/** An input for mutations affecting `EventSchema` */
export type EventSchemaInput = {
  compatibilityMode?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enforcement?: InputMaybe<Scalars['String']['input']>;
  migrationTransform?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  payloadSchema?: InputMaybe<Scalars['JSON']['input']>;
  previousVersionId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  source: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
  visibility?: InputMaybe<Scalars['String']['input']>;
};

export type EventSchemaMaxAggregates = {
  __typename?: 'EventSchemaMaxAggregates';
  /** Maximum of version across the matching connection */
  version?: Maybe<Scalars['Int']['output']>;
};

export type EventSchemaMinAggregates = {
  __typename?: 'EventSchemaMinAggregates';
  /** Minimum of version across the matching connection */
  version?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `EventSchema`. */
export enum EventSchemaOrderBy {
  CompatibilityModeAsc = 'COMPATIBILITY_MODE_ASC',
  CompatibilityModeDesc = 'COMPATIBILITY_MODE_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  EnforcementAsc = 'ENFORCEMENT_ASC',
  EnforcementDesc = 'ENFORCEMENT_DESC',
  MigrationTransformAsc = 'MIGRATION_TRANSFORM_ASC',
  MigrationTransformDesc = 'MIGRATION_TRANSFORM_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PreviousVersionIdAsc = 'PREVIOUS_VERSION_ID_ASC',
  PreviousVersionIdDesc = 'PREVIOUS_VERSION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SourceAsc = 'SOURCE_ASC',
  SourceDesc = 'SOURCE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  VersionAsc = 'VERSION_ASC',
  VersionDesc = 'VERSION_DESC',
  VisibilityAsc = 'VISIBILITY_ASC',
  VisibilityDesc = 'VISIBILITY_DESC'
}

/** Represents an update to a `EventSchema`. Fields that are set will be updated. */
export type EventSchemaPatch = {
  compatibilityMode?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enforcement?: InputMaybe<Scalars['String']['input']>;
  migrationTransform?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  payloadSchema?: InputMaybe<Scalars['JSON']['input']>;
  previousVersionId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
  visibility?: InputMaybe<Scalars['String']['input']>;
};

export type EventSchemaStddevPopulationAggregates = {
  __typename?: 'EventSchemaStddevPopulationAggregates';
  /** Population standard deviation of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
};

export type EventSchemaStddevSampleAggregates = {
  __typename?: 'EventSchemaStddevSampleAggregates';
  /** Sample standard deviation of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
};

export type EventSchemaSumAggregates = {
  __typename?: 'EventSchemaSumAggregates';
  /** Sum of version across the matching connection */
  version: Scalars['BigInt']['output'];
};

export type EventSchemaVariancePopulationAggregates = {
  __typename?: 'EventSchemaVariancePopulationAggregates';
  /** Population variance of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
};

export type EventSchemaVarianceSampleAggregates = {
  __typename?: 'EventSchemaVarianceSampleAggregates';
  /** Sample variance of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
};

export type EventSubscription = Node & {
  __typename?: 'EventSubscription';
  backoffMultiplier: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  enabled: Scalars['Boolean']['output'];
  hmacSecret: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  initialBackoffMs: Scalars['Int']['output'];
  maxRetries: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  organizationId: Scalars['String']['output'];
  payloadMode: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  signatureHeader: Scalars['String']['output'];
  sourcePattern?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `SubscriptionDelivery`. */
  subscriptionDeliveriesBySubscriptionId: SubscriptionDeliveryConnection;
  targetUrl: Scalars['String']['output'];
  transform?: Maybe<Scalars['String']['output']>;
  typePattern: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type EventSubscriptionSubscriptionDeliveriesBySubscriptionIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SubscriptionDeliveryCondition>;
  filter?: InputMaybe<SubscriptionDeliveryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscriptionDeliveryOrderBy>>;
};

export type EventSubscriptionAggregates = {
  __typename?: 'EventSubscriptionAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<EventSubscriptionAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<EventSubscriptionDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<EventSubscriptionMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<EventSubscriptionMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<EventSubscriptionStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<EventSubscriptionStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<EventSubscriptionSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<EventSubscriptionVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<EventSubscriptionVarianceSampleAggregates>;
};

export type EventSubscriptionAverageAggregates = {
  __typename?: 'EventSubscriptionAverageAggregates';
  /** Mean average of backoffMultiplier across the matching connection */
  backoffMultiplier?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of initialBackoffMs across the matching connection */
  initialBackoffMs?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of maxRetries across the matching connection */
  maxRetries?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `EventSubscription` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type EventSubscriptionCondition = {
  /** Checks for equality with the object’s `backoffMultiplier` field. */
  backoffMultiplier?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `enabled` field. */
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `hmacSecret` field. */
  hmacSecret?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `initialBackoffMs` field. */
  initialBackoffMs?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `maxRetries` field. */
  maxRetries?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `payloadMode` field. */
  payloadMode?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `signatureHeader` field. */
  signatureHeader?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `sourcePattern` field. */
  sourcePattern?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `targetUrl` field. */
  targetUrl?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `transform` field. */
  transform?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `typePattern` field. */
  typePattern?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `EventSubscription` values. */
export type EventSubscriptionConnection = {
  __typename?: 'EventSubscriptionConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<EventSubscriptionAggregates>;
  /** A list of edges which contains the `EventSubscription` and cursor to aid in pagination. */
  edges: Array<EventSubscriptionEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<EventSubscriptionAggregates>>;
  /** A list of `EventSubscription` objects. */
  nodes: Array<EventSubscription>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EventSubscription` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `EventSubscription` values. */
export type EventSubscriptionConnectionGroupedAggregatesArgs = {
  groupBy: Array<EventSubscriptionGroupBy>;
  having?: InputMaybe<EventSubscriptionHavingInput>;
};

export type EventSubscriptionDistinctCountAggregates = {
  __typename?: 'EventSubscriptionDistinctCountAggregates';
  /** Distinct count of backoffMultiplier across the matching connection */
  backoffMultiplier?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of enabled across the matching connection */
  enabled?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of hmacSecret across the matching connection */
  hmacSecret?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of initialBackoffMs across the matching connection */
  initialBackoffMs?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of maxRetries across the matching connection */
  maxRetries?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of payloadMode across the matching connection */
  payloadMode?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of signatureHeader across the matching connection */
  signatureHeader?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of sourcePattern across the matching connection */
  sourcePattern?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of targetUrl across the matching connection */
  targetUrl?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of transform across the matching connection */
  transform?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of typePattern across the matching connection */
  typePattern?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
};

/** A `EventSubscription` edge in the connection. */
export type EventSubscriptionEdge = {
  __typename?: 'EventSubscriptionEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `EventSubscription` at the end of the edge. */
  node: EventSubscription;
};

/** A filter to be used against `EventSubscription` object types. All fields are combined with a logical ‘and.’ */
export type EventSubscriptionFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EventSubscriptionFilter>>;
  /** Filter by the object’s `backoffMultiplier` field. */
  backoffMultiplier?: InputMaybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `enabled` field. */
  enabled?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `hmacSecret` field. */
  hmacSecret?: InputMaybe<StringFilter>;
  /** Filter by the object’s `initialBackoffMs` field. */
  initialBackoffMs?: InputMaybe<IntFilter>;
  /** Filter by the object’s `maxRetries` field. */
  maxRetries?: InputMaybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<EventSubscriptionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EventSubscriptionFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `payloadMode` field. */
  payloadMode?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `signatureHeader` field. */
  signatureHeader?: InputMaybe<StringFilter>;
  /** Filter by the object’s `sourcePattern` field. */
  sourcePattern?: InputMaybe<StringFilter>;
  /** Filter by the object’s `subscriptionDeliveriesBySubscriptionId` relation. */
  subscriptionDeliveriesBySubscriptionId?: InputMaybe<EventSubscriptionToManySubscriptionDeliveryFilter>;
  /** Some related `subscriptionDeliveriesBySubscriptionId` exist. */
  subscriptionDeliveriesBySubscriptionIdExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `targetUrl` field. */
  targetUrl?: InputMaybe<StringFilter>;
  /** Filter by the object’s `transform` field. */
  transform?: InputMaybe<StringFilter>;
  /** Filter by the object’s `typePattern` field. */
  typePattern?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** Grouping methods for `EventSubscription` for usage during aggregation. */
export enum EventSubscriptionGroupBy {
  BackoffMultiplier = 'BACKOFF_MULTIPLIER',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Description = 'DESCRIPTION',
  Enabled = 'ENABLED',
  HmacSecret = 'HMAC_SECRET',
  InitialBackoffMs = 'INITIAL_BACKOFF_MS',
  MaxRetries = 'MAX_RETRIES',
  Name = 'NAME',
  OrganizationId = 'ORGANIZATION_ID',
  PayloadMode = 'PAYLOAD_MODE',
  SignatureHeader = 'SIGNATURE_HEADER',
  SourcePattern = 'SOURCE_PATTERN',
  TargetUrl = 'TARGET_URL',
  Transform = 'TRANSFORM',
  TypePattern = 'TYPE_PATTERN',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type EventSubscriptionHavingAverageInput = {
  backoffMultiplier?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  initialBackoffMs?: InputMaybe<HavingIntFilter>;
  maxRetries?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventSubscriptionHavingDistinctCountInput = {
  backoffMultiplier?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  initialBackoffMs?: InputMaybe<HavingIntFilter>;
  maxRetries?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `EventSubscription` aggregates. */
export type EventSubscriptionHavingInput = {
  AND?: InputMaybe<Array<EventSubscriptionHavingInput>>;
  OR?: InputMaybe<Array<EventSubscriptionHavingInput>>;
  average?: InputMaybe<EventSubscriptionHavingAverageInput>;
  distinctCount?: InputMaybe<EventSubscriptionHavingDistinctCountInput>;
  max?: InputMaybe<EventSubscriptionHavingMaxInput>;
  min?: InputMaybe<EventSubscriptionHavingMinInput>;
  stddevPopulation?: InputMaybe<EventSubscriptionHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<EventSubscriptionHavingStddevSampleInput>;
  sum?: InputMaybe<EventSubscriptionHavingSumInput>;
  variancePopulation?: InputMaybe<EventSubscriptionHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<EventSubscriptionHavingVarianceSampleInput>;
};

export type EventSubscriptionHavingMaxInput = {
  backoffMultiplier?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  initialBackoffMs?: InputMaybe<HavingIntFilter>;
  maxRetries?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventSubscriptionHavingMinInput = {
  backoffMultiplier?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  initialBackoffMs?: InputMaybe<HavingIntFilter>;
  maxRetries?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventSubscriptionHavingStddevPopulationInput = {
  backoffMultiplier?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  initialBackoffMs?: InputMaybe<HavingIntFilter>;
  maxRetries?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventSubscriptionHavingStddevSampleInput = {
  backoffMultiplier?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  initialBackoffMs?: InputMaybe<HavingIntFilter>;
  maxRetries?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventSubscriptionHavingSumInput = {
  backoffMultiplier?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  initialBackoffMs?: InputMaybe<HavingIntFilter>;
  maxRetries?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventSubscriptionHavingVariancePopulationInput = {
  backoffMultiplier?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  initialBackoffMs?: InputMaybe<HavingIntFilter>;
  maxRetries?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type EventSubscriptionHavingVarianceSampleInput = {
  backoffMultiplier?: InputMaybe<HavingIntFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  initialBackoffMs?: InputMaybe<HavingIntFilter>;
  maxRetries?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** An input for mutations affecting `EventSubscription` */
export type EventSubscriptionInput = {
  backoffMultiplier?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  hmacSecret: Scalars['String']['input'];
  initialBackoffMs?: InputMaybe<Scalars['Int']['input']>;
  maxRetries?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  payloadMode?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  signatureHeader?: InputMaybe<Scalars['String']['input']>;
  sourcePattern?: InputMaybe<Scalars['String']['input']>;
  targetUrl: Scalars['String']['input'];
  transform?: InputMaybe<Scalars['String']['input']>;
  typePattern: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type EventSubscriptionMaxAggregates = {
  __typename?: 'EventSubscriptionMaxAggregates';
  /** Maximum of backoffMultiplier across the matching connection */
  backoffMultiplier?: Maybe<Scalars['Int']['output']>;
  /** Maximum of initialBackoffMs across the matching connection */
  initialBackoffMs?: Maybe<Scalars['Int']['output']>;
  /** Maximum of maxRetries across the matching connection */
  maxRetries?: Maybe<Scalars['Int']['output']>;
};

export type EventSubscriptionMinAggregates = {
  __typename?: 'EventSubscriptionMinAggregates';
  /** Minimum of backoffMultiplier across the matching connection */
  backoffMultiplier?: Maybe<Scalars['Int']['output']>;
  /** Minimum of initialBackoffMs across the matching connection */
  initialBackoffMs?: Maybe<Scalars['Int']['output']>;
  /** Minimum of maxRetries across the matching connection */
  maxRetries?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `EventSubscription`. */
export enum EventSubscriptionOrderBy {
  BackoffMultiplierAsc = 'BACKOFF_MULTIPLIER_ASC',
  BackoffMultiplierDesc = 'BACKOFF_MULTIPLIER_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  EnabledAsc = 'ENABLED_ASC',
  EnabledDesc = 'ENABLED_DESC',
  HmacSecretAsc = 'HMAC_SECRET_ASC',
  HmacSecretDesc = 'HMAC_SECRET_DESC',
  InitialBackoffMsAsc = 'INITIAL_BACKOFF_MS_ASC',
  InitialBackoffMsDesc = 'INITIAL_BACKOFF_MS_DESC',
  MaxRetriesAsc = 'MAX_RETRIES_ASC',
  MaxRetriesDesc = 'MAX_RETRIES_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PayloadModeAsc = 'PAYLOAD_MODE_ASC',
  PayloadModeDesc = 'PAYLOAD_MODE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SignatureHeaderAsc = 'SIGNATURE_HEADER_ASC',
  SignatureHeaderDesc = 'SIGNATURE_HEADER_DESC',
  SourcePatternAsc = 'SOURCE_PATTERN_ASC',
  SourcePatternDesc = 'SOURCE_PATTERN_DESC',
  SubscriptionDeliveriesBySubscriptionIdAverageAttemptsAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_AVERAGE_ATTEMPTS_ASC',
  SubscriptionDeliveriesBySubscriptionIdAverageAttemptsDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_AVERAGE_ATTEMPTS_DESC',
  SubscriptionDeliveriesBySubscriptionIdAverageHttpStatusAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_AVERAGE_HTTP_STATUS_ASC',
  SubscriptionDeliveriesBySubscriptionIdAverageHttpStatusDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_AVERAGE_HTTP_STATUS_DESC',
  SubscriptionDeliveriesBySubscriptionIdCountAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_COUNT_ASC',
  SubscriptionDeliveriesBySubscriptionIdCountDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_COUNT_DESC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountAttemptsAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_ATTEMPTS_ASC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountAttemptsDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_ATTEMPTS_DESC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountCompletedAtAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_COMPLETED_AT_ASC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountCompletedAtDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_COMPLETED_AT_DESC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountCreatedAtAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_CREATED_AT_ASC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountCreatedAtDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_CREATED_AT_DESC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountErrorAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_ERROR_ASC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountErrorDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_ERROR_DESC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountEventIdAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_EVENT_ID_ASC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountEventIdDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_EVENT_ID_DESC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountEventTypeAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_EVENT_TYPE_ASC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountEventTypeDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_EVENT_TYPE_DESC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountHttpStatusAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_HTTP_STATUS_ASC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountHttpStatusDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_HTTP_STATUS_DESC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountNextRetryAtAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_NEXT_RETRY_AT_ASC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountNextRetryAtDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_NEXT_RETRY_AT_DESC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountOrganizationIdAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountOrganizationIdDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountPayloadAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_PAYLOAD_ASC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountPayloadDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_PAYLOAD_DESC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountRowIdAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_ROW_ID_ASC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountRowIdDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_ROW_ID_DESC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountStatusAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_STATUS_ASC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountStatusDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_STATUS_DESC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountSubscriptionIdAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_SUBSCRIPTION_ID_ASC',
  SubscriptionDeliveriesBySubscriptionIdDistinctCountSubscriptionIdDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_DISTINCT_COUNT_SUBSCRIPTION_ID_DESC',
  SubscriptionDeliveriesBySubscriptionIdMaxAttemptsAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_MAX_ATTEMPTS_ASC',
  SubscriptionDeliveriesBySubscriptionIdMaxAttemptsDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_MAX_ATTEMPTS_DESC',
  SubscriptionDeliveriesBySubscriptionIdMaxHttpStatusAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_MAX_HTTP_STATUS_ASC',
  SubscriptionDeliveriesBySubscriptionIdMaxHttpStatusDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_MAX_HTTP_STATUS_DESC',
  SubscriptionDeliveriesBySubscriptionIdMinAttemptsAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_MIN_ATTEMPTS_ASC',
  SubscriptionDeliveriesBySubscriptionIdMinAttemptsDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_MIN_ATTEMPTS_DESC',
  SubscriptionDeliveriesBySubscriptionIdMinHttpStatusAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_MIN_HTTP_STATUS_ASC',
  SubscriptionDeliveriesBySubscriptionIdMinHttpStatusDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_MIN_HTTP_STATUS_DESC',
  SubscriptionDeliveriesBySubscriptionIdStddevPopulationAttemptsAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_STDDEV_POPULATION_ATTEMPTS_ASC',
  SubscriptionDeliveriesBySubscriptionIdStddevPopulationAttemptsDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_STDDEV_POPULATION_ATTEMPTS_DESC',
  SubscriptionDeliveriesBySubscriptionIdStddevPopulationHttpStatusAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_STDDEV_POPULATION_HTTP_STATUS_ASC',
  SubscriptionDeliveriesBySubscriptionIdStddevPopulationHttpStatusDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_STDDEV_POPULATION_HTTP_STATUS_DESC',
  SubscriptionDeliveriesBySubscriptionIdStddevSampleAttemptsAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_STDDEV_SAMPLE_ATTEMPTS_ASC',
  SubscriptionDeliveriesBySubscriptionIdStddevSampleAttemptsDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_STDDEV_SAMPLE_ATTEMPTS_DESC',
  SubscriptionDeliveriesBySubscriptionIdStddevSampleHttpStatusAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_STDDEV_SAMPLE_HTTP_STATUS_ASC',
  SubscriptionDeliveriesBySubscriptionIdStddevSampleHttpStatusDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_STDDEV_SAMPLE_HTTP_STATUS_DESC',
  SubscriptionDeliveriesBySubscriptionIdSumAttemptsAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_SUM_ATTEMPTS_ASC',
  SubscriptionDeliveriesBySubscriptionIdSumAttemptsDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_SUM_ATTEMPTS_DESC',
  SubscriptionDeliveriesBySubscriptionIdSumHttpStatusAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_SUM_HTTP_STATUS_ASC',
  SubscriptionDeliveriesBySubscriptionIdSumHttpStatusDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_SUM_HTTP_STATUS_DESC',
  SubscriptionDeliveriesBySubscriptionIdVariancePopulationAttemptsAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_VARIANCE_POPULATION_ATTEMPTS_ASC',
  SubscriptionDeliveriesBySubscriptionIdVariancePopulationAttemptsDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_VARIANCE_POPULATION_ATTEMPTS_DESC',
  SubscriptionDeliveriesBySubscriptionIdVariancePopulationHttpStatusAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_VARIANCE_POPULATION_HTTP_STATUS_ASC',
  SubscriptionDeliveriesBySubscriptionIdVariancePopulationHttpStatusDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_VARIANCE_POPULATION_HTTP_STATUS_DESC',
  SubscriptionDeliveriesBySubscriptionIdVarianceSampleAttemptsAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_VARIANCE_SAMPLE_ATTEMPTS_ASC',
  SubscriptionDeliveriesBySubscriptionIdVarianceSampleAttemptsDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_VARIANCE_SAMPLE_ATTEMPTS_DESC',
  SubscriptionDeliveriesBySubscriptionIdVarianceSampleHttpStatusAsc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_VARIANCE_SAMPLE_HTTP_STATUS_ASC',
  SubscriptionDeliveriesBySubscriptionIdVarianceSampleHttpStatusDesc = 'SUBSCRIPTION_DELIVERIES_BY_SUBSCRIPTION_ID_VARIANCE_SAMPLE_HTTP_STATUS_DESC',
  TargetUrlAsc = 'TARGET_URL_ASC',
  TargetUrlDesc = 'TARGET_URL_DESC',
  TransformAsc = 'TRANSFORM_ASC',
  TransformDesc = 'TRANSFORM_DESC',
  TypePatternAsc = 'TYPE_PATTERN_ASC',
  TypePatternDesc = 'TYPE_PATTERN_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `EventSubscription`. Fields that are set will be updated. */
export type EventSubscriptionPatch = {
  backoffMultiplier?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  hmacSecret?: InputMaybe<Scalars['String']['input']>;
  initialBackoffMs?: InputMaybe<Scalars['Int']['input']>;
  maxRetries?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  payloadMode?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  signatureHeader?: InputMaybe<Scalars['String']['input']>;
  sourcePattern?: InputMaybe<Scalars['String']['input']>;
  targetUrl?: InputMaybe<Scalars['String']['input']>;
  transform?: InputMaybe<Scalars['String']['input']>;
  typePattern?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type EventSubscriptionStddevPopulationAggregates = {
  __typename?: 'EventSubscriptionStddevPopulationAggregates';
  /** Population standard deviation of backoffMultiplier across the matching connection */
  backoffMultiplier?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of initialBackoffMs across the matching connection */
  initialBackoffMs?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of maxRetries across the matching connection */
  maxRetries?: Maybe<Scalars['BigFloat']['output']>;
};

export type EventSubscriptionStddevSampleAggregates = {
  __typename?: 'EventSubscriptionStddevSampleAggregates';
  /** Sample standard deviation of backoffMultiplier across the matching connection */
  backoffMultiplier?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of initialBackoffMs across the matching connection */
  initialBackoffMs?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of maxRetries across the matching connection */
  maxRetries?: Maybe<Scalars['BigFloat']['output']>;
};

export type EventSubscriptionSumAggregates = {
  __typename?: 'EventSubscriptionSumAggregates';
  /** Sum of backoffMultiplier across the matching connection */
  backoffMultiplier: Scalars['BigInt']['output'];
  /** Sum of initialBackoffMs across the matching connection */
  initialBackoffMs: Scalars['BigInt']['output'];
  /** Sum of maxRetries across the matching connection */
  maxRetries: Scalars['BigInt']['output'];
};

/** A filter to be used against many `SubscriptionDelivery` object types. All fields are combined with a logical ‘and.’ */
export type EventSubscriptionToManySubscriptionDeliveryFilter = {
  /** Aggregates across related `SubscriptionDelivery` match the filter criteria. */
  aggregates?: InputMaybe<SubscriptionDeliveryAggregatesFilter>;
  /** Every related `SubscriptionDelivery` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<SubscriptionDeliveryFilter>;
  /** No related `SubscriptionDelivery` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<SubscriptionDeliveryFilter>;
  /** Some related `SubscriptionDelivery` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<SubscriptionDeliveryFilter>;
};

export type EventSubscriptionVariancePopulationAggregates = {
  __typename?: 'EventSubscriptionVariancePopulationAggregates';
  /** Population variance of backoffMultiplier across the matching connection */
  backoffMultiplier?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of initialBackoffMs across the matching connection */
  initialBackoffMs?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of maxRetries across the matching connection */
  maxRetries?: Maybe<Scalars['BigFloat']['output']>;
};

export type EventSubscriptionVarianceSampleAggregates = {
  __typename?: 'EventSubscriptionVarianceSampleAggregates';
  /** Sample variance of backoffMultiplier across the matching connection */
  backoffMultiplier?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of initialBackoffMs across the matching connection */
  initialBackoffMs?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of maxRetries across the matching connection */
  maxRetries?: Maybe<Scalars['BigFloat']['output']>;
};

export type Fn = Node & {
  __typename?: 'Fn';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  executor: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  invocationCount: Scalars['Int']['output'];
  lastInvokedAt?: Maybe<Scalars['Datetime']['output']>;
  limits?: Maybe<Scalars['JSON']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  organizationId: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  runtime: Scalars['String']['output'];
  source?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  wasmModuleUrl?: Maybe<Scalars['String']['output']>;
};

export type FnAggregates = {
  __typename?: 'FnAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<FnAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<FnDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<FnMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<FnMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<FnStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<FnStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<FnSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<FnVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<FnVarianceSampleAggregates>;
};

export type FnAverageAggregates = {
  __typename?: 'FnAverageAggregates';
  /** Mean average of invocationCount across the matching connection */
  invocationCount?: Maybe<Scalars['BigFloat']['output']>;
};

/** A condition to be used against `Fn` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type FnCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `executor` field. */
  executor?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `invocationCount` field. */
  invocationCount?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `lastInvokedAt` field. */
  lastInvokedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `runtime` field. */
  runtime?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `source` field. */
  source?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `wasmModuleUrl` field. */
  wasmModuleUrl?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Fn` values. */
export type FnConnection = {
  __typename?: 'FnConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<FnAggregates>;
  /** A list of edges which contains the `Fn` and cursor to aid in pagination. */
  edges: Array<FnEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<FnAggregates>>;
  /** A list of `Fn` objects. */
  nodes: Array<Fn>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Fn` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `Fn` values. */
export type FnConnectionGroupedAggregatesArgs = {
  groupBy: Array<FnGroupBy>;
  having?: InputMaybe<FnHavingInput>;
};

export type FnDistinctCountAggregates = {
  __typename?: 'FnDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of executor across the matching connection */
  executor?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of invocationCount across the matching connection */
  invocationCount?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of lastInvokedAt across the matching connection */
  lastInvokedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of limits across the matching connection */
  limits?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of metadata across the matching connection */
  metadata?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of runtime across the matching connection */
  runtime?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of source across the matching connection */
  source?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of wasmModuleUrl across the matching connection */
  wasmModuleUrl?: Maybe<Scalars['BigInt']['output']>;
};

/** A `Fn` edge in the connection. */
export type FnEdge = {
  __typename?: 'FnEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Fn` at the end of the edge. */
  node: Fn;
};

/** A filter to be used against `Fn` object types. All fields are combined with a logical ‘and.’ */
export type FnFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<FnFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `executor` field. */
  executor?: InputMaybe<StringFilter>;
  /** Filter by the object’s `invocationCount` field. */
  invocationCount?: InputMaybe<IntFilter>;
  /** Filter by the object’s `lastInvokedAt` field. */
  lastInvokedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<FnFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<FnFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `runtime` field. */
  runtime?: InputMaybe<StringFilter>;
  /** Filter by the object’s `source` field. */
  source?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `wasmModuleUrl` field. */
  wasmModuleUrl?: InputMaybe<StringFilter>;
};

/** Grouping methods for `Fn` for usage during aggregation. */
export enum FnGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Executor = 'EXECUTOR',
  InvocationCount = 'INVOCATION_COUNT',
  LastInvokedAt = 'LAST_INVOKED_AT',
  LastInvokedAtTruncatedToDay = 'LAST_INVOKED_AT_TRUNCATED_TO_DAY',
  LastInvokedAtTruncatedToHour = 'LAST_INVOKED_AT_TRUNCATED_TO_HOUR',
  Limits = 'LIMITS',
  Metadata = 'METADATA',
  Name = 'NAME',
  OrganizationId = 'ORGANIZATION_ID',
  Runtime = 'RUNTIME',
  Source = 'SOURCE',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  WasmModuleUrl = 'WASM_MODULE_URL'
}

export type FnHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  invocationCount?: InputMaybe<HavingIntFilter>;
  lastInvokedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type FnHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  invocationCount?: InputMaybe<HavingIntFilter>;
  lastInvokedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `Fn` aggregates. */
export type FnHavingInput = {
  AND?: InputMaybe<Array<FnHavingInput>>;
  OR?: InputMaybe<Array<FnHavingInput>>;
  average?: InputMaybe<FnHavingAverageInput>;
  distinctCount?: InputMaybe<FnHavingDistinctCountInput>;
  max?: InputMaybe<FnHavingMaxInput>;
  min?: InputMaybe<FnHavingMinInput>;
  stddevPopulation?: InputMaybe<FnHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<FnHavingStddevSampleInput>;
  sum?: InputMaybe<FnHavingSumInput>;
  variancePopulation?: InputMaybe<FnHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<FnHavingVarianceSampleInput>;
};

export type FnHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  invocationCount?: InputMaybe<HavingIntFilter>;
  lastInvokedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type FnHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  invocationCount?: InputMaybe<HavingIntFilter>;
  lastInvokedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type FnHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  invocationCount?: InputMaybe<HavingIntFilter>;
  lastInvokedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type FnHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  invocationCount?: InputMaybe<HavingIntFilter>;
  lastInvokedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type FnHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  invocationCount?: InputMaybe<HavingIntFilter>;
  lastInvokedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type FnHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  invocationCount?: InputMaybe<HavingIntFilter>;
  lastInvokedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type FnHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  invocationCount?: InputMaybe<HavingIntFilter>;
  lastInvokedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type FnMaxAggregates = {
  __typename?: 'FnMaxAggregates';
  /** Maximum of invocationCount across the matching connection */
  invocationCount?: Maybe<Scalars['Int']['output']>;
};

export type FnMinAggregates = {
  __typename?: 'FnMinAggregates';
  /** Minimum of invocationCount across the matching connection */
  invocationCount?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `Fn`. */
export enum FnOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  ExecutorAsc = 'EXECUTOR_ASC',
  ExecutorDesc = 'EXECUTOR_DESC',
  InvocationCountAsc = 'INVOCATION_COUNT_ASC',
  InvocationCountDesc = 'INVOCATION_COUNT_DESC',
  LastInvokedAtAsc = 'LAST_INVOKED_AT_ASC',
  LastInvokedAtDesc = 'LAST_INVOKED_AT_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  RuntimeAsc = 'RUNTIME_ASC',
  RuntimeDesc = 'RUNTIME_DESC',
  SourceAsc = 'SOURCE_ASC',
  SourceDesc = 'SOURCE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  WasmModuleUrlAsc = 'WASM_MODULE_URL_ASC',
  WasmModuleUrlDesc = 'WASM_MODULE_URL_DESC'
}

export type FnStddevPopulationAggregates = {
  __typename?: 'FnStddevPopulationAggregates';
  /** Population standard deviation of invocationCount across the matching connection */
  invocationCount?: Maybe<Scalars['BigFloat']['output']>;
};

export type FnStddevSampleAggregates = {
  __typename?: 'FnStddevSampleAggregates';
  /** Sample standard deviation of invocationCount across the matching connection */
  invocationCount?: Maybe<Scalars['BigFloat']['output']>;
};

export type FnSumAggregates = {
  __typename?: 'FnSumAggregates';
  /** Sum of invocationCount across the matching connection */
  invocationCount: Scalars['BigInt']['output'];
};

export type FnVariancePopulationAggregates = {
  __typename?: 'FnVariancePopulationAggregates';
  /** Population variance of invocationCount across the matching connection */
  invocationCount?: Maybe<Scalars['BigFloat']['output']>;
};

export type FnVarianceSampleAggregates = {
  __typename?: 'FnVarianceSampleAggregates';
  /** Sample variance of invocationCount across the matching connection */
  invocationCount?: Maybe<Scalars['BigFloat']['output']>;
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
  command?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  cwd?: Maybe<Scalars['String']['output']>;
  env: Scalars['JSON']['output'];
  headers?: Maybe<Scalars['JSON']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `Integration`. */
  integrations: IntegrationConnection;
  isEnabled: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  organizationId: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  transport?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  url?: Maybe<Scalars['String']['output']>;
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
  /** Checks for equality with the object’s `transport` field. */
  transport?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `url` field. */
  url?: InputMaybe<Scalars['String']['input']>;
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
  /** Distinct count of headers across the matching connection */
  headers?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of isEnabled across the matching connection */
  isEnabled?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of transport across the matching connection */
  transport?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of type across the matching connection */
  type?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of url across the matching connection */
  url?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `transport` field. */
  transport?: InputMaybe<StringFilter>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `url` field. */
  url?: InputMaybe<StringFilter>;
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
  Headers = 'HEADERS',
  IsEnabled = 'IS_ENABLED',
  Name = 'NAME',
  OrganizationId = 'ORGANIZATION_ID',
  Transport = 'TRANSPORT',
  Type = 'TYPE',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  Url = 'URL'
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
  command?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  cwd?: InputMaybe<Scalars['String']['input']>;
  env?: InputMaybe<Scalars['JSON']['input']>;
  headers?: InputMaybe<Scalars['JSON']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  transport?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
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
  TransportAsc = 'TRANSPORT_ASC',
  TransportDesc = 'TRANSPORT_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UrlAsc = 'URL_ASC',
  UrlDesc = 'URL_DESC'
}

/** Represents an update to a `McpServer`. Fields that are set will be updated. */
export type McpServerPatch = {
  args?: InputMaybe<Scalars['JSON']['input']>;
  command?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  cwd?: InputMaybe<Scalars['String']['input']>;
  env?: InputMaybe<Scalars['JSON']['input']>;
  headers?: InputMaybe<Scalars['JSON']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  transport?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
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

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `EventRoutingRule`. */
  createEventRoutingRule?: Maybe<CreateEventRoutingRulePayload>;
  /** Creates a single `EventSchema`. */
  createEventSchema?: Maybe<CreateEventSchemaPayload>;
  /** Creates a single `EventSubscription`. */
  createEventSubscription?: Maybe<CreateEventSubscriptionPayload>;
  /** Creates a single `Integration`. */
  createIntegration?: Maybe<CreateIntegrationPayload>;
  /** Creates a single `McpServer`. */
  createMcpServer?: Maybe<CreateMcpServerPayload>;
  /** Creates a single `Plugin`. */
  createPlugin?: Maybe<CreatePluginPayload>;
  /** Creates a single `Workflow`. */
  createWorkflow?: Maybe<CreateWorkflowPayload>;
  /** Deletes a single `EventRoutingRule` using a unique key. */
  deleteEventRoutingRule?: Maybe<DeleteEventRoutingRulePayload>;
  /** Deletes a single `EventSchema` using a unique key. */
  deleteEventSchema?: Maybe<DeleteEventSchemaPayload>;
  /** Deletes a single `EventSubscription` using a unique key. */
  deleteEventSubscription?: Maybe<DeleteEventSubscriptionPayload>;
  /** Deletes a single `Integration` using a unique key. */
  deleteIntegration?: Maybe<DeleteIntegrationPayload>;
  /** Deletes a single `McpServer` using a unique key. */
  deleteMcpServer?: Maybe<DeleteMcpServerPayload>;
  /** Deletes a single `Plugin` using a unique key. */
  deletePlugin?: Maybe<DeletePluginPayload>;
  /** Deletes a single `Workflow` using a unique key. */
  deleteWorkflow?: Maybe<DeleteWorkflowPayload>;
  /**
   * Publish an event to trigger matching workflows.
   *
   * Finds event routing rules that match the event type and triggers
   * the associated workflows via Hatchet.
   */
  publishEvent?: Maybe<PublishEventPayload>;
  /** Updates a single `EventRoutingRule` using a unique key and a patch. */
  updateEventRoutingRule?: Maybe<UpdateEventRoutingRulePayload>;
  /** Updates a single `EventSchema` using a unique key and a patch. */
  updateEventSchema?: Maybe<UpdateEventSchemaPayload>;
  /** Updates a single `EventSubscription` using a unique key and a patch. */
  updateEventSubscription?: Maybe<UpdateEventSubscriptionPayload>;
  /** Updates a single `Integration` using a unique key and a patch. */
  updateIntegration?: Maybe<UpdateIntegrationPayload>;
  /** Updates a single `McpServer` using a unique key and a patch. */
  updateMcpServer?: Maybe<UpdateMcpServerPayload>;
  /** Updates a single `Plugin` using a unique key and a patch. */
  updatePlugin?: Maybe<UpdatePluginPayload>;
  /** Updates a single `Workflow` using a unique key and a patch. */
  updateWorkflow?: Maybe<UpdateWorkflowPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEventRoutingRuleArgs = {
  input: CreateEventRoutingRuleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEventSchemaArgs = {
  input: CreateEventSchemaInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEventSubscriptionArgs = {
  input: CreateEventSubscriptionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateIntegrationArgs = {
  input: CreateIntegrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMcpServerArgs = {
  input: CreateMcpServerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePluginArgs = {
  input: CreatePluginInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWorkflowArgs = {
  input: CreateWorkflowInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventRoutingRuleArgs = {
  input: DeleteEventRoutingRuleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventSchemaArgs = {
  input: DeleteEventSchemaInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventSubscriptionArgs = {
  input: DeleteEventSubscriptionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteIntegrationArgs = {
  input: DeleteIntegrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMcpServerArgs = {
  input: DeleteMcpServerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePluginArgs = {
  input: DeletePluginInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkflowArgs = {
  input: DeleteWorkflowInput;
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
export type MutationUpdateEventSchemaArgs = {
  input: UpdateEventSchemaInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventSubscriptionArgs = {
  input: UpdateEventSubscriptionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateIntegrationArgs = {
  input: UpdateIntegrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMcpServerArgs = {
  input: UpdateMcpServerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePluginArgs = {
  input: UpdatePluginInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkflowArgs = {
  input: UpdateWorkflowInput;
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

export type OauthToken = Node & {
  __typename?: 'OauthToken';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  expiresAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  /** Reads a single `Integration` that is related to this `OauthToken`. */
  integration?: Maybe<Integration>;
  integrationId: Scalars['UUID']['output'];
  organizationId: Scalars['String']['output'];
  provider: Scalars['String']['output'];
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
  createdAt?: InputMaybe<BigIntFilter>;
  expiresAt?: InputMaybe<BigIntFilter>;
  integrationId?: InputMaybe<BigIntFilter>;
  organizationId?: InputMaybe<BigIntFilter>;
  provider?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  scope?: InputMaybe<BigIntFilter>;
  tokenType?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
};

export type OauthTokenDistinctCountAggregates = {
  __typename?: 'OauthTokenDistinctCountAggregates';
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
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  ExpiresAt = 'EXPIRES_AT',
  ExpiresAtTruncatedToDay = 'EXPIRES_AT_TRUNCATED_TO_DAY',
  ExpiresAtTruncatedToHour = 'EXPIRES_AT_TRUNCATED_TO_HOUR',
  IntegrationId = 'INTEGRATION_ID',
  OrganizationId = 'ORGANIZATION_ID',
  Provider = 'PROVIDER',
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

/** Methods to use when ordering `OauthToken`. */
export enum OauthTokenOrderBy {
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
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  ScopeAsc = 'SCOPE_ASC',
  ScopeDesc = 'SCOPE_DESC',
  TokenTypeAsc = 'TOKEN_TYPE_ASC',
  TokenTypeDesc = 'TOKEN_TYPE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

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
  edgeCapable?: Maybe<Scalars['Boolean']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  isVerified: Scalars['Boolean']['output'];
  manifest: Scalars['JSON']['output'];
  name: Scalars['String']['output'];
  organizationId: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `PluginUsage`. */
  pluginUsages: PluginUsageConnection;
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  version: Scalars['String']['output'];
  wasmHash: Scalars['String']['output'];
  wasmUrl: Scalars['String']['output'];
};


export type PluginPluginUsagesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PluginUsageCondition>;
  filter?: InputMaybe<PluginUsageFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PluginUsageOrderBy>>;
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
  /** Checks for equality with the object’s `edgeCapable` field. */
  edgeCapable?: InputMaybe<Scalars['Boolean']['input']>;
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
  edgeCapable?: InputMaybe<BigIntFilter>;
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
  /** Distinct count of edgeCapable across the matching connection */
  edgeCapable?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `edgeCapable` field. */
  edgeCapable?: InputMaybe<BooleanFilter>;
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
  /** Filter by the object’s `pluginUsages` relation. */
  pluginUsages?: InputMaybe<PluginToManyPluginUsageFilter>;
  /** Some related `pluginUsages` exist. */
  pluginUsagesExist?: InputMaybe<Scalars['Boolean']['input']>;
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
  EdgeCapable = 'EDGE_CAPABLE',
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
  edgeCapable?: InputMaybe<Scalars['Boolean']['input']>;
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

export type PluginMarketplace = Node & {
  __typename?: 'PluginMarketplace';
  author: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  downloads: Scalars['Int']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isVerified: Scalars['Boolean']['output'];
  manifest: Scalars['JSON']['output'];
  name: Scalars['String']['output'];
  rating?: Maybe<Scalars['Int']['output']>;
  rowId: Scalars['UUID']['output'];
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  version: Scalars['String']['output'];
  wasmUrl: Scalars['String']['output'];
};

export type PluginMarketplaceAggregates = {
  __typename?: 'PluginMarketplaceAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<PluginMarketplaceAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<PluginMarketplaceDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<PluginMarketplaceMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<PluginMarketplaceMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<PluginMarketplaceStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<PluginMarketplaceStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<PluginMarketplaceSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<PluginMarketplaceVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<PluginMarketplaceVarianceSampleAggregates>;
};

export type PluginMarketplaceAverageAggregates = {
  __typename?: 'PluginMarketplaceAverageAggregates';
  /** Mean average of downloads across the matching connection */
  downloads?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of rating across the matching connection */
  rating?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `PluginMarketplace` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PluginMarketplaceCondition = {
  /** Checks for equality with the object’s `author` field. */
  author?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `downloads` field. */
  downloads?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `isVerified` field. */
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rating` field. */
  rating?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `version` field. */
  version?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `wasmUrl` field. */
  wasmUrl?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `PluginMarketplace` values. */
export type PluginMarketplaceConnection = {
  __typename?: 'PluginMarketplaceConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<PluginMarketplaceAggregates>;
  /** A list of edges which contains the `PluginMarketplace` and cursor to aid in pagination. */
  edges: Array<PluginMarketplaceEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<PluginMarketplaceAggregates>>;
  /** A list of `PluginMarketplace` objects. */
  nodes: Array<PluginMarketplace>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PluginMarketplace` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `PluginMarketplace` values. */
export type PluginMarketplaceConnectionGroupedAggregatesArgs = {
  groupBy: Array<PluginMarketplaceGroupBy>;
  having?: InputMaybe<PluginMarketplaceHavingInput>;
};

export type PluginMarketplaceDistinctCountAggregates = {
  __typename?: 'PluginMarketplaceDistinctCountAggregates';
  /** Distinct count of author across the matching connection */
  author?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of downloads across the matching connection */
  downloads?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of isVerified across the matching connection */
  isVerified?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of manifest across the matching connection */
  manifest?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of name across the matching connection */
  name?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rating across the matching connection */
  rating?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of tags across the matching connection */
  tags?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of version across the matching connection */
  version?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of wasmUrl across the matching connection */
  wasmUrl?: Maybe<Scalars['BigInt']['output']>;
};

/** A `PluginMarketplace` edge in the connection. */
export type PluginMarketplaceEdge = {
  __typename?: 'PluginMarketplaceEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PluginMarketplace` at the end of the edge. */
  node: PluginMarketplace;
};

/** A filter to be used against `PluginMarketplace` object types. All fields are combined with a logical ‘and.’ */
export type PluginMarketplaceFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PluginMarketplaceFilter>>;
  /** Filter by the object’s `author` field. */
  author?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `downloads` field. */
  downloads?: InputMaybe<IntFilter>;
  /** Filter by the object’s `isVerified` field. */
  isVerified?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PluginMarketplaceFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PluginMarketplaceFilter>>;
  /** Filter by the object’s `rating` field. */
  rating?: InputMaybe<IntFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `tags` field. */
  tags?: InputMaybe<StringListFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `version` field. */
  version?: InputMaybe<StringFilter>;
  /** Filter by the object’s `wasmUrl` field. */
  wasmUrl?: InputMaybe<StringFilter>;
};

/** Grouping methods for `PluginMarketplace` for usage during aggregation. */
export enum PluginMarketplaceGroupBy {
  Author = 'AUTHOR',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Description = 'DESCRIPTION',
  Downloads = 'DOWNLOADS',
  IsVerified = 'IS_VERIFIED',
  Manifest = 'MANIFEST',
  Name = 'NAME',
  Rating = 'RATING',
  Tags = 'TAGS',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  Version = 'VERSION',
  WasmUrl = 'WASM_URL'
}

export type PluginMarketplaceHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  downloads?: InputMaybe<HavingIntFilter>;
  rating?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginMarketplaceHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  downloads?: InputMaybe<HavingIntFilter>;
  rating?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `PluginMarketplace` aggregates. */
export type PluginMarketplaceHavingInput = {
  AND?: InputMaybe<Array<PluginMarketplaceHavingInput>>;
  OR?: InputMaybe<Array<PluginMarketplaceHavingInput>>;
  average?: InputMaybe<PluginMarketplaceHavingAverageInput>;
  distinctCount?: InputMaybe<PluginMarketplaceHavingDistinctCountInput>;
  max?: InputMaybe<PluginMarketplaceHavingMaxInput>;
  min?: InputMaybe<PluginMarketplaceHavingMinInput>;
  stddevPopulation?: InputMaybe<PluginMarketplaceHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<PluginMarketplaceHavingStddevSampleInput>;
  sum?: InputMaybe<PluginMarketplaceHavingSumInput>;
  variancePopulation?: InputMaybe<PluginMarketplaceHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<PluginMarketplaceHavingVarianceSampleInput>;
};

export type PluginMarketplaceHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  downloads?: InputMaybe<HavingIntFilter>;
  rating?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginMarketplaceHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  downloads?: InputMaybe<HavingIntFilter>;
  rating?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginMarketplaceHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  downloads?: InputMaybe<HavingIntFilter>;
  rating?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginMarketplaceHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  downloads?: InputMaybe<HavingIntFilter>;
  rating?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginMarketplaceHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  downloads?: InputMaybe<HavingIntFilter>;
  rating?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginMarketplaceHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  downloads?: InputMaybe<HavingIntFilter>;
  rating?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginMarketplaceHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  downloads?: InputMaybe<HavingIntFilter>;
  rating?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginMarketplaceMaxAggregates = {
  __typename?: 'PluginMarketplaceMaxAggregates';
  /** Maximum of downloads across the matching connection */
  downloads?: Maybe<Scalars['Int']['output']>;
  /** Maximum of rating across the matching connection */
  rating?: Maybe<Scalars['Int']['output']>;
};

export type PluginMarketplaceMinAggregates = {
  __typename?: 'PluginMarketplaceMinAggregates';
  /** Minimum of downloads across the matching connection */
  downloads?: Maybe<Scalars['Int']['output']>;
  /** Minimum of rating across the matching connection */
  rating?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `PluginMarketplace`. */
export enum PluginMarketplaceOrderBy {
  AuthorAsc = 'AUTHOR_ASC',
  AuthorDesc = 'AUTHOR_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  DownloadsAsc = 'DOWNLOADS_ASC',
  DownloadsDesc = 'DOWNLOADS_DESC',
  IsVerifiedAsc = 'IS_VERIFIED_ASC',
  IsVerifiedDesc = 'IS_VERIFIED_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RatingAsc = 'RATING_ASC',
  RatingDesc = 'RATING_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  VersionAsc = 'VERSION_ASC',
  VersionDesc = 'VERSION_DESC',
  WasmUrlAsc = 'WASM_URL_ASC',
  WasmUrlDesc = 'WASM_URL_DESC'
}

export type PluginMarketplaceStddevPopulationAggregates = {
  __typename?: 'PluginMarketplaceStddevPopulationAggregates';
  /** Population standard deviation of downloads across the matching connection */
  downloads?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of rating across the matching connection */
  rating?: Maybe<Scalars['BigFloat']['output']>;
};

export type PluginMarketplaceStddevSampleAggregates = {
  __typename?: 'PluginMarketplaceStddevSampleAggregates';
  /** Sample standard deviation of downloads across the matching connection */
  downloads?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of rating across the matching connection */
  rating?: Maybe<Scalars['BigFloat']['output']>;
};

export type PluginMarketplaceSumAggregates = {
  __typename?: 'PluginMarketplaceSumAggregates';
  /** Sum of downloads across the matching connection */
  downloads: Scalars['BigInt']['output'];
  /** Sum of rating across the matching connection */
  rating: Scalars['BigInt']['output'];
};

export type PluginMarketplaceVariancePopulationAggregates = {
  __typename?: 'PluginMarketplaceVariancePopulationAggregates';
  /** Population variance of downloads across the matching connection */
  downloads?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of rating across the matching connection */
  rating?: Maybe<Scalars['BigFloat']['output']>;
};

export type PluginMarketplaceVarianceSampleAggregates = {
  __typename?: 'PluginMarketplaceVarianceSampleAggregates';
  /** Sample variance of downloads across the matching connection */
  downloads?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of rating across the matching connection */
  rating?: Maybe<Scalars['BigFloat']['output']>;
};

/** Methods to use when ordering `Plugin`. */
export enum PluginOrderBy {
  AuthorIdAsc = 'AUTHOR_ID_ASC',
  AuthorIdDesc = 'AUTHOR_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  EdgeCapableAsc = 'EDGE_CAPABLE_ASC',
  EdgeCapableDesc = 'EDGE_CAPABLE_DESC',
  IsEnabledAsc = 'IS_ENABLED_ASC',
  IsEnabledDesc = 'IS_ENABLED_DESC',
  IsVerifiedAsc = 'IS_VERIFIED_ASC',
  IsVerifiedDesc = 'IS_VERIFIED_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PluginUsagesAverageDurationMsAsc = 'PLUGIN_USAGES_AVERAGE_DURATION_MS_ASC',
  PluginUsagesAverageDurationMsDesc = 'PLUGIN_USAGES_AVERAGE_DURATION_MS_DESC',
  PluginUsagesCountAsc = 'PLUGIN_USAGES_COUNT_ASC',
  PluginUsagesCountDesc = 'PLUGIN_USAGES_COUNT_DESC',
  PluginUsagesDistinctCountDurationMsAsc = 'PLUGIN_USAGES_DISTINCT_COUNT_DURATION_MS_ASC',
  PluginUsagesDistinctCountDurationMsDesc = 'PLUGIN_USAGES_DISTINCT_COUNT_DURATION_MS_DESC',
  PluginUsagesDistinctCountExecutedAtAsc = 'PLUGIN_USAGES_DISTINCT_COUNT_EXECUTED_AT_ASC',
  PluginUsagesDistinctCountExecutedAtDesc = 'PLUGIN_USAGES_DISTINCT_COUNT_EXECUTED_AT_DESC',
  PluginUsagesDistinctCountFunctionNameAsc = 'PLUGIN_USAGES_DISTINCT_COUNT_FUNCTION_NAME_ASC',
  PluginUsagesDistinctCountFunctionNameDesc = 'PLUGIN_USAGES_DISTINCT_COUNT_FUNCTION_NAME_DESC',
  PluginUsagesDistinctCountInvocationSourceAsc = 'PLUGIN_USAGES_DISTINCT_COUNT_INVOCATION_SOURCE_ASC',
  PluginUsagesDistinctCountInvocationSourceDesc = 'PLUGIN_USAGES_DISTINCT_COUNT_INVOCATION_SOURCE_DESC',
  PluginUsagesDistinctCountOrganizationIdAsc = 'PLUGIN_USAGES_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  PluginUsagesDistinctCountOrganizationIdDesc = 'PLUGIN_USAGES_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  PluginUsagesDistinctCountPluginIdAsc = 'PLUGIN_USAGES_DISTINCT_COUNT_PLUGIN_ID_ASC',
  PluginUsagesDistinctCountPluginIdDesc = 'PLUGIN_USAGES_DISTINCT_COUNT_PLUGIN_ID_DESC',
  PluginUsagesDistinctCountRowIdAsc = 'PLUGIN_USAGES_DISTINCT_COUNT_ROW_ID_ASC',
  PluginUsagesDistinctCountRowIdDesc = 'PLUGIN_USAGES_DISTINCT_COUNT_ROW_ID_DESC',
  PluginUsagesDistinctCountRunIdAsc = 'PLUGIN_USAGES_DISTINCT_COUNT_RUN_ID_ASC',
  PluginUsagesDistinctCountRunIdDesc = 'PLUGIN_USAGES_DISTINCT_COUNT_RUN_ID_DESC',
  PluginUsagesDistinctCountSuccessAsc = 'PLUGIN_USAGES_DISTINCT_COUNT_SUCCESS_ASC',
  PluginUsagesDistinctCountSuccessDesc = 'PLUGIN_USAGES_DISTINCT_COUNT_SUCCESS_DESC',
  PluginUsagesDistinctCountWorkflowIdAsc = 'PLUGIN_USAGES_DISTINCT_COUNT_WORKFLOW_ID_ASC',
  PluginUsagesDistinctCountWorkflowIdDesc = 'PLUGIN_USAGES_DISTINCT_COUNT_WORKFLOW_ID_DESC',
  PluginUsagesMaxDurationMsAsc = 'PLUGIN_USAGES_MAX_DURATION_MS_ASC',
  PluginUsagesMaxDurationMsDesc = 'PLUGIN_USAGES_MAX_DURATION_MS_DESC',
  PluginUsagesMinDurationMsAsc = 'PLUGIN_USAGES_MIN_DURATION_MS_ASC',
  PluginUsagesMinDurationMsDesc = 'PLUGIN_USAGES_MIN_DURATION_MS_DESC',
  PluginUsagesStddevPopulationDurationMsAsc = 'PLUGIN_USAGES_STDDEV_POPULATION_DURATION_MS_ASC',
  PluginUsagesStddevPopulationDurationMsDesc = 'PLUGIN_USAGES_STDDEV_POPULATION_DURATION_MS_DESC',
  PluginUsagesStddevSampleDurationMsAsc = 'PLUGIN_USAGES_STDDEV_SAMPLE_DURATION_MS_ASC',
  PluginUsagesStddevSampleDurationMsDesc = 'PLUGIN_USAGES_STDDEV_SAMPLE_DURATION_MS_DESC',
  PluginUsagesSumDurationMsAsc = 'PLUGIN_USAGES_SUM_DURATION_MS_ASC',
  PluginUsagesSumDurationMsDesc = 'PLUGIN_USAGES_SUM_DURATION_MS_DESC',
  PluginUsagesVariancePopulationDurationMsAsc = 'PLUGIN_USAGES_VARIANCE_POPULATION_DURATION_MS_ASC',
  PluginUsagesVariancePopulationDurationMsDesc = 'PLUGIN_USAGES_VARIANCE_POPULATION_DURATION_MS_DESC',
  PluginUsagesVarianceSampleDurationMsAsc = 'PLUGIN_USAGES_VARIANCE_SAMPLE_DURATION_MS_ASC',
  PluginUsagesVarianceSampleDurationMsDesc = 'PLUGIN_USAGES_VARIANCE_SAMPLE_DURATION_MS_DESC',
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
  edgeCapable?: InputMaybe<Scalars['Boolean']['input']>;
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

/** A filter to be used against many `PluginUsage` object types. All fields are combined with a logical ‘and.’ */
export type PluginToManyPluginUsageFilter = {
  /** Aggregates across related `PluginUsage` match the filter criteria. */
  aggregates?: InputMaybe<PluginUsageAggregatesFilter>;
  /** Every related `PluginUsage` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<PluginUsageFilter>;
  /** No related `PluginUsage` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<PluginUsageFilter>;
  /** Some related `PluginUsage` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<PluginUsageFilter>;
};

export type PluginUsage = Node & {
  __typename?: 'PluginUsage';
  durationMs: Scalars['Int']['output'];
  executedAt?: Maybe<Scalars['Datetime']['output']>;
  functionName: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  invocationSource: Scalars['String']['output'];
  organizationId: Scalars['String']['output'];
  /** Reads a single `Plugin` that is related to this `PluginUsage`. */
  plugin?: Maybe<Plugin>;
  pluginId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  runId?: Maybe<Scalars['UUID']['output']>;
  success: Scalars['Boolean']['output'];
  workflowId?: Maybe<Scalars['UUID']['output']>;
};

export type PluginUsageAggregates = {
  __typename?: 'PluginUsageAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<PluginUsageAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<PluginUsageDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<PluginUsageMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<PluginUsageMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<PluginUsageStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<PluginUsageStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<PluginUsageSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<PluginUsageVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<PluginUsageVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `PluginUsage` object types. */
export type PluginUsageAggregatesFilter = {
  /** Mean average aggregate over matching `PluginUsage` objects. */
  average?: InputMaybe<PluginUsageAverageAggregateFilter>;
  /** Distinct count aggregate over matching `PluginUsage` objects. */
  distinctCount?: InputMaybe<PluginUsageDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `PluginUsage` object to be included within the aggregate. */
  filter?: InputMaybe<PluginUsageFilter>;
  /** Maximum aggregate over matching `PluginUsage` objects. */
  max?: InputMaybe<PluginUsageMaxAggregateFilter>;
  /** Minimum aggregate over matching `PluginUsage` objects. */
  min?: InputMaybe<PluginUsageMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `PluginUsage` objects. */
  stddevPopulation?: InputMaybe<PluginUsageStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `PluginUsage` objects. */
  stddevSample?: InputMaybe<PluginUsageStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `PluginUsage` objects. */
  sum?: InputMaybe<PluginUsageSumAggregateFilter>;
  /** Population variance aggregate over matching `PluginUsage` objects. */
  variancePopulation?: InputMaybe<PluginUsageVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `PluginUsage` objects. */
  varianceSample?: InputMaybe<PluginUsageVarianceSampleAggregateFilter>;
};

export type PluginUsageAverageAggregateFilter = {
  durationMs?: InputMaybe<BigFloatFilter>;
};

export type PluginUsageAverageAggregates = {
  __typename?: 'PluginUsageAverageAggregates';
  /** Mean average of durationMs across the matching connection */
  durationMs?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `PluginUsage` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PluginUsageCondition = {
  /** Checks for equality with the object’s `durationMs` field. */
  durationMs?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `executedAt` field. */
  executedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `functionName` field. */
  functionName?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `invocationSource` field. */
  invocationSource?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `pluginId` field. */
  pluginId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `runId` field. */
  runId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `success` field. */
  success?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `workflowId` field. */
  workflowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `PluginUsage` values. */
export type PluginUsageConnection = {
  __typename?: 'PluginUsageConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<PluginUsageAggregates>;
  /** A list of edges which contains the `PluginUsage` and cursor to aid in pagination. */
  edges: Array<PluginUsageEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<PluginUsageAggregates>>;
  /** A list of `PluginUsage` objects. */
  nodes: Array<PluginUsage>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PluginUsage` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `PluginUsage` values. */
export type PluginUsageConnectionGroupedAggregatesArgs = {
  groupBy: Array<PluginUsageGroupBy>;
  having?: InputMaybe<PluginUsageHavingInput>;
};

export type PluginUsageDistinctCountAggregateFilter = {
  durationMs?: InputMaybe<BigIntFilter>;
  executedAt?: InputMaybe<BigIntFilter>;
  functionName?: InputMaybe<BigIntFilter>;
  invocationSource?: InputMaybe<BigIntFilter>;
  organizationId?: InputMaybe<BigIntFilter>;
  pluginId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  runId?: InputMaybe<BigIntFilter>;
  success?: InputMaybe<BigIntFilter>;
  workflowId?: InputMaybe<BigIntFilter>;
};

export type PluginUsageDistinctCountAggregates = {
  __typename?: 'PluginUsageDistinctCountAggregates';
  /** Distinct count of durationMs across the matching connection */
  durationMs?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of executedAt across the matching connection */
  executedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of functionName across the matching connection */
  functionName?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of invocationSource across the matching connection */
  invocationSource?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of pluginId across the matching connection */
  pluginId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of runId across the matching connection */
  runId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of success across the matching connection */
  success?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of workflowId across the matching connection */
  workflowId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `PluginUsage` edge in the connection. */
export type PluginUsageEdge = {
  __typename?: 'PluginUsageEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `PluginUsage` at the end of the edge. */
  node: PluginUsage;
};

/** A filter to be used against `PluginUsage` object types. All fields are combined with a logical ‘and.’ */
export type PluginUsageFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PluginUsageFilter>>;
  /** Filter by the object’s `durationMs` field. */
  durationMs?: InputMaybe<IntFilter>;
  /** Filter by the object’s `executedAt` field. */
  executedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `functionName` field. */
  functionName?: InputMaybe<StringFilter>;
  /** Filter by the object’s `invocationSource` field. */
  invocationSource?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PluginUsageFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PluginUsageFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `plugin` relation. */
  plugin?: InputMaybe<PluginFilter>;
  /** Filter by the object’s `pluginId` field. */
  pluginId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `runId` field. */
  runId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `success` field. */
  success?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `workflowId` field. */
  workflowId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `PluginUsage` for usage during aggregation. */
export enum PluginUsageGroupBy {
  DurationMs = 'DURATION_MS',
  ExecutedAt = 'EXECUTED_AT',
  ExecutedAtTruncatedToDay = 'EXECUTED_AT_TRUNCATED_TO_DAY',
  ExecutedAtTruncatedToHour = 'EXECUTED_AT_TRUNCATED_TO_HOUR',
  FunctionName = 'FUNCTION_NAME',
  InvocationSource = 'INVOCATION_SOURCE',
  OrganizationId = 'ORGANIZATION_ID',
  PluginId = 'PLUGIN_ID',
  RunId = 'RUN_ID',
  Success = 'SUCCESS',
  WorkflowId = 'WORKFLOW_ID'
}

export type PluginUsageHavingAverageInput = {
  durationMs?: InputMaybe<HavingIntFilter>;
  executedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginUsageHavingDistinctCountInput = {
  durationMs?: InputMaybe<HavingIntFilter>;
  executedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `PluginUsage` aggregates. */
export type PluginUsageHavingInput = {
  AND?: InputMaybe<Array<PluginUsageHavingInput>>;
  OR?: InputMaybe<Array<PluginUsageHavingInput>>;
  average?: InputMaybe<PluginUsageHavingAverageInput>;
  distinctCount?: InputMaybe<PluginUsageHavingDistinctCountInput>;
  max?: InputMaybe<PluginUsageHavingMaxInput>;
  min?: InputMaybe<PluginUsageHavingMinInput>;
  stddevPopulation?: InputMaybe<PluginUsageHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<PluginUsageHavingStddevSampleInput>;
  sum?: InputMaybe<PluginUsageHavingSumInput>;
  variancePopulation?: InputMaybe<PluginUsageHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<PluginUsageHavingVarianceSampleInput>;
};

export type PluginUsageHavingMaxInput = {
  durationMs?: InputMaybe<HavingIntFilter>;
  executedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginUsageHavingMinInput = {
  durationMs?: InputMaybe<HavingIntFilter>;
  executedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginUsageHavingStddevPopulationInput = {
  durationMs?: InputMaybe<HavingIntFilter>;
  executedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginUsageHavingStddevSampleInput = {
  durationMs?: InputMaybe<HavingIntFilter>;
  executedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginUsageHavingSumInput = {
  durationMs?: InputMaybe<HavingIntFilter>;
  executedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginUsageHavingVariancePopulationInput = {
  durationMs?: InputMaybe<HavingIntFilter>;
  executedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginUsageHavingVarianceSampleInput = {
  durationMs?: InputMaybe<HavingIntFilter>;
  executedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type PluginUsageMaxAggregateFilter = {
  durationMs?: InputMaybe<IntFilter>;
};

export type PluginUsageMaxAggregates = {
  __typename?: 'PluginUsageMaxAggregates';
  /** Maximum of durationMs across the matching connection */
  durationMs?: Maybe<Scalars['Int']['output']>;
};

export type PluginUsageMinAggregateFilter = {
  durationMs?: InputMaybe<IntFilter>;
};

export type PluginUsageMinAggregates = {
  __typename?: 'PluginUsageMinAggregates';
  /** Minimum of durationMs across the matching connection */
  durationMs?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `PluginUsage`. */
export enum PluginUsageOrderBy {
  DurationMsAsc = 'DURATION_MS_ASC',
  DurationMsDesc = 'DURATION_MS_DESC',
  ExecutedAtAsc = 'EXECUTED_AT_ASC',
  ExecutedAtDesc = 'EXECUTED_AT_DESC',
  FunctionNameAsc = 'FUNCTION_NAME_ASC',
  FunctionNameDesc = 'FUNCTION_NAME_DESC',
  InvocationSourceAsc = 'INVOCATION_SOURCE_ASC',
  InvocationSourceDesc = 'INVOCATION_SOURCE_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PluginIdAsc = 'PLUGIN_ID_ASC',
  PluginIdDesc = 'PLUGIN_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  RunIdAsc = 'RUN_ID_ASC',
  RunIdDesc = 'RUN_ID_DESC',
  SuccessAsc = 'SUCCESS_ASC',
  SuccessDesc = 'SUCCESS_DESC',
  WorkflowIdAsc = 'WORKFLOW_ID_ASC',
  WorkflowIdDesc = 'WORKFLOW_ID_DESC'
}

export type PluginUsageStddevPopulationAggregateFilter = {
  durationMs?: InputMaybe<BigFloatFilter>;
};

export type PluginUsageStddevPopulationAggregates = {
  __typename?: 'PluginUsageStddevPopulationAggregates';
  /** Population standard deviation of durationMs across the matching connection */
  durationMs?: Maybe<Scalars['BigFloat']['output']>;
};

export type PluginUsageStddevSampleAggregateFilter = {
  durationMs?: InputMaybe<BigFloatFilter>;
};

export type PluginUsageStddevSampleAggregates = {
  __typename?: 'PluginUsageStddevSampleAggregates';
  /** Sample standard deviation of durationMs across the matching connection */
  durationMs?: Maybe<Scalars['BigFloat']['output']>;
};

export type PluginUsageSumAggregateFilter = {
  durationMs?: InputMaybe<BigIntFilter>;
};

export type PluginUsageSumAggregates = {
  __typename?: 'PluginUsageSumAggregates';
  /** Sum of durationMs across the matching connection */
  durationMs: Scalars['BigInt']['output'];
};

export type PluginUsageVariancePopulationAggregateFilter = {
  durationMs?: InputMaybe<BigFloatFilter>;
};

export type PluginUsageVariancePopulationAggregates = {
  __typename?: 'PluginUsageVariancePopulationAggregates';
  /** Population variance of durationMs across the matching connection */
  durationMs?: Maybe<Scalars['BigFloat']['output']>;
};

export type PluginUsageVarianceSampleAggregateFilter = {
  durationMs?: InputMaybe<BigFloatFilter>;
};

export type PluginUsageVarianceSampleAggregates = {
  __typename?: 'PluginUsageVarianceSampleAggregates';
  /** Sample variance of durationMs across the matching connection */
  durationMs?: Maybe<Scalars['BigFloat']['output']>;
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
  /** Get a single `ApprovalRequest`. */
  approvalRequest?: Maybe<ApprovalRequest>;
  /** Reads a single `ApprovalRequest` using its globally unique `ID`. */
  approvalRequestById?: Maybe<ApprovalRequest>;
  /** Reads and enables pagination through a set of `ApprovalRequest`. */
  approvalRequests?: Maybe<ApprovalRequestConnection>;
  /** Get a single `DeadLetterEvent`. */
  deadLetterEvent?: Maybe<DeadLetterEvent>;
  /** Reads a single `DeadLetterEvent` using its globally unique `ID`. */
  deadLetterEventById?: Maybe<DeadLetterEvent>;
  /** Reads and enables pagination through a set of `DeadLetterEvent`. */
  deadLetterEvents?: Maybe<DeadLetterEventConnection>;
  /** Get a single `EmailSuppression`. */
  emailSuppression?: Maybe<EmailSuppression>;
  /** Reads a single `EmailSuppression` using its globally unique `ID`. */
  emailSuppressionById?: Maybe<EmailSuppression>;
  /** Reads and enables pagination through a set of `EmailSuppression`. */
  emailSuppressions?: Maybe<EmailSuppressionConnection>;
  /** Get a single `EventLog`. */
  eventLog?: Maybe<EventLog>;
  /** Reads a single `EventLog` using its globally unique `ID`. */
  eventLogById?: Maybe<EventLog>;
  /** Reads and enables pagination through a set of `EventLog`. */
  eventLogs?: Maybe<EventLogConnection>;
  /** Get a single `EventRoutingRule`. */
  eventRoutingRule?: Maybe<EventRoutingRule>;
  /** Reads a single `EventRoutingRule` using its globally unique `ID`. */
  eventRoutingRuleById?: Maybe<EventRoutingRule>;
  /** Reads and enables pagination through a set of `EventRoutingRule`. */
  eventRoutingRules?: Maybe<EventRoutingRuleConnection>;
  /** Get a single `EventSchema`. */
  eventSchema?: Maybe<EventSchema>;
  /** Reads a single `EventSchema` using its globally unique `ID`. */
  eventSchemaById?: Maybe<EventSchema>;
  /** Reads and enables pagination through a set of `EventSchema`. */
  eventSchemata?: Maybe<EventSchemaConnection>;
  /** Get a single `EventSubscription`. */
  eventSubscription?: Maybe<EventSubscription>;
  /** Reads a single `EventSubscription` using its globally unique `ID`. */
  eventSubscriptionById?: Maybe<EventSubscription>;
  /** Reads and enables pagination through a set of `EventSubscription`. */
  eventSubscriptions?: Maybe<EventSubscriptionConnection>;
  /** Get a single `Fn`. */
  fn?: Maybe<Fn>;
  /** Reads a single `Fn` using its globally unique `ID`. */
  fnById?: Maybe<Fn>;
  /** Reads and enables pagination through a set of `Fn`. */
  fns?: Maybe<FnConnection>;
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
  /** Get a single `PluginMarketplace`. */
  pluginMarketplace?: Maybe<PluginMarketplace>;
  /** Reads a single `PluginMarketplace` using its globally unique `ID`. */
  pluginMarketplaceById?: Maybe<PluginMarketplace>;
  /** Reads and enables pagination through a set of `PluginMarketplace`. */
  pluginMarketplaces?: Maybe<PluginMarketplaceConnection>;
  /** Get a single `PluginUsage`. */
  pluginUsage?: Maybe<PluginUsage>;
  /** Reads a single `PluginUsage` using its globally unique `ID`. */
  pluginUsageById?: Maybe<PluginUsage>;
  /** Reads and enables pagination through a set of `PluginUsage`. */
  pluginUsages?: Maybe<PluginUsageConnection>;
  /** Reads and enables pagination through a set of `Plugin`. */
  plugins?: Maybe<PluginConnection>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Get a single `RivetGraph`. */
  rivetGraph?: Maybe<RivetGraph>;
  /** Reads a single `RivetGraph` using its globally unique `ID`. */
  rivetGraphById?: Maybe<RivetGraph>;
  /** Reads and enables pagination through a set of `RivetGraph`. */
  rivetGraphs?: Maybe<RivetGraphConnection>;
  /** Get a single `SagaRun`. */
  sagaRun?: Maybe<SagaRun>;
  /** Reads a single `SagaRun` using its globally unique `ID`. */
  sagaRunById?: Maybe<SagaRun>;
  /** Reads and enables pagination through a set of `SagaRun`. */
  sagaRuns?: Maybe<SagaRunConnection>;
  /** Get a single `SagaStepLog`. */
  sagaStepLog?: Maybe<SagaStepLog>;
  /** Reads a single `SagaStepLog` using its globally unique `ID`. */
  sagaStepLogById?: Maybe<SagaStepLog>;
  /** Reads and enables pagination through a set of `SagaStepLog`. */
  sagaStepLogs?: Maybe<SagaStepLogConnection>;
  /** Reads and enables pagination through a set of `SubscriptionDelivery`. */
  subscriptionDeliveries?: Maybe<SubscriptionDeliveryConnection>;
  /** Get a single `SubscriptionDelivery`. */
  subscriptionDelivery?: Maybe<SubscriptionDelivery>;
  /** Reads a single `SubscriptionDelivery` using its globally unique `ID`. */
  subscriptionDeliveryById?: Maybe<SubscriptionDelivery>;
  /** Get a single `UserOrganization`. */
  userOrganization?: Maybe<UserOrganization>;
  /** Reads a single `UserOrganization` using its globally unique `ID`. */
  userOrganizationById?: Maybe<UserOrganization>;
  /** Get a single `UserOrganization`. */
  userOrganizationByUserIdAndOrganizationId?: Maybe<UserOrganization>;
  /** Reads and enables pagination through a set of `UserOrganization`. */
  userOrganizations?: Maybe<UserOrganizationConnection>;
  /** Get a single `WardenSyncQueue`. */
  wardenSyncQueue?: Maybe<WardenSyncQueue>;
  /** Reads a single `WardenSyncQueue` using its globally unique `ID`. */
  wardenSyncQueueById?: Maybe<WardenSyncQueue>;
  /** Reads and enables pagination through a set of `WardenSyncQueue`. */
  wardenSyncQueues?: Maybe<WardenSyncQueueConnection>;
  /** Get a single `Workflow`. */
  workflow?: Maybe<Workflow>;
  /** Reads a single `Workflow` using its globally unique `ID`. */
  workflowById?: Maybe<Workflow>;
  /** Get a single `WorkflowExecutorConfig`. */
  workflowExecutorConfig?: Maybe<WorkflowExecutorConfig>;
  /** Reads a single `WorkflowExecutorConfig` using its globally unique `ID`. */
  workflowExecutorConfigById?: Maybe<WorkflowExecutorConfig>;
  /** Reads and enables pagination through a set of `WorkflowExecutorConfig`. */
  workflowExecutorConfigs?: Maybe<WorkflowExecutorConfigConnection>;
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
  /** Get a single `WorkflowVersion`. */
  workflowVersion?: Maybe<WorkflowVersion>;
  /** Reads a single `WorkflowVersion` using its globally unique `ID`. */
  workflowVersionById?: Maybe<WorkflowVersion>;
  /** Reads and enables pagination through a set of `WorkflowVersion`. */
  workflowVersions?: Maybe<WorkflowVersionConnection>;
  /** Reads and enables pagination through a set of `Workflow`. */
  workflows?: Maybe<WorkflowConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryApprovalRequestArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryApprovalRequestByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryApprovalRequestsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ApprovalRequestCondition>;
  filter?: InputMaybe<ApprovalRequestFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ApprovalRequestOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDeadLetterEventArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDeadLetterEventByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDeadLetterEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<DeadLetterEventCondition>;
  filter?: InputMaybe<DeadLetterEventFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DeadLetterEventOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEmailSuppressionArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEmailSuppressionByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEmailSuppressionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EmailSuppressionCondition>;
  filter?: InputMaybe<EmailSuppressionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EmailSuppressionOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEventLogArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventLogByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventLogsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EventLogCondition>;
  filter?: InputMaybe<EventLogFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventLogOrderBy>>;
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
export type QueryEventSchemaArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventSchemaByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventSchemataArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EventSchemaCondition>;
  filter?: InputMaybe<EventSchemaFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventSchemaOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEventSubscriptionArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventSubscriptionByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventSubscriptionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<EventSubscriptionCondition>;
  filter?: InputMaybe<EventSubscriptionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventSubscriptionOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFnArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFnByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFnsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<FnCondition>;
  filter?: InputMaybe<FnFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FnOrderBy>>;
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
export type QueryPluginMarketplaceArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPluginMarketplaceByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPluginMarketplacesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PluginMarketplaceCondition>;
  filter?: InputMaybe<PluginMarketplaceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PluginMarketplaceOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPluginUsageArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPluginUsageByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPluginUsagesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<PluginUsageCondition>;
  filter?: InputMaybe<PluginUsageFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PluginUsageOrderBy>>;
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
export type QueryRivetGraphArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRivetGraphByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRivetGraphsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RivetGraphCondition>;
  filter?: InputMaybe<RivetGraphFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RivetGraphOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySagaRunArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySagaRunByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySagaRunsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SagaRunCondition>;
  filter?: InputMaybe<SagaRunFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SagaRunOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySagaStepLogArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySagaStepLogByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySagaStepLogsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SagaStepLogCondition>;
  filter?: InputMaybe<SagaStepLogFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SagaStepLogOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySubscriptionDeliveriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SubscriptionDeliveryCondition>;
  filter?: InputMaybe<SubscriptionDeliveryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscriptionDeliveryOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySubscriptionDeliveryArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySubscriptionDeliveryByIdArgs = {
  id: Scalars['ID']['input'];
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
export type QueryWardenSyncQueueArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWardenSyncQueueByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWardenSyncQueuesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WardenSyncQueueCondition>;
  filter?: InputMaybe<WardenSyncQueueFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WardenSyncQueueOrderBy>>;
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
export type QueryWorkflowExecutorConfigArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkflowExecutorConfigByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkflowExecutorConfigsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkflowExecutorConfigCondition>;
  filter?: InputMaybe<WorkflowExecutorConfigFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkflowExecutorConfigOrderBy>>;
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
export type QueryWorkflowVersionArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkflowVersionByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkflowVersionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkflowVersionCondition>;
  filter?: InputMaybe<WorkflowVersionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkflowVersionOrderBy>>;
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

export type RivetGraph = Node & {
  __typename?: 'RivetGraph';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  graphJson: Scalars['JSON']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organizationId: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  version: Scalars['Int']['output'];
};

export type RivetGraphAggregates = {
  __typename?: 'RivetGraphAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<RivetGraphAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<RivetGraphDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<RivetGraphMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<RivetGraphMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<RivetGraphStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<RivetGraphStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<RivetGraphSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<RivetGraphVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<RivetGraphVarianceSampleAggregates>;
};

export type RivetGraphAverageAggregates = {
  __typename?: 'RivetGraphAverageAggregates';
  /** Mean average of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `RivetGraph` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type RivetGraphCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `version` field. */
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of `RivetGraph` values. */
export type RivetGraphConnection = {
  __typename?: 'RivetGraphConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<RivetGraphAggregates>;
  /** A list of edges which contains the `RivetGraph` and cursor to aid in pagination. */
  edges: Array<RivetGraphEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<RivetGraphAggregates>>;
  /** A list of `RivetGraph` objects. */
  nodes: Array<RivetGraph>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `RivetGraph` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `RivetGraph` values. */
export type RivetGraphConnectionGroupedAggregatesArgs = {
  groupBy: Array<RivetGraphGroupBy>;
  having?: InputMaybe<RivetGraphHavingInput>;
};

export type RivetGraphDistinctCountAggregates = {
  __typename?: 'RivetGraphDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of graphJson across the matching connection */
  graphJson?: Maybe<Scalars['BigInt']['output']>;
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
};

/** A `RivetGraph` edge in the connection. */
export type RivetGraphEdge = {
  __typename?: 'RivetGraphEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `RivetGraph` at the end of the edge. */
  node: RivetGraph;
};

/** A filter to be used against `RivetGraph` object types. All fields are combined with a logical ‘and.’ */
export type RivetGraphFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<RivetGraphFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<RivetGraphFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<RivetGraphFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `version` field. */
  version?: InputMaybe<IntFilter>;
};

/** Grouping methods for `RivetGraph` for usage during aggregation. */
export enum RivetGraphGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Description = 'DESCRIPTION',
  GraphJson = 'GRAPH_JSON',
  Name = 'NAME',
  OrganizationId = 'ORGANIZATION_ID',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  Version = 'VERSION'
}

export type RivetGraphHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type RivetGraphHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

/** Conditions for `RivetGraph` aggregates. */
export type RivetGraphHavingInput = {
  AND?: InputMaybe<Array<RivetGraphHavingInput>>;
  OR?: InputMaybe<Array<RivetGraphHavingInput>>;
  average?: InputMaybe<RivetGraphHavingAverageInput>;
  distinctCount?: InputMaybe<RivetGraphHavingDistinctCountInput>;
  max?: InputMaybe<RivetGraphHavingMaxInput>;
  min?: InputMaybe<RivetGraphHavingMinInput>;
  stddevPopulation?: InputMaybe<RivetGraphHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<RivetGraphHavingStddevSampleInput>;
  sum?: InputMaybe<RivetGraphHavingSumInput>;
  variancePopulation?: InputMaybe<RivetGraphHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<RivetGraphHavingVarianceSampleInput>;
};

export type RivetGraphHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type RivetGraphHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type RivetGraphHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type RivetGraphHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type RivetGraphHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type RivetGraphHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type RivetGraphHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type RivetGraphMaxAggregates = {
  __typename?: 'RivetGraphMaxAggregates';
  /** Maximum of version across the matching connection */
  version?: Maybe<Scalars['Int']['output']>;
};

export type RivetGraphMinAggregates = {
  __typename?: 'RivetGraphMinAggregates';
  /** Minimum of version across the matching connection */
  version?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `RivetGraph`. */
export enum RivetGraphOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
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
  VersionDesc = 'VERSION_DESC'
}

export type RivetGraphStddevPopulationAggregates = {
  __typename?: 'RivetGraphStddevPopulationAggregates';
  /** Population standard deviation of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
};

export type RivetGraphStddevSampleAggregates = {
  __typename?: 'RivetGraphStddevSampleAggregates';
  /** Sample standard deviation of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
};

export type RivetGraphSumAggregates = {
  __typename?: 'RivetGraphSumAggregates';
  /** Sum of version across the matching connection */
  version: Scalars['BigInt']['output'];
};

export type RivetGraphVariancePopulationAggregates = {
  __typename?: 'RivetGraphVariancePopulationAggregates';
  /** Population variance of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
};

export type RivetGraphVarianceSampleAggregates = {
  __typename?: 'RivetGraphVarianceSampleAggregates';
  /** Sample variance of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
};

export type SagaRun = Node & {
  __typename?: 'SagaRun';
  completedAt?: Maybe<Scalars['Datetime']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  organizationId: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `SagaStepLog`. */
  sagaStepLogs: SagaStepLogConnection;
  startedAt?: Maybe<Scalars['Datetime']['output']>;
  status: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads a single `WorkflowRun` that is related to this `SagaRun`. */
  workflowRun?: Maybe<WorkflowRun>;
  workflowRunId: Scalars['UUID']['output'];
};


export type SagaRunSagaStepLogsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SagaStepLogCondition>;
  filter?: InputMaybe<SagaStepLogFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SagaStepLogOrderBy>>;
};

export type SagaRunAggregates = {
  __typename?: 'SagaRunAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<SagaRunDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `SagaRun` object types. */
export type SagaRunAggregatesFilter = {
  /** Distinct count aggregate over matching `SagaRun` objects. */
  distinctCount?: InputMaybe<SagaRunDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `SagaRun` object to be included within the aggregate. */
  filter?: InputMaybe<SagaRunFilter>;
};

/** A condition to be used against `SagaRun` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type SagaRunCondition = {
  /** Checks for equality with the object’s `completedAt` field. */
  completedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `error` field. */
  error?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `startedAt` field. */
  startedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `workflowRunId` field. */
  workflowRunId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `SagaRun` values. */
export type SagaRunConnection = {
  __typename?: 'SagaRunConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<SagaRunAggregates>;
  /** A list of edges which contains the `SagaRun` and cursor to aid in pagination. */
  edges: Array<SagaRunEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<SagaRunAggregates>>;
  /** A list of `SagaRun` objects. */
  nodes: Array<SagaRun>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SagaRun` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `SagaRun` values. */
export type SagaRunConnectionGroupedAggregatesArgs = {
  groupBy: Array<SagaRunGroupBy>;
  having?: InputMaybe<SagaRunHavingInput>;
};

export type SagaRunDistinctCountAggregateFilter = {
  completedAt?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  error?: InputMaybe<BigIntFilter>;
  organizationId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  startedAt?: InputMaybe<BigIntFilter>;
  status?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  workflowRunId?: InputMaybe<BigIntFilter>;
};

export type SagaRunDistinctCountAggregates = {
  __typename?: 'SagaRunDistinctCountAggregates';
  /** Distinct count of completedAt across the matching connection */
  completedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of error across the matching connection */
  error?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of startedAt across the matching connection */
  startedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of status across the matching connection */
  status?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of workflowRunId across the matching connection */
  workflowRunId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `SagaRun` edge in the connection. */
export type SagaRunEdge = {
  __typename?: 'SagaRunEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SagaRun` at the end of the edge. */
  node: SagaRun;
};

/** A filter to be used against `SagaRun` object types. All fields are combined with a logical ‘and.’ */
export type SagaRunFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<SagaRunFilter>>;
  /** Filter by the object’s `completedAt` field. */
  completedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `error` field. */
  error?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<SagaRunFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<SagaRunFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `sagaStepLogs` relation. */
  sagaStepLogs?: InputMaybe<SagaRunToManySagaStepLogFilter>;
  /** Some related `sagaStepLogs` exist. */
  sagaStepLogsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `startedAt` field. */
  startedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `workflowRun` relation. */
  workflowRun?: InputMaybe<WorkflowRunFilter>;
  /** Filter by the object’s `workflowRunId` field. */
  workflowRunId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `SagaRun` for usage during aggregation. */
export enum SagaRunGroupBy {
  CompletedAt = 'COMPLETED_AT',
  CompletedAtTruncatedToDay = 'COMPLETED_AT_TRUNCATED_TO_DAY',
  CompletedAtTruncatedToHour = 'COMPLETED_AT_TRUNCATED_TO_HOUR',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Error = 'ERROR',
  OrganizationId = 'ORGANIZATION_ID',
  StartedAt = 'STARTED_AT',
  StartedAtTruncatedToDay = 'STARTED_AT_TRUNCATED_TO_DAY',
  StartedAtTruncatedToHour = 'STARTED_AT_TRUNCATED_TO_HOUR',
  Status = 'STATUS',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR',
  WorkflowRunId = 'WORKFLOW_RUN_ID'
}

export type SagaRunHavingAverageInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SagaRunHavingDistinctCountInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `SagaRun` aggregates. */
export type SagaRunHavingInput = {
  AND?: InputMaybe<Array<SagaRunHavingInput>>;
  OR?: InputMaybe<Array<SagaRunHavingInput>>;
  average?: InputMaybe<SagaRunHavingAverageInput>;
  distinctCount?: InputMaybe<SagaRunHavingDistinctCountInput>;
  max?: InputMaybe<SagaRunHavingMaxInput>;
  min?: InputMaybe<SagaRunHavingMinInput>;
  stddevPopulation?: InputMaybe<SagaRunHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<SagaRunHavingStddevSampleInput>;
  sum?: InputMaybe<SagaRunHavingSumInput>;
  variancePopulation?: InputMaybe<SagaRunHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<SagaRunHavingVarianceSampleInput>;
};

export type SagaRunHavingMaxInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SagaRunHavingMinInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SagaRunHavingStddevPopulationInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SagaRunHavingStddevSampleInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SagaRunHavingSumInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SagaRunHavingVariancePopulationInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SagaRunHavingVarianceSampleInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Methods to use when ordering `SagaRun`. */
export enum SagaRunOrderBy {
  CompletedAtAsc = 'COMPLETED_AT_ASC',
  CompletedAtDesc = 'COMPLETED_AT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  ErrorAsc = 'ERROR_ASC',
  ErrorDesc = 'ERROR_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SagaStepLogsCountAsc = 'SAGA_STEP_LOGS_COUNT_ASC',
  SagaStepLogsCountDesc = 'SAGA_STEP_LOGS_COUNT_DESC',
  SagaStepLogsDistinctCountCompensateInputAsc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_COMPENSATE_INPUT_ASC',
  SagaStepLogsDistinctCountCompensateInputDesc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_COMPENSATE_INPUT_DESC',
  SagaStepLogsDistinctCountCompensateOutputAsc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_COMPENSATE_OUTPUT_ASC',
  SagaStepLogsDistinctCountCompensateOutputDesc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_COMPENSATE_OUTPUT_DESC',
  SagaStepLogsDistinctCountCompensateStatusAsc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_COMPENSATE_STATUS_ASC',
  SagaStepLogsDistinctCountCompensateStatusDesc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_COMPENSATE_STATUS_DESC',
  SagaStepLogsDistinctCountCompletedAtAsc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_COMPLETED_AT_ASC',
  SagaStepLogsDistinctCountCompletedAtDesc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_COMPLETED_AT_DESC',
  SagaStepLogsDistinctCountCreatedAtAsc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_CREATED_AT_ASC',
  SagaStepLogsDistinctCountCreatedAtDesc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_CREATED_AT_DESC',
  SagaStepLogsDistinctCountErrorAsc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_ERROR_ASC',
  SagaStepLogsDistinctCountErrorDesc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_ERROR_DESC',
  SagaStepLogsDistinctCountExecuteInputAsc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_EXECUTE_INPUT_ASC',
  SagaStepLogsDistinctCountExecuteInputDesc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_EXECUTE_INPUT_DESC',
  SagaStepLogsDistinctCountExecuteOutputAsc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_EXECUTE_OUTPUT_ASC',
  SagaStepLogsDistinctCountExecuteOutputDesc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_EXECUTE_OUTPUT_DESC',
  SagaStepLogsDistinctCountExecuteStatusAsc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_EXECUTE_STATUS_ASC',
  SagaStepLogsDistinctCountExecuteStatusDesc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_EXECUTE_STATUS_DESC',
  SagaStepLogsDistinctCountIdempotencyKeyAsc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_IDEMPOTENCY_KEY_ASC',
  SagaStepLogsDistinctCountIdempotencyKeyDesc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_IDEMPOTENCY_KEY_DESC',
  SagaStepLogsDistinctCountRowIdAsc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_ROW_ID_ASC',
  SagaStepLogsDistinctCountRowIdDesc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_ROW_ID_DESC',
  SagaStepLogsDistinctCountSagaRunIdAsc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_SAGA_RUN_ID_ASC',
  SagaStepLogsDistinctCountSagaRunIdDesc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_SAGA_RUN_ID_DESC',
  SagaStepLogsDistinctCountStartedAtAsc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_STARTED_AT_ASC',
  SagaStepLogsDistinctCountStartedAtDesc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_STARTED_AT_DESC',
  SagaStepLogsDistinctCountStepNameAsc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_STEP_NAME_ASC',
  SagaStepLogsDistinctCountStepNameDesc = 'SAGA_STEP_LOGS_DISTINCT_COUNT_STEP_NAME_DESC',
  StartedAtAsc = 'STARTED_AT_ASC',
  StartedAtDesc = 'STARTED_AT_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  WorkflowRunIdAsc = 'WORKFLOW_RUN_ID_ASC',
  WorkflowRunIdDesc = 'WORKFLOW_RUN_ID_DESC'
}

/** A filter to be used against many `SagaStepLog` object types. All fields are combined with a logical ‘and.’ */
export type SagaRunToManySagaStepLogFilter = {
  /** Aggregates across related `SagaStepLog` match the filter criteria. */
  aggregates?: InputMaybe<SagaStepLogAggregatesFilter>;
  /** Every related `SagaStepLog` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<SagaStepLogFilter>;
  /** No related `SagaStepLog` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<SagaStepLogFilter>;
  /** Some related `SagaStepLog` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<SagaStepLogFilter>;
};

export type SagaStepLog = Node & {
  __typename?: 'SagaStepLog';
  compensateInput?: Maybe<Scalars['JSON']['output']>;
  compensateOutput?: Maybe<Scalars['JSON']['output']>;
  compensateStatus: Scalars['String']['output'];
  completedAt?: Maybe<Scalars['Datetime']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  executeInput?: Maybe<Scalars['JSON']['output']>;
  executeOutput?: Maybe<Scalars['JSON']['output']>;
  executeStatus: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  idempotencyKey: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  /** Reads a single `SagaRun` that is related to this `SagaStepLog`. */
  sagaRun?: Maybe<SagaRun>;
  sagaRunId: Scalars['UUID']['output'];
  startedAt?: Maybe<Scalars['Datetime']['output']>;
  stepName: Scalars['String']['output'];
};

export type SagaStepLogAggregates = {
  __typename?: 'SagaStepLogAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<SagaStepLogDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** A filter to be used against aggregates of `SagaStepLog` object types. */
export type SagaStepLogAggregatesFilter = {
  /** Distinct count aggregate over matching `SagaStepLog` objects. */
  distinctCount?: InputMaybe<SagaStepLogDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `SagaStepLog` object to be included within the aggregate. */
  filter?: InputMaybe<SagaStepLogFilter>;
};

/**
 * A condition to be used against `SagaStepLog` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type SagaStepLogCondition = {
  /** Checks for equality with the object’s `compensateStatus` field. */
  compensateStatus?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `completedAt` field. */
  completedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `error` field. */
  error?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `executeStatus` field. */
  executeStatus?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `idempotencyKey` field. */
  idempotencyKey?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `sagaRunId` field. */
  sagaRunId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `startedAt` field. */
  startedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `stepName` field. */
  stepName?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `SagaStepLog` values. */
export type SagaStepLogConnection = {
  __typename?: 'SagaStepLogConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<SagaStepLogAggregates>;
  /** A list of edges which contains the `SagaStepLog` and cursor to aid in pagination. */
  edges: Array<SagaStepLogEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<SagaStepLogAggregates>>;
  /** A list of `SagaStepLog` objects. */
  nodes: Array<SagaStepLog>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SagaStepLog` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `SagaStepLog` values. */
export type SagaStepLogConnectionGroupedAggregatesArgs = {
  groupBy: Array<SagaStepLogGroupBy>;
  having?: InputMaybe<SagaStepLogHavingInput>;
};

export type SagaStepLogDistinctCountAggregateFilter = {
  compensateInput?: InputMaybe<BigIntFilter>;
  compensateOutput?: InputMaybe<BigIntFilter>;
  compensateStatus?: InputMaybe<BigIntFilter>;
  completedAt?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  error?: InputMaybe<BigIntFilter>;
  executeInput?: InputMaybe<BigIntFilter>;
  executeOutput?: InputMaybe<BigIntFilter>;
  executeStatus?: InputMaybe<BigIntFilter>;
  idempotencyKey?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  sagaRunId?: InputMaybe<BigIntFilter>;
  startedAt?: InputMaybe<BigIntFilter>;
  stepName?: InputMaybe<BigIntFilter>;
};

export type SagaStepLogDistinctCountAggregates = {
  __typename?: 'SagaStepLogDistinctCountAggregates';
  /** Distinct count of compensateInput across the matching connection */
  compensateInput?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of compensateOutput across the matching connection */
  compensateOutput?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of compensateStatus across the matching connection */
  compensateStatus?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of completedAt across the matching connection */
  completedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of error across the matching connection */
  error?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of executeInput across the matching connection */
  executeInput?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of executeOutput across the matching connection */
  executeOutput?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of executeStatus across the matching connection */
  executeStatus?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of idempotencyKey across the matching connection */
  idempotencyKey?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of sagaRunId across the matching connection */
  sagaRunId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of startedAt across the matching connection */
  startedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of stepName across the matching connection */
  stepName?: Maybe<Scalars['BigInt']['output']>;
};

/** A `SagaStepLog` edge in the connection. */
export type SagaStepLogEdge = {
  __typename?: 'SagaStepLogEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SagaStepLog` at the end of the edge. */
  node: SagaStepLog;
};

/** A filter to be used against `SagaStepLog` object types. All fields are combined with a logical ‘and.’ */
export type SagaStepLogFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<SagaStepLogFilter>>;
  /** Filter by the object’s `compensateStatus` field. */
  compensateStatus?: InputMaybe<StringFilter>;
  /** Filter by the object’s `completedAt` field. */
  completedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `error` field. */
  error?: InputMaybe<StringFilter>;
  /** Filter by the object’s `executeStatus` field. */
  executeStatus?: InputMaybe<StringFilter>;
  /** Filter by the object’s `idempotencyKey` field. */
  idempotencyKey?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<SagaStepLogFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<SagaStepLogFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `sagaRun` relation. */
  sagaRun?: InputMaybe<SagaRunFilter>;
  /** Filter by the object’s `sagaRunId` field. */
  sagaRunId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `startedAt` field. */
  startedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `stepName` field. */
  stepName?: InputMaybe<StringFilter>;
};

/** Grouping methods for `SagaStepLog` for usage during aggregation. */
export enum SagaStepLogGroupBy {
  CompensateInput = 'COMPENSATE_INPUT',
  CompensateOutput = 'COMPENSATE_OUTPUT',
  CompensateStatus = 'COMPENSATE_STATUS',
  CompletedAt = 'COMPLETED_AT',
  CompletedAtTruncatedToDay = 'COMPLETED_AT_TRUNCATED_TO_DAY',
  CompletedAtTruncatedToHour = 'COMPLETED_AT_TRUNCATED_TO_HOUR',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Error = 'ERROR',
  ExecuteInput = 'EXECUTE_INPUT',
  ExecuteOutput = 'EXECUTE_OUTPUT',
  ExecuteStatus = 'EXECUTE_STATUS',
  IdempotencyKey = 'IDEMPOTENCY_KEY',
  SagaRunId = 'SAGA_RUN_ID',
  StartedAt = 'STARTED_AT',
  StartedAtTruncatedToDay = 'STARTED_AT_TRUNCATED_TO_DAY',
  StartedAtTruncatedToHour = 'STARTED_AT_TRUNCATED_TO_HOUR',
  StepName = 'STEP_NAME'
}

export type SagaStepLogHavingAverageInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SagaStepLogHavingDistinctCountInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `SagaStepLog` aggregates. */
export type SagaStepLogHavingInput = {
  AND?: InputMaybe<Array<SagaStepLogHavingInput>>;
  OR?: InputMaybe<Array<SagaStepLogHavingInput>>;
  average?: InputMaybe<SagaStepLogHavingAverageInput>;
  distinctCount?: InputMaybe<SagaStepLogHavingDistinctCountInput>;
  max?: InputMaybe<SagaStepLogHavingMaxInput>;
  min?: InputMaybe<SagaStepLogHavingMinInput>;
  stddevPopulation?: InputMaybe<SagaStepLogHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<SagaStepLogHavingStddevSampleInput>;
  sum?: InputMaybe<SagaStepLogHavingSumInput>;
  variancePopulation?: InputMaybe<SagaStepLogHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<SagaStepLogHavingVarianceSampleInput>;
};

export type SagaStepLogHavingMaxInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SagaStepLogHavingMinInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SagaStepLogHavingStddevPopulationInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SagaStepLogHavingStddevSampleInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SagaStepLogHavingSumInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SagaStepLogHavingVariancePopulationInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SagaStepLogHavingVarianceSampleInput = {
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  startedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Methods to use when ordering `SagaStepLog`. */
export enum SagaStepLogOrderBy {
  CompensateStatusAsc = 'COMPENSATE_STATUS_ASC',
  CompensateStatusDesc = 'COMPENSATE_STATUS_DESC',
  CompletedAtAsc = 'COMPLETED_AT_ASC',
  CompletedAtDesc = 'COMPLETED_AT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  ErrorAsc = 'ERROR_ASC',
  ErrorDesc = 'ERROR_DESC',
  ExecuteStatusAsc = 'EXECUTE_STATUS_ASC',
  ExecuteStatusDesc = 'EXECUTE_STATUS_DESC',
  IdempotencyKeyAsc = 'IDEMPOTENCY_KEY_ASC',
  IdempotencyKeyDesc = 'IDEMPOTENCY_KEY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SagaRunIdAsc = 'SAGA_RUN_ID_ASC',
  SagaRunIdDesc = 'SAGA_RUN_ID_DESC',
  StartedAtAsc = 'STARTED_AT_ASC',
  StartedAtDesc = 'STARTED_AT_DESC',
  StepNameAsc = 'STEP_NAME_ASC',
  StepNameDesc = 'STEP_NAME_DESC'
}

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

export type SubscriptionDelivery = Node & {
  __typename?: 'SubscriptionDelivery';
  attempts: Scalars['Int']['output'];
  completedAt?: Maybe<Scalars['Datetime']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  eventId: Scalars['String']['output'];
  eventType: Scalars['String']['output'];
  httpStatus?: Maybe<Scalars['Int']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  nextRetryAt?: Maybe<Scalars['Datetime']['output']>;
  organizationId: Scalars['String']['output'];
  payload?: Maybe<Scalars['JSON']['output']>;
  rowId: Scalars['UUID']['output'];
  status: Scalars['String']['output'];
  /** Reads a single `EventSubscription` that is related to this `SubscriptionDelivery`. */
  subscription?: Maybe<EventSubscription>;
  subscriptionId: Scalars['UUID']['output'];
};

export type SubscriptionDeliveryAggregates = {
  __typename?: 'SubscriptionDeliveryAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<SubscriptionDeliveryAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<SubscriptionDeliveryDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<SubscriptionDeliveryMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<SubscriptionDeliveryMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<SubscriptionDeliveryStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<SubscriptionDeliveryStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<SubscriptionDeliverySumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<SubscriptionDeliveryVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<SubscriptionDeliveryVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `SubscriptionDelivery` object types. */
export type SubscriptionDeliveryAggregatesFilter = {
  /** Mean average aggregate over matching `SubscriptionDelivery` objects. */
  average?: InputMaybe<SubscriptionDeliveryAverageAggregateFilter>;
  /** Distinct count aggregate over matching `SubscriptionDelivery` objects. */
  distinctCount?: InputMaybe<SubscriptionDeliveryDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `SubscriptionDelivery` object to be included within the aggregate. */
  filter?: InputMaybe<SubscriptionDeliveryFilter>;
  /** Maximum aggregate over matching `SubscriptionDelivery` objects. */
  max?: InputMaybe<SubscriptionDeliveryMaxAggregateFilter>;
  /** Minimum aggregate over matching `SubscriptionDelivery` objects. */
  min?: InputMaybe<SubscriptionDeliveryMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `SubscriptionDelivery` objects. */
  stddevPopulation?: InputMaybe<SubscriptionDeliveryStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `SubscriptionDelivery` objects. */
  stddevSample?: InputMaybe<SubscriptionDeliveryStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `SubscriptionDelivery` objects. */
  sum?: InputMaybe<SubscriptionDeliverySumAggregateFilter>;
  /** Population variance aggregate over matching `SubscriptionDelivery` objects. */
  variancePopulation?: InputMaybe<SubscriptionDeliveryVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `SubscriptionDelivery` objects. */
  varianceSample?: InputMaybe<SubscriptionDeliveryVarianceSampleAggregateFilter>;
};

export type SubscriptionDeliveryAverageAggregateFilter = {
  attempts?: InputMaybe<BigFloatFilter>;
  httpStatus?: InputMaybe<BigFloatFilter>;
};

export type SubscriptionDeliveryAverageAggregates = {
  __typename?: 'SubscriptionDeliveryAverageAggregates';
  /** Mean average of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of httpStatus across the matching connection */
  httpStatus?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `SubscriptionDelivery` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type SubscriptionDeliveryCondition = {
  /** Checks for equality with the object’s `attempts` field. */
  attempts?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `completedAt` field. */
  completedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `error` field. */
  error?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `eventId` field. */
  eventId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `eventType` field. */
  eventType?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `httpStatus` field. */
  httpStatus?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `nextRetryAt` field. */
  nextRetryAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `subscriptionId` field. */
  subscriptionId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `SubscriptionDelivery` values. */
export type SubscriptionDeliveryConnection = {
  __typename?: 'SubscriptionDeliveryConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<SubscriptionDeliveryAggregates>;
  /** A list of edges which contains the `SubscriptionDelivery` and cursor to aid in pagination. */
  edges: Array<SubscriptionDeliveryEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<SubscriptionDeliveryAggregates>>;
  /** A list of `SubscriptionDelivery` objects. */
  nodes: Array<SubscriptionDelivery>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SubscriptionDelivery` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `SubscriptionDelivery` values. */
export type SubscriptionDeliveryConnectionGroupedAggregatesArgs = {
  groupBy: Array<SubscriptionDeliveryGroupBy>;
  having?: InputMaybe<SubscriptionDeliveryHavingInput>;
};

export type SubscriptionDeliveryDistinctCountAggregateFilter = {
  attempts?: InputMaybe<BigIntFilter>;
  completedAt?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  error?: InputMaybe<BigIntFilter>;
  eventId?: InputMaybe<BigIntFilter>;
  eventType?: InputMaybe<BigIntFilter>;
  httpStatus?: InputMaybe<BigIntFilter>;
  nextRetryAt?: InputMaybe<BigIntFilter>;
  organizationId?: InputMaybe<BigIntFilter>;
  payload?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  status?: InputMaybe<BigIntFilter>;
  subscriptionId?: InputMaybe<BigIntFilter>;
};

export type SubscriptionDeliveryDistinctCountAggregates = {
  __typename?: 'SubscriptionDeliveryDistinctCountAggregates';
  /** Distinct count of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of completedAt across the matching connection */
  completedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of error across the matching connection */
  error?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of eventId across the matching connection */
  eventId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of eventType across the matching connection */
  eventType?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of httpStatus across the matching connection */
  httpStatus?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of nextRetryAt across the matching connection */
  nextRetryAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of payload across the matching connection */
  payload?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of status across the matching connection */
  status?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of subscriptionId across the matching connection */
  subscriptionId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `SubscriptionDelivery` edge in the connection. */
export type SubscriptionDeliveryEdge = {
  __typename?: 'SubscriptionDeliveryEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SubscriptionDelivery` at the end of the edge. */
  node: SubscriptionDelivery;
};

/** A filter to be used against `SubscriptionDelivery` object types. All fields are combined with a logical ‘and.’ */
export type SubscriptionDeliveryFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<SubscriptionDeliveryFilter>>;
  /** Filter by the object’s `attempts` field. */
  attempts?: InputMaybe<IntFilter>;
  /** Filter by the object’s `completedAt` field. */
  completedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `error` field. */
  error?: InputMaybe<StringFilter>;
  /** Filter by the object’s `eventId` field. */
  eventId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `eventType` field. */
  eventType?: InputMaybe<StringFilter>;
  /** Filter by the object’s `httpStatus` field. */
  httpStatus?: InputMaybe<IntFilter>;
  /** Filter by the object’s `nextRetryAt` field. */
  nextRetryAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<SubscriptionDeliveryFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<SubscriptionDeliveryFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
  /** Filter by the object’s `subscription` relation. */
  subscription?: InputMaybe<EventSubscriptionFilter>;
  /** Filter by the object’s `subscriptionId` field. */
  subscriptionId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `SubscriptionDelivery` for usage during aggregation. */
export enum SubscriptionDeliveryGroupBy {
  Attempts = 'ATTEMPTS',
  CompletedAt = 'COMPLETED_AT',
  CompletedAtTruncatedToDay = 'COMPLETED_AT_TRUNCATED_TO_DAY',
  CompletedAtTruncatedToHour = 'COMPLETED_AT_TRUNCATED_TO_HOUR',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Error = 'ERROR',
  EventId = 'EVENT_ID',
  EventType = 'EVENT_TYPE',
  HttpStatus = 'HTTP_STATUS',
  NextRetryAt = 'NEXT_RETRY_AT',
  NextRetryAtTruncatedToDay = 'NEXT_RETRY_AT_TRUNCATED_TO_DAY',
  NextRetryAtTruncatedToHour = 'NEXT_RETRY_AT_TRUNCATED_TO_HOUR',
  OrganizationId = 'ORGANIZATION_ID',
  Payload = 'PAYLOAD',
  Status = 'STATUS',
  SubscriptionId = 'SUBSCRIPTION_ID'
}

export type SubscriptionDeliveryHavingAverageInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  httpStatus?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SubscriptionDeliveryHavingDistinctCountInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  httpStatus?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `SubscriptionDelivery` aggregates. */
export type SubscriptionDeliveryHavingInput = {
  AND?: InputMaybe<Array<SubscriptionDeliveryHavingInput>>;
  OR?: InputMaybe<Array<SubscriptionDeliveryHavingInput>>;
  average?: InputMaybe<SubscriptionDeliveryHavingAverageInput>;
  distinctCount?: InputMaybe<SubscriptionDeliveryHavingDistinctCountInput>;
  max?: InputMaybe<SubscriptionDeliveryHavingMaxInput>;
  min?: InputMaybe<SubscriptionDeliveryHavingMinInput>;
  stddevPopulation?: InputMaybe<SubscriptionDeliveryHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<SubscriptionDeliveryHavingStddevSampleInput>;
  sum?: InputMaybe<SubscriptionDeliveryHavingSumInput>;
  variancePopulation?: InputMaybe<SubscriptionDeliveryHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<SubscriptionDeliveryHavingVarianceSampleInput>;
};

export type SubscriptionDeliveryHavingMaxInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  httpStatus?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SubscriptionDeliveryHavingMinInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  httpStatus?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SubscriptionDeliveryHavingStddevPopulationInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  httpStatus?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SubscriptionDeliveryHavingStddevSampleInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  httpStatus?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SubscriptionDeliveryHavingSumInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  httpStatus?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SubscriptionDeliveryHavingVariancePopulationInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  httpStatus?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SubscriptionDeliveryHavingVarianceSampleInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  httpStatus?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SubscriptionDeliveryMaxAggregateFilter = {
  attempts?: InputMaybe<IntFilter>;
  httpStatus?: InputMaybe<IntFilter>;
};

export type SubscriptionDeliveryMaxAggregates = {
  __typename?: 'SubscriptionDeliveryMaxAggregates';
  /** Maximum of attempts across the matching connection */
  attempts?: Maybe<Scalars['Int']['output']>;
  /** Maximum of httpStatus across the matching connection */
  httpStatus?: Maybe<Scalars['Int']['output']>;
};

export type SubscriptionDeliveryMinAggregateFilter = {
  attempts?: InputMaybe<IntFilter>;
  httpStatus?: InputMaybe<IntFilter>;
};

export type SubscriptionDeliveryMinAggregates = {
  __typename?: 'SubscriptionDeliveryMinAggregates';
  /** Minimum of attempts across the matching connection */
  attempts?: Maybe<Scalars['Int']['output']>;
  /** Minimum of httpStatus across the matching connection */
  httpStatus?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `SubscriptionDelivery`. */
export enum SubscriptionDeliveryOrderBy {
  AttemptsAsc = 'ATTEMPTS_ASC',
  AttemptsDesc = 'ATTEMPTS_DESC',
  CompletedAtAsc = 'COMPLETED_AT_ASC',
  CompletedAtDesc = 'COMPLETED_AT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  ErrorAsc = 'ERROR_ASC',
  ErrorDesc = 'ERROR_DESC',
  EventIdAsc = 'EVENT_ID_ASC',
  EventIdDesc = 'EVENT_ID_DESC',
  EventTypeAsc = 'EVENT_TYPE_ASC',
  EventTypeDesc = 'EVENT_TYPE_DESC',
  HttpStatusAsc = 'HTTP_STATUS_ASC',
  HttpStatusDesc = 'HTTP_STATUS_DESC',
  Natural = 'NATURAL',
  NextRetryAtAsc = 'NEXT_RETRY_AT_ASC',
  NextRetryAtDesc = 'NEXT_RETRY_AT_DESC',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  SubscriptionIdAsc = 'SUBSCRIPTION_ID_ASC',
  SubscriptionIdDesc = 'SUBSCRIPTION_ID_DESC'
}

export type SubscriptionDeliveryStddevPopulationAggregateFilter = {
  attempts?: InputMaybe<BigFloatFilter>;
  httpStatus?: InputMaybe<BigFloatFilter>;
};

export type SubscriptionDeliveryStddevPopulationAggregates = {
  __typename?: 'SubscriptionDeliveryStddevPopulationAggregates';
  /** Population standard deviation of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of httpStatus across the matching connection */
  httpStatus?: Maybe<Scalars['BigFloat']['output']>;
};

export type SubscriptionDeliveryStddevSampleAggregateFilter = {
  attempts?: InputMaybe<BigFloatFilter>;
  httpStatus?: InputMaybe<BigFloatFilter>;
};

export type SubscriptionDeliveryStddevSampleAggregates = {
  __typename?: 'SubscriptionDeliveryStddevSampleAggregates';
  /** Sample standard deviation of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of httpStatus across the matching connection */
  httpStatus?: Maybe<Scalars['BigFloat']['output']>;
};

export type SubscriptionDeliverySumAggregateFilter = {
  attempts?: InputMaybe<BigIntFilter>;
  httpStatus?: InputMaybe<BigIntFilter>;
};

export type SubscriptionDeliverySumAggregates = {
  __typename?: 'SubscriptionDeliverySumAggregates';
  /** Sum of attempts across the matching connection */
  attempts: Scalars['BigInt']['output'];
  /** Sum of httpStatus across the matching connection */
  httpStatus: Scalars['BigInt']['output'];
};

export type SubscriptionDeliveryVariancePopulationAggregateFilter = {
  attempts?: InputMaybe<BigFloatFilter>;
  httpStatus?: InputMaybe<BigFloatFilter>;
};

export type SubscriptionDeliveryVariancePopulationAggregates = {
  __typename?: 'SubscriptionDeliveryVariancePopulationAggregates';
  /** Population variance of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of httpStatus across the matching connection */
  httpStatus?: Maybe<Scalars['BigFloat']['output']>;
};

export type SubscriptionDeliveryVarianceSampleAggregateFilter = {
  attempts?: InputMaybe<BigFloatFilter>;
  httpStatus?: InputMaybe<BigFloatFilter>;
};

export type SubscriptionDeliveryVarianceSampleAggregates = {
  __typename?: 'SubscriptionDeliveryVarianceSampleAggregates';
  /** Sample variance of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of httpStatus across the matching connection */
  httpStatus?: Maybe<Scalars['BigFloat']['output']>;
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

/** All input for the `updateEventSchema` mutation. */
export type UpdateEventSchemaInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `EventSchema` being updated. */
  patch: EventSchemaPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `EventSchema` mutation. */
export type UpdateEventSchemaPayload = {
  __typename?: 'UpdateEventSchemaPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `EventSchema` that was updated by this mutation. */
  eventSchema?: Maybe<EventSchema>;
  /** An edge for our `EventSchema`. May be used by Relay 1. */
  eventSchemaEdge?: Maybe<EventSchemaEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `EventSchema` mutation. */
export type UpdateEventSchemaPayloadEventSchemaEdgeArgs = {
  orderBy?: Array<EventSchemaOrderBy>;
};

/** All input for the `updateEventSubscription` mutation. */
export type UpdateEventSubscriptionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `EventSubscription` being updated. */
  patch: EventSubscriptionPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `EventSubscription` mutation. */
export type UpdateEventSubscriptionPayload = {
  __typename?: 'UpdateEventSubscriptionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `EventSubscription` that was updated by this mutation. */
  eventSubscription?: Maybe<EventSubscription>;
  /** An edge for our `EventSubscription`. May be used by Relay 1. */
  eventSubscriptionEdge?: Maybe<EventSubscriptionEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `EventSubscription` mutation. */
export type UpdateEventSubscriptionPayloadEventSubscriptionEdgeArgs = {
  orderBy?: Array<EventSubscriptionOrderBy>;
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

export type User = {
  __typename?: 'User';
  /** Reads and enables pagination through a set of `Plugin`. */
  authoredPlugins: PluginConnection;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  email: Scalars['String']['output'];
  identityProviderId: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `UserOrganization`. */
  userOrganizations: UserOrganizationConnection;
  /** Reads and enables pagination through a set of `WorkflowVersion`. */
  workflowVersionsByCreatedBy: WorkflowVersionConnection;
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


export type UserWorkflowVersionsByCreatedByArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkflowVersionCondition>;
  filter?: InputMaybe<WorkflowVersionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkflowVersionOrderBy>>;
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
  /** Filter by the object’s `workflowVersionsByCreatedBy` relation. */
  workflowVersionsByCreatedBy?: InputMaybe<UserToManyWorkflowVersionFilter>;
  /** Some related `workflowVersionsByCreatedBy` exist. */
  workflowVersionsByCreatedByExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `workflowsByCreatedBy` relation. */
  workflowsByCreatedBy?: InputMaybe<UserToManyWorkflowFilter>;
  /** Some related `workflowsByCreatedBy` exist. */
  workflowsByCreatedByExist?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserOrganization = Node & {
  __typename?: 'UserOrganization';
  billingAccountId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  organizationId: Scalars['String']['output'];
  role: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  slug: Scalars['String']['output'];
  syncedAt?: Maybe<Scalars['Datetime']['output']>;
  type: Scalars['String']['output'];
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
  /** Checks for equality with the object’s `billingAccountId` field. */
  billingAccountId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `role` field. */
  role?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `syncedAt` field. */
  syncedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
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
  billingAccountId?: InputMaybe<BigIntFilter>;
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
  /** Distinct count of billingAccountId across the matching connection */
  billingAccountId?: Maybe<Scalars['BigInt']['output']>;
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
  /** Filter by the object’s `billingAccountId` field. */
  billingAccountId?: InputMaybe<StringFilter>;
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
  role?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
  /** Filter by the object’s `syncedAt` field. */
  syncedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `UserOrganization` for usage during aggregation. */
export enum UserOrganizationGroupBy {
  BillingAccountId = 'BILLING_ACCOUNT_ID',
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

/** Methods to use when ordering `UserOrganization`. */
export enum UserOrganizationOrderBy {
  BillingAccountIdAsc = 'BILLING_ACCOUNT_ID_ASC',
  BillingAccountIdDesc = 'BILLING_ACCOUNT_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RoleAsc = 'ROLE_ASC',
  RoleDesc = 'ROLE_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  SyncedAtAsc = 'SYNCED_AT_ASC',
  SyncedAtDesc = 'SYNCED_AT_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

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

/** A filter to be used against many `WorkflowVersion` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyWorkflowVersionFilter = {
  /** Aggregates across related `WorkflowVersion` match the filter criteria. */
  aggregates?: InputMaybe<WorkflowVersionAggregatesFilter>;
  /** Every related `WorkflowVersion` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<WorkflowVersionFilter>;
  /** No related `WorkflowVersion` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<WorkflowVersionFilter>;
  /** Some related `WorkflowVersion` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<WorkflowVersionFilter>;
};

export type WardenSyncQueue = Node & {
  __typename?: 'WardenSyncQueue';
  attempts: Scalars['Int']['output'];
  completedAt?: Maybe<Scalars['Datetime']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  description: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  lastError?: Maybe<Scalars['String']['output']>;
  maxAttempts: Scalars['Int']['output'];
  nextRetryAt: Scalars['Datetime']['output'];
  operation: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  status: Scalars['String']['output'];
  tuples: Scalars['JSON']['output'];
};

export type WardenSyncQueueAggregates = {
  __typename?: 'WardenSyncQueueAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<WardenSyncQueueAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<WardenSyncQueueDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<WardenSyncQueueMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<WardenSyncQueueMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<WardenSyncQueueStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<WardenSyncQueueStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<WardenSyncQueueSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<WardenSyncQueueVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<WardenSyncQueueVarianceSampleAggregates>;
};

export type WardenSyncQueueAverageAggregates = {
  __typename?: 'WardenSyncQueueAverageAggregates';
  /** Mean average of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
  /** Mean average of maxAttempts across the matching connection */
  maxAttempts?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `WardenSyncQueue` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type WardenSyncQueueCondition = {
  /** Checks for equality with the object’s `attempts` field. */
  attempts?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `completedAt` field. */
  completedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `lastError` field. */
  lastError?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `maxAttempts` field. */
  maxAttempts?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `nextRetryAt` field. */
  nextRetryAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `operation` field. */
  operation?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `WardenSyncQueue` values. */
export type WardenSyncQueueConnection = {
  __typename?: 'WardenSyncQueueConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<WardenSyncQueueAggregates>;
  /** A list of edges which contains the `WardenSyncQueue` and cursor to aid in pagination. */
  edges: Array<WardenSyncQueueEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<WardenSyncQueueAggregates>>;
  /** A list of `WardenSyncQueue` objects. */
  nodes: Array<WardenSyncQueue>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `WardenSyncQueue` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `WardenSyncQueue` values. */
export type WardenSyncQueueConnectionGroupedAggregatesArgs = {
  groupBy: Array<WardenSyncQueueGroupBy>;
  having?: InputMaybe<WardenSyncQueueHavingInput>;
};

export type WardenSyncQueueDistinctCountAggregates = {
  __typename?: 'WardenSyncQueueDistinctCountAggregates';
  /** Distinct count of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of completedAt across the matching connection */
  completedAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of description across the matching connection */
  description?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of lastError across the matching connection */
  lastError?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of maxAttempts across the matching connection */
  maxAttempts?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of nextRetryAt across the matching connection */
  nextRetryAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of operation across the matching connection */
  operation?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of status across the matching connection */
  status?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of tuples across the matching connection */
  tuples?: Maybe<Scalars['BigInt']['output']>;
};

/** A `WardenSyncQueue` edge in the connection. */
export type WardenSyncQueueEdge = {
  __typename?: 'WardenSyncQueueEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `WardenSyncQueue` at the end of the edge. */
  node: WardenSyncQueue;
};

/** A filter to be used against `WardenSyncQueue` object types. All fields are combined with a logical ‘and.’ */
export type WardenSyncQueueFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<WardenSyncQueueFilter>>;
  /** Filter by the object’s `attempts` field. */
  attempts?: InputMaybe<IntFilter>;
  /** Filter by the object’s `completedAt` field. */
  completedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `lastError` field. */
  lastError?: InputMaybe<StringFilter>;
  /** Filter by the object’s `maxAttempts` field. */
  maxAttempts?: InputMaybe<IntFilter>;
  /** Filter by the object’s `nextRetryAt` field. */
  nextRetryAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<WardenSyncQueueFilter>;
  /** Filter by the object’s `operation` field. */
  operation?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<WardenSyncQueueFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<StringFilter>;
};

/** Grouping methods for `WardenSyncQueue` for usage during aggregation. */
export enum WardenSyncQueueGroupBy {
  Attempts = 'ATTEMPTS',
  CompletedAt = 'COMPLETED_AT',
  CompletedAtTruncatedToDay = 'COMPLETED_AT_TRUNCATED_TO_DAY',
  CompletedAtTruncatedToHour = 'COMPLETED_AT_TRUNCATED_TO_HOUR',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Description = 'DESCRIPTION',
  LastError = 'LAST_ERROR',
  MaxAttempts = 'MAX_ATTEMPTS',
  NextRetryAt = 'NEXT_RETRY_AT',
  NextRetryAtTruncatedToDay = 'NEXT_RETRY_AT_TRUNCATED_TO_DAY',
  NextRetryAtTruncatedToHour = 'NEXT_RETRY_AT_TRUNCATED_TO_HOUR',
  Operation = 'OPERATION',
  Status = 'STATUS',
  Tuples = 'TUPLES'
}

export type WardenSyncQueueHavingAverageInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  maxAttempts?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WardenSyncQueueHavingDistinctCountInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  maxAttempts?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `WardenSyncQueue` aggregates. */
export type WardenSyncQueueHavingInput = {
  AND?: InputMaybe<Array<WardenSyncQueueHavingInput>>;
  OR?: InputMaybe<Array<WardenSyncQueueHavingInput>>;
  average?: InputMaybe<WardenSyncQueueHavingAverageInput>;
  distinctCount?: InputMaybe<WardenSyncQueueHavingDistinctCountInput>;
  max?: InputMaybe<WardenSyncQueueHavingMaxInput>;
  min?: InputMaybe<WardenSyncQueueHavingMinInput>;
  stddevPopulation?: InputMaybe<WardenSyncQueueHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<WardenSyncQueueHavingStddevSampleInput>;
  sum?: InputMaybe<WardenSyncQueueHavingSumInput>;
  variancePopulation?: InputMaybe<WardenSyncQueueHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<WardenSyncQueueHavingVarianceSampleInput>;
};

export type WardenSyncQueueHavingMaxInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  maxAttempts?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WardenSyncQueueHavingMinInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  maxAttempts?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WardenSyncQueueHavingStddevPopulationInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  maxAttempts?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WardenSyncQueueHavingStddevSampleInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  maxAttempts?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WardenSyncQueueHavingSumInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  maxAttempts?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WardenSyncQueueHavingVariancePopulationInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  maxAttempts?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WardenSyncQueueHavingVarianceSampleInput = {
  attempts?: InputMaybe<HavingIntFilter>;
  completedAt?: InputMaybe<HavingDatetimeFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  maxAttempts?: InputMaybe<HavingIntFilter>;
  nextRetryAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WardenSyncQueueMaxAggregates = {
  __typename?: 'WardenSyncQueueMaxAggregates';
  /** Maximum of attempts across the matching connection */
  attempts?: Maybe<Scalars['Int']['output']>;
  /** Maximum of maxAttempts across the matching connection */
  maxAttempts?: Maybe<Scalars['Int']['output']>;
};

export type WardenSyncQueueMinAggregates = {
  __typename?: 'WardenSyncQueueMinAggregates';
  /** Minimum of attempts across the matching connection */
  attempts?: Maybe<Scalars['Int']['output']>;
  /** Minimum of maxAttempts across the matching connection */
  maxAttempts?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `WardenSyncQueue`. */
export enum WardenSyncQueueOrderBy {
  AttemptsAsc = 'ATTEMPTS_ASC',
  AttemptsDesc = 'ATTEMPTS_DESC',
  CompletedAtAsc = 'COMPLETED_AT_ASC',
  CompletedAtDesc = 'COMPLETED_AT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  LastErrorAsc = 'LAST_ERROR_ASC',
  LastErrorDesc = 'LAST_ERROR_DESC',
  MaxAttemptsAsc = 'MAX_ATTEMPTS_ASC',
  MaxAttemptsDesc = 'MAX_ATTEMPTS_DESC',
  Natural = 'NATURAL',
  NextRetryAtAsc = 'NEXT_RETRY_AT_ASC',
  NextRetryAtDesc = 'NEXT_RETRY_AT_DESC',
  OperationAsc = 'OPERATION_ASC',
  OperationDesc = 'OPERATION_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC'
}

export type WardenSyncQueueStddevPopulationAggregates = {
  __typename?: 'WardenSyncQueueStddevPopulationAggregates';
  /** Population standard deviation of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
  /** Population standard deviation of maxAttempts across the matching connection */
  maxAttempts?: Maybe<Scalars['BigFloat']['output']>;
};

export type WardenSyncQueueStddevSampleAggregates = {
  __typename?: 'WardenSyncQueueStddevSampleAggregates';
  /** Sample standard deviation of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample standard deviation of maxAttempts across the matching connection */
  maxAttempts?: Maybe<Scalars['BigFloat']['output']>;
};

export type WardenSyncQueueSumAggregates = {
  __typename?: 'WardenSyncQueueSumAggregates';
  /** Sum of attempts across the matching connection */
  attempts: Scalars['BigInt']['output'];
  /** Sum of maxAttempts across the matching connection */
  maxAttempts: Scalars['BigInt']['output'];
};

export type WardenSyncQueueVariancePopulationAggregates = {
  __typename?: 'WardenSyncQueueVariancePopulationAggregates';
  /** Population variance of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
  /** Population variance of maxAttempts across the matching connection */
  maxAttempts?: Maybe<Scalars['BigFloat']['output']>;
};

export type WardenSyncQueueVarianceSampleAggregates = {
  __typename?: 'WardenSyncQueueVarianceSampleAggregates';
  /** Sample variance of attempts across the matching connection */
  attempts?: Maybe<Scalars['BigFloat']['output']>;
  /** Sample variance of maxAttempts across the matching connection */
  maxAttempts?: Maybe<Scalars['BigFloat']['output']>;
};

export type Workflow = Node & {
  __typename?: 'Workflow';
  /** Reads and enables pagination through a set of `ApprovalRequest`. */
  approvalRequests: ApprovalRequestConnection;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  createdBy?: Maybe<Scalars['UUID']['output']>;
  cronExpression?: Maybe<Scalars['String']['output']>;
  definition: Scalars['JSON']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `EventRoutingRule`. */
  eventRoutingRules: EventRoutingRuleConnection;
  executor: Scalars['String']['output'];
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
  version: Scalars['Int']['output'];
  webhookSecret?: Maybe<Scalars['String']['output']>;
  /** Reads and enables pagination through a set of `WorkflowRun`. */
  workflowRuns: WorkflowRunConnection;
  /** Reads and enables pagination through a set of `WorkflowVersion`. */
  workflowVersions: WorkflowVersionConnection;
};


export type WorkflowApprovalRequestsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ApprovalRequestCondition>;
  filter?: InputMaybe<ApprovalRequestFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ApprovalRequestOrderBy>>;
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


export type WorkflowWorkflowVersionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkflowVersionCondition>;
  filter?: InputMaybe<WorkflowVersionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkflowVersionOrderBy>>;
};

export type WorkflowAggregates = {
  __typename?: 'WorkflowAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<WorkflowAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<WorkflowDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<WorkflowMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<WorkflowMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<WorkflowStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<WorkflowStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<WorkflowSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<WorkflowVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<WorkflowVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `Workflow` object types. */
export type WorkflowAggregatesFilter = {
  /** Mean average aggregate over matching `Workflow` objects. */
  average?: InputMaybe<WorkflowAverageAggregateFilter>;
  /** Distinct count aggregate over matching `Workflow` objects. */
  distinctCount?: InputMaybe<WorkflowDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `Workflow` object to be included within the aggregate. */
  filter?: InputMaybe<WorkflowFilter>;
  /** Maximum aggregate over matching `Workflow` objects. */
  max?: InputMaybe<WorkflowMaxAggregateFilter>;
  /** Minimum aggregate over matching `Workflow` objects. */
  min?: InputMaybe<WorkflowMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `Workflow` objects. */
  stddevPopulation?: InputMaybe<WorkflowStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `Workflow` objects. */
  stddevSample?: InputMaybe<WorkflowStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `Workflow` objects. */
  sum?: InputMaybe<WorkflowSumAggregateFilter>;
  /** Population variance aggregate over matching `Workflow` objects. */
  variancePopulation?: InputMaybe<WorkflowVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `Workflow` objects. */
  varianceSample?: InputMaybe<WorkflowVarianceSampleAggregateFilter>;
};

export type WorkflowAverageAggregateFilter = {
  version?: InputMaybe<BigFloatFilter>;
};

export type WorkflowAverageAggregates = {
  __typename?: 'WorkflowAverageAggregates';
  /** Mean average of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
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
  /** Checks for equality with the object’s `executor` field. */
  executor?: InputMaybe<Scalars['String']['input']>;
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
  /** Checks for equality with the object’s `version` field. */
  version?: InputMaybe<Scalars['Int']['input']>;
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
  executor?: InputMaybe<BigIntFilter>;
  isActive?: InputMaybe<BigIntFilter>;
  lastRunAt?: InputMaybe<BigIntFilter>;
  lastRunStatus?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<BigIntFilter>;
  organizationId?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  updatedAt?: InputMaybe<BigIntFilter>;
  version?: InputMaybe<BigIntFilter>;
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
  /** Distinct count of executor across the matching connection */
  executor?: Maybe<Scalars['BigInt']['output']>;
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
  /** Distinct count of version across the matching connection */
  version?: Maybe<Scalars['BigInt']['output']>;
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

export type WorkflowExecutorConfig = Node & {
  __typename?: 'WorkflowExecutorConfig';
  config: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  organizationId: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  slug: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

export type WorkflowExecutorConfigAggregates = {
  __typename?: 'WorkflowExecutorConfigAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<WorkflowExecutorConfigDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/**
 * A condition to be used against `WorkflowExecutorConfig` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type WorkflowExecutorConfigCondition = {
  /** Checks for equality with the object’s `config` field. */
  config?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A connection to a list of `WorkflowExecutorConfig` values. */
export type WorkflowExecutorConfigConnection = {
  __typename?: 'WorkflowExecutorConfigConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<WorkflowExecutorConfigAggregates>;
  /** A list of edges which contains the `WorkflowExecutorConfig` and cursor to aid in pagination. */
  edges: Array<WorkflowExecutorConfigEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<WorkflowExecutorConfigAggregates>>;
  /** A list of `WorkflowExecutorConfig` objects. */
  nodes: Array<WorkflowExecutorConfig>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `WorkflowExecutorConfig` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `WorkflowExecutorConfig` values. */
export type WorkflowExecutorConfigConnectionGroupedAggregatesArgs = {
  groupBy: Array<WorkflowExecutorConfigGroupBy>;
  having?: InputMaybe<WorkflowExecutorConfigHavingInput>;
};

export type WorkflowExecutorConfigDistinctCountAggregates = {
  __typename?: 'WorkflowExecutorConfigDistinctCountAggregates';
  /** Distinct count of config across the matching connection */
  config?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of organizationId across the matching connection */
  organizationId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of slug across the matching connection */
  slug?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of type across the matching connection */
  type?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
};

/** A `WorkflowExecutorConfig` edge in the connection. */
export type WorkflowExecutorConfigEdge = {
  __typename?: 'WorkflowExecutorConfigEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `WorkflowExecutorConfig` at the end of the edge. */
  node: WorkflowExecutorConfig;
};

/** A filter to be used against `WorkflowExecutorConfig` object types. All fields are combined with a logical ‘and.’ */
export type WorkflowExecutorConfigFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<WorkflowExecutorConfigFilter>>;
  /** Filter by the object’s `config` field. */
  config?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<WorkflowExecutorConfigFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<WorkflowExecutorConfigFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** Grouping methods for `WorkflowExecutorConfig` for usage during aggregation. */
export enum WorkflowExecutorConfigGroupBy {
  Config = 'CONFIG',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  OrganizationId = 'ORGANIZATION_ID',
  Slug = 'SLUG',
  Type = 'TYPE',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type WorkflowExecutorConfigHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowExecutorConfigHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `WorkflowExecutorConfig` aggregates. */
export type WorkflowExecutorConfigHavingInput = {
  AND?: InputMaybe<Array<WorkflowExecutorConfigHavingInput>>;
  OR?: InputMaybe<Array<WorkflowExecutorConfigHavingInput>>;
  average?: InputMaybe<WorkflowExecutorConfigHavingAverageInput>;
  distinctCount?: InputMaybe<WorkflowExecutorConfigHavingDistinctCountInput>;
  max?: InputMaybe<WorkflowExecutorConfigHavingMaxInput>;
  min?: InputMaybe<WorkflowExecutorConfigHavingMinInput>;
  stddevPopulation?: InputMaybe<WorkflowExecutorConfigHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<WorkflowExecutorConfigHavingStddevSampleInput>;
  sum?: InputMaybe<WorkflowExecutorConfigHavingSumInput>;
  variancePopulation?: InputMaybe<WorkflowExecutorConfigHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<WorkflowExecutorConfigHavingVarianceSampleInput>;
};

export type WorkflowExecutorConfigHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowExecutorConfigHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowExecutorConfigHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowExecutorConfigHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowExecutorConfigHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowExecutorConfigHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type WorkflowExecutorConfigHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Methods to use when ordering `WorkflowExecutorConfig`. */
export enum WorkflowExecutorConfigOrderBy {
  ConfigAsc = 'CONFIG_ASC',
  ConfigDesc = 'CONFIG_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** A filter to be used against `Workflow` object types. All fields are combined with a logical ‘and.’ */
export type WorkflowFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<WorkflowFilter>>;
  /** Filter by the object’s `approvalRequests` relation. */
  approvalRequests?: InputMaybe<WorkflowToManyApprovalRequestFilter>;
  /** Some related `approvalRequests` exist. */
  approvalRequestsExist?: InputMaybe<Scalars['Boolean']['input']>;
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
  /** Filter by the object’s `executor` field. */
  executor?: InputMaybe<StringFilter>;
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
  /** Filter by the object’s `version` field. */
  version?: InputMaybe<IntFilter>;
  /** Filter by the object’s `webhookSecret` field. */
  webhookSecret?: InputMaybe<StringFilter>;
  /** Filter by the object’s `workflowRuns` relation. */
  workflowRuns?: InputMaybe<WorkflowToManyWorkflowRunFilter>;
  /** Some related `workflowRuns` exist. */
  workflowRunsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `workflowVersions` relation. */
  workflowVersions?: InputMaybe<WorkflowToManyWorkflowVersionFilter>;
  /** Some related `workflowVersions` exist. */
  workflowVersionsExist?: InputMaybe<Scalars['Boolean']['input']>;
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
  Executor = 'EXECUTOR',
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
  Version = 'VERSION',
  WebhookSecret = 'WEBHOOK_SECRET'
}

export type WorkflowHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastRunAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type WorkflowHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastRunAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
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
  version?: InputMaybe<HavingIntFilter>;
};

export type WorkflowHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastRunAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type WorkflowHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastRunAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type WorkflowHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastRunAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type WorkflowHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastRunAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type WorkflowHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastRunAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type WorkflowHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  lastRunAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

/** An input for mutations affecting `Workflow` */
export type WorkflowInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdBy?: InputMaybe<Scalars['UUID']['input']>;
  cronExpression?: InputMaybe<Scalars['String']['input']>;
  definition: Scalars['JSON']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  executor?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastRunAt?: InputMaybe<Scalars['Datetime']['input']>;
  lastRunStatus?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
  webhookSecret?: InputMaybe<Scalars['String']['input']>;
};

export type WorkflowMaxAggregateFilter = {
  version?: InputMaybe<IntFilter>;
};

export type WorkflowMaxAggregates = {
  __typename?: 'WorkflowMaxAggregates';
  /** Maximum of version across the matching connection */
  version?: Maybe<Scalars['Int']['output']>;
};

export type WorkflowMinAggregateFilter = {
  version?: InputMaybe<IntFilter>;
};

export type WorkflowMinAggregates = {
  __typename?: 'WorkflowMinAggregates';
  /** Minimum of version across the matching connection */
  version?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `Workflow`. */
export enum WorkflowOrderBy {
  ApprovalRequestsCountAsc = 'APPROVAL_REQUESTS_COUNT_ASC',
  ApprovalRequestsCountDesc = 'APPROVAL_REQUESTS_COUNT_DESC',
  ApprovalRequestsDistinctCountApproversAsc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_APPROVERS_ASC',
  ApprovalRequestsDistinctCountApproversDesc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_APPROVERS_DESC',
  ApprovalRequestsDistinctCountCreatedAtAsc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_CREATED_AT_ASC',
  ApprovalRequestsDistinctCountCreatedAtDesc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_CREATED_AT_DESC',
  ApprovalRequestsDistinctCountDecidedAtAsc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_DECIDED_AT_ASC',
  ApprovalRequestsDistinctCountDecidedAtDesc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_DECIDED_AT_DESC',
  ApprovalRequestsDistinctCountDecidedByAsc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_DECIDED_BY_ASC',
  ApprovalRequestsDistinctCountDecidedByDesc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_DECIDED_BY_DESC',
  ApprovalRequestsDistinctCountGateTypeAsc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_GATE_TYPE_ASC',
  ApprovalRequestsDistinctCountGateTypeDesc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_GATE_TYPE_DESC',
  ApprovalRequestsDistinctCountOrganizationIdAsc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  ApprovalRequestsDistinctCountOrganizationIdDesc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  ApprovalRequestsDistinctCountReasonAsc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_REASON_ASC',
  ApprovalRequestsDistinctCountReasonDesc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_REASON_DESC',
  ApprovalRequestsDistinctCountRowIdAsc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_ROW_ID_ASC',
  ApprovalRequestsDistinctCountRowIdDesc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_ROW_ID_DESC',
  ApprovalRequestsDistinctCountRunIdAsc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_RUN_ID_ASC',
  ApprovalRequestsDistinctCountRunIdDesc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_RUN_ID_DESC',
  ApprovalRequestsDistinctCountSignalDataAsc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_SIGNAL_DATA_ASC',
  ApprovalRequestsDistinctCountSignalDataDesc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_SIGNAL_DATA_DESC',
  ApprovalRequestsDistinctCountSignalNameAsc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_SIGNAL_NAME_ASC',
  ApprovalRequestsDistinctCountSignalNameDesc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_SIGNAL_NAME_DESC',
  ApprovalRequestsDistinctCountStatusAsc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_STATUS_ASC',
  ApprovalRequestsDistinctCountStatusDesc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_STATUS_DESC',
  ApprovalRequestsDistinctCountStepIdAsc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_STEP_ID_ASC',
  ApprovalRequestsDistinctCountStepIdDesc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_STEP_ID_DESC',
  ApprovalRequestsDistinctCountTimeoutActionAsc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_TIMEOUT_ACTION_ASC',
  ApprovalRequestsDistinctCountTimeoutActionDesc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_TIMEOUT_ACTION_DESC',
  ApprovalRequestsDistinctCountTimeoutMsAsc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_TIMEOUT_MS_ASC',
  ApprovalRequestsDistinctCountTimeoutMsDesc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_TIMEOUT_MS_DESC',
  ApprovalRequestsDistinctCountTitleAsc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_TITLE_ASC',
  ApprovalRequestsDistinctCountTitleDesc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_TITLE_DESC',
  ApprovalRequestsDistinctCountWorkflowIdAsc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_WORKFLOW_ID_ASC',
  ApprovalRequestsDistinctCountWorkflowIdDesc = 'APPROVAL_REQUESTS_DISTINCT_COUNT_WORKFLOW_ID_DESC',
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
  EventRoutingRulesDistinctCountBatchAsc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_BATCH_ASC',
  EventRoutingRulesDistinctCountBatchDesc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_BATCH_DESC',
  EventRoutingRulesDistinctCountCelConditionAsc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_CEL_CONDITION_ASC',
  EventRoutingRulesDistinctCountCelConditionDesc = 'EVENT_ROUTING_RULES_DISTINCT_COUNT_CEL_CONDITION_DESC',
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
  ExecutorAsc = 'EXECUTOR_ASC',
  ExecutorDesc = 'EXECUTOR_DESC',
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
  VersionAsc = 'VERSION_ASC',
  VersionDesc = 'VERSION_DESC',
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
  WorkflowVersionsAverageVersionAsc = 'WORKFLOW_VERSIONS_AVERAGE_VERSION_ASC',
  WorkflowVersionsAverageVersionDesc = 'WORKFLOW_VERSIONS_AVERAGE_VERSION_DESC',
  WorkflowVersionsCountAsc = 'WORKFLOW_VERSIONS_COUNT_ASC',
  WorkflowVersionsCountDesc = 'WORKFLOW_VERSIONS_COUNT_DESC',
  WorkflowVersionsDistinctCountChangeNoteAsc = 'WORKFLOW_VERSIONS_DISTINCT_COUNT_CHANGE_NOTE_ASC',
  WorkflowVersionsDistinctCountChangeNoteDesc = 'WORKFLOW_VERSIONS_DISTINCT_COUNT_CHANGE_NOTE_DESC',
  WorkflowVersionsDistinctCountCreatedAtAsc = 'WORKFLOW_VERSIONS_DISTINCT_COUNT_CREATED_AT_ASC',
  WorkflowVersionsDistinctCountCreatedAtDesc = 'WORKFLOW_VERSIONS_DISTINCT_COUNT_CREATED_AT_DESC',
  WorkflowVersionsDistinctCountCreatedByAsc = 'WORKFLOW_VERSIONS_DISTINCT_COUNT_CREATED_BY_ASC',
  WorkflowVersionsDistinctCountCreatedByDesc = 'WORKFLOW_VERSIONS_DISTINCT_COUNT_CREATED_BY_DESC',
  WorkflowVersionsDistinctCountDefinitionAsc = 'WORKFLOW_VERSIONS_DISTINCT_COUNT_DEFINITION_ASC',
  WorkflowVersionsDistinctCountDefinitionDesc = 'WORKFLOW_VERSIONS_DISTINCT_COUNT_DEFINITION_DESC',
  WorkflowVersionsDistinctCountRowIdAsc = 'WORKFLOW_VERSIONS_DISTINCT_COUNT_ROW_ID_ASC',
  WorkflowVersionsDistinctCountRowIdDesc = 'WORKFLOW_VERSIONS_DISTINCT_COUNT_ROW_ID_DESC',
  WorkflowVersionsDistinctCountVersionAsc = 'WORKFLOW_VERSIONS_DISTINCT_COUNT_VERSION_ASC',
  WorkflowVersionsDistinctCountVersionDesc = 'WORKFLOW_VERSIONS_DISTINCT_COUNT_VERSION_DESC',
  WorkflowVersionsDistinctCountWorkflowIdAsc = 'WORKFLOW_VERSIONS_DISTINCT_COUNT_WORKFLOW_ID_ASC',
  WorkflowVersionsDistinctCountWorkflowIdDesc = 'WORKFLOW_VERSIONS_DISTINCT_COUNT_WORKFLOW_ID_DESC',
  WorkflowVersionsMaxVersionAsc = 'WORKFLOW_VERSIONS_MAX_VERSION_ASC',
  WorkflowVersionsMaxVersionDesc = 'WORKFLOW_VERSIONS_MAX_VERSION_DESC',
  WorkflowVersionsMinVersionAsc = 'WORKFLOW_VERSIONS_MIN_VERSION_ASC',
  WorkflowVersionsMinVersionDesc = 'WORKFLOW_VERSIONS_MIN_VERSION_DESC',
  WorkflowVersionsStddevPopulationVersionAsc = 'WORKFLOW_VERSIONS_STDDEV_POPULATION_VERSION_ASC',
  WorkflowVersionsStddevPopulationVersionDesc = 'WORKFLOW_VERSIONS_STDDEV_POPULATION_VERSION_DESC',
  WorkflowVersionsStddevSampleVersionAsc = 'WORKFLOW_VERSIONS_STDDEV_SAMPLE_VERSION_ASC',
  WorkflowVersionsStddevSampleVersionDesc = 'WORKFLOW_VERSIONS_STDDEV_SAMPLE_VERSION_DESC',
  WorkflowVersionsSumVersionAsc = 'WORKFLOW_VERSIONS_SUM_VERSION_ASC',
  WorkflowVersionsSumVersionDesc = 'WORKFLOW_VERSIONS_SUM_VERSION_DESC',
  WorkflowVersionsVariancePopulationVersionAsc = 'WORKFLOW_VERSIONS_VARIANCE_POPULATION_VERSION_ASC',
  WorkflowVersionsVariancePopulationVersionDesc = 'WORKFLOW_VERSIONS_VARIANCE_POPULATION_VERSION_DESC',
  WorkflowVersionsVarianceSampleVersionAsc = 'WORKFLOW_VERSIONS_VARIANCE_SAMPLE_VERSION_ASC',
  WorkflowVersionsVarianceSampleVersionDesc = 'WORKFLOW_VERSIONS_VARIANCE_SAMPLE_VERSION_DESC'
}

/** Represents an update to a `Workflow`. Fields that are set will be updated. */
export type WorkflowPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdBy?: InputMaybe<Scalars['UUID']['input']>;
  cronExpression?: InputMaybe<Scalars['String']['input']>;
  definition?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  executor?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastRunAt?: InputMaybe<Scalars['Datetime']['input']>;
  lastRunStatus?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
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
  /** Reads and enables pagination through a set of `SagaRun`. */
  sagaRuns: SagaRunConnection;
  startedAt?: Maybe<Scalars['Datetime']['output']>;
  status: Scalars['String']['output'];
  /** Reads a single `Workflow` that is related to this `WorkflowRun`. */
  workflow?: Maybe<Workflow>;
  workflowId?: Maybe<Scalars['UUID']['output']>;
  /** Reads and enables pagination through a set of `WorkflowStepLog`. */
  workflowStepLogs: WorkflowStepLogConnection;
};


export type WorkflowRunSagaRunsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SagaRunCondition>;
  filter?: InputMaybe<SagaRunFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SagaRunOrderBy>>;
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
  /** Filter by the object’s `sagaRuns` relation. */
  sagaRuns?: InputMaybe<WorkflowRunToManySagaRunFilter>;
  /** Some related `sagaRuns` exist. */
  sagaRunsExist?: InputMaybe<Scalars['Boolean']['input']>;
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
  SagaRunsCountAsc = 'SAGA_RUNS_COUNT_ASC',
  SagaRunsCountDesc = 'SAGA_RUNS_COUNT_DESC',
  SagaRunsDistinctCountCompletedAtAsc = 'SAGA_RUNS_DISTINCT_COUNT_COMPLETED_AT_ASC',
  SagaRunsDistinctCountCompletedAtDesc = 'SAGA_RUNS_DISTINCT_COUNT_COMPLETED_AT_DESC',
  SagaRunsDistinctCountCreatedAtAsc = 'SAGA_RUNS_DISTINCT_COUNT_CREATED_AT_ASC',
  SagaRunsDistinctCountCreatedAtDesc = 'SAGA_RUNS_DISTINCT_COUNT_CREATED_AT_DESC',
  SagaRunsDistinctCountErrorAsc = 'SAGA_RUNS_DISTINCT_COUNT_ERROR_ASC',
  SagaRunsDistinctCountErrorDesc = 'SAGA_RUNS_DISTINCT_COUNT_ERROR_DESC',
  SagaRunsDistinctCountOrganizationIdAsc = 'SAGA_RUNS_DISTINCT_COUNT_ORGANIZATION_ID_ASC',
  SagaRunsDistinctCountOrganizationIdDesc = 'SAGA_RUNS_DISTINCT_COUNT_ORGANIZATION_ID_DESC',
  SagaRunsDistinctCountRowIdAsc = 'SAGA_RUNS_DISTINCT_COUNT_ROW_ID_ASC',
  SagaRunsDistinctCountRowIdDesc = 'SAGA_RUNS_DISTINCT_COUNT_ROW_ID_DESC',
  SagaRunsDistinctCountStartedAtAsc = 'SAGA_RUNS_DISTINCT_COUNT_STARTED_AT_ASC',
  SagaRunsDistinctCountStartedAtDesc = 'SAGA_RUNS_DISTINCT_COUNT_STARTED_AT_DESC',
  SagaRunsDistinctCountStatusAsc = 'SAGA_RUNS_DISTINCT_COUNT_STATUS_ASC',
  SagaRunsDistinctCountStatusDesc = 'SAGA_RUNS_DISTINCT_COUNT_STATUS_DESC',
  SagaRunsDistinctCountUpdatedAtAsc = 'SAGA_RUNS_DISTINCT_COUNT_UPDATED_AT_ASC',
  SagaRunsDistinctCountUpdatedAtDesc = 'SAGA_RUNS_DISTINCT_COUNT_UPDATED_AT_DESC',
  SagaRunsDistinctCountWorkflowRunIdAsc = 'SAGA_RUNS_DISTINCT_COUNT_WORKFLOW_RUN_ID_ASC',
  SagaRunsDistinctCountWorkflowRunIdDesc = 'SAGA_RUNS_DISTINCT_COUNT_WORKFLOW_RUN_ID_DESC',
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

/** A filter to be used against many `SagaRun` object types. All fields are combined with a logical ‘and.’ */
export type WorkflowRunToManySagaRunFilter = {
  /** Aggregates across related `SagaRun` match the filter criteria. */
  aggregates?: InputMaybe<SagaRunAggregatesFilter>;
  /** Every related `SagaRun` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<SagaRunFilter>;
  /** No related `SagaRun` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<SagaRunFilter>;
  /** Some related `SagaRun` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<SagaRunFilter>;
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

export type WorkflowStddevPopulationAggregateFilter = {
  version?: InputMaybe<BigFloatFilter>;
};

export type WorkflowStddevPopulationAggregates = {
  __typename?: 'WorkflowStddevPopulationAggregates';
  /** Population standard deviation of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
};

export type WorkflowStddevSampleAggregateFilter = {
  version?: InputMaybe<BigFloatFilter>;
};

export type WorkflowStddevSampleAggregates = {
  __typename?: 'WorkflowStddevSampleAggregates';
  /** Sample standard deviation of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
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

export type WorkflowSumAggregateFilter = {
  version?: InputMaybe<BigIntFilter>;
};

export type WorkflowSumAggregates = {
  __typename?: 'WorkflowSumAggregates';
  /** Sum of version across the matching connection */
  version: Scalars['BigInt']['output'];
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

/** A filter to be used against many `ApprovalRequest` object types. All fields are combined with a logical ‘and.’ */
export type WorkflowToManyApprovalRequestFilter = {
  /** Aggregates across related `ApprovalRequest` match the filter criteria. */
  aggregates?: InputMaybe<ApprovalRequestAggregatesFilter>;
  /** Every related `ApprovalRequest` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ApprovalRequestFilter>;
  /** No related `ApprovalRequest` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ApprovalRequestFilter>;
  /** Some related `ApprovalRequest` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ApprovalRequestFilter>;
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

/** A filter to be used against many `WorkflowVersion` object types. All fields are combined with a logical ‘and.’ */
export type WorkflowToManyWorkflowVersionFilter = {
  /** Aggregates across related `WorkflowVersion` match the filter criteria. */
  aggregates?: InputMaybe<WorkflowVersionAggregatesFilter>;
  /** Every related `WorkflowVersion` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<WorkflowVersionFilter>;
  /** No related `WorkflowVersion` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<WorkflowVersionFilter>;
  /** Some related `WorkflowVersion` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<WorkflowVersionFilter>;
};

export type WorkflowVariancePopulationAggregateFilter = {
  version?: InputMaybe<BigFloatFilter>;
};

export type WorkflowVariancePopulationAggregates = {
  __typename?: 'WorkflowVariancePopulationAggregates';
  /** Population variance of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
};

export type WorkflowVarianceSampleAggregateFilter = {
  version?: InputMaybe<BigFloatFilter>;
};

export type WorkflowVarianceSampleAggregates = {
  __typename?: 'WorkflowVarianceSampleAggregates';
  /** Sample variance of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
};

export type WorkflowVersion = Node & {
  __typename?: 'WorkflowVersion';
  changeNote?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  createdBy?: Maybe<Scalars['UUID']['output']>;
  definition: Scalars['JSON']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  rowId: Scalars['UUID']['output'];
  /** Reads a single `User` that is related to this `WorkflowVersion`. */
  user?: Maybe<User>;
  version: Scalars['Int']['output'];
  /** Reads a single `Workflow` that is related to this `WorkflowVersion`. */
  workflow?: Maybe<Workflow>;
  workflowId: Scalars['UUID']['output'];
};

export type WorkflowVersionAggregates = {
  __typename?: 'WorkflowVersionAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<WorkflowVersionAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<WorkflowVersionDistinctCountAggregates>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<WorkflowVersionMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<WorkflowVersionMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<WorkflowVersionStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<WorkflowVersionStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<WorkflowVersionSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<WorkflowVersionVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<WorkflowVersionVarianceSampleAggregates>;
};

/** A filter to be used against aggregates of `WorkflowVersion` object types. */
export type WorkflowVersionAggregatesFilter = {
  /** Mean average aggregate over matching `WorkflowVersion` objects. */
  average?: InputMaybe<WorkflowVersionAverageAggregateFilter>;
  /** Distinct count aggregate over matching `WorkflowVersion` objects. */
  distinctCount?: InputMaybe<WorkflowVersionDistinctCountAggregateFilter>;
  /** A filter that must pass for the relevant `WorkflowVersion` object to be included within the aggregate. */
  filter?: InputMaybe<WorkflowVersionFilter>;
  /** Maximum aggregate over matching `WorkflowVersion` objects. */
  max?: InputMaybe<WorkflowVersionMaxAggregateFilter>;
  /** Minimum aggregate over matching `WorkflowVersion` objects. */
  min?: InputMaybe<WorkflowVersionMinAggregateFilter>;
  /** Population standard deviation aggregate over matching `WorkflowVersion` objects. */
  stddevPopulation?: InputMaybe<WorkflowVersionStddevPopulationAggregateFilter>;
  /** Sample standard deviation aggregate over matching `WorkflowVersion` objects. */
  stddevSample?: InputMaybe<WorkflowVersionStddevSampleAggregateFilter>;
  /** Sum aggregate over matching `WorkflowVersion` objects. */
  sum?: InputMaybe<WorkflowVersionSumAggregateFilter>;
  /** Population variance aggregate over matching `WorkflowVersion` objects. */
  variancePopulation?: InputMaybe<WorkflowVersionVariancePopulationAggregateFilter>;
  /** Sample variance aggregate over matching `WorkflowVersion` objects. */
  varianceSample?: InputMaybe<WorkflowVersionVarianceSampleAggregateFilter>;
};

export type WorkflowVersionAverageAggregateFilter = {
  version?: InputMaybe<BigFloatFilter>;
};

export type WorkflowVersionAverageAggregates = {
  __typename?: 'WorkflowVersionAverageAggregates';
  /** Mean average of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
};

/**
 * A condition to be used against `WorkflowVersion` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type WorkflowVersionCondition = {
  /** Checks for equality with the object’s `changeNote` field. */
  changeNote?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `version` field. */
  version?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `workflowId` field. */
  workflowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `WorkflowVersion` values. */
export type WorkflowVersionConnection = {
  __typename?: 'WorkflowVersionConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<WorkflowVersionAggregates>;
  /** A list of edges which contains the `WorkflowVersion` and cursor to aid in pagination. */
  edges: Array<WorkflowVersionEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<WorkflowVersionAggregates>>;
  /** A list of `WorkflowVersion` objects. */
  nodes: Array<WorkflowVersion>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `WorkflowVersion` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};


/** A connection to a list of `WorkflowVersion` values. */
export type WorkflowVersionConnectionGroupedAggregatesArgs = {
  groupBy: Array<WorkflowVersionGroupBy>;
  having?: InputMaybe<WorkflowVersionHavingInput>;
};

export type WorkflowVersionDistinctCountAggregateFilter = {
  changeNote?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<BigIntFilter>;
  createdBy?: InputMaybe<BigIntFilter>;
  definition?: InputMaybe<BigIntFilter>;
  rowId?: InputMaybe<BigIntFilter>;
  version?: InputMaybe<BigIntFilter>;
  workflowId?: InputMaybe<BigIntFilter>;
};

export type WorkflowVersionDistinctCountAggregates = {
  __typename?: 'WorkflowVersionDistinctCountAggregates';
  /** Distinct count of changeNote across the matching connection */
  changeNote?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of createdBy across the matching connection */
  createdBy?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of definition across the matching connection */
  definition?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of rowId across the matching connection */
  rowId?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of version across the matching connection */
  version?: Maybe<Scalars['BigInt']['output']>;
  /** Distinct count of workflowId across the matching connection */
  workflowId?: Maybe<Scalars['BigInt']['output']>;
};

/** A `WorkflowVersion` edge in the connection. */
export type WorkflowVersionEdge = {
  __typename?: 'WorkflowVersionEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `WorkflowVersion` at the end of the edge. */
  node: WorkflowVersion;
};

/** A filter to be used against `WorkflowVersion` object types. All fields are combined with a logical ‘and.’ */
export type WorkflowVersionFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<WorkflowVersionFilter>>;
  /** Filter by the object’s `changeNote` field. */
  changeNote?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `createdBy` field. */
  createdBy?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<WorkflowVersionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<WorkflowVersionFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** A related `user` exists. */
  userExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `version` field. */
  version?: InputMaybe<IntFilter>;
  /** Filter by the object’s `workflow` relation. */
  workflow?: InputMaybe<WorkflowFilter>;
  /** Filter by the object’s `workflowId` field. */
  workflowId?: InputMaybe<UuidFilter>;
};

/** Grouping methods for `WorkflowVersion` for usage during aggregation. */
export enum WorkflowVersionGroupBy {
  ChangeNote = 'CHANGE_NOTE',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  CreatedBy = 'CREATED_BY',
  Definition = 'DEFINITION',
  Version = 'VERSION',
  WorkflowId = 'WORKFLOW_ID'
}

export type WorkflowVersionHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type WorkflowVersionHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

/** Conditions for `WorkflowVersion` aggregates. */
export type WorkflowVersionHavingInput = {
  AND?: InputMaybe<Array<WorkflowVersionHavingInput>>;
  OR?: InputMaybe<Array<WorkflowVersionHavingInput>>;
  average?: InputMaybe<WorkflowVersionHavingAverageInput>;
  distinctCount?: InputMaybe<WorkflowVersionHavingDistinctCountInput>;
  max?: InputMaybe<WorkflowVersionHavingMaxInput>;
  min?: InputMaybe<WorkflowVersionHavingMinInput>;
  stddevPopulation?: InputMaybe<WorkflowVersionHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<WorkflowVersionHavingStddevSampleInput>;
  sum?: InputMaybe<WorkflowVersionHavingSumInput>;
  variancePopulation?: InputMaybe<WorkflowVersionHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<WorkflowVersionHavingVarianceSampleInput>;
};

export type WorkflowVersionHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type WorkflowVersionHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type WorkflowVersionHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type WorkflowVersionHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type WorkflowVersionHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type WorkflowVersionHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type WorkflowVersionHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  version?: InputMaybe<HavingIntFilter>;
};

export type WorkflowVersionMaxAggregateFilter = {
  version?: InputMaybe<IntFilter>;
};

export type WorkflowVersionMaxAggregates = {
  __typename?: 'WorkflowVersionMaxAggregates';
  /** Maximum of version across the matching connection */
  version?: Maybe<Scalars['Int']['output']>;
};

export type WorkflowVersionMinAggregateFilter = {
  version?: InputMaybe<IntFilter>;
};

export type WorkflowVersionMinAggregates = {
  __typename?: 'WorkflowVersionMinAggregates';
  /** Minimum of version across the matching connection */
  version?: Maybe<Scalars['Int']['output']>;
};

/** Methods to use when ordering `WorkflowVersion`. */
export enum WorkflowVersionOrderBy {
  ChangeNoteAsc = 'CHANGE_NOTE_ASC',
  ChangeNoteDesc = 'CHANGE_NOTE_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  CreatedByAsc = 'CREATED_BY_ASC',
  CreatedByDesc = 'CREATED_BY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  VersionAsc = 'VERSION_ASC',
  VersionDesc = 'VERSION_DESC',
  WorkflowIdAsc = 'WORKFLOW_ID_ASC',
  WorkflowIdDesc = 'WORKFLOW_ID_DESC'
}

export type WorkflowVersionStddevPopulationAggregateFilter = {
  version?: InputMaybe<BigFloatFilter>;
};

export type WorkflowVersionStddevPopulationAggregates = {
  __typename?: 'WorkflowVersionStddevPopulationAggregates';
  /** Population standard deviation of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
};

export type WorkflowVersionStddevSampleAggregateFilter = {
  version?: InputMaybe<BigFloatFilter>;
};

export type WorkflowVersionStddevSampleAggregates = {
  __typename?: 'WorkflowVersionStddevSampleAggregates';
  /** Sample standard deviation of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
};

export type WorkflowVersionSumAggregateFilter = {
  version?: InputMaybe<BigIntFilter>;
};

export type WorkflowVersionSumAggregates = {
  __typename?: 'WorkflowVersionSumAggregates';
  /** Sum of version across the matching connection */
  version: Scalars['BigInt']['output'];
};

export type WorkflowVersionVariancePopulationAggregateFilter = {
  version?: InputMaybe<BigFloatFilter>;
};

export type WorkflowVersionVariancePopulationAggregates = {
  __typename?: 'WorkflowVersionVariancePopulationAggregates';
  /** Population variance of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
};

export type WorkflowVersionVarianceSampleAggregateFilter = {
  version?: InputMaybe<BigFloatFilter>;
};

export type WorkflowVersionVarianceSampleAggregates = {
  __typename?: 'WorkflowVersionVarianceSampleAggregates';
  /** Sample variance of version across the matching connection */
  version?: Maybe<Scalars['BigFloat']['output']>;
};

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
  organizationId?: string | null | undefined;
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
  organizationId?: string | null | undefined;
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
  organizationId?: string | null | undefined;
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