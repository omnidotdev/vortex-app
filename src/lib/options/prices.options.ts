import { queryOptions } from "@tanstack/react-query";

import { getPrices } from "@/server/functions/prices";

const pricesOptions = () =>
  queryOptions({
    queryKey: ["stripe", "prices"],
    queryFn: () => getPrices(),
    staleTime: 5 * 60 * 1000,
  });

export default pricesOptions;
