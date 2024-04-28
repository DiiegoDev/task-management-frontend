import Link from "next/link";

export function Header() {
  return (
    <header className="h-28 flex justify-between items-center px-28 text-zinc-300 border-b-2 border-zinc-700">
      <div className="flex gap-2 items-center">
        <div className="h-12 w-12 rounded-sm bg-zinc-800"></div>
        <span className="text-2xl font-semibold">Devduty</span>
      </div>

      <Link href="#">Login</Link>
    </header>
  );
}
