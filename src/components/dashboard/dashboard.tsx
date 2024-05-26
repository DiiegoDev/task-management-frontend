"use client";

import { ListChecks, Settings } from "lucide-react";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Dashboard() {
  const isActive = usePathname();

  const onLogout = () => {
    deleteCookie("userId");
    deleteCookie("authorization");
  };

  return (
    <section className="flex flex-col">
      <header className="p-5 border-b h-[80px]">
        <div className="w-10 h-10 rounded-md bg-primary-foreground"></div>
      </header>

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
        <Link onClick={onLogout} href="/">
          Sair
        </Link>
      </footer>
    </section>
  );
}
