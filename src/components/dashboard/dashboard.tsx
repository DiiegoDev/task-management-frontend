"use client";

import { ListChecks, Settings } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Dashboard() {
  const isActive = usePathname();
  return (
    <section className="flex flex-col">
      <header className="p-5 border-b-2 h-[80px]">
        <div className="w-10 h-10 rounded-md bg-zinc-800"></div>
      </header>

      <nav className="p-5 flex-1 flex flex-col gap-2 mt-8">
        <Link
          className={`flex items-center gap-2 p-2 rounded-md text-sm ${
            isActive === "/app/tasks" ? "bg-zinc-800" : ""
          }`}
          href="/app/tasks"
        >
          <ListChecks size={20} />
          Tasks
        </Link>

        <Link
          className={`flex items-center gap-2 p-2 rounded-md text-sm ${
            isActive === "/app/settings" ? "bg-zinc-800" : ""
          }`}
          href="/app/settings"
        >
          <Settings size={20} />
          Settings
        </Link>
      </nav>
    </section>
  );
}
