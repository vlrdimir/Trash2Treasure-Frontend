"use client";

import type { Post } from "@/types/post";
import Image from "next/image";
import ClientDate from "./ClientDate";
import { useRouter } from "next/navigation";

const PostLayout = ({
  post,
  children,
}: {
  post: Post;
  children: React.ReactNode;
}) => {
  const router = useRouter();

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
      </div>

      <div className="prose prose-invert max-w-none">{children}</div>
    </article>
  );
};

export default PostLayout;
