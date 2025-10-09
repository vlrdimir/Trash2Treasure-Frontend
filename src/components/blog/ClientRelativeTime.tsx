"use client";

import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export default function ClientRelativeTime({ date }: { date: string | Date }) {
  return (
    <>
      {formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: id,
      })}
    </>
  );
}
