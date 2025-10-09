"use client";

import Image from "next/image";
import React, { useRef } from "react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  placeholder?: string;
  imagePreviewUrl: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearImage: () => void;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  isLoading,
  placeholder = "Type your message...",
  imagePreviewUrl,
  onImageChange,
  onClearImage,
}: ChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const isSendEnabled =
    (value.trim().length > 0 || !!imagePreviewUrl) && !isLoading;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
      {imagePreviewUrl && !isLoading && (
        <div className="relative mb-2 w-fit">
          <Image
            src={imagePreviewUrl}
            alt="Image preview"
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
          <button
            onClick={onClearImage}
            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-white transition-colors hover:bg-gray-800"
            aria-label="Remove image"
          >
            &times;
          </button>
        </div>
      )}

      <div className="flex items-end gap-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={onImageChange}
          className="hidden"
          accept="image/*"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-500 transition-colors hover:bg-gray-100"
          aria-label="Attach image"
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
          </svg>
        </button>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={isLoading}
          className="max-h-32 min-h-[44px] flex-1 resize-none border-none bg-transparent py-2 text-black placeholder-gray-400 outline-none"
          rows={1}
        />
        <button
          className={`flex flex-shrink-0 items-center gap-2 rounded-xl px-6 py-2.5 font-medium transition-all duration-200 ${
            isSendEnabled
              ? "bg-black text-white shadow-sm hover:bg-gray-800"
              : "cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400"
          }`}
          onClick={onSend}
          disabled={!isSendEnabled}
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
              Sending...
            </>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
}
