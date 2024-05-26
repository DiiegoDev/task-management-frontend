/* eslint-disable react/no-unescaped-entities */
import { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../ui/sheet";

import { CreateTask } from "../create-task";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function SheetCreateTask({ isOpen, setIsOpen }: Props) {
  return (
    <Sheet open={isOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Crie uma nova tarefa</SheetTitle>
          <SheetDescription className="leading-relaxed">
            Crie uma nova tarefa aqui. Clique em salvar quando preencher todos
            os campos.
          </SheetDescription>
        </SheetHeader>
        <CreateTask setIsOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  );
}
