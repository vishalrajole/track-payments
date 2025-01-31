import { SortingState } from "@tanstack/react-table";
import { fetchData } from "./makeData";

export async function fetchPayments({
  start,
  limit,
  sorting,
  searchTerm,
}: {
  start: number;
  limit: number;
  sorting: SortingState;
  searchTerm?: string;
}) {
  const fetchedData = await fetchData({
    start,
    limit,
    sorting,
    searchTerm,
  });
  return fetchedData;
}
