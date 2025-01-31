import { ColumnFilter, SortingState } from "@tanstack/react-table";
import { fetchData } from "./makeData";

export async function fetchPayments({
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
  const fetchedData = await fetchData({
    start,
    limit,
    sorting,
    columnFilters,
    searchTerm,
  });
  return fetchedData;
}
