import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import React, { Suspense } from "react";
import BlogList from "@/components/blog/BlogList";
import CategoryFilter from "@/components/blog/CategoryFilter";
import BlogPagination from "@/components/blog/BlogPagination";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const category = (await searchParams)?.category;
  const sortedPosts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  const filteredPosts = category
    ? sortedPosts.filter((post) => post.categorySlugs.includes(category))
    : sortedPosts;

  return (
    <div className="container mx-auto px-4">
      <h1 className="my-4 text-center text-4xl font-extrabold text-black">
        Blog
      </h1>
      <Suspense fallback={<div>Loading filter...</div>}>
        <CategoryFilter />
      </Suspense>
      <BlogList posts={filteredPosts} />
      <BlogPagination />
    </div>
  );
}
