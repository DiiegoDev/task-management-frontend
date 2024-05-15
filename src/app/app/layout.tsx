import { Dashboard } from "@/components/dashboard/dashboard";
import { PrivatePage } from "@/components/auth/private-page";
import { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/toaster";

export default async function layout({ children }: PropsWithChildren) {
  return (
    <PrivatePage>
      <div className="grid grid-cols-[1fr_4fr] flex-1">
        <Dashboard />
        {children}
      </div>
      <Toaster />
    </PrivatePage>
  );
}
