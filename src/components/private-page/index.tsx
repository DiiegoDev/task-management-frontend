import { redirect } from "next/navigation";
import { ReactNode } from "react";

export function PrivatePage({ children }: { children: ReactNode }) {
  return children;
}
