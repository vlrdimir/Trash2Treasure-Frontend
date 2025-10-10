import { useChat as useAIChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getQueryClient } from "@/app/get-query-client";
import { useConversationPaginationStore } from "./store/use-conversation-pagination-store";

export function useChat(
  conversationId?: string,
  initialMessages?: UIMessage[],
) {
  const queryClient = getQueryClient();
  const [input, setInput] = useState("");
  const router = useRouter();
  const { page, limit } = useConversationPaginationStore();

  const { messages, sendMessage, status, error, stop } = useAIChat({
    id: conversationId,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",

      // Send only the last message to reduce payload
      prepareSendMessagesRequest({ messages, id }) {
        return {
          body: {
            message: messages[messages.length - 1],
            conversationId: id,
          },
        };
      },
    }),
    onError: (error: Error) => {
      console.error("AI Chat Error:", error);
    },
    onFinish: () => {
      void queryClient.invalidateQueries({
        queryKey: ["conversationList", page, limit],
      });
      void queryClient.invalidateQueries({
        queryKey: ["conversationId", conversationId],
      });
    },
  });

  // Custom send message wrapper
  const handleSendMessage = async (
    content?: string,
    imageUrl?: string | null,
  ) => {
    const messageContent = content ?? input.trim();
    if (!messageContent && !imageUrl) return;

    // Clear input
    setInput("");

    // The `sendMessage` function from `useChat` can directly accept an array of parts
    // for multimodal messages. We construct this array based on provided text and image.
    const messageParts = [];
    if (messageContent) {
      messageParts.push({ type: "text", text: messageContent });
    }
    if (imageUrl) {
      if (imageUrl.startsWith("data:image")) {
        // It's a base64 data URL from file upload, we can keep imageDetail low
        messageParts.push({
          type: "image",
          image: imageUrl,
          providerOptions: {
            openai: { imageDetail: "low" },
          },
        });
      } else {
        // It's an HTTP/HTTPS URL, use it directly.
        // Let the AI model fetch it, we can use high detail.
        messageParts.push({
          type: "image",
          image: imageUrl,
        });
      }
    }

    // Send to AI using AI SDK
    await sendMessage({ parts: messageParts } as UIMessage);
  };

  const createNewConversation = async () => {
    // Navigate to new chat page which will create conversation server-side
    router.push("/chat");
  };

  const switchConversation = (conversationId: string) => {
    router.push(`/chat/${conversationId}`);
  };

  return {
    // AI SDK message management
    messages,
    sendMessage: handleSendMessage,
    isLoading: status === "submitted" || status === "streaming",
    error,
    stop,
    status,

    // Input management
    input,
    setInput,

    // Navigation functions
    currentConversationId: conversationId,
    switchConversation,
    createNewConversation,
  };
}
