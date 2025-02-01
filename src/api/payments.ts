import { SortingState } from "@tanstack/react-table";
import { fetchPaymentsData } from "./makeData";

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
  const fetchedData = await fetchPaymentsData({
    start,
    limit,
    sorting,
    searchTerm,
  });
  return fetchedData;
}
