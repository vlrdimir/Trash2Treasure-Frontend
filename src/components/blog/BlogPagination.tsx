"use client";

import { usePaginationStore } from "@/hooks/store/use-pagination-store";
import { cn } from "@/lib/utils";
import React from "react";

const BlogPagination = () => {
  const { page, totalItems, itemsPerPage, nextPage, prevPage, setPage } =
    usePaginationStore();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 1; // Number of pages to show around the current page

    // Always show the first page
    pageNumbers.push(1);

    // Show ellipsis if needed after the first page
    if (page > visiblePages + 2) {
      pageNumbers.push("...");
    }

    // Show pages around the current page
    for (
      let i = Math.max(2, page - visiblePages);
      i <= Math.min(totalPages - 1, page + visiblePages);
      i++
    ) {
      pageNumbers.push(i);
    }

    // Show ellipsis if needed before the last page
    if (page < totalPages - visiblePages - 1) {
      pageNumbers.push("...");
    }

    // Always show the last page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((number, index) =>
      typeof number === "number" ? (
        <button
          key={`${number}-${index}`}
          onClick={() => handlePageClick(number)}
          className={cn(
            "rounded-md px-3 py-1 text-xs font-medium transition-colors",
            page === number
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-accent",
          )}
        >
          {number}
        </button>
      ) : (
        <span key={`ellipsis-${index}`} className="px-3 py-1 text-xs">
          {number}
        </span>
      ),
    );
  };

  return (
    <div className="mt-8 flex items-center justify-center space-x-2">
      <button
        onClick={prevPage}
        disabled={page === 1}
        className="bg-secondary text-secondary-foreground hover:bg-accent rounded-md px-3 py-1 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>
      {renderPageNumbers()}
      <button
        onClick={nextPage}
        disabled={page === totalPages}
        className="bg-secondary text-secondary-foreground hover:bg-accent rounded-md px-3 py-1 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default BlogPagination;
