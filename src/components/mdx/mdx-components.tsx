import TOCInline from "pliny/ui/TOCInline";
import Pre from "pliny/ui/Pre";
import BlogNewsletterForm from "pliny/ui/BlogNewsletterForm";
import type { MDXComponents } from "mdx/types";
import Image from "./Image";
import CustomLink from "./Link";
import { TipBox } from "./TipBox";
import React from "react";
import { cn } from "@/lib/utils";

interface MdxImageProps {
  mdxType?: string;
  originalType?: string;
}

const MDXHeading = ({
  level,
  children,
  className,
  ...props
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>) => {
  const Tag = `h${level}` as React.ElementType;
  const id =
    typeof children === "string"
      ? children
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      : undefined;

  const headingStyles = {
    1: "text-4xl md:text-5xl font-bold mb-8 mt-16",
    2: "text-3xl md:text-4xl font-bold mb-6 mt-12 pb-2 border-b border-border",
    3: "text-2xl md:text-3xl font-semibold mb-4 mt-10",
    4: "text-xl md:text-2xl font-semibold mb-3 mt-8",
    5: "text-lg md:text-xl font-medium mb-2 mt-6",
    6: "text-base md:text-lg font-medium mb-2 mt-4",
  };

  return (
    <Tag
      id={id}
      className={cn(
        headingStyles[level],
        "text-foreground group relative scroll-mt-24",
        className,
      )}
      {...props}
    >
      {children}
      {id && (
        <a
          href={`#${id}`}
          className="text-muted-foreground hover:text-foreground absolute top-0 -left-6 opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Link to this section"
        >
          #
        </a>
      )}
    </Tag>
  );
};

const MDXOrderedList = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.OlHTMLAttributes<HTMLOListElement>) => {
  return (
    <ol
      className={cn(
        "mb-4 ml-6 list-outside list-decimal space-y-2",
        "text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </ol>
  );
};

const MDXUnorderedList = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLUListElement>) => {
  return (
    <ul
      className={cn(
        "mb-4 ml-4 list-inside list-disc space-y-2",
        "text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </ul>
  );
};

const MDXListItem = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.LiHTMLAttributes<HTMLLIElement>) => {
  return (
    <li
      className={cn("text-muted-foreground leading-relaxed", className)}
      {...props}
    >
      {children}
    </li>
  );
};

const SmartParagraph = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  const isImageParagraph =
    React.Children.count(children) === 1 &&
    React.Children.toArray(children).some(
      (child) =>
        React.isValidElement<MdxImageProps>(child) &&
        (child.type === Image ||
          child.props.mdxType === "img" ||
          child.props.originalType === "img"),
    );

  if (isImageParagraph) {
    return <>{children}</>;
  }

  return (
    <p
      className={cn(
        "text-muted-foreground mb-4 text-base leading-relaxed md:text-lg",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm,
  TipBox,
  img: Image,
  p: SmartParagraph,
  h1: (props) => <MDXHeading level={1} {...props} />,
  h2: (props) => <MDXHeading level={2} {...props} />,
  h3: (props) => <MDXHeading level={3} {...props} />,
  h4: (props) => <MDXHeading level={4} {...props} />,
  h5: (props) => <MDXHeading level={5} {...props} />,
  h6: (props) => <MDXHeading level={6} {...props} />,
  ul: MDXUnorderedList,
  li: MDXListItem,
  ol: MDXOrderedList,
};
