import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { QUERIES } from "@/helpers/queries";
import { NotificationResponse } from "@/api/makeData";
import { fetchNotifications } from "@/api/notifications";

export const DEFAULT_PAGE_LIMIT = 50;

async function getNotifications({
  start,
  limit,
}: {
  start: number;
  limit: number;
}) {
  const response = await fetchNotifications({
    start,
    limit,
  });

  return response;
}

export const useNotifications = () => {
  return useInfiniteQuery<NotificationResponse>({
    queryKey: [QUERIES.notifications.fetchNotifications],

    queryFn: async ({ pageParam = 0 }) => {
      const start = (pageParam as number) * DEFAULT_PAGE_LIMIT;
      const fetchedData = await getNotifications({
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
