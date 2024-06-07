"use client";

import { ListChecks } from "lucide-react";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

export function NavbarDesk() {
  const isActive = usePathname();

  const onLogout = () => {
    deleteCookie("userId");
    deleteCookie("authorization");
  };

  return (
    <section className="hidden lg:flex flex-col w-60">
      <nav className="p-5 flex-1 flex flex-col gap-2 mt-8">
        <Link
          className={`flex items-center gap-2 p-2 rounded-md text-sm ${
            isActive === "/app/tasks" ? "bg-primary-foreground" : ""
          }`}
          href="/app/tasks"
        >
          <ListChecks size={20} />
          Tarefas
        </Link>
      </nav>

      <footer className="p-5 border-t">
        <Link
          onClick={onLogout}
          href="/"
          className="text-sm flex gap-1 items-center text-red-200"
        >
          <LogOut size={16} />
          Sair
        </Link>
      </footer>
    </section>
  );
}
