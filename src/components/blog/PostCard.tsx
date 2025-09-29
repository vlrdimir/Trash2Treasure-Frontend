import type { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ClientDate from "./ClientDate";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Link href={post.url} className="group block">
      <div className="flex flex-col space-y-4">
        <div className="relative h-48 w-full">
          <Image
            src={post.image}
            alt={`Thumbnail for ${post.title}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-foreground group-hover:text-muted-foreground text-xl font-bold transition-colors">
            {post.title}
          </h2>
          <p className="text-muted-foreground">{post.summary}</p>
          <div className="text-muted-foreground/80 flex items-center space-x-2 text-sm">
            <ClientDate date={post.date} />
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
