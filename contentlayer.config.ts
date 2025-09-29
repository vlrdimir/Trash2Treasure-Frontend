import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { remarkImgToJsx } from "pliny/mdx-plugins/remark-img-to-jsx.js";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
    category: {
      type: "json",
      description: "The categories of the post",
      required: true,
    },
    summary: {
      type: "string",
      description: "The summary of the post",
      required: true,
    },
    readTime: {
      type: "string",
      description: "The estimated read time",
      required: true,
    },
    author: {
      type: "string",
      description: "The author of the post",
      required: true,
    },
    image: {
      type: "string",
      description: "Image URL for blog post thumbnail",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => {
        return `/blog/${doc._raw.flattenedPath}`;
      },
    },

    slug: {
      type: "string",
      resolve: (doc) => {
        return doc._raw.flattenedPath;
      },
    },
    categorySlugs: {
      type: "list",
      of: { type: "string" },
      resolve: (doc) => {
        const categoryList = doc.category._array ?? doc.category;
        if (Array.isArray(categoryList)) {
          return categoryList.map((cat: string) => slugify(cat));
        }
        console.warn(
          `Category is not an array in ${doc._raw.flattenedPath}:`,
          doc.category,
        );
        return [];
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm, remarkImgToJsx],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});
