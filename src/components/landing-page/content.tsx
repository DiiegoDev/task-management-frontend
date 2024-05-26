import Link from "next/link";
import { MoveRight } from "lucide-react";
import appImage from "../../../public/landing-page.svg";
import Image from "next/image";

export function Content() {
  return (
    <section className="p-10 pb-0 flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="md:max-w-2xl leading-normal font-semibold text-2xl xl:text-5xl lg:text-4xl md:text-4xl">
          Maximize a sua eficiência e produtividade.
        </h1>
        <p className="leading-relaxed md:max-w-xl xl:text-xl md:text-lg font-light">
          Descubra uma forma mais eficiente de gerenciar suas tarefas de
          programação.
        </p>
      </div>

      <Link
        href="/login"
        className="flex items-center gap-2 text-background xl:text-2xl lg:text-xl md:text-lg px-8 py-4 bg-gradient-to-r from-primary to-muted-foreground rounded-2xl font-medium"
      >
        Comece agora
        <MoveRight />
      </Link>

      <Image
        src={appImage}
        alt="Imagem de exemplo da página inicial do web app"
        className="max-w-3xl"
      />
    </section>
  );
}
