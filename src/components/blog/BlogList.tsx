"use client";

import { usePaginationStore } from "@/hooks/use-pagination-store";
import type { Post } from "@/types/post";
import React, { useEffect } from "react";
import PostCard from "./PostCard";

interface BlogListProps {
  posts: Post[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  const { page, itemsPerPage, setTotalItems } = usePaginationStore();

  useEffect(() => {
    setTotalItems(posts.length);
  }, [posts.length, setTotalItems]);

  const paginatedPosts = posts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return (
    <div className="space-y-8">
      {paginatedPosts.length > 0 ? (
        paginatedPosts.map((post) => <PostCard key={post.slug} post={post} />)
      ) : (
        <p className="text-center text-gray-400">No posts found.</p>
      )}
    </div>
  );
};

export default BlogList;
