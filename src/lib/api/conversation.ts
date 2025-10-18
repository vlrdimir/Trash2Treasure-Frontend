import { fetcher, poster } from "@/lib/utils";
import type {
  createConversationPayload,
  createConversationResponse,
  metadata,
  addChatConversationResponse,
  addChatConversationPayload,
  RespConversationById,
  ListConversationResponse,
} from "@/types/tConversations";
import type { UIMessage } from "ai";

export async function createConversationNew({
  data,
  token,
}: {
  data: createConversationPayload;
  token: string;
}) {
  let endpointWithQuery = "/v2/create-conversation";

  if (data.imageUrl && data.label) {
    endpointWithQuery += `?imageUrl=${data.imageUrl}&label=${data.label}`;
  }

  const response = await fetcher<createConversationResponse>(
    endpointWithQuery,
    token,
  );
  return response;
}

export async function saveChatConversation({
  token,
  conversationId,
  messages,
  title,
  newtokenUsage,
}: {
  token: string;
  conversationId: string;
  messages: UIMessage[];
  title?: string;
  newtokenUsage?: number;
}) {
  // Then insert all messages
  const messagesToInsert = messages.map((msg) => {
    const metadata = (
      msg as unknown as {
        metadata: metadata;
      }
    ).metadata;

    const tokensUsed = metadata?.totalTokens ?? 0;
    // const model = metadata.model || null;

    return {
      //   id: msg.id,
      conversation_id: conversationId,
      role: msg.role,
      content: {
        parts: msg.parts,
      },
      tokens_used: tokensUsed + (newtokenUsage ?? 0),
      // model: model,
    };
  });

  // console.log(messagesToInsert, "messagesToInsert insert");

  const response = await poster<
    addChatConversationResponse,
    { args: addChatConversationPayload[]; title: string }
  >(`/v2/conversation`, token, {
    arg: {
      args: messagesToInsert,
      title: title ?? "",
    },
  });

  return response;
}

export async function getConversationById({
  token,
  conversationId,
}: {
  token: string;
  conversationId: string;
}) {
  const response = await fetcher<RespConversationById>(
    `/v2/conversation/${conversationId}`,
    token,
  );
  return response;
}

export async function listConversation({
  token,
  page,
  limit,
}: {
  token: string;
  page: number;
  limit: number;
}) {
  const response = await fetcher<ListConversationResponse>(
    `/v2/list-conversation?page=${page}&limit=${limit}`,
    token,
  );
  return response;
}
