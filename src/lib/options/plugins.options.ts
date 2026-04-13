import { queryOptions } from "@tanstack/react-query";

import { usePluginsQuery } from "@/generated/graphql";

import type { PluginsQueryVariables } from "@/generated/graphql";

const pluginsOptions = (variables: PluginsQueryVariables) =>
  queryOptions({
    queryKey: usePluginsQuery.getKey(variables),
    queryFn: usePluginsQuery.fetcher(variables),
  });

export default pluginsOptions;
