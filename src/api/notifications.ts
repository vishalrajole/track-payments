import { fetchNotificationsData } from "./makeData";

export async function fetchNotifications({
  start,
  limit,
}: {
  start: number;
  limit: number;
}) {
  const fetchedNotifications = await fetchNotificationsData({
    start,
    limit,
  });
  return fetchedNotifications;
}
