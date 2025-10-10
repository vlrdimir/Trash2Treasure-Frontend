import React from "react";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import PostLayout from "@/components/blog/PostLayout";
import { MDXLayoutRenderer } from "pliny/mdx-components";
import { components } from "@/components/mdx/mdx-components";
import auth from "@/middleware";

export const generateStaticParams = async () => {
  return allPosts.map((post) => ({
    slug: post.slug.split("/"),
  }));
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const session = await auth();
  const token = session?.tokenId;
  const slug = (await params).slug;
  const slugString = slug.join("/");
  const post = allPosts.find((post) => post.slug === slugString);

  if (!post) {
    notFound();
  }

  return (
    <PostLayout post={post}>
      <MDXLayoutRenderer code={post.body.code} components={components} />
    </PostLayout>
  );
}
