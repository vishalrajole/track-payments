import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchPayments } from "@/api/payments";
import { QUERIES } from "@/helpers/queries";
import { paymentApiResponse } from "@/api/makeData";
import { ColumnFilter, SortingState } from "@tanstack/react-table";

export const DEFAULT_PAGE_LIMIT = 50;

async function getPayments({
  start,
  limit,
  sorting,
  columnFilters,
  searchTerm,
}: {
  start: number;
  limit: number;
  sorting: SortingState;
  columnFilters: ColumnFilter[];
  searchTerm?: string;
}) {
  const response = await fetchPayments({
    start,
    limit,
    sorting,
    columnFilters,
    searchTerm,
  });

  return response;
}

export const usePayments = ({
  sorting,
  columnFilters,
  searchTerm,
}: {
  sorting: SortingState;
  columnFilters: ColumnFilter[];
  searchTerm?: string;
}) => {
  return useInfiniteQuery<paymentApiResponse>({
    queryKey: [QUERIES.fetchPayments, [sorting, searchTerm, columnFilters]],

    queryFn: async ({ pageParam = 0 }) => {
      const start = (pageParam as number) * DEFAULT_PAGE_LIMIT;
      const fetchedData = await getPayments({
        start: start,
        limit: DEFAULT_PAGE_LIMIT,
        sorting,
        columnFilters,
        searchTerm,
      });
      return fetchedData;
    },
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};
