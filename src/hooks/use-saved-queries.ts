import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ApiResponse, SavedResultItem } from "@/types/api";
import { useSavedPaginationStore } from "./use-saved-pagination-store";
import { deleter, fetcher, poster } from "@/lib/utils";

export const fetcherListSaved = <T>(
  page: number,
  limit: number,
  token: string,
) => {
  return fetcher<T>(`/list-saved?page=${page}&limit=${limit}`, token);
};

// Hook to fetch paginated saved list
export const useSavedListQuery = (token: string) => {
  const { page, limit } = useSavedPaginationStore();

  return useQuery<ApiResponse<SavedResultItem[]>, Error>({
    queryKey: ["saved", "list", { page, limit, token }],
    queryFn: () => fetcherListSaved(page, Number(limit), token),
    enabled: !!token,
  });
};

// Hook to save a content item
export const useSaveContentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<SavedResultItem>,
    Error,
    { slugContent: string; token: string }
  >({
    mutationFn: ({ slugContent, token }) =>
      poster("/saved", token, { arg: { slugContent } }),
    onSuccess: () => {
      // Invalidate and refetch the saved list query to show the new item
      void queryClient.invalidateQueries({ queryKey: ["saved", "list"] });
    },
  });
};

// Hook to remove a saved content item
export const useRemoveSaveContentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<{
      status: boolean;
      message: string;
    }>,
    Error,
    { savedId: number; token: string }
  >({
    mutationFn: ({ savedId, token }) =>
      deleter(`/remove-saved/${savedId}`, token),
    onSuccess: () => {
      // Invalidate and refetch the saved list query to reflect the removal
      void queryClient.invalidateQueries({ queryKey: ["saved", "list"] });
    },
  });
};
