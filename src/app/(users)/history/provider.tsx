"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, History, Recycle } from "lucide-react";
import Link from "next/link";
import { useHistoryListQuery } from "@/hooks/use-history-queries";
import HistoryPagination from "./pagination";
import { useHistoryPaginationStore } from "@/hooks/store/use-history-pagination-store";
import type { HistoryResultItem } from "@/types/api";
import { FooterNav } from "@/components/footer-nav";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (date.toDateString() === now.toDateString()) {
    return `Hari ini, ${date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return `Kemarin, ${date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function HistoryPage({ token }: { token: string }) {
  const { data: historyQuery, isLoading } = useHistoryListQuery(token);
  const { setTotalPages } = useHistoryPaginationStore();

  const historyItems = historyQuery?.result ?? [];
  const pagination = historyQuery?.pagination;

  useEffect(() => {
    if (pagination) {
      setTotalPages(pagination.totalPages);
    }
  }, [pagination, setTotalPages]);

  if (isLoading) {
    return (
      <div className="p-4">
        <main className="animate-pulse space-y-4">
          {[...Array(5)].map((_, index) => (
            <Card key={index} className="bg-card border-border py-0 shadow-lg">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="bg-muted h-12 w-12 rounded-lg"></div>
                  <div>
                    <div className="h-5 w-32 rounded bg-gray-300"></div>
                    <div className="mt-1 h-4 w-24 rounded bg-gray-300"></div>
                  </div>
                </div>
                <div className="h-5 w-5 rounded bg-gray-300"></div>
              </CardContent>
            </Card>
          ))}
        </main>
      </div>
    );
  }

  if (historyItems.length === 0) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <History className="h-12 w-12 text-gray-400" />
        <h2 className="mt-4 text-xl font-semibold">Riwayat Kosong</h2>
        <p className="text-muted-foreground mt-2">
          Anda belum memiliki riwayat pemindaian.
        </p>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 z-10 bg-white">
          <FooterNav />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <main className="space-y-4">
        {historyItems.map((item: HistoryResultItem) => (
          <Link href={`/history/${item.id}`} key={item.id}>
            <Card className="bg-card border-border m-3 py-0 shadow-lg transition-shadow hover:shadow-md">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="bg-muted rounded-lg p-3">
                    <Recycle className="text-muted-foreground h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold capitalize">
                      {item.label.replace("-", " ")}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>
                <ArrowRight className="text-muted-foreground h-5 w-5" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </main>
      {pagination && <HistoryPagination />}

      {/* Sticky Footer */}
      <div className="sticky bottom-0 z-10 bg-white">
        <FooterNav />
      </div>
    </div>
  );
}
