"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SendHorizonal } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export default function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        text: input,
        isUser: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      // Simulate bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          text: `Echo: ${input}`,
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Card className="mx-auto flex h-[89vh] w-full max-w-2xl flex-col py-0 pt-6">
      <CardHeader>
        <CardTitle>Chat Bot</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.isUser ? "justify-end" : ""}`}
          >
            {!msg.isUser && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-xs rounded-lg px-4 py-2 md:max-w-md lg:max-w-lg ${
                msg.isUser ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <span className="text-muted-foreground/80 mt-1 block text-right text-xs">
                {msg.timestamp}
              </span>
            </div>
            {msg.isUser && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </CardContent>
      <div className="border-t p-4">
        <div className="relative">
          <Input
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="pr-12"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-1/2 right-2 -translate-y-1/2"
            onClick={handleSend}
          >
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
