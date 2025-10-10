import { useQuery } from "@tanstack/react-query";
import { getConversationById } from "../lib/api/conversation";

export const useConversationId = ({
  token,
  conversationId,
}: {
  token: string;
  conversationId: string;
}) => {
  return useQuery({
    queryKey: ["conversationId", conversationId],
    queryFn: () => getConversationById({ token, conversationId }),
    enabled: !!token && !!conversationId,
  });
};
