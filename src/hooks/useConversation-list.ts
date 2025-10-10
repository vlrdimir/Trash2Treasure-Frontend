import { useQuery } from "@tanstack/react-query";
import { listConversation } from "../lib/api/conversation";

export const useConversationListQuery = ({
  token,
  page,
  limit,
}: {
  token: string;
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["conversations", "list", { page, limit, token }],
    queryFn: () => listConversation({ token, page, limit }),
    enabled: !!token,
  });
};
