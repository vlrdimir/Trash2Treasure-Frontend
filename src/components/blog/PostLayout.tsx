"use client";

import type { Post } from "@/types/post";
import Image from "next/image";
import React, { useMemo } from "react";
import ClientDate from "./ClientDate";
import { useRouter } from "next/navigation";
import BookmarkIcon from "../icons/BookmarkIcon";
import {
  useRemoveSaveContentMutation,
  useSaveContentMutation,
  useSavedListQuery,
} from "@/hooks/use-saved-queries";
import { toast } from "sonner";
import type { SavedResultItem } from "@/types/api";

const PostLayout = ({
  post,
  children,
  token,
}: {
  post: Post;
  children: React.ReactNode;
  token: string;
}) => {
  const router = useRouter();

  const { data: savedQuery } = useSavedListQuery(token);
  const saveMutation = useSaveContentMutation();
  const removeSaveMutation = useRemoveSaveContentMutation();

  const savedItem = useMemo(() => {
    return savedQuery?.result?.find(
      (item: SavedResultItem) => item.slugContent === post.slug,
    );
  }, [savedQuery, post.slug]);

  const isSaved = !!savedItem;

  const handleSave = () => {
    if (!token) {
      toast.error("Anda harus masuk untuk menyimpan konten.");
      return;
    }

    if (isSaved && savedItem) {
      removeSaveMutation.mutate(
        { savedId: savedItem.id, token },
        {
          onSuccess: () => toast.success("Ide kreatif dihapus dari koleksimu."),
          onError: () => toast.error("Gagal menghapus ide kreatif ini."),
        },
      );
    } else {
      saveMutation.mutate(
        { slugContent: post.slug, token },
        {
          onSuccess: () =>
            toast.success("Ide kreatif berhasil ditambahkan ke koleksimu!"),
          onError: () => toast.error("Gagal menyimpan ide kreatif ini."),
        },
      );
    }
  };

  const isPending = saveMutation.isPending || removeSaveMutation.isPending;

  return (
    <article className="px-4">
      <header className="py-8">
        <div className="space-y-4 text-center">
          <h1 className="text-foreground text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            {post.title}
          </h1>
          <dl className="space-y-10">
            <div>
              <dt className="sr-only">Published on</dt>
              <dd className="text-muted-foreground text-base leading-6 font-medium">
                <ClientDate date={post.date} />
              </dd>
            </div>
          </dl>
        </div>
      </header>
      <div className="relative mb-4 h-64 w-full">
        <Image
          src={post.image}
          alt={`Thumbnail for ${post.title}`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <div className="my-6 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="bg-secondary text-secondary-foreground hover:bg-accent flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          <span>&larr;</span>
          <span>Back</span>
        </button>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="bg-secondary text-secondary-foreground hover:bg-accent flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={isSaved ? "Unsave post" : "Save post"}
        >
          <BookmarkIcon isSaved={isSaved} className="h-5 w-5" />
          <span>{isSaved ? "Saved" : "Save"}</span>
        </button>
      </div>

      <div className="prose prose-invert max-w-none">{children}</div>
    </article>
  );
};

export default PostLayout;
