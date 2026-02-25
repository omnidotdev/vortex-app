import { queryOptions } from "@tanstack/react-query";

import { useEventSchemaQuery } from "@/generated/graphql";

import type { EventSchemaQueryVariables } from "@/generated/graphql";

const eventSchemaOptions = (variables: EventSchemaQueryVariables) =>
  queryOptions({
    queryKey: useEventSchemaQuery.getKey(variables),
    queryFn: useEventSchemaQuery.fetcher(variables),
  });

export default eventSchemaOptions;
