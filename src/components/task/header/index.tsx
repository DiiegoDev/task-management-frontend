"use client";
import { Plus } from "lucide-react";

import { Button } from "../../ui/button";
import { SheetCreateTask } from "../sheet-create-task";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const changeIsOpen = () => {
    setIsOpen(true);
  };

  return (
    <header className="flex justify-between items-center">
      <h1 className="text-4xl font-semibold">Tarefas</h1>
      <Button
        onClick={changeIsOpen}
        className="flex gap-1 transition font-semibold"
      >
        <Plus size={18} />
        Nova
      </Button>
      <SheetCreateTask isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}
