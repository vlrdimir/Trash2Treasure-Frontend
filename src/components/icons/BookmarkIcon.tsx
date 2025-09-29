import React from "react";
import { cn } from "@/lib/utils";

interface BookmarkIconProps extends React.SVGProps<SVGSVGElement> {
  isSaved: boolean;
}

const BookmarkIcon = ({ isSaved, className, ...props }: BookmarkIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={isSaved ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
};

export default BookmarkIcon;
