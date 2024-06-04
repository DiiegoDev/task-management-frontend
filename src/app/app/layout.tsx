import { NavbarDesk } from "@/components/navbar/navbar-desc";
import { PrivatePage } from "@/components/auth/private-page";
import { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/toaster";
import { HeaderDesk } from "@/components/header/header-desk";
import { HeaderMob } from "@/components/header/header-mob";

export default async function layout({ children }: PropsWithChildren) {
  return (
    <PrivatePage>
      <HeaderDesk />
      <HeaderMob />
      <div className="flex flex-1">
        <NavbarDesk />
        {children}
      </div>
      <Toaster />
    </PrivatePage>
  );
}
