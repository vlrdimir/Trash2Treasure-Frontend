/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import React from "react";

const Image = ({
  src,
  alt,
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <figure className="my-8 flex flex-col items-center">
    <div className="relative overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800/50 p-2 shadow-lg">
      <img
        src={src}
        alt={alt ?? ""}
        className={cn(
          "block h-auto max-w-full rounded-md",
          "transition-transform duration-300 hover:scale-105",
          className,
        )}
        {...props}
      />
    </div>
    {alt && (
      <figcaption className="mx-auto mt-3 max-w-4xl text-center text-sm text-zinc-400 italic">
        {alt}
      </figcaption>
    )}
  </figure>
);

export default Image;
