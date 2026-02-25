import { queryOptions } from "@tanstack/react-query";

import { useEventSchemasQuery } from "@/generated/graphql";

import type { EventSchemasQueryVariables } from "@/generated/graphql";

const eventSchemasOptions = (variables: EventSchemasQueryVariables) =>
  queryOptions({
    queryKey: useEventSchemasQuery.getKey(variables),
    queryFn: useEventSchemasQuery.fetcher(variables),
  });

export default eventSchemasOptions;
