"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { NavbarMob } from "../navbar/navbar-mob";
import { useState } from "react";

export function HeaderMob() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="py-4 border-b lg:hidden flex justify-center">
      <div className="w-4/5 flex items-center justify-between">
        <div className="h-10 w-10 rounded-sm bg-primary-foreground"></div>

        <NavbarMob isOpen={isOpen} setIsOpen={setIsOpen}>
          <HamburgerMenuIcon
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </NavbarMob>
      </div>
    </header>
  );
}
