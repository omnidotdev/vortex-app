import { queryOptions } from "@tanstack/react-query";

import { useEventSchemasQuery } from "@/lib/graphql/eventSchemaStubs";

import type { EventSchemasQueryVariables } from "@/lib/graphql/eventSchemaStubs";

const eventSchemasOptions = (variables: EventSchemasQueryVariables) =>
  queryOptions({
    queryKey: useEventSchemasQuery.getKey(variables),
    queryFn: useEventSchemasQuery.fetcher(variables),
  });

export default eventSchemasOptions;
