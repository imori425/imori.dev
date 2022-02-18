import { format, parseISO } from "date-fns";
import React from "react";

export function DateComponent({ dateString }: { dateString: string }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "yyyy/MM/dd")}</time>;
}
