import { verifyJwt } from "@/utils/verify-jwt";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ReactNode } from "react";

interface TokenProps {
  name: string;
  value: string;
}

export function PrivatePage({ children }: { children: ReactNode }) {
  const cookieStore = cookies();

  const token: TokenProps = cookieStore.get(
    "authorization"
  ) as unknown as TokenProps;

  if (!token) {
    redirect("/login");
  }

  const isTokenValid = verifyJwt(token.value);

  if (!isTokenValid) {
    redirect("/login");
  }

  return children;
}
