import { fetchData } from "./makeData";

export async function fetchPayments({
  start,
  limit,
}: {
  start: number;
  limit: number;
}) {
  const fetchedData = await fetchData(start, limit);
  return fetchedData;
}
