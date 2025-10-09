"use client";

import Image from "next/image";
import React from "react";
import { type UIMessage } from "ai";

interface ChatMessagesProps {
  messages: UIMessage[];
  isLoading: boolean;
}

// Define a more specific type for message parts to help TypeScript understand the structure
type ExtendedMessagePart = {
  type: string;
  text?: string;
  image?: string;
};

export default function ChatMessages({
  messages,
  isLoading,
}: ChatMessagesProps) {
  return (
    <div className="relative flex flex-col rounded-3xl border border-gray-200 bg-gray-50 shadow-sm">
      <div className="p-6">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center py-10">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                <div className="h-8 w-8 rounded-full bg-gray-300"></div>
              </div>
              <p className="text-sm text-gray-500">
                Mulai percakapan dengan Trash2Treasure AI
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, messageIndex) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs rounded-2xl px-4 py-2 lg:max-w-md ${
                    message.role === "user"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    {(message.parts as ExtendedMessagePart[]).map(
                      (part, index) => {
                        switch (part.type) {
                          case "text":
                            return (
                              <p key={index} className="whitespace-pre-wrap">
                                {part.text}
                              </p>
                            );
                          case "image":
                            return (
                              <div
                                key={index}
                                className="relative mt-1 aspect-square w-full max-w-sm overflow-hidden rounded-lg border border-gray-200"
                              >
                                <Image
                                  src={part.image!}
                                  alt="User content"
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                              </div>
                            );
                          case "step-start":
                            return null;
                          default:
                            // Gracefully handle other part types that might appear
                            return null;
                        }
                      },
                    )}
                  </div>
                  <p className="mt-1 text-xs opacity-60">
                    {/* {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} */}
                  </p>
                </div>
              </div>
            ))}

            {/* Only show loading if we're loading AND the last message was from user */}
            {isLoading &&
              messages.length > 0 &&
              messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="max-w-xs rounded-2xl bg-gray-200 px-4 py-2 text-gray-800 lg:max-w-md">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        AI sedang berpikir...
                      </span>
                    </div>
                  </div>
                </div>
              )}

            {/* Show loading for empty conversation */}
            {isLoading && messages.length === 0 && (
              <div className="flex justify-start">
                <div className="max-w-xs rounded-2xl bg-gray-200 px-4 py-2 text-gray-800 lg:max-w-md">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      AI sedang berpikir...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
