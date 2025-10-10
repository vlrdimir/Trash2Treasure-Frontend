export interface createConversationPayload {
  imageUrl?: string;
  label?: string;
}

export interface createConversationResponse {
  status: boolean;
  result: string;
}

export interface addChatConversationPayload {
  conversation_id: string;
  role: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  tokens_used: number;
}

export interface addChatConversationResponse {
  status: boolean;
  result: string;
}

export interface metadata {
  createdAt: number;
  model: string;
  totalTokens: number;
}

export interface RespConversationById {
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

export interface ConversationItem {
  id: string;
  email: string;
  title: string;
  initialLabel: string;
  initialImageUrl: string;
  tokenUsage: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ListConversationResponse {
  status: boolean;
  result: ConversationItem[];
  pagination: Pagination;
}
