"use client";

import { useEffect, useState } from "react";

interface ClientDateProps {
  date: string;
}

const ClientDate: React.FC<ClientDateProps> = ({ date }) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(
      new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
  }, [date]);

  return <time dateTime={date}>{formattedDate}</time>;
};

export default ClientDate;
