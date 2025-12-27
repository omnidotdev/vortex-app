import { queryOptions } from "@tanstack/react-query";

import { useFeaturedIntegrationDefinitionsQuery } from "@/generated/graphql";

export const featuredIntegrationDefinitionsOptions = () =>
  queryOptions({
    queryKey: useFeaturedIntegrationDefinitionsQuery.getKey(),
    queryFn: useFeaturedIntegrationDefinitionsQuery.fetcher(),
  });
