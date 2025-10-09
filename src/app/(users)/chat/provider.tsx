"use client";

import { useConversationPaginationStore } from "@/hooks/use-conversation-pagination-store";
import { useConversationListQuery } from "@/hooks/useConversation-list";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import ChatPagination from "./components/pagination";
import ClientRelativeTime from "@/components/blog/ClientRelativeTime";
import { FooterNav } from "@/components/footer-nav";

function formatTokenUsage(usage: number, limit: number) {
  const usageInK = (usage / 1000).toFixed(1);
  const limitInK = (limit / 1000).toFixed(0);
  return `${usageInK}k / ${limitInK}k tokens`;
}

export default function ChatPageProvider({ token }: { token: string }) {
  const { page, limit } = useConversationPaginationStore();
  const { data: conversationQuery, isLoading } = useConversationListQuery({
    token,
    page,
    limit,
  });

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="grid animate-pulse grid-cols-1 gap-4">
          {[...Array.from({ length: 5 })].map((_, index) => (
            <Card
              key={index}
              className="bg-card border-border flex h-24 flex-col justify-center p-4 shadow-lg"
            >
              <div className="h-4 w-3/4 rounded bg-gray-300" />
              <div className="mt-2 h-3 w-1/2 rounded bg-gray-300" />
              <div className="mt-1 h-3 w-1/4 rounded bg-gray-300" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const conversations = conversationQuery?.result ?? [];
  const pagination = conversationQuery?.pagination;

  if (conversations.length === 0) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <p className="text-muted-foreground text-center">
          Anda belum memulai percakapan.
        </p>
        <Link href="/chat/new" className="text-primary mt-2">
          Mulai percakapan baru
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 pb-20">
      <main>
        <div className="grid grid-cols-1 gap-4">
          {conversations.map((convo) => (
            <Link href={`/chat/${convo.id}`} key={convo.id}>
              <Card className="bg-card border-border group flex h-full w-full transform flex-col gap-2 p-4 shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02]">
                <h3 className="text-base font-semibold">{convo.title}</h3>
                <div className="text-muted-foreground text-xs">
                  Dibuat pada:{" "}
                  {new Date(convo.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="text-muted-foreground text-xs">
                  Terakhir digunakan:{" "}
                  <ClientRelativeTime date={convo.updatedAt} />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="text-primary-foreground bg-primary w-fit rounded-full px-2 py-0.5 text-xs">
                    {formatTokenUsage(convo.tokenUsage ?? 0, 3000)}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      {pagination && <ChatPagination totalPages={pagination.totalPages} />}

      {/* Sticky Footer */}
      <div className="bg-background fixed right-0 bottom-0 left-0 z-10">
        <FooterNav />
      </div>
    </div>
  );
}
