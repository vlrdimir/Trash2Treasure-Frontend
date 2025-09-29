"use client";

import {
  categories,
  type CategoryCount,
} from "@/app/(content)/blog/categories";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

const CategoryFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const handleCategoryClick = (slug: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <button
        onClick={() => handleCategoryClick(null)}
        className={cn(
          "rounded-full px-3 py-1 text-sm font-medium transition-colors",
          !currentCategory
            ? "bg-foreground text-background"
            : "bg-secondary text-secondary-foreground hover:bg-accent",
        )}
      >
        All
      </button>
      {categories.map((category: CategoryCount) => (
        <button
          key={category.slug}
          onClick={() => handleCategoryClick(category.slug)}
          className={cn(
            "rounded-full px-3 py-1 text-sm font-medium transition-colors",
            currentCategory === category.slug
              ? "bg-foreground text-background"
              : "bg-secondary text-secondary-foreground hover:bg-accent",
          )}
        >
          {category.name} ({category.count})
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
