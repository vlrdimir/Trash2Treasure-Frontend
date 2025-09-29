"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useSavedListQuery } from "@/hooks/use-saved-queries";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import SavedPagination from "./pagination";
import ClientDate from "@/components/blog/ClientDate";

export default function SavedPageProvider({ token }: { token: string }) {
  const { data: savedQuery, isLoading } = useSavedListQuery(token);

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="grid animate-pulse grid-cols-2 gap-4">
          {[...Array.from({ length: 4 })].map((_, index) => (
            <Card
              key={index}
              className="bg-card border-border gap-3 overflow-hidden py-0 shadow-lg"
            >
              <div className="relative aspect-square bg-gray-300" />
              <div className="px-3 pb-4">
                <div className="mt-2 h-4 w-3/4 rounded bg-gray-300" />
                <div className="mt-1 h-3 w-1/2 rounded bg-gray-300" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const savedItems = savedQuery?.result ?? [];
  const pagination = savedQuery?.pagination;

  const currentItems = savedItems
    .map((item) => {
      const post = allPosts.find((p) => p.slug === item.slugContent);
      return post
        ? {
            ...item,
            postDetails: {
              title: post.title,
              description: post.summary,
              image: post.image,
              category: post.category[0] as string,
              url: post.url,
              createdAt: post.date,
            },
          }
        : null;
    })
    .filter(Boolean);

  if (currentItems.length === 0) {
    console.log(currentItems, "currentitems");
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <p className="text-muted-foreground text-center">
          Anda belum menyimpan apapun.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <main>
        <div className="grid grid-cols-1 gap-4">
          {currentItems.map((item) =>
            item ? (
              <Link
                href={item.postDetails.url}
                key={item.id}
                className="flex flex-col"
              >
                <Card className="bg-card border-border group flex h-full w-full flex-col gap-3 overflow-hidden py-0 shadow-lg">
                  <div className="relative aspect-square">
                    <Image
                      src={item.postDetails.image}
                      alt={item.postDetails.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-4 pb-4">
                    <h3 className="text-base font-semibold">
                      {item.postDetails.title}
                    </h3>
                    <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                      {item.postDetails.description}
                    </p>

                    <div className="mt-auto flex justify-between pt-3">
                      <span className="bg-secondary text-secondary-foreground rounded-full px-2.5 py-1 text-xs">
                        {item.postDetails.category}
                      </span>

                      <div className="text-muted-foreground mt-2 text-xs">
                        <ClientDate date={item.postDetails.createdAt} />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ) : null,
          )}
        </div>
      </main>
      {pagination && <SavedPagination totalPages={pagination.totalPages} />}
    </div>
  );
}
