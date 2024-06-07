import { TokenProps } from "@/interfaces/token.interface";
import { verifyJwt } from "@/utils/verify-jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export function Authenticated({ children }: { children: ReactNode }) {
  const cookieStore = cookies();

  const token: TokenProps = cookieStore.get(
    "authorization"
  ) as unknown as TokenProps;

  const isTokenValid = verifyJwt(token?.value);

  if (isTokenValid) {
    redirect("/app/tasks");
  }

  return children;
}
