import { ListChecks } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { ReactNode } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { deleteCookie } from "cookies-next";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function NavbarMob({ children, isOpen, setIsOpen }: Props) {
  const isActive = usePathname();

  const onLogout = () => {
    deleteCookie("userId");
    deleteCookie("authorization");
  };
  return (
    <Sheet open={isOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <Cross1Icon
            onClick={() => setIsOpen(false)}
            className="self-end cursor-pointer"
          />
        </SheetHeader>
        <nav className="flex flex-col gap-2 mt-8 flex-1">
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

        <SheetFooter>
          <nav>
            <Link onClick={onLogout} href="/">
              Sair
            </Link>
          </nav>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
