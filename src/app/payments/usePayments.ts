import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchPayments } from "@/api/payments";
import { QUERIES } from "@/helpers/queries";
import { paymentApiResponse } from "@/api/makeData";

export const DEFAULT_PAGE_LIMIT = 15;

async function getPayments({ start, limit }: { start: number; limit: number }) {
  const response = await fetchPayments({
    start,
    limit,
  });
  return response;
}

export const usePayments = () => {
  return useInfiniteQuery<paymentApiResponse>({
    queryKey: [QUERIES.fetchPayments],

    queryFn: async ({ pageParam = 0 }) => {
      const start = (pageParam as number) * DEFAULT_PAGE_LIMIT;
      const fetchedData = await getPayments({
        start: start,
        limit: DEFAULT_PAGE_LIMIT,
      });
      return fetchedData;
    },
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};
