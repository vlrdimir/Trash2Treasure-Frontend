"use client";

import React, { useState, useEffect, useRef } from "react";
import { type UIMessage } from "ai";
import { useChat } from "@/hooks/useChat";
import ChatMessages from "./chat-messages";
import ChatInput from "./chat-input";
import { FooterNav } from "@/components/footer-nav";

interface ChatPageProps {
  conversationId: string;
  initialMessages: UIMessage[];
  isNew: boolean;
  tokenMax: boolean;
  imageUrl?: string;
  label?: string;
}

export default function ChatPage({
  conversationId,
  initialMessages,
  isNew,
  tokenMax,
  imageUrl,
  label,
}: ChatPageProps) {
  const chat = useChat(conversationId, initialMessages);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isFetchingImage, setIsFetchingImage] = useState(false);
  const hasSentInitialMessage = useRef(false);

  useEffect(() => {
    const sendInitialMessage = async () => {
      if (imageUrl && label && !hasSentInitialMessage.current && isNew) {
        hasSentInitialMessage.current = true;
        setIsFetchingImage(true);
        try {
          const response = await fetch(imageUrl);
          if (!response.ok) throw new Error("Gagal mengambil gambar");
          const blob = await response.blob();
          const reader = new FileReader();
          reader.onloadend = async () => {
            const dataUrl = reader.result as string;
            const prompt = `Berdasarkan gambar ini, berikan saya satu ide kerajinan tangan yang paling menarik. Fokus utamanya adalah pada objek "${label}". Jelaskan langkah-langkahnya secara singkat dan bahan apa saja yang dibutuhkan.`;
            await chat.sendMessage(prompt, dataUrl);
          };
          reader.readAsDataURL(blob);
        } catch (error) {
          console.error("Gagal mengirim pesan otomatis:", error);
          hasSentInitialMessage.current = false;
        } finally {
          setIsFetchingImage(false);
        }
      }
    };

    void sendInitialMessage();
  }, [imageUrl, label, chat, isNew]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImagePreviewUrl(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setImagePreviewUrl(null);
    // We can't easily reset the file input's value for security reasons,
    // but clearing the preview is the main goal.
  };

  // Send message using AI SDK
  const handleSendMessage = async () => {
    if (!chat.input.trim() && !imagePreviewUrl) return;

    await chat.sendMessage(chat.input, imagePreviewUrl);
    handleClearImage();
  };

  return (
    <div className="flex h-[calc(100dvh-5rem)] flex-col bg-white text-black">
      {isFetchingImage && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-black/20 border-t-black"></div>
          <p className="mt-4 text-black">
            Mempersiapkan ide dari gambar Anda...
          </p>
        </div>
      )}

      {/* Main Chat Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <ChatMessages messages={chat.messages} isLoading={chat.isLoading} />
      </main>

      {/* Error Display */}
      {chat.error && (
        <div className="mx-4 mb-2 rounded-2xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
          {chat.error.message || "An error occurred"}
        </div>
      )}

      {/* Sticky Footer */}
      <div className="sticky bottom-0 z-10 bg-white">
        {tokenMax && (
          <div className="mx-4 mb-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700">
            Anda telah mencapai batas maksimum percakapan.
          </div>
        )}
        <div className="p-4">
          <ChatInput
            value={chat.input}
            onChange={chat.setInput}
            onSend={handleSendMessage}
            isLoading={chat.isLoading}
            placeholder={
              tokenMax ? "Batas percakapan tercapai" : "Ask me anything..."
            }
            imagePreviewUrl={imagePreviewUrl}
            onImageChange={handleImageChange}
            onClearImage={handleClearImage}
            disabled={tokenMax || chat.isLoading}
          />
        </div>
        <FooterNav />
      </div>
    </div>
  );
}
