"use client";

import { useHistoryPaginationStore } from "@/hooks/use-history-pagination-store";

export default function HistoryPagination() {
  const { page, totalPages, prevPage, nextPage } = useHistoryPaginationStore();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex items-center justify-center space-x-2">
      <button
        onClick={prevPage}
        disabled={page === 1}
        className="bg-secondary text-secondary-foreground hover:bg-accent rounded-md px-3 py-1 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>
      <span className="bg-primary text-primary-foreground rounded-md px-3 py-1 text-xs font-medium">
        {page} / {totalPages}
      </span>
      <button
        onClick={nextPage}
        disabled={page === totalPages}
        className="bg-secondary text-secondary-foreground hover:bg-accent rounded-md px-3 py-1 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
