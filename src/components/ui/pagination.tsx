"use client";

import { usePaginationStore } from "@/hooks/use-pagination-store";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination() {
  const { page, itemsPerPage, totalItems, nextPage, prevPage } =
    usePaginationStore();

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex items-center justify-center space-x-4">
      <Button
        variant="outline"
        size="icon"
        onClick={prevPage}
        disabled={isFirstPage}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm font-medium">
        Halaman {page} dari {totalPages}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={nextPage}
        disabled={isLastPage}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
