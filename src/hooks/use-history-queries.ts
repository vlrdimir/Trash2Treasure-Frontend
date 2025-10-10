import { useQuery } from "@tanstack/react-query";
import type { ApiResponse, HistoryResultItem } from "@/types/api";
import { useHistoryPaginationStore } from "./store/use-history-pagination-store";
import { fetcher } from "@/lib/utils";

export const fetcherHistoryList = <T>(
  page: number,
  limit: number,
  token: string,
) => {
  return fetcher<T>(`/history?page=${page}&limit=${limit}`, token);
};

// Hook to fetch paginated history list
export const useHistoryListQuery = (token: string) => {
  const { page, limit } = useHistoryPaginationStore();

  return useQuery<ApiResponse<HistoryResultItem[]>, Error>({
    queryKey: ["history", "list", { page, limit, token }],
    queryFn: () => fetcherHistoryList(page, Number(limit), token),
    enabled: !!token, // Only run the query if the token is available
  });
};

// Fetcher for history detail
export const fetcherHistoryDetail = (id: number, token: string) => {
  return fetcher<ApiResponse<HistoryResultItem>>(`/history/${id}`, token);
};

// Hook to fetch a single history detail
export const useHistoryDetailQuery = (id: number, token: string) => {
  return useQuery<ApiResponse<HistoryResultItem>, Error>({
    queryKey: ["history", "detail", id, token],
    queryFn: () => fetcherHistoryDetail(id, token),
    enabled: !!id && !!token, // Only run if id and token are available
  });
};
