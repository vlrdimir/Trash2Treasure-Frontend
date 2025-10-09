"use client";

import React from "react";
import ChatPage from "../components/chat-page";
import { useConversationId } from "@/hooks/useConversation-Id";
import { type UIMessage } from "ai";

function Provider({
  id,
  token,
  label,
  image,
}: {
  id: string;
  token: string;
  label?: string;
  image?: string;
}) {
  const { data: conversation, isLoading } = useConversationId({
    token: token,
    conversationId: id,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isNew = conversation?.result.messages.length === 0;

  return (
    <ChatPage
      conversationId={id}
      initialMessages={conversation?.result.messages as UIMessage[]}
      label={label}
      imageUrl={image}
      isNew={isNew}
    />
  );
}

export default Provider;
