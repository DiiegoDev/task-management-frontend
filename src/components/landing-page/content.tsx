import Link from "next/link";
import { MoveRight } from "lucide-react";

export function Content() {
  return (
    <section className="p-28 flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="leading-normal font-semibold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400 max-w-3xl">
          Maximize a sua eficiência e produtividade.
        </h1>
        <p className="leading-relaxed max-w-2xl text-zinc-400 text-xl font-light">
          Descubra uma forma mais eficiente de gerenciar suas tarefas de
          programação.
        </p>
      </div>

      <Link
        href="/login"
        className="flex items-center gap-2 text-2xl text-zinc-900 px-8 py-4 bg-gradient-to-r from-indigo-400 to-emerald-400 rounded-2xl font-medium"
      >
        Comece agora
        <MoveRight />
      </Link>
    </section>
  );
}
