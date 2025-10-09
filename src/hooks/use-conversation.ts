import { fetcher, poster } from "@/lib/utils";
import type { UIMessage } from "ai";

export interface createConversationPayload {
  imageUrl?: string;
  label?: string;
}

export interface createConversationResponse {
  status: boolean;
  result: string;
}

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

interface addChatConversationPayload {
  conversation_id: string;
  role: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  tokens_used: number;
}

interface addChatConversationResponse {
  status: boolean;
  result: string;
}

interface metadata {
  createdAt: number;
  model: string;
  totalTokens: number;
}

export async function saveChatConversation({
  token,
  conversationId,
  messages,
}: {
  token: string;
  conversationId: string;
  messages: UIMessage[];
}) {
  // Then insert all messages
  const messagesToInsert = messages.map((msg) => {
    // Extract token data from metadata if it exists (for assistant messages)
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
      tokens_used: tokensUsed,
      // model: model,
    };
  });

  console.log(messagesToInsert, "messagesToInsert insert");

  const response = await poster<
    addChatConversationResponse,
    { args: addChatConversationPayload[] }
  >(`/v2/conversation`, token, {
    arg: {
      args: messagesToInsert,
    },
  });

  return response;
}

interface RespConversationById {
  status: boolean;
  result: {
    id: string;
    email: string;
    title: string;
    initialLabel: string;
    initialImageUrl: string;
    tokenUsage: number;
    createdAt: string;
    updatedAt: string;
    messages: {
      id: string;
      role: string;
      parts: {
        text?: string;
        type: string;
        state?: string;
      }[];
    }[];
  };
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

interface ConversationItem {
  id: string;
  email: string;
  title: string;
  initialLabel: string;
  initialImageUrl: string;
  tokenUsage: number | null;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface ListConversationResponse {
  status: boolean;
  result: ConversationItem[];
  pagination: Pagination;
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
