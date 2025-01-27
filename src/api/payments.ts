import { SortingState } from "@tanstack/react-table";
import { fetchData } from "./makeData";

export async function fetchPayments({
  start,
  limit,
  sorting,
}: {
  start: number;
  limit: number;
  sorting: SortingState;
}) {
  const fetchedData = await fetchData(start, limit, sorting);
  return fetchedData;
}
